export default function DashboardChip({ label, color, bg, border }) {
  return (
    <span
      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
      style={{ color, background: bg, border: `0.5px solid ${border}` }}
    >
      {label}
    </span>
  );
}