import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const SolutionSectionBanks = (): JSX.Element => {
  return (
    <section className="flex flex-col max-w-[1640px] w-full mx-auto items-start gap-8 md:gap-16 pr-6 md:pr-14 pl-14 md:pl-28 py-6 md:py-12" aria-label="Solution — Banks">
      {/* Heading */}
      <div className="flex items-center w-full">
        <div className="flex flex-col w-6 h-2 items-start pr-4">
          <div className="w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <div className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
          THE SOLUTION
        </div>
      </div>

      <h2 className="[font-family:'Manrope',Helvetica] font-bold text-black text-3xl md:text-5xl lg:text-[56px] tracking-[-3px] leading-tight">
        Governance Automation, Powered by OWL.
      </h2>
      <p className="max-w-[70ch] [font-family:'Manrope',Helvetica] text-wezomcomblack/80 text-lg md:text-xl leading-8">
        Lampost automates proxy research and governance workflows with precision AI trained on financial data. It reads, extracts, and structures insights from filings, meeting documents, and ESG reports — all verified and auditable.
      </p>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card className="border-4 border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-lg leading-tight">
              Automated Proxy Voting Research
            </div>
            <p className="mt-2 text-wezomcomdove-gray text-sm leading-6">
              Analyze filings in minutes, not hours.
            </p>
          </CardContent>
        </Card>
        <Card className="border-4 border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-lg leading-tight">
              Governance Data Extraction
            </div>
            <p className="mt-2 text-wezomcomdove-gray text-sm leading-6">
              AI identifies and structures critical data instantly.
            </p>
          </CardContent>
        </Card>
        <Card className="border-4 border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-lg leading-tight">
              Audit-Ready Workflows
            </div>
            <p className="mt-2 text-wezomcomdove-gray text-sm leading-6">
              Built for compliance, transparency, and control.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SolutionSectionBanks;


