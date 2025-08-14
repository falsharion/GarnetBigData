import React from "react";
import { motion } from "framer-motion";


// Category Badge Component (Server-Safe)
interface CategoryBadgeProps {
  category: string;
  color: "red" | "blue";
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  color,
}) => (
  <motion.span
    className={`inline-block text-xs px-2 py-1 rounded ml-2 ${
      color === "red"
        ? "bg-red-100 text-red-800"
        : "bg-blue-100 text-blue-800"
    }`}
    whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2, type: "spring" }}
  >
    {category}
  </motion.span>
);