import { PortfolioSection } from "../PortfolioSection";

export const Section08_PortfolioAndTestimonials = (): JSX.Element => {
  return (
    <section
      className="flex flex-col max-w-[1640px] mx-auto w-full items-start gap-6 md:gap-10 px-6 md:px-14 py-8 md:py-16 mt-8 md:mt-12 lg:mt-16"
      aria-label="Section 8 — Platform"
    >
      <div className="w-full rounded-3xl md:rounded-[40px] bg-white border border-[#afafaf80] p-6 md:p-8 lg:p-10">
        <PortfolioSection />
      </div>
    </section>
  );
};

export default Section08_PortfolioAndTestimonials;

