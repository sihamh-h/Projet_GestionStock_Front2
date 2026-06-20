import { useState, useEffect } from "react";
import { saleService } from "@/services/saleService";

export function useSales() {
  const [sales,   setSales]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const data = await saleService.getAll();
      setSales(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSales(); }, []);

  const createSale = async (data) => {
    await saleService.create(data);
    await fetchSales();
  };

  const getSaleById = async (id) => {
    return await saleService.getById(id);
  };

  return { sales, loading, error, createSale, getSaleById, fetchSales };
}