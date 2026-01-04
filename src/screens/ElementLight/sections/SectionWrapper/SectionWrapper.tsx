import { ArrowRightIcon } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Button } from "../../../../components/ui/button";

export const SectionWrapper = (): JSX.Element => {
  // FAQ data for mapping
  const faqItems = [
    {
      id: "item-1",
      question:
        "Does Wezom cover all software development life-cycle (SDLC) phases?",
      answer:
        "Providing end-to-end workflows with full SDLC handling is one of the main takeaways of our software development company. With over 275 highly skilled IT specialists — consultants, architects, programmers, data experts, cybersecurity specialists, DevOps experts, and QA professionals — we can safely and flexibly manage each project aspect, from discovery and requirements forming to software design, development, deployment, and ongoing support.",
      isOpen: true,
    },
    {
      id: "item-2",
      question: "How quickly can Wezom deliver a custom software solution?",
      answer:
        "Timelines depend on scope and complexity. We start with a short discovery and planning phase to provide a clear, realistic delivery schedule and milestones.",
      isOpen: false,
    },
    {
      id: "item-3",
      question:
        "How does Wezom guarantee the quality of new software products?",
      answer:
        "We employ layered QA practices including automated and manual testing, code reviews, and CI/CD pipelines to ensure consistent product quality.",
      isOpen: false,
    },
    {
      id: "item-4",
      question:
        "How much does it cost to employ Wezom's software development expertise?",
      answer:
        "We tailor pricing to your project’s scope and model (fixed price, T&M, or dedicated team). After discovery, we provide a transparent proposal.",
      isOpen: false,
    },
    {
      id: "item-5",
      question:
        "In which cities do you carry out the full-cycle software development?",
      answer:
        "We operate globally with distributed teams and deliver projects remotely, ensuring reliable communication and on-time delivery.",
      isOpen: false,
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row w-full items-end justify-center gap-8 py-8 md:py-16 px-4 md:px-0">
      {/* Left Column - Heading and CTA */}
      <div className="flex flex-col w-full lg:w-1/2 max-w-[680px] items-start gap-4 lg:pr-10">
        {/* Subtitle with dot */}
        <div className="flex items-center">
          <div className="flex flex-col w-6 h-2 items-start pr-4">
            <div className="w-2 h-2 bg-wezomcomblack rounded" />
          </div>
          <div className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
            Common questions from our clients
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="[font-family:'Manrope',Helvetica] font-bold text-wezomcomblack text-3xl md:text-5xl lg:text-[64px] tracking-[-3.84px] leading-tight md:leading-[64px] max-w-[18ch]">
          Questions about our software development services
        </h2>

        {/* CTA Button */}
        <div className="pt-2">
          <Button className="h-10 md:h-12 rounded-[40px] bg-[#553194] [font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-white text-sm md:text-base tracking-[-0.16px] leading-[22.4px] px-6 md:px-8">
            GET IN TOUCH
            <div className="pl-4 md:pl-6">
              <ArrowRightIcon className="w-3 md:w-4 h-3 md:h-4" />
            </div>
          </Button>
        </div>
      </div>

      {/* Right Column - FAQ Accordion */}
      <div className="flex flex-col w-full lg:w-1/2 max-w-[680px] items-start">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
          aria-label="Frequently asked questions"
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="mt-2 overflow-hidden rounded-2xl bg-wezomcomconcrete"
            >
              <AccordionTrigger className="flex min-h-12 md:min-h-16 px-4 md:px-6 py-4 md:py-6 [font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-lg md:text-xl tracking-[-0.40px] leading-7 hover:no-underline text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6 [font-family:'Manrope',Helvetica] font-medium text-wezomcomblack text-sm leading-[19.6px]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
