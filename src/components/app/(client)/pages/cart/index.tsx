"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axiosInstance from "@/config/axios";
import DataTable from "@/components/shared/data-table";
import { PaginatedResponse } from "@/types/pagination-model";
import { API_ENDPOINTS } from "@/utils/endpoints";
import { CartItem } from "@/types/cart";
import { Checkbox } from "@/components/ui/checkbox";
import ProductCell from "./product-cell";
import { useSelectedCart } from "@/context/selected-cart-context";

const fetchCarts = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<CartItem>> => {
  const response = await axiosInstance.get(API_ENDPOINTS.CART.GET_MY_CARTS, {
    params: { page, size: pageSize },
  });
  return response.data;
};
const ListCartView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError } = useQuery<PaginatedResponse<CartItem>>({
    queryKey: ["carts", page, pageSize],
    queryFn: () => fetchCarts(page, pageSize),
    retry: 1,

    refetchOnWindowFocus: false,
  });
  const columns: ColumnDef<CartItem>[] = [
    {
      maxSize: 10,
      accessorKey: "productId",
      header: "Select",
      cell: ({ row }) => {
        const { toggleItem, isSelected } = useSelectedCart();
        const item = row.original;
        return (
          <Checkbox
            className="cursor-pointer"
            checked={isSelected(item.id)}
            onCheckedChange={() => toggleItem(item)}
          />
        );
      },
    },
    {
      minSize: 200,
      accessorKey: "productName",
      header: "Product",
      cell: ({ row }) => <ProductCell row={row} />,
    },

    {
      accessorKey: "quantity",
      header: "Quantity",
      minSize: 20,
      cell: (info) => <span>{info.getValue() as number}</span>,
    },
    {
      accessorKey: "priceAtAdd",
      header: "Price ($)",
      minSize: 20,
      cell: (info) => <span>{info.getValue() as number}</span>,
    },
    {
      accessorKey: "shippingCost",
      header: "Shipping Cost ($)",
      minSize: 20,
      cell: (info) => <span>{info.getValue() as number}</span>,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <DataTable<CartItem>
        columns={columns as ColumnDef<CartItem, any>[]}
        data={data?.data || []}
        isLoading={isLoading}
        isError={isError}
        currentPage={page}
        pageSize={pageSize}
        totalPages={data?.totalPages || 1}
        totalItems={data?.data.length || 0}
        onPageChange={setPage} // Handle page change
        onPageSizeChange={setPageSize} // Handle page size change
        pageSizeOptions={[5, 10, 20, 50]} // Page size options
      />
    </div>
  );
};

export default ListCartView;
