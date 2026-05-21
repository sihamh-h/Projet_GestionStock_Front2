import { useTablePage } from "@/hooks/useTablePage";
import { mockCategories  } from "@/mock/AdminData";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { categorySchema  } from "@/schema/Category.schema";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, useTheme, useMediaQuery  } from "@mui/material";
import { tokens } from "@/theme";



const CATEGORY_FIELDS = [
  {
    name: "name",
    label: "Nom de la catégorie",
  },
  {
    name: "description",
    label: "Description",
  },
];

// ── Format date backend [year,month,day,h,m,s,nano] ────────────
function formatDate(createdAt) {
  if (!createdAt) return "—";
  if (Array.isArray(createdAt)) {
    const [y, m, d] = createdAt;
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  }
  return new Date(createdAt).toLocaleDateString("fr-FR");
}

export function Category() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));   // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));   // < 900px

   // Colonnes cachées selon la taille d'écran
  const columnVisibilityModel = {
  };


  const {
    filteredByChip, search, setSearch,
    activeFilter, setActiveFilter,
    deleteOpen, selectedItem, confirmDelete, cancelDelete,
    editOpen, editItem, setEditOpen,
    handleEdit, handleDelete, saveEdit,
  } = useTablePage(mockCategories, ["name", "description"]);

  const columns = [
    { field: "name", headerName: "Nom", flex: 1 },
    { field: "description",  headerName: "Description",    flex: 1 },
    { field: "createdAt", headerName: "Date de création", flex: 1, renderCell: ({ value }) => (
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{formatDate(value)}</Typography>
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
            onClick={() => handleEdit(row, r => ({ ...r, createdAt: formatDate(r.createdAt) }))}  // Formate la date pour l'édition
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
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher une catégorie..."
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={selectedItem ? selectedItem.name : ""}
      />

      <FormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifier la catégorie"
        fields={CATEGORY_FIELDS}
        defaultValues={editItem}
        schema={categorySchema}
        onSubmit={saveEdit}
      />

      <TableGrid
        title="Liste des catégories"
        rows={filteredByChip}
        columns={columns}
         columnVisibilityModel={columnVisibilityModel}
      />
    </>
  );
}