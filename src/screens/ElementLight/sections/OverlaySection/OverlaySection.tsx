import React from "react";

export const OverlaySection = (): JSX.Element => {
  // Footer links data
  const footerLinks = [
    { text: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="relative w-full border-t border-[#afafaf40] pt-6 md:pt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        {/* Copyright info */}
        <div className="flex items-center gap-2">
          <span className="[font-family:'Manrope',Helvetica] font-medium text-wezomcomblack text-xs md:text-sm leading-[19.6px]">
            © 2025
          </span>
          <span className="text-wezomcomblack">•</span>
          <span className="[font-family:'Manrope',Helvetica] font-medium text-black text-xs md:text-sm leading-[19.6px]">
            OWL AI
          </span>
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-4 md:gap-6">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="[font-family:'Manrope',Helvetica] font-medium text-wezomcomdove-gray text-xs md:text-sm leading-[19.6px] hover:text-wezomcomblack transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
