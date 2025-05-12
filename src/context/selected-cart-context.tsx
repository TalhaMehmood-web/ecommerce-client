// context/SelectedCartContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/types/cart";

type SelectedCartContextType = {
  selectedItems: CartItem[];
  toggleItem: (item: CartItem) => void;
  isSelected: (id: string) => boolean;
};

const SelectedCartContext = createContext<SelectedCartContextType | undefined>(
  undefined
);

export const SelectedCartProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  const toggleItem = (item: CartItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isSelected = (id: string) =>
    selectedItems.some((item) => item.id === id);

  return (
    <SelectedCartContext.Provider
      value={{ selectedItems, toggleItem, isSelected }}
    >
      {children}
    </SelectedCartContext.Provider>
  );
};

export const useSelectedCart = () => {
  const context = useContext(SelectedCartContext);
  if (!context) {
    throw new Error("useSelectedCart must be used within SelectedCartProvider");
  }
  return context;
};
