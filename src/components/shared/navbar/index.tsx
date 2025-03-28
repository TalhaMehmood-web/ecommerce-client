import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import ProfileAvatar from "./profile-avatar";
import clsx from "clsx";

interface NavbarProps {
  isSidebar?: boolean;
  className?: string;
  hasLogo?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebar, className, hasLogo }) => {
  return (
    <div
      className={clsx(
        className,
        " sticky flex items-center justify-between px-4 top-0 bg-gray-50 h-16 z-50 "
      )}
    >
      {isSidebar && (
        <div>
          <SidebarTrigger />
        </div>
      )}
      {hasLogo && <p className="text-2xl font-extrabold  italic">Logo</p>}
      <div className="grid place-content-end w-full">
        <ProfileAvatar />
      </div>
    </div>
  );
};

export default Navbar;
