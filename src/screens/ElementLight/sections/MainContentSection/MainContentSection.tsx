import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const MainContentSection = (): JSX.Element => {
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Simplified footer navigation - only 5 buttons
  const footerLinks = [
    {
      title: "ABOUT US",
      href: "#about",
    },
    {
      title: "PLATFORM",
      href: "#platform",
    },
    {
      title: "CONTACT US",
      href: "#final-cta",
    },
    {
      title: "RESOURCES",
      href: "#resources",
    },
    {
      title: "CASE STUDIES",
      href: "#case-studies",
    },
  ];

  useEffect(() => {
    linksRef.current.forEach((linkRef) => {
      if (!linkRef) return;

      const handleMouseEnter = () => {
        gsap.to(linkRef, {
          scale: 1.05,
          y: -2,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(linkRef, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      linkRef.addEventListener("mouseenter", handleMouseEnter);
      linkRef.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        linkRef.removeEventListener("mouseenter", handleMouseEnter);
        linkRef.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <div className="flex flex-col w-full items-start relative">
      <div className="flex flex-wrap items-start gap-6 md:gap-8 lg:gap-10">
        {footerLinks.map((item, index) => (
          <div
            key={`footer-link-${index}`}
            className="flex flex-col items-start"
          >
            <a
              ref={(el) => (linksRef.current[index] = el)}
              href={item.href}
              className="cursor-target inline-flex items-start relative group"
            >
              <span className="relative w-fit [font-family:'Manrope',Helvetica] font-semibold text-black text-sm md:text-base lg:text-lg tracking-[-0.5px] leading-tight transition-colors duration-300 group-hover:text-[#553194]">
                {item.title}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
