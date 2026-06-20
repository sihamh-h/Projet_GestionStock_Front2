import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableBody, TableRow, TableCell, Divider,
  Box, Typography,
} from "@mui/material";
import { X } from "lucide-react";
import { toFrontendDate } from "@/utils/formaDate";

/**
 * Dialog de détails générique pour Sale et Order.
 *
 * Props :
 * - open, onClose
 * - title        : ex "Vente VNT-001" ou "Commande CMD-001"
 * - subtitle      : ex "21/04/2026 · Créé par ely ely"
 * - badge         : { label, color, bg, border } — optionnel (statut commande)
 * - columns       : [{ label, align? }] — en-têtes du tableau
 * - rows          : [{ cells: [...], deleted?: bool }] — lignes du tableau
 * - total         : number
 * - totalColor    : ex "#34d399" (vente) ou "#60a5fa" (commande)
 */
export function SaleOrderDetailsDialog({
  open, onClose,
  title, subtitle, badge,
  columns, rows,
  total, totalColor = "#34d399",
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h6" fontWeight={700} component="span">
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
            {badge && (
              <Box sx={{
                px: "8px", py: "2px", borderRadius: "100px",
                background: badge.bg, border: `0.5px solid ${badge.border}`,
              }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: badge.color }}>
                  {badge.label}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <X size={20} style={{ cursor: "pointer", opacity: 0.6 }} onClick={onClose} />
      </DialogTitle>

      <DialogContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col, i) => (
                <TableCell
                  key={i}
                  align={col.align ?? "left"}
                  sx={{ fontWeight: 700, fontSize: 12 }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <TableRow key={i}>
                {row.cells.map((cell, j) => (
                  <TableCell
                    key={j}
                    align={columns[j]?.align ?? "left"}
                    sx={{ fontSize: 13, fontWeight: j === row.cells.length - 1 ? 600 : 400 }}
                  >
                    {j === 0 && row.deleted ? (
                      <Typography sx={{ fontSize: 13, fontStyle: "italic", color: "text.disabled" }}>
                        {cell}
                      </Typography>
                    ) : cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{
            display: "flex", alignItems: "center", gap: "12px",
            px: "16px", py: "10px", borderRadius: "12px",
            background: `${totalColor}1a`,
            border: `0.5px solid ${totalColor}4d`,
          }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>TOTAL</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: totalColor }}>
              {total?.toFixed(2)} €
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}