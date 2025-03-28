import React, { ReactNode } from "react";
import Navbar from "@/components/shared/navbar";
import ClientNavbar from "@/components/app/(client)/navbar";

interface AuthLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex bg-slate-50  ">
      <main className="flex-1 flex flex-col max-w-6xl mx-auto container  overflow-hidden ">
        <Navbar hasLogo className="bg-slate-50" />
        <ClientNavbar />
        <div className="flex-1 ">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
