import { useState } from "react";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "@/theme";

export function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("LOGIN:", { username, password });
    // ici tu feras ton appel API
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        backgroundColor: colors.primary[400],
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "380px" },
          p: 4,
          borderRadius: "16px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: { xs: "22px", sm: "26px" },
            fontWeight: 700,
            color: colors.grey[100],
          }}
        >
          Connexion
        </Typography>

        <TextField
          label="Nom d'utilisateur"
          fullWidth
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": { color: colors.grey[100] },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
          }}
        />

        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiInputBase-root": { color: colors.grey[100] },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          Se connecter
        </Button>
      </Card>
    </Box>
  );
}
