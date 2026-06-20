import {
  BarChart2,
  Bell,
  Package,
  Truck,
  ShoppingCart,
  Users,
  Activity,
  RefreshCw,
} from "lucide-react";

export const featuresData = [
  {
    id: "stock-realtime",
    icon: BarChart2,
    title: "Suivi en Temps Réel",
    description:
      "Surveillez vos niveaux de stock instantanément. Visualisez les entrées et sorties, identifiez qui a fait quoi et quand.",
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    id: "alerts",
    icon: Bell,
    title: "Alertes Intelligentes",
    description:
      "Recevez des notifications en temps réel dès qu'un stock passe sous le seuil critique. Résolvez les alertes directement depuis le tableau de bord.",
    iconColor: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    id: "products",
    icon: Package,
    title: "Gestion des Produits",
    description:
      "Créez, modifiez et organisez vos produits par catégorie. Restaurez facilement les produits supprimés grâce à l'archivage intelligent.",
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    id: "suppliers",
    icon: Truck,
    title: "Gestion des Fournisseurs",
    description:
      "Centralisez vos fournisseurs et associez-les à vos commandes. Suivez l'historique des approvisionnements en un clic.",
    iconColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    id: "orders-sales",
    icon: ShoppingCart,
    title: "Commandes & Ventes",
    description:
      "Gérez vos bons de commande et vos ventes depuis une interface unifiée. Visualisez l'impact direct sur vos stocks en temps réel.",
    iconColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    id: "users",
    icon: Users,
    title: "Gestion Multi-Utilisateurs",
    description:
      "Attribuez des rôles et des permissions précis à chaque collaborateur. Activation par email, changement de mot de passe sécurisé.",
    iconColor: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
  },
  {
    id: "logs",
    icon: Activity,
    title: "Logs d'Activité",
    description:
      "Consultez l'historique complet des actions par utilisateur, par type d'action ou par échec. Idéal pour l'audit et la traçabilité.",
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    id: "movements",
    icon: RefreshCw,
    title: "Mouvements de Stock",
    description:
      "Tracez chaque mouvement d'inventaire — entrées, sorties, ajustements. Retrouvez l'historique complet de chaque produit.",
    iconColor: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
];