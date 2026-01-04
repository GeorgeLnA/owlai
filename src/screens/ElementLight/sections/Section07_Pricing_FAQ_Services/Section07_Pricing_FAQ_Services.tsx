import React from "react";
import { VerticalBorderWrapperSection } from "../VerticalBorderWrapperSection";
import { FAQSection } from "../FAQSection";

export const Section07_Pricing_FAQ_Services = (): JSX.Element => {
  return (
    <section
      className="flex flex-col max-w-[1640px] mx-auto w-full items-start gap-6 md:gap-10 pr-6 md:pr-14 pl-14 md:pl-28 py-8 md:py-16"
      aria-label="Section 7 — Pricing, FAQ and Services"
    >
      <div className="flex flex-col lg:flex-row w-full items-start border-t border-[#afafaf80] pt-px">
        <VerticalBorderWrapperSection />
        <div className="flex flex-col w-full lg:w-[1020px] items-start pl-0 lg:pl-[114px] pt-8 lg:pt-16 pb-0">
          <div className="flex flex-col items-start gap-8 lg:gap-16 w-full">
            <FAQSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section07_Pricing_FAQ_Services;

