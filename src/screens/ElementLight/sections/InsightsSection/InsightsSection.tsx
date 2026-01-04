import { ChevronRightIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const InsightsSection = (): JSX.Element => {
  const phases = [
    "SOFTWARE",
    "AI & IOT",
    "E-COMMERCE",
    "QA",
    "ENERGY, OIL & GAS",
  ];

  const [active, setActive] = useState<string>(phases[0]);
  const activeIndex = useMemo(() => phases.findIndex((p) => p === active), [active, phases]);
  const orderNumber = `${String(activeIndex + 1).padStart(2, "0")}/`;

  return (
    <Card className="w-full bg-black rounded-3xl">
      <CardContent className="p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          {/* Left label + title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="w-6 h-2 flex items-center justify-center mr-4">
                <div className="w-2 h-2 bg-white rounded" />
              </div>
              <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-white text-xs md:text-[13px] leading-4">
                AGILE PROJECT MANAGEMENT
              </span>
            </div>
            <h2 className="mt-3 [font-family:'Manrope',Helvetica] font-bold text-white text-3xl md:text-5xl lg:text-[57.6px] leading-tight tracking-[-3.2px]">
              How we build the
              <br />
              software development
              <br />
              process
            </h2>
          </div>

          {/* Right blurb + CTA */}
          <div className="flex-1 max-w-xl">
            <p className="text-gray-300 [font-family:'Manrope',Helvetica] text-sm md:text-base leading-7">
              We’ll turn your custom tech solutions into powerful brands by crafting unique
              customer experiences at every digital touchpoint.
            </p>
            <Button className="mt-4 inline-flex items-center gap-3 rounded-[40px] bg-[#553194] px-6 py-2">
              <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-white text-sm md:text-[14.4px]">
                HOW WE WORK
              </span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 pt-6 border-t border-white/40 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Left nav */}
          <nav aria-label="Phases" className="-mx-2 lg:mx-0 overflow-x-auto lg:overflow-visible">
            <ul className="flex lg:block gap-2 lg:gap-3">
              {phases.map((phase) => (
                <li key={phase} className="flex-shrink-0 lg:flex-shrink">
                  <button
                    type="button"
                    onClick={() => setActive(phase)}
                    className={`cursor-target group inline-flex lg:block items-center lg:items-start px-2 lg:px-0 py-1.5 lg:py-2 rounded-md transition-colors ${
                      active === phase ? "text-[#553194]" : "text-gray-300 hover:text-white"
                    }`}
                    aria-current={active === phase ? "true" : undefined}
                  >
                    <span
                      className={`hidden lg:inline-block w-1.5 h-6 mr-3 align-middle rounded ${
                        active === phase ? "bg-[#553194]" : "bg-transparent"
                      }`}
                    />
                    <span className="[font-family:'Manrope',Helvetica] font-bold text-sm lg:text-[14.4px] leading-5">
                      {phase}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            {/* Visual */}
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              <div className="aspect-square w-[300px] md:w-[340px] rounded-2xl overflow-hidden bg-white/5">
                <img src="/component-3-44.svg" alt="Phase visual" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Title/number */}
            <div className="order-1 md:order-2">
              <div className="[font-family:'Manrope',Helvetica] font-bold text-[#553194] text-4xl md:text-[72px] leading-none">
                {orderNumber}
              </div>
              <h3 className="mt-3 [font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl md:text-[32px] leading-tight">
                {active}
              </h3>
              <p className="mt-3 text-gray-300 [font-family:'Manrope',Helvetica] text-sm md:text-base leading-7 max-w-prose">
                Best-practice approach with discovery, design, engineering and validation tailored to
                your business domain. Our team orchestrates delivery with CI/CD, QA automation and
                observability baked in.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
