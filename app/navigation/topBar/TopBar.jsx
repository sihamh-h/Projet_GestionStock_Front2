import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "@/theme";
import "react-pro-sidebar/dist/css/styles.css";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ChevronsLeft } from "lucide-react";
import AlertBell from "@/components/AlertBell";



export default function TopBar({ collapsed, setCollapsed, profileImg }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box className="flex items-center justify-between p-2 gap-2">
      <button
        className="btn-ghost size-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronsLeft className={collapsed && "rotate-180"} />
      </button>

      {/* SEARCH BAR */}
      <Box
        className="flex rounded-3xl flex-1 max-w-xs"
        style={{ backgroundColor: colors.primary[400] }}
      >
        <InputBase placeholder="Search" className="flex-1" sx={{ ml: 2 }} />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box className="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <AlertBell />
        </IconButton>

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton className="overflow-hidden">
          {profileImg ? (
            <img
              src={profileImg}
              alt="profile"
              className="w-10 h-10 size-full rounded-full object-cover"
            />
          ) : (
            <PersonOutlinedIcon className="text-gray-400 w-8 h-8" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
