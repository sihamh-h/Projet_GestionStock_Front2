import { useState, useEffect } from "react";
import { productService } from "@/services/productService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [deletedProducts, setDeletedProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(Array.isArray(data) ? data : [...data]);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const createProduct = async (data) => {
    await productService.create(data);
    await fetchProducts();
  };

  const updateProduct = async (id, data) => {
    await productService.update(id, data);
    await fetchProducts();
  };

  const deleteProduct = async (id) => {
    await productService.delete(id);
    await fetchProducts();
  };

  const getProductById = async (id) => {
    return await productService.getById(id);
  };

  const restoreProduct = async (id) => {
  await productService.restore(id);
  await fetchProducts();
  await fetchDeletedProducts();
};

const fetchDeletedProducts = async () => {
  try {
    const data = await productService.getDeleted();
    setDeletedProducts(data);
  } catch (err) {
    console.error("Erreur chargement produits supprimés", err);
  }
};

  return { products, loading, error, createProduct, updateProduct, deleteProduct, getProductById, fetchProducts, restoreProduct, fetchDeletedProducts, deletedProducts };
}