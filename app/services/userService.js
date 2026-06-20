import api from "./api";
import { toBackendDate } from "@/utils/formaDate";

export const userService = {
  getUsers: async () => {
    const response = await api.get("/api/rest/users");
    return response.data;
  },

  createUser: async (data) => {
    const payload = {
      ...data,
      birthdate: toBackendDate(data.birthdate),
      roles: data.roles,
    };
    const response = await api.post("/api/rest/users/create", payload);
    return response.data;
  },

  updateUser: async (id, data) => {
    const payload = {
      ...data,
      birthdate: toBackendDate(data.birthdate),
      roles: Array.isArray(data.roles) ? data.roles : [data.roles],
    };
    const response = await api.put(`/api/rest/users/${id}`, payload);
    return response.data;
  },

  deleteUser: async (id) => {
    await api.delete(`/api/rest/users/${id}`);
  },

  getUserById: async (id) => {
  const response = await api.get(`/api/rest/users/${id}`);
  return response.data;
},
};