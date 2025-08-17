"use client";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import React from "react";
import Button from "./Button";
import { FormattedArticle } from "../../lib/mediumFetch";

const ArticleCard: React.FC<{ article: FormattedArticle; idx: number }> = ({ article, idx }) => {
  // Pre-calculate animation delays to avoid runtime calculations
  const delays = {
    title: 0.1 + idx * 0.1,
    desc: 0.15 + idx * 0.1,
    meta: 0.2 + idx * 0.1,
    button: 0.25 + idx * 0.1
  };

  return (
    <motion.div
      className="bg-white shadow-lg border rounded-lg overflow-hidden w-full group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: idx * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -4, // Reduced from -8 for subtler effect
        scale: 1.01, // Reduced from 1.02
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)", // Lighter shadow
        transition: { 
          duration: 0.2, // Faster transition
          ease: "easeOut" 
        }
      }}
    >
      <a 
        href={article.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="lg:flex h-full"
        aria-label={`Read article: ${article.title}`}
      >
        {/* Image Container - Simplified animation */}
        <div className="lg:w-1/2 h-48 lg:h-auto overflow-hidden">
          <motion.img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = process.env.NEXT_PUBLIC_DEFAULT_ARTICLE_IMAGE || '/default-article-image.jpg';
            }}
          />
        </div>

        {/* Content Container */}
        <div className="p-6 lg:w-1/2 flex flex-col justify-between">
          <div>
            {/* Title - Simplified animation */}
            <motion.h3 
              className="text-xl md:text-xl font-semibold text-red-900 mb-2 group-hover:text-red-700 transition-colors duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delays.title }}
            >
              {article.title}
            </motion.h3>

            {/* Description - Simplified animation */}
            <motion.p 
              className="text-sm text-gray-600 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delays.desc }}
            >
              {article.desc}
            </motion.p>

            {/* Meta Info - Simplified animation */}
            <motion.div 
              className="text-xs text-gray-500 flex justify-between mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delays.meta }}
            >
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {article.date}
              </span>
              <span className="text-red-950 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {article.reads}
              </span>
            </motion.div>
          </div>

          {/* Button - Simplified animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delays.button }}
          >
            <Button
              variant="outline"
              size="sm"
              className="text-red-950 border-red-950 w-full hover:bg-red-900 hover:text-red-100 group-hover:border-red-700 transition-colors duration-200"
            >
              <span className="flex items-center">
                Read Article 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
};

export default ArticleCard;