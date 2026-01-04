import React, { useState, useEffect, useRef } from "react";

type LoadingScreenProps = {
  loop?: boolean;
  onComplete?: () => void;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loop = false, onComplete }) => {
  const [frameStep, setFrameStep] = useState(0);
  const [letterStep, setLetterStep] = useState(0);
  const [exitProgress, setExitProgress] = useState(0); // 0 -> 1
  const rafIdRef = useRef<number | null>(null);

  const letters = ["O", "W", "L", " ", "A", "I"];

  useEffect(() => {
    let loopTimer: number | null = null;
    let completeTimer: number | null = null;
    let frameTimeouts: number[] = [];
    let letterTimeouts: number[] = [];

    const startCurtainExit = () => {
      const durationMs = 600; // faster, smoother exit
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        setExitProgress(progress);
        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(step);
        } else {
          onComplete?.();
        }
      };

      rafIdRef.current = requestAnimationFrame(step);
    };

    const runAnimation = () => {
      // Clear any existing timeouts
      frameTimeouts.forEach(clearTimeout);
      letterTimeouts.forEach(clearTimeout);
      frameTimeouts = [];
      letterTimeouts = [];

      setFrameStep(0);
      setLetterStep(0);
      setExitProgress(0);

      // Frame animations with shorter delays
      frameTimeouts.push(window.setTimeout(() => setFrameStep(1), 150));
      frameTimeouts.push(window.setTimeout(() => setFrameStep(2), 300));
      frameTimeouts.push(window.setTimeout(() => setFrameStep(3), 450));
      frameTimeouts.push(window.setTimeout(() => setFrameStep(4), 600));

      // Letter animations
      letters.forEach((_, i) => {
        letterTimeouts.push(
          window.setTimeout(() => setLetterStep(i + 1), 800 + i * 100)
        );
      });

      const totalDuration = 800 + letters.length * 100 + 300; // frames + letters + buffer

      if (loop) {
        loopTimer = window.setTimeout(runAnimation, totalDuration);
      } else {
        // After sequence, perform curtain-up exit once
        completeTimer = window.setTimeout(() => {
          startCurtainExit();
        }, totalDuration);
      }
    };

    runAnimation();

    return () => {
      if (loopTimer) window.clearTimeout(loopTimer);
      if (completeTimer) window.clearTimeout(completeTimer);
      frameTimeouts.forEach(clearTimeout);
      letterTimeouts.forEach(clearTimeout);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [loop, onComplete]);

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
      <div className="relative w-64 h-16">
        {/* Top Left */}
        <div className="absolute top-0 left-0">
          <div className={`w-3 h-0.5 bg-white transition-transform duration-200 ease-out ${frameStep >= 1 ? "scale-x-100" : "scale-x-0"} origin-left`} />
          <div className={`w-0.5 h-3 bg-white transition-transform duration-200 ease-out ${frameStep >= 1 ? "scale-y-100" : "scale-y-0"} origin-top`} />
        </div>
        {/* Top Right */}
        <div className="absolute top-0 right-0">
          <div className={`w-3 h-0.5 bg-white transition-transform duration-200 ease-out ${frameStep >= 2 ? "scale-x-100" : "scale-x-0"} origin-right`} />
          <div className={`w-0.5 h-3 bg-white transition-transform duration-200 ease-out ${frameStep >= 2 ? "scale-y-100" : "scale-y-0"} origin-top ml-auto`} />
        </div>
        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0">
          <div className={`w-0.5 h-3 bg-white transition-transform duration-200 ease-out ${frameStep >= 3 ? "scale-y-100" : "scale-y-0"} origin-bottom`} />
          <div className={`w-3 h-0.5 bg-white transition-transform duration-200 ease-out ${frameStep >= 3 ? "scale-x-100" : "scale-x-0"} origin-left`} />
        </div>
        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0">
          <div className={`w-0.5 h-3 bg-white transition-transform duration-200 ease-out ${frameStep >= 4 ? "scale-y-100" : "scale-y-0"} origin-bottom ml-auto`} />
          <div className={`w-3 h-0.5 bg-white transition-transform duration-200 ease-out ${frameStep >= 4 ? "scale-x-100" : "scale-x-0"} origin-right`} />
        </div>

        {/* OWL AI */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-light tracking-widest text-white">
            {letters.map((letter, i) => (
              <span
                key={i}
                className={`inline-block transition-all duration-150 ease-out ${letterStep > i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                style={{
                  willChange: letterStep <= i ? "opacity, transform" : "auto"
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;