import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { tabContentVariants } from ".";
import { Card, CardContent } from "@/components/ui/card";
import { ProductData } from "@/types/products/details";
import { motion } from "framer-motion";

interface ProductTabsProps {
  product: ProductData;
}

const ProductShipping: React.FC<ProductTabsProps> = ({ product }) => {
  return (
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
  );
};

export default ProductShipping;
