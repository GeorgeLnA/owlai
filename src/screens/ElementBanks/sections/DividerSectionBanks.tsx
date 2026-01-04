import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

export const DividerSectionBanks = (): JSX.Element => {
  // Expanded, detailed case studies for banks
  const caseStudies = [
    {
      id: 1,
      category: "PROXY RESEARCH AUTOMATION",
      title: "Global Bank: Automated Proxy Voting Research",
      description:
        "OWL AI-powered proxy research automation that processes governance documents, filings, and ESG reports to generate comprehensive voting recommendations for institutional clients.",
      imageUrl:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
      videoUrl: "/20250808_0303_Evening Data Focus_remix_01k23pq2eve6yajgmzsegw2kd4.mp4",
      tags: ["PROXY RESEARCH", "GOVERNANCE", "AUTOMATION"],
      metrics: [
        { value: "90%", label: "Faster report generation" },
        { value: "50%", label: "Lower analyst time cost" },
      ],
    },
    {
      id: 2,
      category: "COMPLIANCE MONITORING",
      title: "Investment Bank: Real-Time Regulatory Compliance",
      description:
        "Advanced compliance monitoring using OWL AI to analyze regulatory changes, track governance requirements, and ensure audit-ready documentation across all banking operations.",
      imageUrl:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      videoUrl: "/20250808_0312_Intense Business Meeting_remix_01k23q7k80fd8sptzcz0sb2h8k.mp4",
      tags: ["COMPLIANCE", "REGULATORY", "MONITORING"],
      metrics: [
        { value: "99%", label: "Audit confidence" },
        { value: "-60%", label: "Compliance review time" },
      ],
    },
    {
      id: 3,
      category: "GOVERNANCE INTEGRATION",
      title: "Regional Bank: Enterprise Governance Platform",
      description:
        "Comprehensive governance platform integration that connects internal systems, external data sources, and regulatory databases to provide unified governance intelligence for banking operations.",
      imageUrl:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      videoUrl: "/20250808_0318_Intense Business Meeting_remix_01k23q7k80fd8sptzcz0sb2h8k.mp4",
      tags: ["GOVERNANCE", "INTEGRATION", "PLATFORM"],
      metrics: [
        { value: "75%", label: "Faster governance insights" },
        { value: "+40%", label: "Process efficiency" },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full items-start gap-8 md:gap-12 relative self-stretch">
      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {caseStudies.map((study) => (
          <div
            key={study.id}
            className="flex flex-col items-start gap-4 relative self-stretch w-full bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
          >
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                {study.category}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg md:text-xl leading-tight">
              {study.title}
            </h3>

            {/* Description */}
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              {study.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-4 pt-2">
              {study.metrics.map((metric, index) => (
                <div key={index} className="flex flex-col items-start">
                  <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-bold text-white text-lg">
                    {metric.value}
                  </span>
                  <span className="text-white/60 text-xs">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Video Preview */}
            <div className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden bg-black/20">
              <video
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={study.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <ArrowRightIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* View Case Button */}
            <Button
              variant="outline"
              className="w-full rounded-[20px] border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-sm">
                VIEW CASE
              </span>
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
