import React from "react";

export const MainContentSection = (): JSX.Element => {
  // Define navigation categories for better maintainability
  const navigationCategories = [
    {
      title: "PLATFORM",
      href: "#platform",
    },
    {
      title: "SOLUTIONS",
      href: "#solution",
    },
    {
      title: "INDUSTRIES",
      href: "#industries",
    },
    {
      title: "PARTNERSHIP",
      href: "#partnership",
    },
  ];

  const secondaryNavigation = [
    {
      title: "CONTACT US",
      href: "#final-cta",
    },
    {
      title: "RESOURCES",
      href: "#resources",
    },
    {
      title: "ABOUT OWL AI",
      href: "#about",
    },
    {
      title: "CASE STUDIES",
      href: "#case-studies",
    },
  ];

  const locations = ["New York", "San Francisco", "London"];

  return (
    <div className="flex flex-col w-full items-start relative">
      <div className="flex flex-col md:flex-row w-full items-start gap-8 md:gap-0 relative">
        <div className="flex flex-col items-start pl-0 md:pl-6 pr-0 pt-6 pb-0 relative">
          <div className="flex flex-col w-full md:w-[200px] items-start relative">
            {navigationCategories.map((item, index) => (
              <div
                key={`nav-${index}`}
                className="flex flex-col items-start py-[4.5px] px-0 relative self-stretch w-full"
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

        <div className="flex flex-col items-start pl-0 md:pl-6 pr-0 pt-6 pb-0 relative">
          <div className="flex flex-col w-full md:w-[200px] items-start relative">
            {secondaryNavigation.map((item, index) => (
              <div
                key={`secondary-nav-${index}`}
                className="flex flex-col items-start py-[4.5px] px-0 relative self-stretch w-full"
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

        <div className="flex flex-col items-start pl-0 md:pl-6 pr-0 pt-6 md:pt-[23.3px] pb-0 relative">
          <div className="flex flex-col w-full md:w-[200px] items-start gap-[7.99px] relative">
            <div className="flex flex-col items-start relative self-stretch w-full">
              <h3 className="relative self-stretch mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-black text-xs md:text-[13px] tracking-[0] leading-[15.6px]">
                OWL AI
                <br />
                OFFICES
              </h3>
            </div>

            <div className="flex flex-col w-full md:w-[152px] max-h-[121px] items-start relative overflow-auto">
              {locations.map((location, index) => (
                <div
                  key={`location-${index}`}
                  className="flex flex-col items-start pt-1 pb-[0.59px] px-0 relative self-stretch w-full"
                >
                  <a
                    href="#"
                    className="inline-flex items-start pt-0 pb-[0.8px] px-0 relative"
                  >
                    <span className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-medium text-wezomcomblack text-xs tracking-[0] leading-[16.8px]">
                      {location}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
