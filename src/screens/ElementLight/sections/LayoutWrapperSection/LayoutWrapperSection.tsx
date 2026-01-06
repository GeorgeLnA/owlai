import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const LayoutWrapperSection = (): JSX.Element => {
  const contactRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Contact information data
  const contactInfo = ["hello@owlai.com", "+1 (555) 123-4567"];

  useEffect(() => {
    contactRefs.current.forEach((contactRef) => {
      if (!contactRef) return;

      const handleMouseEnter = () => {
        gsap.to(contactRef, {
          scale: 1.05,
          x: 4,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(contactRef, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      contactRef.addEventListener("mouseenter", handleMouseEnter);
      contactRef.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        contactRef.removeEventListener("mouseenter", handleMouseEnter);
        contactRef.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <section className="flex flex-col w-full lg:w-auto relative">
      {/* Contact information section */}
      <div className="flex flex-col gap-3 md:gap-4">
        {contactInfo.map((info, index) => (
          <div key={index} className="w-full">
            <a 
              ref={(el) => (contactRefs.current[index] = el)}
              href={info.includes("@") ? `mailto:${info}` : `tel:${info.replace(/\s/g, "")}`}
              className="cursor-target [font-family:'Manrope',Helvetica] font-semibold text-base md:text-lg lg:text-xl text-wezomcomblack leading-tight transition-colors duration-300 hover:text-[#553194]"
            >
              {info}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
