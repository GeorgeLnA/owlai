import { PortfolioSection } from "../PortfolioSection";

export const Section08_PortfolioAndTestimonials = (): JSX.Element => {
  return (
    <section
      className="flex flex-col max-w-[1640px] mx-auto w-full items-start gap-6 md:gap-10 pr-6 md:pr-14 pl-14 md:pl-28 py-8 md:py-16"
      aria-label="Section 8 — Blog / Insights"
    >
      <PortfolioSection />
    </section>
  );
};

export default Section08_PortfolioAndTestimonials;

