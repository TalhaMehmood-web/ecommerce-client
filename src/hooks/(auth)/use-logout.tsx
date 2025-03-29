import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config/axios";

// Define the expected response type
interface LogoutResponse {
  message: string;
}

// API call function
const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await axiosInstance.post("user/logout");
  return response.data;
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation<LogoutResponse, Error>({
    mutationFn: async () => {
      const data = await logoutUser();

      toast.promise(Promise.resolve(data), {
        loading: "Logging you out...",
        success: () => {
          return data.message || "User registered successfully!";
        },
        error: (error) =>
          error.response?.data?.message || "An unexpected error occurred.",
      });

      return data;
    },
    onSuccess: () => {
      router.push("/login");
    },
  });
};
