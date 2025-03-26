import React, { ReactNode } from "react";
import Image from "next/image";
import AuthLogo from "@/assets/login.jpg";
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center">
        <div className="max-w-md p-8">
          <Image
            src={AuthLogo}
            alt="auth-logo"
            className="rounded-lg shadow-lg object-cover"
          />
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="mt-2 text-gray-600">
              Log in to your account to access your dashboard, projects, and
              more.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
