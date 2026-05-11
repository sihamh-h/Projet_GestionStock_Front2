export default function HeroInventoryRows({heroKpis}) {

    const toneClasses = {
    success: "border-emerald-400/20 shadow-[0_4px_16px_rgba(52,211,153,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
    warning: "border-amber-400/20 shadow-[0_4px_16px_rgba(251,191,36,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
    danger:  "border-red-400/20 shadow-[0_4px_16px_rgba(248,113,113,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
    neutral: "border-white/20 shadow-[0_4px_16px_rgba(251,251,251,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]",
    info:    "border-blue-400/20 shadow-[0_4px_16px_rgba(96,165,250,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
  };
    
  
  return (
    heroKpis.map((kpi) => (
                    <div
                      key={kpi.id}
                      className={`rounded-xl overflow-hidden border p-4 ${toneClasses[kpi.tone]} backdrop-blur-[20px] backdrop-saturate-150 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_100%)] transition-all duration-300 hover:scale-[1.02] hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.06)_100%)]`}
                    >
                      <p className="text-sm font-medium">{kpi.label}</p>
                      <p className="mt-2 text-2xl font-black">{kpi.value}</p>
                    </div>
                  ))
    )
}
