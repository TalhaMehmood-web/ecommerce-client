"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CreditCard,
  ArrowBigLeft,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // For conditional styling
import { Button } from "@/components/ui/button";

export default function VerificationSidebar() {
  const pathname = usePathname(); // Get current route

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent className="flex flex-col justify-between">
        {/* Company Registration */}
        <div>
          <SidebarMenuItem className="p-2">
            <SidebarMenuButton asChild>
              <Link
                href="/company"
                className={clsx(
                  "flex items-center gap-2 px-4 py-6 rounded-md transition-all",
                  pathname === "/company"
                    ? "font-bold bg-gray-200 "
                    : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <LayoutDashboard className={clsx("w-5 h-5", "text-gray-500")} />
                <span>Company Registration</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Subscription Management */}
          <SidebarMenuItem className="p-2">
            <SidebarMenuButton asChild>
              <Link
                href="/billing"
                className={clsx(
                  "flex items-center gap-2 px-4 py-6  rounded-md transition-all",
                  pathname === "/billing"
                    ? "font-bold bg-gray-200 "
                    : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <CreditCard className={clsx("w-5 h-5", "text-gray-500")} />
                <span>Subscription Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
        <div className="p-2 w-full">
          <Link href="/home">
            <Button size="lg" variant="success" className="text-white w-full">
              <ArrowLeft />
              Back To shop
            </Button>
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
