import { useTablePage } from "@/hooks/useTablePage";
import { mockDataUsers } from "@/mock/AdminData";
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
import { Box, Typography, useTheme, useMediaQuery  } from "@mui/material";
import { tokens } from "@/theme";

const ROLE_FILTERS = [
  { label: "TOUS",         value: "TOUS" },
  { label: "ADMIN",        value: "ROLE_ADMIN" },
  { label: "GESTIONNAIRE", value: "ROLE_MANAGER" },
  { label: "EMPLOYÉ",      value: "ROLE_EMPLOYEE" },
];

const USER_FIELDS = [
  { name: "firstname",   label: "Prénom" },
  { name: "lastname",    label: "Nom" },
  { name: "email",       label: "Email" },
  { name: "phoneNumber", label: "Téléphone" },
  { name: "birthdate",   label: "Date de naissance", type: "date" },
  {
    name: "roles", label: "Rôle",
    options: [
      { value: "ROLE_ADMIN",    label: "Admin" },
      { value: "ROLE_MANAGER",  label: "Gestionnaire" },
      { value: "ROLE_EMPLOYEE", label: "Employé" },
    ],
  },
];

export function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));   // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));   // < 900px

   // Colonnes cachées selon la taille d'écran
  const columnVisibilityModel = {
    email:       !isTablet,  // caché sur mobile + tablette
    phoneNumber: !isTablet,  // caché sur mobile + tablette
    birthdate:   !isMobile,  // caché seulement sur mobile
  };


  const {
    filteredByChip, search, setSearch,
    activeFilter, setActiveFilter,
    deleteOpen, selectedItem, confirmDelete, cancelDelete,
    editOpen, editItem, setEditOpen,
    handleEdit, handleDelete, saveEdit,
  } = useTablePage(mockDataUsers, ["firstname", "lastname", "email", "phoneNumber"]);

  const columns = [
    { field: "firstname", headerName: "Prénom", flex: 1 },
    { field: "lastname",  headerName: "Nom",    flex: 1 },
    { field: "email",     headerName: "Email",  flex: 1 },
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
            color: "#34d399", bg: "rgba(52,211,153,0.3)", border: "rgba(52,211,153,0.3)",
          },
          manager: {
            label: "Gestionnaire",
            icon: <SecurityOutlinedIcon sx={{ fontSize: 15 }} />,
            color: "#60a5fa", bg: "rgba(59,130,246,0.3)", border: "rgba(59,130,246,0.3)",
          },
          employee: {
            label: "Employé",
            icon: <BadgeIcon sx={{ fontSize: 15 }} />,
            color: "#60a5fa", bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.3)",
          },
        }[access] ?? { label: access, icon: null, color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.2)" };

        return (
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: "6px", px: "10px", py: "4px", borderRadius: "100px", background: config.bg, border: "0.5px solid", borderColor: config.border, backdropFilter: "blur(8px)" }}>
            <Box sx={{ color: config.color, display: "flex", alignItems: "center" }}>{config.icon}</Box>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: config.color, letterSpacing: "0.02em" }}>
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
        filters={ROLE_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher un utilisateur..."
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

      <TableGrid
        title="Liste des utilisateurs"
        rows={filteredByChip}
        columns={columns}
         columnVisibilityModel={columnVisibilityModel}
      />
    </>
  );
}