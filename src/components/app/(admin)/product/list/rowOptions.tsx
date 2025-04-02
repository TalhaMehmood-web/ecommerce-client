import { ProductListTypes } from "@/types/products/list";
import { Edit, EllipsisVertical, Eye, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ProductListRowOptionsProps {
  product: ProductListTypes;
}

const ProductListRowOptions: React.FC<ProductListRowOptionsProps> = ({
  product,
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical size={20} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>List Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/admin/product/edit/${product.id}`}>
            <DropdownMenuItem>
              <Edit /> Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Eye /> Preview
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2Icon /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProductListRowOptions;
