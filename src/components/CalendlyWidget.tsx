import React, { useEffect } from "react";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

export function CalendlyWidget(): JSX.Element | null {
  useEffect(() => {
    if (!CALENDLY_URL) return;
    if (document.querySelector('script[src*="calendly.com"]')) return;

    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!CALENDLY_URL) return null;

  return (
    <div className="w-full mt-10 md:mt-14">
      <h2 className="text-black text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-center [font-family:'Manrope',Helvetica]">
        Book a Call
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mb-6 text-center [font-family:'Manrope',Helvetica] max-w-xl mx-auto">
        Schedule a time that works for you to speak with our team.
      </p>
      <div
        className="calendly-inline-widget min-w-[320px] w-full h-[700px] rounded-xl overflow-hidden"
        data-url={CALENDLY_URL}
      />
    </div>
  );
}
