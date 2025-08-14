

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ZoomedImageState {
  src: string;
  alt: string;
  index: number;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface ImageZoomModalProps {
  zoomedImage: ZoomedImageState | null;
  onClose: () => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  zoomedImage,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {zoomedImage && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 p-2 text-white hover:text-gray-300 transition-colors"
              aria-label="Close zoomed image"
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-md shadow-xl"
              initial={{
                clipPath: `inset(${zoomedImage.position.top}px ${window.innerWidth - zoomedImage.position.left - zoomedImage.position.width}px ${window.innerHeight - zoomedImage.position.top - zoomedImage.position.height}px ${zoomedImage.position.left}px round 8px)`
              }}
              animate={{
                clipPath: `inset(0px round 8px)`
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};