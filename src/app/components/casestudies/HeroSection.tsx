
import React from "react";
import { motion, Variants } from "framer-motion";

interface HeroSectionProps {
  title: string;
  highlightedText: string;
  subtitle: string;
  showStats?: boolean;
  customContent?: React.ReactNode;
  titleClassName?: string; 
  highlightedTextClassName?: string; 
  subtitleClassName?: string; 
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  highlightedText,
  subtitle,
  showStats = false,
  customContent,
  titleClassName = "", 
  highlightedTextClassName = "", 
  subtitleClassName = ""
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative dots */}
      <div className="bg-gradient-to-b from-white to-[#FFF1EE]">
        {/* Left dot grid */}
        <div className="invisible sm:visible absolute top-32 left-[-3%] w-16 h-16 grid grid-cols-11 gap-3.5 opacity-30">
          {[...Array(66)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-red-900 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.01,
                type: "spring",
                stiffness: 200,
              }}
            />
          ))}
        </div>
        
        {/* Right dot grid */}
        <div className="invisible sm:visible absolute top-32 right-10 w-16 h-16 grid grid-cols-11 gap-3.5 opacity-30">
          {[...Array(66)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-red-900 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.01,
                type: "spring",
                stiffness: 200,
              }}
            />
          ))}
        </div>

        <motion.section
          className="relative text-center pt-10 px-4 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Animated Blur Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Blob 1 - Top Left */}
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

            {/* Blob 2 - Top Right */}
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

            {/* Blob 3 - Bottom Center */}
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

          {/* Hero Content */}
          <motion.div className="py-20 relative z-10" variants={containerVariants}>
            <motion.h1
               className={`text-2xl sm:text-3xl max-w-lg md:max-w-xl lg:max-w-3xl lg:text-5xl m-auto md:text-4xl font-bold text-gray-800 mb-6 ${titleClassName}`}
              variants={itemVariants}
            >
              {title}
              <br />
              <motion.span
                className={`inline text-red-800 ${highlightedTextClassName}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {highlightedText}
              </motion.span>
            </motion.h1>
            <motion.p
              className={`text-sm md:text-md text-gray-400 mb-8 max-w-xl mx-auto ${subtitleClassName}`}
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
            
            {customContent && (
              <motion.div variants={itemVariants}>
                {customContent}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default HeroSection;