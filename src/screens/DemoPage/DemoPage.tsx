import React, { useState, useRef } from "react";
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
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [demoRequestId, setDemoRequestId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

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
    if (currentStep !== 2) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (demoRequestId) {
        await supabase
          .from('owl_ai_demo_requests')
          .update({
            title: formData.title || null,
            phone: formData.phone || null,
            problems: formData.problems.trim() || null,
          })
          .eq('id', demoRequestId);
      } else {
        const { error: supabaseError } = await supabase
          .from('owl_ai_demo_requests')
          .insert({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            title: formData.title || null,
            phone: formData.phone || null,
            problems: formData.problems.trim() || null,
          });
        if (supabaseError) console.error('Supabase error:', supabaseError);
      }

      // Prepare data for emailjs - matching Get in Touch form pattern exactly
      const emailData = {
        name: formData.name,
        email: formData.email,
        telephone: formData.phone || "",
        company: formData.company || "",
        title: formData.title || "",
        problems: formData.problems.trim() || "",
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
        problems: formData.problems.trim() || "",
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
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const goToNextStep = async () => {
    if (!validateForm()) return;
    try {
      if (demoRequestId) {
        await supabase
          .from('owl_ai_demo_requests')
          .update({
            name: formData.name,
            email: formData.email,
            company: formData.company,
          })
          .eq('id', demoRequestId);
      } else {
        const { data, error } = await supabase
          .from('owl_ai_demo_requests')
          .insert({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            title: null,
            phone: null,
            problems: null,
          })
          .select('id')
          .single();
        if (!error && data?.id) setDemoRequestId(data.id);
        if (error) console.error('Supabase save on Next:', error);
      }
    } catch (err) {
      console.error('Error saving on Next:', err);
    }
    setCurrentStep(2);
  };

  const goToPrevStep = () => setCurrentStep(1);

  return (
    <div ref={containerRef} className="relative w-full bg-white overflow-x-hidden min-h-screen">
      <TargetCursor spinDuration={6} hideDefaultCursor={true} />

      {/* Main Content */}
      <div className="flex flex-col w-full items-center justify-start pt-20 pb-20 px-6 md:px-14 h-screen">
        {/* Title Section */}
        <div className="w-full text-center mb-8 md:mb-12">
          <h1
            ref={titleRef}
            className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 [font-family:'Manrope',Helvetica]"
          >
            Test Lampost Beta for Free
          </h1>
        </div>

        {/* Form Container */}
        <div
          ref={formContainerRef}
          className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 [transition:none]"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-6 [transition:none]">
              {currentStep === 1 && (
                <>
                  <div className="flex flex-col sm:flex-row gap-6">
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
                        <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">{errors.name}</p>
                      )}
                    </div>
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
                        <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">{errors.company}</p>
                      )}
                    </div>
                  </div>
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
                      <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">{errors.email}</p>
                    )}
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="flex flex-col sm:flex-row gap-6">
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
                  <div>
                    <label
                      htmlFor="problems"
                      className="block text-sm font-semibold text-black mb-2 [font-family:'Manrope',Helvetica]"
                    >
                      What are the problems you're looking to solve with our software?{" "}
                      <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="problems"
                      name="problems"
                      value={formData.problems}
                      onChange={handleChange}
                      placeholder="Describe the problems or challenges you're looking to solve with OWL AI..."
                      className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 flex flex-wrap gap-3 [transition:none]">
              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="cursor-target flex-none h-12 md:h-14 px-6 md:px-8 rounded-xl bg-gray-200 text-black font-semibold text-base hover:bg-gray-300 focus:outline-none [font-family:'Manrope',Helvetica]"
                >
                  Back
                </button>
              )}
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="cursor-target w-full h-12 md:h-14 px-8 md:px-10 rounded-xl bg-black text-white font-semibold text-base md:text-lg hover:opacity-90 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-target w-full flex-1 min-w-0 h-12 md:h-14 px-8 md:px-10 rounded-xl bg-black text-white font-semibold text-base md:text-lg hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              )}
            </div>

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
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

