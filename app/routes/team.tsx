import type { Route } from "./+types/home";


import { Team }  from "@/pages/Team";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Team page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Team page of Stock Gestion, where you can view and manage your team members." },
  ];
}

export default function TeamPage() {
  return <Team />;
}
