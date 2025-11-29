"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import VariableProximity from "@/components/shared/variable-proximity";
import TiltedCard from "@/components/shared/tilted-card";

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });

  const services = [
    {
      title: "Content Creation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Social Management",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Paid Media",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const serviceVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
    },
  };

  return (
    <section ref={sectionRef} className="w-full bg-black py-16 md:py-20 lg:py-24">
      <div ref={containerRef} className=" mx-auto px-8 md:px-12 lg:px-16">
        {/* Heading */}
        <motion.h2 
          className="text-[42px] md:text-[72px] font-bold text-white mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <VariableProximity
            label="How we can help you grow"
            className="text-[42px] md:text-[72px] font-bold text-white"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </motion.h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left - Image */}
          <motion.div 
            className="relative w-full min-h-[400px] lg:min-h-[500px] order-2 lg:order-1"
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <TiltedCard
              imageSrc="/images/grow.png"
              altText="Creative team"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={10}
              showMobileWarning={false}
              showTooltip={false}
            />
          </motion.div>

          {/* Right - Services List */}
          <motion.div 
            ref={servicesRef}
            className="order-1 lg:order-2 space-y-0"
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={serviceVariants}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="py-8">
                  <h3 className="text-[24px] font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white text-[14px] leading-relaxed opacity-80">
                    {service.description}
                  </p>
                </div>
                {index < services.length - 1 && (
                  <motion.div 
                    className="w-full h-px bg-white opacity-20"
                    initial={{ scaleX: 0 }}
                    animate={servicesInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.15) }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

