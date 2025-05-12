import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RowData {
  original: {
    productImage: string;
    productId: string;
    productName: string;
    color: string;
    variant: string;
    material: string;
  };
}

const ProductCell = ({ row }: { row: RowData }) => {
  return (
    <div className="flex items-start gap-4">
      <Image
        src={row.original.productImage}
        alt="Product Image"
        width={70}
        height={70}
        className="border p-2 h-full rounded-md object-cover"
      />
      <div className="space-y-1">
        {/* Product Name */}
        <Link
          href={`/admin/product/preview/${row.original.productId}`}
          className="block truncate w-32 hover:text-blue-400 hover:underline cursor-pointer font-semibold transition-all duration-300 ease-in-out"
        >
          {row.original.productName}
        </Link>

        {/* Color */}
        <div className="flex items-center text-xs font-semibold">
          <span className="text-gray-400 w-16">Color</span>
          <span className="flex items-center gap-1 text-black">
            <Dot />
            {row.original.color}
          </span>
        </div>

        {/* Size */}
        <div className="flex items-center text-xs font-semibold">
          <span className="text-gray-400 w-16">Size</span>
          <span className="flex items-center gap-1 text-black">
            <Dot />
            {row.original.variant}
          </span>
        </div>

        {/* Material */}
        <div className="flex items-center text-xs font-semibold">
          <span className="text-gray-400 w-16">Material</span>
          <span className="flex items-center gap-1 text-black">
            <Dot />
            {row.original.material}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCell;
