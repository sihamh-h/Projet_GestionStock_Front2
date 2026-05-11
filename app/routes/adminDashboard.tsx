import type { Route } from "./+types/home";


import AdminDashboard  from "@/pages/AdminDashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Admin Dashboard of Stock Gestion, where you can monitor KPIs, manage inventory, and oversee user activity." },
  ];
}

export default function AdminDashboardPages() {
  return <AdminDashboard />;
}
