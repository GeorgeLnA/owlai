import React from "react";

export const PortfolioSection = (): JSX.Element => {
  return (
    <section id="platform" className="w-full flex flex-col">
      {/* Header content */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full mb-8 md:mb-12">
        {/* Left rail label */}
        <div className="flex flex-col w-full lg:max-w-[340px] lg:w-[340px] items-start">
          <div className="flex items-center -ml-12 md:-ml-24">
            <div className="flex flex-col w-6 h-2 items-start pr-4">
              <div className="w-2 h-2 bg-wezomcomblack rounded" />
            </div>
            <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
              THE PLATFORM
            </span>
          </div>
        </div>

        {/* Right content aligned to top */}
        <div className="flex flex-col w-full lg:max-w-[1020px] items-start">
          <h2 className="[font-family:'Manrope',Helvetica] font-bold text-black text-3xl md:text-5xl lg:text-[56px] tracking-[-3px] leading-tight ml-4 md:ml-6 lg:ml-8">
            Built for Scale. Designed for Analysts.
          </h2>

          {/* Bullet points */}
          <ul className="mt-6 space-y-3 text-gray-500 text-sm md:text-base ml-4 md:ml-6 lg:ml-8">
            <li>• Automated content aggregation from filings, transcripts, and market data.</li>
            <li>• Research automation to generate reports, memos, and models in seconds.</li>
            <li>• Custom dashboards per fund, desk, or team.</li>
            <li>• API access for proprietary data feeds.</li>
          </ul>
        </div>
      </div>

      {/* Large Platform UI preview box - Hero style */}
      <div className="w-full min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] rounded-3xl md:rounded-[40px] border-2 border-[#afafaf80] bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 backdrop-blur-md flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden relative">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#553194]/5 via-transparent to-[#553194]/5 pointer-events-none" />
        
        <div className="text-center p-8 md:p-12 relative z-10">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">
            Platform UI preview
          </div>
          <p className="text-wezomcomdove-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Interactive dashboard and analytics interface
          </p>
        </div>
      </div>
    </section>
  );
};
