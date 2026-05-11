import { motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

export default function AlertCard({ alert, index = 0 }) {
  const levelMeta =
    {
      Critique: {
        badge: "bg-red-500/15 text-red-400 border-red-400/30",
        bar: "from-red-500 to-red-600",
        aria: "critique",
      },
      Élevé: {
        badge: "bg-amber-500/15 text-amber-400 border-amber-400/30",
        bar: "from-amber-500 to-amber-600",
        aria: "élevé",
      },
      Moyen: {
        badge: "bg-emerald-500/15 text-emerald-400 border-emerald-400/30",
        bar: "from-emerald-500 to-emerald-600",
        aria: "moyen",
      },
    }[alert.level] ?? {
      badge: "bg-slate-500/15 text-slate-300 border-slate-400/30",
      bar: "from-slate-400 to-slate-500",
      aria: "info",
    };

  const riskValue = Math.max(0, Math.min(100, Number(alert.progress) || 0));

  return (
    <motion.article
      role="article"
      aria-label={`${alert.name} - niveau ${levelMeta.aria}`}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="rounded-xl bg-slate-200/5 border border-slate-300/10 p-3 backdrop-blur-md hover:bg-slate-200/8 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-slate-100">{alert.ref}</p>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold border ${levelMeta.badge}`}
        >
          <TriangleAlert size={12} />
          {alert.level}
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-3">{alert.description}</p>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Risque</span>
          <span className="font-bold text-slate-100">{riskValue}%</span>
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={riskValue}
          aria-label={`Risque ${riskValue} pour cent`}
          className="h-2 rounded-full bg-slate-300/20 overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${riskValue}%` }}
            transition={{ duration: 0.55 }}
            className={`h-full rounded-full bg-linear-to-r ${levelMeta.bar}`}
          />
        </div>
      </div>
    </motion.article>
  );
}