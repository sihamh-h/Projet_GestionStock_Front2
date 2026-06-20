import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "@/components/ImageUpload";

export default function FormDialog({
  open,
  onClose,
  title,
  fields,
  defaultValues = {},
  schema,
  onSubmit,
  readOnly = false,
}) {
  const {
    control,
    handleSubmit,
    reset,
    setError, // ← pour remonter les erreurs serveur dans le form
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  useEffect(() => {
    if (open) reset(defaultValues ?? {});
  }, [open]); // ← reset seulement à l'ouverture

  const onSubmitHandler = async (data) => {
    try {
      await onSubmit(data);
      // Le parent appelle onClose() si succès → on ne ferme pas ici
    } catch (err) {
      // Option A : erreur générique affichée sous le bon champ
      // ex : si le back dit "email already exists" → affiche sous email
      const fieldError = guessFieldFromError(err?.message);
      if (fieldError) {
        setError(fieldError.field, { message: fieldError.message });
      }
      // Le parent gère le Snackbar — on ne ferme pas
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: "12px !important",
          }}
        >
          {fields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: f }) =>
                field.type === "imagePreview" ? (
                  // ← affiche juste l'image sans input
                  f.value ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
                      <img
                        src={f.value}
                        alt="produit"
                        style={{ maxHeight: 150, borderRadius: 8, objectFit: "contain" }}
                      />
                    </Box>
                  ) : null
                ) : field.type === "image" ? (
                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: 4,
                        display: "block",
                      }}
                    >
                      {field.label}
                    </label>
                    <ImageUpload
                      value={f.value ?? ""}
                      onChange={(url) => f.onChange(url)}
                      uploadFn={field.uploadFn}
                    />
                  </div>
                ) : field.options ? (
                  <TextField
                    {...f}
                    select
                    label={field.label}
                    size="small"
                    fullWidth
                    value={
                      Array.isArray(f.value)
                        ? (f.value[0] ?? "")
                        : (f.value ?? "")
                    }
                    onChange={(e) => f.onChange([e.target.value])}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                    disabled={readOnly || isSubmitting}
                  >
                    {field.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    {...f}
                    label={field.label}
                    type={field.type ?? "text"}
                    size="small"
                    fullWidth
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                    disabled={readOnly || isSubmitting}
                  />
                )
              }
            />
          ))}
        </DialogContent>

        {!readOnly && (
          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button
              onClick={onClose}
              disabled={isSubmitting}
              sx={{ textTransform: "none", color: "text.secondary" }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={
                isSubmitting && <CircularProgress size={14} color="inherit" />
              }
              sx={{ textTransform: "none" }}
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

// Devine quel champ est concerné par l'erreur serveur
function guessFieldFromError(message = "") {
  const msg = message.toLowerCase();
  if (msg.includes("email"))
    return { field: "email", message: "Cet email est déjà utilisé." };
  if (msg.includes("username"))
    return {
      field: "username",
      message: "Ce nom d'utilisateur est déjà pris.",
    };
  if (msg.includes("phone"))
    return { field: "phoneNumber", message: "Ce numéro est déjà utilisé." };
  return null;
}
