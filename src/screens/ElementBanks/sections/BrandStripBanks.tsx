import React from "react";
import { Section01_BrandStrip as BaseStrip } from "../../ElementLight/sections/Section01_BrandStrip";

// We reuse the same moving logos component from ElementLight but keep the heading text tailored
export const BrandStripBanks = (): JSX.Element => {
  return (
    <section className="relative w-full border-y border-[#66666620] bg-white" aria-label="Trust — Banks">
      {/* Reuse the animated brand strip without its original heading */}
      <BaseStrip />
    </section>
  );
};

export default BrandStripBanks;


