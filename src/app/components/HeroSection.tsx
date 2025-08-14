"use client";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Type definitions for Lottie
interface LottieAnimation {
  play: () => void;
  pause: () => void;
  stop: () => void;
  destroy: () => void;
  setSpeed: (speed: number) => void;
  setDirection: (direction: number) => void;
  goToAndPlay: (value: number, isFrame?: boolean) => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
}

interface LottieOptions {
  container: HTMLElement;
  renderer: "svg" | "canvas" | "html";
  loop: boolean;
  autoplay: boolean;
  path?: string;
  animationData?: any;
}

declare global {
  interface Window {
    lottie?: {
      loadAnimation: (options: LottieOptions) => LottieAnimation;
    };
  }
}

const HeroSection: React.FC = () => {
  const lottieRef = useRef<HTMLDivElement>(null);
  const fallbackLottieRef = useRef<LottieAnimation | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const animationInstanceRef = useRef<LottieAnimation | null>(null);

  const handleMouseEnter = (): void => {
    setIsHovered(true);
    if (animationInstanceRef.current) {
      animationInstanceRef.current.setSpeed(2);
    } else if (fallbackLottieRef.current) {
      fallbackLottieRef.current.setSpeed(2);
    }
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
    if (animationInstanceRef.current) {
      animationInstanceRef.current.setSpeed(1);
    } else if (fallbackLottieRef.current) {
      fallbackLottieRef.current.setSpeed(1);
    }
  };

  useEffect(() => {
    const loadLottie = async (): Promise<void> => {
      if (typeof window !== "undefined" && !window.lottie) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
        script.onload = () => initializeLottie();
        document.head.appendChild(script);
      } else if (window.lottie) {
        initializeLottie();
      }
    };

    const initializeLottie = (): void => {
      if (lottieRef.current && window.lottie) {
        try {
          animationInstanceRef.current = window.lottie.loadAnimation({
            container: lottieRef.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            path: "/animations/hero-animation.json",
          });

          setTimeout(() => {
            if (animationInstanceRef.current) {
              try {
                animationInstanceRef.current.play();
              } catch (error) {
                console.warn(
                  "Failed to play main Lottie animation, loading fallback..."
                );
                loadFallbackLottie();
              }
            } else {
              console.warn(
                "Main Lottie animation failed to load, loading fallback..."
              );
              loadFallbackLottie();
            }
          }, 1000);
        } catch (error) {
          console.warn(
            "Failed to load main Lottie animation, loading fallback..."
          );
          loadFallbackLottie();
        }
      }
    };

    const loadFallbackLottie = (): void => {
      const fallbackContainer = document.getElementById("fallback-lottie");
      if (fallbackContainer && window.lottie) {
        try {
          fallbackLottieRef.current = window.lottie.loadAnimation({
            container: fallbackContainer,
            renderer: "svg",
            loop: true,
            autoplay: false,
            path: "https://lottie.host/c090f4ba-9b41-42c9-85fd-ee3dafeae5d6/zGv2Y2UFG8.json",
          });

          fallbackContainer.style.display = "block";
          if (lottieRef.current) {
            lottieRef.current.style.display = "none";
          }

          setTimeout(() => {
            if (fallbackLottieRef.current) {
              fallbackLottieRef.current.play();
            }
          }, 100);
        } catch (error) {
          console.error("Failed to load fallback Lottie animation:", error);
        }
      }
    };

    loadLottie();

    return () => {
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
      }
      if (fallbackLottieRef.current) {
        fallbackLottieRef.current.destroy();
      }
    };
  }, []);

  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-white to-[#FFF1EE] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Content Section */}
          <AnimatedSection className="flex-1 text-start md:text-left max-w-xl lg:max-w-none">
            <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-800">
              Building tomorrow's <br />
              <span className="text-red-800">Data-Driven</span> organization
              today
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-md md:mx-0">
              Empowering enterprises to unlock the full potential of their data
              through actionable strategies.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md md:mx-0">
              <a
                href="/contact"
                className="bg-red-800 hover:bg-[#e75a49] text-white font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-md transition-colors flex-1 sm:flex-none whitespace-nowrap text-center inline-block"
              >
                Unlock Your Data's Potential
              </a>
              <a
                href="/contact"
                className="text-red-800 border-2 border-red-800/60 hover:bg-[#fff0ec] font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-md transition-colors flex-1 sm:flex-none whitespace-nowrap text-center inline-block"
              >
                Free Strategy Call
              </a>
            </div>
          </AnimatedSection>

          {/* Lottie Animation Section */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-lg xl:max-w-xl cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: 5,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              ref={lottieRef}
              className="w-full h-64 sm:h-80 lg:h-96 xl:h-[28rem] transition-all duration-300 ease-in-out"
              style={{
                filter: isHovered
                  ? "brightness(1.1) saturate(1.2)"
                  : "brightness(1) saturate(1)",
                transform: isHovered
                  ? "perspective(1000px) rotateY(2deg) rotateX(2deg)"
                  : "perspective(1000px) rotateY(0deg) rotateX(0deg)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />

            {/* Fallback Lottie animation from CDN */}
            <motion.div
              className="w-full h-64 sm:h-80 lg:h-96 xl:h-[28rem] transition-all duration-300 ease-in-out"
              style={{
                display: "none",
                filter: isHovered
                  ? "brightness(1.1) saturate(1.2)"
                  : "brightness(1) saturate(1)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              id="fallback-lottie"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
