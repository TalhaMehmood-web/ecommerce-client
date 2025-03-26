import { Upload } from "lucide-react";
import { motion } from "framer-motion";

export const UploadIcon = () => {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      <Upload size={32} className="text-gray-400 cursor-pointer" />
    </motion.div>
  );
};
