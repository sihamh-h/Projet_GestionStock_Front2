import { icons } from "./sideBarIcons";

// ── ADMIN — accès complet ───────────────────────────────────────
export const adminNav = [
  {
    section: "Principal",
    items: [
      { label: "Dashboard", to: "admin/dashboard", icon: icons.dashboard },
    ],
  },
  {
    section: "Stock",
    items: [
      {
        label: "Catégories", icon: icons.category,
        children: [
          { label: "Toutes les catégories", to: "admin/category" },
          { label: "Ajouter catégorie",     to: "admin/category/nouveau" },
        ],
      },
      {
        label: "Produits", icon: icons.products,
        children: [
          { label: "Tous les produits", to: "admin/product" },
          { label: "Ajouter produit",   to: "admin/produits/nouveau" },
        ],
      },
      {
        label: "Mouvements", icon: icons.movements,
        children: [
          { label: "Tous les mouvements", to: "admin/mouvement" },
          { label: "Mes mouvements",      to: "admin/mouvements/mes" },
          { label: "Nouveau mouvement",   to: "admin/mouvements/nouveau" },
        ],
      },
    ],
  },
  {
    section: "Commercial",
    items: [
      {
        label: "Fournisseurs", icon: icons.suppliers,
        children: [
          { label: "Tous les fournisseurs", to: "admin/supplier" },
          { label: "Ajouter fournisseur",   to: "admin/suppliers/nouveau" },
        ],
      },
      {
        label: "Commandes", icon: icons.orders,
        children: [
          { label: "Toutes les commandes", to: "/commandes" },
          { label: "Nouvelle commande",    to: "/commandes/nouveau" },
        ],
      },
      { label: "Ventes", to: "/ventes", icon: icons.sale },
    ],
  },
  {
    section: "Supervision",
    items: [
      { label: "Alertes",         to: "/alertes", icon: icons.alert },
      {
        label: "Logs d'activité", icon: icons.log,
        children: [
          { label: "Par action",   to: "/logs/action" },
          { label: "Par user",     to: "/logs/user" },
          { label: "Logs échoués", to: "/logs/echecs" },
        ],
      },
    ],
  },
  {
    section: "Administration",
    items: [
      {
        label: "Utilisateurs", icon: icons.users,
        children: [
          { label: "Tous les utilisateurs", to: "/users" },
          { label: "Créer utilisateur",     to: "/users/nouveau" },
        ],
      },
      { label: "Mon profil", to: "/profile", icon: icons.profile },
    ],
  },
];

// ── GESTIONNAIRE — stock + commercial, pas d'administration ────
export const gestionnaireNav = [
  {
    section: "Principal",
    items: [
      { label: "Dashboard", to: "/", icon: icons.dashboard },
    ],
  },
  {
    section: "Stock",
    items: [
      { label: "Catégories", to: "/categories", icon: icons.category },
      {
        label: "Produits", icon: icons.products,
        children: [
          { label: "Tous les produits", to: "/produits" },
          { label: "Ajouter produit",   to: "/produits/nouveau" },
        ],
      },
      {
        label: "Mouvements", icon: icons.movements,
        children: [
          { label: "Tous les mouvements", to: "/mouvements" },
          { label: "Nouveau mouvement",   to: "/mouvements/nouveau" },
        ],
      },
    ],
  },
  {
    section: "Commercial",
    items: [
      { label: "Fournisseurs", to: "/fournisseurs", icon: icons.suppliers },
      {
        label: "Commandes", icon: icons.orders,
        children: [
          { label: "Toutes les commandes", to: "/commandes" },
          { label: "Nouvelle commande",    to: "/commandes/nouveau" },
        ],
      },
      { label: "Ventes", to: "/ventes", icon: icons.sale },
    ],
  },
  {
    section: "Supervision",
    items: [
      { label: "Alertes", to: "/alertes", icon: icons.alert },
    ],
  },
  {
    section: "Compte",
    items: [
      { label: "Mon profil", to: "/profile", icon: icons.profile },
    ],
  },
];

// ── EMPLOYÉ — accès limité, lecture + ses propres mouvements ───
export const employeNav = [
  {
    section: "Principal",
    items: [
      { label: "Dashboard", to: "/", icon: icons.dashboard },
    ],
  },
  {
    section: "Stock",
    items: [
      { label: "Product",       to: "admin/product",       icon: icons.products  },
      { label: "Mes mouvements", to: "/mouvements/mes", icon: icons.movements },
      { label: "Alertes",        to: "/alertes",        icon: icons.alert     },
    ],
  },
  {
    section: "Compte",
    items: [
      { label: "Mon profil", to: "/profile", icon: icons.profile },
    ],
  },
];

// ── Map rôle → config ───────────────────────────────────────────
// Utilisation : navByRole[user.role] ?? employeNav
export const navByRole = {
  ADMIN:        adminNav,
  GESTIONNAIRE: gestionnaireNav,
  EMPLOYE:      employeNav,
};