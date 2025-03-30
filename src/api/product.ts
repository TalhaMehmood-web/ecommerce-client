import { API_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "./auth";
import { ProductData } from "@/types/products/details";
import { ApiResponse } from "./auth";

type AddProductResponse = ApiResponse<{ data: ProductData }>;
export const addProductApi = (data: ProductData) =>
  apiRequest<AddProductResponse>(API_ENDPOINTS.PRODUCT.ADD_PRODUCT, data);
