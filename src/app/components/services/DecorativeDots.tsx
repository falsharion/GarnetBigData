"use client";
import React from "react";
import { motion } from "framer-motion";

const DecorativeDots = () => {
  return (
    <>
      <div className="invisible md:visible absolute top-110 right-100 md:top-20 md:left-[-3%] w-2 h-2 grid grid-cols-11 gap-3.5 opacity-30">
        {[...Array(66)].map((_, i) => (
          <motion.div 
            key={i}
            className="w-1 h-1 bg-red-900 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.5 + (i * 0.01),
              type: "spring",
              stiffness: 200
            }}
          />
        ))}
      </div>
      <div className="absolute invisible md:visible top-20 right-10 w-16 h-16 grid grid-cols-11 gap-3.5 opacity-30">
        {[...Array(66)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-red-900 rounded-full"></div>
        ))}
      </div>
    </>
  );
};

export default DecorativeDots;
