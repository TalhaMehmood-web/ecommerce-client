import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { ProductData } from "@/types/products/details";

const fetchProductById = async (id: string): Promise<any> => {
  const response = await axiosInstance.get(`/product/${id}`);
  console.log("res", response);
  return response.data;
};

export const useFetchProductById = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
};
