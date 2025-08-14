"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Import server-safe components and data
import HeroSection from "../components/casestudies/HeroSection";
import CaseStudyCard from "../components/casestudies/CaseStudyCard";
import { caseStudiesData, type CaseStudy } from "../data/caseStudiesData";

// Dynamically import heavy interactive components
const CaseStudyModal = dynamic(
  () => import("../components/casestudies/CaseStudyModal").then((mod) => mod.CaseStudyModal),
  { ssr: false }
);

const ImageZoomModal = dynamic(
  () => import("../components/casestudies/ImageZoomModal").then((mod) => mod.ImageZoomModal),
  { ssr: false }
);

// Types
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

const CaseStudyPage: React.FC = () => {
  // Client-side state for modals only
  const [zoomedImage, setZoomedImage] = useState<ZoomedImageState | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Hero section content
  const heroContent = {
    title: "Discover how we help businesses unlock the",
    highlightedText: "power of their data",
    subtitle: "From foundational data governance to AI-powered automation, we partner with organizations to drive measurable outcomes. Explore how we bring clarity, efficiency, and innovation to complex data challenges.",
  };

  return (
    <main className="font-sans text-gray-800 relative overflow-x-hidden">
      <HeroSection {...heroContent} />
      
      <section className="max-w-6xl mx-auto px-6">
        {caseStudiesData.map((study, index) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            index={index}
            isReversed={index % 2 === 1}
            onShowMore={setSelectedStudy}
            onImageClick={setZoomedImage}
            imageRefs={imageRefs}
          />
        ))}
      </section>

      {zoomedImage && (
       <ImageZoomModal
  zoomedImage={zoomedImage}
  onClose={() => setZoomedImage(null)}
/>
      )}
<CaseStudyModal
  selectedStudy={selectedStudy}
  onClose={() => setSelectedStudy(null)}
/>
    </main>
  );
};

export default CaseStudyPage;
