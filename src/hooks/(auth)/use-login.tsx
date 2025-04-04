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
          const user = data.data?.user;
          if (returnURL) {
            router.push(returnURL);
            return;
          }
          if (user?.role === "super_admin") {
            router.push("/super-admin");
          } else if (user?.role === "admin" && user?.isVerified) {
            router.push("/admin");
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
