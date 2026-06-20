import { useState, useEffect } from "react";
import { supplierService } from "@/services/supplierService";

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await supplierService.getAll();
      setSuppliers(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const createSupplier = async (data) => {
    await supplierService.create(data);
    await fetchSuppliers();
  };

  const updateSupplier = async (id, data) => {
    await supplierService.update(id, data);
    await fetchSuppliers();
  };

  const deleteSupplier = async (id) => {
    await supplierService.delete(id);
    await fetchSuppliers();
  };

  const getSupplierById = async (id) => {
    return await supplierService.getById(id);
  };

  return { suppliers, loading, error, createSupplier, updateSupplier, deleteSupplier, getSupplierById, fetchSuppliers };
}