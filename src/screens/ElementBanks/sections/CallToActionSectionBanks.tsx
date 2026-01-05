import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

export const CallToActionSectionBanks = (): JSX.Element => {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-0 relative self-stretch w-full">
      {/* Left Column */}
      <div className="flex flex-col w-full lg:max-w-[680px] items-start gap-4 relative lg:flex-1 lg:grow">
        {/* Section Label */}
        <div className="flex items-center relative self-stretch w-full">
          <div className="flex flex-col w-6 h-2 items-start pl-0 pr-4 py-0 relative">
            <div className="relative w-2 h-2 bg-white rounded" />
          </div>
          <span className="w-fit [font-family:'Manrope',Helvetica] font-semibold text-white text-xs md:text-[13px] tracking-[0] leading-4">
            FINAL CTA
          </span>
        </div>

        {/* Section Heading */}
        <div className="flex w-full flex-col items-start relative self-stretch">
          <h2 className="self-stretch [font-family:'Manrope',Helvetica] font-bold text-white text-3xl md:text-5xl lg:text-[48px] tracking-[-3px] leading-tight md:leading-[56px] mt-[-1.00px]">
            Automate Your Proxy Research — Without Compromising Accuracy.
          </h2>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col w-full lg:max-w-[680px] items-start gap-6 relative lg:flex-1 lg:grow">
        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Button className="rounded-[40px] h-10 md:h-12 px-6 md:px-8 py-2 md:py-3 bg-white text-black hover:opacity-90 transition-opacity">
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-sm md:text-base tracking-[-0.16px] leading-[22.4px]">
              Book a Strategy Call
            </span>
            <ArrowRightIcon className="ml-4 md:ml-6 w-3 md:w-4 h-3 md:h-4" />
          </Button>
          <a href="#platform" className="cursor-target inline-flex items-center justify-center h-10 md:h-12 px-6 md:px-8 rounded-[40px] border border-white text-white hover:bg-white hover:text-black transition-colors">
            Explore the Platform
          </a>
        </div>
      </div>
    </section>
  );
};
