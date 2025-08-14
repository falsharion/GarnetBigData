"use client";

import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import GoldmineSection from "./components/GoldmineSection";
import HeroSection from "./components/HeroSection";
import SolutionsSection from "./components/SolutionsSection";

// Lazy load components that are not immediately visible
const StatsSection = lazy(() => import("./components/StatsSection"));
const JourneySection = lazy(() => import("./components/JourneySection"));
const CTASection = lazy(() => import("./components/CTASection"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
  </div>
);

export default function Home() {
  return (
    <motion.div 
      className="min-h-screen bg-white overflow-x-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <GoldmineSection />
      <SolutionsSection />
      
      <Suspense fallback={<LoadingSpinner />}>
        <StatsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <JourneySection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <CTASection />
      </Suspense>
    </motion.div>
  );

}