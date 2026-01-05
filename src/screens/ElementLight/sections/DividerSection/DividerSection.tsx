import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";

export const DividerSection = (): JSX.Element => {
  // Expanded, detailed case studies
  const caseStudies = [
    {
      id: 1,
      category: "AI RESEARCH AUTOMATION",
      title: "Global Asset Management: Research Intelligence Platform",
      description:
        "OWL AI-powered research automation that processes filings, transcripts, and market data to generate actionable insights for portfolio managers.",
      imageUrl:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
      videoUrl: "/20250808_0303_Evening Data Focus_remix_01k23pq2eve6yajgmzsegw2kd4.mp4",
      tags: ["AI AUTOMATION", "RESEARCH", "INSIGHTS"],
      metrics: [
        { value: "10x", label: "Analyst productivity" },
        { value: "75%", label: "Faster insight generation" },
      ],
    },
    {
      id: 2,
      category: "RISK MANAGEMENT",
      title: "Hedge Fund: Real-Time Risk Monitoring",
      description:
        "Advanced risk detection and compliance monitoring using OWL AI to analyze market conditions, position changes, and regulatory requirements.",
      imageUrl:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      videoUrl: "/20250808_0312_Intense Business Meeting_remix_01k23q7k80fd8sptzcz0sb2h8k.mp4",
      tags: ["RISK MANAGEMENT", "COMPLIANCE", "MONITORING"],
      metrics: [
        { value: "15%", label: "Higher data accuracy" },
        { value: "-40%", label: "Risk detection time" },
      ],
    },
    {
      id: 3,
      category: "INSTITUTIONAL INTEGRATION",
      title: "Pension Fund: Custom Research Workflow",
      description:
        "Seamless integration with existing data infrastructure, enabling automated research workflows and custom reporting for institutional clients.",
      imageUrl:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      videoUrl: "/20250808_0310_Dynamic Code Generation_simple_compose_01k23q2aw3ed88rtg3kd2emr5v.mp4",
      tags: ["INTEGRATION", "WORKFLOW", "REPORTING"],
      metrics: [
        { value: "+85%", label: "Research efficiency" },
        { value: "-60%", label: "Manual data collection" },
      ],
    },
  ];

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8 md:gap-12">
        {caseStudies.map((cs, idx) => (
          <div
            key={cs.id}
            className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] rounded-3xl overflow-hidden"
          >
            {/* Background media */}
            {cs.videoUrl ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={cs.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${cs.imageUrl})` }}
                aria-hidden="true"
              />
            )}

            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

            {/* Content anchored to bottom */}
            <div className="absolute inset-x-0 bottom-0 z-10">
              <div className="max-w-[1640px] mx-auto px-4 md:px-10 pb-10 md:pb-14 lg:pb-16">
                <div className="w-full lg:w-[720px]">
                  {/* Title */}
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-wezomcomwhite text-4xl md:text-5xl lg:text-[64px] leading-tight md:leading-[64px] tracking-[-3.2px]">
                    {idx === 0 ? `${cs.title.split(":")[0]}:` : cs.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-wezomcomoslo-gray text-base md:text-lg leading-7 [font-family:'Manrope',Helvetica] max-w-[56ch]">
                    {cs.description}
                  </p>

                  {/* Metrics */}
                  {cs.metrics?.length ? (
                    <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
                      {cs.metrics.map((m, mIdx) => (
                        <div
                          key={`${cs.id}-metric-${mIdx}`}
                          className="pl-4 border-l-4 border-[#60a5fa]"
                        >
                          <div className="[font-family:'Manrope',Helvetica] font-bold text-wezomcomwhite text-2xl md:text-3xl">
                            {m.value}
                          </div>
                          <div className="text-wezomcomoslo-gray text-xs md:text-sm [font-family:'Manrope',Helvetica] mt-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* CTA */}
                  <div className="mt-8">
                    <Button
                      variant="outline"
                      className="h-12 px-8 rounded-[40px] border border-solid border-[#60a5fa] bg-transparent hover:bg-[#60a5fa20]"
                    >
                      <span className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomwhite text-base tracking-[-0.16px] leading-[22.4px]">
                        VIEW CASE
                      </span>
                      <ArrowRightIcon className="ml-4 w-4 h-4 text-wezomcomwhite" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
