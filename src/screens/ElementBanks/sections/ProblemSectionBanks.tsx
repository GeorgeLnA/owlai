import React from "react";

export const ProblemSectionBanks = (): JSX.Element => {
  return (
    <section className="flex flex-col max-w-[1640px] mx-auto w-full items-start gap-6 md:gap-10 pr-6 md:pr-14 pl-14 md:pl-28 py-8 md:py-16" aria-label="Problem — Banks">
      {/* Label */}
      <div className="flex items-center w-full">
        <div className="flex flex-col w-6 h-2 items-start pr-4">
          <div className="w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <div className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
          THE PROBLEM
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full lg:max-w-[1020px] items-start">
        <h2 className="[font-family:'Manrope',Helvetica] font-bold text-black text-3xl md:text-5xl lg:text-[56px] tracking-[-3px] leading-tight">
          Manual Proxy Research Slows Down Every Decision.
        </h2>
        <p className="mt-4 max-w-[70ch] [font-family:'Manrope',Helvetica] text-wezomcomblack/80 text-lg md:text-xl leading-8">
          Banks handle thousands of governance documents, filings, and disclosures every quarter. Traditional proxy research and compliance workflows are slow, fragmented, and error-prone — consuming valuable analyst time while exposing firms to operational risk.
        </p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="rounded-2xl border border-[#afafaf60] p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-3xl font-bold text-black">60%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Analyst time lost to data prep</div>
          </div>
          <div className="rounded-2xl border border-[#afafaf60] p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-3xl font-bold text-black">90%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Firms increasing AI budgets</div>
          </div>
          <div className="rounded-2xl border border-[#afafaf60] p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-3xl font-bold text-black">2x</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Growth in governance data volume</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSectionBanks;


