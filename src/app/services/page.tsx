"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import { ChevronDown, Menu, X, ChevronUp } from "lucide-react";
import TechnologyOrbit from "../components/TechnolgyOrbit";
import { motion, useScroll, Variants, useTransform, AnimatePresence } from "framer-motion";

interface LottieAnimationProps {
  src: string;
  title: string;
  className?: string;
}

type ServiceKey = keyof typeof serviceDetails;

const serviceDetails = {
  dataGovernance: {
    title: "DATA GOVERNANCE & QUALITY MANAGEMENT",
    description:
      "We guide businesses in setting up data standards, policies, and quality assurance frameworks. This includes defining roles, data ownership models, validation systems, and compliance-ready structures to ensure clean, accurate, and reliable data at all times.",
    lottieUrl: "https://lottie.host/09523819-6a08-40ad-ba98-0bbb5b9f162a/AareyNmiXj.json"
  },
  trainingCulture: {
    title: "TRAINING & CULTURE BUILDING",
    description:
      "We provide customized training programs, webinars, and internal bootcamps to shift your organization's culture toward data literacy and accountability. Our content covers everything from basic data awareness to dashboard literacy and KPI ownership, ensuring adoption at all levels.",
    lottieUrl: "https://lottie.host/2fe783a6-037b-4f0a-8e8e-6b07dfa774d4/IIXCETgw3k.json"
  },
  dataInfrastructure: {
    title: "DATA INFRASTRUCTURE & CENTRALIZATION",
    description:
      "We build and optimize scalable, secure data infrastructure -  whether on cloud (Azure, AWS) or on-premise -  with clearly defined data pipelines, centralized storage, and optimized access controls. Our focus is on enabling seamless integration across departments and use cases.",
    lottieUrl: "https://lottie.host/f0714268-031a-4b19-99c8-2fe46c25ee01/6kkg9x4LET.json"
  },
  dataConsulting: {
    title: "DATA CONSULTING & PROCESS OPTIMIZATION",
    description:
      " We dive deep into your workflows, data collection methods, and reporting processes to identify inefficiencies. We then deliver actionable recommendations, design improved pipelines, and support implementation - helping you move from siloed data chaos to cohesive, strategic insight.",
    lottieUrl: "https://lottie.host/6ebb82a4-147f-466e-b7c5-f0bed7e74d7d/ihAhCGurqn.json"
  },
  analyticsAutomation: {
    title: "ADVANCED ANALYTICS & AUTOMATION",
    description:
      "We support the adoption of advanced analytics tools like custom Power BI dashboards, predictive modeling, machine learning integration, and LLM-based automation. From forecasting to natural language summarization, we help you turn raw data into forward-looking decisions.",
    lottieUrl: "https://lottie.host/77feca33-e79f-4ae0-9507-905857237987/NlYIr6WMFl.json"
  },
} as const;

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

const Services = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceKey | null>(null);
  const [firstServiceLoaded, setFirstServiceLoaded] = useState(false);
 const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = (serviceKey: ServiceKey) => {
    setSelectedService(serviceKey);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
      },
    },
  };

  const statVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const serviceVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const scaleUpVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    if (!window.lottie) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Preload first service animation
    const preloadFirstAnimation = async () => {
      try {
        await fetch(serviceDetails.dataGovernance.lottieUrl);
      } catch (err) {
        console.error('Preload failed:', err);
      }
    };
    preloadFirstAnimation();
  }, []);

