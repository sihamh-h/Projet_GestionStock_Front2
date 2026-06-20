import { useState, useEffect } from "react";
import { categoryService } from "@/services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const createCategory = async (data) => {
    await categoryService.create(data);
    await fetchCategories();
  };

  const updateCategory = async (id, data) => {
    await categoryService.update(id, data);
    await fetchCategories();
  };

  const deleteCategory = async (id) => {
    await categoryService.delete(id);
    await fetchCategories();
  };
  const getCategoryById = async (id) => {
  return await categoryService.getCategoryById(id);
};

  return { categories, loading, error, createCategory, updateCategory, deleteCategory, getCategoryById };
}