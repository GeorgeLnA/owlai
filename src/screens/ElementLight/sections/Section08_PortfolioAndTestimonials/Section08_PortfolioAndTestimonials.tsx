import { PortfolioSection } from "../PortfolioSection";

export const Section08_PortfolioAndTestimonials = (): JSX.Element => {
  return (
    <section
      className="flex flex-col w-full items-start py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 xl:px-16"
      aria-label="Section 8 — Platform"
    >
      <div className="w-full max-w-[1640px] mx-auto">
        <PortfolioSection />
      </div>
    </section>
  );
};

export default Section08_PortfolioAndTestimonials;

