"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

interface HeroSectionProps {
  title: string;
  highlight: string;
  subtitle: string;
}

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const heroTextVariants = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } };

export default function HeroSection({ title, highlight, subtitle }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="relative overflow-hidden">
      {/* Background Blobs */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute w-103 h-52 bg-gradient-to-r from-red-300/30 to-orange-200/30 rounded-full blur-2xl"
          style={{ top: "8%", left: "-10%" }}
          animate={{ x: [0, 20, 0], y: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.section
        className="relative text-center pt-10 px-4"
        style={{ y: heroY }}
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <div className="relative z-10">
          <motion.h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" variants={heroTextVariants}>
            {title}{" "}
            <span className="text-[#e10000]">{highlight}</span>
          </motion.h1>
          <motion.p className="text-xs md:text-base text-gray-600/80 mb-8 max-w-xl mx-auto" variants={heroTextVariants}>
            {subtitle}
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
