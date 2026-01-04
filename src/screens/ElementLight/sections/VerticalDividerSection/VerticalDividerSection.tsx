import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const VerticalDividerSection = (): JSX.Element => {
  const missionText = "Our objective is to develop a profitable and effective solution that helps clients to expand their businesses and overcome financial constraints. We are committed to exceptional service and utilizing all resources to bring the finest products & services.";

  return (
    <div className="border-b lg:border-b-0 lg:border-r border-[#afafaf80] relative self-stretch">
      <div className="flex flex-col items-start relative pt-6 pb-6 lg:pb-0 pl-0">
        <Card className="border-none shadow-none bg-transparent w-full">
          <CardContent className="flex flex-col items-start p-0 text-left">
            <div className="w-full px-4 lg:px-10 pt-6">
              <p className="[font-family:'Manrope',Helvetica] font-medium text-wezomcomdove-gray text-base lg:text-lg leading-[25.2px] max-w-prose">
                {missionText}
              </p>
            </div>

            <div className="pt-6 lg:pt-10 px-4 lg:px-10">
              <Button className="rounded-[40px] px-6 lg:px-8 py-3 lg:py-[12.8px] bg-[#553194] hover:bg-[#553194]/90">
                <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-white text-sm lg:text-base tracking-[-0.16px] leading-[22.4px]">
                  ABOUT US
                </span>
                <ArrowRightIcon className="ml-4 lg:ml-6 w-3 lg:w-4 h-3 lg:h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
