import React from "react";

const problemCards = [
  {
    title: "1. Research doesn't start when it should",
    problem:
      "Analysts spend 20–30% of their time just finding and organizing information before any real analysis begins.",
    solution:
      "OWL AI surfaces relevant, organized information so analysis can start immediately.",
  },
  {
    title: "2. Too much content, not enough signal",
    problem:
      "With over 90% of the world's data created in the last two years, analysts can realistically monitor only a fraction of what matters.",
    solution:
      "AI-powered filtering and prioritization deliver only the signal that matters.",
  },
  {
    title: "3. Repetitive research drains high-value time",
    problem:
      "Up to 60–70% of an analyst's workflow is consumed by repetitive, manual research tasks that add little incremental insight.",
    solution:
      "Automate repetitive workflows so analysts focus on high-value insight generation.",
  },
  {
    title: "4. AI output you can't trust",
    problem:
      "Nearly 40% of analysts report needing to manually verify AI outputs due to accuracy or sourcing issues, negating promised efficiency gains.",
    solution:
      "Enterprise-grade, auditable AI with clear sourcing you can trust.",
  },
];

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
        {problemCards.map((card) => (
          <div
            key={card.title}
            className="pointer-events-none rounded-xl border border-[#afafaf80] bg-white shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden"
          >
            <div className="px-5 md:px-6 pt-5 md:pt-6 pb-5 md:pb-6 flex flex-col flex-1">
              <div className="[font-family:'Manrope',Helvetica] text-lg md:text-xl font-bold text-black mb-3">
                {card.title}
              </div>
              <div className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomblack mb-2 uppercase">
                Problem
              </div>
              <div className="[font-family:'Manrope',Helvetica] text-sm font-normal text-wezomcomblack/80 leading-5">
                <span className="text-black">{card.problem}</span>
              </div>
            </div>
            <div className="mt-auto bg-[#246193] px-5 md:px-6 py-4 md:py-5 h-[100px] md:h-[110px] flex flex-col justify-center flex-shrink-0">
              <div className="[font-family:'Manrope',Helvetica] text-xs font-semibold text-white/90 uppercase tracking-wider mb-1.5">
                Solution
              </div>
              <div className="[font-family:'Manrope',Helvetica] text-sm font-normal text-white leading-5">
                {card.solution}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
