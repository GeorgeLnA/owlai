import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const ResultsSectionBanks = (): JSX.Element => {
  return (
    <section className="flex flex-col max-w-[1640px] mx-auto w-full items-start gap-6 md:gap-10 pr-6 md:pr-14 pl-14 md:pl-28 py-8 md:py-16" aria-label="Results — Banks">
      {/* Heading */}
      <div className="flex items-center w-full">
        <div className="flex flex-col w-6 h-2 items-start pr-4">
          <div className="w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <div className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
          THE RESULTS
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="border border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">90%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Faster governance report generation</div>
          </CardContent>
        </Card>
        <Card className="border border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">50%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Lower analyst time cost</div>
          </CardContent>
        </Card>
        <Card className="border border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">99%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Audit confidence</div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonial */}
      <div className="mt-6 rounded-2xl border border-[#afafaf60] bg-white/70 backdrop-blur-sm p-6 md:p-8">
        <blockquote className="[font-family:'Manrope',Helvetica] text-wezomcomblack/90 text-lg leading-8">
          “Lampost has transformed how we manage proxy research — faster, smarter, and fully audit-ready.”
          <span className="block mt-2 text-sm text-wezomcomdove-gray">— Head of Governance, Global Bank</span>
        </blockquote>
      </div>
    </section>
  );
};

export default ResultsSectionBanks;


