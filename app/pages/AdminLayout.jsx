import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/theme";
import TopBar from "@/navigation/topBar/TopBar";
import Sidebar from "@/navigation/sideBar/SideBar";
import { navByRole } from "@/navigation/sideBar/navConfigs";
import HeroKpisGrid from "@/components/HeroKpisGrid";
import { heroKpis } from "@/data/HeroData";
import { Outlet } from "react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";

export default function AdminLayout() {
  const [theme, colorMode] = useMode();

  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  

  //const user = { role: "ADMIN", name: "Alice Martin", profileImg: null };

  const { user } = useAuthStore();

  const role = user?.roles?.includes("ROLE_ADMIN")
    ? "ADMIN"
    : user?.roles?.includes("ROLE_MANAGER")
      ? "MANAGER"
      : "EMPLOYE";

  const navSections = navByRole[role] ?? navByRole.EMPLOYE;

  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="relative flex w-full  h-screen overflow-hidden">
            {/* Overlay mobile */}
            {mobileOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setMobileOpen(false)}
              />
            )}
            <div
              className={`
                fixed md:relative z-50 md:z-auto h-full
                transition-transform duration-300 ease-in-out
                ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
              `}
            >
              <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                navSections={navSections}
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
              <TopBar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                profileImg={user?.profileImg}
                onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
              ></TopBar>
              <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
                <Outlet />
              </main>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ProtectedRoute>
  );
}
