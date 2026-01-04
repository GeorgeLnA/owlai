import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../components/ui/accordion";

export const FAQSection = (): JSX.Element => {
  const faqs = [
    {
      id: "faq-1",
      q: "Does Wezom cover all software development life-cycle (SDLC) phases?",
      a: "Providing end-to-end workflows with full SDLC handling is one of the main takeaways of our software development company. With over 275 highly skilled IT specialists — consultants, architects, programmers, data experts, cybersecurity specialists, DevOps experts, and QA professionals — we can safely and flexibly manage each project aspect, from discovery and requirements forming to software design, development, deployment, and ongoing support.",
    },
    { id: "faq-2", q: "How quickly can Wezom deliver a custom software solution?", a: "Timelines depend on scope and complexity. We start with a short discovery and planning phase to provide a clear, realistic delivery schedule and milestones." },
    { id: "faq-3", q: "How does Wezom guarantee the quality of new software products?", a: "We employ layered QA practices including automated and manual testing, code reviews, and CI/CD pipelines to ensure consistent product quality." },
    { id: "faq-4", q: "How much does it cost to employ Wezom's software development expertise?", a: "We tailor pricing to your project’s scope and model (fixed price, T&M, or dedicated team). After discovery, we provide a transparent proposal." },
    { id: "faq-5", q: "In which cities do you carry out the full-cycle software development?", a: "We operate globally with distributed teams and deliver projects remotely, ensuring reliable communication and on-time delivery." },
  ];

  return (
    <section className="flex flex-col gap-4 w-full">
      {/* Header formatted like other sections with top-right CTA */}
      <div className="relative w-full">
        {/* GET IN TOUCH badge positioned at the very top */}
        <div className="absolute top-0 right-0 z-10">
          <Badge className="rounded-[40px] border border-solid border-[#7d838780] px-4 py-2">
            <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-[15.6px]">
              GET IN TOUCH
            </span>
          </Badge>
        </div>

        <div className="flex items-start justify-between w-full">
          <div className="flex-1 min-w-0">
            <div className="flex items-center w-full">
              <div className="flex flex-col w-6 h-2 items-start pr-4">
                <div className="w-2 h-2 bg-wezomcomblack rounded" />
              </div>
              <div className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
                FAQ
              </div>
            </div>
            <h2 className="mt-2 [font-family:'Manrope',Helvetica] font-bold text-wezomcomblack text-3xl md:text-5xl lg:text-[64px] tracking-[-3.2px] leading-tight md:leading-[64px]">
              Common questions from our clients
            </h2>
            <p className="mt-1 [font-family:'Manrope',Helvetica] text-wezomcomdove-gray text-sm md:text-base leading-6">
              Questions about our software development services
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mt-4 rounded-2xl border border-[#e6e7ea] bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="p-2 md:p-4 lg:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem key={item.id} value={item.id} className={index < faqs.length - 1 ? "border-b border-[#00000010]" : ""}>
                <AccordionTrigger className="py-4 md:py-5 text-left [font-family:'Manrope',Helvetica] text-base md:text-lg font-semibold text-wezomcomblack">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="[font-family:'Manrope',Helvetica] text-wezomcomdove-gray text-sm md:text-base leading-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
