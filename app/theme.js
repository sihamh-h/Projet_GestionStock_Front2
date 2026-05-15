import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// ── Palette calquée sur les couleurs de la Hero ─────────────────
// Hero utilise : slate-900 fond, blue-400/500, cyan-300/400
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        // Slate dark — fond de la Hero
        grey: {
          100: "#f1f5f9", // slate-100 — texte principal
          200: "#e2e8f0", // slate-200
          300: "#cbd5e1", // slate-300 — texte secondaire
          400: "#94a3b8", // slate-400 — texte désactivé
          500: "#64748b", // slate-500
          600: "#475569", // slate-600
          700: "#334155", // slate-700 — bordures
          800: "#1e293b", // slate-800 — fond cards
          900: "#0f172a", // slate-900 — fond principal Hero
        },

        // Fonds sombres Hero
        primary: {
          100: "#c7d2fe",
          200: "#a5b4fc",
          300: "#818cf8",
          400: "#1e293b", // slate-800 — fond composants
          500: "#0f172a", // slate-900 — fond principal
          600: "#0d1424",
          700: "#0a101c",
          800: "#070c14",
          900: "#040509",
        },

        // Cyan Hero — "bg-cyan-500/10", text cyan-300
        greenAccent: {
          100: "#cffafe", // cyan-100
          200: "#a5f3fc", // cyan-200
          300: "#67e8f9", // cyan-300 ← Hero exacte
          400: "#22d3ee", // cyan-400 ← Hero exacte
          500: "#06b6d4", // cyan-500
          600: "#0891b2", // cyan-600
          700: "#0e7490", // cyan-700
          800: "#155e75", // cyan-800
          900: "#164e63", // cyan-900
        },

        // Rouge — alerts, erreurs
        redAccent: {
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },

        // Bleu Hero — "bg-blue-500/10", text blue-400
        blueAccent: {
          100: "#dbeafe", // blue-100
          200: "#bfdbfe", // blue-200
          300: "#93c5fd", // blue-300 ← Hero exacte
          400: "#60a5fa", // blue-400 ← Hero principale
          500: "#3b82f6", // blue-500 ← Hero bouton
          600: "#2563eb", // blue-600
          700: "#1d4ed8", // blue-700
          800: "#1e3a8a", // blue-800
          900: "#1e2d5a", // deep blue
        },
      }
    : {
        // Light mode — inversé
        grey: {
          100: "#0f172a",
          200: "#1e293b",
          300: "#334155",
          400: "#475569",
          500: "#64748b",
          600: "#94a3b8",
          700: "#cbd5e1",
          800: "#e2e8f0",
          900: "#f1f5f9",
        },

        primary: {
          100: "#040509",
          200: "#070c14",
          300: "#0a101c",
          400: "#f8fafc", // fond clair
          500: "#0f172a",
          600: "#1e293b",
          700: "#64748b",
          800: "#94a3b8",
          900: "#cbd5e1",
        },

        greenAccent: {
          100: "#164e63",
          200: "#155e75",
          300: "#0e7490",
          400: "#0891b2",
          500: "#06b6d4",
          600: "#22d3ee",
          700: "#67e8f9",
          800: "#a5f3fc",
          900: "#cffafe",
        },

        redAccent: {
          100: "#7f1d1d",
          200: "#991b1b",
          300: "#b91c1c",
          400: "#dc2626",
          500: "#ef4444",
          600: "#f87171",
          700: "#fca5a5",
          800: "#fecaca",
          900: "#fee2e2",
        },

        blueAccent: {
          100: "#1e2d5a",
          200: "#1e3a8a",
          300: "#1d4ed8",
          400: "#2563eb",
          500: "#3b82f6",
          600: "#60a5fa",
          700: "#93c5fd",
          800: "#bfdbfe",
          900: "#dbeafe",
        },
      }),
});

// ── Thème MUI ───────────────────────────────────────────────────
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary:   { main: colors.blueAccent[400] },  // blue-400 Hero
            secondary: { main: colors.greenAccent[300] }, // cyan-300 Hero
            neutral: {
              dark:  colors.grey[700],
              main:  colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500], // slate-900
              paper:   colors.primary[400], // slate-800
            },
          }
        : {
            primary:   { main: colors.blueAccent[500] },
            secondary: { main: colors.greenAccent[500] },
            neutral: {
              dark:  colors.grey[700],
              main:  colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[400], // fond clair
              paper:   "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","), // Inter comme la Hero
      fontSize: 12,
      h1: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 40, fontWeight: 700 },
      h2: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 32, fontWeight: 700 },
      h3: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 24, fontWeight: 600 },
      h4: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 20, fontWeight: 600 },
      h5: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 16, fontWeight: 500 },
      h6: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 14, fontWeight: 500 },
    },
  };
};

// ── Context color mode ──────────────────────────────────────────
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};