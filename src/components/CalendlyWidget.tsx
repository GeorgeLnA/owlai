import React, { useEffect } from "react";

const CALENDLY_URL =
  (import.meta.env.VITE_CALENDLY_URL as string | undefined) ||
  "https://calendly.com/aipowered-investment-research-saas/30min";

export function CalendlyWidget(): JSX.Element {
  useEffect(() => {
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

  const widgetUrl = CALENDLY_URL.includes("?")
    ? `${CALENDLY_URL}&hide_landing_page_details=1&hide_gdpr_banner=1`
    : `${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1`;

  return (
    <div className="w-full">
      <style>{`
        .calendly-inline-widget { padding: 0 !important; }
        .calendly-inline-widget > div { padding: 0 !important; margin: 0 !important; }
      `}</style>
      <div
        className="calendly-inline-widget min-w-[320px] w-full h-[700px] rounded-xl overflow-hidden"
        data-url={widgetUrl}
        style={{ padding: 0 }}
      />
    </div>
  );
}
