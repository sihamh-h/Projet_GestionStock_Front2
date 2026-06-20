import type { Route } from "./+types/home";

import { Terms } from "@/pages/Terms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Terms page of Stock Gestion" },
  ];
}

export default function TermsPage() {
  return <Terms />;
}
