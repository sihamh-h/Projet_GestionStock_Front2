import type { Route } from "./+types/home";

import  ResetPassword  from "@/pages/ResetPassword";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reset Password - Stock Gestion" },
    { name: "description",
      content: "Reset your password for the Stock Gestion admin panel." },
  ];
}

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
