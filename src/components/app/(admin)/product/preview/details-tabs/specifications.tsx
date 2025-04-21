import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { tabContentVariants } from ".";
import { Card, CardContent } from "@/components/ui/card";
import { ProductData } from "@/types/products/details";
import { motion } from "framer-motion";

interface ProductTabsProps {
  product: ProductData;
}
const ProductSpecifications: React.FC<ProductTabsProps> = ({ product }) => {
  return (
    <TabsContent value="specifications" className="focus-visible:outline-none">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={tabContentVariants}
      >
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>

            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-b pb-4">
                <div>
                  <h4 className="font-medium text-muted-foreground">Brand</h4>
                  <p>{product.basicInfo.brand || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">
                    Category
                  </h4>
                  <p>{product.basicInfo.category || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">SKU</h4>
                  <p>{product.basicInfo.sku || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">
                    Featured
                  </h4>
                  <p>{product.otherInfo.isFeatured ? "Yes" : "No"}</p>
                </div>
              </div>

              {/* Dimensions */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Dimensions</h4>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-muted-foreground text-sm">Length</p>
                    <p>{product.shipping.dimensions.length} m</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Width</p>
                    <p>{product.shipping.dimensions.width} m</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Height</p>
                    <p>{product.shipping.dimensions.height} m</p>
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div className="border-b pb-4">
                <h4 className="font-medium text-muted-foreground">Weight</h4>
                <p>{product.shipping.weight} kg</p>
              </div>

              {/* Warranty */}
              {product.otherInfo.warrantyInfo && (
                <div className="border-b pb-4">
                  <h4 className="font-medium text-muted-foreground">
                    Warranty Information
                  </h4>
                  <p>{product.otherInfo.warrantyInfo}</p>
                </div>
              )}

              {/* Supplier Info */}
              {product.otherInfo.supplierInfo && (
                <div>
                  <h4 className="font-medium text-muted-foreground">
                    Supplier Information
                  </h4>
                  <p>{product.otherInfo.supplierInfo}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TabsContent>
  );
};

export default ProductSpecifications;
