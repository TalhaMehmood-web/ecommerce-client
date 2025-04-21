"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export type UploadedImage = {
  id: string;
  file: File;
  preview: string;
};

interface ImageUploadProps {
  images: UploadedImage[];
  setImages: (images: UploadedImage[]) => void;
  maxFiles?: number;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  setImages,
  maxFiles = 5,
  className,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} images`);
        return;
      }

      const newImages = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages([...images, ...newImages]);
    },
    [images, maxFiles, setImages]
  );

  const removeImage = (id: string) => {
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: maxFiles - images.length,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <motion.div
        {...(getRootProps() as HTMLMotionProps<"div">)}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary"
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImageIcon className="h-10 w-10 text-gray-400" />
          </motion.div>
          <p className="text-sm text-gray-500">
            {isDragActive ? (
              <span className="text-primary font-medium">
                Drop the files here
              </span>
            ) : (
              <span>
                Drag & drop images here, or{" "}
                <span className="text-primary font-medium">
                  click to select
                </span>
              </span>
            )}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {images.length} of {maxFiles} images uploaded
          </p>
        </div>
      </motion.div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                className="relative rounded-md overflow-hidden aspect-square"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                layout
              >
                <img
                  src={image.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <motion.button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white"
                  onClick={() => removeImage(image.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
