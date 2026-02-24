import React from "react";
import { DividerSection } from "../DividerSection";
import { useRequestForm } from "../../../../contexts/RequestFormContext";

export const Section03_CallToAction = (): JSX.Element => {
  const { openRequestForm } = useRequestForm();
  return (
    <section
      id="final-cta"
      className="w-full py-12 sm:py-16 md:py-[120px] bg-black rounded-none sm:rounded-xl mx-0"
      aria-label="Section — Final CTA"
    >
      <div className="flex flex-col w-full items-start gap-4 sm:gap-6 md:gap-10 px-[50px] sm:px-[50px] md:px-[50px]">
        <DividerSection />
        
        {/* Request a Demo Section */}
        <div className="w-full flex flex-col items-center justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24">
          <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-tight mb-4 sm:mb-6 md:mb-8 text-center px-4">
            Ready to Transform Your Research?
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 text-center max-w-2xl px-4 [font-family:'Manrope',Helvetica]">
            See how OWL AI can scale research excellence across your firm.
          </p>
          <button
            type="button"
            onClick={openRequestForm}
            className="cursor-target inline-flex items-center justify-center h-11 sm:h-12 md:h-14 lg:h-16 px-6 sm:px-8 md:px-10 lg:px-12 rounded-xl bg-white text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
          >
            Test Lampost Beta for Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section03_CallToAction;

