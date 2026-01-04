import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card } from "../../../../components/ui/card";

export const ServicesSection = (): JSX.Element => {
  // Define service cards data for easier mapping
  const serviceCards = [
    {
      id: 1,
      icon: "/component-3-27.svg",
      label: "[PYTHON DEVELOPMENT\nTEAM]",
      position: { row: 1, col: 1 },
    },
    {
      id: 2,
      icon: "/component-3-11.svg",
      label: "[SCALA]",
      position: { row: 1, col: 2 },
    },
    {
      id: 3,
      icon: "/component-3-28.svg",
      label: "[JAVA]",
      position: { row: 1, col: 3 },
    },
    {
      id: 4,
      icon: "/component-3-23.svg",
      label: "[NODE.JS]",
      position: { row: 2, col: 1 },
    },
    {
      id: 5,
      icon: "/component-3-20.svg",
      label: "[PHP]",
      position: { row: 2, col: 2 },
    },
  ];

  return (
    <section className="flex flex-col gap-4 lg:gap-6 w-full">
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="font-semibold text-wezomcomblack text-2xl lg:text-4xl tracking-[-1.44px] leading-[43.2px] [font-family:'Manrope',Helvetica]">
          Back-End
        </h2>
        <div className="ml-0 sm:ml-2">
          <Badge
            variant="outline"
            className="rounded-2xl border-[#7d838780] px-2 py-1 lg:py-[5.5px]"
          >
            <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs lg:text-[13px] leading-[13px]">
              55 DEVELOPERS
            </span>
          </Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 max-w-[914px]">
        {serviceCards.map((card) => (
                      <Card key={card.id} className="bg-gray-100 rounded-2xl border-none">
            <div className="flex items-center justify-between px-4 lg:px-6 py-2 lg:py-4">
              <div className="flex w-12 lg:w-16 h-12 lg:h-16 items-center justify-center">
                <div className="rounded-lg overflow-hidden">
                  <div className="w-12 lg:w-16 h-12 lg:h-16 overflow-hidden relative">
                    {card.id === 3 || card.id === 4 || card.id === 5 ? (
                      <img
                        className="w-12 lg:w-16 h-12 lg:h-16"
                        alt={`${card.label} icon`}
                        src={card.icon}
                      />
                    ) : (
                      <img
                        className="absolute w-24 lg:w-36 h-24 lg:h-36 -top-6 lg:-top-10 -left-6 lg:-left-10"
                        alt={`${card.label} icon`}
                        src={card.icon}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomdove-gray text-xs lg:text-[13px] leading-[15.6px] whitespace-pre-line">
                  {card.label}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
