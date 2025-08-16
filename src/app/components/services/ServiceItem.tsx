"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import LottieAnimation from "./LottieAnimation";

interface ServiceItemProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badgeText: string;
  badgeColor: string;
  lottieUrl: string;
  onLearnMore: () => void;
  isReversed?: boolean;
}

const ServiceItem = ({ 
  id, 
  title, 
  subtitle, 
  description, 
  badgeText, 
  badgeColor, 
  lottieUrl, 
  onLearnMore, 
  isReversed = false 
}: ServiceItemProps) => {
  const serviceVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const scaleUpVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      id={id}
      className="grid md:grid-cols-2 gap-6 md:gap-12 items-center md:mb-4 scroll-mt-24 transition-all duration-500 rounded-lg"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3, margin: "100px" }}
      variants={serviceVariants}
    >
      <motion.div 
        className={`relative z-10 ${isReversed ? 'md:order-2' : ''}`}
        variants={fadeInVariants}
      >
        <motion.div 
          className={`${badgeColor} text-sm font-medium px-3 py-1 rounded-full inline-block mb-4`}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {badgeText}
        </motion.div>
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {title}
          <br />
          {subtitle}
        </motion.h2>
        <motion.p 
          className="text-gray-600 md:text-lg lg:max-w-md mb-6"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
        <motion.button
          onClick={onLearnMore}
          className="border border-red-800 text-sm md:text-base text-red-800 px-3 py-1 rounded-lg hover:bg-red-50 transition flex items-center"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#FEF2F2"
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          Learn More →
        </motion.button>
      </motion.div>
      <motion.div
        className={`relative ${isReversed ? 'md:order-1' : ''}`}
        variants={scaleUpVariants}
      >
        <LottieAnimation 
          src={lottieUrl} 
          title={id} 
          className="w-full h-[400px]"
        />
      </motion.div>
    </motion.div>
  );
};

export default ServiceItem;