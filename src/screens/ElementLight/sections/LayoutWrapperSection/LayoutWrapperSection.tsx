import React from "react";

export const LayoutWrapperSection = (): JSX.Element => {
  // Contact information data
  const contactInfo = ["hello@owlai.com", "+1 (555) 123-4567"];

  return (
    <section className="flex flex-col w-full lg:w-auto relative">
      {/* Contact information section */}
      <div className="flex flex-col gap-2">
        {contactInfo.map((info, index) => (
          <div key={index} className="w-full">
            <a 
              href={info.includes("@") ? `mailto:${info}` : `tel:${info.replace(/\s/g, "")}`}
              className="[font-family:'Manrope',Helvetica] font-medium text-sm md:text-base text-wezomcomblack leading-[19.6px] hover:opacity-70 transition-opacity"
            >
              {info}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
