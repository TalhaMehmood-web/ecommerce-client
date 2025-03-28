"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import SidebarCollapsible from "../sidebar-collapsible";
import { SidebarItemProps } from "../sidebar-collapsible";

const userItems: SidebarItemProps[] = [
  {
    title: "Create",
    url: "/super-admin/users/add",
    icon: "Home",
  },
  {
    title: "List",
    url: "/super-admin/users/list",
    icon: "Inbox",
  },
];

export default function SuperAdminSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarMenuItem className="p-2">
          <SidebarMenuButton asChild>
            <Link
              href="/super-admin/dashboard"
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarCollapsible title="Manage Users" items={userItems} />
      </SidebarContent>
    </Sidebar>
  );
}
