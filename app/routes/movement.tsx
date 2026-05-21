import type { Route } from "./+types/home";


import { Movement }  from "@/pages/Movement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movement page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Movement page of Stock Gestion, where you can view and manage your movement records." },
  ];
}

export default function MovementPage() {
  return <Movement />;
}
