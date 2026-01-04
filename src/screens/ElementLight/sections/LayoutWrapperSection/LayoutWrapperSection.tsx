import React from "react";
import { Button } from "../../../../components/ui/button";

export const LayoutWrapperSection = (): JSX.Element => {
  // Social media icons data
  const socialIcons = [
    { src: "/component-3-52.svg", alt: "Component" },
    { src: "/component-3-48.svg", alt: "Component" },
    { src: "/component-3-45.svg", alt: "Component" },
    { src: "/component-3-49.svg", alt: "Component" },
    { src: "/component-3-42.svg", alt: "Component" },
  ];

  // Contact information data
  const addresses = [
    "New York, 112 W. 34th Street, 17th\nand 18th Floors",
    "San Francisco, 1 Market Street, Suite\n3000",
  ];

  const contactInfo = ["hello@owlai.com", "+1 (555) 123-4567"];

  return (
    <section className="flex flex-col w-full lg:max-w-[680px] gap-6 relative">
      {/* Social media icons row */}
      <div className="flex flex-wrap items-center">
        <div className="flex flex-wrap items-start gap-2 pl-0 md:pl-4 pt-2">
          {socialIcons.map((icon, index) => (
            <div key={index} className="pt-2 pl-2">
              <Button
                variant="outline"
                size="icon"
                className="w-8 md:w-10 h-8 md:h-10 rounded-[20px] border border-solid border-[#553194] p-0 flex items-center justify-center"
              >
                <img className="w-3 md:w-4 h-3 md:h-4" alt={icon.alt} src={icon.src} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact information section */}
      <div className="flex flex-col md:flex-row justify-center w-full gap-6 md:gap-0">
        {/* Addresses column */}
        <div className="flex flex-col flex-1 max-w-[360px] pl-0 md:pl-10">
          <div className="flex flex-col gap-[7.29px]">
            {addresses.map((address, index) => (
              <div key={index} className="max-w-[227px]">
                <p className="font-medium text-xs md:text-sm text-wezomcomblack leading-[19.6px] whitespace-pre-line">
                  {address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact details column */}
        <div className="flex flex-col flex-1 max-w-[360px] pl-0 md:pl-10">
          {contactInfo.map((info, index) => (
            <div key={index} className="w-full">
              <p className="font-medium text-xs md:text-sm text-wezomcomblack leading-[19.6px]">
                {info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
