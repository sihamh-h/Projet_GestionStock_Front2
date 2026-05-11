import type { Route } from "./+types/home";

import { Home } from "@/pages/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Stock Gestion" },
    { name: "description",
      content: "Welcome to the Home page of Stock Gestion" },
  ];
}

export default function HomePage() {
  return <Home />;
}
