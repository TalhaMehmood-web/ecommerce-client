import LoginForm from "@/components/app/(auth)/login";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
