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

interface RelatedProductsProps {
  category: string;
}

// Mock data for related products
const mockRelatedProducts = [
  {
    id: 1,
    name: "Related Product 1",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Related Product 2",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Related Product 3",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Related Product 4",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
  },
];

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

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {mockRelatedProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <motion.div variants={itemVariants}>
                <Card className="overflow-hidden h-full">
                  <AspectRatio ratio={1 / 1}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </AspectRatio>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <p className="text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm font-medium"
                    >
                      View Details
                    </motion.button>
                  </CardFooter>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </div>
      </Carousel>
    </motion.div>
  );
};

export default RelatedProducts;
