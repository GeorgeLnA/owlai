import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { sendAdminNotification } from "../../lib/emailjs";
import TargetCursor from "../../components/ui/target-cursor";

interface ProblemsFormData {
  problems: string;
}

export const DemoSuccessPage = ({ loadingComplete = false }: { loadingComplete?: boolean }): JSX.Element => {
  const [problemsData, setProblemsData] = useState<ProblemsFormData>({
    problems: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  // Get user data from URL params (passed from demo page)
  const params = new URLSearchParams(window.location.search);
  const userName = params.get("name") || "";
  const userEmail = params.get("email") || "";

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

  // Animate page entrance
  useGSAP(() => {
    if (!loadingComplete) return;

    const tl = gsap.timeline();

    if (checkmarkRef.current) {
      gsap.set(checkmarkRef.current, { scale: 0, rotation: -180 });
      tl.to(checkmarkRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }

    if (titleRef.current) {
      tl.from(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    if (formContainerRef.current) {
      tl.from(
        formContainerRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }
  }, [loadingComplete]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!problemsData.problems.trim()) {
      return; // Optional field, can submit empty
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send additional information to admin
      const submissionData = {
        name: userName,
        email: userEmail,
        telephone: "Not provided",
        company: params.get("company") || "Not provided",
        title: params.get("title") || "Not provided",
        problems: problemsData.problems,
        message: `Additional information from ${userName}: ${problemsData.problems}`,
      };

      await sendAdminNotification(submissionData);

      setSubmitStatus("success");

      // Animate success
      if (formContainerRef.current) {
        gsap.fromTo(
          formContainerRef.current,
          { scale: 0.95, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }

      // Clear form
      setProblemsData({ problems: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProblemsData({ problems: value });
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
      <div className="flex flex-col w-full items-center justify-start pt-32 pb-20 px-6 md:px-14 max-w-4xl mx-auto">
        {/* Success Icon */}
        <div
          ref={checkmarkRef}
          className="mb-8 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#246193] flex items-center justify-center"
        >
          <svg
            className="w-12 h-12 md:w-16 md:h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title Section */}
        <div className="w-full text-center mb-8 md:mb-12">
          <h1
            ref={titleRef}
            className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 [font-family:'Manrope',Helvetica]"
          >
            Thank You!
          </h1>
          <p
            ref={subtitleRef}
            className="text-gray-600 text-base sm:text-lg md:text-xl [font-family:'Manrope',Helvetica] max-w-2xl mx-auto"
          >
            {userName
              ? `We've received your request, ${userName}! Our team will be in touch with you shortly.`
              : "We've received your request! Our team will be in touch with you shortly."}
          </p>
        </div>

        {/* Problems Form Container */}
        <div
          ref={formContainerRef}
          className="w-full bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10 lg:p-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6 [font-family:'Manrope',Helvetica]">
            What are the problems you're looking to solve with our software?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 [font-family:'Manrope',Helvetica]">
            Help us understand your needs better by sharing the challenges you're facing. This information will help us prepare a more tailored demo for you.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Problems Textarea */}
            <div>
              <label
                htmlFor="problems"
                className="block text-sm font-semibold text-black mb-2 [font-family:'Manrope',Helvetica]"
              >
                Tell us about your challenges <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                id="problems"
                name="problems"
                value={problemsData.problems}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#246193] focus:border-transparent transition-all duration-300 [font-family:'Manrope',Helvetica] text-black placeholder:text-gray-500 resize-none"
                placeholder="Describe the problems or challenges you're looking to solve with OWL AI..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !problemsData.problems.trim()}
                className="cursor-target w-full h-12 md:h-14 px-8 md:px-10 rounded-xl bg-black text-white font-semibold text-base md:text-lg hover:bg-black hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-800 text-sm [font-family:'Manrope',Helvetica] font-semibold">
                  ✓ Thank you for sharing! This information will help us prepare a better demo for you.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-800 text-sm [font-family:'Manrope',Helvetica] font-semibold">
                  ✗ Something went wrong. Please try again or contact us directly.
                </p>
              </div>
            )}
          </form>

          {/* Skip Option */}
          {!problemsData.problems.trim() && submitStatus === "idle" && (
            <div className="mt-6 text-center">
              <a
                href="/"
                className="cursor-target inline-flex items-center text-gray-500 hover:text-black transition-colors duration-300 [font-family:'Manrope',Helvetica] font-semibold text-sm"
              >
                Skip for now →
              </a>
            </div>
          )}
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

export default DemoSuccessPage;

