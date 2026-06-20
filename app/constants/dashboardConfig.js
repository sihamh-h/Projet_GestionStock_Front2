export const SEVERITY_COLOR = {
  CRITICAL: { color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)" },
  HIGH:     { color: "#f97316", bg: "rgba(249,115,22,0.15)",  border: "rgba(249,115,22,0.3)"  },
  MEDIUM:   { color: "#fbbf24", bg: "rgba(251,191,36,0.15)",  border: "rgba(251,191,36,0.3)"  },
  LOW:      { color: "#34d399", bg: "rgba(52,211,153,0.15)",  border: "rgba(52,211,153,0.3)"  },
};

export const ORDER_STATUS = {
  PENDING:   { label: "En attente", color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.3)"  },
  RECEIVED:  { label: "Reçue",      color: "#34d399", bg: "rgba(52,211,153,0.15)",  border: "rgba(52,211,153,0.3)"  },
  CANCELLED: { label: "Annulée",    color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)" },
};

export const STOCK_STATUS = (actual, min) => {
  if (actual === 0)        return { label: "RUPTURE",  color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)" };
  if (actual / min < 0.5) return { label: "CRITIQUE",  color: "#f97316", bg: "rgba(249,115,22,0.15)",  border: "rgba(249,115,22,0.3)"  };
  return                          { label: "BAS",       color: "#fbbf24", bg: "rgba(251,191,36,0.15)",  border: "rgba(251,191,36,0.3)"  };
};