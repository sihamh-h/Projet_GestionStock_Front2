import { useTablePage } from "@/hooks/useTablePage";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { productSchema } from "@/schema/Product.schema";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
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
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { tokens } from "@/theme";
import { useState, useMemo } from "react";
import { Plus, X, RotateCcw } from "lucide-react";
import { translateProductError } from "@/utils/productErrors";
import { toFrontendDate, toInputDate } from "@/utils/formaDate";
import { uploadService } from "@/services/uploadService";
import LiquidButton from "@/components/LiquidButton";

// ── Statut stock ────────────────────────────────────────────────
function getStockStatus(actual, min) {
  if (actual === 0) return "RUPTURE";
  if (actual / min < 0.5) return "CRITIQUE";
  if (actual < min) return "BAS";
  return "OK";
}

function StockChip({ actual, min }) {
  const status = getStockStatus(actual, min);
  const config = {
    OK: {
      color: "#34d399",
      bg: "rgba(52,211,153,0.2)",
      border: "rgba(52,211,153,0.3)",
    },
    BAS: {
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.2)",
      border: "rgba(251,191,36,0.3)",
    },
    CRITIQUE: {
      color: "#f97316",
      bg: "rgba(249,115,22,0.2)",
      border: "rgba(249,115,22,0.3)",
    },
    RUPTURE: {
      color: "#f87171",
      bg: "rgba(248,113,113,0.2)",
      border: "rgba(248,113,113,0.3)",
    },
  }[status];
  return (
    <Box
      sx={{
        display: "inline-flex",
        px: "10px",
        py: "4px",
        borderRadius: "100px",
        background: config.bg,
        border: "0.5px solid",
        borderColor: config.border,
      }}
    >
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: config.color }}>
        {status}
      </Typography>
    </Box>
  );
}

const STOCK_FILTERS = [
  { label: "TOUS", value: "TOUS" },
  { label: "OK", value: "OK" },
  { label: "BAS", value: "BAS" },
  { label: "CRITIQUE", value: "CRITIQUE" },
  { label: "RUPTURE", value: "RUPTURE" },
];

const PRODUCT_DEFAULTS = {
  reference: "",
  name: "",
  description: "",
  price: "",
  actualStock: "",
  minStock: "",
  categoryId: "",
  imageUrl: "",
};

