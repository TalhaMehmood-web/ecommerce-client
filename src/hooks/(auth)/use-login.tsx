import { useMutation } from "@tanstack/react-query";
import { loginUser, LoginPayload } from "@/api/auth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnURL = searchParams.get("returnUrl");

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      return toast.promise(loginUser(data), {
        loading: "Logging you in ...",
        success: (data) => {
          if (returnURL) {
            router.push(returnURL);
            return;
          }
          if (data.data?.user.role === "super_admin") {
            router.push("/super-admin");
          } else {
            router.push("/home");
          }

          return data.message || "Logged in  successfully!";
        },
        error: (error) =>
          error.response?.data?.message || "An unexpected error occurred.",
      });
    },
  });
};
