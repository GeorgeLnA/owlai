import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";

export const ContentWrapperSection = (): JSX.Element => {
  // Location badges data
  const locations = ["CHICAGO", "NEW YORK", "HOUSTON"];

  // Service tags data
  const serviceTags = [
    { id: 1, name: "IT CONSULTING" },
    { id: 2, name: "SCOPING SESSION" },
    { id: 3, name: "PRODUCT DEVELOPMENT" },
    { id: 4, name: "PRODUCT MANAGEMENT" },
    { id: 5, name: "MVP DEVELOPMENT" },
    { id: 6, name: "MAINTENANCE & SUPPORT" },
    { id: 7, name: "SAAS" },
  ];



  return (
    <section className="flex items-start relative self-stretch w-full flex-[0_0_auto]">
      {/* Section number */}
      <div className="flex flex-col w-20 items-start relative self-stretch">
        <span className="relative w-fit mt-[-1.00px] font-semibold text-gray-600 text-sm tracking-[0] leading-[15.6px] whitespace-nowrap">
          01/
        </span>
      </div>

      <div className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto]">
        {/* Title section */}
        <div className="items-start pt-0 pb-4 px-0 flex justify-center relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-start relative flex-1 grow">
            <div className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto]">
              <h2 className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-bold text-[#553194] text-[52px] tracking-[-3.12px] leading-[52px] whitespace-nowrap">
                Software
              </h2>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center relative self-stretch w-full flex-[0_0_auto] -mt-2">
          <div className="flex flex-col items-start relative flex-1 self-stretch grow">
            <div className="flex flex-col items-end pt-0 pb-2 px-0 relative self-stretch w-full flex-[0_0_auto]">
              {/* Location badges */}
              <div className="flex flex-col w-[689.33px] items-start relative flex-[0_0_auto] ml-[-8.00px]">
                <div className="flex flex-wrap w-[689.33px] items-start gap-[0px_0px] relative flex-[0_0_auto]">
                  {locations.map((location, index) => (
                    <div
                      key={`location-${index}`}
                      className="inline-flex flex-col items-start pl-2 pr-0 pt-2 pb-0 relative self-stretch flex-[0_0_auto]"
                    >
                      <Badge className="inline-flex min-h-10 items-center justify-center pt-[12.2px] pb-[12.21px] px-6 relative flex-[0_0_auto] rounded-[40px] overflow-hidden bg-[#553194]">
                        <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-white text-[13px] tracking-[0] leading-[15.6px] whitespace-nowrap">
                          {location}
                        </span>
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service tags */}
              <div className="flex flex-col w-[697.33px] items-start justify-center relative flex-[0_0_auto] ml-[-16.00px] -mt-2">
                <div className="flex flex-col max-w-[697.33px] h-[88px] items-start pl-2 pr-0 pt-2 pb-0 relative w-full">
                  <div className="relative w-[689.33px] h-20">
                    {/* First row of service tags */}
                    <div className="absolute w-[298px] h-10 top-0 left-0">
                      <div className="inline-flex flex-col h-10 items-start pl-2 pr-0 pt-2 pb-0 absolute top-0 left-0">
                        <Badge
                          variant="outline"
                          className="inline-flex min-h-8 items-center justify-center pt-[8.2px] pb-[8.21px] px-4 relative flex-[0_0_auto] mb-[-0.41px] rounded-[40px] overflow-hidden border border-solid border-[#afafaf80]"
                        >
                          <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] tracking-[0] leading-[15.6px] whitespace-nowrap">
                            {serviceTags[0].name}
                          </span>
                        </Badge>
                      </div>

                      <div className="inline-flex flex-col h-10 items-start pl-2 pr-0 pt-2 pb-0 absolute top-0 left-[141px]">
                        <Badge
                          variant="outline"
                          className="inline-flex min-h-8 items-center justify-center pt-[8.2px] pb-[8.21px] px-4 relative flex-[0_0_auto] mb-[-0.41px] rounded-[40px] overflow-hidden border border-solid border-[#afafaf80]"
                        >
                          <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] tracking-[0] leading-[15.6px] whitespace-nowrap">
                            {serviceTags[1].name}
                          </span>
                        </Badge>
                      </div>
                    </div>

                    {/* Second row of service tags */}
                    <div className="absolute w-[369px] h-10 top-0 left-[298px]">
                      <div className="inline-flex flex-col h-10 items-start pl-2 pr-0 pt-2 pb-0 absolute top-0 left-0">
                        <Badge
                          variant="outline"
                          className="inline-flex min-h-8 items-center justify-center pt-[8.2px] pb-[8.21px] px-4 relative flex-[0_0_auto] mb-[-0.41px] rounded-[40px] overflow-hidden border border-solid border-[#afafaf80]"
                        >
                          <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] tracking-[0] leading-[15.6px] whitespace-nowrap">
                            {serviceTags[2].name}
                          </span>
                        </Badge>
                      </div>

                      <div className="inline-flex flex-col h-10 items-start pl-2 pr-0 pt-2 pb-0 absolute top-0 left-[188px]">
                        <Badge
                          variant="outline"
                          className="inline-flex min-h-8 items-center justify-center pt-[8.2px] pb-[8.21px] px-4 relative flex-[0_0_auto] mb-[-0.41px] rounded-[40px] overflow-hidden border border-solid border-[#afafaf80]"
                        >
                          <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] tracking-[0] leading-[15.6px] whitespace-nowrap">
                            {serviceTags[3].name}
                          </span>
                        </Badge>
                      </div>
                    </div>

                    {/* Third row of service tags */}
                    <div className="inline-flex flex-col h-10 items-start pl-2 pr-0 pt-2 pb-0 absolute top-10 left-0">
                      <Badge
                        variant="outline"
                        className="inline-flex min-h-8 items-center justify-center pt-[8.2px] pb-[8.21px] px-4 relative flex-[0_0_auto] mb-[-0.41px] rounded-[40px] overflow-hidden border border-solid border-[#afafaf80]"
                      >
                        <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] tracking-[0] leading-[15.6px] whitespace-nowrap">
                          {serviceTags[4].name}
                        </span>
                      </Badge>
                    </div>

                    <div className="absolute w-[276px] h-10 top-10 left-[157px]">
                      <div className="inline-flex flex-col h-10 items-start pl-2 pr-0 pt-2 pb-0 absolute top-0 left-0">
                        <Badge
                          variant="outline"
                          className="inline-flex min-h-8 items-center justify-center pt-[8.2px] pb-[8.21px] px-4 relative flex-[0_0_auto] mb-[-0.41px] rounded-[40px] overflow-hidden border border-solid border-[#afafaf80]"
                        >
                          <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] tracking-[0] leading-[15.6px] whitespace-nowrap">
                            {serviceTags[5].name}
                          </span>
                        </Badge>
                      </div>

                      <div className="inline-flex flex-col h-10 items-start pl-2 pr-0 pt-2 pb-0 absolute top-0 left-[204px]">
                        <Badge
                          variant="outline"
                          className="inline-flex min-h-8 items-center justify-center pt-[8.2px] pb-[8.21px] px-4 relative flex-[0_0_auto] mb-[-0.41px] rounded-[40px] overflow-hidden border border-solid border-[#afafaf80]"
                        >
                          <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] tracking-[0] leading-[15.6px] whitespace-nowrap">
                            {serviceTags[6].name}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>



                {/* Description text */}
                <div className="flex flex-col max-w-[697.33px] h-[60.78px] items-start pl-4 pr-0 pt-4 pb-0 relative w-full">
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mb-[-0.22px]">
                    <p className="relative self-stretch mt-[-1.00px] [font-family:'Manrope',Helvetica] font-medium text-wezomcomdove-gray text-sm md:text-base tracking-[0] leading-[22.4px]">
                      Streamline all your interactions with customers through
                      the launch of an individual CRM
                      <br />
                      system made by ATOMIUS.
                    </p>
                  </div>
                </div>

                {/* CTA button */}
                <div className="flex flex-col max-w-[697.33px] h-16 items-start justify-center pt-0 pb-4 px-0 relative w-full">
                  <div className="flex flex-col max-w-[697.33px] items-start pl-4 pr-0 pt-4 pb-0 relative flex-1 w-full grow">
                    <div className="inline-flex items-center justify-center gap-[4.26e-14px] relative flex-[0_0_auto]">
                      <Button variant="link" className="p-0 h-auto">
                        <span className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] tracking-[-0.13px] leading-[18.2px] whitespace-nowrap">
                          LEARN MORE
                        </span>
                        
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
