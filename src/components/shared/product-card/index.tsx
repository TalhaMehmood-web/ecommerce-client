import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount?: number;
  colorOptions?: number;
  onFavoriteToggle?: (id: string) => void;
  isFavorite?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  rating,
  reviewCount = 0,
  colorOptions,
  onFavoriteToggle,
  isFavorite = false,
  className,
}) => {
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={cn(
            "fill-current",
            index < rating ? "text-amber-500" : "text-gray-300"
          )}
        />
      ));
  };

  return (
    <Card className={cn("w-[300px] h-[400px] overflow-hidden pt-0", className)}>
      <div className="relative">
        <div className="w-full h-64 relative bg-gray-100 flex items-center justify-center">
          <Image
            width={200}
            height={200}
            src={image}
            alt={name}
            className="object-cover w-full h-full"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white hover:bg-white"
            onClick={() => onFavoriteToggle?.(id)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? "#1d4ed8" : "none"}
              stroke={isFavorite ? "#1d4ed8" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </Button>
        </div>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-left line-clamp-2 h-10">
          {name}
        </h3>
        <div className="flex items-center">
          <div className="flex mr-2">{renderStars()}</div>
          {reviewCount > 0 && (
            <span className="text-sm text-gray-500">
              ({reviewCount} {reviewCount === 1 ? "review" : "people rated"})
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start">
        <div className="text-xl font-bold">${price.toFixed(2)}</div>
        {colorOptions && colorOptions > 0 && (
          <div className="text-sm text-gray-500">{colorOptions} colors</div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
