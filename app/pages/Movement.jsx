import { useTablePage } from "@/hooks/useTablePage";
import FilterToolbar from "@/components/FilterToolbar";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { movementSchema } from "@/schema/Movement.schema";
import { PackagePlus, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useMovements } from "@/hooks/useMovements";
import { Snackbar, Alert, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "@/theme";
import { translateMovementError } from "@/utils/movementErrors";
import { useProducts } from "@/hooks/useProducts";
import LiquidButton from "@/components/LiquidButton";
import { toInputDate } from "@/utils/formaDate";

const TYPE_FILTERS = [
  { label: "TOUS",   value: "TOUS" },
  { label: "ENTRÉE", value: "IN" },
  { label: "SORTIE", value: "OUT" },
];

const CREATE_MOVEMENT_DEFAULTS = {
  productId: "",
  quantity:  "",
  type:      "",
};

const DETAILS_MOVEMENT_FIELDS = [
  {
    name: "type",
    label: "Type de mouvement",
  },
  { name: "quantity",     label: "Quantité" },
  { name: "productName",  label: "Produit" },
  {
    name: "sourceType",
    label: "Source",
  },
  { name: "userFullName", label: "Créé par" },
  { name: "createdAt",    label: "Date" },
];

export function Movement() {
  const theme  = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet  = useMediaQuery(theme.breakpoints.down("md"));

  const [snackbar, setSnackbar]   = useState({ open: false, message: "", severity: "success" });

  const columnVisibilityModel = {
    productId:    !isTablet,
    sourceType:   !isTablet,
    userFullName: !isTablet,
    createdAt:    !isMobile,
  };

  const { products } = useProducts();

  // Construit les options du dropdown dynamiquement
  const CREATE_MOVEMENT_FIELDS = [
    {
      name: "type",
      label: "Type de mouvement",
      options: [
        { value: "IN",  label: "Entrée" },
        { value: "OUT", label: "Sortie" },
      ],
    },
    { name: "quantity", label: "Quantité" },
    {
      name: "productId",
      label: "Produit",
      options: products.map((p) => ({ value: p.id, label: p.name })),
    },
  ];

  const [showMine, setShowMine] = useState(false);
const [myMovements, setMyMovements] = useState([]);
const { movements, loading, createMovement, getMovementById, getMyMovements } = useMovements();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsMovement, setDetailsMovement] = useState(null);


  const activeRows = showMine ? myMovements : movements;

const {
  filteredByChip, search, setSearch,
  activeFilter, setActiveFilter,
  createOpen, setCreateOpen,
} = useTablePage(activeRows, ["productName", "userFullName"]);
  useEffect(() => {
  if (showMine) {
    getMyMovements()
      .then(setMyMovements)
      .catch(() => setMyMovements([]));
  }
}, [showMine]);

  // ── Créer ──────────────────────────────────────────────

  const saveCreate = async (data) => {
  try {
    await createMovement({
      productId: data.productId,
      quantity:  data.quantity,
      type:      Array.isArray(data.type) ? data.type[0] : data.type,  // ← extrait du tableau
    });
    setCreateOpen(false);
    setSnackbar({ open: true, message: "Mouvement enregistré avec succès.", severity: "success" });
  } catch (err) {
    setSnackbar({ open: true, message: translateMovementError(err), severity: "error" });
    throw err;
  }
};

 const handleRowClick = async (params) => {
  const movement = await getMovementById(params.row.id);
  setDetailsMovement({
    ...movement,
    createdAt: movement.createdAt
      ? new Date(movement.createdAt).toLocaleDateString("fr-FR") + " " +
        new Date(movement.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      : "—",
  });
  setDetailsOpen(true);
};

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
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: isIn ? "#34d399" : "#f87171" }}>
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
    {
      field: "sourceType",
      headerName: "Source",
      width: 120,
      renderCell: ({ value }) => {
        const config = {
          ADJUSTMENT: { label: "Ajustement", color: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
          ORDER:      { label: "Commande",   color: "#60a5fa", bg: "rgba(59,130,246,0.15)"  },
          SALE:       { label: "Vente",      color: "#f59e0b", bg: "rgba(245,158,11,0.15)"  },
        }[value] ?? { label: value, color: "#94a3b8", bg: "rgba(148,163,184,0.1)" };
        return (
          <Box sx={{
            px: "10px", py: "4px", borderRadius: "100px",
            background: config.bg, display: "inline-flex", alignItems: "center",
          }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: config.color }}>
              {config.label}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "userFullName",
      headerName: "Créé par",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 13 }}>{value ?? "—"}</Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 160,
      renderCell: ({ value }) => {
        if (!value) return <Typography sx={{ fontSize: 12, color: "text.secondary" }}>—</Typography>;
        const date = new Date(value);
        return (
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {date.toLocaleDateString("fr-FR")} {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </Typography>
        );
      },
    },
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
          action={
    <div className="flex items-center gap-2">
      {/* Bouton Mes mouvements — toggle */}
      <button
        onClick={() => setShowMine((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
        style={{
          background: showMine
            ? "linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(16,185,129,0.1) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          border: showMine
            ? "0.5px solid rgba(52,211,153,0.4)"
            : "0.5px solid rgba(255,255,255,0.15)",
          color: showMine ? "#34d399" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(20px)",
          boxShadow: showMine
            ? "0 0 20px rgba(52,211,153,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <User size={16} />
        <span className="hidden sm:inline">Mes mouvements</span>
      </button>

      <LiquidButton onClick={() => setCreateOpen(true)} icon={PackagePlus} color="blue">
        Enregistrer un mouvement
      </LiquidButton>
    </div>
  }
        
      />

      {/* Création */}
      <FormDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Enregistrer un mouvement"
        fields={CREATE_MOVEMENT_FIELDS}
        defaultValues={CREATE_MOVEMENT_DEFAULTS}
        schema={movementSchema}
        onSubmit={saveCreate}
      />

      <TableGrid
        title={showMine ? "Mes mouvements" : "Liste des mouvements"}
        rows={filteredByChip}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        loading={loading}
         onRowClick={handleRowClick}
      />

       <FormDialog
                    open={detailsOpen}
                    onClose={() => setDetailsOpen(false)}
                    title="Détails mouvement"
                    fields={DETAILS_MOVEMENT_FIELDS}
                    defaultValues={detailsMovement}
                    readOnly={true}     // ← mode lecture seule
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