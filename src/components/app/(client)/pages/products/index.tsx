"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductsFilterSidebar from "./filters/side-bar";
import ProductsList from "./products-list";
import { SidebarProvider } from "@/components/ui/sidebar";
import clsx from "clsx";

const ClientProductsView = () => {
  const sidebarWidth = "280px";
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const manageFilterComponentPosition = isScrolled ? "top-0" : "top-32";
  return (
    <SidebarProvider>
      <div className="flex w-full">
        {/* Fixed width sidebar container - reserves space in the layout */}
        <div style={{ width: sidebarWidth, minWidth: sidebarWidth }}>
          {/* Actual fixed sidebar */}
          <div
            className={clsx(
              manageFilterComponentPosition,
              "transition-all  duration-300 ease-in-out fixed  h-screen overflow-y-auto border-r bg-background"
            )}
            style={{ width: sidebarWidth }}
          >
            <div className="p-2">
              <ProductsFilterSidebar />
            </div>
          </div>
        </div>

        <ProductsList />
      </div>
    </SidebarProvider>
  );
};

export default ClientProductsView;
