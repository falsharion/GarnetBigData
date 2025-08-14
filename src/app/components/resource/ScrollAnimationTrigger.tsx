"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ScrollAnimationTriggerProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  id?: string;
}

const ScrollAnimationTrigger: React.FC<ScrollAnimationTriggerProps> = ({
  children,
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  className = "",
  id
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${id}` && ref.current && !hasAnimated) {
        // Force re-animation when navigating via hash
        setHasAnimated(false);
        setTimeout(() => {
          setHasAnimated(true);
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [id, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-20px 0px" }}
      onViewportEnter={() => setHasAnimated(true)}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationTrigger;