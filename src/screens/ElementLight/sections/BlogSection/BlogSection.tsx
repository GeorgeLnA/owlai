import React from "react";

export const BlogSection = (): JSX.Element => {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full">
      {/* Left rail label */}
      <div className="flex flex-col w-full lg:max-w-[340px] lg:w-[340px] items-start">
        <div className="flex items-center">
          <div className="flex flex-col w-6 h-2 items-start pr-4">
            <div className="w-2 h-2 bg-wezomcomblack rounded" />
          </div>
          <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
            THE PROBLEM
          </span>
        </div>
      </div>

      {/* Right content aligned to top */}
      <div className="flex flex-col w-full lg:max-w-[1020px] items-start">
        <h2 className="[font-family:'Manrope',Helvetica] font-bold text-black text-3xl md:text-5xl lg:text-[56px] tracking-[-3px] leading-tight">
          Manual Research Is Holding Back Your Returns.
        </h2>
        <p className="mt-4 max-w-[70ch] [font-family:'Manrope',Helvetica] text-wezomcomblack/80 text-lg md:text-xl leading-8">
          Analysts spend 80% of their time collecting and organizing information instead of generating alpha.
          Slow, fragmented workflows mean missed insights, missed opportunities, and slower growth.
        </p>

        {/* Problem cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="rounded-2xl border border-[#afafaf60] p-6 md:p-8 bg-white/70 backdrop-blur-sm flex flex-col">
            <div className="[font-family:'Manrope',Helvetica] text-xl md:text-2xl font-bold text-black mb-4">
              1. Research doesn't start when it should
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-3">
              Reality:
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-base text-wezomcomblack/80 leading-7">
              An ungodly amount of time is spent just finding, organizing, and uploading content before real analysis can begin.
            </div>
          </div>
          <div className="rounded-2xl border border-[#afafaf60] p-6 md:p-8 bg-white/70 backdrop-blur-sm flex flex-col">
            <div className="[font-family:'Manrope',Helvetica] text-xl md:text-2xl font-bold text-black mb-4">
              2. Too much content, not enough signal
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-3">
              Reality:
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-base text-wezomcomblack/80 leading-7">
              Analysts are inundated with more content than they can possibly monitor — leading to missed material information.
            </div>
          </div>
          <div className="rounded-2xl border border-[#afafaf60] p-6 md:p-8 bg-white/70 backdrop-blur-sm flex flex-col">
            <div className="[font-family:'Manrope',Helvetica] text-xl md:text-2xl font-bold text-black mb-4">
              3. Repetitive research drains high-value time
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-3">
              Reality:
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-base text-wezomcomblack/80 leading-7">
              Routine, repeated research tasks consume time that should be spent on deep thinking.
            </div>
          </div>
          <div className="rounded-2xl border border-[#afafaf60] p-6 md:p-8 bg-white/70 backdrop-blur-sm flex flex-col">
            <div className="[font-family:'Manrope',Helvetica] text-xl md:text-2xl font-bold text-black mb-4">
              4. AI output you can't trust
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-3">
              Reality:
            </div>
            <div className="[font-family:'Manrope',Helvetica] text-base text-wezomcomblack/80 leading-7">
              Analysts are stuck double-checking low-quality AI outputs.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
