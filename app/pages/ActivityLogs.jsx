import { useState, useEffect, useCallback } from "react";
import TableGrid from "@/components/TableGrid";
import {
  Box, Typography, TextField, MenuItem, Button,
  Snackbar, Alert, TablePagination,
} from "@mui/material";
import { logService } from "@/services/logService";
import { useUsers } from "@/hooks/useUsers";
import { useTheme } from "@mui/material";
import { tokens } from "@/theme";

const ACTIONS = [
  "TOUS",
  "LOGIN", "PASSWORD_RESET",
  "PRODUCT_CREATE", "PRODUCT_UPDATE", "PRODUCT_DELETE",
  "MOVEMENT_IN", "MOVEMENT_OUT", "MOVEMENT_ERROR",
  "USER_CREATE", "USER_UPDATE", "USER_DELETE",
  "ORDER_CREATE", "ORDER_UPDATE", "ORDER_DELETE",
  "SALE_CREATE",
  "SUPPLIER_CREATE", "SUPPLIER_UPDATE", "SUPPLIER_DELETE",
];

const SUCCESS_FILTERS = [
  { label: "Tous",    value: ""      },
  { label: "OK",      value: "true"  },
  { label: "Erreur",  value: "false" },
];

function formatTimestamp(value) {
  if (!value) return "—";
  if (Array.isArray(value)) {
    const [y, m, d, h, min] = value;
    return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y} ${String(h).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
  }
  return new Date(value).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

const SIZE = 20;

export function ActivityLogs() {
  const [action,        setAction]        = useState("");
  const [userId,        setUserId]        = useState("");
  const [success,       setSuccess]       = useState("");
  const [logs,          setLogs]          = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [page,          setPage]          = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [snackbar,      setSnackbar]      = useState({ open: false, message: "", severity: "info" });

  const { users } = useUsers();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLight = theme.palette.mode === "light";

  const fetchLogs = useCallback(async (p = 0) => {
    setLoading(true);
    try {
      const params = {
        page: p,
        size: SIZE,
        ...(action && action !== "TOUS" && { action }),
        ...(userId                       && { userId }),
        ...(success !== ""               && { success: success === "true" }),
      };
      const data = await logService.getLogs(params);
      setLogs(data.content);
      setTotalElements(data.totalElements);
    } catch {
      setLogs([]);
      setSnackbar({ open: true, message: "Aucun log trouvé.", severity: "info" });
    } finally {
      setLoading(false);
    }
  }, [action, userId, success]);

  // Charge au mount
  useEffect(() => { fetchLogs(0); }, []);

  const handleSearch = () => {
    setPage(0);
    fetchLogs(0);
  };

  const handleReset = () => {
    setAction("");
    setUserId("");
    setSuccess("");
    setPage(0);
    fetchLogs(0);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
    fetchLogs(newPage);
  };

  const columns = [
    {
      field: "success", headerName: "Statut", width: 90,
      renderCell: ({ value }) => (
        <Box sx={{
          px: "10px", py: "4px", borderRadius: "100px",
          background: value ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)",
          border: "0.5px solid",
          borderColor: value ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)",
          display: "inline-flex", alignItems: "center",
        }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: value ? "#34d399" : "#f87171" }}>
            {value ? "OK" : "ERREUR"}
          </Typography>
        </Box>
      ),
    },
    { field: "action",      headerName: "Action",      width: 160 },
    { field: "userEmail",   headerName: "Utilisateur", flex: 1   },
    { field: "description", headerName: "Description", flex: 2   },
    {
      field: "timestamp", headerName: "Date", width: 140,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {formatTimestamp(value)}
        </Typography>
      ),
    },
  ];

  return (
    <>
 {/* Filtres */}
<Box sx={{
  display: "flex",
  gap: 2,
  mb: 3,
  flexWrap: "wrap",
  alignItems: "center",
  p: 3,
  borderRadius: "16px",
  border: "0.5px solid rgba(96,165,250,0.15)",
  background: isLight
    ? "rgba(0,0,0,0.02)"
    : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
 
}}>
  {/* Action */}
  <TextField select label="Action" size="small" sx={{ width: 220 }}
    value={action} onChange={(e) => setAction(e.target.value)}>
    {ACTIONS.map((a) => <MenuItem key={a} value={a === "TOUS" ? "" : a}>{a}</MenuItem>)}
  </TextField>

  {/* Utilisateur */}
  <TextField select label="Utilisateur" size="small" sx={{ width: 260 }}
    value={userId} onChange={(e) => setUserId(e.target.value)}>
    <MenuItem value="">Tous</MenuItem>
    {users.map((u) => (
      <MenuItem key={u.id} value={u.id}>
        {u.firstname} {u.lastname}
      </MenuItem>
    ))}
  </TextField>

  {/* Statut */}
  <TextField select label="Statut" size="small" sx={{ width: 140 }}
    value={success} onChange={(e) => setSuccess(e.target.value)}>
    {SUCCESS_FILTERS.map((f) => (
      <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
    ))}
  </TextField>

  {/* Boutons */}
  <button
    onClick={handleSearch}
    disabled={loading}
    className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    style={{
      background: isLight
    ? "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.1) 100%)"
    : "linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(59,130,246,0.05) 100%)",
      backdropFilter: "blur(20px)",
      border: "0.5px solid rgba(96,165,250,0.2)",
      color: isLight ? "#1d4ed8" : "white",
      boxShadow: "0 0 20px rgba(96,165,250,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
    }}
  >
    {loading ? "Chargement..." : "Rechercher"}
  </button>

  <button
    onClick={handleReset}
    disabled={loading}
    className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    style={{
      
      backdropFilter: "blur(20px)",
      
      
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
      background: isLight ? "rgba(0,0,0,0.04)" : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
  border: isLight ? "0.5px solid rgba(0,0,0,0.15)" : "0.5px solid rgba(255,255,255,0.15)",
  color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
    }}
  >
    Réinitialiser
  </button>
</Box>

      {/* Tableau */}
      <TableGrid
        title={`Logs d'activité — ${totalElements} entrée${totalElements > 1 ? "s" : ""}`}
        rows={logs}
        columns={columns}
        loading={loading}
        hideFooter
      />

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={SIZE}
        rowsPerPageOptions={[SIZE]}
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count}`}
      />

      <Snackbar open={snackbar.open} autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity} variant="filled" sx={{ borderRadius: "12px" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}