import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import ProfileAvatar from "./profile-avatar";
import clsx from "clsx";
import Image from "next/image";
import Logo from "@/assets/logo.png";

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
      {hasLogo && (
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" className="size-8" />
          <p className="text-slate-600 leading-20 font-semibold text-xl">
            buyit
          </p>
        </div>
      )}
      <div className="grid place-content-end w-full">
        <ProfileAvatar />
      </div>
    </div>
  );
};

export default Navbar;
