

import { motion } from "framer-motion";
import React from "react";

const AnimatedDots: React.FC = () => (
  <>
    <motion.div 
      className="absolute invisible md:visible top-110 right-100 md:top-28 md:left-[-4%] w-2 h-2 grid grid-cols-11 gap-3.5 opacity-30"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {Array.from({ length: 66 }, (_, i) => (
        <motion.div 
          key={i} 
          className="w-1 h-1 bg-red-900 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </motion.div>
    
    <motion.div 
      className="absolute invisible md:visible md:top-28 right-10 w-16 h-16 grid grid-cols-11 gap-3.5 opacity-30"
      initial={{ opacity: 0, rotate: -180 }}
      animate={{ opacity: 0.3, rotate: 0 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      {Array.from({ length: 66 }, (_, i) => (
        <motion.div 
          key={i} 
          className="w-1 h-1 bg-red-900 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </motion.div>
  </>
);

export default AnimatedDots;