// components/FilterToolbar.jsx
import { Box, Stack, Chip } from "@mui/material";
import SearchBar from "./SearchBar";

export default function FilterToolbar({
  search, onSearch,
  filters = [],
  activeFilter,
  onFilterChange,
  searchPlaceholder = "Rechercher...",
  action, 
}) {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row", lg: "row" },
      alignItems: { xs: "stretch", md: "center" },
      justifyContent: "space-between",
      gap: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
      mt:8,
      mb: 2,
      flexWrap: "wrap",
      width: "100%",
    }}>
      {/* Gauche — search + chips */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
        <SearchBar value={search} onChange={onSearch} placeholder={searchPlaceholder} />
        {filters.length > 0 && (
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
            {filters.map(({ label, value }) => (
              <Chip
                key={value}
                label={label}
                size="small"
                clickable
                onClick={() => onFilterChange(value)}
                sx={{
                  fontWeight: 500, fontSize: 11,
                  background: activeFilter === value ?  "rgba(96,165,250,0.2)"  : "transparent",
                  color: activeFilter === value ? "#1d4ed8" : "text.secondary",
                  border: "0.5px solid",
                  borderColor: activeFilter === value ?  "rgba(96,165,250,0.4)": "divider",
                  "&:hover": { background: activeFilter === value ? "rgba(96,165,250,0.3)" : "action.hover" },
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* Droite — bouton action */}
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}