import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlusCircle, ListChecks, ArrowRight } from "lucide-react";
import { ProductFormValues } from "@/lib/schema/add-product";
import { Badge } from "@/components/ui/badge";

interface SuccessScreenProps {
  productData: ProductFormValues;
  onAddAnother: () => void;
  onViewProducts: () => void;
}

export function SuccessScreen({
  productData,
  onAddAnother,
  onViewProducts,
}: SuccessScreenProps) {
  return (
    <div className="w-full  mx-auto text-center py-12 animate-fade-in">
      <div className="mb-6 animate-float">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Product Added Successfully!
      </h1>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Your product{" "}
        <span className="font-medium text-gray-800">
          "{productData.basicInfo.productName}"
        </span>{" "}
        has been created and is now live on your store.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto mb-8 text-left">
        <h3 className="font-medium text-gray-800 mb-2">Product Details</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-gray-500">SKU:</div>
          <div>{productData.basicInfo.sku}</div>
          <div className="text-gray-500">Price:</div>
          <div>
            {productData.pricing.currency}{" "}
            {productData.pricing.discountedPrice ||
              productData.pricing.basePrice}
          </div>
          <div className="text-gray-500">Category:</div>
          <div>{productData.basicInfo.category}</div>
          <div className="text-gray-500">Status:</div>
          <div>
            <Badge
              className={`
              ${
                productData.inventory.stockStatus === "In Stock"
                  ? "bg-green-500"
                  : ""
              }
              ${
                productData.inventory.stockStatus === "Low Stock"
                  ? "bg-amber-500"
                  : ""
              }
              ${
                productData.inventory.stockStatus === "Out of Stock"
                  ? "bg-red-500"
                  : ""
              }
            `}
            >
              {productData.inventory.stockStatus}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onAddAnother}
          variant="outline"
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Another Product
        </Button>
        <Button onClick={onViewProducts} className="flex items-center gap-2">
          <ListChecks className="h-4 w-4" />
          View All Products
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
