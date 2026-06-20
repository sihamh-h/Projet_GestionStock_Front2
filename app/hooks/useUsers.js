import { useState, useEffect } from "react";
import { userService } from "@/services/userService";

export function useUsers() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const createUser = async (data) => {
    await userService.createUser(data);
    await fetchUsers(); // ← recharger la liste
  };

  const updateUser = async (id, data) => {
    await userService.updateUser(id, data);
    await fetchUsers();
  };

  const deleteUser = async (id) => {
    await userService.deleteUser(id);
    await fetchUsers();
  };

  const getUserById = async (id) => {
      const user = await userService.getUserById(id); 
      return user;
    }

  return { users, loading, error, createUser, updateUser, deleteUser, fetchUsers, getUserById };
}