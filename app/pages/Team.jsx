import { useTablePage } from "@/hooks/useTablePage";
//import { mockDataUsers } from "@/mock/AdminData";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { userSchema } from "@/schema/User.schema";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "@/theme";
import { useState } from "react";
import { createUserSchema } from "@/schema/createUser.schema";
import { UserPlus } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { Snackbar, Alert } from "@mui/material";
import { translateUserError } from "@/utils/userErrors";
import { toFrontendDate } from "@/utils/formaDate";
import { toInputDate } from "@/utils/formaDate";
import LiquidButton from "@/components/LiquidButton";

const CREATE_USER_DEFAULTS = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  phoneNumber: "",
  birthdate: "",
  roles: [],
};

// Champs création — username en plus par rapport à l'édition
const CREATE_USER_FIELDS = [
  { name: "firstname", label: "Prénom" },
  { name: "lastname", label: "Nom" },
  { name: "email", label: "Email" },
  { name: "username", label: "Nom d'utilisateur" },
  { name: "phoneNumber", label: "Téléphone" },
  { name: "birthdate", label: "", type: "date" },
  {
    name: "roles",
    label: "Rôle",
    options: [
      { value: "ROLE_ADMIN", label: "Admin" },
      { value: "ROLE_MANAGER", label: "Gestionnaire" },
      { value: "ROLE_EMPLOYEE", label: "Employé" },
    ],
  },
];

const ROLE_FILTERS = [
  { label: "TOUS", value: "TOUS" },
  { label: "ADMIN", value: "ROLE_ADMIN" },
  { label: "GESTIONNAIRE", value: "ROLE_MANAGER" },
  { label: "EMPLOYÉ", value: "ROLE_EMPLOYEE" },
];

const USER_FIELDS = [
  { name: "firstname", label: "Prénom" },
  { name: "lastname", label: "Nom" },
  { name: "email", label: "Email" },
  { name: "phoneNumber", label: "Téléphone" },
  { name: "birthdate", label: "", type: "date" },
  {
    name: "roles",
    label: "Rôle",
    options: [
      { value: "ROLE_ADMIN", label: "Admin" },
      { value: "ROLE_MANAGER", label: "Gestionnaire" },
      { value: "ROLE_EMPLOYEE", label: "Employé" },
    ],
  },
];

export function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // < 900px

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsUser, setDetailsUser] = useState(null);

  // Colonnes cachées selon la taille d'écran
  const columnVisibilityModel = {
    email: !isTablet, // caché sur mobile + tablette
    phoneNumber: !isTablet, // caché sur mobile + tablette
    birthdate: !isMobile, // caché seulement sur mobile
  };

  const { users, loading, createUser, updateUser, deleteUser, getUserById } =
    useUsers();

  const {
    filteredByChip,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    deleteOpen,
    selectedItem,
    cancelDelete,
    editOpen,
    editItem,
    setEditOpen,
    handleEdit,
    handleDelete,
    createOpen,
    setCreateOpen,
  } = useTablePage(users, ["firstname", "lastname", "email", "phoneNumber"]);

  // ← versions backend
  const saveEdit = async (data) => {
    try {
      await updateUser(editItem.id, data);
      setEditOpen(false);
      setSnackbar({
        open: true,
        message: "Utilisateur modifié avec succès.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: translateUserError(err),
        severity: "error",
      });
    }
  };

  const saveCreate = async (data) => {
    try {
      await createUser(data);
      setCreateOpen(false);
      setSnackbar({
        open: true,
        message: "Utilisateur créé — un email d'activation a été envoyé.",
        severity: "success",
      });
    } catch (err) {
      console.log("err complet:", err.response);
      setSnackbar({
        open: true,
        message: translateUserError(err),
        severity: "error",
      });
      throw err;
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedItem.id);
      cancelDelete();
      setSnackbar({
        open: true,
        message: "Utilisateur supprimé.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: translateUserError(err),
        severity: "error",
      });
      throw err;
    }
  };

  const handleRowClick = async (params) => {
    const id = params.row.id;

    const user = await getUserById(id);
    const formatted = {
      ...user,
      birthdate: user.birthdate ? toInputDate(user.birthdate) : "",
    };

    setDetailsUser(formatted);
    setDetailsOpen(true);
  };

  const columns = [
    { field: "firstname", headerName: "Prénom", flex: 1 },
    { field: "lastname", headerName: "Nom", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Téléphone", flex: 1 },
    {
      field: "birthdate",
      headerName: "Naissance",
      width: 110,
      renderCell: ({ value }) => {
        return (
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {value ? toFrontendDate(value) : "—"}
          </Typography>
        );
      },
    },
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
            onClick={(event) => {
              event.stopPropagation();
              handleEdit(row, (r) => ({
                ...r,
                birthdate: r.birthdate ? toInputDate(r.birthdate) : "",
                roles: r.roles ?? [],
              }));
            }}
          />
          <DeleteIcon
            sx={{
              fontSize: 18,
              color: colors.redAccent[500],
              cursor: "pointer",
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(row);
            }}
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
        filters={ROLE_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher un utilisateur..."
        action={
          <LiquidButton
            onClick={() => setCreateOpen(true)}
            icon={UserPlus}
            color="blue"
          >
            Créer un utilisateur
          </LiquidButton>
        }
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={`${selectedItem?.firstname ?? ""} ${selectedItem?.lastname ?? ""}`}
      />

      <FormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifier l'utilisateur"
        fields={USER_FIELDS}
        defaultValues={editItem}
        schema={userSchema}
        onSubmit={saveEdit}
      />

      {/* Dialog création — même composant, champs différents */}
      <FormDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Créer un utilisateur"
        fields={CREATE_USER_FIELDS}
        defaultValues={CREATE_USER_DEFAULTS}
        schema={createUserSchema}
        onSubmit={saveCreate}
      />

      <FormDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title="Détails utilisateur"
        fields={USER_FIELDS}
        defaultValues={detailsUser}
        readOnly={true} // ← mode lecture seule
      />

      <TableGrid
        title="Liste des utilisateurs"
        rows={filteredByChip}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onRowClick={handleRowClick}
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
