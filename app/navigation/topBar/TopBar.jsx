import { Box, IconButton, useTheme, Menu, MenuItem, Divider, Typography, Avatar } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "@/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import { ChevronsLeft } from "lucide-react";
import AlertBell from "@/components/AlertBell";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import ProfileDialog from "@/components/ProfileDialog";

export default function TopBar({ collapsed, setCollapsed, profileImg, onMobileMenuToggle }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleProfile = () => { handleCloseMenu(); setProfileOpen(true); };
  const handleLogout = () => { handleCloseMenu(); logout(); navigate("/"); };

  const initials = user?.firstname && user?.lastname
    ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <Box className="flex items-center justify-between p-2 gap-2">

      {/* Hamburger — mobile */}
      <IconButton
        onClick={onMobileMenuToggle}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Collapse — desktop */}
      <IconButton
        onClick={() => setCollapsed(!collapsed)}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
      </IconButton>

      {/* Icônes droite */}
      <Box className="flex items-center ml-auto">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>

        <AlertBell />

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        {/* Bouton profil */}
        <IconButton onClick={handleOpenMenu} sx={{ ml: 0.5 }}>
          {profileImg ? (
            <img src={profileImg} alt="profile" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <Avatar sx={{ width: 32, height: 32, fontSize: 13, fontWeight: 600, background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}>
              {initials}
            </Avatar>
          )}
        </IconButton>

        {/* Menu profil */}
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt: 1, minWidth: 220, borderRadius: "12px",
              background: theme.palette.mode === "dark"
                ? "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(15,23,42,0.95) 100%)"
                : "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              border: "0.5px solid",
              borderColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ width: 36, height: 36, fontSize: 13, fontWeight: 600, background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}>
                {initials}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                  {user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : "Utilisateur"}
                </Typography>
                <Typography sx={{ fontSize: 11, color: "text.disabled" }}>{user?.email ?? ""}</Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          <MenuItem onClick={handleProfile} sx={{ gap: 1.5, px: 2, py: 1.2, fontSize: 13, "&:hover": { background: "rgba(59,130,246,0.08)" } }}>
            <ManageAccountsIcon sx={{ fontSize: 18, color: "#3b82f6" }} />
            Mon profil
          </MenuItem>

          <MenuItem onClick={() => { handleCloseMenu(); navigate("/settings"); }} sx={{ gap: 1.5, px: 2, py: 1.2, fontSize: 13, "&:hover": { background: "rgba(59,130,246,0.08)" } }}>
            <SettingsOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            Paramètres
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout} sx={{ gap: 1.5, px: 2, py: 1.2, fontSize: 13, color: "#ef4444", "&:hover": { background: "rgba(239,68,68,0.08)" } }}>
            <LogoutIcon sx={{ fontSize: 18, color: "#ef4444" }} />
            Se déconnecter
          </MenuItem>
        </Menu>
      </Box>

      <ProfileDialog open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Box>
  );
}