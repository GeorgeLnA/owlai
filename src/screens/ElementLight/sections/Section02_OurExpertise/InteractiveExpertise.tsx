import React, { useMemo, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

type ExpertiseCategory = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  imageSrc: string;
};

const CATEGORIES: ExpertiseCategory[] = [
  {
    id: "agents",
    title: "AI Agents Built for Finance",
    tags: [
      "FILINGS",
      "TRANSCRIPTS",
      "MARKET DATA",
      "ENTITY RESOLUTION",
      "CITATIONS",
      "GUARDRAILS",
    ],
    description:
      "Domain-trained LLMs that understand financial nuance — extracting signals, normalizing entities, and preserving auditability with citations.",
    imageSrc: "/AI Robot and Financial Tools.png",
  },
  {
    id: "integration",
    title: "Custom Integration",
    tags: [
      "S3 / DATA LAKE",
      "SNOWFLAKE",
      "FACTSET",
      "BLOOMBERG",
      "PERMISSIONS",
      "SSO",
    ],
    description:
      "Connect OWL AI to your internal systems and research stack. Respect roles, data residency, and compliance at every step.",
    imageSrc: "/ChatGPT Image Oct 16, 2025, 04_21_02 PM.png",
  },
  {
    id: "security",
    title: "Institutional-Grade Security",
    tags: [
      "PRIVATE DEPLOYMENT",
      "ENCRYPTION",
      "AUDIT LOGS",
      "PII CONTROLS",
      "MODEL ISOLATION",
      "SOC2-READY",
    ],
    description:
      "Enterprise-ready by default: private, compliant, and governed. Your data never trains public models.",
    imageSrc: "/ChatGPT Image Oct 16, 2025, 04_22_15 PM.png",
  },
];


export const InteractiveExpertise = (): JSX.Element => {
  const [activeId, setActiveId] = useState<string>("software");

  const activeCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0],
    [activeId],
  );

  return (
    <div className="w-full flex flex-col gap-8 md:gap-12">
      {/* Original expertise section */}
      <div className="w-full flex flex-col gap-4 md:gap-6">
        {/* Header (aligned left like Section 3) */}
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="flex items-center relative self-stretch w-full">
            <div className="flex flex-col w-6 h-2 items-start pl-0 pr-3 py-0 relative">
              <div className="relative w-2 h-2 bg-black rounded" />
            </div>
            <span className="w-fit [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-black text-[11px] md:text-[13px] leading-4">
              OUR EXPERTISE
            </span>
          </div>
          <h2 className="self-stretch [font-family:'Manrope',Helvetica] font-bold text-black text-[28px] md:text-[44px] leading-tight mt-[-1px]">
            {activeCategory.title}
          </h2>
        </div>

        {/* Content row */}
        <div className="w-full flex flex-col lg:flex-row items-start gap-6 md:gap-8">
          {/* Left visual moved to top */}
          <div className="hidden lg:flex flex-1 items-start justify-center pt-6">
            <div className="w-[360px] max-w-full aspect-square">
              <img
                src={activeCategory.imageSrc}
                alt={activeCategory.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="flex flex-col flex-[1.2] w-full">
            <div className="mt-1 flex flex-col divide-y divide-[#00000010]">
              {CATEGORIES.map((category, index) => {
                const isActive = activeId === category.id;
                const orderNumber = `${String(index + 1).padStart(2, "0")}/`;
                return (
                  <div key={category.id} className="py-4">
                    <button
                      type="button"
                      onClick={() => setActiveId(category.id)}
                      className="w-full text-left group"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="w-10 md:w-12 font-['IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomdove-gray text-xs md:text-sm transition-colors duration-300 group-hover:text-[#553194]">
                          {orderNumber}
                        </span>
                        <span
                          data-cursor-inline
                          className={
                            "cursor-target inline font-['Manrope',Helvetica] font-bold text-[24px] md:text-[40px] tracking-[-2px] leading-[1.05] transition-all duration-300 hover:scale-105 " +
                            (isActive ? "text-[#553194]" : "text-wezomcomblack group-hover:text-[#553194]")
                          }
                        >
                          {category.title}
                        </span>
                      </div>
                    </button>

                    {/* Expanded details */}
                    <div
                      className={
                        "pl-[48px] md:pl-[64px] overflow-hidden transition-all duration-300 " +
                        (isActive ? "max-h-[420px] opacity-100 pt-3" : "max-h-0 opacity-0")
                      }
                    >
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {category.tags.map((tag) => (
                          <Badge
                            key={`${category.id}-${tag}`}
                            variant="outline"
                            className="rounded-[999px] border-[#afafaf80] px-3 py-1 text-[12px] md:text-[13px] font-semibold"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="mt-3 max-w-[720px] text-wezomcomdove-gray text-sm md:text-base leading-6">
                        {category.description}
                      </p>

                      {/* Learn more */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          className="text-[13px] font-semibold text-wezomcomblack hover:text-[#553194] hover:underline transition-all duration-300 hover:scale-105"
                        >
                          LEARN MORE
                        </button>
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-[#553194] text-[#553194] hover:bg-[#553194] hover:border-[#553194] hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveExpertise;

