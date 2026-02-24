"use client";

import React, { useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { sendAdminNotification, sendClientConfirmation } from "../../../../lib/emailjs";

type Props = { idPrefix?: string };

export const BetaTestFormBlock = ({ idPrefix = "form" }: Props): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    phone: "",
    problems: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [demoRequestId, setDemoRequestId] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = async () => {
    if (!validateForm()) return;
    try {
      if (demoRequestId) {
        await supabase
          .from("owl_ai_demo_requests")
          .update({
            name: formData.name,
            email: formData.email,
            company: formData.company,
          })
          .eq("id", demoRequestId);
      } else {
        const { data, error } = await supabase
          .from("owl_ai_demo_requests")
          .insert({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            title: null,
            phone: null,
            problems: null,
          })
          .select("id")
          .single();
        if (!error && data?.id) setDemoRequestId(data.id);
        if (error) console.error("Supabase save on Next:", error);
      }
    } catch (err) {
      console.error("Error saving on Next:", err);
    }
    setCurrentStep(2);
  };

  const goToPrevStep = () => setCurrentStep(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep !== 2) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      if (demoRequestId) {
        const { error } = await supabase
          .from("owl_ai_demo_requests")
          .update({
            title: formData.title || null,
            phone: formData.phone || null,
            problems: formData.problems.trim() || null,
          })
          .eq("id", demoRequestId);
        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }
      } else {
        const { error } = await supabase.from("owl_ai_demo_requests").insert({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          title: formData.title || null,
          phone: formData.phone || null,
          problems: formData.problems.trim() || null,
        });
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
      }

      const emailData = {
        name: formData.name,
        email: formData.email,
        telephone: formData.phone || "",
        company: formData.company || "",
        title: formData.title || "",
        problems: formData.problems.trim() || "",
      };

      Promise.all([
        sendAdminNotification(emailData),
        sendClientConfirmation(emailData),
      ]).catch((err) => console.warn("Email sending failed:", err));

      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", company: "", title: "", phone: "", problems: "" });
      setDemoRequestId(null);

      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto bg-[#246193] rounded-2xl border border-[#246193]/30 shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight [font-family:'Manrope',Helvetica]">
          Test Lampost Beta for Free
        </h3>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {currentStep === 1 && (
            <>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label
                    htmlFor={id("name")}
                    className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={id("name")}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">{errors.name}</p>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor={id("company")}
                    className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]"
                  >
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={id("company")}
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                      errors.company ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-500 [font-family:'Manrope',Helvetica]">{errors.company}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor={id("email")}
                  className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id={id("email")}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={`cursor-target w-full h-12 px-4 rounded-xl bg-white border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500`}
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
                    htmlFor={id("title")}
                    className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]"
                  >
                    Title <span className="text-white/70 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id={id("title")}
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your job title"
                    className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor={id("phone")}
                    className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]"
                  >
                    Phone Number <span className="text-white/70 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id={id("phone")}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor={id("problems")}
                  className="block text-sm font-semibold text-white mb-2 [font-family:'Manrope',Helvetica]"
                >
                  What are the problems you're looking to solve with our software?{" "}
                  <span className="text-white/70 text-xs font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id={id("problems")}
                  name="problems"
                  value={formData.problems}
                  onChange={handleInputChange}
                  placeholder="Describe the problems or challenges you're looking to solve with OWL AI..."
                  className="cursor-target w-full h-12 px-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500"
                />
              </div>
            </>
          )}

          {submitStatus.type && (
            <div
              className={`p-4 rounded-xl ${
                submitStatus.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              } [font-family:'Manrope',Helvetica] text-sm md:text-base`}
            >
              {submitStatus.message}
            </div>
          )}

          <div className="pt-4 flex flex-wrap gap-3 [transition:none]">
            {currentStep === 2 && (
              <button
                type="button"
                onClick={goToPrevStep}
                className="cursor-target flex-none h-12 md:h-14 px-6 md:px-8 rounded-xl bg-white/20 text-white font-semibold text-base hover:bg-white/30 focus:outline-none [font-family:'Manrope',Helvetica]"
              >
                Back
              </button>
            )}
            {currentStep === 1 ? (
              <button
                type="button"
                onClick={goToNextStep}
                className="cursor-target w-full h-12 md:h-14 px-8 md:px-10 rounded-xl bg-white text-[#246193] font-semibold text-base md:text-lg hover:bg-white/90 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-target w-full flex-1 min-w-0 h-12 md:h-14 px-8 md:px-10 rounded-xl bg-white text-[#246193] font-semibold text-base md:text-lg hover:bg-white/90 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            )}
          </div>
        </form>
      </div>

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
  );
};

export default BetaTestFormBlock;
