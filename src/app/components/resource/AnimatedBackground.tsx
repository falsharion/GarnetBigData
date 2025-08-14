

import { motion } from "framer-motion";
import React from "react";

const AnimatedBackground: React.FC = () => (
  <motion.div 
    className="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <motion.div
      className="absolute w-103 h-52 bg-gradient-to-r from-red-300/30 to-orange-200/30 rounded-full blur-2xl"
      style={{ top: "8%", left: "-10%" }}
      animate={{
        x: [0, 20, 0],
        y: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    <motion.div
      className="absolute w-103 h-52 bg-gradient-to-r from-blue-400/20 to-blue-200/25 rounded-full blur-3xl"
      style={{ top: "8%", right: "-5%" }}
      animate={{
        x: [0, -25, 0],
        y: [0, 20, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      }}
    />
    
    <motion.div
      className="absolute w-103 h-52 bg-gradient-to-r from-orange-400/30 to-red-200/25 rounded-full blur-3xl"
      style={{ top: "50%", right: "60%" }}
      animate={{
        x: [0, -15, 0],
        y: [0, 10, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    <motion.div
      className="absolute w-103 h-52 bg-gradient-to-r from-cyan-400/40 to-blue-200/35 rounded-full blur-3xl"
      style={{ top: "40%", right: "-5%" }}
      animate={{
        x: [0, -20, 0],
        y: [0, 25, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      }}
    />
  </motion.div>
);

export default AnimatedBackground;