"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import DataTable from "@/components/shared/data-table";
import ProductsListFilters from "./filters";

// Define Product Interface
interface Product {
  _id: string;
  productName: string;
  basePrice: number;
  discountedPrice: number;
  stockQuantity: number;
  productImage: string | null;
  createdAt: string;
}

// Fetch Products API Call
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("product"); // Use your actual API endpoint
  return response.data.data; // Accessing 'data' from response
};

const ListProductView = () => {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Define Table Columns
  const columns: { key: keyof Product; label: string; minWidth: string }[] = [
    { key: "productName", label: "Product Name", minWidth: "200px" },
    { key: "basePrice", label: "Base Price", minWidth: "100px" },
    { key: "discountedPrice", label: "Discounted Price", minWidth: "150px" },
    { key: "stockQuantity", label: "Stock", minWidth: "100px" },
    // { key: "productImage", label: "Image", minWidth: "150px" },
    { key: "createdAt", label: "Created At", minWidth: "200px" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <ProductsListFilters />
      <DataTable<Product>
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        isError={isError}
        currentPage={1}
        pageSize={10}
        totalPages={1}
        totalItems={data?.length || 0}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </div>
  );
};

export default ListProductView;
