import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductData } from "@/types/products/details";
import { addProductApi, editProductApi } from "@/api/product";

const LOCAL_STORAGE_KEY = "productFormData";

export const useAddProduct = (editMode?: boolean, id?: string) => {
  return useMutation({
    mutationFn: async (data: ProductData) => {
      // Choose API based on `editMode`
      const apiCall = editMode
        ? editProductApi(data, id || "")
        : addProductApi(data);

      return toast.promise(apiCall, {
        loading: editMode ? "Updating Product..." : "Adding Product...",
        success: (response) => {
          if (response) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            localStorage.removeItem(`${LOCAL_STORAGE_KEY}_step`);
          }
          return response.message || "Product saved successfully!";
        },
        error: (error) =>
          error.response?.data?.message || "An unexpected error occurred.",
      });
    },
  });
};
