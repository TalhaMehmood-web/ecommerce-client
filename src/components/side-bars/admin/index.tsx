"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
// import SidebarCollapsible from "../side-bar/side-bar-collapsible";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
const superAdminItems = [
  {
    title: "Create",
    url: "/super-admin/manage/create",
    icon: "Home",
  },
  {
    title: "List",
    url: "/super-admin/manage/list",
    icon: "Inbox",
  },
];

const roles = [
  {
    title: "Create",
    url: "/super-admin/role/create",
    icon: "Home",
  },
  {
    title: "List",
    url: "/super-admin/role/list",
    icon: "Inbox",
  },
];
const permissions = [
  {
    title: "Create",
    url: "/super-admin/permissions/create",
    icon: "Home",
  },
  {
    title: "List",
    url: "/super-admin/permissions/list",
    icon: "Inbox",
  },
];

const chatsAndNotifications = [
  {
    title: "Chats",
    url: "/chats/inbox",
    icon: "MessageCircle",
  },
  {
    title: "Notifications",
    url: "/super-admin/notifications",
    icon: "BellRingIcon",
  },
];

export default function AdminSidebar() {
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
        {/* <SidebarCollapsible title="Manage Roles" items={roles} />
        <SidebarCollapsible title="Manage Permissions" items={permissions} />
        <SidebarCollapsible title="Manage Admins" items={superAdminItems} />
        <SidebarCollapsible
          title="Chats and Notifications"
          items={chatsAndNotifications}
        /> */}
      </SidebarContent>
    </Sidebar>
  );
}
