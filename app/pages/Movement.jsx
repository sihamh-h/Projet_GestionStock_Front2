import { useTablePage } from "@/hooks/useTablePage";
import { mockMovements  } from "@/mock/AdminData";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { movementSchema  } from "@/schema/Movement.schema";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, useTheme, useMediaQuery  } from "@mui/material";
import { tokens } from "@/theme";


const TYPE_FILTERS = [
  { label: "TOUS", value: "TOUS" },
  { label: "ENTRÉE", value: "IN" },
  { label: "SORTIE", value: "OUT" },
];

const MOVEMENT_FIELDS = [
  {
    name: "type",
    label: "Type de mouvement",
  },
  {
    name: "quantity",
    label: "Quantité",
  },

  {
    name: "productName",
    label: "Produit",
  }
];


export function Movement() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));   // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));   // < 900px

   // Colonnes cachées selon la taille d'écran
  const columnVisibilityModel = {
       productId: !isTablet,  // caché sur mobile + tablette 
  };


  const {
    filteredByChip, search, setSearch,
    activeFilter, setActiveFilter,
    deleteOpen, selectedItem, confirmDelete, cancelDelete,
    editOpen, editItem, setEditOpen,
    handleEdit, handleDelete, saveEdit,
  } = useTablePage(mockMovements, [ "quantity", "productName"]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "type",
      headerName: "Type",
      width: 110,
      renderCell: ({ value }) => {
        const isIn = value === "IN";
        return (
          <Box sx={{
            px: "10px", py: "4px", borderRadius: "100px",
            background: isIn ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)",
            border: "0.5px solid",
            borderColor: isIn ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)",
            display: "inline-flex", alignItems: "center",
          }}>
            <Typography sx={{
              fontSize: 12, fontWeight: 700,
              color: isIn ? "#34d399" : "#f87171",
            }}>
              {isIn ? "ENTRÉE" : "SORTIE"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantité",
      width: 100,
      renderCell: ({ value, row }) => {
        const isIn = row.type === "IN";
        return (
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: isIn ? "#34d399" : "#f87171" }}>
            {isIn ? "+" : "-"}{value}
          </Typography>
        );
      },
    },
    {
      field: "productName",
      headerName: "Produit",
      flex: 1,
      renderCell: ({ value }) => {
        const isDeleted = value === "deleted product";
        return (
          <Typography sx={{
            fontSize: 13,
            fontStyle: isDeleted ? "italic" : "normal",
            color: isDeleted ? "text.disabled" : "inherit",
          }}>
            {isDeleted ? "Produit supprimé" : value}
          </Typography>
        );
      },
    },
    { field: "productId", headerName: "Product ID", width: 100 },
   
  ];

  return (
    <>
      <FilterToolbar
        search={search}
        onSearch={setSearch}
        filters={TYPE_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher un mouvement..."
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={selectedItem ? `${selectedItem.type === "IN" ? "ENTRÉE" : "SORTIE"} - ${selectedItem.productName}` : ""}
      />

      <FormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifier le mouvement"
        fields={MOVEMENT_FIELDS}
        defaultValues={editItem}
        schema={movementSchema}
        onSubmit={saveEdit}
      />

      <TableGrid
        title="Liste des mouvements"
        rows={filteredByChip}
        columns={columns}
         columnVisibilityModel={columnVisibilityModel}
      />
    </>
  );
}