"use client";

import ImageTrail from "@/components/shared/image-trail";
import ProcessSection from "@/components/process-section";
import ServicesSection from "@/components/services-section";
import NetworkSection from "@/components/network-section";
import Image from "next/image";
import TeamSection from "@/components/team-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRef } from 'react';
import VariableProximity from "@/components/shared/variable-proximity"; 
import BlurText from "@/components/shared/blue-text";



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLElement>(null);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const teamSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const scrollToNextSection = () => {
    processSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const homeRef = useRef<HTMLElement>(null);

  const sections = [
    { id: "home", label: "Home", ref: homeRef },
    { id: "about", label: "About", ref: teamSectionRef },
    { id: "services", label: "Services", ref: servicesSectionRef },
    { id: "how-it-works", label: "How it Works", ref: processSectionRef },
    { id: "contact", label: "Contact", ref: footerRef },
  ];

  return (
    <div className="container mx-auto bg-black">
    <Navbar sections={sections} />
    <section ref={homeRef} className="relative min-h-screen h-auto w-full bg-black overflow-hidden">
      {/* Background ImageTrail */}
      <div className="h-[80vh] inset-0 z-10">
        <ImageTrail
          items={[
            '/images/image-trail/image1.png',
            '/images/image-trail/image2.png',
            '/images/image-trail/image3.png',
            '/images/image-trail/image4.png',
            '/images/image-trail/image5.png',
            '/images/image-trail/image6.png',
          ]}
          variant={2}
        />
      </div>

      {/* Background Circle */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/hero/hero-circle.svg"
          alt=""
          width={800}
          height={800}
          priority
        />
      </div>

      {/* Background Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/images/hero/background-lines.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>


     

      {/* Content Overlay */}
      <div className="relative z-20 h-full w-full flex flex-col mt-[-18rem] justify-between p-8 md:p-12 lg:p-16">
        {/* Top Section - Elevate & Influence */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between ">
         
         <BlurText
            text="Elevate"
            delay={350}
            animateBy="words"
            direction="top"
            className="text-[72px] font-medium text-white tracking-tight"
          />

          <BlurText
            text="Influence."
            delay={350}
            animateBy="words"
            direction="top"
            className="text-[72px] font-medium text-orange-500 tracking-tight"
          />
       
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col mt-40 md:flex-row md:items-end md:justify-between gap-6 md:gap-0">
          {/* Left - Description */}
          <p className="text-white text-sm md:text-base lg:text-lg font-light max-w-md">
            The Choice that helps <br /> creators rise
          </p>

       

          {/* Right - Arrow */}
          <div className="flex justify-end">
            <button
              onClick={scrollToNextSection}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Scroll to next section"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

 
    {/* Process Section */}
    <section ref={processSectionRef}>
      <ProcessSection />
    </section>

    <section ref={servicesSectionRef}>
      <ServicesSection />
    </section>

    <NetworkSection />
    
    <section ref={teamSectionRef}>
      <TeamSection/>
    </section>

    <FAQSection />
    
    <footer ref={footerRef}>
      <Footer />
    </footer>
    </div>
  );
}
