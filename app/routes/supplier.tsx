import type { Route } from "./+types/home";


import { Supplier }  from "@/pages/Supplier";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Supplier page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Supplier page of Stock Gestion, where you can view and manage your suppliers." },
  ];
}

export default function SupplierPage() {
  return <Supplier />;
}
