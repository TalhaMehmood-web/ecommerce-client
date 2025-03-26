import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface FilterOption {
  id: string;
  name: string;
  options: { value: string; label: string }[];
}

interface TableFiltersProps {
  filterOptions: FilterOption[];
  onApplyFilters: (filters: Record<string, string>) => void;
  onClose: () => void;
  isVisible: boolean;
}

const TableFilters = ({
  filterOptions,
  onApplyFilters,
  onClose,
  isVisible,
}: TableFiltersProps) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters({});
    onApplyFilters({});
  };

  if (!isVisible) return null;

  return (
    <div className="relative mb-6 p-4 bg-card rounded-lg border border-border shadow-sm animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filterOptions.map((filter) => (
          <div key={filter.id} className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {filter.name}
            </label>
            <Select
              value={filters[filter.id] || ""}
              onValueChange={(value) => handleFilterChange(filter.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
};

export default TableFilters;
