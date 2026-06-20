import { CheckCircle } from "lucide-react";

export default function DashboardEmpty({ message }) {
  return (
    <div className="flex items-center gap-2 py-6 justify-center">
      <CheckCircle className="w-4 h-4 text-emerald-400" />
      <p className="text-xs text-white/40">{message}</p>
    </div>
  );
}