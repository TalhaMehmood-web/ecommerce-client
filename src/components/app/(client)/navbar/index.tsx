"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ClientNavigationMenu from "./client-navigation-menu";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "My Favorite Stores", path: "/favorite-stores" },
  { label: "Products", path: "/products" },
  { label: "Orders", path: "/orders" },
  { label: "Checkout", path: "/checkout" },
  { label: "Wishlist", path: "/wishlist" },
  { label: "Shipping Info", path: "/shipping-info" },
  { label: "Be a Vendor", path: "/company" },
];

const ClientNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-full bg-white shadow-md rounded-sm">
      <div className="container mx-auto flex justify-between items-center py-1 px-2">
        {/* Navigation Menu */}
        <ClientNavigationMenu />

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={clsx("text-xs font-semibold  hover:text-black", {
                "text-primary font-bold transition-transform duration-300 ease-in-out":
                  pathname === item.path,
                "text-gray-500": pathname !== item.path,
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ClientNavbar;
