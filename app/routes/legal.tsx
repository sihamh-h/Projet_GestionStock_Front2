import type { Route } from "./+types/home";

import { Legal } from "@/pages/Legal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Legal - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Legal page of Stock Gestion" },
  ];
}

export default function LegalPage() {
  return <Legal />;
}
