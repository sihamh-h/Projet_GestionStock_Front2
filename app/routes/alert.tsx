import type { Route } from "./+types/home";


import { Alerts }  from "@/pages/Alert";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Alert page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Alert page of Stock Gestion, where you can view and manage your alert notifications." },
  ];
}

export default function AlertPage() {
  return <Alerts />;
}
