"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Marquee from "react-fast-marquee";
import VariableProximity from "@/components/shared/variable-proximity";

export default function NetworkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const marqueeInView = useInView(marqueeRef, { once: true, amount: 0.1 });

  // Company logos from /public/logos folder
  const companies = [
    { name: "Company 1", logo: "/logos/image1.png" },
    { name: "Company 2", logo: "/logos/image2.png" },
    { name: "Company 3", logo: "/logos/image3.png" },
    { name: "Company 4", logo: "/logos/image4.png" },
    { name: "Company 5", logo: "/logos/image5.png" },
    { name: "Company 6", logo: "/logos/image6.png" },
    { name: "Company 7", logo: "/logos/image7.png" },
    { name: "Company 8", logo: "/logos/image8.png" },
    { name: "Company 9", logo: "/logos/image9.png" },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-black py-16 md:py-20 lg:py-24 overflow-hidden">
      <div ref={containerRef} className="mx-auto px-8 md:px-12 lg:px-16">
        {/* Heading */}
        <motion.h2 
          className="text-[42px] md:text-[72px]font-bold text-white text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <VariableProximity
            label="Our Network"
            className="text-[42px] md:text-[72px]font-bold text-white"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </motion.h2>

        {/* Marquee Container */}
        <motion.div 
          ref={marqueeRef}
          className="relative w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={marqueeInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          {/* Marquee Wrapper */}
          <Marquee speed={120} loop={0} gradient={false} pauseOnHover={true}>
            {companies.map((company, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center mx-8 md:mx-12 lg:mx-16 shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={marqueeInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.5 + (index % companies.length) * 0.05 }}
              >
                <div className="relative w-32 h-16 md:w-40 md:h-20 lg:w-48 lg:h-24 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </Marquee>
        </motion.div>
      </div>

    </section>
  );
}

