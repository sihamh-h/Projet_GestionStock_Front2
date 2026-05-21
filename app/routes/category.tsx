import type { Route } from "./+types/home";


import { Category }  from "@/pages/Category";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Category page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Category page of Stock Gestion, where you can view and manage your categories." },
  ];
}

export default function CategoryPage() {
  return <Category />;
}
