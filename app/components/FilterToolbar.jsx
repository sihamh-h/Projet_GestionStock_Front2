// components/FilterToolbar.jsx
import { Box, Stack, Chip } from "@mui/material";
import SearchBar from "./SearchBar";

export default function FilterToolbar({
  search, onSearch,
  filters = [],        
  activeFilter,
  onFilterChange,
  searchPlaceholder = "Rechercher...",
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" },  alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2, flexWrap: "wrap",width: "100%", minWidth: 0, overflow: "hidden",  }}>
      <SearchBar
        value={search}
        onChange={onSearch}
        placeholder={searchPlaceholder}
        
      />
      {filters.length > 0 && (
        <Stack direction="row"sx={{ flexWrap: "wrap", gap: 0.5, flex: 1, minWidth: 0,  justifyContent: "flex-start", }}>
          {filters.map(({ label, value }) => (
            <Chip
              key={value}
              label={label}
              size="small"
              clickable
              onClick={() => onFilterChange(value)}
              sx={{
                fontWeight: 500, fontSize: 11,
                background: activeFilter === value ? "#4f46e5" : "transparent",
                color: activeFilter === value ? "white" : "text.secondary",
                border: "0.5px solid",
                borderColor: activeFilter === value ? "#4f46e5" : "divider",
                "&:hover": {
                  background: activeFilter === value ? "#4338ca" : "action.hover",
                },
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}