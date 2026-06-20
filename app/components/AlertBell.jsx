import { useState, useRef, useEffect } from "react";
import { Box, Typography, Badge, IconButton, Paper, Divider } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useAlerts } from "@/hooks/useAlerts";

const SEVERITY_CONFIG = {
  LOW:      { color: "#34d399" },
  MEDIUM:   { color: "#fbbf24" },
  HIGH:     { color: "#f97316" },
  CRITICAL: { color: "#f87171" },
};

function formatTime(createdAt) {
  if (!createdAt) return "";
  if (Array.isArray(createdAt)) {
    const [, , , h, min] = createdAt;
    return `${String(h).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
  }
  if (typeof createdAt === "string") {
    const date = new Date(createdAt);
    return `${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}`;
  }
  return "";
}

export default function AlertBell() {
  const [open, setOpen]         = useState(false);
  const [readCount, setReadCount] = useState(0);
  const ref = useRef(null);

  const { alerts } = useAlerts();

  const unreadCount = Math.max(0, alerts.length - readCount);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    setReadCount(alerts.length); // marque tout comme lu
  };

  return (
    <Box ref={ref} sx={{ position: "relative" }}>
      <IconButton onClick={handleOpen} size="small">
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
        </Badge>
      </IconButton>

      {open && (
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 340,
            maxHeight: 400,
            overflowY: "auto",
            borderRadius: "16px",
            zIndex: 1300,
            border: "0.5px solid rgba(255,255,255,0.15)",
            background: "rgba(15,23,42,0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Alertes stock</Typography>
            <Typography sx={{ fontSize: 11, color: "text.disabled" }}>
              {alerts.length} alerte{alerts.length > 1 ? "s" : ""}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          {alerts.length === 0 ? (
            <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
              <Typography sx={{ fontSize: 13, color: "text.disabled" }}>
                Aucune alerte
              </Typography>
            </Box>
          ) : (
            alerts.map((alert) => {
              const config = SEVERITY_CONFIG[alert.severity] ?? SEVERITY_CONFIG.LOW;
              return (
                <Box
                  key={alert.id}
                  sx={{
                    px: 2, py: 1.5,
                    borderLeft: `3px solid ${config.color}`,
                    borderBottom: "0.5px solid rgba(255,255,255,0.05)",
                    "&:hover": { background: "rgba(255,255,255,0.04)" },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      {alert.productName}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: config.color, fontWeight: 700 }}>
                      {alert.severity}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                    {alert.message}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "text.disabled", mt: 0.5 }}>
                    {formatTime(alert.createdAt)}
                  </Typography>
                </Box>
              );
            })
          )}
        </Paper>
      )}
    </Box>
  );
}