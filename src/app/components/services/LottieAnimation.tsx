"use client";
import React, { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  src: string;
  title: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  src,
  title,
  className = "",
  loop = true,
  autoplay = true,
  onLoad,
  onError
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadAnimation = async () => {
      try {
        // Clear any existing animation
        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }

        // Load the animation
        animationRef.current = lottie.loadAnimation({
          container: containerRef.current!,
          renderer: 'svg',
          loop,
          autoplay,
          path: src,
        });

        // Set up event listeners
        animationRef.current.addEventListener('DOMLoaded', () => {
          setIsLoaded(true);
          onLoad?.();
        });

        animationRef.current.addEventListener('data_ready', () => {
          setIsLoaded(true);
          onLoad?.();
        });

        animationRef.current.addEventListener('data_failed', () => {
          onError?.();
        });

        // Fallback timeout in case events don't fire
        const timeoutId = setTimeout(() => {
          if (!isLoaded) {
            onError?.();
          }
        }, 10000); // 10 second timeout

        return () => {
          clearTimeout(timeoutId);
        };

      } catch (error) {
        console.error('Error loading Lottie animation:', error);
        onError?.();
      }
    };

    loadAnimation();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [src, loop, autoplay, onLoad, onError, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label={title}
      role="img"
    />
  );
};

export default LottieAnimation;