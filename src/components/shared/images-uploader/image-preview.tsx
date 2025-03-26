import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ImagePreviewProps {
  image: { id: string; url: string };
  removeImage: (id: string) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  removeImage,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative group"
    >
      <img
        src={image.url}
        alt="Uploaded preview"
        className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-md mb-2"
      />
      {/* Remove Button */}
      <button
        className="absolute cursor-pointer top-1 right-1 bg-white bg-opacity-50 text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
        onClick={() => removeImage(image.id)}
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};
