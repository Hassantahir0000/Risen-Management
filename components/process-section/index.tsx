"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import VariableProximity from "@/components/shared/variable-proximity";

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 });

  const steps = [
    {
      number: "001",
      title: "Strategy First",
      description: "We align on goals, audience, and content direction before anything goes live.",
    },
    {
      number: "002",
      title: "Create & Manage",
      description: "We handle the production, scheduling, and posting across all key platforms.",
    },
    {
      number: "003",
      title: "Review & Refine",
      description: "We track performance, learn what's working, and adjust as needed.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const numberVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 1.1
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-screen bg-black flex flex-col lg:flex-row"
    >
      {/* Left Section - Text Content */}
      <div 
        ref={containerRef}
        className="w-full lg:w-1/2 bg-black p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center"
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-12 md:mb-16 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <VariableProximity
            label="We like to keep things nice and simple"
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </motion.h2>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div 
            className="absolute left-6 top-0 bottom-0 w-px bg-white opacity-30"
            initial={{ scaleY: 0 }}
            animate={stepsInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Steps List */}
          <motion.div 
            ref={stepsRef}
            className="space-y-8 md:space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={stepsInView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative pl-16 md:pl-20"
                //@ts-expect-error
                variants={stepVariants}
              >
                {/* Number Circle */}
                <motion.div 
                  className="absolute left-0 top-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
                  //@ts-expect-error
                  variants={numberVariants}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-black">
                    <span className="text-white text-[24px] font-semibold">
                      {step.number}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={stepsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + (index * 0.2),
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white text-sm md:text-base lg:text-lg opacity-80 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Section - Image */}
      <motion.div 
        className="w-full lg:w-1/2 relative "
        //@ts-expect-error
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src="/images/process.png"
          alt="Team members"
          width={600}
          height={600}
          className="object-cover md:mt-16 mx-auto"
          priority
        />
      </motion.div>
    </section>
  );
}

