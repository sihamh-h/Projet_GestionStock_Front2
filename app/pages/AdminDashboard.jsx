import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useOrders } from "@/hooks/useOrders";
import { useAlerts } from "@/hooks/useAlerts";
import { useMovements } from "@/hooks/useMovements";
import { Package, ShoppingCart, Bell, CheckCircle } from "lucide-react";
import HeroKpisGrid from "@/components/HeroKpisGrid";
import Graph from "@/components/Graph";
import DashboardPanel from "@/components/dashboard/DashboardPanel";
import DashboardChip from "@/components/dashboard/DashboardChip";
import DashboardEmpty from "@/components/dashboard/DashboardEmpty";
import { SEVERITY_COLOR, ORDER_STATUS, STOCK_STATUS } from "@/constants/dashboardConfig";

export default function AdminDashboard() {
  const { products }           = useProducts();
  const { orders }             = useOrders();
  const { alerts, resolveAlert } = useAlerts();
  const { movements }          = useMovements();

  // ── KPIs ──────────────────────────────────────────────
  const kpis = useMemo(() => [
    {
      id: "stock-value", label: "Valeur Totale du Stock", tone: "success", icon: Package,
      value: products.reduce((s, p) => s + (p.actualStock ?? 0) * (p.price ?? 0), 0)
        .toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
      sub: `${products.length} produits`,
    },
    {
      id: "items-in-stock", label: "Articles en Stock", tone: "neutral", icon: Package,
      value: products.reduce((s, p) => s + (p.actualStock ?? 0), 0).toLocaleString("fr-FR"),
      sub: `${products.length} produits`,
    },
    {
      id: "stock-alerts", label: "Alertes Critiques", tone: "warning", icon: Bell,
      value: alerts.filter((a) => a.severity === "CRITICAL" || a.severity === "HIGH").length,
      sub: `${alerts.length} alertes actives`,
    },
    {
      id: "open-orders", label: "Commandes en Attente", tone: "info", icon: ShoppingCart,
      value: orders.filter((o) => o.status === "PENDING").length,
      sub: `${orders.length} commandes total`,
    },
  ], [products, orders, alerts]);

  // ── Données filtrées ──────────────────────────────────
  const criticalAlerts    = useMemo(() => alerts.filter((a) => a.severity === "CRITICAL" || a.severity === "HIGH").slice(0, 5), [alerts]);
  const lowStockProducts  = useMemo(() => products.filter((p) => p.actualStock < p.minStock).sort((a, b) => a.actualStock - b.actualStock).slice(0, 5), [products]);
  const recentOrders      = useMemo(() => [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).slice(0, 5), [orders]);
  const recentMovements   = useMemo(() => [...movements].sort((a, b) => new Date(b.createdAt?.replace(" ", "T")) - new Date(a.createdAt?.replace(" ", "T"))).slice(0, 5), [movements]);

  // ── Chart mouvements ──────────────────────────────────
  const movementChartData = useMemo(() => {
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return { label: d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" }), Entrées: 0, Sorties: 0, _d: d.toDateString() };
    });
    movements.forEach((m) => {
      if (!m.createdAt) return;
      const d = new Date(m.createdAt.split(".")[0].replace(" ", "T"));
      if (isNaN(d.getTime())) return;
      const idx = days.findIndex((day) => day._d === d.toDateString());
      if (idx >= 0) {
        if (m.type === "IN")  days[idx].Entrées += m.quantity ?? 1;
        if (m.type === "OUT") days[idx].Sorties += m.quantity ?? 1;
      }
    });
    return days.map(({ label, Entrées, Sorties }) => ({ label, Entrées, Sorties }));
  }, [movements]);

  const movementChartConfig = {
    title: "Mouvements de stock — 30 derniers jours",
    subtitle: "Entrées vs Sorties",
    series: [
      { name: "Entrées", color: "#34d399", values: [] },
      { name: "Sorties", color: "#f87171", values: [] },
    ],
  };

  return (
    <div className="font-sans w-full space-y-6 pb-8">

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HeroKpisGrid heroKpis={kpis} />
      </div>

      {/* Alertes + Stock bas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardPanel
          title="Alertes critiques"
          badge={{ label: `${criticalAlerts.length} actives`, color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)" }}
        >
          {criticalAlerts.length === 0 ? <DashboardEmpty message="Aucune alerte critique" /> : (
            <div className="space-y-3">
              {criticalAlerts.map((a) => {
                const config = SEVERITY_COLOR[a.severity];
                return (
                  <div key={a.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ background: config.color }} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{a.productName}</p>
                        <p className="text-xs text-white/40 truncate">{a.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <DashboardChip label={a.severity} {...config} />
                      <button
                        onClick={() => resolveAlert(a.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
                        style={{ color: "#34d399", border: "0.5px solid rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.05)" }}
                      >
                        <CheckCircle className="w-3 h-3" />
                        Résoudre
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DashboardPanel>

        <DashboardPanel
          title="Produits à surveiller"
          badge={{ label: `${lowStockProducts.length} produits`, color: "#fbbf24", bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.3)" }}
        >
          {lowStockProducts.length === 0 ? <DashboardEmpty message="Tous les stocks sont OK" /> : (
            <div className="space-y-3">
              {lowStockProducts.map((p) => {
                const status = STOCK_STATUS(p.actualStock, p.minStock);
                const percent = Math.round((p.actualStock / p.minStock) * 100);
                return (
                  <div key={p.id} className="py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs" style={{ background: "rgba(96,165,250,0.1)" }}>
                          {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover rounded-lg" /> : "📦"}
                        </div>
                        <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-white/40">{p.actualStock}/{p.minStock}</span>
                        <DashboardChip label={status.label} {...status} />
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <div className="h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(percent, 100)}%`, background: status.color, boxShadow: `0 0 6px ${status.color}60` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DashboardPanel>
      </div>

      {/* Graphe mouvements */}
      <DashboardPanel title={movementChartConfig.title} badge={null}>
        <p className="text-xs text-white/30 -mt-2 mb-4">{movementChartConfig.subtitle}</p>
        <Graph chartData={movementChartData} chartConfig={movementChartConfig} />
      </DashboardPanel>

      {/* Commandes + Mouvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardPanel
          title="Dernières commandes"
          badge={{ label: `${orders.length} total`, color: "#a78bfa", bg: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.3)" }}
        >
          {recentOrders.length === 0 ? <DashboardEmpty message="Aucune commande" /> : (
            <div className="space-y-3">
              {recentOrders.map((o) => {
                const status = ORDER_STATUS[o.status] ?? ORDER_STATUS.PENDING;
                return (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{o.orderNumber}</p>
                      <p className="text-xs text-white/40">{o.supplierName}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-bold" style={{ color: "#60a5fa" }}>{o.totalAmount?.toFixed(2)} €</span>
                      <DashboardChip label={status.label} {...status} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DashboardPanel>

        <DashboardPanel
          title="Derniers mouvements"
          badge={{ label: `${movements.length} total`, color: "#60a5fa", bg: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.3)" }}
        >
          {recentMovements.length === 0 ? <DashboardEmpty message="Aucun mouvement" /> : (
            <div className="space-y-3">
              {recentMovements.map((m) => {
                const isIn = m.type === "IN";
                return (
                  <div key={m.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                        style={{ color: isIn ? "#34d399" : "#f87171", background: isIn ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)" }}>
                        {isIn ? "+" : "-"}{m.quantity}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{m.productName}</p>
                        <p className="text-xs text-white/40">{m.userFullName ?? "—"}</p>
                      </div>
                    </div>
                    <DashboardChip
                      label={isIn ? "ENTRÉE" : "SORTIE"}
                      color={isIn ? "#34d399" : "#f87171"}
                      bg={isIn ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)"}
                      border={isIn ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </DashboardPanel>
      </div>

    </div>
  );
}