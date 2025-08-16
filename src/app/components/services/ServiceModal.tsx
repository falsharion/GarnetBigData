"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LottieAnimation from "./LottieAnimation";

interface ServiceDetails {
  title: string;
  description: string;
  lottieUrl: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetails | null;
  serviceKey: string | null;
}
const ServiceModal = ({ isOpen, onClose, service, serviceKey }: ServiceModalProps) => {
  if (!service || !serviceKey) return null;


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose} // Add this line
        >
          <motion.div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {service.title}
              </h2>
              <div className="prose md:text-xl text-gray-600">
                <p>{service.description}</p>
              </div>
              <div className="w-full flex justify-center">
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                  <LottieAnimation 
                    src={service.lottieUrl} 
                    title={`modal-${serviceKey}`} 
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;