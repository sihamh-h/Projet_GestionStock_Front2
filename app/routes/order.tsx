import type { Route } from "./+types/home";


import { Order }  from "@/pages/Order";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Order page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Order page of Stock Gestion, where you can view and manage your order records." },
  ];
}

export default function OrderPage() {
  return <Order />;
}
