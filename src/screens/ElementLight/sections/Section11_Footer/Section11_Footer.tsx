import React from "react";
import { MainContentSection } from "../MainContentSection";
import { LayoutWrapperSection } from "../LayoutWrapperSection";
import { OverlaySection } from "../OverlaySection";

export const Section11_Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20 bg-white" aria-label="Section 11 — Footer">
      <div className="flex flex-col max-w-[1640px] mx-auto w-full items-start gap-8 md:gap-10 px-6 md:px-14 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row w-full items-start lg:items-start lg:justify-between gap-8 md:gap-12">
          <MainContentSection />
          <LayoutWrapperSection />
        </div>
        <div className="w-full">
          <OverlaySection />
        </div>
      </div>
    </footer>
  );
};

export default Section11_Footer;

