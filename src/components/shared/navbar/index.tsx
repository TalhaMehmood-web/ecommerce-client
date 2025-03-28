import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Navbar = () => {
  return (
    <div className=" sticky flex items-center top-0 bg-gray-50 h-16 z-50 ">
      <div>
        <SidebarTrigger />
      </div>
    </div>
  );
};

export default Navbar;
