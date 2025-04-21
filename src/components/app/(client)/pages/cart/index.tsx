"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axiosInstance from "@/config/axios";
import DataTable from "@/components/shared/data-table";
// import ProductsListFilters from "./filters";
import Image from "next/image";
// import ProductListRowOptions from "./rowOptions";
import { ProductListTypes } from "@/types/products/list";
import { PaginatedResponse } from "@/types/pagination-model";
import { API_ENDPOINTS } from "@/utils/endpoints";
import Link from "next/link";
import { Cart, CartItem } from "@/types/cart";

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
      minSize: 50,
      accessorKey: "productName",
      header: "Product Name",
      cell: ({ row }) => (
        <Link
          href={`/admin/product/preview/${row.original.productId}`}
          className=" block truncate w-32 text-blue-400 hover:underline cursor-pointer hover:font-semibold transition-all duration-300 ease-in-out  hover:text-blue-500  "
        >
          {row.original.productName}
        </Link>
      ),
    },

    {
      accessorKey: "productImage",
      header: "Product Image",
      minSize: 50,
      cell: (info) => {
        const imageUrl = info.getValue() as string;

        return (
          <Image
            src={imageUrl || "/placeholder.png"}
            alt="Product Image"
            width={50}
            height={50}
            className="border p-2 rounded-md object-cover"
          />
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      minSize: 20,
      cell: (info) => <span>{info.getValue() as number}</span>,
    },
    {
      accessorKey: "variant",
      header: "Variant",
      minSize: 20,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "priceAtAdd",
      header: "Price at Add",
      minSize: 20,
      cell: (info) => <span>${info.getValue() as number}</span>,
    },
    {
      accessorKey: "shippingCost",
      header: "Shipping Cost",
      minSize: 20,
      cell: (info) => <span>${info.getValue() as number}</span>,
    },
    {
      accessorKey: "estimatedDelivery",
      header: "Estimated Delivery",
      minSize: 20,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "material",
      header: "Material",
      minSize: 20,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "color",
      header: "Color",
      minSize: 20,

      cell: (info) => <span>{info.getValue() as string}</span>,
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
