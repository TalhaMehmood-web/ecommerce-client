import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { productsDataFake } from "@/lib/data";
import ProductCarousel from "@/components/shared/product-carousel";

interface RelatedProductsProps {
  category: string;
}
const RelatedProducts: React.FC<RelatedProductsProps> = ({ category }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <p className="text-sm text-muted-foreground">
          More {category} products
        </p>
      </div>

      <ProductCarousel
        products={productsDataFake}
        onFavoriteToggle={() => {}}
        favorites={[]}
        className="w-full"
      />
    </motion.div>
  );
};

export default RelatedProducts;
