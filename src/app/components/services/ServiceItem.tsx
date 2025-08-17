"use client";
import React, { useState } from "react";
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
  const [isLottieLoading, setIsLottieLoading] = useState(true);
  const [lottieError, setLottieError] = useState(false);

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
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.02, 1],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleLottieLoad = () => {
    setIsLottieLoading(false);
    setLottieError(false);
  };

  const handleLottieError = () => {
    setIsLottieLoading(false);
    setLottieError(true);
  };

  const LottieLoadingSkeleton = () => (
    <motion.div 
      className="w-full h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden"
      variants={pulseVariants}
      animate="pulse"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: [-200, 400],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Loading content */}
      <div className="text-center z-10">
        <motion.div
          className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p 
          className="text-gray-500 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading animation...
        </motion.p>
      </div>
    </motion.div>
  );

  const LottieErrorState = () => (
    <motion.div 
      className="w-full h-[400px] bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex items-center justify-center border border-red-200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <svg 
            className="w-8 h-8 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </motion.div>
        <p className="text-red-700 text-sm font-medium mb-2">
          Failed to load animation
        </p>
        <motion.button
          onClick={() => {
            setIsLottieLoading(true);
            setLottieError(false);
          }}
          className="text-xs text-red-600 hover:text-red-800 underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try again
        </motion.button>
      </div>
    </motion.div>
  );

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
          whileHover={{ scale: 1.05, backgroundColor: "#FEF2F2" }}
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
        {/* Conditional rendering based on loading and error states */}
        {isLottieLoading && !lottieError && <LottieLoadingSkeleton />}
        
        {lottieError && <LottieErrorState />}
        
        {/* Lottie Animation with loading handlers */}
        <div className={isLottieLoading || lottieError ? 'hidden' : 'block'}>
          <LottieAnimation
            src={lottieUrl}
            title={id}
            className="w-full h-[400px]"
            onLoad={handleLottieLoad}
            onError={handleLottieError}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceItem;