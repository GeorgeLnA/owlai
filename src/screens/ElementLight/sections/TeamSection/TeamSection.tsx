import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

// Testimonial data for mapping
const testimonials = [
  {
    id: 1,
    backgroundImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
    backgroundContent: (
      <>
        <img
          className="absolute w-[223px] h-[26px] top-[107px] left-[148px]"
          alt="Vector"
          src="/vector-13.svg"
        />
        <img
          className="absolute w-[62px] h-14 top-[92px] left-[70px]"
          alt="Vector"
          src="/vector-14.svg"
        />
      </>
    ),
    person: {
      name: "Peter Sachse",
      role: "",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      boxWidth: "w-[175px]",
    },
    quote: {
              headline: "We chose ATOMIUS amongst other",
      content:
        "companies because they provided prototypes of future systems and we had a clear understanding of what the finished…",
    },
  },
  {
    id: 2,
    backgroundImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    backgroundContent: null,
    person: {
      name: "Kyle",
      role: "DRAGI",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      boxWidth: "w-[123px]",
    },
    quote: {
      headline: "I am very satisfied wit the work",
      content:
        "process and project management. Everything was clear, on time and I had nothing specific to add. Yes, we are satisfie…",
    },
  },
  {
    id: 3,
    backgroundImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    backgroundContent: (
      <img
        className="absolute w-[242px] h-[79px] top-[74px] left-[100px]"
        alt="Mask group"
        src="/mask-group-1.png"
      />
    ),
    person: {
      name: "Daniel Mailovsky",
      role: "",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      boxWidth: "w-[196px]",
    },
    quote: {
              headline: "Thanks to ATOMIUS, our sales",
      content:
        "increased by 65% and conversions increased by 150%. The team fully developed an online store for us, with 1C and amoCRM…",
    },
  },
];

export const TeamSection = (): JSX.Element => {
  return (
    <ScrollArea className="w-full">
      <div className="flex items-start gap-6 pt-6 pb-0 px-0 relative w-full">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="flex flex-col w-[437.33px] items-start relative self-stretch border-none"
          >
            <CardContent className="flex flex-col items-start p-0 w-full">
              {/* Testimonial Image Section */}
              <div className="flex flex-col items-start pt-0 pb-6 px-0 relative self-stretch w-full">
                <div className="flex flex-col items-start relative self-stretch w-full overflow-hidden">
                  <div className="relative self-stretch w-full h-[290.55px] rounded-2xl overflow-hidden">
                    <div className="flex flex-col w-full h-[291px] items-start relative">
                      <div className="flex flex-col w-full h-[290.55px] items-center justify-center relative overflow-hidden">
                        <div className="relative w-[441.08px] h-[290.55px] ml-[-1.87px] mr-[-1.87px] bg-[url(${testimonial.backgroundImage})] bg-[100%_100%]">
                          {testimonial.backgroundContent}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Person Info Box */}
                  <div
                    className={`absolute ${testimonial.person.boxWidth} h-16 top-[227px] left-0 bg-wezomcomwhite rounded-[0px_16px_0px_16px]`}
                  >
                    <div
                      className={`flex ${testimonial.person.boxWidth} items-center relative -top-2 -left-4`}
                    >
                      <div className="inline-flex items-start pl-4 pr-0 pt-4 pb-0 relative flex-[0_0_auto]">
                        <Avatar className="w-14 h-14 rounded-2xl">
                          <AvatarImage
                            src={testimonial.person.image}
                            alt={testimonial.person.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {testimonial.person.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex pl-4 pr-0 pt-4 pb-0 relative flex-1 grow flex-col items-start">
                        <div className="flex relative self-stretch w-full flex-[0_0_auto] flex-col items-start">
                          <div className="relative self-stretch mt-[-1.00px] font-medium text-wezomcomblack text-sm tracking-[0] leading-[19.6px]">
                            {testimonial.person.name}
                          </div>
                        </div>
                        {testimonial.person.role && (
                          <div className="flex pt-0 pb-[0.8px] px-0 relative self-stretch w-full flex-[0_0_auto] mt-[-0.99px] flex-col items-start">
                            <div className="relative self-stretch mt-[-1.00px] font-medium text-wezomcomdove-gray text-xs tracking-[0] leading-[16.8px]">
                              {testimonial.person.role}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Quote Section */}
              <div className="flex flex-col items-start gap-2 relative self-stretch w-full mt-[-7.39e-13px]">
                <div className="flex flex-col items-start pl-0 pr-6 py-0 relative self-stretch w-full">
                  <div className="relative self-stretch w-full h-28">
                    <div className="absolute h-7 -top-0.5 left-[72px] font-semibold text-wezomcomblack text-xl tracking-[-0.40px] leading-7 whitespace-nowrap">
                      {testimonial.quote.headline}
                    </div>

                    <div className="absolute top-[26px] left-0 font-semibold text-wezomcomblack text-xl tracking-[-0.40px] leading-7">
                      {testimonial.quote.content.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i <
                            testimonial.quote.content.split("\n").length -
                              1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <img
                    className="absolute w-6 h-6 top-0 left-0"
                    alt="Quote icon"
                    src="/component-3.svg"
                  />
                </div>

                {/* Read More Button */}
                <div className="flex items-start relative self-stretch w-full">
                  <div className="inline-flex items-center justify-center relative">
                    <div className="inline-flex flex-col items-center relative">
                      <div className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-[13px] text-center tracking-[-0.13px] leading-[18.2px] whitespace-nowrap">
                        READ MORE
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-6 w-8 h-8 rounded-2xl border border-solid border-[#553194] p-0"
                    >
                      <img
                        className="w-3 h-3"
                        alt="Arrow icon"
                        src="/component-3-2.svg"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
