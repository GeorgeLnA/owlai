import React from "react";

export const AboutUsSection = (): JSX.Element => {
  return (
    <section className="flex items-start w-full">
      <div className="flex flex-col w-20 items-start">
        <span className="font-wezom-com-IBM-plex-mono-semibold text-wezomcomdove-gray tracking-[var(--wezom-com-IBM-plex-mono-semibold-letter-spacing)] leading-[var(--wezom-com-IBM-plex-mono-semibold-line-height)]">
          05/
        </span>
      </div>

      <div className="flex flex-col items-start">
        <div className="pb-3">
          <h2 className="font-['Manrope',Helvetica] font-bold text-wezomcomblack text-[52px] tracking-[-3.12px] leading-[52px]">
            QA &amp; Software Testing
          </h2>
        </div>
      </div>
    </section>
  );
};
