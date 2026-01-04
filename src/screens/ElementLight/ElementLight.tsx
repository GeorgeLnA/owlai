import React, { useEffect, useRef, useState } from "react";
import { HeroSection } from "./sections/HeroSection";
import { NavigationHeaderSection } from "./sections/NavigationHeaderSection";
import { Section01_BrandStrip } from "./sections/Section01_BrandStrip";
import { Section02_OurExpertise } from "./sections/Section02_OurExpertise";
import { Section03_CallToAction } from "./sections/Section03_CallToAction";
import { Section04_BlogAndStats } from "./sections/Section04_BlogAndStats";
import { Section05_Reviews } from "./sections/Section05_Reviews";
import { Section08_PortfolioAndTestimonials } from "./sections/Section08_PortfolioAndTestimonials";
import { Section09_SectionWrapper } from "./sections/Section09_SectionWrapper";
import { Section10_IntroductionAndInsights } from "./sections/Section10_IntroductionAndInsights";
import { Section11_Footer } from "./sections/Section11_Footer";
import TargetCursor from "../../components/ui/target-cursor";

export const ElementLight = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUnmuted, setVideoUnmuted] = useState(false);

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setVideoUnmuted(!video.muted);
      console.log('ElementLight: Video sound toggled, muted:', video.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log('ElementLight: Video element found, starting load...');
      video.load();
      
      // Try to play the video
      const playVideo = async () => {
        try {
          console.log('ElementLight: Attempting to play video...');
          await video.play();
          console.log('ElementLight: Video playing successfully');
          const fallback = document.getElementById('fallback-bg');
          if (fallback) fallback.style.display = 'none';
        } catch (error) {
          console.log('ElementLight: Video play failed (autoplay blocked), waiting for user interaction');
          const fallback = document.getElementById('fallback-bg');
          if (fallback) fallback.style.display = 'block';
        }
      };
      
      // Try to play when video can play
      video.addEventListener('canplay', () => {
        console.log('ElementLight: Video can play');
        playVideo();
      });
      video.addEventListener('loadeddata', () => {
        console.log('ElementLight: Video data loaded');
        playVideo();
      });
      video.addEventListener('error', (e) => {
        console.error('ElementLight: Video error:', e);
        const fallback = document.getElementById('fallback-bg');
        if (fallback) fallback.style.display = 'block';
      });
      
      // Also try immediately
      playVideo();
      
      return () => {
        video.removeEventListener('canplay', playVideo);
        video.removeEventListener('loadeddata', playVideo);
      };
    } else {
      console.log('ElementLight: Video element not found');
    }
  }, []);

  return (
    <div className="relative w-full bg-white overflow-x-hidden">
      <TargetCursor spinDuration={6} hideDefaultCursor={true} />
      
      {/* OWL AI Logo - Floating Independent Element */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <img 
          src="/cropped-OWL-AI-white.png" 
          alt="OWL AI Logo" 
          className="h-16 md:h-20 w-auto mix-blend-screen filter brightness-110 contrast-110 drop-shadow-2xl"
        />
      </div>

      <div className="flex flex-col w-full items-start">
        <div className="relative w-full">
          {/* Floating Navigation Header */}
          <NavigationHeaderSection />

          {/* Hero Section */}
          <section 
            className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden cursor-pointer" 
            onClick={toggleSound}
          >
            {/* Background Video */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover z-0"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => {
                console.log('Video can play');
                const fallback = document.getElementById('fallback-bg');
                if (fallback) fallback.style.display = 'none';
              }}
              onError={(e) => {
                console.error('Video failed to load:', e);
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('fallback-bg');
                if (fallback) fallback.style.display = 'block';
              }}
            >
              <source src="/OWLAI DEMO.mp4" type="video/mp4" />
              <source src="/OWLAI DEMO.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
            
            {/* Fallback background gradient - only show if video fails */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0" id="fallback-bg"></div>
            
            {/* Light overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-10 z-10"></div>
            
            {/* Sound indicator */}
            <div className="absolute top-4 right-4 z-30">
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-2 border border-white/20">
                <div className="text-white text-base">
                  {videoUnmuted ? "🔊" : "🔇"}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 text-center px-4 sm:px-6 mt-40 sm:mt-56 md:mt-72 lg:mt-80">
              <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 md:mb-10 md:mb-12">Turn Every Analyst Into an Alpha Engine.</h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a href="#final-cta" className="cursor-target inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 rounded-[40px] border border-solid border-white text-white hover:bg-white hover:text-black transition-colors duration-300 focus:outline-none">
                  Request a Demo
                </a>
                <a href="#platform" className="cursor-target inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 rounded-[40px] border border-solid border-white text-white hover:bg-white hover:text-black transition-colors duration-300 focus:outline-none">
                  See How OWL AI Fits Your Firm
                </a>
              </div>
            </div>

            {/* Social Proof - Trusted by Leading Institutions - Positioned at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-30">
              <Section01_BrandStrip />
            </div>
          </section>

          {/* Main Content Area */}
          <div className="relative w-full bg-white overflow-x-hidden">
            {/* Problem */}
            <Section04_BlogAndStats />

            {/* Solution */}
            <Section02_OurExpertise />

            {/* Platform */}
            <Section08_PortfolioAndTestimonials />

            {/* Results */}
            <Section05_Reviews />

            {/* Final CTA */}
            <Section03_CallToAction />

            {/* Footer */}
            <Section11_Footer />
          </div>
        </div>
      </div>


    </div>
  );
};
