import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/shared/navbar";
import SuperAdminSidebar from "@/components/shared/side-bars/super-admin";
interface AuthLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex ">
        <SuperAdminSidebar />
        <main className="flex-1 flex flex-col  overflow-hidden ">
          <Navbar isSidebar />
          <div className="flex-1 ">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
