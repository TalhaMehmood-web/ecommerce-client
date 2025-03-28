"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import axios from "axios";
import TablePagination from "@/components/data-table/table-pagination";

interface Column<T> {
  key: keyof T;
  label: string;
  minWidth?: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  endpoint: string;
  pageSize?: number;
}

export default function DataTable<T>({ columns, endpoint }: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tableData", endpoint, currentPage],
    queryFn: async () => {
      const response = await axios.get(
        `${endpoint}?page=${currentPage}&limit=${pageSize}`
      );
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className="w-full">
      {/* Responsive container with shadow and rounded corners */}
      <div className="rounded-lg shadow-md bg-white overflow-hidden">
        {/* Table container with horizontal scroll */}
        <div className="overflow-x-auto w-full min-w-2xl ">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    style={{ minWidth: col.minWidth }}
                    key={col.key as string}
                    className="text-left whitespace-nowrap"
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-4"
                  >
                    <Loader2 className="animate-spin mx-auto text-gray-500" />
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-red-500"
                  >
                    Error loading data
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((item: any, index: number) => (
                  <motion.tr
                    key={item.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    {columns.map((col) => (
                      <TableCell
                        style={{ minWidth: col.minWidth }}
                        key={col.key as string}
                        className="py-3 px-4 whitespace-nowrap"
                      >
                        {col.render
                          ? col.render(item)
                          : (item[col.key] as React.ReactNode)}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination - fixed at the bottom and doesn't scroll horizontally */}
        <TablePagination
          currentPage={1}
          totalPages={3}
          pageSize={pageSize}
          totalItems={10}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}
