import { useTablePage } from "@/hooks/useTablePage";
import { mockSuppliers } from "@/mock/AdminData";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { supplierSchema } from "@/schema/Supplier.schema";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, useTheme, useMediaQuery  } from "@mui/material";
import { tokens } from "@/theme";


const SUPPLIER_FIELDS = [
  { name: "number",      label: "Numéro" },
  { name: "name",        label: "Nom" },
  { name: "companyName", label: "Société" },
  { name: "email",       label: "Email" },
  { name: "phone",       label: "Téléphone" },
];

function formatDate(createdAt) {
  if (!createdAt) return "—";
  if (Array.isArray(createdAt)) {
    const [y, m, d] = createdAt;
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  }
  return new Date(createdAt).toLocaleDateString("fr-FR");
}

export function Supplier() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));   // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));   // < 900px

   // Colonnes cachées selon la taille d'écran
   const columnVisibilityModel = {
    number:    !isTablet,
    email:     !isTablet,
    createdAt: !isTablet,
  };


  const {
    filteredByChip, search, setSearch,
    activeFilter, setActiveFilter,
    deleteOpen, selectedItem, confirmDelete, cancelDelete,
    editOpen, editItem, setEditOpen,
    handleEdit, handleDelete, saveEdit,
  } = useTablePage(mockSuppliers, ["number", "name", "companyName", "email", "phone"]);

  const columns = [
    { field: "number",      headerName: "Numéro",      flex: 1 },
    { field: "name",        headerName: "Nom",         flex: 1 },
    {
      field: "companyName",
      headerName: "Société",
      flex: 1,
      renderCell: ({ value }) => (
        <Box sx={{ display: "inline-flex", px: "10px", py: "4px", borderRadius: "100px", background: "rgba(148,163,184,0.15)", border: "0.5px solid rgba(148,163,184,0.3)" }}>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>{value}</Typography>
        </Box>
      ),
    },
    { field: "email",       headerName: "Email",         flex: 1 },
    { field: "phone",       headerName: "Téléphone", flex: 1 },
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 100,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {formatDate(value)}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          <EditIcon
            sx={{ fontSize: 18, color: colors.color, cursor: "pointer" }}
            onClick={() => handleEdit(row, (r) => ({
              ...r,
              birthdate: r.birthdate ?? "",
              roles: r.roles ?? [],
            }))}
          />
          <DeleteIcon
            sx={{ fontSize: 18, color: colors.redAccent[500], cursor: "pointer" }}
            onClick={() => handleDelete(row)}
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
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={`${selectedItem?.name ?? ""} (${selectedItem?.companyName ?? ""})`}
      />

      <FormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifier le fournisseur"
        fields={SUPPLIER_FIELDS}
        defaultValues={editItem}
        schema={supplierSchema}
        onSubmit={saveEdit}
      />

      <TableGrid
        title="Liste des fournisseurs"
        rows={filteredByChip}
        columns={columns}
         columnVisibilityModel={columnVisibilityModel}
      />
    </>
  );
}