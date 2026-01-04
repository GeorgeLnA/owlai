import React from "react";

export const LayoutWrapperSection = (): JSX.Element => {
  // Contact information data
  const contactInfo = ["hello@owlai.com", "+1 (555) 123-4567"];

  return (
    <section className="flex flex-col w-full lg:max-w-[680px] gap-8 md:gap-10 relative">
      {/* Contact information section */}
      <div className="flex flex-col pl-8 md:pl-16 lg:pl-24 xl:pl-32 pt-8 md:pt-10 lg:pt-12">
        {contactInfo.map((info, index) => (
          <div key={index} className="w-full mb-2">
            <p className="font-medium text-sm md:text-base text-wezomcomblack leading-[19.6px]">
              {info}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
