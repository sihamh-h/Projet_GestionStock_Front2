import api from "./api";

export const categoryService = {
  getAll: async () => {
    const response = await api.get("/api/rest/category/all");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/api/rest/category/create", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/api/rest/category/${id}`, data);
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await api.get(`/api/rest/category/${id}`);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/api/rest/category/${id}`);
  },

};