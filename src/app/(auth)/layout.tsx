import React, { ReactNode } from "react";
import Image from "next/image";
import AuthLogo from "@/assets/login.png";
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center">
        <div className="max-w-2xl p-8">
          <Image
            src={AuthLogo}
            alt="auth-logo"
            className="rounded-lg shadow-lg object-cover"
          />
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
