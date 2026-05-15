// ── KPI Stats ──────────────────────────────────────────
export const adminStats = [
  {
    id: "total-value",
    label: "Valeur totale du stock",
    value: "€142 850",
    change: +8.4,
    changeLabel: "vs mois dernier",
    tone: "success",
    icon: "💰",
  },
  {
    id: "total-products",
    label: "Produits en stock",
    value: "1 248",
    change: +24,
    changeLabel: "cette semaine",
    tone: "info",
    icon: "📦",
  },
  {
    id: "critical-stock",
    label: "Stock critique",
    value: "12",
    change: -3,
    changeLabel: "vs hier",
    tone: "danger",
    icon: "⚠️",
  },
  {
    id: "total-users",
    label: "Utilisateurs actifs",
    value: "24",
    change: +2,
    changeLabel: "ce mois",
    tone: "neutral",
    icon: "👥",
  },
];

// ── Graphique mouvements ───────────────────────────────
export const chartData = [
  { label: "Nov", entrees: 80,  sorties: 60,  valeur: 98000  },
  { label: "Déc", entrees: 120, sorties: 90,  valeur: 112000 },
  { label: "Jan", entrees: 95,  sorties: 110, valeur: 105000 },
  { label: "Fév", entrees: 140, sorties: 80,  valeur: 121000 },
  { label: "Mar", entrees: 110, sorties: 95,  valeur: 118000 },
  { label: "Avr", entrees: 160, sorties: 70,  valeur: 142850 },
];

// ── Derniers mouvements ────────────────────────────────
export const recentMovements = [
  {
    id: "mv-001",
    productName: "MacBook Pro 14\"",
    type: "ENTREE",
    quantity: 12,
    user: "Alice Martin",
    date: "2026-04-30T10:23:00",
    note: "Livraison fournisseur",
  },
  {
    id: "mv-002",
    productName: "Câble USB-C 2m",
    type: "SORTIE",
    quantity: 30,
    user: "Bob Dupont",
    date: "2026-04-30T09:15:00",
    note: "Commande client #4521",
  },
  {
    id: "mv-003",
    productName: "Chaise ergonomique",
    type: "ENTREE",
    quantity: 5,
    user: "Alice Martin",
    date: "2026-04-29T16:40:00",
    note: null,
  },
  {
    id: "mv-004",
    productName: "Écran 27\" 4K",
    type: "SORTIE",
    quantity: 3,
    user: "Carlos Silva",
    date: "2026-04-29T14:22:00",
    note: "Transfert entrepôt B",
  },
  {
    id: "mv-005",
    productName: "Souris sans fil",
    type: "AJUSTEMENT",
    quantity: -2,
    user: "Alice Martin",
    date: "2026-04-29T11:05:00",
    note: "Correction inventaire",
  },
];

// ── Top produits ───────────────────────────────────────
export const topProducts = [
  {
    id: "PRD-001",
    name: "MacBook Pro 14\"",
    reference: "REF-MAC-001",
    category: "Électronique",
    quantity: 47,
    minQuantity: 10,
    price: 2499,
    status: "BON",
  },
  {
    id: "PRD-002",
    name: "Câble USB-C 2m",
    reference: "REF-CBL-002",
    category: "Accessoires",
    quantity: 120,
    minQuantity: 30,
    price: 19,
    status: "BON",
  },
  {
    id: "PRD-003",
    name: "Clavier mécanique",
    reference: "REF-CLV-003",
    category: "Périphériques",
    quantity: 4,
    minQuantity: 15,
    status: "CRITIQUE",
    price: 149,
  },
  {
    id: "PRD-004",
    name: "Webcam HD 1080p",
    reference: "REF-WEB-004",
    category: "Périphériques",
    quantity: 0,
    minQuantity: 10,
    price: 89,
    status: "RUPTURE",
  },
  {
    id: "PRD-005",
    name: "Hub USB 7 ports",
    reference: "REF-HUB-005",
    category: "Accessoires",
    quantity: 8,
    minQuantity: 12,
    price: 45,
    status: "BAS",
  },
];

// ── Utilisateurs récents ───────────────────────────────
export const recentUsers = [
  {
    id: "USR-001",
    name: "Alice Martin",
    email: "alice.martin@stockflow.fr",
    role: "ADMIN",
    status: "ACTIF",
    lastLogin: "2026-04-30T10:23:00",
  },
  {
    id: "USR-002",
    name: "Bob Dupont",
    email: "bob.dupont@stockflow.fr",
    role: "GESTIONNAIRE",
    status: "ACTIF",
    lastLogin: "2026-04-30T09:15:00",
  },
  {
    id: "USR-003",
    name: "Carlos Silva",
    email: "carlos.silva@stockflow.fr",
    role: "EMPLOYE",
    status: "ACTIF",
    lastLogin: "2026-04-29T16:40:00",
  },
  {
    id: "USR-004",
    name: "Diana Leroy",
    email: "diana.leroy@stockflow.fr",
    role: "EMPLOYE",
    status: "INACTIF",
    lastLogin: "2026-04-20T08:00:00",
  },
];

