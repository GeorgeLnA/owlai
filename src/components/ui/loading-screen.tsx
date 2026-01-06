import React, { useState, useEffect, useRef } from "react";

type LoadingScreenProps = {
  loop?: boolean;
  onComplete?: () => void;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loop = false, onComplete }) => {
  const [letterStep, setLetterStep] = useState(0);
  const [exitProgress, setExitProgress] = useState(0); // 0 -> 1
  const rafIdRef = useRef<number | null>(null);

  const letters = ["O", "W", "L", "   ", "A", "I"];

  useEffect(() => {
    let loopTimer: number | null = null;
    let completeTimer: number | null = null;
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
      letterTimeouts.forEach(clearTimeout);
      letterTimeouts = [];

      setLetterStep(0);
      setExitProgress(0);

      // Letter animations
      letters.forEach((_, i) => {
        letterTimeouts.push(
          window.setTimeout(() => setLetterStep(i + 1), 200 + i * 100)
        );
      });

      const totalDuration = 200 + letters.length * 100 + 300; // letters + buffer

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
      <div className="relative w-64 h-16 flex items-center justify-center">
        {/* OWL AI */}
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
  );
};

export default LoadingScreen;