"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiUsers, FiMap, FiRefreshCw } from "react-icons/fi"; // Icons

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection = ({
  children,
  className = "",
}: AnimatedSectionProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};


interface TimelineStep {
  date: string;
  label: string;
  desc: string;
  status: string;
  icon: React.ElementType;
}

interface HorizontalTimelineProps {
  steps: TimelineStep[];
  currentIndex: number;
  onIndexClick: (index: number) => void;
}
const HorizontalTimeline = ({
  steps,
  currentIndex,
  onIndexClick,
}: HorizontalTimelineProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const progressWidth =
    width > 0
      ? `${(currentIndex / (steps.length - 1)) * (100 - (64 / width) * 100)}%`
      : "0%";

  return (
    <div className="relative w-full h-32 bg-gray-50 rounded-lg p-4 overflow-hidden">
      {/* Timeline line */}
      <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>

      {/* Active progress line */}
      <div
        className="absolute top-1/2 left-8 h-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 transform -translate-y-1/2 transition-all duration-500"
        style={{
          width: progressWidth,
        }}
      ></div>

      {/* Timeline points */}
      <div className="relative flex justify-between items-center h-full px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => onIndexClick(index)}
          >
            {/* Icon */}
            <step.icon className="w-5 h-5 mb-1 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
            <div
              className={`w-4 h-4 rounded-full border-2 relative transition-all duration-300 ${
                index <= currentIndex
                  ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 border-transparent scale-110"
                  : "bg-white border-gray-300 hover:border-orange-400"
              }`}
            >
              {index === currentIndex && (
                <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
            <div
              className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                index === currentIndex ? "text-orange-600" : "text-gray-500"
              }`}
            >
              {step.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const JourneySection = () => {
  const steps: TimelineStep[] = [
    {
      date: "Phase 1",
      label: "Assess",
      desc: "Evaluate data landscape and pinpoint gaps",
      status: "Assessment Phase",
      icon: FiSearch,
    },
    {
      date: "Phase 2",
      label: "Train",
      desc: "Conduct hands-on team workshops",
      status: "Training Phase",
      icon: FiUsers,
    },
    {
      date: "Phase 3",
      label: "Strategize",
      desc: "Create centralized governance + culture roadmap",
      status: "Strategy Phase",
      icon: FiMap,
    },
    {
      date: "Phase 4",
      label: "Transform",
      desc: "Implement changes, track ROI, scale insights",
      status: "Transformation Phase",
      icon: FiRefreshCw,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 25000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setProgress(progress * 100);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        startTime = null;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleIndexClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Dots */}
      <div className="absolute top-10 right-10 opacity-20">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <h2 className="text-3xl pt-10 md:text-5xl font-bold text-gray-800 mb-6">
              Your Data{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text">
                  Transformation Journey
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-full transform scale-x-0 animate-underline-expand"></div>
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our proven 4-step methodology ensures your organization achieves
              sustainable data transformation with measurable business results.
            </p>
          </AnimatedSection>
        </div>

        {/* Timeline */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Data Transformation Timeline
            </h3>

            {/* Horizontal Timeline */}
            <div className="mb-8">
              <HorizontalTimeline
                steps={steps}
                currentIndex={currentIndex}
                onIndexClick={handleIndexClick}
              />
            </div>

            {/* Step Details */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-8 rounded-xl shadow-sm"
            >
              {(() => {
                const CurrentIcon = steps[currentIndex].icon;
                return (
                  <CurrentIcon className="w-6 h-6 mx-auto text-orange-500 mb-4" />
                );
              })()}

              <h4 className="text-2xl font-bold text-gray-800 mb-2">
                {steps[currentIndex].label}
              </h4>
              <p className="text-lg text-orange-600 font-medium mb-4">
                {steps[currentIndex].status}
              </p>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {steps[currentIndex].desc}
              </p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        @keyframes underline-expand {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .animate-underline-expand {
          animation: underline-expand 1s ease-out 0.5s forwards;
        }
      `}</style>
    </section>
  );
};

export default JourneySection;
