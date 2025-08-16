import React from "react";
import { motion } from "framer-motion";
import ImageWithMagnifier from "./ImageMagnifier";
import { CategoryBadge } from "./CategoryBadge";
import { ShowMoreButton } from "./ShowMoreButton"

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

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  isReversed: boolean;
  onShowMore: (study: CaseStudy) => void;
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

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  study,
  index,
  isReversed,
  onShowMore,
  onImageClick,
  imageRefs,
}) => {
  return (
    <motion.section
      id={study.id}
      className="md:py-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div
        className={`flex flex-col pb-14 items-center gap-8 `}
      >
        {/* Image column */}
        <div className="w-full sm:px-10 lg:w-3/4">
          <ImageWithMagnifier
            src={study.image}
            alt={`${study.title} Screenshot`}
            index={index}
            onImageClick={onImageClick}
            imageRefs={imageRefs}
          />
        </div>

        {/* Text column */}
        <motion.div
          className="w-full sm:px-5  space-y-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          {study.hasTopVector && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src="/Vector.png"
                alt="vector"
                className="mb-2 hidden md:block"
              />
            </motion.span>
          )}

          <div className="relative ">
            <motion.h3
              className="text-red-800 text-xl md:text-2xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {study.title}
              <CategoryBadge
                category={study.category}
                color={study.categoryColor}
              />
              <motion.span
                className="absolute right-4 hidden md:block"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img src="/Vector1.png" alt="vector" />
              </motion.span>
            </motion.h3>
          </div>

          <motion.p
            className="text-red-900 text-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {study.type}
          </motion.p>

          {/* Overview */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-base md:text-lg text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {study.overview}
            </motion.p>
          </motion.div>

          {/* Show More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            viewport={{ once: true }}
          >
            <ShowMoreButton onClick={() => onShowMore(study)} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CaseStudyCard;