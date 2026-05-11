import type { Config } from "tailwindcss";



const config: Config = {
  content: [
    "./index.html",
    "./app/**/*.{js,jsx,ts,tsx}",
    "../data/**/*.{js,ts}",
     "./.react-router/types/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
  roboto: ["Roboto", "sans-serif"],      
  opensans: ["Open Sans", "sans-serif"], 
  sans: ["Open Sans", "sans-serif"],     
  display: ["Open Sans", "sans-serif"],  
},

      // 🎨 **PALETTE DE COULEURS HARMONISÉE**
      colors: {
        // Primary - Bleu Profond (Votre couleur principale)
        primary: {
          50: "#f0f4fe",
          100: "#e0e9fd",
          200: "#c1d3fb",
          300: "#a2bdf8",
          400: "#6a8ef3",
          500: "#1D2E54", //bleu
          600: "#1a2847",
          700: "#152038",
          800: "#0f1829",
          900: "#0a0f1a",
        },
        // Secondary - Vert Succès (Votre accent positif)
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#2D6F39", //  vert
          600: "#22c55e",
          700: "#16a34a",
          800: "#15803d",
          900: "#166534",
        },
        // Danger - Rouge Alerte
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#FF4D4D", // rouge
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        // Warning - Orange
        warning: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF9500", // Orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a360a",
          900: "#7c2d12",
        },
        // Neutrals
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },

      // 📐 **ESPACEMENTS HARMONISÉS**
      spacing: {
        xs: "0.25rem", // 4px
        sm: "0.5rem",  // 8px
        md: "1rem",    // 16px
        lg: "1.5rem",  // 24px
        xl: "2rem",    // 32px
        "2xl": "2.5rem", // 40px
        "3xl": "3rem",   // 48px
        "4xl": "4rem",   // 64px
      },

      // 🔤 **TYPOGRAPHIE**
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.02em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "3.5rem", letterSpacing: "-0.02em" }],
        "6xl": ["3.75rem", { lineHeight: "4.5rem", letterSpacing: "-0.03em" }],
      },

     

      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900",
      },

      // 🎭 **BORDER RADIUS HARMONISÉ**
      borderRadius: {
        xs: "0.375rem",  // 6px - petits éléments
        sm: "0.5rem",    // 8px
        base: "0.75rem", // 12px - défaut
        md: "1rem",      // 16px - cartes
        lg: "1.5rem",    // 24px - containers
        xl: "2rem",      // 32px - modals
        "2xl": "2.5rem", // 40px - hero
        full: "9999px",
      },

      // 💫 **OMBRES PERSONNALISÉES**
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
        base: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        md: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "2xl": "0 32px 64px -16px rgba(0, 0, 0, 0.15)",
        glow: "0 0 20px rgba(45, 111, 57, 0.2)",
      },

      // ⏱️ **ANIMATIONS**
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
      },

      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },

      // 📦 **Z-INDEX**
      zIndex: {
        hide: "-10",
        auto: "auto",
        base: "0",
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        modal: "1040",
        popover: "1050",
        tooltip: "1060",
      },
    },
  },
  plugins: [],
};

export default config;
