
export default function InventoryTable({ items, title = "Inventaires" }){
     return (
    <div className="rounded-lg bg-slate-200/5 border border-slate-300/10 overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-300/10 bg-slate-200/3">
        <p className="font-bold text-slate-100 text-sm">{title}</p>
        <span className="text-xs px-2 py-1 rounded-md text-slate-400 bg-slate-400/10">
          {items.length} produits
        </span>
      </div>

      {/* Headers colonnes */}
      <div className="grid grid-cols-5 text-xs font-bold text-slate-300 px-3 py-2 border-b border-slate-300/10 bg-slate-200/3">
        <span>Nom</span>
        <span>Référence</span>
        <span>Quantité</span>
        <span>Prix</span>
        <span>Statut</span>
      </div>

      {/* Lignes */}
      <div className="divide-y divide-slate-300/10">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-5 text-xs px-3 py-2.5 items-center text-slate-200 hover:bg-slate-200/5 transition-colors">
            <span className="truncate font-medium">{item.name}</span>
            <span className="text-slate-400 text-[11px]">{item.reference}</span>
            <span className="font-semibold">{item.quantity}</span>
            <span className="text-slate-400">{item.price}</span>
            <span>
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === "bon"
                    ? "bg-emerald-600/80 text-white"
                    : "bg-amber-600/80 text-white"
                }`}
              >
                {item.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

}