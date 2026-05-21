// components/DeleteDialog.jsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, useTheme } from "@mui/material";
import { tokens } from "@/theme";

export default function DeleteDialog({ open, onClose, onConfirm, itemLabel = "" }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(3px)",
          background: isDark ? "rgba(0,0,0,0.5)" : "rgba(15,23,42,0.3)",
        },
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          backdropFilter: "blur(5px)",
          border: isDark ? "0.5px solid rgba(255,255,255,0.3)" : "0.5px solid rgba(255,255,255,0.7)",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700, fontSize: 20, pt: 3 }}>
        Confirmation
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 3 }}>
          Voulez-vous vraiment supprimer :{" "}
          <Box component="span" sx={{ fontWeight: 700, color: isDark ? "#93c5fd" : "#2563eb" }}>
            {itemLabel}
          </Box>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1.5, justifyContent: "center" }}>
        <Button onClick={onClose} sx={{ textTransform: "none", borderRadius: "100px" }}>
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            textTransform: "none", borderRadius: "100px",
            color: isDark ? "#fecaca" : "#fff",
            background: isDark
              ? "linear-gradient(90deg, rgba(239,68,68,0.4), rgba(185,28,28,0.7))"
              : "linear-gradient(90deg, #ef4444, #b91c1c)",
          }}
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}