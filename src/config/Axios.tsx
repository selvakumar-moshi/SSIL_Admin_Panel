import axios from "axios";

let apiURL = "https://www.supersales.com/api";
 
let getTokenFn: (() => string | null) | null = null;
let logoutFn: (() => void) | null = null;

export const setupAxiosInterceptors = (getToken: () => string | null, logout: () => void) => {
  getTokenFn = getToken;
  logoutFn = logout;
};
 
const Super_Sales = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true
  },
});
 
 
// Use interceptor to add fresh token on each request
Super_Sales.interceptors.request.use(
  (config) => {
    if (getTokenFn) {
      const token = getTokenFn();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
// Response interceptor to handle token expiration
Super_Sales.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('sso-token');
      if (logoutFn) {
        logoutFn();
      }
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
 
 
export default Super_Sales;