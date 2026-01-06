import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const OverlaySection = (): JSX.Element => {
  const copyrightRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Footer links data
  const footerLinks = [
    { text: "Privacy Policy", href: "#" },
  ];

  useEffect(() => {
    if (linkRef.current) {
      const handleMouseEnter = () => {
        gsap.to(linkRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(linkRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      linkRef.current.addEventListener("mouseenter", handleMouseEnter);
      linkRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (linkRef.current) {
          linkRef.current.removeEventListener("mouseenter", handleMouseEnter);
          linkRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
  }, []);

  return (
    <footer className="relative w-full border-t border-[#afafaf60] pt-8 md:pt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
        {/* Copyright info */}
        <div ref={copyrightRef} className="flex items-center gap-3">
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-sm md:text-base leading-tight">
            © 2025
          </span>
          <span className="text-wezomcomblack text-lg">•</span>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-black text-sm md:text-base leading-tight">
            OWL AI
          </span>
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-4 md:gap-6">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              ref={index === 0 ? linkRef : null}
              href={link.href}
              className="cursor-target [font-family:'Manrope',Helvetica] font-semibold text-wezomcomdove-gray text-sm md:text-base leading-tight transition-colors duration-300 hover:text-wezomcomblack"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
