export default function DashboardPanel({ title, badge, children }) {
  return (
    <div
      className="rounded-2xl border border-white/10 p-5 backdrop-blur-xl"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{title}</p>
        {badge && (
          <span
            className="text-xs font-bold px-2.5 py-0.5 rounded-full"
            style={{ color: badge.color, background: badge.bg, border: `0.5px solid ${badge.border}` }}
          >
            {badge.label}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}