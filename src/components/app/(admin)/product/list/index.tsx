"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axiosInstance from "@/config/axios";
import DataTable from "@/components/shared/data-table";
import ProductsListFilters from "./filters";
import Image from "next/image";
import ProductListRowOptions from "./rowOptions";
import { ProductListTypes } from "@/types/products/list";
import { PaginatedResponse } from "@/types/pagination-model";
import { API_ENDPOINTS } from "@/utils/endpoints";

const fetchProducts = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<ProductListTypes>> => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.PRODUCT.GELL_PAGINATED_PRODUCTS,
    {
      params: { page, size: pageSize },
    }
  );
  return response.data;
};
const ListProductView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError } = useQuery<
    PaginatedResponse<ProductListTypes>
  >({
    queryKey: ["products", page, pageSize],
    queryFn: () => fetchProducts(page, pageSize),
    retry: 1,
  });

  const columns: ColumnDef<ProductListTypes>[] = [
    {
      minSize: 100,
      accessorKey: "productName",
      header: "Product Name",
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      minSize: 100,
      accessorKey: "productImage",
      header: "Product Image",
      cell: (info) => {
        const imageUrl = info.getValue() as string;

        return (
          <Image
            src={imageUrl || "/placeholder.png"}
            alt="Product Image"
            width={50}
            height={50}
            objectFit="cover "
            className="border  p-2 rounded-md"
          />
        );
      },
    },
    {
      minSize: 20,
      accessorKey: "basePrice",
      header: "Base Price",
      cell: (info) => <span>${info.getValue() as number}</span>,
    },
    {
      minSize: 20,
      accessorKey: "discountedPrice",
      header: "Discounted Price",
      cell: (info) => <span>${info.getValue() as number}</span>,
    },
    {
      minSize: 20,
      accessorKey: "stockQuantity",
      header: "Stock",
      cell: (info) => (
        <span
          className={`${
            (info.getValue() as number) > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {info.getValue() as number}
        </span>
      ),
    },
    {
      minSize: 20,
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => (
        <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>
      ),
    },
    {
      minSize: 20,

      header: "Actions",
      cell: ({ row }) => {
        const product = row.original as ProductListTypes;
        console.log("Product data:", product);
        return product ? <ProductListRowOptions product={product} /> : null;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <ProductsListFilters />
      <DataTable<ProductListTypes>
        columns={columns as ColumnDef<ProductListTypes, any>[]}
        data={data?.data || []}
        isLoading={isLoading}
        isError={isError}
        currentPage={page}
        pageSize={pageSize}
        totalPages={data?.totalPages || 1}
        totalItems={data?.data.length || 0}
        onPageChange={setPage} // Handle page change
        onPageSizeChange={setPageSize} // Handle page size change
      />
    </div>
  );
};

export default ListProductView;
