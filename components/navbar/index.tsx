"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  sections: {
    id: string;
    label: string;
    ref: React.RefObject<HTMLElement | null>;
  }[];
}

export default function Navbar({ sections }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section?.ref.current) {
      section.ref.current.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu after clicking
    } else if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const element = section.ref.current;
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between md:justify-start h-16 md:h-20">
          {/* Logo */}
          <div className="shrink-0 md:w-1/3">
            <button
              onClick={() => scrollToSection("home")}
              className="cursor-pointer"
            >
              <Image
                src="/images/risen.png"
                alt="Risen Management Co"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </button>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center  justify-center gap-8 lg:gap-12 flex-1">
            {sections.filter((section) => section.id !== "contact").map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm lg:text-base cursor-pointer  font-medium transition-colors duration-300 ${
                  activeSection === section.id
                    ? "text-[#EB3912]"
                    : "text-white hover:text-[#EB3912]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Contact - Right aligned */}
          <div className="hidden md:flex items-center justify-end w-1/3">
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm lg:text-base font-medium transition-colors duration-300 ${
                activeSection === "contact"
                  ? "text-[#EB3912]"
                  : "text-white hover:text-[#EB3912]"
              }`}
            >
              Contact
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <motion.span
                className="block h-0.5 w-full bg-white"
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 w-full bg-white"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 w-full bg-white"
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left text-base font-medium py-2 transition-colors duration-300 ${
                    activeSection === section.id
                      ? "text-[#EB3912]"
                      : "text-white hover:text-[#EB3912]"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

