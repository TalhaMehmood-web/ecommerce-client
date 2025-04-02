import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductGalleryProps {
  images: {
    productImages: string[];
    productVideos: string[];
    altTexts: string[];
  };
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allMedia = [...images.productImages, ...images.productVideos];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextImage();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevImage();
  };

  // Thumbnail component for the gallery
  const Thumbnail = ({
    src,
    index,
    alt,
    isActive,
  }: {
    src: string;
    index: number;
    alt: string;
    isActive: boolean;
  }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setCurrentIndex(index)}
      className={`cursor-pointer rounded-md overflow-hidden border-2 ${
        isActive ? "border-primary" : "border-transparent"
      }`}
    >
      <AspectRatio ratio={1 / 1} className="h-16 w-16">
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      </AspectRatio>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      {/* Main image display */}
      <div className="relative rounded-lg overflow-hidden bg-accent/10 border">
        <AspectRatio ratio={1 / 1} className="w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={allMedia[currentIndex]}
              alt={
                images.altTexts[currentIndex] ||
                `Product image ${currentIndex + 1}`
              }
              className="object-contain w-full h-full"
            />
          </AnimatePresence>
        </AspectRatio>

        {/* Navigation arrows */}
        {allMedia.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {allMedia.map((src, index) => (
            <Thumbnail
              key={index}
              src={src}
              index={index}
              alt={images.altTexts[index] || `Thumbnail ${index + 1}`}
              isActive={currentIndex === index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
