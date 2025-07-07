"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex relative bg-gradient-to-b from-pink-200 to-red-900 flex-col md:flex-row justify-center items-center h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
      {/* Animated blob background using Framer Motion */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-[-20%] left-[-20%] w-[30rem] h-[30rem] bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 200, -250, 150, 0],
            y: [0, -150, 100, -200, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[10%] right-[-25%] w-[28rem] h-[28rem] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -150, 300, -200, 0],
            y: [0, 100, -180, 120, 0],
            scale: [1, 0.95, 1.2, 1, 1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute bottom-[-15%] left-[0%] w-[26rem] h-[26rem] bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 300, -200, 250, 0],
            y: [0, -100, 120, -180, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-[30%] left-[30%] w-[34rem] h-[34rem] bg-red-400/15 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -150, 100, -200, 0],
            y: [0, 150, -120, 200, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Design dots */}
      <img className="absolute top-0 right-0 z-10" src="/dots.png" alt="design dot" />
      <img className="absolute bottom-0 left-0 z-10" src="/dots.png" alt="design dot" />

      {/* Main content */}
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-serif md:text-8xl text-pink-100 font-extrabold">Coming <span className="text-red-800">Soon</span> </h1>
        <p className="text-red-50/80 text-lg md:text-2xl font-serif pt-5">Our website is coming in 2025</p>
      </div>
    </div>
  );
}

