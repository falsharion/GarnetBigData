'use client';

import { MotionDiv, MotionSection, MotionH1, MotionP } from './MotionComponents';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <MotionDiv
        className="absolute w-103 h-52 will-change-transform bg-gradient-to-r from-red-300/30 to-orange-200/30 rounded-full blur-2xl"
        style={{ 
          top: "8%", 
          left: "-10%",
          transform: 'translateZ(0)' // Hardware acceleration
        }}
        animate={{ x: [0, 20, 0], y: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <MotionDiv
        className="absolute w-103 h-52 will-change-transform bg-gradient-to-r from-blue-400/20 to-blue-200/25 rounded-full blur-3xl"
        style={{ 
          top: "8%", 
          right: "-5%",
          transform: 'translateZ(0)' // Hardware acceleration
        }}
        animate={{ x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
      />

      <MotionSection
        className="relative text-center pt-16 pb-20 px-4 z-10"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <MotionH1
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          variants={heroTextVariants}
        >
          Get <span className="text-[#e10000]">Informed.</span>
        </MotionH1>
        <MotionP
          className="text-xs md:text-base text-gray-600/80 mb-8 max-w-xl mx-auto"
          variants={heroTextVariants}
        >
          Explore our insights, resources, and strategies to help your organization make smarter, data-driven decisions.
        </MotionP>
      </MotionSection>
    </div>
  );
}