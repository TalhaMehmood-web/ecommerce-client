import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/utils/endpoints";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface ApiResponse<T> {
  statusCode?: number;
  message: string;
  data?: T;
}

// ✅ Reusable Auth Payloads
export interface RegisterPayload extends LoginPayload {
  fullname: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ✅ Reusable Auth Responses
type RegisterResponse = ApiResponse<{ user: User }>;
type LoginResponse = ApiResponse<{ accessToken: string; user: User }>;

// ✅ Generic API Request Function
const apiRequest = async <T>(endpoint: string, data: unknown): Promise<T> => {
  const response = await axiosInstance.post<T>(endpoint, data);
  return response.data;
};

// ✅ Register Function
export const registerUser = (data: RegisterPayload) =>
  apiRequest<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data);

// ✅ Login Function
export const loginUser = (data: LoginPayload) =>
  apiRequest<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
