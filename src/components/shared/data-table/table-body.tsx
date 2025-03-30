import {
  TableBody as ShadTableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
  minWidth?: string;
  render?: (item: T) => React.ReactNode;
}

interface TableBodyProps<T extends { _id: string | number }> {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
  isError: boolean;
}

export default function TableBody<T extends { _id: string | number }>({
  data,
  columns,
  isLoading,
  isError,
}: TableBodyProps<T>) {
  if (isLoading) {
    return (
      <ShadTableBody>
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center py-4">
            <Loader2 className="animate-spin mx-auto text-gray-500" />
          </TableCell>
        </TableRow>
      </ShadTableBody>
    );
  }
  if (isError) {
    return (
      <ShadTableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="text-center text-red-500"
          >
            Error loading data
          </TableCell>
        </TableRow>
      </ShadTableBody>
    );
  }
  return (
    <ShadTableBody>
      {data.map((item, index) => (
        <motion.tr
          key={item._id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="border-b hover:bg-gray-100 transition"
        >
          {columns.map((col) => (
            <TableCell
              key={col.key as string}
              style={{ minWidth: col.minWidth }}
              className="py-3 px-4 whitespace-nowrap"
            >
              {col.render
                ? col.render(item)
                : (item[col.key] as React.ReactNode)}
            </TableCell>
          ))}
        </motion.tr>
      ))}
    </ShadTableBody>
  );
}
