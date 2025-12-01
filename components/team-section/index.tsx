"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltedCard from "../shared/tilted-card";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingTextRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.1 });
  const teamMembers = [
    {
      name: "STEPHEN EAPEN",
      title: "CO-FOUNDER / CEO",
      description:
        "Graduated in 2021 with a criminal law degree from the University of Illinois at Chicago. At 20, he founded a consulting company, demonstrating early entrepreneurial drive. He now owns a private equity firm and has expanded into the digital space, managing social media influencers and operating the social media group Brownhouse. He and his team have collaborated with multiple major companies.",
      image: "/images/stephen.png",
    },
    {
      name: "YASH PATEL",
      title: "CO-FOUNDER / COO",
      description:
        "Earned his MBA in business analytics from Drexel University in 2024, building on an early career as a mechanical engineer at ProShares Grey. In 2021, he launched a successful medical consulting company. He has founded and contributed to numerous ventures, focusing on integrating technology to automate operations, enhance customer engagement, and drive growth. His expertise includes management and business strategy.",
      image: "/images/yash.png",
    },
    {
      name: "KRISH GIDWANI",
      title: "HEAD OF PRODUCTION",
      description:
        "Graduated in 2021 with a criminal law degree from the University of Illinois at Chicago. At 20, he founded his content company. He now owns Payvertise Productions, a social media influencer agency creating the social media group Brown House. He and his team have collaborated with multiple major companies.",
       image: "/images/krish.png",
    },
    {
      name: "RAIYAN CHOWDURY",
      title: "CREATIVE DIRECTOR",
      description:
        "Earned his Bachelor of Science in Management Information Systems, graduating in 2020 from the University of Cincinnati. He has advanced his career in creative media, directing and producing viral ads, short films, and visual projects, generating tens of millions of views worldwide. His mix of creativity, technical skill, strategic thinking, and visual flare has led to engagements with multiple major brands.",
      image: "/images/raiyan.png",
    },
  ];

  const memberVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
    },
  };

// GSAP ScrollTrigger for heading text opacity animation (word by word)
  useEffect(() => {
    const headingTextElement = headingTextRef.current;
    const sectionElement = sectionRef.current;
    if (!headingTextElement || !sectionElement) return;

    // Wrap each word in a span
    const text = headingTextElement.textContent || "";
    const words = text.split(" ");
    headingTextElement.innerHTML = words
      .map((word) => `<span class="inline-block opacity-5">${word}</span>`)
      .join(" ");

    const wordElements = headingTextElement.querySelectorAll("span");

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
    });

    // Animate each word's opacity from 0.05 to 1 in sequence
    wordElements.forEach((word, index) => {
      tl.to(
        word,
        {
          opacity: 1,
          duration: 0.1,
          ease: "none",
        },
        index * 0.05
      );
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
    <section ref={sectionRef} className="w-full bg-black py-16 md:py-20 lg:py-24">
      <div className="mx-auto px-8 md:px-12 lg:px-16">
        {/* Title Section */}
        <motion.div 
          className="mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 
            ref={headingRef}
            className="text-[32px] text-white text-center md:text-[72px] font-medium md:leading-20"
          >
            <div ref={headingTextRef}>
              <span className="text-white">At Risen Management Co We </span>
              <span className="text-white">
                Empower 14{" "}
                <span className="text-white">Exceptional Creators</span>
              </span>
              <span className="text-white"> By Amplifying Their Reach</span>
            </div>
          </h2>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          ref={teamRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16"
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col md:flex-row"
              variants={memberVariants}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image */}
              <motion.div 
                className="relative w-full md:w-[30%] mt-[-20px] h-[248px] mb-auto"
                initial={{ opacity: 0, x: -30 }}
                animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.15), ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltedCard
                  imageSrc={member.image}
                  altText={member.name}
                  containerHeight="248px"
                  containerWidth="100%"
                  imageHeight="248px"
                  imageWidth="100%"
                  scaleOnHover={1.05}
                  rotateAmplitude={10}
                  showMobileWarning={false}
                  showTooltip={false}
                  
                />
              </motion.div>

             <motion.div 
               className="flex md:w-[65%] items-center md:items-start ml-auto flex-col"
               initial={{ opacity: 0, x: 30 }}
               animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
               transition={{ duration: 0.6, delay: 0.3 + (index * 0.15), ease: [0.22, 1, 0.36, 1] }}
             >
                 {/* Name */}
              <h3 className="text-[24px] font-bold text-white mb-2">
                {member.name}
              </h3>

              {/* Title */}
              <p className="text-[14px] uppercase text-gray-400 mb-2 ">
                {member.title}
              </p>

              {/* Description */}
              <p className="text-[14px] text-center md:text-left font-light text-white opacity-60 leading-relaxed">
                {member.description}
              </p>
             </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

