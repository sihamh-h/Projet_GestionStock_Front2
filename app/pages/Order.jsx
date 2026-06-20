import { useTablePage } from "@/hooks/useTablePage";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import TableGrid from "@/components/TableGrid";
import { SaleOrderDetailsDialog } from "@/components/SaleOrderDetailsDialog";
import {
  Box, Typography, useTheme, useMediaQuery,
  Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableBody, TableRow, TableCell,
  TextField, MenuItem, IconButton,
} from "@mui/material";
import { tokens } from "@/theme";
import { useState } from "react";
import { ClipboardList, X, Plus, Trash2 } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { useSuppliers } from "@/hooks/useSuppliers";
import { toFrontendDate } from "@/utils/formaDate";
import { orderSchema } from "@/schema/Order.schema";
import LiquidButton from "@/components/LiquidButton";


const STATUS_CONFIG = {
  PENDING:   { label: "En attente", color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.3)"  },
  RECEIVED:  { label: "Reçue",      color: "#34d399", bg: "rgba(52,211,153,0.15)",  border: "rgba(52,211,153,0.3)"  },
  CANCELLED: { label: "Annulée",    color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)" },
};

// ── Dialog création commande ───────────────────────────
function CreateOrderDialog({ open, onClose, onSubmit, products, suppliers }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [supplierId,  setSupplierId]  = useState("");
  const [lines, setLines]             = useState([{ productId: "", quantity: "", unitPrice: "" }]);
  const [error, setError]             = useState("");
  const [submitting, setSubmitting]   = useState(false);

  const handleAddLine    = () => setLines((prev) => [...prev, { productId: "", quantity: "", unitPrice: "" }]);
  const handleRemoveLine = (index) => setLines((prev) => prev.filter((_, i) => i !== index));
  const handleLineChange = (index, field, value) =>
    setLines((prev) => prev.map((line, i) => i === index ? { ...line, [field]: value } : line));
  const handleProductChange = (index, productId) => {
    const product = products.find((p) => p.id === Number(productId));
    setLines((prev) => prev.map((line, i) =>
      i === index ? { ...line, productId, unitPrice: product ? product.price : "" } : line
    ));
  };
  const handleClose = () => {
    setOrderNumber(""); setSupplierId("");
    setLines([{ productId: "", quantity: "", unitPrice: "" }]);
    setError(""); onClose();
  };

  const handleSubmit = async () => {
    setError("");
    const result = orderSchema.safeParse({ orderNumber, supplierId, lines });
    if (!result.success) {
      setError(result.error.issues?.[0]?.message ?? "Veuillez remplir tous les champs.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(result.data);
      handleClose();
    } catch (err) {
      setError(
        err?.response?.data?.properties?.error ??
        err?.response?.data?.detail ??
        err?.message ?? "Une erreur est survenue."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight={700} component="span">Nouvelle commande</Typography>
        <X size={20} style={{ cursor: "pointer", opacity: 0.6 }} onClick={handleClose} />
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "12px !important" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Numéro de commande" size="small" fullWidth value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)} disabled={submitting} />
          <TextField select label="Fournisseur" size="small" fullWidth value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)} disabled={submitting}>
            {suppliers.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.name} — {s.companyName}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1, color: "text.secondary" }}>
            Lignes de commande
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Produit</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, width: 110 }}>Quantité</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, width: 130 }}>Prix achat (€)</TableCell>
                <TableCell sx={{ width: 48 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {lines.map((line, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <TextField select size="small" fullWidth value={line.productId}
                      onChange={(e) => handleProductChange(i, e.target.value)} disabled={submitting}>
                      {products.map((p) => (
                        <MenuItem key={p.id} value={p.id}>{p.name} — stock : {p.actualStock}</MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField size="small" type="number" fullWidth value={line.quantity}
                      onChange={(e) => handleLineChange(i, "quantity", e.target.value)}
                      disabled={submitting} slotProps={{ htmlInput: { min: 1 } }} />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" type="number" fullWidth value={line.unitPrice}
                      onChange={(e) => handleLineChange(i, "unitPrice", e.target.value)}
                      disabled={submitting} slotProps={{ htmlInput: { min: 0, step: "0.01" } }} />
                  </TableCell>
                  <TableCell>
                    {lines.length > 1 && (
                      <IconButton size="small" onClick={() => handleRemoveLine(i)}
                        disabled={submitting} sx={{ color: "#f87171" }}>
                        <Trash2 size={16} />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button startIcon={<Plus size={14} />} onClick={handleAddLine} disabled={submitting}
            sx={{ mt: 1, textTransform: "none", fontSize: 13 }}>
            Ajouter une ligne
          </Button>
        </Box>
        {error && <Typography sx={{ fontSize: 13, color: "#f87171" }}>{error}</Typography>}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button onClick={handleClose} disabled={submitting} sx={{ textTransform: "none", color: "text.secondary" }}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting} sx={{ textTransform: "none" }}>
          {submitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Page principale ────────────────────────────────────
export function Order() {
  const theme    = useTheme();
  const colors   = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [snackbar, setSnackbar]           = useState({ open: false, message: "", severity: "success" });
  const [detailsOpen, setDetailsOpen]     = useState(false);
  const [detailsOrder, setDetailsOrder]   = useState(null);
  const [createOpen, setCreateOpen]       = useState(false);
  const [deleteOpen, setDeleteOpen]       = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columnVisibilityModel = {
    supplierName:  !isTablet,
    orderDate:     !isMobile,
    totalAmount:   !isMobile,
    createdByName: !isTablet,
  };

  const { orders, loading, createOrder, updateStatus, deleteOrder, getOrderById } = useOrders();
  const { products, fetchProducts } = useProducts();
  const { suppliers } = useSuppliers();

  const STATUS_FILTERS = [
    { label: "TOUS",       value: "TOUS"      },
    { label: "EN ATTENTE", value: "PENDING"   },
    { label: "REÇUE",      value: "RECEIVED"  },
    { label: "ANNULÉE",    value: "CANCELLED" },
  ];

  const {
    filteredByChip, search, setSearch,
    activeFilter, setActiveFilter,
  } = useTablePage(orders, ["orderNumber", "supplierName", "createdByName"]);

  // ── Créer ──────────────────────────────────────────────
  const saveCreate = async (data) => {
    await createOrder(data);
    setSnackbar({ open: true, message: "Commande créée avec succès.", severity: "success" });
  };

  // ── Changer statut ─────────────────────────────────────
  const handleUpdateStatus = async (id, status, e) => {
    e.stopPropagation();
    try {
      await updateStatus(id, status);
      if (status === "RECEIVED") await fetchProducts();
      setSnackbar({ open: true, message: `Commande ${status === "RECEIVED" ? "reçue" : "annulée"}.`, severity: "success" });
    } catch (err) {
      const message =
        err?.response?.data?.properties?.error ??
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        err?.message ??
        "Une erreur est survenue.";
      setSnackbar({ open: true, message, severity: "error" });
    }
  };

  // ── Supprimer ──────────────────────────────────────────
  const handleDelete = (order, e) => {
    e.stopPropagation();
    setSelectedOrder(order);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteOrder(selectedOrder.id);
      setDeleteOpen(false);
      setSnackbar({ open: true, message: "Commande supprimée.", severity: "success" });
    } catch (err) {
      const message =
        err?.response?.data?.properties?.error ??
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        err?.message ??
        "Une erreur est survenue.";
      setSnackbar({ open: true, message, severity: "error" });
    }
  };

  // ── Détails au clic de ligne ───────────────────────────
  const handleRowClick = async (params) => {
    const order = await getOrderById(params.row.id);
    setDetailsOrder(order);
    setDetailsOpen(true);
  };

  const columns = [
    { field: "id",          headerName: "ID",          width: 70 },
    { field: "orderNumber", headerName: "Numéro",      flex: 1 },
    {
      field: "status",
      headerName: "Statut",
      width: 130,
      renderCell: ({ value }) => {
        const config = STATUS_CONFIG[value] ?? STATUS_CONFIG.PENDING;
        return (
          <Box sx={{ px: "10px", py: "4px", borderRadius: "100px", background: config.bg, border: `0.5px solid ${config.border}`, display: "inline-flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: config.color }}>{config.label}</Typography>
          </Box>
        );
      },
    },
    {
      field: "orderDate",
      headerName: "Date",
      width: 120,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{toFrontendDate(value)}</Typography>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Total",
      width: 120,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#60a5fa" }}>{value?.toFixed(2)} €</Typography>
      ),
    },
    { field: "supplierName",  headerName: "Fournisseur", flex: 1 },
    {
      field: "createdByName",
      headerName: "Créé par",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 13 }}>{value ?? "—"}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {row.status === "PENDING" && (
            <>
              <Button size="small" variant="outlined"
                onClick={(e) => handleUpdateStatus(row.id, "RECEIVED", e)}
                sx={{ fontSize: 11, textTransform: "none", color: "#34d399", borderColor: "rgba(52,211,153,0.4)", py: "2px", px: "8px", minWidth: 0 }}>
                Valider
              </Button>
              <Button size="small" variant="outlined"
                onClick={(e) => handleUpdateStatus(row.id, "CANCELLED", e)}
                sx={{ fontSize: 11, textTransform: "none", color: "#f87171", borderColor: "rgba(248,113,113,0.4)", py: "2px", px: "8px", minWidth: 0 }}>
                Annuler
              </Button>
              <IconButton size="small" onClick={(e) => handleDelete(row, e)} sx={{ color: "#f87171" }}>
                <Trash2 size={14} />
              </IconButton>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <>

      <FilterToolbar
        search={search}
        onSearch={setSearch}
        filters={STATUS_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher une commande..."
         action={
    <LiquidButton onClick={() => setCreateOpen(true)} icon={ClipboardList} color="blue">
      Nouvelle commande
    </LiquidButton>
  }
      />

      <CreateOrderDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={saveCreate}
        products={products}
        suppliers={suppliers}
      />

      {/* Dialog détails — composant générique */}
      <SaleOrderDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={`Commande ${detailsOrder?.orderNumber}`}
        subtitle={`${toFrontendDate(detailsOrder?.orderDate)} · ${detailsOrder?.supplierName} · Créé par ${detailsOrder?.createdByName ?? "—"}`}
        badge={detailsOrder ? STATUS_CONFIG[detailsOrder.status] : undefined}
        columns={[
          { label: "Produit" },
          { label: "Quantité", align: "center" },
          { label: "Prix achat", align: "right" },
          { label: "Sous-total", align: "right" },
        ]}
        rows={detailsOrder?.lines?.map((l) => ({
          deleted: l.productName?.includes("(supprimé)"),
          cells: [
            l.productName,
            l.quantity,
            `${l.unitPrice?.toFixed(2)} €`,
            `${(l.quantity * l.unitPrice)?.toFixed(2)} €`,
          ],
        }))}
        total={detailsOrder?.totalAmount}
        totalColor="#60a5fa"
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemLabel={`Commande ${selectedOrder?.orderNumber ?? ""}`}
      />

      <TableGrid
        title="Liste des commandes"
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