// ── Dialog produits supprimés ──────────────────────────
function DeletedProductsDialog({
  open,
  onClose,
  deletedProducts,
  onRestore,
  loading,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700} component="span">
          Produits supprimés
        </Typography>
        <X
          size={20}
          style={{ cursor: "pointer", opacity: 0.6 }}
          onClick={onClose}
        />
      </DialogTitle>

      <DialogContent>
        {deletedProducts.length === 0 ? (
          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
              textAlign: "center",
              py: 4,
            }}
          >
            Aucun produit supprimé.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>
                  Référence
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>
                  Nom
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>
                  Catégorie
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12 }}>
                  Prix
                </TableCell>
                <TableCell sx={{ width: 100 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {deletedProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell sx={{ fontSize: 12, color: "text.secondary" }}>
                    {p.reference}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 13,
                      fontStyle: "italic",
                      color: "text.disabled",
                    }}
                  >
                    {p.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {p.categoryName ?? "—"}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: 13 }}>
                    {Number(p.price).toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<RotateCcw size={13} />}
                      onClick={() => onRestore(p.id)}
                      disabled={loading}
                      sx={{
                        fontSize: 11,
                        textTransform: "none",
                        color: "#34d399",
                        borderColor: "rgba(52,211,153,0.4)",
                      }}
                      variant="outlined"
                    >
                      Restaurer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function Product() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    deletedProducts,
    fetchDeletedProducts,
    restoreProduct,
  } = useProducts();
  const { categories } = useCategories();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [deletedOpen, setDeletedOpen] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);

  // Champs dynamiques avec options catégories
  const PRODUCT_FIELDS = useMemo(
    () => [
      { name: "reference", label: "Référence" },
      { name: "name", label: "Nom du produit" },
      { name: "description", label: "Description" },
      { name: "price", label: "Prix (€)", type: "number" },
      { name: "actualStock", label: "Stock actuel", type: "number" },
      { name: "minStock", label: "Stock minimum", type: "number" },
      {
        name: "categoryId",
        label: "Catégorie",
        options: categories.map((c) => ({ value: c.id, label: c.name })),
      },
      {
        name: "imageUrl",
        label: "Image du produit",
        type: "image", // ← type image
        uploadFn: uploadService.uploadProductImage, // ← fonction upload
      },
    ],
    [categories],
  );

  const PRODUCT_DETAIL_FIELDS = useMemo(
    () => [
      { name: "imageUrl", type: "imagePreview", label: "" },
      { name: "reference", label: "Référence" },
      { name: "name", label: "Nom du produit" },
      { name: "description", label: "Description" },
      { name: "price", label: "Prix (€)" },
      { name: "actualStock", label: "Stock actuel" },
      { name: "minStock", label: "Stock minimum" },
      { name: "categoryName", label: "Catégorie" },
      { name: "createdAt", label: "Créé le" },
    ],
    [],
  );

  const {
    filteredByChip,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    deleteOpen,
    selectedItem,
    cancelDelete,
    editOpen,
    editItem,
    setEditOpen,
    handleEdit,
    handleDelete,
    createOpen,
    setCreateOpen,
  } = useTablePage(
    products,
    ["name", "reference", "categoryName", "description"],
    (item, filter) =>
      filter === "TOUS" ||
      getStockStatus(item.actualStock, item.minStock) === filter,
  );

  const saveCreate = async (data) => {
    try {
      await createProduct({ ...data, categoryId: Number(data.categoryId) });
      setCreateOpen(false);
      setSnackbar({
        open: true,
        message: "Produit créé avec succès.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: translateProductError(err),
        severity: "error",
      });
    }
  };

  const saveEdit = async (data) => {
    try {
      await updateProduct(editItem.id, {
        ...data,
        categoryId: Number(data.categoryId),
      });
      setEditOpen(false);
      setSnackbar({
        open: true,
        message: "Produit modifié avec succès.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: translateProductError(err),
        severity: "error",
      });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedItem.id);
      cancelDelete();
      setSnackbar({
        open: true,
        message: "Produit supprimé.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: translateProductError(err),
        severity: "error",
      });
    }
  };

  const handleRowClick = async (params) => {
    const id = params.row.id;

    const product = await getProductById(id);
    const formatted = {
      ...product,
      createdAt: product.createdAt ? toInputDate(product.createdAt) : "",
    };

    setDetailsProduct(formatted);
    setDetailsOpen(true);
  };

  // ── Restaurer ──────────────────────────────────────────
  const handleRestore = async (id) => {
    setRestoreLoading(true);
    try {
      await restoreProduct(id);
      setSnackbar({
        open: true,
        message: "Produit restauré avec succès.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: translateProductError(err),
        severity: "error",
      });
    } finally {
      setRestoreLoading(false);
    }
  };

  // ── Ouvrir dialog produits supprimés ───────────────────
  const handleOpenDeleted = async () => {
    await fetchDeletedProducts();
    setDeletedOpen(true);
  };

  const columnVisibilityModel = {
    description: !isTablet,
    categoryName: !isMobile,
    createdAt: !isTablet,
    minStock: !isMobile,
  };

  const columns = [
    { field: "reference", headerName: "Référence", flex: 1 },
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "6px",
              background: "rgba(96,165,250,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 14,
            }}
          >
            {row.imageUrl ? (
              <img
                src={row.imageUrl}
                alt={row.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            ) : (
              "📦"
            )}
          </Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            {row.name}
          </Typography>
        </Box>
      ),
    },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "categoryName",
      headerName: "Catégorie",
      width: 130,
      renderCell: ({ value }) => (
        <Box
          sx={{
            display: "inline-flex",
            px: "10px",
            py: "4px",
            borderRadius: "100px",
            background: "rgba(148,163,184,0.15)",
            border: "0.5px solid rgba(148,163,184,0.3)",
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Prix",
      width: 90,
      type: "number",
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {Number(value).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
        </Typography>
      ),
    },
    {
      field: "actualStock",
      headerName: "Stock",
      width: 110,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            {row.actualStock}
          </Typography>
          <Typography sx={{ fontSize: 11, color: "text.disabled" }}>
            / {row.minStock} min
          </Typography>
        </Box>
      ),
    },
    { field: "minStock", headerName: "Stock min", width: 90, type: "number" },
    {
      field: "status",
      headerName: "Statut",
      width: 110,
      sortable: false,
      renderCell: ({ row }) => (
        <StockChip actual={row.actualStock} min={row.minStock} />
      ),
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 100,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {value ? toFrontendDate(value) : "—"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 80,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          <EditIcon
            sx={{ fontSize: 18, color: colors.color, cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row, (r) => ({
                id: r.id,
                reference: r.reference,
                name: r.name,
                description: r.description ?? "",
                price: r.price,
                actualStock: r.actualStock,
                minStock: r.minStock,
                categoryId: r.categoryId,
                imageUrl: r.imageUrl ?? "",
              }));
            }}
          />
          <DeleteIcon
            sx={{
              fontSize: 18,
              color: colors.redAccent[500],
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <FilterToolbar
        search={search}
        onSearch={setSearch}
        filters={STOCK_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher un produit..."
        action={
          <div className="flex items-center gap-2">
            <LiquidButton
              onClick={handleOpenDeleted}
              icon={RotateCcw}
              color="red"
            >
              Produits supprimés
            </LiquidButton>
            <LiquidButton
              onClick={() => setCreateOpen(true)}
              icon={Plus}
              color="blue"
            >
              Créer un produit
            </LiquidButton>
          </div>
        }
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={`${selectedItem?.reference ?? ""} — ${selectedItem?.name ?? ""}`}
      />

      <FormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifier le produit"
        fields={PRODUCT_FIELDS}
        defaultValues={editItem}
        schema={productSchema}
        onSubmit={saveEdit}
      />

      <FormDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Créer un produit"
        fields={PRODUCT_FIELDS}
        defaultValues={PRODUCT_DEFAULTS}
        schema={productSchema}
        onSubmit={saveCreate}
      />

      <TableGrid
        title="Liste des produits"
        rows={filteredByChip}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onRowClick={handleRowClick}
      />

      <FormDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title="Détails produit"
        fields={PRODUCT_DETAIL_FIELDS}
        defaultValues={detailsProduct}
        readOnly={true} // ← mode lecture seule
      />
      {/* Dialog produits supprimés */}
      <DeletedProductsDialog
        open={deletedOpen}
        onClose={() => setDeletedOpen(false)}
        deletedProducts={deletedProducts}
        onRestore={handleRestore}
        loading={restoreLoading}
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
