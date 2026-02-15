import React from "react";
import { BlogSection } from "../BlogSection";

export const Section04_BlogAndStats = (): JSX.Element => {
  return (
    <section
      className="flex flex-col w-full items-start gap-6 md:gap-10 px-[50px] md:px-[50px] py-12 md:py-20 lg:py-24"
      aria-label="Section 4 — Blog"
    >
      <BlogSection />
    </section>
  );
};

export default Section04_BlogAndStats;

