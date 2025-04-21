import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ProductData } from "@/types/products/details";
import ProductDescription from "./description";
import ProductSpecifications from "./specifications";
import ProductShipping from "./shipping";
import ProductReviewsAndRatings from "./reviews-and-ratings";

interface ProductTabsProps {
  product: ProductData;
}
export const tabContentVariants = {
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
const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  // Animation variants

  return (
    <Tabs defaultValue="description" className="w-full bg-none">
      <TabsList className="grid grid-cols-4 mb-8 bg-none">
        <TabsTrigger className="bg-none" value="description">
          Description
        </TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        <TabsTrigger value="reviews">Reviews & Ratings</TabsTrigger>
      </TabsList>
      <ProductDescription product={product} />
      <ProductSpecifications product={product} />
      <ProductShipping product={product} />
      <ProductReviewsAndRatings />
    </Tabs>
  );
};

export default ProductTabs;
