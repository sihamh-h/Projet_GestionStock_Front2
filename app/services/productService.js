import api from "./api";

export const productService = {
  getAll: async () => {
    const response = await api.get("/api/rest/product/all");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/rest/product/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/api/rest/product/create", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/api/rest/product/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/api/rest/product/${id}`);
  },
  restore: async (id) => {
  const response = await api.patch(`/api/rest/product/${id}/restore`);
  return response.data;
},

getDeleted: async () => {
  const response = await api.get("/api/rest/product/deleted");
  return response.data;
},
};