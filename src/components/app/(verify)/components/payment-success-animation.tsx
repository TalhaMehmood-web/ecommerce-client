import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface SuccessAnimationProps {
  size?: number;
  color?: string;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  size = 80,
  color = "#10B981", // success green
}) => {
  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const checkVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative flex items-center justify-center"
    >
      <motion.div
        className="absolute"
        variants={circleVariants}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <div
          className="rounded-full bg-success-light"
          style={{
            width: size * 1.2,
            height: size * 1.2,
          }}
        />
      </motion.div>

      <motion.div variants={circleVariants}>
        <CheckCircle size={size} color={color} strokeWidth={2} />
      </motion.div>
    </motion.div>
  );
};

export default SuccessAnimation;
