"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ClientNavigationMenu from "./client-navigation-menu";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const navItems = [
  { label: "Home", path: "/client/home" },
  { label: "My Favorite Stores", path: "/client/favorite-stores" },
  { label: "Products", path: "/client/products" },
  { label: "Orders", path: "/client/orders" },
  { label: "Checkout", path: "/client/checkout" },
  { label: "Wishlist", path: "/client/wishlist" },
  { label: "Shipping Info", path: "/client/shipping-info" },
];

const ClientNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-full bg-white shadow-md rounded-sm">
      <div className="container mx-auto flex justify-between items-center py-1">
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

        {/* "Be a Vendor" Button */}
        <Button
          onClick={() => router.push("/billing")}
          size="sm"
          variant="link"
          className="text-primary text-xs font-semibold"
        >
          Be a Vendor
        </Button>
      </div>
    </div>
  );
};

export default ClientNavbar;
