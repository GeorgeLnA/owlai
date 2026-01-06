"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { FlickeringGrid } from "../../../../components/ui/flickering-grid";

export const Section11_Footer = (): JSX.Element => {
  const footerRef = useRef<HTMLElement>(null);
  const [isTablet, setIsTablet] = useState(false);

  // Footer links organized in columns
  const footerLinks = [
    {
      title: "ABOUT US",
      links: [
        { id: 1, title: "About", url: "#about" },
        { id: 2, title: "Platform", url: "#platform" },
        { id: 3, title: "Contact", url: "#final-cta" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { id: 4, title: "Resources", url: "#resources" },
        { id: 5, title: "Case Studies", url: "#case-studies" },
      ],
    },
  ];

  // Contact information
  const contactInfo = ["hello@owlai.com", "+1 (555) 123-4567"];

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => {
      window.removeEventListener("resize", checkTablet);
    };
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;

    const links = footerRef.current.querySelectorAll("a");
    links.forEach((link) => {
      const handleMouseEnter = () => {
        gsap.to(link, {
          scale: 1.05,
          x: 4,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="w-full pb-0 bg-white"
      aria-label="Section 11 — Footer"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between p-6 md:p-10 lg:p-12 max-w-[1640px] mx-auto">
        <div className="flex flex-col items-start justify-start max-w-xs mx-0">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-5">
            <img
              src="/photo logos hero/cropped-OWL-AI-white.png"
              alt="OWL AI Logo"
              className="h-8 md:h-10 w-auto"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2 -mt-12 md:-mt-14">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.includes("@") ? `mailto:${info}` : `tel:${info.replace(/\s/g, "")}`}
                className="cursor-target [font-family:'Manrope',Helvetica] font-semibold text-sm text-wezomcomblack leading-tight transition-colors duration-300 hover:text-[#553194]"
              >
                {info}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="md:w-1/2">
          <div className="flex flex-col items-start justify-start md:flex-row md:items-start md:justify-between gap-y-5 lg:pl-10">
            {footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-2">
                <li className="mb-2 text-sm font-semibold text-black [font-family:'Manrope',Helvetica]">
                  {column.title}
                </li>
                {column.links.map((link) => (
                  <li
                    key={link.id}
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug text-wezomcomdove-gray [font-family:'Manrope',Helvetica] font-semibold transition-colors duration-300 hover:text-black"
                  >
                    <a href={link.url} className="cursor-target">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright and Privacy */}
      <div className="w-full border-t border-[#afafaf60] pt-6 md:pt-8 px-6 md:px-10 lg:px-12 max-w-[1640px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-sm md:text-base leading-tight">
              © 2025
            </span>
            <span className="text-wezomcomblack text-lg">•</span>
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-black text-sm md:text-base leading-tight">
              OWL AI
            </span>
          </div>
          <a
            href="#"
            className="cursor-target [font-family:'Manrope',Helvetica] font-semibold text-wezomcomdove-gray text-sm md:text-base leading-tight transition-colors duration-300 hover:text-wezomcomblack"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Flickering Grid */}
      <div className="w-screen h-32 md:h-48 relative mt-12 md:mt-16 lg:mt-24 z-0 left-1/2 -translate-x-1/2">
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10 from-20%" />
        <div className="absolute inset-0">
          <FlickeringGrid
            text="OWL AI"
            fontSize={isTablet ? 50 : 70}
            fontWeight={200}
            className="h-full w-full"
            squareSize={3}
            gridGap={isTablet ? 1 : 1.5}
            color="#246193"
            maxOpacity={0.7}
            flickerChance={0.1}
          />
        </div>
      </div>
    </footer>
  );
};

export default Section11_Footer;
