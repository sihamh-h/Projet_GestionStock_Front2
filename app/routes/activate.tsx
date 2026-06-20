import type { Route } from "./+types/home";

import { Activate } from "@/pages/Activate";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Activate - Stock Gestion" },
    { name: "description",
      content: "Activate your account on Stock Gestion" },
  ];
}

export default function ActivatePage() {
  return <Activate />;
}
