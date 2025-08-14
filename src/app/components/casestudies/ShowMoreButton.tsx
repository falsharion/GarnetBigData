// Show More Button Component
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";


interface ShowMoreButtonProps {
  onClick: () => void;
  className?: string;
}

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  onClick,
  className = "",
}) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center text-sm font-medium text-red-700 hover:text-red-900 mt-2 ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.2 }}>
      <ChevronDown className="w-4 h-4 mr-1" />
    </motion.div>
    Show more
  </motion.button>
);