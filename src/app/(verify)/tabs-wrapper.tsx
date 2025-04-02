"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface TabsWrapperProps {
  children: React.ReactNode;
}

const TabsWrapper: React.FC<TabsWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <Tabs defaultValue={pathname} className="w-full flex flex-row">
      <TabsList className="w-full mb-4  flex flex-col items-start">
        <Link href="/company">
          <TabsTrigger
            value="/company"
            className="flex-1"
            data-state={pathname === "/company" ? "active" : undefined}
          >
            Company Registration
          </TabsTrigger>
        </Link>
        <Link href="/billing">
          <TabsTrigger
            value="/billing"
            className="flex-1 w-full"
            data-state={pathname === "/billing" ? "active" : undefined}
          >
            Subscription Management
          </TabsTrigger>
        </Link>
      </TabsList>
      <main className="flex-1">{children}</main>
    </Tabs>
  );
};

export default TabsWrapper;
