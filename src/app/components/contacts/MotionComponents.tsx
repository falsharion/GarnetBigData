// components/MotionComponents.tsx
'use client';

import {
  motion,
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useAnimation,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useVelocity,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValueEvent,
  useCycle,
  MotionConfig,
  isValidMotionProp
} from 'framer-motion';

// Export all the motion components you need
export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;
export const MotionSpan = motion.span;
export const MotionImg = motion.img;
export const MotionButton = motion.button;
export const MotionSvg = motion.svg;
export const MotionPath = motion.path;

// Export other utilities you might need
export {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useAnimation,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useVelocity,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValueEvent,
  useCycle,
  MotionConfig,
  isValidMotionProp
};