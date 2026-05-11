import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/theme";
import TopBar from "@/navigation/topBar/TopBar";
import Sidebar from "@/navigation/sideBar/SideBar";
import { navByRole } from "@/navigation/sideBar/navConfigs";
import HeroKpisGrid from "@/components/HeroKpisGrid";
import { heroKpis } from "@/data/HeroData";
import { Outlet } from "react-router";

export default function AdminLayout() {

  const [theme, colorMode] = useMode();

  const [collapsed, setCollapsed] = useState(false);

  const user = { role: "ADMIN", name: "Alice Martin", profileImg: null };

  const navSections = navByRole[user.role] ?? navByRole.EMPLOYE;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="relative flex w-full h-full">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            navSections={navSections}
          />
          <div className="font-sans w-full">
            <TopBar 
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              profileImg={user?.profileImg}
            ></TopBar>
            <Outlet />

          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
