import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ProductData } from "@/types/products/details";

interface ProductTabsProps {
  product: ProductData;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  // Extract the plain text from the product description
  const extractText = (description: any): string => {
    try {
      return description.root.children
        .map((paragraph: any) =>
          paragraph.children
            .filter((child: any) => child.type === "text")
            .map((textNode: any) => textNode.text)
            .join("")
        )
        .join("\n");
    } catch (error) {
      return "No description available";
    }
  };

  const description = extractText(product.basicInfo.productDescription);

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <Tabs defaultValue="description" className="w-full bg-none">
      <TabsList className="grid grid-cols-3 mb-8 bg-none">
        <TabsTrigger className="bg-none" value="description">
          Description
        </TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="focus-visible:outline-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabContentVariants}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert">
                <h3 className="text-xl font-semibold mb-4">
                  Product Description
                </h3>
                <p>{description}</p>

                {product.basicInfo.productTags.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium mb-2">Product Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.basicInfo.productTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      <TabsContent
        value="specifications"
        className="focus-visible:outline-none"
      >
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

      <TabsContent value="shipping" className="focus-visible:outline-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabContentVariants}
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium text-lg mb-2">Shipping Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Shipping Cost
                      </p>
                      <p>${product.shipping.shippingCost}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Estimated Delivery
                      </p>
                      <p>{product.shipping.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-lg mb-2">Return Policy</h4>
                  <p>{product.shipping.returnPolicy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
