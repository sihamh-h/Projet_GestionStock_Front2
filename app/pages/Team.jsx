import TableGrid from "@/components/TableGrid";
import { mockDataUsers } from "@/mock/AdminData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BadgeIcon from "@mui/icons-material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Box, Typography, useTheme, Stack, Chip } from "@mui/material";
import { tokens } from "@/theme";
import { useState, useMemo } from "react";
import FormDialog from "@/components/FormDialog";
import { userSchema } from "@/schema/User.schema";
import { useSearch } from "@/hooks/useSearch";
import SearchBar from "@/components/SearchBar";

export function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDark = theme.palette.mode === "dark";

  const [users, setUsers] = useState(mockDataUsers);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleDelete = (row) => {
    setSelectedUser(row);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
    setDeleteOpen(false);
    setSelectedUser(null);
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
    setSelectedUser(null);
  };

  /*const userFields = [
    { name: "name", label: "Nom" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Téléphone" },
    { name: "status", label: "Status" },
    { name: "access", label: "Rôle" },
  ];*/


 const userFields = [
  { name: "firstname",   label: "Prénom" },
  { name: "lastname",    label: "Nom" },
  { name: "email",       label: "Email" },
  { name: "phoneNumber", label: "Téléphone" },
  { name: "birthdate",   label: "Date de naissance", type: "date" },
  {
    name: "roles",
    label: "Rôle",
    options: [
      { value: "ROLE_ADMIN",    label: "Admin" },
      { value: "ROLE_MANAGER",  label: "Gestionnaire" },
      { value: "ROLE_EMPLOYEE", label: "Employé" },
    ],
  },
]
  const handleEdit = (row) => {
  setEditUser({
    ...row,
    birthdate: row.birthdate ?? "",   // déjà "1989-01-01", compatible input date
    roles: row.roles ?? [],           // garder le tableau ["ROLE_EMPLOYEE"]
  });
  setEditOpen(true);
};

  const saveEdit = (data) => {
     console.log("saveEdit called", data); 
    setUsers((prev) =>
      prev.map((u) => (u.id === editUser.id ? { ...u, ...data } : u)),
    );
  };

  const columns = [
    { field: "firstname", headerName: "Prénom", flex: 1 },
{ field: "lastname", headerName: "Nom", flex: 1 },
{ field: "email", headerName: "Email", flex: 1 },
{ field: "phoneNumber", headerName: "Téléphone", flex: 1 },
    {
      field: "roles",
      headerName: "Rôles",
      flex: 1,
      renderCell: ({ row }) => {
        const role = row.roles?.[0] ?? "unknown";
        const access = role.replace("ROLE_", "").toLowerCase();

        const config = {
          admin: {
            label: "Admin",
            icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 15 }} />,
            color: "#34d399",
            bg: "rgba(52,211,153,0.3)",
            border: "rgba(52,211,153,0.3)",
          },
          manager: {
            label: "Gestionnaire",
            icon: <SecurityOutlinedIcon sx={{ fontSize: 15 }} />,
            color: "#60a5fa",
            bg: "rgba(59,130,246,0.3)",
            border: "rgba(59,130,246,0.3)",
          },
          employee: {
            label: "Employé",
            icon: <BadgeIcon sx={{ fontSize: 15 }} />,
            color: "#60a5fa",
            bg: "rgba(59,130,246,0.15)",
            border: "rgba(59,130,246,0.3)",
          },
        }[access] ?? {
          label: access,
          icon: null,
          color: "#94a3b8",
          bg: "rgba(148,163,184,0.1)",
          border: "rgba(148,163,184,0.2)",
        };

        return (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              px: "10px",
              py: "4px",
              borderRadius: "100px",
              background: config.bg,
              border: "0.5px solid",
              borderColor: config.border,
              backdropFilter: "blur(8px)",
            }}
          >
            <Box
              sx={{
                color: config.color,
                display: "flex",
                alignItems: "center",
              }}
            >
              {config.icon}
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: config.color,
                letterSpacing: "0.02em",
              }}
            >
              {config.label}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          <EditIcon
            sx={{ fontSize: 18, color: colors.color, cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          />
          <DeleteIcon
            sx={{
              fontSize: 18,
              color: colors.redAccent[500],
              cursor: "pointer",
            }}
            onClick={() => handleDelete(row)}
          />
        </Box>
      ),
    },
  ];


  const [roleFilter, setRoleFilter] = useState("TOUS");

   const { search, setSearch, filtered} = useSearch(users, [
    "firstname", "lastname", "email", "username", "phoneNumber",
  ]);


  
  const filteredByRole = useMemo(() => {
  if (roleFilter === "TOUS") return filtered;
  return filtered.filter((u) => u.roles?.includes(roleFilter));
}, [filtered, roleFilter]);

  

  return (
    <>

    <Box>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un utilisateur..."
        width={250}
      />

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
          {[
  { label: "TOUS",         value: "TOUS" },
  { label: "ADMIN",        value: "ROLE_ADMIN" },
  { label: "GESTIONNAIRE", value: "ROLE_MANAGER" },
  { label: "EMPLOYÉ",      value: "ROLE_EMPLOYEE" },
].map(({ label, value }) => (
            <Chip  key={value}
    label={label} size="small" clickable
              onClick={() => setRoleFilter(value)}
              sx={{
                fontWeight: 500, fontSize: 11,
                background: roleFilter === value ? "#4f46e5" : "transparent",
                color: roleFilter === value ? "white" : "text.secondary",
                border: "0.5px solid",
                borderColor: roleFilter === value ? "#4f46e5" : "divider",
                "&:hover": { background: roleFilter === value ? "#4338ca" : "action.hover" },
              }}
            />
          ))}
        </Stack>
    </Box>

    
    
    <Dialog
  open={deleteOpen}
  onClose={cancelDelete}
  maxWidth="xs"
  fullWidth
  sx={{
    "& .MuiBackdrop-root": {
      backdropFilter: "blur(3px)",
      background: isDark
        ? "rgba(0,0,0,0.5)"
        : "rgba(15,23,42,0.3)",
    },
    "& .MuiDialog-paper": {
      borderRadius: "20px",
      background: isDark
        ? "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(15,23,42,0.6) 30%, rgba(30,41,59,0.4) 60%, rgba(255,255,255,0.1) 100%)"
        : "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(241,245,249,0.2) 30%, rgba(226,232,240,0.2) 60%, rgba(255,255,255,0.6) 100%)",
      backdropFilter: "blur(5px)",
      border: isDark
        ? "0.5px solid rgba(255,255,255,0.3)"
        : "0.5px solid rgba(255,255,255,0.7)",
      boxShadow: isDark
        ? `0 0 0 0.5px rgba(255,255,255,0.05),
           0 20px 60px rgba(0,0,0,0.6),
           0 1px 0 rgba(255,255,255,0.15) inset,
           0 -1px 0 rgba(0,0,0,0.3) inset`
        : `0 0 0 0.5px rgba(255,255,255,0.9),
           0 20px 60px rgba(15,23,42,0.3),
           0 1px 0 rgba(255,255,255,1) inset,
           0 -1px 0 rgba(15,23,42,0.05) inset`,
      overflow: "hidden",
      position: "relative",
    },

    "& .MuiDialog-paper::before": {
      content: '""',
      position: "absolute",
      top: 0, left: 3, right: 1,
      height: "50%"
    },

  }}
>

  <DialogTitle
    sx={{
      textAlign: "center",
      fontWeight: 700,
      fontSize: 20,
      pt: 3,
      position: "relative",
      zIndex: 1,
      background: isDark
        ? "linear-gradient(90deg, #f1f5f9 0%, #93c5fd 50%, #67e8f9 100%)"
        : "linear-gradient(180deg, #0f172a 0%, #2563eb 60%, #0891b2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    Confirmation
  </DialogTitle>

  <DialogContent sx={{ textAlign: "center", position: "relative", zIndex: 1, pb: 1 }}>
    <Typography
      variant="body2"
      sx={{
        fontSize: 15,
        lineHeight: 3,
        color: isDark ? "rgba(203,213,225,0.85)" : "rgba(30,41,59,0.75)",
      }}
    >
      Voulez-vous vraiment supprimer l'utilisateur :{" "}
      <Box component="span" sx={{ fontWeight: 700, color: isDark ? "#93c5fd" : "#2563eb" }}>
        {selectedUser?.name}
      </Box>
    </Typography>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 3, gap: 1.5, justifyContent: "center", position: "relative", zIndex: 1 }}>
    <Button
      onClick={cancelDelete}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        px: 3.5, py: 1.2,
        borderRadius: "100px",
        color: isDark ? "rgba(241,245,249,0.9)" : "rgba(15,23,42,0.85)",
        background: isDark
          ? "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)"
          : "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(230,245,249,0.9) 100%)",
        border: isDark
          ? "0.5px solid rgba(255,255,255,0.2)"
          : "0.5px solid rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px) saturate(180%)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,1), 0 2px 8px rgba(15,23,42,0.1)",
        "&:hover": {
          background: isDark
            ? "linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)"
            : "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(241,245,249,0.8) 100%)",
          boxShadow: isDark
            ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(0,0,0,0.3)"
            : "inset 0 1px 0 rgba(255,255,255,1), 0 4px 16px rgba(15,23,42,0.15)",
        },
      }}
    >
      Annuler
    </Button>

    <Button
      onClick={confirmDelete}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        px: 3.5, py: 1.2,
        borderRadius: "100px",
        color: isDark ? "#fecaca" : "#fff",
        background: isDark
          ? "linear-gradient(90deg, rgba(239,68,68,0.4) 0%, rgba(185,28,28,0.7) 60%, rgba(239,68,68,0.2) 100%)"
          : "linear-gradient(90deg, rgba(239,68,68,1) 10%, rgba(185,28,28,0.8) 50%, rgba(239,68,68,0.6) 100%)",
        border: isDark
          ? "0.5px solid rgba(252,165,165,0.3)"
          : "0.5px solid rgba(252,165,165,0.5)",
        backdropFilter: "blur(12px) saturate(180%)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 12px rgba(239,68,68,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 12px rgba(185,28,28,0.3)",
        "&:hover": {
          background: isDark
            ? "linear-gradient(90deg, rgba(239,68,68,0.6) 0%, rgba(185,28,28,0.9) 60%, rgba(239,68,68,0.3) 100%)"
            : "linear-gradient(90deg, rgba(239,68,68,1) 0%, rgba(185,28,28,1) 100%)",
          boxShadow: isDark
            ? "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px rgba(239,68,68,0.35)"
            : "inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 20px rgba(185,28,28,0.4)",
        },
      }}
    >
      Supprimer
    </Button>
  </DialogActions>
</Dialog>

      <FormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifier l’utilisateur"
        fields={userFields}
        defaultValues={editUser}
        schema={userSchema}
        onSubmit={saveEdit}
      />

      <TableGrid
        title="Liste des utilisateurs"
        rows={filteredByRole}
        columns={columns}
      />

  
    </>
  );
}
