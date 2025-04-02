import { API_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "./auth";
import { ProductData } from "@/types/products/details";
import { ApiResponse } from "./auth";
import axiosInstance from "@/config/axios";

export const editProductResponse = async <T>(
  endpoint: string,
  data: unknown,
  id: string
): Promise<T> => {
  const response = await axiosInstance.put<T>(`${endpoint}/${id}`, data);
  return response.data;
};
type AddProductResponse = ApiResponse<{ data: ProductData }>;

export const addProductApi = (data: ProductData) =>
  apiRequest<AddProductResponse>(API_ENDPOINTS.PRODUCT.ADD_PRODUCT, data);

export const editProductApi = (data: ProductData, id: string) =>
  editProductResponse<AddProductResponse>(
    API_ENDPOINTS.PRODUCT.EDIT_PRODUCT,
    data,
    id
  );
