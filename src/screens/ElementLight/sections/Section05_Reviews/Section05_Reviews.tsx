import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { supabase } from "../../../../lib/supabase";
import { sendAdminNotification, sendClientConfirmation } from "../../../../lib/emailjs";

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
    quote: "The real-time data processing and AI-driven analysis have transformed how we approach market research and investment decisions.",
    author: "Sarah Chen",
    company: "Director of Research | Global Investment Advisors"
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
    company: '',
    title: '',
    phone: '',
    problems: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const { error } = await supabase
        .from('owl_ai_demo_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          title: formData.title || null,
          phone: formData.phone || null,
          problems: formData.problems.trim() || null,
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      const emailData = {
        name: formData.name,
        email: formData.email,
        telephone: formData.phone || '',
        company: formData.company || '',
        title: formData.title || '',
        problems: formData.problems.trim() || '',
      };

      Promise.all([
        sendAdminNotification(emailData),
        sendClientConfirmation(emailData)
      ]).catch(err => console.warn('Email sending failed:', err));

      setSubmitStatus({ type: 'success', message: 'Thank you! We\'ll get back to you soon.' });
      setFormData({ name: '', email: '', company: '', title: '', phone: '', problems: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', Object.keys(error || {}));
      console.error('Full error object:', JSON.stringify(error, null, 2));
      
      // Provide more helpful error messages
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (
        error?.code === 'PGRST116' ||
        error?.message?.includes('404') ||
        error?.message?.includes('does not exist') ||
        error?.message?.includes('relation')
      ) {
        errorMessage = 'Table "owl_ai_demo_requests" not found. Please verify your Supabase setup.';
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.details) {
        errorMessage = error.details;
      } else if (error?.hint) {
        errorMessage = error.hint;
      } else {
        errorMessage = 'Unable to connect to database. Please check your Supabase configuration.';
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="flex flex-col w-full items-start gap-6 md:gap-10 px-[50px] md:px-[50px] py-8 md:py-16"
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
        <Card className="border border-[#afafaf60] rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">10x</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Analyst productivity</div>
          </CardContent>
        </Card>
        <Card className="border border-[#afafaf60] rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">75%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Faster insight generation</div>
          </CardContent>
        </Card>
        <Card className="border border-[#afafaf60] rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="text-4xl font-bold text-wezomcomblack">15%</div>
            <div className="text-sm text-wezomcomdove-gray mt-1">Higher data accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Carousel */}
      <div className="mt-6 w-full">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="w-full rounded-xl border border-[#afafaf60] bg-white/70 backdrop-blur-sm p-4 sm:p-6 md:p-8 min-h-[140px] sm:h-[180px] md:h-[200px] lg:h-[220px] flex items-center hover:bg-white/90 hover:border hover:border-[#afafaf90] transition-all duration-300 text-left"
        >
          <blockquote 
            className="[font-family:'Manrope',Helvetica] text-wezomcomblack/90 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 transition-opacity duration-300 ease-in-out w-full"
            style={{ opacity }}
          >
            "{testimonials[currentTestimonial].quote}"
            <span className="block mt-2 text-xs sm:text-sm text-wezomcomdove-gray">
              — {testimonials[currentTestimonial].author}, {testimonials[currentTestimonial].company}
            </span>
          </blockquote>
        </div>
        
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

      {/* Request Demo Form */}
      <div className="mt-8 md:mt-12 w-full flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto bg-[#246193] rounded-2xl border border-[#246193]/30 shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight [font-family:'Manrope',Helvetica]">
            Test Lampost Beta for Free
          </h3>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Name and Company - Side by Side */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">{errors.name}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="company" className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                    errors.company ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
                />
                {errors.company && <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">{errors.company}</p>}
              </div>
            </div>

            {/* Email - Required */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">{errors.email}</p>}
            </div>

            {/* Title and Phone - Side by Side */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="title" className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]">
                  Title <span className="text-white/70 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your job title"
                  className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]">
                  Phone Number <span className="text-white/70 text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Problems - Optional */}
            <div>
              <label htmlFor="problems" className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]">
                What are the problems you're looking to solve with our software?{' '}
                <span className="text-white/70 text-xs font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="problems"
                name="problems"
                value={formData.problems}
                onChange={handleInputChange}
                placeholder="Describe the problems or challenges you're looking to solve with OWL AI..."
                className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
              />
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded-xl ${
                  submitStatus.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
                } [font-family:'Manrope',Helvetica] text-sm md:text-base`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-target w-full h-12 md:h-14 px-8 md:px-10 rounded-xl bg-white text-[#246193] font-semibold text-base md:text-lg hover:bg-white/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>

        {/* Separate: Book a call with Founder */}
        <div className="w-full max-w-3xl mx-auto mt-6 rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
          <p className="text-center text-wezomcomblack text-sm md:text-base mb-4 [font-family:'Manrope',Helvetica]">
            Or book a call with the Founder of this platform
          </p>
          <a
            href="https://calendly.com/aipowered-investment-research-saas/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target flex items-center justify-center w-full py-3 px-6 rounded-xl bg-[#246193] text-white font-semibold text-sm md:text-base hover:bg-[#1a4a6b] transition-colors [font-family:'Manrope',Helvetica]"
          >
            Book a call →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Section05_Reviews;