import api from "./api";

export const supplierService = {
  getAll: async () => {
    const response = await api.get("/api/rest/supplier");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/rest/supplier/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/api/rest/supplier/create", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/rest/supplier/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/api/rest/supplier/${id}`);
  },
};