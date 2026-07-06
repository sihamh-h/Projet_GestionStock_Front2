import type { Route } from "./+types/home";

import { Home } from "@/pages/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "StockiFlow — Gestion de stocks intelligente" },

    {
      name: "description",
      content:
        "StockiFlow est une application web de gestion de stocks en temps réel. Anticipez les ruptures, optimisez vos coûts et prenez les bonnes décisions."
    },

    { name: "robots", content: "index, follow" },
    { name: "keywords", content: "gestion de stock, inventaire, produits, alertes, entreprise, StockiFlow" },
    { name: "author", content: "StockiFlow" },

    { property: "og:title", content: "StockiFlow — Gestion de stocks intelligente" },
    { property: "og:description", content: "La plateforme intelligente pour piloter vos stocks en temps réel." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://stockiflow.com" },
  

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "StockiFlow — Gestion de stocks intelligente" },
    { name: "twitter:description", content: "La plateforme intelligente pour piloter vos stocks en temps réel." },
  ];
}

export default function HomePage() {
  return <Home />;
}
