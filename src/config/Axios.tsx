import axios from "axios";

let apiURL = "https://dev-api.supersales.co.in/api";
// let apiURL = "http://localhost:5297/api";

const Super_Sales = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle API errors
Super_Sales.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default Super_Sales;