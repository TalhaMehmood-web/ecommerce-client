import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

interface TableHeaderProps {
  title: string;
  description?: string;
  onSearch: (value: string) => void;
  onFilterToggle: () => void;
}

const TableHeader = ({
  title,
  description,
  onSearch,
  onFilterToggle,
}: TableHeaderProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6 animate-slide-down">
      <div>
        <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-full sm:w-[250px] bg-background"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onFilterToggle}
          className="h-10 w-10 shrink-0 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>
    </div>
  );
};

export default TableHeader;
