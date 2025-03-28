import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const ProductsFilterSidebar = () => {
  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarMenuItem className="p-2">
          <SidebarMenuButton asChild>
            <p>Talha</p>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProductsFilterSidebar;