// ── Alertes ────────────────────────────────────────────
export const alerts = [
  {
    id: "ALT-001",
    title: "Rupture de stock",
    message: "Webcam HD 1080p — stock à 0 unité",
    level: "CRITIQUE",
    date: "2026-04-30T08:00:00",
    read: false,
  },
  {
    id: "ALT-002",
    title: "Stock critique",
    message: "Clavier mécanique — 4 unités restantes (min: 15)",
    level: "ELEVE",
    date: "2026-04-30T07:30:00",
    read: false,
  },
  {
    id: "ALT-003",
    title: "Stock bas",
    message: "Hub USB 7 ports — 8 unités restantes (min: 12)",
    level: "MOYEN",
    date: "2026-04-29T18:00:00",
    read: true,
  },
];


//---- users--------------------------------------------------------
// ── Rôles ───────────────────────────────────────────────────────

export const ROLE_LABELS = {
  ROLE_ADMIN:        { label: "Admin",        color: "#dc2626", bg: "#fee2e2" },
  ROLE_GESTIONNAIRE: { label: "Gestionnaire", color: "#d97706", bg: "#fef3c7" },
  ROLE_EMPLOYE:      { label: "Employé",      color: "#2563eb", bg: "#dbeafe" },
  admin:    { label: "Admin",        color: "#dc2626", bg: "#fee2e2" },
  manager:  { label: "Gestionnaire", color: "#d97706", bg: "#fef3c7" },
  employee: { label: "Employé",      color: "#2563eb", bg: "#dbeafe" },
};
export const ROLES = ["ROLE_ADMIN", "ROLE_GESTIONNAIRE", "ROLE_EMPLOYE"];

export const EMPTY_FORM = {
  firstname: "", lastname: "", username: "",
  email: "", phoneNumber: "", birthdate: "", roles: [],
};

export const mockDataUsers = [
  {
    id: 1,
    firstname: "Jon",
    lastname: "Snow",
    email: "jonsnow@gmail.com",
    phoneNumber: "06 12 36 94 80",
    birthdate: "1989-01-01",
    roles: ["ROLE_ADMIN"],
  },
  {
    id: 2,
    firstname: "Cersei",
    lastname: "Lannister",
    email: "cerseilannister@gmail.com",
    phoneNumber: "06 12 36 94 81",
    birthdate: "1983-06-12",
    roles: ["ROLE_MANAGER"],
  },
  {
    id: 3,
    firstname: "Jaime",
    lastname: "Lannister",
    email: "jaimelannister@gmail.com",
    phoneNumber: "06 12 36 94 82",
    birthdate: "1981-03-22",
    roles: ["ROLE_EMPLOYEE"],
  },
  {
    id: 4,
    firstname: "Anya",
    lastname: "Stark",
    email: "anyastark@gmail.com",
    phoneNumber: "06 12 36 94 83",
    birthdate: "2008-09-15",
    roles: ["ROLE_MANAGER"],
  },
  {
    id: 5,
    firstname: "Daenerys",
    lastname: "Targaryen",
    email: "daenerystargaryen@gmail.com",
    phoneNumber: "06 12 36 94 84",
    birthdate: "1995-11-02",
    roles: ["ROLE_EMPLOYEE"],
  },
  {
    id: 6,
    firstname: "Melisandre",
    lastname: "The Red",
    email: "evermelisandre@gmail.com",
    phoneNumber: "06 12 36 94 85",
    birthdate: "1876-01-01",
    roles: ["ROLE_MANAGER"],
  },
  {
    id: 7,
    firstname: "Ferrara",
    lastname: "Clifford",
    email: "ferraraclifford@gmail.com",
    phoneNumber: "06 12 36 94 86",
    birthdate: "1980-04-18",
    roles: ["ROLE_EMPLOYEE"],
  },
  {
    id: 8,
    firstname: "Rossini",
    lastname: "Frances",
    email: "rossinifrances@gmail.com",
    phoneNumber: "06 12 36 94 87",
    birthdate: "1988-07-09",
    roles: ["ROLE_EMPLOYEE"],
  },
  {
    id: 9,
    firstname: "Harvey",
    lastname: "Roxie",
    email: "harveyroxie@gmail.com",
    phoneNumber: "06 12 36 94 88",
    birthdate: "1960-02-14",
    roles: ["ROLE_EMPLOYEE"],
  },
];

