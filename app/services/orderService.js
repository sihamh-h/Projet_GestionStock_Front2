import api from "./api";

export const orderService = {
  getAll: async () => {
    const response = await api.get("/api/rest/order/all");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/rest/order/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/api/rest/order/create", data);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/api/rest/order/${id}/status?status=${status}`);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/api/rest/order/${id}`);
  },
};