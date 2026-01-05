import React from "react";

export const MainContentSection = (): JSX.Element => {
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

  return (
    <div className="flex flex-col w-full items-start relative">
      <div className="flex flex-wrap items-start gap-4 md:gap-6 lg:gap-8">
        {footerLinks.map((item, index) => (
          <div
            key={`footer-link-${index}`}
            className="flex flex-col items-start"
          >
            <a
              href={item.href}
              className="inline-flex items-start relative hover:opacity-70 transition-opacity"
            >
              <span className="relative w-fit [font-family:'Manrope',Helvetica] font-semibold text-black text-xs md:text-sm tracking-[0] leading-[15.6px]">
                {item.title}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
