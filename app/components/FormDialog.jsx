import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Button, MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FormDialog({
  open,
  onClose,
  title,
  fields,
  defaultValues = {},
  schema,
  onSubmit,
}) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues ?? {},
  });

  useEffect(() => {
    if (open) reset(defaultValues ?? {});
  }, [open, reset]);

  const onSubmitHandler = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "12px !important" }}>
          {fields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: f }) =>
                field.options ? (
                  <TextField
                    {...f}
                    select
                    label={field.label}
                    size="small"
                    fullWidth
                    value={Array.isArray(f.value) ? f.value[0] ?? "" : f.value ?? ""}
                    onChange={(e) => f.onChange([e.target.value])}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                  >
                    {field.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
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
                  />
                )
              }
            />
          ))}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={onClose} sx={{ textTransform: "none", color: "text.secondary" }}>
            Annuler
          </Button>
          <Button type="submit"  onClick={() => {
    console.log("click direct");
    handleSubmit(
      (data) => console.log("SUCCESS", data),
      (err) => console.log("ERRORS", err)
    )();
  }} 
  variant="contained" sx={{ textTransform: "none" }}>
            Enregistrer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}