import React from "react";

export const ContactSection = (): JSX.Element => {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full">
      {/* Left rail label */}
      <div className="flex flex-col w-full lg:max-w-[340px] lg:w-[340px] items-start">
        <div className="flex items-center">
          <div className="flex flex-col w-6 h-2 items-start pr-4">
            <div className="w-2 h-2 bg-wezomcomblack rounded" />
          </div>
          <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
            WHAT CLIENTS SAY
          </span>
        </div>
      </div>

      {/* Right heading */}
      <div className="flex flex-col w-full lg:max-w-[906.67px] items-start">
        <h2 className="[font-family:'Manrope',Helvetica] font-bold text-wezomcomblack text-3xl md:text-5xl lg:text-[64px] tracking-[-3.84px] leading-tight md:leading-[64px]">
          What clients say
        </h2>
      </div>
    </section>
  );
};
