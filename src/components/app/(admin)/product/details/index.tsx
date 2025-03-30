import React from "react";
import { motion } from "framer-motion";

import { ProductData } from "@/types/products/details";
import ProductGallery from "./gallery";
import ProductInfo from "./info";
import ProductTabs from "./details-tabs";
import RelatedProducts from "./related-products";

const ProductDetails: React.FC<{ product: ProductData }> = ({ product }) => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <motion.div variants={sectionVariants} className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {product.basicInfo.productName}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{product.basicInfo.category}</span>
          <span>·</span>
          <span>SKU: {product.basicInfo.sku}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={sectionVariants}>
          <ProductGallery images={product.images} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <ProductInfo product={product} />
        </motion.div>
      </div>

      <motion.div variants={sectionVariants} className="mt-12">
        <ProductTabs product={product} />
      </motion.div>

      <motion.div variants={sectionVariants} className="mt-16">
        <RelatedProducts category={product.basicInfo.category} />
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
