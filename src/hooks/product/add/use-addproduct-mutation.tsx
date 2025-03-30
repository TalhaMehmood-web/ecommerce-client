import { useMutation } from "@tanstack/react-query";
import {} from "@/api/auth";
import { toast } from "sonner";
import { ProductData } from "@/types/products/details";
import { addProductApi } from "@/api/product";

const LOCAL_STORAGE_KEY = "productFormData";
export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (data: ProductData) => {
      return toast.promise(addProductApi(data), {
        loading: "Add Product",
        success: (data) => {
          // if (data) {
          //   localStorage.removeItem(LOCAL_STORAGE_KEY);
          // }
          return data.message || "Product Added successfully";
        },
        error: (error) =>
          error.response?.data?.message || "An unexpected error occurred.",
      });
    },
  });
};
