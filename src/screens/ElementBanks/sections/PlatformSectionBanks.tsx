import React from "react";

export const PlatformSectionBanks = (): JSX.Element => {
  return (
    <section id="platform" className="w-full max-w-[1640px] mx-auto pr-6 md:pr-14 pl-14 md:pl-28 py-8 md:py-16" aria-label="Platform — Banks">
      <div className="flex items-center w-full">
        <div className="flex flex-col w-6 h-2 items-start pr-4">
          <div className="w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <div className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
          THE PLATFORM
        </div>
      </div>
      <h2 className="mt-4 [font-family:'Manrope',Helvetica] font-bold text-wezomcomblack text-3xl md:text-5xl lg:text-[56px] tracking-[-3px] leading-tight md:leading-[64px]">
        Enterprise Infrastructure for Proxy and Governance AI.
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ul className="space-y-4 text-wezomcomblack/90">
          <li>• Secure multi-user SaaS platform with API access.</li>
          <li>• End-to-end encryption and permissioned data sharing.</li>
          <li>• Integration with internal content libraries, risk models, and compliance dashboards.</li>
          <li>• Customizable governance templates and reporting automation.</li>
        </ul>
        <div className="min-h-[320px] rounded-2xl border border-[#afafaf60] bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <span className="text-wezomcomdove-gray">Governance analytics dashboard preview</span>
        </div>
      </div>
    </section>
  );
};

export default PlatformSectionBanks;


