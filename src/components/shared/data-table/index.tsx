import React from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import TableContainer from "./table-container";
import TablePagination from "./table-pagination";

import TableHeader from "./table-header";
import TableBody from "./table-body";

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function DataTable<T>({
  columns,
  data,
  isLoading,
  isError,
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <TableContainer>
      <Table>
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody
          rows={table.getRowModel().rows}
          columnsLength={columns.length}
          isLoading={isLoading}
          isError={isError}
          hasData={data.length > 0}
        />
      </Table>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </TableContainer>
  );
}
