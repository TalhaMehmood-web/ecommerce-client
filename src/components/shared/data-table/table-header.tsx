import React from "react";
import { HeaderGroup, flexRender } from "@tanstack/react-table";
import {
  TableHead,
  TableRow,
  TableHeader as ShadTableHeader,
} from "@/components/ui/table";

interface TableHeadProps<T> {
  headerGroups: HeaderGroup<T>[];
}

export default function TableHeader<T>({ headerGroups }: TableHeadProps<T>) {
  return (
    <ShadTableHeader className="bg-slate-100">
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              style={{ minWidth: header.column.columnDef.minSize }}
              className="text-left whitespace-nowrap py-4 "
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </ShadTableHeader>
  );
}
