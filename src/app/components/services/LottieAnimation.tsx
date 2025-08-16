"use client";
import React, { useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";

interface LottieAnimationProps {
  src: string;
  title: string;
  className?: string;
}

const LottieAnimation = memo(({ src, title, className = "" }: LottieAnimationProps) => {
  const animationRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!src || src.includes("YOUR_")) return;

    let mounted = true;
    let animation: any = null;

    const loadAnimation = async () => {
      try {
        const response = await fetch(src);
        const data = await response.json();
        
        if (mounted && containerRef.current && window.lottie) {
          containerRef.current.innerHTML = '';
          animation = window.lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: data
          });
          animationRef.current = animation;
        }
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
      }
    };

    loadAnimation();

    return () => {
      mounted = false;
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [src]);

  if (!src || src.includes("YOUR_")) {
    return (
      <div className={`bg-white rounded-lg shadow-lg sm:p-6 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-600">Animation placeholder</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`p-6 relative overflow-hidden ${className}`}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center"
      />
    </motion.div>
  );
});

LottieAnimation.displayName = "LottieAnimation";

export default LottieAnimation;