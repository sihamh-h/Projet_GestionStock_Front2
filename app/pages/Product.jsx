import TableGrid  from "@/components/TableGrid"

export function Product() {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Nom du produit", flex: 1 },
    { field: "price", headerName: "Prix", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 1 },
  ];

  const rows = [
    { id: 1, name: "Produit A", price: 12, stock: 50 },
    { id: 2, name: "Produit B", price: 8, stock: 20 },
  ];

  return (
    <TableGrid
      title="Liste des produits"
      rows={rows}
      columns={columns}
    />
  );
}
