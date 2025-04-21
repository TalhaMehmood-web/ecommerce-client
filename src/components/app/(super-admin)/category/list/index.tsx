"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axiosInstance from "@/config/axios";
import DataTable from "@/components/shared/data-table";
import Image from "next/image";
import { ProductListTypes } from "@/types/products/list";
import { PaginatedResponse } from "@/types/pagination-model";
import { API_ENDPOINTS } from "@/utils/endpoints";
import Link from "next/link";
import { Category } from "@/types/category";
import { Badge } from "@/components/ui/badge";
import PaginatedCategoriesRowOptions from "./rowOptions";

const fetchPaginatedCategories = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Category>> => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.CATEGORIES.GET_ALL_PAGINATED_CATEGORIES,
    {
      params: { page, size: pageSize },
    }
  );
  return response.data;
};
const ListCategoriesView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError } = useQuery<PaginatedResponse<Category>>({
    queryKey: ["paginated-categories", page, pageSize],
    queryFn: () => fetchPaginatedCategories(page, pageSize),
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const columns: ColumnDef<Category>[] = [
    {
      minSize: 100,
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => (
        <Link
          href={`/admin/product/preview/${row.original._id}`}
          className=" block truncate w-48 text-blue-400 hover:underline cursor-pointer hover:font-semibold transition-all duration-300 ease-in-out  hover:text-blue-500  "
        >
          {row.original.name}
        </Link>
      ),
    },

    {
      minSize: 20,
      accessorKey: "subcategories",
      header: "Sub Categories",
      cell: ({ row }) => {
        const subcategories = row.original.subcategories;
        return (
          <div className="flex items-center gap-2">
            {subcategories.map((subcategory) => (
              <Badge
                key={subcategory._id}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
              >
                {subcategory.name}
              </Badge>
            ))}
          </div>
        );
      },
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
        const product = row.original as Category;
        return product ? (
          <PaginatedCategoriesRowOptions category={row.original} />
        ) : null;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* <ProductsListFilters /> */}
      <DataTable<Category>
        columns={columns as ColumnDef<Category, any>[]}
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

export default ListCategoriesView;
