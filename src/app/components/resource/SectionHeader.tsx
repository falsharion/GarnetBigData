import { motion } from "framer-motion";
import React from "react";
import ScrollAnimationTrigger from "./ScrollAnimationTrigger";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  highlight?: string;
  vectorPosition?: "left" | "right";
  sectionId?: string;
  enableYoutubeLink?: boolean; // New prop
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  highlight,
  vectorPosition = "right",
  sectionId,
  enableYoutubeLink = false // Default to false
}) => {
  // Function to handle the YouTube link click
  const handleYoutubeClick = () => {
    window.open('https://youtube.com/@garnetbigdata?feature=shared', '_blank');
  };

  // Process the subtitle
  const renderSubtitle = () => {
    if (!enableYoutubeLink) {
      return subtitle;
    }

    const youtubeLinkText = "catch up on past events";
    const parts = subtitle.split(youtubeLinkText);

    if (parts.length === 1) {
      return subtitle;
    }

    return (
      <>
        {parts[0]}
        <motion.span
          className="text-red-800 cursor-pointer hover:underline inline-flex items-center"
          onClick={handleYoutubeClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {youtubeLinkText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </motion.span>
        {parts[1]}
      </>
    );
  };

  return (
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
          {renderSubtitle()}
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
};

export default SectionHeader;