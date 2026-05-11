import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/theme";
import TopBar from "@/navigation/topBar/TopBar";
import Sidebar from "@/navigation/sideBar/SideBar";
import { navByRole } from "@/navigation/sideBar/navConfigs";
import HeroKpisGrid from "@/components/HeroKpisGrid";
import { heroKpis } from "@/data/HeroData";


export default function AdminDashboard() {
  //const user = {}; // Remplacez par la logique pour récupérer les données de l'utilisateur

  return (
    
          <div className="font-sans w-full">
            {/*contenu carré Kpi*/}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <HeroKpisGrid heroKpis={heroKpis} />
            </div>
            </div>

         
        
     
  );
}
