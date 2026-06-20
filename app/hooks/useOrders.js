import { useState, useEffect } from "react";
import { orderService } from "@/services/orderService";

export function useOrders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const createOrder = async (data) => {
    await orderService.create(data);
    await fetchOrders();
  };

  const updateStatus = async (id, status) => {
    await orderService.updateStatus(id, status);
    await fetchOrders();
  };

  const deleteOrder = async (id) => {
    await orderService.delete(id);
    await fetchOrders();
  };

  const getOrderById = async (id) => {
    return await orderService.getById(id);
  };

  return { orders, loading, error, createOrder, updateStatus, deleteOrder, getOrderById, fetchOrders };
}