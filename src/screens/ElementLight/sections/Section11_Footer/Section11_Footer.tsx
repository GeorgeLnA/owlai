"use client";

import React from "react";

export const Section11_Footer = (): JSX.Element => {

  // Footer links organized in columns - based on actual sections on the page
  const footerLinks = [
    {
      title: "PLATFORM",
      links: [
        { id: 1, title: "Platform", url: "#platform" },
        { id: 2, title: "Test Lampost Beta for Free", url: "/demo" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { id: 3, title: "Contact", url: "#final-cta" },
        { id: 4, title: "Privacy Policy", url: "#" },
      ],
    },
  ];

  // Contact information
  const contactInfo = ["+1 (424) 800-3834"];


  return (
    <footer
      id="footer"
      className="w-full pb-0 bg-white"
      aria-label="Section 11 — Footer"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 md:gap-12 p-6 md:p-10 lg:p-12 w-full">
        {/* Left Column - Logo and Contact */}
        <div className="flex flex-col items-start justify-start">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img
              src="/photo logos hero/cropped-OWL-AI-white.png"
              alt="OWL AI Logo"
              className="h-8 md:h-10 w-auto brightness-0"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2 mb-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.includes("@") ? `mailto:${info}` : `tel:${info.replace(/\s/g, "")}`}
                className="cursor-target [font-family:'Manrope',Helvetica] font-semibold text-sm text-wezomcomblack leading-tight transition-colors duration-300 hover:text-[#246193]"
              >
                {info}
              </a>
            ))}
          </div>
        </div>

        {/* Center Column - Footer Links */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-8 md:gap-12 lg:gap-16">
          {footerLinks.map((column, columnIndex) => (
            <ul key={columnIndex} className="flex flex-col gap-y-3">
              <li className="mb-1 text-xs font-semibold text-black uppercase tracking-wider [font-family:'Manrope',Helvetica]">
                {column.title}
              </li>
              {column.links.map((link) => (
                <li
                  key={link.id}
                  className="group inline-flex cursor-pointer items-center justify-start gap-1"
                >
                  <a
                    href={link.url}
                    className="cursor-target text-[15px] text-wezomcomdove-gray [font-family:'Manrope',Helvetica] font-semibold transition-colors duration-300 hover:text-black"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Right Column - CTA */}
        <div className="flex flex-col items-start lg:items-end">
          <h3 className="text-lg md:text-xl font-bold text-black mb-4 [font-family:'Manrope',Helvetica]">
            Ready to get started?
          </h3>
          <a
            href="/demo"
            className="cursor-target inline-flex items-center justify-center w-[220px] h-12 md:h-14 rounded-xl bg-black text-white font-semibold text-base md:text-lg hover:bg-[#246193] transition-colors duration-300 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
          >
            Free Lampost Beta
          </a>
          <a
            href="https://calendly.com/aipowered-investment-research-saas/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target mt-3 inline-flex items-center justify-center w-[220px] h-12 md:h-14 rounded-xl bg-[#246193] text-white font-semibold text-base md:text-lg hover:bg-[#1a4a6b] transition-colors duration-300 focus:outline-none [font-family:'Manrope',Helvetica]"
          >
            Call with Founder
          </a>
        </div>
      </div>

      {/* Copyright and Privacy */}
      <div className="w-full border-t border-[#afafaf60] pt-6 md:pt-8 pb-6 md:pb-8 px-6 md:px-10 lg:px-12 mt-8 md:mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <div className="flex items-center gap-3">
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-sm md:text-base leading-tight">
              © 2026
            </span>
            <span className="text-wezomcomblack text-lg">•</span>
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-black text-sm md:text-base leading-tight">
              OWL AI
            </span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/admin"
              className="cursor-target [font-family:'Manrope',Helvetica] font-semibold text-wezomcomdove-gray text-sm md:text-base leading-tight transition-colors duration-300 hover:text-[#246193]"
            >
              Admin
            </a>
            <a
              href="#"
              className="cursor-target [font-family:'Manrope',Helvetica] font-semibold text-wezomcomdove-gray text-sm md:text-base leading-tight transition-colors duration-300 hover:text-[#246193]"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Section11_Footer;
