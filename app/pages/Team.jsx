import { useState, useMemo } from "react";
import {
  Box, Typography, useTheme, IconButton, Tooltip,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack, useMediaQuery, Card,
  CardContent, Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme";
import { mockDataUsers } from "@/mock/AdminData";
import { useSearch } from "@/hooks/useSearch";
import SearchBar from "@/components/SearchBar";

import { ROLES, ROLE_LABELS, EMPTY_FORM } from "@/mock/AdminData";

// ── Icônes SVG inline ───────────────────────────────────────────
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
  </svg>
);
const DeleteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
  </svg>
);


//----roles-------------------------------------------------------
function RoleChip({ role }) {
  const config = ROLE_LABELS[role] ?? { label: role, color: "#6b7280", bg: "#f3f4f6" };
  return (
    <Chip label={config.label} size="small"
      sx={{ background: config.bg, color: config.color, fontWeight: 500, fontSize: 11, height: 22, mr: 0.5 }}
    />
  );
}



// ── Card mobile — un utilisateur ────────────────────────────────
// function UserCard({ row, onEdit, onDelete }) {
//   return (
//     <Card
//       sx={{
//         borderRadius: "12px",
//         border: "0.5px solid",
//         borderColor: "divider",
//         boxShadow: "none",
//         mb: 1.5,
//       }}
//     >
//       <CardContent sx={{ p: "16px !important" }}>
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           {/* Avatar + nom */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Box sx={{
//               width: 40, height: 40, borderRadius: "50%",
//               background: "#4f46e5",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               flexShrink: 0,
//             }}>
//               <Typography sx={{ fontSize: 14, fontWeight: 600, color: "white" }}>
//                 {(row.firstname?.[0] ?? "") + (row.lastname?.[0] ?? "")}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography sx={{ fontSize: 14, fontWeight: 600, color: "text.primary" }}>
//                 {row.firstname} {row.lastname}
//               </Typography>
//               <Typography sx={{ fontSize: 12, color: "text.disabled" }}>
//                 @{row.username ?? "—"}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Actions */}
//           <Box sx={{ display: "flex", gap: 0.5 }}>
//             <IconButton size="small" onClick={() => onEdit(row)}
//               sx={{ color: "#4f46e5", "&:hover": { background: "#eef2ff" } }}>
//               <EditIcon />
//             </IconButton>
//             <IconButton size="small" onClick={() => onDelete(row)}
//               sx={{ color: "#dc2626", "&:hover": { background: "#fee2e2" } }}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Divider sx={{ my: 1.5 }} />

//         {/* Infos */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography sx={{ fontSize: 12, color: "text.disabled" }}>Email</Typography>
//             <Typography sx={{ fontSize: 12, color: "text.primary" }}>{row.email ?? "—"}</Typography>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography sx={{ fontSize: 12, color: "text.disabled" }}>Téléphone</Typography>
//             <Typography sx={{ fontSize: 12, color: "text.primary" }}>{row.phoneNumber ?? "—"}</Typography>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography sx={{ fontSize: 12, color: "text.disabled" }}>Rôle</Typography>
//             <Box sx={{ display: "flex", gap: 0.5 }}>
//               {(row.roles ?? []).map((r) => <RoleChip key={r} role={r} />)}
//             </Box>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography sx={{ fontSize: 12, color: "text.disabled" }}>Statut</Typography>
//             <Chip
//               label={row.enabled ? "Actif" : "Inactif"} size="small"
//               sx={{
//                 background: row.enabled ? "#dcfce7" : "#f1f5f9",
//                 color:      row.enabled ? "#16a34a" : "#64748b",
//                 fontWeight: 500, fontSize: 11, height: 22,
//               }}
//             />
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// ── Page Utilisateurs ───────────────────────────────────────────
export function Team() {
  const theme = useTheme();
  //const colors = tokens(theme.palette.mode);

  // true sur mobile (< md = 900px)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // TODO: remplace par useUsers() quand back connecté
  const [rows, setRows] = useState(
    mockDataUsers.map((u) => ({
      ...u,
      firstname:   u.name?.split(" ")[0] ?? u.firstname ?? "",
      lastname:    u.name?.split(" ")[1] ?? u.lastname  ?? "",
      roles:       u.access ? [u.access] : (u.roles ?? []),
    }))
  );

  // ── useSearch ─────────────────────────────────────────────────
  const { search, setSearch, filtered: filteredBySearch } = useSearch(rows, [
    "firstname", "lastname", "email", "username", "phoneNumber",
  ]);

  const [filterRole, setFilterRole] = useState("TOUS");

  const filtered = useMemo(() => {
    if (filterRole === "TOUS") return filteredBySearch;
    return filteredBySearch.filter((r) =>
      (r.roles ?? []).some((role) =>
        role.toLowerCase().includes(filterRole.toLowerCase())
      )
    );
  }, [filteredBySearch, filterRole]);

  // ── Dialog état ───────────────────────────────────────────────
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected]     = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);

  const handleEdit = (row) => {
    setSelected(row);
    setForm({
      firstname:   row.firstname   ?? "",
      lastname:    row.lastname    ?? "",
      username:    row.username    ?? "",
      email:       row.email       ?? "",
      phoneNumber: row.phoneNumber ?? "",
      birthdate:   row.birthdate   ?? "",
      roles:       row.roles       ?? [],
    });
    setDialogOpen(true);
  };

  const handleDelete = (row) => {
    setSelected(row);
    setDeleteOpen(true);
  };

  const handleSave = () => {
    // TODO: appel API updateUser(selected.id, form)
    setRows((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, ...form } : r))
    );
    setDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    // TODO: appel API deleteUser(selected.id)
    setRows((prev) => prev.filter((r) => r.id !== selected.id));
    setDeleteOpen(false);
    setSelected(null);
  };

  // ── Colonnes DataGrid (desktop) ───────────────────────────────
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "fullName",
      headerName: "Utilisateur",
      flex: 1,
      minWidth: 180,
      valueGetter: (_, row) => `${row.firstname ?? ""} ${row.lastname ?? ""}`.trim(),
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: "white" }}>
              {(row.firstname?.[0] ?? "") + (row.lastname?.[0] ?? "")}
            </Typography>
          </Box>
          <Box>
            <Box sx={{ fontSize: 13, fontWeight: 500, color: "text.primary", lineHeight: 1.3 }}>
              {row.firstname} {row.lastname}
            </Box>
            <Box sx={{ fontSize: 11, color: "text.disabled" }}>@{row.username ?? "—"}</Box>
          </Box>
        </Box>
      ),
    },
    {
      field: "email", headerName: "Email", flex: 1, minWidth: 180,
      renderCell: ({ value }) => <Box sx={{ fontSize: 13, color: "text.secondary" }}>{value}</Box>,
    },
    {
      field: "phoneNumber", headerName: "Téléphone", width: 130,
      renderCell: ({ value }) => <Box sx={{ fontSize: 13, color: "text.secondary" }}>{value ?? "—"}</Box>,
    },
    {
      field: "roles", headerName: "Rôle(s)", width: 160, sortable: false,
      renderCell: ({ value }) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {(value ?? []).map((r) => <RoleChip key={r} role={r} />)}
        </Box>
      ),
    },
    {
      field: "enabled", headerName: "Statut", width: 90,
      renderCell: ({ value }) => (
        <Chip label={value ? "Actif" : "Inactif"} size="small"
          sx={{ background: value ? "#dcfce7" : "#f1f5f9", color: value ? "#16a34a" : "#64748b", fontWeight: 500, fontSize: 11, height: 22 }}
        />
      ),
    },
    {
      field: "actions", headerName: "Actions", width: 90, sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="Modifier" arrow>
            <IconButton size="small" onClick={() => handleEdit(row)}
              sx={{ color: "#4f46e5", "&:hover": { background: "#eef2ff" } }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer" arrow>
            <IconButton size="small" onClick={() => handleDelete(row)}
              sx={{ color: "#dc2626", "&:hover": { background: "#fee2e2" } }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

      {/* ── Header ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={600} color="text.primary">Utilisateurs</Typography>
          <Typography variant="body2" color="text.secondary">{rows.length} utilisateurs au total</Typography>
        </Box>
        <Button variant="contained" startIcon={<PlusIcon />}
          sx={{ background: "#4f46e5", borderRadius: "8px", textTransform: "none", fontWeight: 500, px: 2, "&:hover": { background: "#4338ca" } }}>
          Créer utilisateur
        </Button>
      </Box>

      {/* ── Filtres ── */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher par nom, email, username..."
          width={isMobile ? "100%" : 300}
        />
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
          {["TOUS", "ADMIN", "GESTIONNAIRE", "EMPLOYE"].map((r) => (
            <Chip key={r} label={r} size="small" clickable
              onClick={() => setFilterRole(r)}
              sx={{
                fontWeight: 500, fontSize: 11,
                background: filterRole === r ? "#4f46e5" : "transparent",
                color: filterRole === r ? "white" : "text.secondary",
                border: "0.5px solid",
                borderColor: filterRole === r ? "#4f46e5" : "divider",
                "&:hover": { background: filterRole === r ? "#4338ca" : "action.hover" },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* ── Vue mobile : Cards ── */}
      {isMobile ? (
        <Box>
          {filtered.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "text.disabled", py: 4 }}>
              Aucun utilisateur trouvé
            </Typography>
          ) : (
            filtered.map((row) => (
              <UserCard
                key={row.id}
                row={row}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </Box>
      ) : (
        /* ── Vue desktop : DataGrid ── */
        <Box sx={{ background: "background.paper", borderRadius: "12px", border: "0.5px solid", borderColor: "divider", overflow: "hidden" }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            sx={{
              border: "none", fontSize: 13,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
                fontSize: 12, fontWeight: 600, color: "text.secondary",
                textTransform: "uppercase", letterSpacing: "0.04em",
                borderBottom: "0.5px solid", borderColor: "divider",
              },
              "& .MuiDataGrid-row":  { "&:hover": { backgroundColor: "#f8fafc" } },
              "& .MuiDataGrid-cell": { borderColor: "divider", display: "flex", alignItems: "center" },
              "& .MuiDataGrid-footerContainer": { borderTop: "0.5px solid", borderColor: "divider" },
            }}
          />
        </Box>
      )}

      {/* ── Dialog Édition ── */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}
        maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "12px" } }}>
        <DialogTitle sx={{ fontWeight: 600, fontSize: 16, pb: 1 }}>
          Modifier l'utilisateur
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "12px !important" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 2 }}>
            <TextField label="Prénom"    size="small" value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })} required />
            <TextField label="Nom"       size="small" value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })} required />
            <TextField label="Username"  size="small" value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            <TextField label="Email"     size="small" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <TextField label="Téléphone" size="small" value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
            <TextField label="Date de naissance" size="small" type="date"
              value={form.birthdate}
              onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
              InputLabelProps={{ shrink: true }} />
          </Box>
          <TextField select label="Rôle" size="small"
            value={form.roles[0] ?? ""}
            onChange={(e) => setForm({ ...form, roles: [e.target.value] })}
            fullWidth>
            {ROLES.map((r) => (
              <MenuItem key={r} value={r}>{ROLE_LABELS[r]?.label ?? r}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)}
            sx={{ textTransform: "none", color: "text.secondary" }}>Annuler</Button>
          <Button variant="contained" onClick={handleSave}
            sx={{ textTransform: "none", background: "#4f46e5", borderRadius: "8px", "&:hover": { background: "#4338ca" } }}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Dialog Suppression ── */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}
        maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "12px" } }}>
        <DialogTitle sx={{ fontWeight: 600, fontSize: 16 }}>Supprimer l'utilisateur</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Voulez-vous vraiment supprimer{" "}
            <strong>{selected?.firstname} {selected?.lastname}</strong> ?
            Le compte sera désactivé et anonymisé.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteOpen(false)}
            sx={{ textTransform: "none", color: "text.secondary" }}>Annuler</Button>
          <Button variant="contained" onClick={handleDeleteConfirm}
            sx={{ textTransform: "none", background: "#dc2626", borderRadius: "8px", "&:hover": { background: "#b91c1c" } }}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}