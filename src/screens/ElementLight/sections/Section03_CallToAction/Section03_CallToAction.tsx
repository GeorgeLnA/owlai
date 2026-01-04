import React from "react";
import { CallToActionSection } from "../CallToActionSection";
import { DividerSection } from "../DividerSection";

export const Section03_CallToAction = (): JSX.Element => {
  return (
    <section
      id="final-cta"
      className="w-full py-16 md:py-[120px] bg-black rounded-3xl mx-4 md:mx-0"
      aria-label="Section — Final CTA"
    >
      <div className="flex flex-col max-w-[1640px] mx-auto items-start gap-6 md:gap-10 pr-6 md:pr-14 pl-14 md:pl-28">
        <CallToActionSection />
        <DividerSection />
      </div>
    </section>
  );
};

export default Section03_CallToAction;

