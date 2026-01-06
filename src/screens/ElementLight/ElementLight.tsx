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
  const heroSectionRef = useRef<HTMLElement>(null);
  const brandStripRef = useRef<HTMLDivElement>(null);
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const topOverlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const demoButtonRef = useRef<HTMLAnchorElement>(null);
  const demoButtonTextRef = useRef<HTMLSpanElement>(null);
  const muteButtonRef = useRef<HTMLDivElement>(null);
  const [videoUnmuted, setVideoUnmuted] = useState(false);
  const [showMuteButton, setShowMuteButton] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setVideoUnmuted(!video.muted);
      console.log('ElementLight: Video sound toggled, muted:', video.muted);
    }
  };

  // Check button visibility helper function
  const checkButtonVisibility = (x: number, y: number): boolean => {
    const heroElement = heroSectionRef.current;
    const blogElement = blogSectionRef.current;
    const brandStripElement = brandStripRef.current;

    if (!heroElement || !brandStripElement) return false;

    // Check if cursor is within hero section bounds (excluding brand strip at bottom)
    const heroRect = heroElement.getBoundingClientRect();
    const brandStripRect = brandStripElement.getBoundingClientRect();
    
    // Hero section should exclude the brand strip area at the bottom
    const heroBottom = Math.min(heroRect.bottom, brandStripRect.top);
    const isInHeroSection = 
      x >= heroRect.left &&
      x <= heroRect.right &&
      y >= heroRect.top &&
      y <= heroBottom;

    // Check if cursor is over blog section
    let isOverBlog = false;
    if (blogElement) {
      const blogRect = blogElement.getBoundingClientRect();
      isOverBlog = 
        x >= blogRect.left &&
        x <= blogRect.right &&
        y >= blogRect.top &&
        y <= blogRect.bottom;
    }

    // Check if cursor is over brand strip
    const isOverBrandStrip = 
      x >= brandStripRect.left &&
      x <= brandStripRect.right &&
      y >= brandStripRect.top &&
      y <= brandStripRect.bottom;

    // Only show if: in hero section, not over blog, not over brand strip, and brand strip hasn't scrolled past
    return isInHeroSection && !isOverBlog && !isOverBrandStrip && brandStripRect.top > 0;
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
      // Recheck button visibility with current cursor position when scrolling
      if (cursorPosition.x > 0 || cursorPosition.y > 0) {
        const shouldShow = checkButtonVisibility(cursorPosition.x, cursorPosition.y);
        setShowMuteButton(shouldShow);
      } else {
        // If no cursor position yet, just check if scrolled past
        const rect = brandStripElement.getBoundingClientRect();
        if (rect.top <= 0) {
          setShowMuteButton(false);
        }
      }
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
  }, [cursorPosition]);

  // Make mute button follow cursor only on hero section
  useEffect(() => {
    if (!muteButtonRef.current || !heroSectionRef.current) return;

    const button = muteButtonRef.current;
    const brandStripElement = brandStripRef.current;

    // Initial check - hide if brand strip has already scrolled past
    if (brandStripElement) {
      const rect = brandStripElement.getBoundingClientRect();
      if (rect.top <= 0) {
        setShowMuteButton(false);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Update cursor position
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Check button visibility
      const shouldShow = checkButtonVisibility(e.clientX, e.clientY);
      setShowMuteButton(shouldShow);

      // Only move button if it should be visible
      if (!shouldShow) return;

      // Position button further to the right and up to avoid interfering with cursor
      const offsetX = 100; // Distance to the right of cursor (increased further)
      const offsetY = -60; // Distance up from cursor (increased further, negative = up)
      
      // Calculate target position relative to cursor
      const targetLeft = e.clientX + offsetX;
      const targetRight = window.innerWidth - targetLeft;
      const targetX = targetRight - 16; // Move from initial right-4 position
      const targetY = e.clientY + offsetY - 16; // Move from initial top-4 position
      
      gsap.to(button, {
        x: -targetX, // Negative because we're moving from right edge
        y: targetY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Hide button when mouse leaves the window
      setShowMuteButton(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Dynamic logo changes based on scroll position with smooth mix-blend transitions
  useEffect(() => {
    const overlay = topOverlayRef.current;
    const logo = logoRef.current;
    const logoContainer = logoContainerRef.current;
    if (!overlay || !logo) return;

    const heroSection = document.querySelector('section');
    if (!heroSection) return;

    const triggers: ScrollTrigger[] = [];

    // Function to detect background color at logo position
    const detectBackgroundColor = (element: Element): 'light' | 'dark' => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = Math.max(100, rect.top + 50); // Logo is at top, check near it
      
      const elementAtPoint = document.elementFromPoint(centerX, centerY);
      if (!elementAtPoint) return 'light';
      
      const computedStyle = window.getComputedStyle(elementAtPoint);
      const bgColor = computedStyle.backgroundColor;
      
      // Parse RGB and calculate luminance
      const rgbMatch = bgColor.match(/\d+/g);
      if (!rgbMatch || rgbMatch.length < 3) return 'light';
      
      const [r, g, b] = rgbMatch.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      return luminance > 0.5 ? 'light' : 'dark';
    };

    // Main scroll trigger for hero section transition with smooth blend mode
    const heroScrollTrigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "top -200px",
      end: "center top",
      scrub: 2, // Smoother scrubbing
      onUpdate: (self) => {
        const progress = Math.min(self.progress, 1);
        // Use smoother easing curve with cubic bezier-like easing
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        // Keep overlay transparent (no dark effect)
        overlay.style.background = 'transparent';
        
        // Move logo up as scrolling
        if (logoContainer) {
          const moveUp = easedProgress * -18; // Move up by 18px max
          logoContainer.style.transform = `translate(-50%, ${moveUp}px)`;
        }
        
        // Detect background and apply appropriate blend mode and filter
        const bgType = detectBackgroundColor(heroSection);
        const isDarkBg = bgType === 'dark' || progress < 0.4;
        
        if (isDarkBg) {
          // Over dark background: white logo with screen blend to show through
          const blendProgress = Math.min(progress / 0.4, 1);
          logo.style.mixBlendMode = 'screen';
          gsap.to(logo, {
            filter: `drop-shadow(0 0 20px rgba(0, 0, 0, ${0.9 * (1 - blendProgress * 0.3)})) drop-shadow(0 0 10px rgba(255, 255, 255, ${0.4 * (1 - blendProgress * 0.2)}))`,
            opacity: 0.9 + blendProgress * 0.1, // Slightly transparent to allow blend
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true
          });
        } else {
          // Transition to multiply for light backgrounds - logo will blend with colors/lines
          const transitionProgress = (progress - 0.4) / 0.6;
          logo.style.mixBlendMode = 'multiply';
          gsap.to(logo, {
            filter: `invert(${transitionProgress}) brightness(${0.85 + transitionProgress * 0.3}) drop-shadow(0 2px 8px rgba(0, 0, 0, ${0.2 * (1 - transitionProgress)}))`,
            opacity: 0.85 + transitionProgress * 0.15, // More visible blend
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true
          });
        }
      }
    });
    triggers.push(heroScrollTrigger);

    // Create scroll trigger to check when past hero section with dynamic color detection
    const pastHeroTrigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "bottom top",
      onEnter: () => {
        // When hero section is completely scrolled past, detect background and adjust
        const nextSection = heroSection.nextElementSibling;
        const bgType = nextSection ? detectBackgroundColor(nextSection) : 'light';
        
        if (logo) {
          logo.style.mixBlendMode = bgType === 'light' ? 'multiply' : 'screen';
          gsap.to(logo, {
            filter: bgType === 'light' 
              ? 'invert(1) brightness(1.1) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))'
              : 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
            opacity: bgType === 'light' ? 0.9 : 0.95, // Slightly more transparent for better blend
            duration: 0.6,
            ease: 'power2.inOut',
            overwrite: true
          });
        }
      },
      onLeaveBack: () => {
        // When scrolling back to hero, logo should be white with screen blend
        if (logo) {
          logo.style.mixBlendMode = 'screen';
          gsap.to(logo, {
            filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
            opacity: 0.95, // Slightly transparent for better blend effect
            duration: 0.6,
            ease: 'power2.inOut',
            overwrite: true
          });
        }
      }
    });
    triggers.push(pastHeroTrigger);

    // Monitor all sections for background color changes
    const allSections = document.querySelectorAll('section, [class*="Section"]');
    allSections.forEach((section) => {
      if (section === heroSection) return;
      
      const sectionTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          const bgType = detectBackgroundColor(section);
          if (logo) {
            logo.style.mixBlendMode = bgType === 'light' ? 'multiply' : 'screen';
            gsap.to(logo, {
              filter: bgType === 'light'
                ? 'invert(1) brightness(1.1) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))'
                : 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
              opacity: bgType === 'light' ? 0.9 : 0.95, // Better blend visibility
              duration: 0.5,
              ease: 'power2.inOut',
              overwrite: true
            });
          }
        },
        onEnterBack: () => {
          const bgType = detectBackgroundColor(section);
          if (logo) {
            logo.style.mixBlendMode = bgType === 'light' ? 'multiply' : 'screen';
            gsap.to(logo, {
              filter: bgType === 'light'
                ? 'invert(1) brightness(1.1) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))'
                : 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
              opacity: bgType === 'light' ? 0.9 : 0.95, // Better blend visibility
              duration: 0.5,
              ease: 'power2.inOut',
              overwrite: true
            });
          }
        }
      });
      triggers.push(sectionTrigger);
    });

    // Initialize logo blend mode with GSAP
    if (logo) {
      logo.style.mixBlendMode = 'screen';
      gsap.set(logo, {
        filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
        opacity: 0.95 // Slightly transparent for better blend effect
      });
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
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
      <div ref={logoContainerRef} className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <img 
          ref={logoRef}
          src="/photo logos hero/cropped-OWL-AI-white.png" 
          alt="OWL AI Logo" 
          className="h-12 md:h-16 w-auto"
          style={{ 
            mixBlendMode: 'screen',
            willChange: 'mix-blend-mode, filter, opacity'
          }}
        />
      </div>
      
      <div className="flex flex-col w-full items-start">
        <div className="relative w-full">
          {/* Hero Section */}
          <section 
            ref={heroSectionRef}
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
            
            {/* Sound indicator - shows until Section01_BrandStrip is scrolled past or cursor is over it */}
            <div 
              ref={muteButtonRef} 
              className={`fixed top-4 right-4 z-30 pointer-events-none transition-opacity duration-150 ease-out ${
                showMuteButton ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-2 border border-white/20">
                <div className="text-white text-xs sm:text-sm [font-family:'Manrope',Helvetica]">
                  {videoUnmuted ? "Sound Off" : "Sound On"}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 text-center px-4 sm:px-6 mt-48 sm:mt-64 md:mt-80 lg:mt-[26rem]">
              <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 md:mb-10 md:mb-12">Turn Every Analyst Into an Alpha Engine</h1>
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-5">
                {/* Primary CTA - Stands out more */}
                <a 
                  href="#final-cta" 
                  ref={demoButtonRef}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-target inline-flex items-center justify-center h-12 sm:h-14 md:h-16 px-8 sm:px-10 md:px-12 rounded-[40px] bg-white text-black font-semibold text-base sm:text-lg md:text-xl hover:bg-gray-100 hover:scale-105 transition-transform duration-300 focus:outline-none shadow-[0_4px_20px_rgba(255,255,255,0.3)] [font-family:'Manrope',Helvetica]"
                >
                  <span ref={demoButtonTextRef} className="inline-block">Request a Demo</span>
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
            <div ref={blogSectionRef}>
              <Section04_BlogAndStats />
            </div>

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
