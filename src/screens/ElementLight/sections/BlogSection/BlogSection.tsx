import React from "react";

export const BlogSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start w-full">
      {/* Label and Title Section */}
      <div className="flex flex-col w-full items-start mb-6 md:mb-8">
        <div className="flex items-center mb-4 md:mb-6">
          <div className="flex flex-col w-6 h-2 items-start pr-4">
            <div className="w-2 h-2 bg-wezomcomblack rounded" />
          </div>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
            THE PROBLEM
          </span>
        </div>
        <h2 className="[font-family:'Manrope',Helvetica] font-bold text-black text-3xl md:text-5xl lg:text-[56px] tracking-[-3px] leading-tight w-full">
          Manual Research Is Holding Back Your Returns.
        </h2>
      </div>

      {/* Problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
          <div className="cursor-pointer cursor-target rounded-2xl border-2 border-[#afafaf80] px-5 md:px-6 pt-5 md:pt-6 pb-5 md:pb-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="[font-family:'Manrope',Helvetica] text-lg md:text-xl font-bold text-black mb-3">
              1. Research doesn't start when it should
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-2">
              Reality:
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm text-wezomcomblack/80 leading-5 mb-0 last:mb-0">
              <span className="text-black">Analysts spend 20–30% of their time just finding and organizing information before any real analysis begins.</span>
            </div>
          </div>
          <div className="cursor-pointer cursor-target rounded-2xl border-2 border-[#afafaf80] px-5 md:px-6 pt-5 md:pt-6 pb-5 md:pb-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="[font-family:'Manrope',Helvetica] text-lg md:text-xl font-bold text-black mb-3">
              2. Too much content, not enough signal
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-2">
              Reality:
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm text-wezomcomblack/80 leading-5 mb-0 last:mb-0">
              <span className="text-black">With over 90% of the world's data created in the last two years, analysts can realistically monitor only a fraction of what matters.</span>
            </div>
          </div>
          <div className="cursor-pointer cursor-target rounded-2xl border-2 border-[#afafaf80] px-5 md:px-6 pt-5 md:pt-6 pb-5 md:pb-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="[font-family:'Manrope',Helvetica] text-lg md:text-xl font-bold text-black mb-3">
              3. Repetitive research drains high-value time
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-2">
              Reality:
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm text-wezomcomblack/80 leading-5 mb-0 last:mb-0">
              <span className="text-black">Up to 60–70% of an analyst's workflow is consumed by repetitive, manual research tasks that add little incremental insight.</span>
            </div>
          </div>
          <div className="cursor-pointer cursor-target rounded-2xl border-2 border-[#afafaf80] px-5 md:px-6 pt-5 md:pt-6 pb-5 md:pb-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="[font-family:'Manrope',Helvetica] text-lg md:text-xl font-bold text-black mb-3">
              4. AI output you can't trust
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-2">
              Reality:
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm text-wezomcomblack/80 leading-5 mb-0 last:mb-0">
              <span className="text-black">Nearly 40% of analysts report needing to manually verify AI outputs due to accuracy or sourcing issues, negating promised efficiency gains.</span>
            </div>
          </div>
        </div>
    </section>
  );
};
