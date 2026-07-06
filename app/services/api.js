import axios from "axios";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "@/utils/tokenUtils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

     const isAuthRoute =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post("/api/rest/auth/refresh", { refreshToken });

        const { token, refreshToken: newRefresh } = response.data;
        saveTokens(token, newRefresh);

        // Rejoue la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch {
        alert("Session expirée, veuillez vous reconnecter."); // a changé avec un MUI Snackbar
        // Refresh échoué → déconnexion
        clearTokens();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);


/*api.interceptors.request.use(async (config) => {
  const token = getAccessToken();

  // 1) Si pas de token → rien à faire
  if (!token) return config;

  // 2) Si token expiré → on tente un refresh AVANT la requête
  if (isTokenExpired(token)) {
    const newTokens = await refreshTokens(); // fonction qui appelle /refresh
    config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
  } else {
    // 3) Sinon → token valide → on l’ajoute normalement
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});*/  // a faire a ne pas oublié 

export default api;