"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { ImagePreview } from "./image-preview";
import { UploadIcon } from "./upload-icon";

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);

  // Handle file upload
  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      id: URL.createObjectURL(file),
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // Remove an image
  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
    URL.revokeObjectURL(id);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: true,
  });

  return (
    <div className="flex flex-col items-center bg-gray-50 rounded-2xl  w-full ">
      {/* Image Previews */}
      <motion.div layout className=" flex  w-full items-center flex-wrap gap-4">
        {images.map((image) => (
          <ImagePreview
            key={image.id}
            image={image}
            removeImage={removeImage}
          />
        ))}
      </motion.div>
      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 w-full h-40 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-all"
      >
        <input {...getInputProps()} />
        <UploadIcon />
        <p className="text-gray-500 text-sm mt-2">
          Drag & drop or click to upload
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
