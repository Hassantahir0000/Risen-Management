"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const leftInView = useInView(leftRef, { once: true, amount: 0.3 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 });
  const faqsInView = useInView(faqsRef, { once: true, amount: 0.1 });

  const faqs = [
    {
      question: "Who do you work with?",
      answer:
        "We work with creators, content groups, and brands that are serious about long-term growth. Our partners typically already have momentum and are looking to scale with structure and strategy.",
    },
    {
      question: "What makes Risen different from traditional management agencies?",
      answer:
        "Risen operates as a growth partner, not just a manager. We focus on building systems, developing brands, and creating long-term value — not just booking deals.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We support creators and brands across content strategy, operations, sponsorships, and brand development. Every partnership is customized.",
    },
    {
      question: "Do you manage creators exclusively?",
      answer:
        "It depends on the partnership. We work across both exclusive and non-exclusive arrangements based on goals, scope, and alignment.",
    },
    {
      question: "Do you help creators build their own brands or products?",
      answer:
        "Yes. Brand development is a core part of what we do. We work with creators to turn influence into ownership through products, partnerships, and long-term brand opportunities.",
    },
    {
      question: "How do we start working together?",
      answer:
        "Reach out through our contact form with details about what you’re building. If there’s a fit, we’ll set up a conversation to explore next steps.",
    },
  ];
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
    },
  };

  return (
    <section ref={sectionRef} className="w-full bg-black py-16 md:py-20 lg:py-24">
      <div className="mx-auto px-10 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          {/* Left Side - FAQs Title and Image */}
          <motion.div 
            ref={leftRef}
            className="flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2 
              className="text-[14px] font-medium text-white mb-8 md:mb-12"
              initial={{ opacity: 0, y: -10 }}
              animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              FAQs
            </motion.h2>
            <motion.div 
              className="relative mx-auto md:mx-0 w-[315px] h-[394px]"
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={leftInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.9, rotateY: -15 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/art.png"
                alt="Abstract art"
                width={315}
                height={394}
                className="object-contain md:mt-30"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Questions */}
          <motion.div 
            ref={rightRef}
            className="flex flex-col -ml-8 md:-ml-12 lg:-ml-16"
            initial={{ opacity: 0, x: 50 }}
            animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h3 
              className="text-[48px] md:text-[72px] font-medium text-white mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={rightInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Any questions?
            </motion.h3>

            <motion.div 
              ref={faqsRef}
              className="space-y-0"
              initial="hidden"
              animate={faqsInView ? "visible" : "hidden"}
            >
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={faqVariants}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left py-6 md:py-8 flex items-start justify-between gap-4 group transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-white text-[18px] md:text-[20px] font-medium flex-1 transition-colors duration-300 group-hover:opacity-80">
                      {faq.question}
                    </span>
                    <span className="text-white text-2xl md:text-3xl font-light shrink-0 mt-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-90">
                      {openIndex === index ? (
                        <span className="block w-6 h-0.5 bg-white transition-all duration-300 group-hover:opacity-70"></span>
                      ) : (
                        <span className="block relative w-6 h-6 transition-all duration-300">
                          <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -translate-y-1/2 transition-all duration-300 group-hover:opacity-70"></span>
                          <span className="absolute top-1/2 left-1/2 w-0.5 h-full bg-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:opacity-70"></span>
                        </span>
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pb-6 md:pb-8">
                      <p className="text-white text-[14px] md:text-[16px] font-light leading-relaxed opacity-80 transform transition-all duration-500">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                  {index < faqs.length - 1 && (
                    <motion.div 
                      className="w-full h-px bg-white opacity-20"
                      initial={{ scaleX: 0 }}
                      animate={faqsInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

