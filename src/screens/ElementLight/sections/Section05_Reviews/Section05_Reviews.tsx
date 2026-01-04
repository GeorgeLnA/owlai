import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";

type Testimonial = {
  quote: string;
  author: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "OWL AI has become the backbone of our research function.",
    author: "Director",
    company: "Global Asset Management Firm"
  },
  {
    quote: "10x faster insight generation with enterprise-grade security.",
    author: "Head of Research",
    company: "Hedge Fund"
  },
  {
    quote: "Finally, AI that understands financial nuance and compliance.",
    author: "Chief Investment Officer",
    company: "Pension Fund"
  },
  {
    quote: "Seamless integration with our existing data infrastructure.",
    author: "CTO",
    company: "Asset Management"
  },
  {
    quote: "Our analysts can now focus on alpha generation, not data collection.",
    author: "Portfolio Manager",
    company: "Investment Firm"
  }
];

export const Section05_Reviews = (): JSX.Element => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="flex flex-col max-w-[1640px] mx-auto w-full items-start gap-6 md:gap-10 pr-6 md:pr-14 pl-14 md:pl-28 py-8 md:py-16"
      aria-label="Section 5 — Results"
    >
      {/* Heading */}
      <div className="flex items-center w-full">
        <div className="flex flex-col w-6 h-2 items-start pr-4">
          <div className="w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <div className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
          THE RESULTS
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="border border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">10x</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Analyst productivity</div>
          </CardContent>
        </Card>
        <Card className="border border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">75%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Faster insight generation</div>
          </CardContent>
        </Card>
        <Card className="border border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">15%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Higher data accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Carousel */}
      <div className="mt-6 w-full">
        <div className="rounded-2xl border border-[#afafaf60] bg-white/70 backdrop-blur-sm p-6 md:p-8 min-h-[120px] flex items-center">
          <blockquote className="[font-family:'Manrope',Helvetica] text-wezomcomblack/90 text-lg leading-8 transition-opacity duration-500">
            "{testimonials[currentTestimonial].quote}"
            <span className="block mt-2 text-sm text-wezomcomdove-gray">
              — {testimonials[currentTestimonial].author}, {testimonials[currentTestimonial].company}
            </span>
          </blockquote>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentTestimonial ? 'bg-wezomcomblack' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section05_Reviews;