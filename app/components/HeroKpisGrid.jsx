export default function HeroKpisGrid({ heroKpis }) {
  const toneClasses = {
    success: "border-emerald-400/20 shadow-[0_4px_16px_rgba(52,211,153,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
    warning: "border-amber-400/20 shadow-[0_4px_16px_rgba(251,191,36,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
    danger:  "border-red-400/20 shadow-[0_4px_16px_rgba(248,113,113,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
    neutral: "border-white/20 shadow-[0_4px_16px_rgba(251,251,251,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]",
    info:    "border-blue-400/20 shadow-[0_4px_16px_rgba(96,165,250,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
  };

  const toneIconBg = {
    success: "bg-emerald-400/15",
    warning: "bg-amber-400/15",
    danger:  "bg-red-400/15",
    neutral: "bg-white/10",
    info:    "bg-blue-400/15",
  };

  const toneIconColor = {
    success: "text-emerald-400",
    warning: "text-amber-400",
    danger:  "text-red-400",
    neutral: "text-white/60",
    info:    "text-blue-400",
  };

  return heroKpis.map((kpi) => {
    const Icon = kpi.icon;
    return (
      <div
        key={kpi.id}
        className={`rounded-xl overflow-hidden border p-4 ${toneClasses[kpi.tone]} backdrop-blur-[20px] backdrop-saturate-150 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_100%)] transition-all duration-300 hover:scale-[1.02] hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.06)_100%)]`}
      >
        {/* Icône */}
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${toneIconBg[kpi.tone]}`}>
            <Icon className={`w-5 h-5 ${toneIconColor[kpi.tone]}`} />
          </div>
        )}

        {/* Valeur */}
        <p className="text-2xl font-black mt-1">{kpi.value}</p>

        {/* Label */}
        <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-1">{kpi.label}</p>

        {/* Sous-titre */}
        {kpi.sub && (
          <p className="text-xs text-white/30 mt-1">{kpi.sub}</p>
        )}
      </div>
    );
  });
}