"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  text?: string;
  loadingTime?: number;
}

const PageLoader = ({
  isLoading = true,
  text = "Loading",
  loadingTime = 2000,
  className,
  ...props
}: PageLoaderProps) => {
  const [isVisible, setIsVisible] = React.useState(isLoading);

  React.useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 600); // Smooth exit animation

      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, loadingTime);

      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingTime]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background",
          className
        )}
        {...(props as Omit<
          React.HTMLAttributes<HTMLDivElement>,
          "onDrag" | "onAnimationStart" | "onDragStart" | "onDragEnd"
        >)}
      >
        <div className="relative flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <ShimmerCircle />
            <LoadingSpinner />
          </div>
          <LoadingText text={text} />
        </div>
      </motion.div>
    </>
  );
};

const ShimmerCircle = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="absolute inset-0 z-0"
    >
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 blur-md" />
        <motion.div
          animate={{
            background: [
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
              "linear-gradient(90deg, rgba(255,255,255,0) 100%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 0%)",
            ],
            left: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>
    </motion.div>
  );
};

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
      className="relative w-24 h-24"
    >
      <div className="absolute w-24 h-24 rounded-full border-4 border-primary/30" />
      <div className="absolute w-24 h-24 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent" />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-8 h-8 rounded-full bg-primary/80"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const LoadingText = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-center"
    >
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-primary/80 font-medium text-lg"
      >
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.2,
          }}
        >
          ...
        </motion.span>
      </motion.p>
    </motion.div>
  );
};

export default PageLoader;
