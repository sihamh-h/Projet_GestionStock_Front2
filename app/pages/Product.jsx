import { useTablePage } from "@/hooks/useTablePage";
import { mockProducts } from "@/mock/AdminData";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { productSchema } from "@/schema/Product.schema";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, useTheme, useMediaQuery  } from "@mui/material";
import { tokens } from "@/theme";
import { useMemo } from "react";

const STOCK_FILTERS = [
  { label: "TOUS",     value: "TOUS"     },
  { label: "OK",       value: "OK"       },
  { label: "BAS",      value: "BAS"      },
  { label: "CRITIQUE", value: "CRITIQUE" },
  { label: "RUPTURE",  value: "RUPTURE"  },
];

const PRODUCT_FIELDS = [
  { name: "reference",    label: "Référence" },
  { name: "name",         label: "Nom du produit" },
  { name: "description",  label: "Description" },
  { name: "price",        label: "Prix (€)",           type: "number" },
  { name: "actualStock",  label: "Stock actuel",        type: "number" },
  { name: "minStock",     label: "Stock minimum",       type: "number" },
  { name: "categoryName", label: "Catégorie" },
  { name: "imageUrl",     label: "URL de l'image" },
];

// ── Statut stock calculé ────────────────────────────────────────
function getStockStatus(actual, min) {
  if (actual === 0)            return "RUPTURE";
  if (actual / min < 0.5)     return "CRITIQUE";
  if (actual < min)           return "BAS";
  return "OK";
}
 
// ── Chip statut ─────────────────────────────────────────────────
function StockChip({ actual, min }) {
  const status = getStockStatus(actual, min);
  const config = {
    OK:       { color: "#34d399", bg: "rgba(52,211,153,0.2)",  border: "rgba(52,211,153,0.3)"  },
    BAS:      { color: "#fbbf24", bg: "rgba(251,191,36,0.2)",  border: "rgba(251,191,36,0.3)"  },
    CRITIQUE: { color: "#f97316", bg: "rgba(249,115,22,0.2)",  border: "rgba(249,115,22,0.3)"  },
    RUPTURE:  { color: "#f87171", bg: "rgba(248,113,113,0.2)", border: "rgba(248,113,113,0.3)" },
  }[status];
 
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "6px", px: "10px", py: "4px", borderRadius: "100px", background: config.bg, border: "0.5px solid", borderColor: config.border, backdropFilter: "blur(8px)" }}>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: config.color, letterSpacing: "0.02em" }}>
        {status}
      </Typography>
    </Box>
  );
}
 
// ── Format date backend [year,month,day,h,m,s,nano] ────────────
function formatDate(createdAt) {
  if (!createdAt) return "—";
  if (Array.isArray(createdAt)) {
    const [y, m, d] = createdAt;
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  }
  return new Date(createdAt).toLocaleDateString("fr-FR");
}

export function Product() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));   // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));   // < 900px

   // Colonnes cachées selon la taille d'écran
const columnVisibilityModel = {
  description:  !isMobile && !isTablet,  // desktop uniquement
  categoryName: !isMobile,               // tablette + desktop
  createdAt:    !isMobile && !isTablet,  // desktop uniquement
  minStock:     !isMobile,               // tablette + desktop
};




   const {
    filteredByChip, search, setSearch,
    activeFilter, setActiveFilter,
    deleteOpen, selectedItem, confirmDelete, cancelDelete,
    editOpen, editItem, setEditOpen,
    handleEdit, handleDelete, saveEdit,
  } = useTablePage(
    mockProducts,
    ["name", "reference", "categoryName", "description"],
    // Filtre chip par statut stock
    (item, filter) => {
      if (filter === "TOUS") return true;
      return getStockStatus(item.actualStock, item.minStock) === filter;
    }
  );

 

console.log({ isMobile, isTablet, columnVisibilityModel });

  const columns = [
    { field: "reference",    headerName: "Référence",    flex: 1 },
    { field: "name",         headerName: "Nom du produit", flex: 1,
        renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ width: 30, height: 30, borderRadius: "6px", background: "rgba(96,165,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>
            {row.imageUrl ? (
              <img src={row.imageUrl} alt={row.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
            ) : "📦"}
          </Box>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{row.name}</Typography>
            {row.description && (
              <Typography sx={{ fontSize: 11, color: "text.disabled", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 160 }}>
                {row.description}
              </Typography>
            )}
          </Box>
        </Box>
      ),
     },
    {
      field: "categoryName",
      headerName: "Catégorie",
      width: 130,
      renderCell: ({ value }) => (
        <Box sx={{ display: "inline-flex", px: "10px", py: "4px", borderRadius: "100px", background: "rgba(148,163,184,0.15)", border: "0.5px solid rgba(148,163,184,0.3)" }}>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>{value}</Typography>
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
          {Number(value).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
        </Typography>
      ),
    },
    {
      field: "actualStock",
      headerName: "Stock",
      width: 110,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{row.actualStock}</Typography>
          <Typography sx={{ fontSize: 11, color: "text.disabled" }}>/ {row.minStock} min</Typography>
        </Box>
      ),
    },
    {
      field: "minStock",
      headerName: "Stock min",
      width: 90,
      type: "number",
    },
    {
      field: "status",
      headerName: "Statut",
      width: 110,
      sortable: false,
      renderCell: ({ row }) => <StockChip actual={row.actualStock} min={row.minStock} />,
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 100,
      renderCell: ({ value }) => (
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
        filters={STOCK_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher un produit..."
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={`${selectedItem?.reference ?? ""} ${selectedItem?.name ?? ""}`}
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

      <TableGrid
        title="Liste des produits"
        rows={filteredByChip}
        columns={columns}
         columnVisibilityModel={columnVisibilityModel}
      />
    </>
  );
}