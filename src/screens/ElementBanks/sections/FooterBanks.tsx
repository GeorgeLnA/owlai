import React from "react";
import { MainContentSection } from "../../ElementLight/sections/MainContentSection";
import { LayoutWrapperSection } from "../../ElementLight/sections/LayoutWrapperSection";
import { OverlaySection } from "../../ElementLight/sections/OverlaySection";

export const FooterBanks = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start pt-4 pb-10 bg-white" aria-label="Footer — Banks">
      <div className="flex flex-col max-w-[1640px] mx-auto w-full items-end gap-8 md:gap-16 pr-6 md:pr-14 pl-14 md:pl-28 py-0">
        <div className="flex flex-col lg:flex-row w-full items-end justify-center gap-8 lg:gap-0">
          <MainContentSection />
          <LayoutWrapperSection />
        </div>
        <OverlaySection />
      </div>
    </footer>
  );
};

export default FooterBanks;
