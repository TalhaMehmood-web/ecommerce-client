import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard, { ProductCardProps } from "../product-card";

export interface ProductCarouselProps {
  products: ProductCardProps[];
  onFavoriteToggle?: (id: string) => void;
  favorites?: string[];
  className?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  onFavoriteToggle,
  favorites = [],
  className,
}) => {
  return (
    <Carousel
      className={className}
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
            <ProductCard
              {...product}
              isFavorite={favorites.includes(product.id)}
              onFavoriteToggle={onFavoriteToggle}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex left-0" />
      <CarouselNext className="hidden sm:flex right-0" />
    </Carousel>
  );
};

export default ProductCarousel;
