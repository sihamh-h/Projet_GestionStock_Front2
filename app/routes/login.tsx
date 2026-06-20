import type { Route } from "./+types/home";


import { Login }  from "@/pages/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login page - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Login page of Stock Gestion, where you can access your account." },
  ];
}

export default function LoginPage() {
  return <Login />;
}
