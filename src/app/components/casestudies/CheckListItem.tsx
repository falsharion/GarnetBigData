

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

export const CheckListItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.li
    className="flex items-start text-gray-800 space-x-3 text-lg"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ x: 5 }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0, type: "spring", stiffness: 500 }}
    >
      <Check className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
    </motion.div>
    <span>{children}</span>
  </motion.li>
);