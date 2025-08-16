"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedBlobsProps {
  variant: "hero" | "services";
}

const AnimatedBlobs = ({ variant }: AnimatedBlobsProps) => {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-103 h-52 bg-gradient-to-r from-red-300/30 to-orange-200/30 rounded-full blur-2xl animate-pulse"
          style={{
            bottom: "20%",
            left: "-10%",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-103 h-52 bg-gradient-to-r from-blue-300/25 to-blue-200/25 rounded-full blur-3xl animate-pulse"
          style={{
            top: "30%",
            right: "-5%",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, -1, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute w-52 h-52 bg-gradient-to-r from-purple-300/20 to-orange-200/20 rounded-full blur-2xl animate-pulse"
          style={{
            bottom: "20%",
            left: "50%",
            x: "-50%",
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-130 h-82 bg-gradient-to-r from-blue-300/40 to-yellow-200/80 rounded-full blur-2xl animate-pulse"
        style={{
          top: "2%",
          right: "-12%",
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-125 h-52 bg-gradient-to-r from-red-300/25 to-red-200/35 rounded-full blur-3xl animate-pulse"
        style={{
          top: "25%",
          left: "-5%",
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, -1, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-95 h-52 bg-gradient-to-r from-red-300/35 to-red-200/35 rounded-full blur-3xl animate-pulse"
        style={{
          top: "65%",
          left: "-5%",
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, -1, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-130 h-82 bg-gradient-to-r from-purple-300/40 to-red-200/80 rounded-full blur-2xl animate-pulse"
        style={{
          top: "43%",
          right: "-12%",
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-130 h-82 bg-gradient-to-r from-purple-300/40 to-red-200/80 rounded-full blur-2xl animate-pulse"
        style={{
          bottom: "2%",
          right: "-12%",
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-52 h-52 bg-gradient-to-r from-purple-300/20 to-orange-200/20 rounded-full blur-2xl animate-pulse"
        style={{
          bottom: "20%",
          left: "50%",
          x: "-50%",
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedBlobs;
