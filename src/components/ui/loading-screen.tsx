import React, { useState, useEffect, useRef } from "react";

type LoadingScreenProps = {
  loop?: boolean;
  onComplete?: () => void;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loop = false, onComplete }) => {
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [exitProgress, setExitProgress] = useState(0); // 0 -> 1
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let completeTimer: number | null = null;

    const startCurtainExit = () => {
      const durationMs = 1000; // slower, smoother exit
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        // Use easing for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        setExitProgress(easedProgress);
        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(step);
        } else {
          onComplete?.();
        }
      };

      rafIdRef.current = requestAnimationFrame(step);
    };

    // Fade in logo
    const fadeInDelay = setTimeout(() => {
      setLogoOpacity(1);
    }, 300);

    // After logo is shown, perform curtain-up exit
    completeTimer = window.setTimeout(() => {
      startCurtainExit();
    }, 1500); // Show logo for about 1.2 seconds

    return () => {
      clearTimeout(fadeInDelay);
      if (completeTimer) window.clearTimeout(completeTimer);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-[9998]"
      style={{
        transform: `translate3d(0, -${exitProgress * 100}%, 0)`,
        willChange: exitProgress < 1 ? "transform" : "auto",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        WebkitTransform: `translate3d(0, -${exitProgress * 100}%, 0)`,
      }}
    >
      <div className="relative w-full h-auto flex items-center justify-center">
        <img
          src="/photo logos hero/cropped-OWL-AI-white.png"
          alt="OWL AI Logo"
          className="h-16 md:h-20 lg:h-24 w-auto mx-auto transition-opacity duration-500 ease-in-out"
          style={{
            opacity: logoOpacity,
            willChange: logoOpacity < 1 ? "opacity" : "auto"
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;