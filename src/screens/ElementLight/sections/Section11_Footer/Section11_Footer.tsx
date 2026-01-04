import React from "react";
import { MainContentSection } from "../MainContentSection";
import { LayoutWrapperSection } from "../LayoutWrapperSection";
import { OverlaySection } from "../OverlaySection";

export const Section11_Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 bg-white" aria-label="Section 11 — Footer">
      <div className="flex flex-col max-w-[1640px] mx-auto w-full items-end gap-12 md:gap-20 lg:gap-24 pr-6 md:pr-14 pl-14 md:pl-28 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row w-full items-end justify-center gap-12 md:gap-16 lg:gap-20">
          <MainContentSection />
          <LayoutWrapperSection />
        </div>
        <OverlaySection />
      </div>
    </footer>
  );
};

export default Section11_Footer;

