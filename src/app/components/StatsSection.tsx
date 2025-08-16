"use client";
import React, { useEffect, useRef, ReactNode } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { TrendingUp, DollarSign, Eye, Clock } from "lucide-react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: delay,
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      percentage: "40%",
      title: "Faster Decision-making",
      description:
        "Organizations make critical decisions with greater speed and confidence",
      delay: 0.2,
    },
    {
      icon: DollarSign,
      percentage: "300%",
      title: "ROI Within First Year",
      description:
        "Return on investment achieved through data transformation initiatives",
      delay: 0.4,
    },
    {
      icon: Eye,
      percentage: "85%",
      title: "New Revenue Streams",
      description:
        "Organizations identify previously hidden revenue opportunities",
      delay: 0.6,
    },
    {
      icon: Clock,
      percentage: "60%",
      title: "Reduction in time spent",
      description:
        "Less time wasted searching for data, more time creating value",
      delay: 0.8,
    },
  ];

 
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const circleVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: [0.1, 0.2, 0.1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

   return (
    <section className="relative min-h-screen flex justify-center items-center bg-red-950 overflow-hidden" ref={containerRef}>
      {/* Diagonal red background stripe */}
      <div className="absolute md:flex md:justify-center md:items-center inset-0">
      
        {/* Mobile clip-path*/}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-r from-red-950 to-red-700 md:hidden"
          style={{
            clipPath: "polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { duration: 1 }
            }
          }}
        >
          {/* Animated circles */}
          <motion.div 
            className="absolute top-10 left-1/4 w-40 h-40 rounded-full bg-white opacity-20 blur-3xl pointer-events-none"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div 
            className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          />
        </motion.div>

        {/* Desktop clip-path */}
        <motion.div
          className="absolute w-full h-[87%]  bg-gradient-to-r from-red-950 to-red-700 hidden md:block"
          style={{
            clipPath: "polygon(0 15%, 100% 0%, 100% 93%, 0% 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { duration: 1 }
            }
          }}
        >
          {/* Animated circles */}
          <motion.div 
            className="absolute top-10 left-1/4 w-60 h-60 rounded-full bg-white opacity-20 blur-3xl pointer-events-none"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div 
            className="absolute bottom-20 right-1/3 w-48 h-48 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          />
        </motion.div>
      </div>

      <div className="relative h-full flex justify-center items-center flex-col container mx-auto px-4 py-12 pb-20 lg:py-20">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14 pt-8 lg:pt-16">
          {/* ... (keep your decorative images the same) */}
          
          <section>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl lg:max-w-4xl mx-auto pt-16 lg:text-5xl lg:pt-4 px-4">
              Organizations That Invest in Data Culture See{" "}
              <span className="underline text-red-400 decoration-red-200">
                Real Results
              </span>
            </h2>
            <p className="mt-4 text-sm lg:mt-6 lg:text-lg text-red-100 max-w-xl lg:max-w-3xl mx-auto px-4">
              Don't just take our word for it. Here's the measurable impact our
              clients experience when they prioritize data transformation.
            </p>
          </section>
        </div>

        {/* Stats Grid - Responsive layout */}
        <motion.div 
          className="relative  mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Mobile: Stacked layout */}
          <div className="grid grid-cols-1 gap-8 md:hidden">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={stat.delay}>
                <motion.div 
                  className="flex flex-col items-center text-center p-4"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className="bg-gradient-to-r bg-opacity-20 p-4 rounded-full mb-4 backdrop-blur-sm"
                    style={{background: 'linear-gradient(to right, #FEECE3, #FEAFAE, #FFA9CC)'}}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring" }}
                  >
                    <stat.icon className="w-6 h-6 text-red-600" />
                  </motion.div>
                  <div className="text-white">
                    <motion.p className="text-3xl font-bold mb-2">
                      {stat.percentage}
                    </motion.p>
                    <motion.p className="text-lg font-semibold mb-2">
                      {stat.title}
                    </motion.p>
                    <motion.p className="text-sm text-red-100 max-w-xs leading-relaxed">
                      {stat.description}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Tablet and Desktop layout */}
          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                className={`${index >= 2 ? 'xl:mt-0 md:mt-0' : ''} ${index === 1 ? 'xl:mt-0 md:mt-0' : ''}`}
              >
                <AnimatedSection delay={stat.delay}>
                  <motion.div 
                    className=" flex flex-col items-center text-center p-4 h-full"
                    whileHover={{ y: -10 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-r bg-opacity-20 p-4 rounded-full mb-4 backdrop-blur-sm"
                      style={{background: 'linear-gradient(to right, #FEECE3, #FEAFAE, #FFA9CC)'}}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                    </motion.div>
                    <div className="text-red-200">
                      <motion.p className="text-3xl md:text-4xl font-bold mb-2">
                        {stat.percentage}
                      </motion.p>
                      <motion.p className="text-lg md:text-xl font-semibold mb-2">
                        {stat.title}
                      </motion.p>
                      <motion.p className="text-sm xl:text-base text-red-100 max-w-xs mx-auto leading-relaxed">
                        {stat.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;