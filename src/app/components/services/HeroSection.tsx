"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import DecorativeDots from "./DecorativeDots";
import AnimatedBlobs from "./AnimatedBlobs";
import StatsSection from "./StatsSection";

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
      },
    },
  };

  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-b from-white to-[#FFF1EE]">
        <DecorativeDots />
        
        <motion.section 
          className="relative text-center pt-10 px-4 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <AnimatedBlobs variant="hero" />

          <motion.div className="relative z-10" variants={containerVariants}>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              variants={itemVariants}
            >
              Comprehensive Data Services for
              <br />
              <motion.span 
                className="text-red-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Modern Organizations
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-sm md:text-md text-gray-400 mb-8 max-w-xl mx-auto"
              variants={itemVariants}
            >
              From governance to AI integration, we provide end-to-end
              solutions that transform your data into competitive advantage
              and revenue growth.
            </motion.p>
          </motion.div>

          <StatsSection />
        </motion.section>
      </div>
    </div>
  );
};

export default HeroSection;