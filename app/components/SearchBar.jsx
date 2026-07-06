import { TextField, InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material";


const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
  </svg>
);

export default function SearchBar({ value, onChange, placeholder = "Rechercher..." }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <TextField
      placeholder={placeholder}
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ color: "text.disabled" }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
       sx={{
        width: { xs: "100%", sm: "250px", md: "300px", lg: "350px" },
        "& .MuiOutlinedInput-root": {
          borderRadius: "24px",
          fontSize: 13,
          backgroundColor: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
          backdropFilter: isLight ? "none" : "blur(10px)",  
          "& fieldset": { border: isLight ? "1px solid rgba(0,0,0,0.15)" : "none" },
          "&:hover fieldset": { borderColor: isLight ? "rgba(59,130,246,0.4)" : "none" },
          "&.Mui-focused": {
            backgroundColor: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
            boxShadow: "0 0 0 1px rgba(96,165,250,0.4)",
          },
          "&.Mui-focused fieldset": { border: "none" },
        },
      }}
    />
  );
}