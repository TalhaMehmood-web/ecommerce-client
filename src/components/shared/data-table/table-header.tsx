import {
  TableHead,
  TableRow,
  TableHeader as ShadTableHeader,
} from "@/components/ui/table";

interface Column<T> {
  key: keyof T;
  label: string;
  minWidth?: string;
}

interface TableHeaderProps<T> {
  columns: Column<T>[];
}

export default function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <ShadTableHeader className="bg-slate-100">
      <TableRow>
        {columns.map((col) => (
          <TableHead
            key={col.key as string}
            style={{ minWidth: col.minWidth }}
            className="text-left whitespace-nowrap py-4 "
          >
            {col.label}
          </TableHead>
        ))}
      </TableRow>
    </ShadTableHeader>
  );
}
