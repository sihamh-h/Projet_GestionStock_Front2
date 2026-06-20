import { useTablePage } from "@/hooks/useTablePage";
import FilterToolbar from "@/components/FilterToolbar";
import TableGrid from "@/components/TableGrid";
import { Box, Typography, useTheme, useMediaQuery, Snackbar, Alert, Button } from "@mui/material";
import { tokens } from "@/theme";
import { useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import { CheckCircle } from "lucide-react";

const SEVERITY_FILTERS = [
  { label: "TOUS",     value: "TOUS"     },
  { label: "LOW",      value: "LOW"      },
  { label: "MEDIUM",   value: "MEDIUM"   },
  { label: "HIGH",     value: "HIGH"     },
  { label: "CRITICAL", value: "CRITICAL" },
];

const SEVERITY_CONFIG = {
  LOW:      { label: "LOW",      color: "#34d399", bg: "rgba(52,211,153,0.2)",  border: "rgba(52,211,153,0.3)"  },
  MEDIUM:   { label: "MEDIUM",   color: "#fbbf24", bg: "rgba(251,191,36,0.2)",  border: "rgba(251,191,36,0.3)"  },
  HIGH:     { label: "HIGH",     color: "#f97316", bg: "rgba(249,115,22,0.2)",  border: "rgba(249,115,22,0.3)"  },
  CRITICAL: { label: "CRITICAL", color: "#f87171", bg: "rgba(248,113,113,0.2)", border: "rgba(248,113,113,0.3)" },
};

function formatDate(createdAt) {
  if (!createdAt) return "—";
  if (Array.isArray(createdAt)) {
    const [y, m, d, h, min] = createdAt;
    return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y} ${String(h).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
  }
  return new Date(createdAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

export function Alerts() {
  const theme    = useTheme();
  const colors   = tokens(theme.palette.mode);
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { alerts, loading, resolveAlert } = useAlerts();

  const columnVisibilityModel = {
    productReference: !isTablet,
    createdAt:        !isTablet,
  };

  const {
    filteredByChip, search, setSearch,
    activeFilter, setActiveFilter,
  } = useTablePage(
    alerts,
    ["productName", "productReference", "message"],
    (item, filter) => item.severity === filter,
  );

  // ── Résoudre une alerte ────────────────────────────────
  const handleResolve = async (id, e) => {
    e.stopPropagation();
    try {
      await resolveAlert(id);
      setSnackbar({ open: true, message: "Alerte résolue.", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: "Erreur lors de la résolution.", severity: "error" });
    }
  };

  const columns = [
    {
      field: "severity",
      headerName: "Sévérité",
      width: 110,
      renderCell: ({ value }) => {
        const config = SEVERITY_CONFIG[value] ?? SEVERITY_CONFIG.LOW;
        return (
          <Box sx={{ display: "inline-flex", px: "10px", py: "4px", borderRadius: "100px", background: config.bg, border: "0.5px solid", borderColor: config.border }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: config.color }}>
              {config.label}
            </Typography>
          </Box>
        );
      },
    },
    { field: "productName",      headerName: "Produit",   flex: 1 },
    { field: "productReference", headerName: "Référence", width: 110 },
    { field: "message",          headerName: "Message",   flex: 2 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 130,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {formatDate(value)}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 120,
      renderCell: ({ row }) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<CheckCircle size={13} />}
          onClick={(e) => handleResolve(row.id, e)}
          sx={{
            fontSize: 11, textTransform: "none",
            color: "#34d399", borderColor: "rgba(52,211,153,0.4)",
            py: "2px", px: "8px",
          }}
        >
          Résoudre
        </Button>
      ),
    },
  ];

  return (
    <>
      <FilterToolbar
        search={search}
        onSearch={setSearch}
        filters={SEVERITY_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher une alerte..."
      />

      <TableGrid
        title="Alertes stock"
        rows={filteredByChip}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
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