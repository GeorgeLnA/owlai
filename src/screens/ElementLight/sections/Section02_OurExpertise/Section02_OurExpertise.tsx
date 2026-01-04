import React from "react";
import { InteractiveExpertise } from "./InteractiveExpertise";

export const Section02_OurExpertise = (): JSX.Element => {
  return (
    <section
      className="flex flex-col max-w-[1640px] w-full mx-auto items-start gap-8 md:gap-16 pr-6 md:pr-14 pl-14 md:pl-28 py-6 md:py-12"
      aria-label="Section 2 — Our Expertise"
    >
      <div className="flex flex-col items-start justify-center w-full gap-8">
        {/* Interactive expertise list matching design */}
        <InteractiveExpertise />
      </div>
    </section>
  );
};

export default Section02_OurExpertise;

