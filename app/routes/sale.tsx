import type { Route } from "./+types/home";


import { Sale }  from "@/pages/Sale";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sale page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Sale page of Stock Gestion, where you can view and manage your sale records." },
  ];
}

export default function SalePage() {
  return <Sale />;
}
