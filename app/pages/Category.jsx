import { useTablePage } from "@/hooks/useTablePage";
import { useCategories } from "@/hooks/useCategories";
import FilterToolbar from "@/components/FilterToolbar";
import DeleteDialog from "@/components/DeleteDialog";
import FormDialog from "@/components/FormDialog";
import TableGrid from "@/components/TableGrid";
import { categorySchema } from "@/schema/Category.schema";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { tokens } from "@/theme";
import { useState } from "react";
import { Plus } from "lucide-react";
import { translateCategoryError } from "@/utils/categoryErrors";
import { toFrontendDate, toInputDate } from "@/utils/formaDate";
import LiquidButton from "@/components/LiquidButton";

const CATEGORY_FIELDS = [
  { name: "name", label: "Nom" },
  { name: "description", label: "Description" },
];

const CATEGORY_DEFAULTS = { name: "", description: "" };

export function Category() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    categories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  } = useCategories();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsCategory, setDetailsCategory] = useState(null);
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
  } = useTablePage(categories, ["name", "description"]);

  const saveCreate = async (data) => {
    try {
      await createCategory(data);
      setCreateOpen(false);
      setSnackbar({
        open: true,
        message: "Catégorie créée avec succès.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: translateCategoryError(err),
        severity: "error",
      });
    }
  };

  const saveEdit = async (data) => {
    console.log("editItem:", editItem); // ← voir si id est présent
    console.log("data:", data);
    try {
      await updateCategory(editItem.id, data);
      setEditOpen(false);

      setSnackbar({
        open: true,
        message: "Catégorie modifiée avec succès.",
        severity: "success",
      });
    } catch (err) {
      console.log("erreur edit:", err.response);
      setSnackbar({
        open: true,
        message: translateCategoryError(err),
        severity: "error",
      });
    }
  };
  const confirmDelete = async () => {
    try {
      await deleteCategory(selectedItem.id);
      cancelDelete();
      setSnackbar({
        open: true,
        message: "Catégorie supprimée.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: translateCategoryError(err),
        severity: "error",
      });
    }
  };

  const handleRowClick = async (params) => {
    const id = params.row.id;

    const category = await getCategoryById(id);
    const formatted = {
      ...category,
      createdAt: category.createdAt ? toInputDate(category.createdAt) : "",
    };

    setDetailsCategory(formatted);
    setDetailsOpen(true);
  };

  const columnVisibilityModel = {
    createdAt: !isTablet,
  };

  const columns = [
    { field: "name", headerName: "Nom", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "createdAt",
      headerName: "Créée le",
      width: 110,
      renderCell: ({ value }) => (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {value ? toFrontendDate(value) : "—"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 80,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          <EditIcon
            sx={{ fontSize: 18, color: colors.color, cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("row:", row);
              handleEdit(row, (r) => ({
                ...r,
                name: r.name,
                description: r.description ?? "",
              }));
            }}
          />
          <DeleteIcon
            sx={{
              fontSize: 18,
              color: colors.redAccent[500],
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <section classeName="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 overflow-auto md:overflow-hidden">
      <FilterToolbar
        search={search}
        onSearch={setSearch}
        filters={[]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchPlaceholder="Rechercher une catégorie..."
        action={
          <LiquidButton onClick={() => setCreateOpen(true)} icon={Plus}>
            Créer une catégorie
          </LiquidButton>
        }
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={selectedItem?.name ?? ""}
      />

      <FormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifier la catégorie"
        fields={CATEGORY_FIELDS}
        defaultValues={editItem}
        schema={categorySchema}
        onSubmit={saveEdit}
      />

      <FormDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Créer une catégorie"
        fields={CATEGORY_FIELDS}
        defaultValues={CATEGORY_DEFAULTS}
        schema={categorySchema}
        onSubmit={saveCreate}
      />

      <FormDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title="Détails catégorie"
        fields={CATEGORY_FIELDS}
        defaultValues={detailsCategory}
        readOnly={true} // ← mode lecture seule
      />

      <TableGrid
        title="Liste des catégories"
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
    </section>
  );
}
