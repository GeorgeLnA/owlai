import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "./sections/HeroSection";
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

gsap.registerPlugin(ScrollTrigger);

export const ElementLight = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandStripRef = useRef<HTMLDivElement>(null);
  const topOverlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const demoButtonRef = useRef<HTMLAnchorElement>(null);
  const demoButtonTextRef = useRef<HTMLSpanElement>(null);
  const [videoUnmuted, setVideoUnmuted] = useState(false);
  const [showMuteButton, setShowMuteButton] = useState(true);

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

  // Track when Section01_BrandStrip reaches the top of the screen to hide mute button
  useEffect(() => {
    const brandStripElement = brandStripRef.current;
    if (!brandStripElement) return;

    let ticking = false;

    const checkScrollPosition = () => {
      const rect = brandStripElement.getBoundingClientRect();
      // Hide mute button when the top of the brand strip reaches or passes the top of the viewport
      // Show button when brand strip top is below viewport top (still in hero section)
      setShowMuteButton(rect.top > 0);
      ticking = false;
    };

    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScrollPosition);
        ticking = true;
      }
    };

    const resizeHandler = () => {
      checkScrollPosition();
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });
    // Initial check
    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // Smooth white overlay transition at top when scrolling
  useEffect(() => {
    const overlay = topOverlayRef.current;
    const logo = logoRef.current;
    const logoContainer = logoContainerRef.current;
    if (!overlay) return;

    const heroSection = document.querySelector('section');
    if (!heroSection) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "top -200px",
      end: "center top",
      scrub: 4,
      onUpdate: (self) => {
        const progress = Math.min(self.progress, 1);
        // Use smoother easing curve
        const easedProgress = progress * progress * (3 - 2 * progress); // Smoothstep function
        const opacity = easedProgress * 1.6; // Increase opacity by 60%
        const clampedOpacity = Math.min(opacity, 1); // Ensure it doesn't exceed 1
        overlay.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, ${clampedOpacity * 0.7}) 0%, rgba(0, 0, 0, ${clampedOpacity * 0.5}) 30%, rgba(0, 0, 0, ${clampedOpacity * 0.2}) 60%, rgba(0, 0, 0, 0) 75%)`;
        
        // Move logo up as overlay appears
        if (logoContainer) {
          const moveUp = easedProgress * -18; // Move up by 18px max
          logoContainer.style.transform = `translate(-50%, ${moveUp}px)`;
        }
        
        // Keep logo white with original shadows
        if (logo) {
          logo.style.filter = 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))';
        }
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="relative w-full bg-white overflow-x-hidden">
      <TargetCursor spinDuration={6} hideDefaultCursor={true} />
      
      {/* Smooth white overlay at top when scrolling */}
      <div 
        ref={topOverlayRef}
        className="fixed top-0 left-0 right-0 h-[144px] bg-transparent pointer-events-none z-40"
      ></div>
      
      {/* OWL AI Logo - Center Top */}
      <div ref={logoContainerRef} className="fixed top-8 left-1/2 z-50 pointer-events-none">
        <div className="relative">
          {/* Smooth blend backdrop */}
          <div className="absolute inset-0 bg-black/8 backdrop-blur-[120px] rounded-3xl blur-md -z-10 scale-110 mix-blend-soft-light"></div>
          <img 
            ref={logoRef}
            src="/photo logos hero/cropped-OWL-AI-white.png" 
            alt="OWL AI Logo" 
            className="h-16 md:h-20 w-auto drop-shadow-[0_0_20px_rgba(0,0,0,0.9),0_0_10px_rgba(255,255,255,0.4)] transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="flex flex-col w-full items-start">
        <div className="relative w-full">
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
            
            {/* Sound indicator - shows until Section01_BrandStrip is scrolled past */}
            {showMuteButton && (
              <div className="fixed top-4 right-4 z-30 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-2 border border-white/20">
                  <div className="text-white text-base">
                    {videoUnmuted ? "🔊" : "🔇"}
                  </div>
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="relative z-20 text-center px-4 sm:px-6 mt-40 sm:mt-56 md:mt-72 lg:mt-80">
              <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 md:mb-10 md:mb-12">Turn Every Analyst Into an Alpha Engine</h1>
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-5">
                {/* Primary CTA - Stands out more */}
                <a 
                  href="#final-cta" 
                  ref={demoButtonRef}
                  className="cursor-target inline-flex items-center justify-center h-12 sm:h-14 md:h-16 px-8 sm:px-10 md:px-12 rounded-[40px] bg-white text-black font-semibold text-base sm:text-lg md:text-xl hover:bg-gray-100 hover:scale-105 transition-transform duration-300 focus:outline-none shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
                >
                  <span ref={demoButtonTextRef} className="inline-block">Request a Demo</span>
                </a>
                {/* Secondary CTA - Outline style */}
                <a href="#platform" className="cursor-target inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 rounded-[40px] border-2 border-solid border-white text-white hover:bg-white/10 hover:border-white/80 transition-all duration-300 focus:outline-none text-sm sm:text-base">
                  See How OWL AI Fits Your Firm
                </a>
              </div>
            </div>

            {/* Social Proof - Trusted by Leading Institutions - Positioned at bottom */}
            <div ref={brandStripRef} className="absolute bottom-0 left-0 right-0 z-30">
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
