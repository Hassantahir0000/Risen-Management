"use client";

import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    // { name: "Twitter(X)", url: "#" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/risen-management-co/" },
    { name: "Instagram", url: "https://www.instagram.com/risenmgmtco/" },
    // { name: "Behance", url: "#" },
  ];

  return (
    <footer className="w-full bg-black">
      {/* Header Section - Social Links */}
      <div className="border-t border-gray-400/30">
        <div className="mx-auto px-8 md:px-12 lg:px-16 py-6 md:py-8">
          <nav className="flex flex-wrap gap-6 md:gap-8 w-full justify-between">
            {socialLinks.map((link, index) => (
              <p
                key={index}
                onClick={() => window.open(link.url, "_blank")}
                className="text-white cursor-pointer text-sm md:text-base font-light hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                {link.name}
                <span className="text-white">→</span>
              </p>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content - Background Image */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden">
        <Image
          src="/images/footer-bg.png"
          alt="Get in touch"
          fill
          className="object-contain md:object-cover"
          priority
        />
      </div>

      {/* Footer Section */}
      <div className="border-t border-gray-400/30">
        <div className="mx-auto px-8 md:px-12 lg:px-16 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {/* Left - Location */}
            <div className="text-white text-sm md:text-base font-light">
              Location
            </div>

            {/* Center - Back to top */}
            <button
              onClick={scrollToTop}
              className="text-white text-sm md:text-base font-light hover:opacity-70 transition-opacity cursor-pointer"
            >
              Back to top
            </button>

            {/* Right - Copyright */}
            <div className="text-white text-sm md:text-base font-light">
              ©2025 Risen management. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

