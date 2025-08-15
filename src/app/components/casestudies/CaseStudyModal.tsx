import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CheckListItem } from "../../components/casestudies/CheckListItem";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  categoryColor: "red" | "blue";
  type: string;
  overview: string;
  approach: string;
  image: string;
  solution: string | string[];
  impact: string[];
  hasTopVector?: boolean;
}

interface BackgroundBlob {
  className: string;
  style: React.CSSProperties;
  animation: {
    y: number[];
    x: number[];
    scale: number[];
  };
  transition: {
    duration: number;
    repeat: number;
    ease: string;
    delay?: number;
  };
}

interface CaseStudyModalProps {
  selectedStudy: CaseStudy | null;
  onClose: () => void;
}

const backgroundBlobs: BackgroundBlob[] = [
  {
    className:
      "absolute w-103 h-52 bg-gradient-to-r from-red-300/30 to-orange-200/30 rounded-full blur-2xl -z-10",
    style: { top: "8%", left: "-10%" },
    animation: { y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] },
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className:
      "absolute w-103 h-52 bg-gradient-to-r from-blue-400/20 to-blue-200/25 rounded-full blur-3xl -z-10",
    style: { top: "8%", right: "-5%" },
    animation: { y: [0, 20, 0], x: [0, -15, 0], scale: [1, 0.9, 1] },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    },
  },
  {
    className:
      "absolute -z-10 w-103 h-52 bg-gradient-to-r from-blue-400/30 to-blue-200/25 rounded-full blur-3xl",
    style: { top: "35%", right: "-5%" },
    animation: { y: [0, -15, 0], x: [0, 20, 0], scale: [1, 1.05, 1] },
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2,
    },
  },
];

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  selectedStudy,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {selectedStudy && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="relative bg-white/80 backdrop-blur-md p-10 max-w-3xl w-full overflow-hidden">
              {/* Background blobs - now behind text */}
              <div className="absolute inset-0 pointer-events-none -z-10">
                {backgroundBlobs.map((blob, i) => (
                  <motion.div
                    key={i}
                    className={blob.className}
                    style={blob.style}
                    animate={blob.animation}
                    transition={{
                      ...blob.transition,
                      ease: [0.42, 0, 0.58, 1],
                    }}
                  />
                ))}
              </div>

              {/* Foreground text */}
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                      {selectedStudy.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedStudy.category} •{" "}
                      <span className="text-red-700 font-medium">
                        {selectedStudy.type}
                      </span>
                    </p>
                  </div>

                  <div className="ml-auto flex-shrink-0">
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Overview
                    </h3>
                    <p className="mt-2 text-gray-700">
                      {selectedStudy.overview}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Approach
                    </h3>
                    <p className="mt-2 text-gray-700">
                      {selectedStudy.approach}
                    </p>
                  </section>

                  <div className="flex flex-col md:flex-row md:gap-8">
                    <div className="md:w-1/2 space-y-2">
                      <h4 className="font-semibold text-red-700">Solutions</h4>
                      <ul>
                        {Array.isArray(selectedStudy.solution) &&
                          selectedStudy.solution.map((item, i) => (
                            <CheckListItem key={i}>{item}</CheckListItem>
                          ))}
                      </ul>
                    </div>

                    <div className="md:w-1/2 space-y-2">
                      <h4 className="font-semibold text-red-700">Impact</h4>
                      <ul>
                        {selectedStudy.impact.map((item, i) => (
                          <CheckListItem key={i}>{item}</CheckListItem>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
