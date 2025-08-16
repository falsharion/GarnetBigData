"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/services/HeroSection";
import ServiceItem from "../components/services/ServiceItem";
import ServiceModal from "../components/services/ServiceModal";
import AnimatedBlobs from "../components/services/AnimatedBlobs";
import TechnologyOrbit from "../components/TechnolgyOrbit";
import { serviceDetails, ServiceKey } from "../data/serviceDetails";

const Services = () => {
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

  // Preload Lottie and first animation
  useEffect(() => {
    if (!window.lottie) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js';
      script.async = true;
      document.head.appendChild(script);
    }

    const preloadFirstAnimation = async () => {
      try {
        await fetch(serviceDetails.dataGovernance.lottieUrl);
        setFirstServiceLoaded(true);
      } catch (err) {
        console.error('Preload failed:', err);
        setFirstServiceLoaded(true); // Set to true anyway to avoid infinite loading
      }
    };
    preloadFirstAnimation();
  }, []);

  // Hash scroll handling
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

  const serviceConfigs = [
    {
      serviceKey: "dataGovernance" as ServiceKey,
      id: "data-governance",
      title: "Data Governance & Quality",
      subtitle: "Management",
      description: "We help organizations structure and maintain high-quality data, establishing clear standards, ownership, and governance processes.",
      badgeText: "Data Governance",
      badgeColor: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800",
      isReversed: false
    },
    {
      serviceKey: "trainingCulture" as ServiceKey,
      id: "training-culture",
      title: "Training & Culture",
      subtitle: "Building",
      description: "Empowering your team to embrace data-driven thinking through hands-on training and workshops tailored to your business.",
      badgeText: "Training & Culture",
      badgeColor: "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800",
      isReversed: true
    },
    {
      serviceKey: "dataInfrastructure" as ServiceKey,
      id: "data-infrastructure",
      title: "Data Infrastructure &",
      subtitle: "Centralization",
      description: "We design and implement centralized data storage and infrastructure systems tailored to your organization's scale and goals.",
      badgeText: "Infrastructure",
      badgeColor: "bg-gradient-to-r from-green-50 to-green-100 text-green-800",
      isReversed: false
    },
    {
      serviceKey: "dataConsulting" as ServiceKey,
      id: "data-consulting",
      title: "Data Consulting &",
      subtitle: "Process Optimization",
      description: "Tailored consulting to streamline your data processes and align them with your business objectives.",
      badgeText: "Consulting",
      badgeColor: "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800",
      isReversed: true
    },
    {
      serviceKey: "analyticsAutomation" as ServiceKey,
      id: "analytics-automation",
      title: "Advanced Analytics &",
      subtitle: "Automation",
      description: "Helping you leverage AI and predictive analytics to automate insights and unlock new business value.",
      badgeText: "Advanced Analytics & Automation",
      badgeColor: "bg-gradient-to-r from-red-50 to-red-100 text-red-800",
      isReversed: false
    }
  ];

  return (
    <div className="">
      <HeroSection />

      {/* Services Section */}
      <section className="relative overflow-hidden py-16 px-4">
        <AnimatedBlobs variant="services" />

        <div className="max-w-7xl lg:px-7 px-3 grid gap-8 md:gap-1 mx-auto">
          {serviceConfigs.map((config, index) => {
            const { serviceKey, ...serviceProps } = config;
            return (
              <React.Fragment key={serviceKey}>
                {index === 0 && !firstServiceLoaded ? (
                  <div className="col-span-2 h-[500px] bg-gray-50 rounded-lg animate-pulse"></div>
                ) : (
                  <ServiceItem
                    {...serviceProps}
                    lottieUrl={serviceDetails[serviceKey].lottieUrl}
                    onLearnMore={() => openModal(serviceKey)}
                  />
                )}
              </React.Fragment>
            );
          })}
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
      <ServiceModal
        isOpen={modalOpen}
        onClose={closeModal}
        service={selectedService ? serviceDetails[selectedService] : null}
        serviceKey={selectedService}
      />

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
  );
};

export default Services;
