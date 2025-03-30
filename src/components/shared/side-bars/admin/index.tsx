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

const productItems: SidebarItemProps[] = [
  {
    title: "Create",
    url: "/admin/product/add",
    icon: "Home",
  },
  {
    title: "List",
    url: "/admin/product/list",
    icon: "Inbox",
  },
];
const customerItems: SidebarItemProps[] = [
  {
    title: "Create",
    url: "/admin/customer/add",
    icon: "Home",
  },
  {
    title: "List",
    url: "/admin/customer/list",
    icon: "Inbox",
  },
];
const orderItems: SidebarItemProps[] = [
  {
    title: "Create",
    url: "/admin/order/add",
    icon: "Home",
  },
  {
    title: "List",
    url: "/admin/order/list",
    icon: "Inbox",
  },
];

export default function AdminSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarMenuItem className="p-2">
          <SidebarMenuButton asChild>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarCollapsible title="Manage Products" items={productItems} />
        <SidebarCollapsible title="Manage Customers" items={customerItems} />
        <SidebarCollapsible title="Manage Orders" items={orderItems} />
      </SidebarContent>
    </Sidebar>
  );
}
