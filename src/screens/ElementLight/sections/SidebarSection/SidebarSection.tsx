import React from "react";

export const SidebarSection = (): JSX.Element => {
  return (
    <header className="flex items-start relative self-stretch w-full">
      <div className="flex flex-col w-20 items-start">
        <span className="font-wezom-com-IBM-plex-mono-semibold text-wezomcomdove-gray tracking-[var(--wezom-com-IBM-plex-mono-semibold-letter-spacing)] leading-[var(--wezom-com-IBM-plex-mono-semibold-line-height)] [font-style:var(--wezom-com-IBM-plex-mono-semibold-font-style)]">
          02/
        </span>
      </div>

      <div className="flex flex-col items-start">
        <div className="pb-3">
          <div className="pr-[270px]">
            <h1 className="text-[52px] tracking-[-3.12px] leading-[52px] font-bold text-wezomcomblack [font-family:'Manrope',Helvetica]">
              Web Development
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
