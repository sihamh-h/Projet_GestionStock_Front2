import type { Route } from "./+types/home";


import { Product }  from "@/pages/Product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Product page of Stock Gestion, where you can view and manage your products." },
  ];
}

export default function ProductPage() {
  return <Product />;
}
