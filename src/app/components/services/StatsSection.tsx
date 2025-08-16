"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const statsData = [
  {
    number: "50%",
    label: "Improvement",
    sublabel: "Reporting speed",
  },
  {
    number: "3x",
    label: "Faster",
    sublabel: "Decision turnaround",
  },
  {
    number: "90%",
    label: "Accuracy",
    sublabel: "Data post-governance",
  },
  {
    number: "3x",
    label: "Faster",
    sublabel: "Data Processing Speed",
  },
];

const StatsSection = () => {
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

  const statVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section 
      className="relative z-10 py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              variants={statVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              transition={{
                delay: index * 0.15,
                duration: 0.7,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl font-bold text-red-800 mb-2">
                {stat.number}
              </div>
              <div className="md:bg-white rounded-sm py-2 px-2">
                <div className="text-lg leading-3 font-semibold text-gray-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs leading-4 text-gray-600">
                  {stat.sublabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;