import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { sendAdminNotification, sendClientConfirmation } from "../../lib/emailjs";
import { supabase } from "../../lib/supabase";
import TargetCursor from "../../components/ui/target-cursor";

interface FormData {
  name: string;
  email: string;
  company: string;
  title: string;
  phone: string;
  problems: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

export const DemoPage = ({ loadingComplete = false }: { loadingComplete?: boolean }): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    title: "",
    phone: "",
    problems: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  // Logo scroll animation - same logic as landing page
  useEffect(() => {
    const logo = logoRef.current;
    const logoContainer = logoContainerRef.current;
    if (!logo || !logoContainer) return;

    // Initialize logo container position
    gsap.set(logoContainer, {
      x: 0,
      y: 0,
    });

    // Initialize logo styling
    if (logo) {
      gsap.set(logo, {
        opacity: 1,
      });
    }

    // GSAP animation for logo hide/show on scroll
    let lastScrollY = window.scrollY;
    let isHidden = false;
    let scrollTimeout: number | null = null;

    const handleScroll = () => {
      if (!logoContainer) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // If scrolling down and scrolled past threshold, hide logo
      if (scrollingDown && currentScrollY > 50 && !isHidden) {
        gsap.to(logoContainer, {
          y: -100,
          duration: 0.5,
          ease: "power2.inOut",
          overwrite: true,
        });
        isHidden = true;
      }
      // If scrolling up or at top, show logo
      else if ((!scrollingDown || currentScrollY <= 50) && isHidden) {
        gsap.to(logoContainer, {
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
          overwrite: true,
        });
        isHidden = false;
      }

      lastScrollY = currentScrollY;

      // Set timeout to handle scroll end - show logo if near top
      scrollTimeout = window.setTimeout(() => {
        if (currentScrollY <= 50 && logoContainer && isHidden) {
          gsap.to(logoContainer, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: true,
          });
          isHidden = false;
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Save to Supabase first
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('owl_ai_demo_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          title: formData.title || null,
          phone: formData.phone || null,
          problems: formData.problems || null,
        })
        .select();

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        // Continue with email sending even if Supabase fails
      }

      // Prepare data for emailjs - matching Get in Touch form pattern exactly
      const emailData = {
        name: formData.name,
        email: formData.email,
        telephone: formData.phone || "",
        company: formData.company || "",
        title: formData.title || "",
      };

      // Send emails via EmailJS (same pattern as Get in Touch form)
      Promise.all([
        sendAdminNotification(emailData),
        sendClientConfirmation(emailData)
      ]).catch(err => {
        console.warn('Email sending failed (non-critical):', err);
      });

      // Small delay to ensure emails start sending before redirect
      await new Promise(resolve => setTimeout(resolve, 300));

      // Redirect to success page with user data
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        title: formData.title || "",
      });
      window.location.href = `/demo-success?${params.toString()}`;
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Logo scroll animation - same logic as landing page
  useEffect(() => {
    const logo = logoRef.current;
    const logoContainer = logoContainerRef.current;
    if (!logo || !logoContainer) return;

    // GSAP animation for logo hide/show based on scroll
    let lastScrollY = window.scrollY;
    let isHidden = false;
    let scrollTimeout: number | null = null;

    const handleScroll = () => {
      if (!logoContainer) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // If scrolling down and scrolled past threshold, hide logo
      if (scrollingDown && currentScrollY > 50 && !isHidden) {
        gsap.to(logoContainer, {
          y: -100,
          duration: 0.5,
          ease: "power2.inOut",
          overwrite: true,
        });
        isHidden = true;
      }
      // If scrolling up or at top, show logo
      else if ((!scrollingDown || currentScrollY <= 50) && isHidden) {
        gsap.to(logoContainer, {
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
          overwrite: true,
        });
        isHidden = false;
      }

      lastScrollY = currentScrollY;

      // Set timeout to handle scroll end - show logo if near top
      scrollTimeout = window.setTimeout(() => {
        if (currentScrollY <= 50 && logoContainer && isHidden) {
          gsap.to(logoContainer, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: true,
          });
          isHidden = false;
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialize logo styling
    if (logo) {
      logo.style.mixBlendMode = "difference";
      gsap.set(logo, {
        filter: "none",
        opacity: 1,
      });
    }

    // Initialize logo container position
    if (logoContainer) {
      gsap.set(logoContainer, {
        x: 0,
        y: 0,
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-white overflow-x-hidden min-h-screen">
      <TargetCursor spinDuration={6} hideDefaultCursor={true} />
      
      {/* Header with Logo */}
      <div
        ref={logoContainerRef}
        className="fixed top-6 sm:top-7 md:top-8 left-6 md:left-14 z-50 pointer-events-none"
      >
        <a href="/" className="cursor-target">
          <img
            ref={logoRef}
            src="/photo logos hero/cropped-OWL-AI-white.png"
            alt="OWL AI Logo"
            className="h-11 sm:h-12 md:h-14 w-auto brightness-0 cursor-pointer pointer-events-auto hover:opacity-80 transition-opacity duration-300"
            style={{
              mixBlendMode: "difference",
              filter: "none",
              willChange: "mix-blend-mode, filter, opacity",
            }}
          />
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full items-center justify-start pt-20 pb-20 px-6 md:px-14 h-screen">
        {/* Title Section */}
        <div className="w-full text-center mb-8 md:mb-12">
          <h1
            ref={titleRef}
            className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 [font-family:'Manrope',Helvetica]"
          >
            Request a Free Demo
          </h1>
        </div>

        {/* Form Container */}
        <div
          ref={formContainerRef}
          className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10 lg:p-12"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Name and Company - Side by Side */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Name - Required */}
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-black mb-2 [font-family:'Manrope',Helvetica]"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Company - Required */}
              <div className="flex-1">
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-black mb-2 [font-family:'Manrope',Helvetica]"
                >
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                    errors.company ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
                  placeholder="Enter your company name"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">
                    {errors.company}
                  </p>
                )}
              </div>
            </div>

            {/* Email - Required */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-black mb-2 [font-family:'Manrope',Helvetica]"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Title and Phone Number - Side by Side */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Title - Optional */}
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-black mb-2 [font-family:'Manrope',Helvetica]"
                >
                  Title <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
                  placeholder="Enter your job title"
                />
              </div>

              {/* Phone - Optional */}
              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-black mb-2 [font-family:'Manrope',Helvetica]"
                >
                  Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Problems/Challenges - Optional */}
            <div>
              <label
                htmlFor="problems"
                className="block text-sm font-semibold text-black mb-2 [font-family:'Manrope',Helvetica]"
              >
                Tell us about your challenges <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <p className="text-xs text-gray-500 mb-3 [font-family:'Manrope',Helvetica]">
                Describe the problems or challenges you're looking to solve with OWL AI...
              </p>
              <textarea
                id="problems"
                name="problems"
                value={formData.problems}
                onChange={handleChange}
                rows={4}
                className="cursor-target w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500 resize-none"
                placeholder="Describe the problems or challenges you're looking to solve with OWL AI..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-target w-full h-12 md:h-14 px-8 md:px-10 rounded-xl bg-black text-white font-semibold text-base md:text-lg hover:bg-black hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === "error" && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-800 text-sm [font-family:'Manrope',Helvetica] font-semibold">
                  ✗ Something went wrong. Please try again or contact us directly.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <a
            href="/"
            className="cursor-target inline-flex items-center text-[#246193] hover:text-black transition-colors duration-300 [font-family:'Manrope',Helvetica] font-semibold"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;

