import React from "react";
import { InteractiveExpertise } from "./InteractiveExpertise";

export const Section02_OurExpertise = (): JSX.Element => {
  return (
    <section
      className="flex flex-col w-full items-start gap-8 md:gap-16 px-[50px] md:px-[50px] pt-12 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20"
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

