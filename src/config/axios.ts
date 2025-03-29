import { API_BASE_URL } from "@/lib/app";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const returnUrl = window.location.pathname + window.location.search;
      window.location.href = `/login?returnUrl=${encodeURIComponent(
        returnUrl
      )}`;
      localStorage.clear();
    }
    return Promise.reject(error); // Forward error to catch block
  }
);

export default axiosInstance;
