import type { Route } from "./+types/home";


import { ActivityLogs }  from "@/pages/ActivityLogs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Activity Logs - Stock Gestion" },
    { name: "description",
      content: "View activity logs in the Stock Gestion application." },
  ];
}

export default function ActivityLogsPage() {
  return <ActivityLogs />;
}
