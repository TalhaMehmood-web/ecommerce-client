import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ApiLoaderProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

const ApiLoader: React.FC<ApiLoaderProps> = ({
  isLoading,
  message = "Loading...",
  className,
}) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 z-[1000] flex flex-col items-center justify-center",
        "bg-black/40 backdrop-blur-sm",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 text-center"
      >
        <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
        <p className="text-white font-medium">{message}</p>
      </motion.div>
    </motion.div>
  );
};

export default ApiLoader;
