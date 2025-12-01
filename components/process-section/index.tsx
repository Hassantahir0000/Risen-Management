"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VariableProximity from "@/components/shared/variable-proximity";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepTextRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  // GSAP ScrollTrigger for number opacity animation with scroll hijacking
  useEffect(() => {
    const stepsElement = stepsRef.current;
    const sectionElement = sectionRef.current;
    if (!stepsElement || !sectionElement) return;

    // Set initial opacity to 30% for all numbers and step texts
    numberRefs.current.forEach((numberRef) => {
      if (numberRef) {
        gsap.set(numberRef, { opacity: 0.2});
      }
    });
    
    stepTextRefs.current.forEach((stepTextRef) => {
      if (stepTextRef) {
        gsap.set(stepTextRef, { opacity: 0.2});
      }
    });

    // Create a timeline for all three number animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: "top top",
        end: "+=1000", // Scroll distance to complete animation
        pin: true,
        pinSpacing: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate each number and corresponding step text sequentially
    numberRefs.current.forEach((numberRef, index) => {
      if (numberRef) {
        tl.to(
          numberRef,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          index * 0.2 // Stagger the animations
        );
      }
      
      // Animate the corresponding step text at the same time
      const stepTextRef = stepTextRefs.current[index];
      if (stepTextRef) {
        tl.to(
          stepTextRef,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          index * 0.2 // Same timing as the number
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionElement) {
          trigger.kill();
        }
      });
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full  my-20 md:mt-auto md:mb-auto min-h-screen lg:h-screen bg-black flex flex-col lg:flex-row lg:items-stretch overflow-hidden"
    >
      {/* Left Section - Text Content */}
      <div 
        ref={containerRef}
        className="w-full lg:w-1/2 bg-black px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col justify-start lg:h-full"
      >
        <motion.h2 
          className="text-[42px] md:text-[72px]font-bold text-white mb-12 md:mb-16 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <VariableProximity
            label="We like to keep things nice and simple"
            className="text-[42px] md:text-[72px]font-bold text-white"
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
                    <span 
                      ref={(el) => {
                        numberRefs.current[index] = el;
                      }}
                      className="text-white text-[24px] font-semibold"
                      style={{ opacity: 0.2}}
                    >
                      {step.number}
                    </span>
                  </div>
                </motion.div>

                <div
                  ref={(el) => {
                    stepTextRefs.current[index] = el;
                  }}
                  style={{ opacity: 0.2}}
                >
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white text-sm md:text-base lg:text-lg opacity-80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Section - Image */}
      <motion.div 
        className="w-full lg:w-1/2 relative lg:h-full flex items-center justify-center"
        //@ts-expect-error
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-0 lg:h-full">
          <Image
            src="/images/process.png"
            alt="Team members"
            width={720}
            height={720}
            className="object-contain lg:object-cover md:px-0 px-10 mt-10 md:mt-0"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}

