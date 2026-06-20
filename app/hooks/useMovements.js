import { useState, useEffect } from "react";
import { movementService } from "@/services/movementService";

export function useMovements() {
  const [movements, setMovements] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const fetchMovements = async () => {
    setLoading(true);
    try {
      const data = await movementService.getMovements();
      setMovements(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovements(); }, []);

  const createMovement = async (payload) => {
    await movementService.createMovement(payload);
    await fetchMovements(); // recharge la liste comme dans useUsers
  };

  const getMovementById = async (id) => {
    const movement = await movementService.getMovementById(id);
    return movement;
  };

  const getMyMovements = async () => {
    const data = await movementService.getMyMovements();
    return data;
  };

  return { movements, loading, error, createMovement, getMovementById, getMyMovements, fetchMovements };
}