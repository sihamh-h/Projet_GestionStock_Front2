import { useTheme } from "@mui/material";

export default function LiquidButton({ onClick, icon: Icon, children, color = "blue" }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const colors = {
    blue: {
      bg: isLight
        ? "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.1) 100%)"
        : "linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(59,130,246,0.05) 100%)",
      shadow: "0 0 20px rgba(96,165,250,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
      border: "0.5px solid rgba(96,165,250,0.3)",
      color: isLight ? "#1d4ed8" : "white",
    },
    red: {
      bg: isLight
        ? "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.1) 100%)"
        : "linear-gradient(135deg, rgba(239,68,68,0.4) 0%, rgba(220,38,38,0.25) 100%)",
      shadow: "0 8px 32px rgba(239,68,68,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
      border: "0.5px solid rgba(239,68,68,0.4)",
      color: isLight ? "#dc2626" : "white",
    },
    emerald: {
      bg: isLight
        ? "linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(16,185,129,0.1) 100%)"
        : "linear-gradient(135deg, rgba(52,211,153,0.6) 0%, rgba(16,185,129,0.4) 100%)",
      shadow: "0 8px 32px rgba(52,211,153,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
      border: "0.5px solid rgba(52,211,153,0.4)",
      color: isLight ? "#059669" : "white",
    },
    ghost: {
      bg: isLight
        ? "rgba(0,0,0,0.04)"
        : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
      shadow: "0 8px 32px rgba(0,0,0,0.1)",
      border: isLight ? "0.5px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.2)",
      color: isLight ? "rgba(0,0,0,0.7)" : "white",
    },
  };

  const c = colors[color] ?? colors.blue;

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
      style={{
        padding: "8px 16px",
        width: "fit-content",
        flexShrink: 0,
        background: c.bg,
        backdropFilter: isLight ? "none" : "blur(20px) saturate(180%)",
        WebkitBackdropFilter: isLight ? "none" : "blur(20px) saturate(180%)",
        border: c.border,
        boxShadow: c.shadow,
        color: c.color,
      }}
    >
      {Icon && <Icon size={16} />}
      <span className="hidden sm:inline">{children}</span>
      {Icon && <span className="sm:hidden"><Icon size={16} /></span>}
    </button>
  );
}