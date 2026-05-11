import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ton Spring Boot
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajoute le token JWT automatiquement à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gère les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré → redirige vers login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;