import { useTablePage } from "@/hooks/useTablePage";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { supplierSchema } from "@/schema/Supplier.schema";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "@/theme";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useSuppliers } from "@/hooks/useSuppliers";
import { Snackbar, Alert } from "@mui/material";
import LiquidButton from "@/components/LiquidButton";

const SUPPLIER_FIELDS = [
  { name: "number", label: "Numéro" },
  { name: "name", label: "Nom" },
  { name: "companyName", label: "Société" },
  { name: "website", label: "Site web" },
  { name: "siret", label: "SIRET" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Téléphone" },
  { name: "address", label: "Adresse" },
];

const CREATE_SUPPLIER_DEFAULTS = {
  number: "",
  name: "",
  companyName: "",
  website: "",
  siret: "",
  email: "",
  phone: "",
  address: "",
};

const DETAILS_SUPPLIER_FIELDS = [
  { name: "number", label: "Numéro" },
  { name: "name", label: "Nom" },
  { name: "companyName", label: "Société" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Téléphone" },
  { name: "createdByName", label: "Créé par" },
  { name: "createdAt", label: "Date de création" },
];

function formatDate(value) {
  if (!value) return "—";
  if (Array.isArray(value)) {
    const [y, m, d] = value;
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  }
  return new Date(value).toLocaleDateString("fr-FR");
}

export function Supplier() {
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
  const [detailsSupplier, setDetailsSupplier] = useState(null);

  const columnVisibilityModel = {
    number: !isTablet,
    email: !isTablet,
    createdAt: !isTablet,
    createdByName: !isMobile,
  };

  const {
    suppliers,
    loading,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
  } = useSuppliers();

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
  } = useTablePage(suppliers, [
    "number",
    "name",
    "companyName",
    "email",
    "phone",
  ]);

  // ── Créer ──────────────────────────────────────────────
  const saveCreate = async (data) => {
    try {
      await createSupplier(data);
      setCreateOpen(false);
      setSnackbar({
        open: true,
        message: "Fournisseur créé avec succès.",
        severity: "success",
      });
    } catch (err) {
      const message =
        err?.response?.data?.properties?.error ??
        err?.response?.data?.detail ??
        "Une erreur est survenue.";
      setSnackbar({ open: true, message, severity: "error" });
      throw err;
    }
  };

  // ── Modifier ───────────────────────────────────────────
  const saveEdit = async (data) => {
    try {
      await updateSupplier(editItem.id, data);
      setEditOpen(false);
      setSnackbar({
        open: true,
        message: "Fournisseur modifié avec succès.",
        severity: "success",
      });
    } catch (err) {
      const message =
        err?.response?.data?.properties?.error ??
        err?.response?.data?.detail ??
        "Une erreur est survenue.";
      setSnackbar({ open: true, message, severity: "error" });
      throw err;
    }
  };

  // ── Supprimer ──────────────────────────────────────────
  const confirmDelete = async () => {
    try {
      await deleteSupplier(selectedItem.id);
      cancelDelete();
      setSnackbar({
        open: true,
        message: "Fournisseur supprimé.",
        severity: "success",
      });
    } catch (err) {
      const message =
        err?.response?.data?.properties?.error ??
        err?.response?.data?.detail ??
        "Une erreur est survenue.";
      setSnackbar({ open: true, message, severity: "error" });
      throw err;
    }
  };

  // ── Détails au clic de ligne ───────────────────────────
  const handleRowClick = async (params) => {
    const supplier = await getSupplierById(params.row.id);
    setDetailsSupplier({
      ...supplier,
      createdAt: supplier.createdAt ? formatDate(supplier.createdAt) : "—",
    });
    setDetailsOpen(true);
  };

  const columns = [
    { field: "number", headerName: "Numéro", flex: 1 },
    { field: "name", headerName: "Nom", flex: 1 },
    {
      field: "companyName",
      headerName: "Société",
      flex: 1,
      renderCell: ({ value }) =>
        value ? (
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
            <Typography
              sx={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}
            >
              {value}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontSize: 13, color: "text.disabled" }}>
            —
          </Typography>
        ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Téléphone", flex: 1 },
    {
      field: "createdByName",
      headerName: "Créé par",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 13 }}>{value ?? "—"}</Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 110,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {formatDate(value)}
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
              handleEdit(row, (r) => ({ ...r }));
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
        filters={[]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher un fournisseur..."
        action={
          <LiquidButton
            onClick={() => setCreateOpen(true)}
            icon={UserPlus}
            color="blue"
          >
            Ajouter un fournisseur
          </LiquidButton>
        }
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={`${selectedItem?.name ?? ""} (${selectedItem?.companyName ?? ""})`}
      />

      {/* Création */}
      <FormDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Ajouter un fournisseur"
        fields={SUPPLIER_FIELDS}
        defaultValues={CREATE_SUPPLIER_DEFAULTS}
        schema={supplierSchema}
        onSubmit={saveCreate}
      />

      {/* Modification */}
      <FormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifier le fournisseur"
        fields={SUPPLIER_FIELDS}
        defaultValues={editItem}
        schema={supplierSchema}
        onSubmit={saveEdit}
      />

      {/* Détails lecture seule */}
      <FormDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title="Détails fournisseur"
        fields={DETAILS_SUPPLIER_FIELDS}
        defaultValues={detailsSupplier}
        readOnly={true}
      />

      <TableGrid
        title="Liste des fournisseurs"
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
