import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/shared/side-bars/admin";
import Navbar from "@/components/shared/navbar";
interface AuthLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex ">
        <AdminSidebar />
        <main className="flex-1 flex flex-col  overflow-hidden ">
          <Navbar />
          <div className="flex-1 ">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
