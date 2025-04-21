import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

const fetchProductById = async (id: string): Promise<any> => {
  const response = await axiosInstance.get(`/product/${id}`);
  return response.data;
};

export const useFetchProductById = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
