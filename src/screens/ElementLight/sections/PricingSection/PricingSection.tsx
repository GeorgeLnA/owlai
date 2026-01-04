import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

export const PricingSection = (): JSX.Element => {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-0 relative self-stretch w-full">
      {/* Left section - Technologies label */}
      <div className="flex w-full lg:w-[340px] items-center relative">
        <div className="flex flex-col w-6 h-2 items-start pl-0 pr-4 py-0 relative">
          <div className="relative w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <h3 className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] tracking-[0] leading-4">
          TECHNOLOGIES WE USE
        </h3>
      </div>

      {/* Center section - Main heading */}
      <div className="flex flex-col w-full lg:w-[680px] items-start pl-0 lg:pl-[116px] pr-0 lg:pr-[81.39px] py-0 relative">
        <h1 className="relative w-fit mt-[-1.00px] mr-0 lg:mr-[-4.39px] [font-family:'Manrope',Helvetica] font-bold text-wezomcomblack text-3xl md:text-5xl lg:text-[64px] tracking-[-3.84px] leading-tight lg:leading-[64px]">
          Technology stack
        </h1>
      </div>

      {/* Right section - CTA button */}
      <div className="flex flex-col w-full lg:max-w-[340px] lg:w-[340px] items-start lg:items-end justify-end pt-4 pb-0 px-0 relative">
        <div className="flex flex-col w-full lg:max-w-[340px] items-start lg:items-end relative">
                      <Button className="h-10 md:h-12 px-6 md:px-8 py-2 md:py-[12.8px] rounded-[40px] bg-[#553194] text-white">
            <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-sm md:text-base tracking-[-0.16px] leading-[22.4px]">
              DISCOVER MORE
            </span>
            <ArrowRightIcon className="ml-4 md:ml-6 w-3 md:w-4 h-3 md:h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
