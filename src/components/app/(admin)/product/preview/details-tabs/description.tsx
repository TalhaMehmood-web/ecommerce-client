import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { tabContentVariants } from ".";
import { ProductData } from "@/types/products/details";
import React from "react";

interface ProductTabsProps {
  product: ProductData;
}

const ProductDescription: React.FC<ProductTabsProps> = ({ product }) => {
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
  return (
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
  );
};

export default ProductDescription;
