import React from "react";
import { motion } from "framer-motion";

interface DotGridProps {
  className: string;
  delay?: number;
}

export const DotGrid: React.FC<DotGridProps> = ({ className, delay = 0 }) => (
  <motion.div
    className={className}
    initial="initial"
    animate="animate"
  >
    {[...Array(66)].map((_, i: number) => (
      <motion.div
        key={i}
        className="w-1 h-1 bg-red-900 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: i * 0.005, duration: 0.3 }}
      />
    ))}
  </motion.div>
);