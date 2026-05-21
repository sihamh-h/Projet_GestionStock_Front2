import { useTablePage } from "@/hooks/useTablePage";
import { mockAlerts } from "@/mock/AdminData";
import FilterToolbar from "@/components/FilterToolbar";
import TableGrid from "@/components/TableGrid";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const SEVERITY_FILTERS = [
  { label: "TOUS",     value: "TOUS"     },
  { label: "LOW",      value: "LOW"      },
  { label: "MEDIUM",   value: "MEDIUM"   },
  { label: "HIGH",     value: "HIGH"     },
  { label: "CRITICAL", value: "CRITICAL" },
];

const SEVERITY_CONFIG = {
  LOW:      { color: "#34d399", bg: "rgba(52,211,153,0.2)",  border: "rgba(52,211,153,0.3)"  },
  MEDIUM:   { color: "#fbbf24", bg: "rgba(251,191,36,0.2)",  border: "rgba(251,191,36,0.3)"  },
  HIGH:     { color: "#f97316", bg: "rgba(249,115,22,0.2)",  border: "rgba(249,115,22,0.3)"  },
  CRITICAL: { color: "#f87171", bg: "rgba(248,113,113,0.2)", border: "rgba(248,113,113,0.3)" },
};

function formatDate(createdAt) {
  if (!createdAt) return "—";
  if (Array.isArray(createdAt)) {
    const [y, m, d, h, min] = createdAt;
    return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y} ${String(h).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
  }
  return new Date(createdAt).toLocaleDateString("fr-FR");
}

export function Alerts() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const columnVisibilityModel = {
    productReference: !isTablet,
    createdAt:        !isTablet,
  };

  const {
    filteredByChip, search, setSearch,
    activeFilter, setActiveFilter,
  } = useTablePage(
    mockAlerts,
    ["productName", "productReference", "message"],
    (item, filter) => item.severity === filter,
  );

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
              {value}
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
      />
    </>
  );
}