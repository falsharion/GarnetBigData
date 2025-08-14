

import { motion } from "framer-motion";
import React from "react";
import ScrollAnimationTrigger from "./ScrollAnimationTrigger";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  highlight?: string;
  vectorPosition?: "left" | "right";
  sectionId?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  highlight,
  vectorPosition = "right",
  sectionId
}) => (
  <>
    <ScrollAnimationTrigger id={sectionId}>
      <h2 className="md:text-3xl font-semibold text-center mb-2">
        <span className=" text-2xl  pb-1">
          {title}
          {highlight && (
            <span className="text-[#e10000]"> {highlight}</span>
          )}
        </span>
        <motion.span
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img 
            src="/line.png" 
            className="pl-14 m-auto w-[80%] md:w-[40%]" 
            alt="" 
            loading="lazy"
          />
        </motion.span>
      </h2>
    </ScrollAnimationTrigger>
    
    <ScrollAnimationTrigger id={sectionId}>
      <p className="text-base md:text-lg text-center pt-3 text-gray-500 max-w-2xl m-auto mb-10">
        {subtitle}
        <motion.span 
          className={`flex ${vectorPosition === 'right' ? 'justify-end' : 'justify-start'} items-center`}
          initial={{ opacity: 0, rotate: vectorPosition === 'right' ? 90 : -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <img 
            src="/Vector.png" 
            alt="vector" 
            className="mb-2 hidden md:block" 
            loading="lazy"
          />
        </motion.span>
      </p>
    </ScrollAnimationTrigger>
  </>
);

export default SectionHeader;