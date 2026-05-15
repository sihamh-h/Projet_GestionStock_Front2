import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme";

export default function TableGrid({ title, rows, columns, height = "75vh" }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {title && (
        <Typography variant="h3" mb={2} sx={{ color: colors.grey[100] }}>
          {title}
        </Typography>
      )}

      <Box
        height={height}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          border: "2px solid rgba(220,220,220,0.3)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%)",
          backdropFilter: "blur(15px)",
          "& .MuiDataGrid-root": { border: "none", fontSize: "13px" },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            borderBottom: "0.5px solid rgba(220,220,220,0.1)",
          },

          "& .MuiDataGrid-columnHeaders": {
            background: "rgba(59,130,246,0.15)",
            borderBottom: "0.5px solid rgba(220,220,220,0.1)",
            fontSize: "12px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          },
          "& .MuiDataGrid-row": {
            cursor: "pointer",
            transition: "background 0.15s",
            "&:hover": {
              background: "rgba(255,255,255,0.4) !important",
              boxShadow: "inset 3px 0 0 #60a5fa",
            },
          },

          "& .MuiDataGrid-row.Mui-selected": {
            background: "rgba(59,130,246,0.08) !important",
          },


          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "0.5px solid rgba(220,220,220,0.1)",
            background: "rgba(59,130,246,0.08)",
            color: "rgba(255,255,255,0.6)",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.primary[100]} !important`,
             "&.Mui-checked": {
              color: "#60a5fa !important",
            },
          },

        }}
      >
        <DataGrid 
        autoHeight
        disableRowSelectionOnClick 
        rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}
