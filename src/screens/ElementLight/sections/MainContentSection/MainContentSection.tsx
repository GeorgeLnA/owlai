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
      <div className="flex flex-wrap items-start gap-6 md:gap-8 lg:gap-10 pt-8 md:pt-10 lg:pt-12 pb-0">
        {footerLinks.map((item, index) => (
          <div
            key={`footer-link-${index}`}
            className="flex flex-col items-start"
          >
            <a
              href={item.href}
              className="inline-flex items-start relative"
            >
              <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-black text-xs md:text-[13px] tracking-[0] leading-[15.6px]">
                {item.title}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
