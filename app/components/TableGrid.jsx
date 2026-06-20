import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme";

export default function TableGrid({
  title,
  rows,
  columns,
  height = "75vh",
  columnVisibilityModel = {},
  onRowClick,
  ...props
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLight = theme.palette.mode === "light";

  return (
    <Box>
      {title && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            position: "relative",
          }}
        >
          {/* Ligne gauche */}
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(96,165,250,0.3))",
            }}
          />

          {/* Titre centré */}
          <Box
            sx={{
              px: 3,
              py: 1,
              borderRadius: "100px",
              background: "rgba(96,165,250,0.08)",
              border: "0.5px solid rgba(96,165,250,0.2)",
              backdropFilter: isLight ? "none" : "blur(10px)",
              mx: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "14px" },
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: isLight
                  ? "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)" // ← bleu foncé en light
                  : "linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Ligne droite */}
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(to left, transparent, rgba(96,165,250,0.3))",
            }}
          />
        </Box>
      )}

      <Box
        height={height}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          border: isLight
            ? "1px solid rgba(0,0,0,0.1)"
            : "2px solid rgba(220,220,220,0.3)",
          background: isLight
            ? "rgba(255,255,255,0.95)"
            : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%)",
          backdropFilter: isLight ? "none" : "blur(15px)",
          "& .MuiDataGrid-root": { border: "none", fontSize: "13px" },
          "& .MuiDataGrid-cell": {
            borderBottom: "0.5px solid rgba(220,220,220,0.1)",
            display: "flex",
            alignItems: "center",
          },

          "& .MuiDataGrid-columnHeaders": {
            background: isLight
              ? "rgba(59,130,246,0.08)"
              : "rgba(59,130,246,0.15)",
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
              background: isLight
                ? "rgba(59,130,246,0.05) !important"
                : "rgba(255,255,255,0.4) !important",
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
          disableRowSelectionOnClick
          rows={rows}
          columns={columns}
          columnVisibilityModel={columnVisibilityModel}
          onRowClick={onRowClick}
          {...props}
        />
      </Box>
    </Box>
  );
}
