

import { motion } from "framer-motion";
import React from "react";

const NoEvents: React.FC = () => (
  <motion.div 
    className="bg-white rounded-lg border border-gray-200 p-8 text-center relative overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ 
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }}
  >
    <motion.div
      className="absolute inset-0 opacity-5"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-3xl"></div>
    </motion.div>
    
    <motion.div 
      className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 relative z-10"
      whileHover={{ 
        rotate: 360,
        scale: 1.1,
        background: "linear-gradient(135deg, #fee2e2, #dbeafe)"
      }}
      transition={{ duration: 0.6 }}
    >
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-12 w-12 text-gray-400" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </motion.svg>
    </motion.div>
    
    <motion.h3 
      className="text-lg font-medium text-gray-800 mb-2 relative z-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      No Upcoming Events
    </motion.h3>
    
    <motion.p 
      className="text-sm text-gray-600 mb-6 max-w-md mx-auto relative z-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.span
        animate={{ 
          color: ["#6b7280", "#e10000", "#6b7280"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        COMING SOON.
      </motion.span>
    </motion.p>
  </motion.div>
);

export default NoEvents;