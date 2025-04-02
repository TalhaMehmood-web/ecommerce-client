import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import VerificationSidebar from "@/components/shared/side-bars/verify";
import Navbar from "@/components/shared/navbar";

interface BillingLayoutProps {
  children: React.ReactNode;
}

const BillingLayout: React.FC<BillingLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex ">
        <VerificationSidebar />
        <main className="flex-1 flex flex-col  overflow-hidden ">
          <Navbar isSidebar />
          <div className="flex-1 ">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BillingLayout;
