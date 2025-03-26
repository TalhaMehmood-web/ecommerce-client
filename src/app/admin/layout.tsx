import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/side-bars/admin";
interface AuthLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <div className="w-full min-h-screen flex">
          <AdminSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
