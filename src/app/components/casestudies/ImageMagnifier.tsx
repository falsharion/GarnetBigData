
import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ZoomIn } from "lucide-react";

interface ImageWithMagnifierProps {
  src: string;
  alt: string;
  index: number;
  onImageClick: (imageData: {
    src: string;
    alt: string;
    index: number;
    position: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
  }) => void;
  imageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const ImageWithMagnifier: React.FC<ImageWithMagnifierProps> = ({
  src,
  alt,
  index,
  onImageClick,
  imageRefs,
}) => {
  const handleClick = () => {
    const ref = imageRefs.current[index];
    if (ref) {
      const rect = ref.getBoundingClientRect();
      onImageClick({
        src,
        alt,
        index,
        position: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
      });
    }
  };

  return (
    <motion.div
      ref={(el: HTMLDivElement | null) => {
        imageRefs.current[index] = el;
      }}
      className="relative group cursor-pointer overflow-hidden rounded-md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      onClick={handleClick}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={cardVariants}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-md border shadow-sm transition-all duration-300"
      />

      {/* Zoom overlay */}
      <motion.div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <ZoomIn className="text-white w-8 h-8" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ImageWithMagnifier;