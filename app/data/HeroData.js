import { Search, TriangleAlert, Gauge } from "lucide-react";

export const heroTabs = [
  {
    id: "dashboard",
    label: "Dashboard global",
    tone: "success",
  },
  {
    id: "alerts",
    label: "Alerte stock",
    tone: "danger",
  },
  {
    id: "optimization",
    label: "Optimisation",
    tone: "info",
  },
];

export const heroKpis = [
  {
    id: "stock-value",
    label: "Valeur Totale du Stock",
    value: "1,200,000",
    tone: "success",
  },
  {
    id: "items-in-stock",
    label: "Articles en Stock",
    value: "15,000",
    tone: "neutral",
  },
  {
    id: "stock-alerts",
    label: "Alertes de Rupture",
    value: "45",
    tone: "warning",
  },
  {
    id: "open-orders",
    label: "Commandes en Cours",
    value: "12",
    tone: "info",
  },
];

export const heroCharts = {
  dashboard: {
    title: "Mouvements de Stock (30 Derniers Jours)",
    subtitle: "30 Derniers jours",
    labels: ["0", "5", "10", "15", "20", "25", "30"],
    series: [
      {
        name: "Entrées",
        color: "#52A56E",
        values: [40, 90, 55, 140, 160, 110, 80],
      },
      {
        name: "Sorties",
        color: "#2D6A4F",
        values: [20, 70, 40, 95, 70, 130, 160],
      },
    ],
  },
  alerts: {
    title: "Évolution stock critique (réel vs prévision)",
    subtitle: "Seuil critique: 90 u.",
    labels: ["J-6", "J-5", "J-4", "J-3", "J-2", "J-1", "Aujourd'hui"],
    series: [
      {
        name: "Stock réel",
        color: "#dc2626",
        values: [148, 135, 126, 116, 103, 95, 88],
      },
      {
        name: "Prévision",
        color: "#2D6A4F",
        values: [144, 132, 121, 109, 96, 85, 74],
      },
    ],
    threshold: 90,
  },
  optimization: {
    title: "Projection stock 14 jours",
    subtitle: "Simulation Smart Restock",
    labels: ["J0", "J2", "J4", "J6", "J8", "J10", "J12", "J14"],
    series: [
      {
        name: "Sans commande",
        color: "#dc2626",
        values: [132, 115, 99, 82, 66, 52, 39, 25],
      },
      {
        name: "Avec commande (100u)",
        color: "#52A56E",
        values: [132, 115, 99, 182, 165, 151, 138, 124],
      },
    ],
    threshold: 90,
  },
};

export const heroAlerts = [
  {
    id: "alert-1",
    name: "Samsung T7 SSD 1To",
    description: "Rupture prévue sous 24h",
    level: "Critique",
    progress: 92,
  },
  {
    id: "alert-2",
    name: "Xiaomi Redmi Buds 5 Pro",
    description: "Stock sous seuil minimum",
    level: "Élevé",
    progress: 76,
  },
  {
    id: "alert-3",
    name: "Logitech MX Keys S",
    description: "Pic de demande détecté (+17%)",
    level: "Moyen",
    progress: 68,
  },
];

export const heroInventoryRows = [
  {
    id: "REF-AUD-001",
    name: "Casque Audio Pro",
    reference: "REF-AUD-001",
    quantity: 44,
    price: "10,00€",
    status: "bon",
  },
  {
    id: "REF-MAN-002",
    name: "Manette Sans Fil",
    reference: "REF-MAN-002",
    quantity: 30,
    price: "35,00€",
    status: "bon",
  },
  {
    id: "REF-CHG-003",
    name: "Station de Charge USB-C",
    reference: "REF-CHG-003",
    quantity: 10,
    price: "10,00€",
    status: "bas",
  },
  {
    id: "REF-ADT-004",
    name: "Adaptateur Secteur 65W",
    reference: "REF-ADT-004",
    quantity: 21,
    price: "8,70€",
    status: "bas",
  },
  {
    id: "REF-BAT-005",
    name: "Batterie Externe 20 000mAh",
    reference: "REF-BAT-005",
    quantity: 60,
    price: "10,00€",
    status: "bon",
  },
];


export const floatingCards = [
  {id: "dashboard",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-300",
    textColor: "text-blue-300",
    contentColor: "text-blue-300",
    icon: Search,
    title: "Vue dashboard",
    content:  "Suivez en direct les KPIs, mouvements et inventaires critiques.",
  },
  {id: "alerts" ,
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-300",
    textColor: "text-orange-300",
    contentColor: "text-orange-300",
    icon: TriangleAlert,
    title: "Alerte",
    content: "Repérez rapidement les produits à risque de rupture grâce à nos alertes intelligentes.",
  },
  {id: "optimization",
    bgColor: "bg-emerald-500/15",
    iconColor: "text-emerald-300",
    textColor: "text-emerald-300",
    contentColor: "text-emerald-300",
    icon: Gauge,
    title: "Smart Restock",
    content: "Optimisez vos réapprovisionnements grâce à nos recommandations basées sur l'IA, pour éviter les surstocks et ruptures.",
  },
];