useEffect(() => {
  const handleHashScroll = () => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          void element.offsetHeight;
          
          element.classList.add("highlight-section");
          setTimeout(() => {
            element.classList.remove("highlight-section");
          }, 2000);
        }, 100);
      }
    }
  };

  const timer = setTimeout(handleHashScroll, 150);
  window.addEventListener("hashchange", handleHashScroll);

  return () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    clearTimeout(timer);
    window.removeEventListener("hashchange", handleHashScroll);
  };
}, []);

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative dots */}
        <div className="bg-gradient-to-b from-white to-[#FFF1EE]">
          <div className="invisible md:visible absolute top-110 right-100 md:top-20 md:left-[-3%] w-2 h-2 grid grid-cols-11 gap-3.5 opacity-30">
            {[...Array(66)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-1 h-1 bg-red-900 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.5 + (i * 0.01),
                  type: "spring",
                  stiffness: 200
                }}
              />
            ))}
          </div>
          <div className="absolute invisible md:visible top-20 right-10 w-16 h-16 grid grid-cols-11 gap-3.5 opacity-30">
            {[...Array(66)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-red-900 rounded-full"></div>
            ))}
          </div>

        <motion.section 
          className="relative text-center pt-10 px-4 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Animated Blur Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Blob 1 - Top Left */}
            <motion.div
              className="absolute w-103 h-52 bg-gradient-to-r from-red-300/30 to-orange-200/30 rounded-full blur-2xl animate-pulse"
              style={{
                bottom: "20%",
                left: "-10%",
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Blob 2 - Top Right */}
            <motion.div
              className="absolute w-103 h-52 bg-gradient-to-r from-blue-300/25 to-blue-200/25 rounded-full blur-3xl animate-pulse"
              style={{
                top: "30%",
                right: "-5%",
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, -1, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            />

            {/* Blob 3 - Bottom Center */}
            <motion.div
              className="absolute w-52 h-52 bg-gradient-to-r from-purple-300/20 to-orange-200/20 rounded-full blur-2xl animate-pulse"
              style={{
                bottom: "20%",
                left: "50%",
                x: "-50%",
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Hero Content */}
          <motion.div className="relative z-10" variants={containerVariants}>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              variants={itemVariants}
            >
              Comprehensive Data Services for
              <br />
              <motion.span 
                className="text-red-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Modern Organizations
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-sm md:text-md text-gray-400 mb-8 max-w-xl mx-auto"
              variants={itemVariants}
            >
              From governance to AI integration, we provide end-to-end
              solutions that transform your data into competitive advantage
              and revenue growth.
            </motion.p>
          </motion.div>

          {/* Stats Section with custom animation */}
          <motion.section 
            className="relative z-10 py-12 px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                {[
                  {
                    number: "50%",
                    label: "Improvement",
                    sublabel: "Reporting speed",
                  },
                  {
                    number: "3x",
                    label: "Faster",
                    sublabel: "Decision turnaround",
                  },
                  {
                    number: "90%",
                    label: "Accuracy",
                    sublabel: "Data post-governance",
                  },
                  {
                    number: "3x",
                    label: "Faster",
                    sublabel: "Data Processing Speed",
                  },
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    variants={statVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: index * 0.15,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl font-bold text-red-800 mb-2">
                      {stat.number}
                    </div>
                    <div className="md:bg-white rounded-sm py-2 px-2">
                      <div className="text-lg leading-3 font-semibold text-gray-800 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs leading-4 text-gray-600">
                        {stat.sublabel}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.section>
        </div>

      {/* Services Section */}
      <section className="relative overflow-hidden py-16 px-4">
        {/* Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Blob 1 - Top Left */}
          <motion.div
            className="absolute w-130 h-82 bg-gradient-to-r from-blue-300/40 to-yellow-200/80 rounded-full blur-2xl animate-pulse"
            style={{
              top: "2%",
              right: "-12%",
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Blob 2 - Top Right */}
          <motion.div
            className="absolute w-125 h-52 bg-gradient-to-r from-red-300/25 to-red-200/35 rounded-full blur-3xl animate-pulse"
            style={{
              top: "25%",
              left: "-5%",
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, -1, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute w-95 h-52 bg-gradient-to-r from-red-300/35 to-red-200/35 rounded-full blur-3xl animate-pulse"
            style={{
              top: "65%",
              left: "-5%",
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, -1, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute w-130 h-82 bg-gradient-to-r from-purple-300/40 to-red-200/80 rounded-full blur-2xl animate-pulse"
            style={{
              top: "43%",
              right: "-12%",
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-130 h-82 bg-gradient-to-r from-purple-300/40 to-red-200/80 rounded-full blur-2xl animate-pulse"
            style={{
              bottom: "2%",
              right: "-12%",
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Blob 3 - Bottom Center */}
          <motion.div
            className="absolute w-52 h-52 bg-gradient-to-r from-purple-300/20 to-orange-200/20 rounded-full blur-2xl animate-pulse"
            style={{
              bottom: "20%",
              left: "50%",
              x: "-50%",
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Services Content */}
        <div className="max-w-7xl lg:px-7 px-3 grid gap-8 md:gap-1 mx-auto">
          {/* Service 1 - Data Governance */}
            <motion.div
              id="data-governance"
              className="grid md:grid-cols-2 gap-6 md:gap-12 items-center md:mb-4 scroll-mt-24 transition-all duration-500 rounded-lg"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3, margin: "100px" }}
              variants={serviceVariants}
              onAnimationComplete={() => setFirstServiceLoaded(true)}
            >
              {firstServiceLoaded ? (
                <>
                  <motion.div 
                    className="relative z-10"
                    variants={fadeInVariants}
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      Data Governance
                    </motion.div>
                    <motion.h2 
                      className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      Data Governance & Quality
                      <br />
                      Management
                    </motion.h2>
                    <motion.p 
                      className="text-gray-600 md:text-lg lg:max-w-md mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      We help organizations structure and maintain high-quality
                      data, establishing clear standards, ownership, and governance
                      processes.
                    </motion.p>
                    <motion.button
                      onClick={() => openModal("dataGovernance")}
                      className="border border-red-800 text-red-800 px-6 py-2 rounded-lg hover:bg-red-50 transition flex items-center"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#FEF2F2"
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Learn More →
                    </motion.button>
                  </motion.div>
                  <motion.div
                    variants={scaleUpVariants}
                    className="relative"
                  >
                    <LottieAnimation 
                      src={serviceDetails.dataGovernance.lottieUrl} 
                      title="data-governance" 
                      className="w-full h-[400px]"
                    />
                  </motion.div>
                </>
              ) : (
                <div className="col-span-2 h-[500px] bg-gray-50 rounded-lg animate-pulse"></div>
              )}
            </motion.div>

          {/* Service 2 - Training & Culture */}
          <motion.div
            id="training-culture"
            className="grid md:grid-cols-2 gap-6 md:gap-12 relative items-center md:mb-4 scroll-mt-24 transition-all duration-500 rounded-lg"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3, margin: "100px" }}
            variants={serviceVariants}
          >
            <motion.div 
              className="md:order-2 relative z-10"
              variants={fadeInVariants}
            >
              <motion.div 
                className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Training & Culture
              </motion.div>
              <motion.h2 
                className=" text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Training & Culture
                <br />
                Building
              </motion.h2>
              <motion.p 
                className="text-gray-600 md:text-lg lg:max-w-md  mb-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Empowering your team to embrace data-driven thinking through
                hands-on training and workshops tailored to your business.
              </motion.p>
              <motion.button
                onClick={() => openModal("trainingCulture")}
                className="border border-red-800 text-red-800 px-6 py-2 rounded-lg hover:bg-red-50 transition flex items-center"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#FEF2F2"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                Learn More →
              </motion.button>
            </motion.div>
            <motion.div
              className="md:order-1"
              variants={scaleUpVariants}
            >
              <LottieAnimation 
                src={serviceDetails.trainingCulture.lottieUrl} 
                title="training-culture" 
                className="w-full h-[400px]"
              />
            </motion.div>
          </motion.div>

          {/* Service 3 - Data Infrastructure */}
          <motion.div
            id="data-infrastructure"
            className="grid md:grid-cols-2 items-center gap-6 md:gap-12 md:mb-4 scroll-mt-24"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3, margin: "100px" }}
            variants={serviceVariants}
          >
            <motion.div 
              className="relative z-10"
              variants={fadeInVariants}
            >
              <motion.div 
                className="bg-gradient-to-r from-green-50 to-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Infrastructure
              </motion.div>
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Data Infrastructure &
                <br />
                Centralization
              </motion.h2>
              <motion.p 
                className="text-gray-600 lg:max-w-md md:text-lg  mb-6 text-lg"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                We design and implement centralized data storage and
                infrastructure systems tailored to your organization's scale
                and goals.
              </motion.p>
              <motion.button
                onClick={() => openModal("dataInfrastructure")}
                className="border border-red-800 text-red-800 px-6 py-3 rounded-lg hover:bg-red-50 transition flex items-center text-lg"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#FEF2F2"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                Learn More →
              </motion.button>
            </motion.div>
            <motion.div
              variants={scaleUpVariants}
              className="relative"
            >
              <LottieAnimation 
                src={serviceDetails.dataInfrastructure.lottieUrl} 
                title="data-infrastructure" 
                className="w-full h-[400px]"
              />
            </motion.div>
          </motion.div>

          {/* Service 4 - Data Consulting */}
          <motion.div
            id="data-consulting"
            className="grid md:grid-cols-2 items-center gap-6 md:gap-12 md:mb-4 scroll-mt-24"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3, margin: "100px" }}
            variants={serviceVariants}
          >
            <motion.div 
              className="md:order-2 relative z-10"
              variants={fadeInVariants}
            >
              <motion.div 
                className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Consulting
              </motion.div>
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Data Consulting &
                <br />
                Process Optimization
              </motion.h2>
              <motion.p 
                className="text-gray-600 md:text-lg lg:max-w-md mb-6 text-lg"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Tailored consulting to streamline your data processes and align them with your business objectives.
              </motion.p>
              <motion.button
                onClick={() => openModal("dataConsulting")}
                className="border border-red-800 text-red-800 px-6 py-3 rounded-lg hover:bg-red-50 transition flex items-center text-lg"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#FEF2F2"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                Learn More →
              </motion.button>
            </motion.div>
            <motion.div
              className="md:order-1"
              variants={scaleUpVariants}
            >
              <LottieAnimation 
                src={serviceDetails.dataConsulting.lottieUrl} 
                title="data-consulting" 
                className="w-full h-[400px]"
              />
            </motion.div>
          </motion.div>

          {/* Service 5 - Analytics & Automation */}
          <motion.div
            id="analytics-automation"
            className="grid md:grid-cols-2 gap-6 md:gap-12 items-center scroll-mt-24"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3, margin: "100px" }}
            variants={serviceVariants}
          >
            <motion.div 
              className="relative z-10"
              variants={fadeInVariants}
            >
              <motion.div 
                className="bg-gradient-to-r from-red-50 to-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Advanced Analytics & Automation
              </motion.div>
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
               Advanced Analytics &
                <br />
                Automation
              </motion.h2>
              <motion.p 
                className="text-gray-600 md:text-lg lg:max-w-md  mb-6 text-lg"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Helping you leverage AI and predictive analytics to automate
                insights and unlock new business value.
              </motion.p>
              <motion.button
                onClick={() => openModal("analyticsAutomation")}
                className="border border-red-800 text-red-800 px-6 py-3 rounded-lg hover:bg-red-50 transition flex items-center text-lg"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#FEF2F2"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                Learn More →
              </motion.button>
            </motion.div>
            <motion.div
              variants={scaleUpVariants}
              className="relative"
            >
              <LottieAnimation 
                src={serviceDetails.analyticsAutomation.lottieUrl} 
                title="analytics-automation" 
                className="w-full h-[400px]"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute bottom-20 left-10 w-12 h-12 grid grid-cols-3 gap-1 opacity-20"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: 1,
          rotate: 360,
        }}
        transition={{
          delay: 1,
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(9)].map((_, i) => (
          <motion.div 
            key={i}
            className="w-2 h-2 bg-red-300 rounded-full"
            animate={{
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedService && (
          <motion.div 
            className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              <div className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {serviceDetails[selectedService].title}
                </h2>
                <div className="prose md:text-xl text-gray-600">
                  <p>{serviceDetails[selectedService].description}</p>
                </div>
                <div className="w-56 h-56 m-auto">
                  <LottieAnimation 
                    src={serviceDetails[selectedService].lottieUrl} 
                    title={`modal-${selectedService}`} 
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TechnologyOrbit />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }
        
        .highlight-section {
          animation: highlight-pulse 2s ease-in-out;
        }
        
        @keyframes highlight-pulse {
          0% { 
            background: transparent;
            box-shadow: none;
            transform: scale(1);
          }
          50% { 
            transform: scale(1.02);
          }
          100% { 
            background: transparent;
            box-shadow: none;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
    </div>
  );
};

export default Services;
