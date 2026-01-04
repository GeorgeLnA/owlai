import React from "react";

export const PortfolioSection = (): JSX.Element => {
  return (
    <section id="platform" className="w-full">
      {/* Label */}
      <div className="flex items-center w-full -ml-10 md:-ml-24">
        <div className="flex flex-col w-6 h-2 items-start pr-4">
          <div className="w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <div className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
          THE PLATFORM
        </div>
      </div>

      <h2 className="mt-4 [font-family:'Manrope',Helvetica] font-bold text-wezomcomblack text-3xl md:text-5xl lg:text-[56px] tracking-[-3px] leading-tight md:leading-[64px]">
        Built for Scale. Designed for Analysts.
      </h2>

      {/* Two-column features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ul className="space-y-4 text-wezomcomblack/90">
          <li>• Automated content aggregation from filings, transcripts, and market data.</li>
          <li>• Research automation to generate reports, memos, and models in seconds.</li>
          <li>• Custom dashboards per fund, desk, or team.</li>
          <li>• API access for proprietary data feeds.</li>
        </ul>
        {/* Visual placeholder (screenshot/animation area) */}
        <div className="min-h-[320px] rounded-2xl border border-[#afafaf60] bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <span className="text-wezomcomdove-gray">Platform UI preview</span>
        </div>
      </div>
    </section>
  );
};
