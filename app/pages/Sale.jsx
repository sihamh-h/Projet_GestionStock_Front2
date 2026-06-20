import { useTablePage } from "@/hooks/useTablePage";
import FilterToolbar from "@/components/FilterToolbar";
import TableGrid from "@/components/TableGrid";
import { SaleOrderDetailsDialog } from "@/components/SaleOrderDetailsDialog";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { tokens } from "@/theme";
import { useState } from "react";
import { ShoppingCart, X, Plus, Trash2 } from "lucide-react";
import { useSales } from "@/hooks/useSales";
import { useProducts } from "@/hooks/useProducts";
import { toFrontendDate } from "@/utils/formaDate";
import { saleSchema } from "@/schema/Sale.schema";
import { translateSaleError } from "@/utils/saleErrors";
import LiquidButton from "@/components/LiquidButton";

// ── Dialog création vente ──────────────────────────────
function CreateSaleDialog({ open, onClose, onSubmit, products }) {
  const [saleNumber, setSaleNumber] = useState("");
  const [lines, setLines] = useState([{ productId: "", quantity: "" }]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddLine = () =>
    setLines((prev) => [...prev, { productId: "", quantity: "" }]);
  const handleRemoveLine = (index) =>
    setLines((prev) => prev.filter((_, i) => i !== index));
  const handleLineChange = (index, field, value) =>
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [field]: value } : line)),
    );

  const handleClose = () => {
    setSaleNumber("");
    setLines([{ productId: "", quantity: "" }]);
    setError("");
    onClose();
  };

  const handleSubmit = async () => {
    setError("");
    const result = saleSchema.safeParse({ saleNumber, lines });
    if (!result.success) {
      setError(
        result.error.issues?.[0]?.message ??
          "Veuillez remplir tous les champs.",
      );
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(result.data);
      handleClose();
    } catch (err) {
      setError(translateSaleError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700} component="span">
          Nouvelle vente
        </Typography>
        <X
          size={20}
          style={{ cursor: "pointer", opacity: 0.6 }}
          onClick={handleClose}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: "12px !important",
        }}
      >
        <TextField
          label="Numéro de vente"
          size="small"
          fullWidth
          value={saleNumber}
          onChange={(e) => setSaleNumber(e.target.value)}
          disabled={submitting}
        />

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              mb: 1,
              color: "text.secondary",
            }}
          >
            Lignes de vente
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>
                  Produit
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, width: 120 }}>
                  Quantité
                </TableCell>
                <TableCell sx={{ width: 48 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {lines.map((line, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      value={line.productId}
                      onChange={(e) =>
                        handleLineChange(i, "productId", e.target.value)
                      }
                      disabled={submitting}
                    >
                      {products.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.name} — stock : {p.actualStock}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      fullWidth
                      value={line.quantity}
                      onChange={(e) =>
                        handleLineChange(i, "quantity", e.target.value)
                      }
                      disabled={submitting}
                      slotProps={{ htmlInput: { min: 1 } }}
                    />
                  </TableCell>
                  <TableCell>
                    {lines.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveLine(i)}
                        disabled={submitting}
                        sx={{ color: "#f87171" }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            startIcon={<Plus size={14} />}
            onClick={handleAddLine}
            disabled={submitting}
            sx={{ mt: 1, textTransform: "none", fontSize: 13 }}
          >
            Ajouter une ligne
          </Button>
        </Box>

        {error && (
          <Typography sx={{ fontSize: 13, color: "#f87171" }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={submitting}
          sx={{ textTransform: "none", color: "text.secondary" }}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          sx={{ textTransform: "none" }}
        >
          {submitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Page principale ────────────────────────────────────
export function Sale() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsSale, setDetailsSale] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const columnVisibilityModel = {
    createdByName: !isTablet,
    saleDate: !isMobile,
  };

  const { sales, loading, createSale, getSaleById } = useSales();
  const { products, fetchProducts } = useProducts();

  const { filteredByChip, search, setSearch, activeFilter, setActiveFilter } =
    useTablePage(sales, ["saleNumber", "createdByName"]);

  // ── Créer ──────────────────────────────────────────────
  const saveCreate = async (data) => {
    await createSale(data);
    await fetchProducts();
    setSnackbar({
      open: true,
      message: "Vente enregistrée avec succès.",
      severity: "success",
    });
  };

  // ── Détails au clic de ligne ───────────────────────────
  const handleRowClick = async (params) => {
    const sale = await getSaleById(params.row.id);
    setDetailsSale(sale);
    setDetailsOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "saleNumber", headerName: "Numéro", flex: 1 },
    {
      field: "saleDate",
      headerName: "Date",
      width: 120,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {toFrontendDate(value)}
        </Typography>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Total",
      width: 130,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#34d399" }}>
          {value?.toFixed(2)} €
        </Typography>
      ),
    },
    {
      field: "lines",
      headerName: "Produits",
      flex: 2,
      renderCell: ({ value }) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {value?.map((line, i) => (
            <Box
              key={i}
              sx={{
                px: "8px",
                py: "2px",
                borderRadius: "100px",
                background: line.productName?.includes("(supprimé)")
                  ? "rgba(248,113,113,0.1)"
                  : "rgba(96,165,250,0.15)",
                border: "0.5px solid",
                borderColor: line.productName?.includes("(supprimé)")
                  ? "rgba(248,113,113,0.3)"
                  : "rgba(96,165,250,0.3)",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: line.productName?.includes("(supprimé)")
                    ? "#f87171"
                    : "#60a5fa",
                }}
              >
                {line.productName} × {line.quantity}
              </Typography>
            </Box>
          ))}
        </Box>
      ),
    },
    {
      field: "createdByName",
      headerName: "Créé par",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 13 }}>{value ?? "—"}</Typography>
      ),
    },
  ];

  return (
    <>

      <FilterToolbar
        search={search}
        onSearch={setSearch}
        filters={[]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher une vente..."
        action={
          <LiquidButton
            onClick={() => setCreateOpen(true)}
            icon={ShoppingCart}
            color="emerald"
          >
            Nouvelle vente
          </LiquidButton>
        }
      />

      <CreateSaleDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={saveCreate}
        products={products}
      />

      {/* Dialog détails — composant générique */}
      <SaleOrderDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={`Vente ${detailsSale?.saleNumber}`}
        subtitle={`${toFrontendDate(detailsSale?.saleDate)} · Créé par ${detailsSale?.createdByName ?? "—"}`}
        columns={[
          { label: "Produit" },
          { label: "Quantité", align: "center" },
          { label: "Prix unit.", align: "right" },
          { label: "Sous-total", align: "right" },
        ]}
        rows={detailsSale?.lines?.map((l) => ({
          deleted: l.productName?.includes("(supprimé)"),
          cells: [
            l.productName,
            l.quantity,
            `${l.unitPrice?.toFixed(2)} €`,
            `${l.subTotal?.toFixed(2)} €`,
          ],
        }))}
        total={detailsSale?.totalAmount}
        totalColor="#34d399"
      />

      <TableGrid
        title="Liste des ventes"
        rows={filteredByChip}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onRowClick={handleRowClick}
        loading={loading}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: "12px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
