import {
  TableBody as ShadTableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface TableBodyProps {
  rows: Array<any>;
  columnsLength: number;
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({
  rows,
  columnsLength,
  isLoading,
  isError,
  hasData,
}) => {
  if (isLoading) {
    return (
      <ShadTableBody className="h-60">
        <TableRow>
          <TableCell colSpan={columnsLength} className="text-center py-4 ">
            <Loader2 className="animate-spin mx-auto text-gray-500" />
          </TableCell>
        </TableRow>
      </ShadTableBody>
    );
  }

  if (isError) {
    return (
      <ShadTableBody className="h-60">
        <TableRow>
          <TableCell
            colSpan={columnsLength}
            className="text-center text-lg font-semibold text-red-500"
          >
            Error loading data
          </TableCell>
        </TableRow>
      </ShadTableBody>
    );
  }

  if (!hasData) {
    return (
      <ShadTableBody>
        <TableRow>
          <TableCell
            colSpan={columnsLength}
            className="text-center text-red-500"
          >
            No data Available
          </TableCell>
        </TableRow>
      </ShadTableBody>
    );
  }

  return (
    <>
      <ShadTableBody className="overflow-y-hidden">
        {rows.map((row, rowIndex) => (
          <motion.tr
            key={rowIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border-b hover:bg-gray-100 transition"
          >
            {row.getVisibleCells().map((cell: any, colIndex: number) => (
              <TableCell
                key={colIndex}
                style={{ minWidth: cell.column.getSize() }}
                className="py-3 px-4 whitespace-nowrap"
              >
                {typeof cell.column.columnDef.cell === "function"
                  ? cell.column.columnDef.cell({ row, getValue: cell.getValue })
                  : cell.renderValue()}
              </TableCell>
            ))}
          </motion.tr>
        ))}
      </ShadTableBody>
    </>
  );
};

export default TableBody;
