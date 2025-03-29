import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterPayload } from "@/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterPayload) => {
      return toast.promise(registerUser(data), {
        loading: "Registering user...",
        success: (data) => {
          router.push("/login");
          return data.message || "User registered successfully!";
        },
        error: (error) =>
          error.response?.data?.message || "An unexpected error occurred.",
      });
    },
  });
};
