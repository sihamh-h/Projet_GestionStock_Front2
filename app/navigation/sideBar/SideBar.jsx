import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Box, Tooltip } from "@mui/material";
import { icons } from "./sideBarIcons";

// ── NavItem avec sous-menu ──────────────────────────────────────
function NavItem({ label, to, icon, badge, collapsed, children }) {
  const location = useLocation();
  const hasChildren = children && children.length > 0;

  const isActive = hasChildren
    ? children.some((c) => location.pathname === c.to || location.pathname.startsWith(c.to))
    : to && (location.pathname === to || (to !== "/" && location.pathname.startsWith(to)));

  const [open, setOpen] = useState(isActive);

  const itemContent = (
    <Box
      onClick={hasChildren ? () => setOpen(!open) : undefined}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        px: "10px",
        py: "8px",
        borderRadius: "50px",
        mb: "8px",
        cursor: "pointer",
        justifyContent: collapsed ? "center" : "flex-start",
        backgroundColor: isActive ? "#eef2ff" : "transparent",
        transition: "background 0.15s",
        "&:hover": { backgroundColor: isActive ? "#eef2ff" : "action.hover" },
      }}
    >
      {/* Icône */}
      <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, color: isActive ? "#4f46e5" : "text.secondary" }}>
        {icon}
      </Box>

      {/* Label */}
      {!collapsed && (
        <Box component="span" sx={{ fontSize: "15px", fontWeight: isActive ? 500 : 400, color: isActive ? "#4f46e5" : "text.secondary", flex: 1, whiteSpace: "nowrap", overflow: "hidden" }}>
          {label}
        </Box>
      )}

      {/* Badge */}
      {!collapsed && badge > 0 && (
        <Box component="span" sx={{ background: "#fee2e2", color: "#dc2626", fontSize: "12px", fontWeight: 500, px: "6px", py: "1px", borderRadius: "10px", flexShrink: 0 }}>
          {badge}
        </Box>
      )}

      {/* Flèche */}
      {!collapsed && hasChildren && (
        <Box sx={{ display: "flex", alignItems: "center", color: "text.disabled", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
          {icons.chevron}
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Item principal */}
      {hasChildren ? (
        collapsed ? (
          <Tooltip title={label} placement="right" arrow><span>{itemContent}</span></Tooltip>
        ) : itemContent
      ) : collapsed ? (
        <Tooltip title={label} placement="right" arrow>
          <span><NavLink to={to} style={{ textDecoration: "none" }}>{itemContent}</NavLink></span>
        </Tooltip>
      ) : (
        <NavLink to={to} style={{ textDecoration: "none" }}>{itemContent}</NavLink>
      )}

      {/* Sous-menu */}
      {!collapsed && hasChildren && open && (
        <Box sx={{ pl: "16px", mb: "4px" }}>
          {children.map((child) => {
            const childActive = location.pathname === child.to || location.pathname.startsWith(child.to);
            return (
              <NavLink key={child.to} to={child.to} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: "10px",
                    py: "7px",
                    borderRadius: "8px",
                    mb: "1px",
                    cursor: "pointer",
                    borderLeft: "2px solid",
                    borderColor: childActive ? "#4f46e5" : "divider",
                    backgroundColor: childActive ? "#eef2ff" : "transparent",
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <Box component="span" sx={{ fontSize: "13px", color: childActive ? "#4f46e5" : "text.secondary", fontWeight: childActive ? 500 : 400 }}>
                    {child.label}
                  </Box>
                </Box>
              </NavLink>
            );
          })}
        </Box>
      )}
    </>
  );
}

// ── SideBar générique ───────────────────────────────────────────
// Props :
//   collapsed    : bool
//   setCollapsed : func
//   navSections  : array — importe depuis navConfigs.js selon le rôle
//
// Exemple :
//   import { adminNav } from "./navConfigs";
//   <SideBar collapsed={collapsed} setCollapsed={setCollapsed} navSections={adminNav} />

export default function SideBar({ collapsed, setCollapsed, navSections = [] }) {
  return (
    <Box
      sx={{
        width: collapsed ? 56 : 220,
        minHeight: "100vh",
        backgroundColor: "background.paper",
        borderRight: "0.5px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 0.25s ease",
        overflow: "hidden",
      }}
    >
      {/* ── Logo ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          px: "4px",
          py: "14px",
          borderBottom: "2px solid",
          borderColor: "divider",
          minHeight: 60,
        }}
      >
        <Box sx={{ width: 48, height: 48, borderRadius: "50px", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icons.logo}
        </Box>
        {!collapsed && (
          <Box component="span" sx={{ fontSize: "18px", fontWeight: 600, color: "text.primary", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
            StockiFlow
          </Box>
        )}
      </Box>

      {/* ── Navigation ── */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", py: "8px", px: "8px" }}>
        {navSections.map(({ section, items }) => (
          <Box key={section} sx={{ mb: "4px" }}>
            {!collapsed && (
              <Box component="span" sx={{ display: "block", fontSize: "11px", fontWeight: 500, color: "text.disabled", textTransform: "uppercase", letterSpacing: "0.06em", px: "10px", pt: "12px", pb: "4px" }}>
                {section}
              </Box>
            )}
            {collapsed && <Box sx={{my: "6px", borderTop: "2px solid", borderColor: "divider" }} />}
            {items.map((item) => (
              <NavItem key={item.label} {...item} collapsed={collapsed} />
            ))}
          </Box>
        ))}
      </Box>

      {/* ── Paramètres en bas ── */}
      <Box sx={{ borderTop: "2px solid", borderColor: "divider", p: "20px" }}>
        <NavItem label="Paramètres" to="/settings" icon={icons.settings} collapsed={collapsed} />
      </Box>
    </Box>
  );
}