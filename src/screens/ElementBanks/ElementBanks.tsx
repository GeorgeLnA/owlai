import React, { useEffect, useRef, useState } from "react";
import TargetCursor from "../../components/ui/target-cursor";
import { BrandStripBanks } from "./sections/BrandStripBanks";
import { ProblemSectionBanks } from "./sections/ProblemSectionBanks";
import { SolutionSectionBanks } from "./sections/SolutionSectionBanks";
import { PlatformSectionBanks } from "./sections/PlatformSectionBanks";
import { ResultsSectionBanks } from "./sections/ResultsSectionBanks";
import { FinalCTABanks } from "./sections/FinalCTABanks";
import { FooterBanks } from "./sections/FooterBanks";

type ElementBanksProps = {
  loadingComplete?: boolean;
};

export const ElementBanks = ({ loadingComplete = false }: ElementBanksProps): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUnmuted, setVideoUnmuted] = useState(false);

  // Start video when loading is complete
  useEffect(() => {
    if (loadingComplete && videoRef.current) {
      const video = videoRef.current;
      video.play().catch(() => {
        // Autoplay blocked - this is expected behavior
      });
    }
  }, [loadingComplete]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setVideoUnmuted(!video.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      const tryPlay = async () => {
        try {
          await video.play();
          const fallback = document.getElementById('fallback-bg-banks');
          if (fallback) {
            fallback.classList.add('hidden');
            fallback.style.display = 'none';
          }
        } catch (e) {
          // Autoplay blocked or video failed - show fallback
          const fallback = document.getElementById('fallback-bg-banks');
          if (fallback) {
            fallback.classList.remove('hidden');
            fallback.style.display = 'block';
          }
        }
      };
      video.addEventListener('canplay', tryPlay);
      video.addEventListener('loadeddata', tryPlay);
      video.addEventListener('error', () => {
        // Video failed to load - hide video and show fallback
        const fallback = document.getElementById('fallback-bg-banks');
        if (fallback) {
          fallback.classList.remove('hidden');
          fallback.style.display = 'block';
        }
        if (video) video.style.display = 'none';
      });
      tryPlay();
      return () => {
        video.removeEventListener('canplay', tryPlay);
        video.removeEventListener('loadeddata', tryPlay);
      };
    }
  }, []);

  return (
    <div className="relative w-full bg-white overflow-x-hidden">
      <TargetCursor spinDuration={6} hideDefaultCursor={true} />
      <div className="flex flex-col w-full items-start">
        <div className="relative w-full">
          {/* Logo */}
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="relative">
              {/* Smooth blend backdrop */}
              <div className="absolute inset-0 bg-black/8 backdrop-blur-[120px] rounded-3xl blur-md -z-10 scale-110 mix-blend-soft-light"></div>
              <img 
                src="/photo logos hero/cropped-OWL-AI-white.png" 
                alt="OWL AI Logo" 
                className="h-16 md:h-20 w-auto drop-shadow-[0_0_20px_rgba(0,0,0,0.9),0_0_10px_rgba(255,255,255,0.4)]"
              />
            </div>
          </div>

          {/* Hero */}
          <section 
            className="relative w-full h-[640px] sm:h-[720px] md:h-[760px] lg:h-[800px] bg-black flex items-center justify-center overflow-hidden cursor-pointer" 
            onClick={toggleSound}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover z-0"
              autoPlay={loadingComplete}
              muted
              loop
              playsInline
              preload="auto"
              onError={(e) => {
                // Video failed to load - hide video and show fallback
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('fallback-bg-banks');
                if (fallback) {
                  fallback.classList.remove('hidden');
                  fallback.style.display = 'block';
                }
              }}
            >
              <source src="/OWLAI DEMO.mp4" type="video/mp4" />
              <source src="/OWLAI DEMO.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>

            {/* Fallback gradient */}
            <div id="fallback-bg-banks" className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0 hidden flex items-center justify-center">
              <div className="text-white/60 text-sm text-center px-4">
                <p className="mb-2">Video loading...</p>
                <p className="text-xs opacity-50">If this persists, ensure Git LFS is installed and run: git lfs pull</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/10 z-10" />

            {/* Sound indicator */}
            <div className="absolute top-4 right-4 z-30">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 border border-white/20">
                <div className="text-white text-xs">
                  {videoUnmuted ? "🔊 Click hero to mute" : "🔇 Click hero for sound"}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 sm:px-6 mt-28 sm:mt-32 md:mt-36">
              <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 md:mb-12">Automate Governance. Accelerate Research. Strengthen Compliance.</h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a href="/demo" className="cursor-target inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 rounded-[40px] bg-white text-black font-semibold transition-colors duration-300 focus:outline-none">
                  Request a Demo
                </a>
                <a href="#platform" className="cursor-target inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 rounded-[40px] border border-solid border-white text-white hover:bg-white hover:text-black transition-colors duration-300 focus:outline-none">
                  See Lampost in Action
                </a>
              </div>
            </div>
          </section>

          {/* Trust strip with heading */}
          <BrandStripBanks />

          {/* Main content */}
          <div className="relative w-full bg-white overflow-x-hidden">
            {/* Problem */}
            <ProblemSectionBanks />
            {/* Solution */}
            <SolutionSectionBanks />
            {/* Platform */}
            <PlatformSectionBanks />
            {/* Results */}
            <ResultsSectionBanks />
            {/* Final CTA */}
            <FinalCTABanks />
            {/* Footer */}
            <FooterBanks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementBanks;


