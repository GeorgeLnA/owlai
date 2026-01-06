import React, { useEffect, useState } from "react";
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
    quote: "OWL's partnership approach to making insights available for our customers is truly unique. OWL has understood our specific needs and those of our customers and helped deliver accessible and useful data.",
    author: "Marshall Smith, CIPM",
    company: "Chief Operating Officer | FirstRate"
  },
  {
    quote: "10x faster insight generation with enterprise-grade security.",
    author: "Head of Research",
    company: "Hedge Fund"
  },
  {
    quote: "OWL's data-based research and fundamental insights allow us to enhance our investment solutions.",
    author: "Shoichiro Aoyama",
    company: "Fund Manager, Index Solution Group | Asset Management One Co.,Ltd."
  },
  {
    quote: "Finally, AI that understands financial nuance and compliance.",
    author: "Chief Investment Officer",
    company: "Pension Fund"
  },
  {
    quote: "WisdomTree leverages OWL's data as part of its ESG investment process in seeking to provide ESG ETFs that are truly impactful and sustainable. The dynamic, consensus-based approach to company ratings provided by OWL provides a level of objectivity that can serve as a true differentiator in this fast-changing space.",
    author: "Ben Wallach",
    company: "Head of Product Development & Management | WisdomTree Asset Management"
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
  const [opacity, setOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: ''
  });

  useEffect(() => {
    if (isHovered) return; // Don't auto-advance when hovered

    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setOpacity(1);
      }, 300); // Fade out duration
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleTestimonialChange = (index: number) => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setOpacity(1);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Immediately change to next testimonial when hovering out
    setOpacity(0);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setOpacity(1);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', telephone: '' });
  };

  return (
    <section
      className="flex flex-col max-w-[1640px] mx-auto w-full items-start gap-6 md:gap-10 px-6 md:px-14 py-8 md:py-16"
      aria-label="Section 5 — Results"
    >
      {/* Heading */}
      <div className="flex items-center w-full">
        <div className="flex flex-col w-6 h-2 items-start pr-4">
          <div className="w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <div className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
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
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleTestimonialChange((currentTestimonial + 1) % testimonials.length)}
          className="w-full rounded-2xl border border-[#afafaf60] bg-white/70 backdrop-blur-sm p-6 md:p-8 h-[180px] md:h-[200px] lg:h-[220px] flex items-center hover:bg-white/90 hover:border hover:border-[#afafaf90] transition-all duration-300 cursor-pointer text-left"
          aria-label="Next testimonial"
        >
          <blockquote 
            className="[font-family:'Manrope',Helvetica] text-wezomcomblack/90 text-lg leading-8 transition-opacity duration-300 ease-in-out w-full"
            style={{ opacity }}
          >
            "{testimonials[currentTestimonial].quote}"
            <span className="block mt-2 text-sm text-wezomcomdove-gray">
              — {testimonials[currentTestimonial].author}, {testimonials[currentTestimonial].company}
            </span>
          </blockquote>
        </button>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: 4 }).map((_, index) => {
            const isActive = (currentTestimonial % 4) === index;
            return (
              <button
                key={index}
                onClick={() => handleTestimonialChange(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-wezomcomblack' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-8 md:mt-12 w-full">
        <Card className="border border-[#afafaf60] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-wezomcomblack mb-6 tracking-tight [font-family:'Manrope',Helvetica]">
              Get in Touch
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm md:text-base font-semibold text-wezomcomblack [font-family:'Manrope',Helvetica]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#afafaf80] bg-white text-wezomcomblack text-sm md:text-base hover:border-wezomcomblack focus:outline-none focus:border-wezomcomblack transition-colors [font-family:'Manrope',Helvetica]"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm md:text-base font-semibold text-wezomcomblack [font-family:'Manrope',Helvetica]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#afafaf80] bg-white text-wezomcomblack text-sm md:text-base hover:border-wezomcomblack focus:outline-none focus:border-wezomcomblack transition-colors [font-family:'Manrope',Helvetica]"
                />
              </div>

              {/* Telephone Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="telephone" className="text-sm md:text-base font-semibold text-wezomcomblack [font-family:'Manrope',Helvetica]">
                  Telephone Number
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  placeholder="Enter your telephone number"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#afafaf80] bg-white text-wezomcomblack text-sm md:text-base hover:border-wezomcomblack focus:outline-none focus:border-wezomcomblack transition-colors [font-family:'Manrope',Helvetica]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-wezomcomblack text-white font-semibold text-base md:text-lg hover:bg-transparent hover:text-wezomcomblack hover:border hover:border-[#afafaf80] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg [font-family:'Manrope',Helvetica]"
              >
                Submit
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Section05_Reviews;