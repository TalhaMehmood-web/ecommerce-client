import { Table } from "@/components/ui/table";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import TableContainer from "./table-container";
import TablePagination from "./table-pagination";

interface Column<T extends { id: string | number }> {
  key: keyof T;
  label: string;
  minWidth?: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
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

export default function DataTable<T extends { id: string | number }>({
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
  return (
    <TableContainer>
      <Table>
        <TableHeader columns={columns} />
        <TableBody
          data={data}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
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
