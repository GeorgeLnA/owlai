import React from "react";

export const OverlaySection = (): JSX.Element => {
  // Footer links data
  const footerLinks = [
    { text: "Sitemap", href: "#" },
    { text: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="relative w-full h-auto md:h-14">
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center h-full gap-4 md:gap-0 py-4 md:py-0">
        {/* Copyright and links */}
        <div className="flex items-center h-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0">
            {/* Copyright info */}
            <div className="pl-0 lg:pl-6 pt-0 lg:pt-4 lg:pt-0">
              <div className="flex items-center">
                <span className="[font-family:'Manrope',Helvetica] font-medium text-wezomcomblack text-xs md:text-sm leading-[19.6px]">
                  © 2025
                </span>
                <img
                  className="w-1 md:w-1.5 h-1 md:h-1.5 mx-2"
                  alt="Separator"
                  src="/component-3-59.svg"
                />
                <span className="[font-family:'Manrope',Helvetica] font-medium text-black text-xs md:text-sm leading-[19.6px]">
                  OWL AI
                </span>
              </div>
            </div>

            {/* Footer links */}
            <div className="flex gap-4 lg:gap-0">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="pl-0 lg:pl-6 pt-0 lg:pt-[25.5px] lg:pt-0 [font-family:'Manrope',Helvetica] font-medium text-wezomcomdove-gray text-xs md:text-sm leading-[19.6px] hover:underline"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
