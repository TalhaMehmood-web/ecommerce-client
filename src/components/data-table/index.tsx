"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import TableFilters from "./table-filters";
import TableHeader from "./table-header";
import TablePagination from "./table-pagination";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
// Column definition with sorting capability
export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

// Props for the DataTable component
interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  description?: string;
  filterOptions?: {
    id: string;
    name: string;
    options: { value: string; label: string }[];
  }[];
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  title = "Data Table",
  description,
  filterOptions = [],
}: DataTableProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });

  // Reset to first page when filtered data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilters]);

  // Apply search, filters, and sorting
  useEffect(() => {
    let result = [...data];

    // Apply search
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(lowercasedSearch)
        )
      );
    }

    // Apply filters
    if (Object.keys(activeFilters).length > 0) {
      result = result.filter((item) => {
        return Object.entries(activeFilters).every(([key, filterValue]) => {
          if (!filterValue) return true; // Skip empty filters
          const itemValue = item[key]?.toString();
          return itemValue === filterValue;
        });
      });
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const valueA = a[sortConfig.key as keyof T];
        const valueB = b[sortConfig.key as keyof T];

        if (valueA === valueB) return 0;

        // Handle different types (string, number, date)
        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortConfig.direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return sortConfig.direction === "asc"
          ? valueA < valueB
            ? -1
            : 1
          : valueA > valueB
          ? -1
          : 1;
      });
    }

    setFilteredData(result);
  }, [data, searchTerm, activeFilters, sortConfig]);

  // Handle column sorting
  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" | null = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key: direction ? key : null, direction });
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Handle filter application
  const handleApplyFilters = (filters: Record<string, string>) => {
    setActiveFilters(filters);
    setShowFilters(false);

    const filterCount = Object.values(filters).filter(Boolean).length;
    if (filterCount > 0) {
      toast.success(
        `Applied ${filterCount} filter${filterCount > 1 ? "s" : ""}`
      );
    }
  };

  // Pagination calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Empty state
  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-muted-foreground">
            There are no items to display at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableHeader
        title={title}
        description={description}
        onSearch={handleSearch}
        onFilterToggle={() => setShowFilters(!showFilters)}
      />

      {filterOptions.length > 0 && (
        <TableFilters
          filterOptions={filterOptions}
          onApplyFilters={handleApplyFilters}
          onClose={() => setShowFilters(false)}
          isVisible={showFilters}
        />
      )}

      <div className="relative overflow-x-auto w-full overflow-hidden rounded-lg shadow-sm animate-fade-in">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    column.sortable && "cursor-pointer hover:text-foreground",
                    column.className
                  )}
                  onClick={() =>
                    column.sortable && handleSort(column.accessorKey)
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable &&
                      sortConfig.key === column.accessorKey && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : sortConfig.direction === "desc" ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : null}
                        </span>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="table-slide-up"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {columns.map((column) => (
                  <td
                    key={`${index}-${column.id}`}
                    className={column.className}
                  >
                    {column.cell
                      ? column.cell(row)
                      : String(row[column.accessorKey] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default DataTable;
