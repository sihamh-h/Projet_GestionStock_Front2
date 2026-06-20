const ACCESS_KEY  = "stockflow_access";
const REFRESH_KEY = "stockflow_refresh";
const USER_KEY    = "stockflow_user";

const isBrowser = typeof window !== "undefined";

export const saveTokens = (accessToken, refreshToken) => {
  if (!isBrowser) return;
  localStorage.setItem(ACCESS_KEY,  accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};

export const saveUser = (user) => {
  if (!isBrowser) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getSavedUser = () => {
  if (!isBrowser) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

export const getAccessToken  = () => isBrowser ? localStorage.getItem(ACCESS_KEY)  : null;
export const getRefreshToken = () => isBrowser ? localStorage.getItem(REFRESH_KEY) : null;

export const clearTokens = () => {
  if (!isBrowser) return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};

export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch { return null; }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
};