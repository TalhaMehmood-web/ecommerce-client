import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Category } from "@/types/category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PaginatedCategoriesRowOptionsProps {
  category: Category;
}

const PaginatedCategoriesRowOptions: React.FC<
  PaginatedCategoriesRowOptionsProps
> = ({ category }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical size={20} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>List Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/admin/product/edit/${category._id}`}>
          <DropdownMenuItem>
            <Edit /> Edit
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaginatedCategoriesRowOptions;
