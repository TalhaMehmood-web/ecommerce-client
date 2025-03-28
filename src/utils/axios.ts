import { API_BASE_URL } from "@/lib/app";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/`,
  withCredentials: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // If response is successful, return it as is
  (error) => {
    if (error.response?.status === 401) {
      const returnUrl = window.location.pathname + window.location.search; // Save current page URL
      window.location.href = `/login?returnUrl=${encodeURIComponent(
        returnUrl
      )}`;
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
