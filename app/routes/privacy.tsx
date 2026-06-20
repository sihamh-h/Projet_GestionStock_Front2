import type { Route } from "./+types/home";

import { Privacy } from "@/pages/Privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Privacy page of Stock Gestion" },
  ];
}

export default function PrivacyPage() {
  return <Privacy />;
}
