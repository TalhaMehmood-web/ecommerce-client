"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataTable from "@/components/shared/data-table";
import ProductsListFilters from "./filters";

interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

const ListProductView = () => {
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const columns: { key: keyof User; label: string; minWidth: string }[] = [
    { key: "id", label: "ID", minWidth: "100px" },
    { key: "name", label: "Name", minWidth: "200px" },
    { key: "email", label: "Email", minWidth: "250px" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <ProductsListFilters />
      <DataTable<User>
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
