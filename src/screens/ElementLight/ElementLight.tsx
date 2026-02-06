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

type ElementLightProps = {
  loadingComplete?: boolean;
};

export const ElementLight = ({ loadingComplete = false }: ElementLightProps): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const brandStripRef = useRef<HTMLDivElement>(null);
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const topOverlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const demoButtonRef = useRef<HTMLAnchorElement>(null);
  const demoButtonTextRef = useRef<HTMLSpanElement>(null);
  const demoButtonContainerRef = useRef<HTMLDivElement>(null);
  const muteButtonRef = useRef<HTMLDivElement>(null);
  const [videoUnmuted, setVideoUnmuted] = useState(false);
  const unmuteButtonRef = useRef<HTMLButtonElement>(null);
  const [showMuteButton, setShowMuteButton] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setVideoUnmuted(!video.muted);
      console.log('ElementLight: Video sound toggled, muted:', video.muted);
    }
  };

  // Check button visibility helper function - only show when cursor is over video container
  const checkButtonVisibility = (x: number, y: number): boolean => {
    const videoContainer = videoContainerRef.current;
    const brandStripElement = brandStripRef.current;

    if (!videoContainer || !brandStripElement) return false;

    // Check if cursor is specifically over the video container
    const videoRect = videoContainer.getBoundingClientRect();
    const isOverVideoContainer = 
      x >= videoRect.left &&
      x <= videoRect.right &&
      y >= videoRect.top &&
      y <= videoRect.bottom;

    // Check if cursor is over brand strip
    const brandStripRect = brandStripElement.getBoundingClientRect();
    const isOverBrandStrip = 
      x >= brandStripRect.left &&
      x <= brandStripRect.right &&
      y >= brandStripRect.top &&
      y <= brandStripRect.bottom;

    // Only show if: over video container, not over brand strip, and brand strip hasn't scrolled past
    return isOverVideoContainer && !isOverBrandStrip && brandStripRect.top > 0;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      
      // Try to play the video
      const playVideo = async () => {
        try {
          await video.play();
          const fallback = document.getElementById('fallback-bg');
          if (fallback) {
            fallback.classList.add('hidden');
            fallback.style.display = 'none';
          }
        } catch (error) {
          // Autoplay blocked or video failed - show fallback
          const fallback = document.getElementById('fallback-bg');
          if (fallback) {
            fallback.classList.remove('hidden');
            fallback.style.display = 'block';
          }
        }
      };
      
      // Try to play when video can play
      video.addEventListener('canplay', playVideo);
      video.addEventListener('loadeddata', playVideo);
      video.addEventListener('error', () => {
        // Video failed to load - show fallback immediately
        const fallback = document.getElementById('fallback-bg');
        if (fallback) {
          fallback.classList.remove('hidden');
          fallback.style.display = 'block';
        }
        if (video) video.style.display = 'none';
      });
      
      // Also try immediately
      playVideo();
      
      return () => {
        video.removeEventListener('canplay', playVideo);
        video.removeEventListener('loadeddata', playVideo);
      };
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

    // Initialize button position (hidden initially)
    gsap.set(button, {
      left: '0px',
      top: '0px',
      x: 0,
      y: 0,
    });

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

      // Position button at fixed distance from cursor (viewport coordinates)
      // Using fixed positioning so it's always relative to viewport, not document
      const offsetX = 60; // Distance to the right of cursor
      const offsetY = -40; // Distance up from cursor (negative = up)
      
      // Calculate position directly in viewport coordinates
      const targetLeft = e.clientX + offsetX;
      const targetTop = e.clientY + offsetY;
      
      // Use left and top directly for fixed positioning (viewport coordinates)
      gsap.to(button, {
        left: `${targetLeft}px`,
        top: `${targetTop}px`,
        x: 0, // Reset any transform
        y: 0, // Reset any transform
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
  }, [isPlaying]);

  // Prevent video from playing until loading is complete
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    if (!loadingComplete) {
      // Ensure video is paused and muted during loading
      video.pause();
      video.muted = true;
      
      // Prevent any play attempts
      const preventPlay = (e: Event) => {
        e.preventDefault();
        video.pause();
      };
      
      video.addEventListener('play', preventPlay);
      video.addEventListener('playing', preventPlay);
      
      return () => {
        video.removeEventListener('play', preventPlay);
        video.removeEventListener('playing', preventPlay);
      };
    } else {
      // Loading complete - allow autoplay
      video.muted = true;
      setVideoUnmuted(false);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked - this is expected behavior
      });
    }
  }, [loadingComplete]);

  // Animate unmute button with GSAP hover effect (desktop only)
  useEffect(() => {
    if (!unmuteButtonRef.current || videoUnmuted) return;
    
    // Check if mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const button = unmuteButtonRef.current;
    const textElement = button.querySelector('span');
    
    // Hover animation - smooth transition to white (desktop only)
    const handleMouseEnter = () => {
      gsap.to(button, {
        backgroundColor: '#ffffff',
        duration: 0.4,
        ease: "power2.out",
      });
      if (textElement) {
        gsap.to(textElement, {
          color: '#000000',
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        backgroundColor: '#000000',
        duration: 0.4,
        ease: "power2.out",
      });
      if (textElement) {
        gsap.to(textElement, {
          color: '#ffffff',
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      gsap.killTweensOf(button);
      gsap.killTweensOf(textElement);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [videoUnmuted]);

  // Dynamic logo changes based on scroll position with smooth mix-blend transitions
  useEffect(() => {
    const overlay = topOverlayRef.current;
    const logo = logoRef.current;
    const logoContainer = logoContainerRef.current;
    const demoButtonContainer = demoButtonContainerRef.current;
    if (!overlay || !logo) return;

    const heroSection = document.querySelector('section');
    if (!heroSection) return;

    const triggers: ScrollTrigger[] = [];

    // GSAP animation for logo hide/show on scroll (button stays visible)
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

      // If scrolling down and scrolled past threshold, hide logo only
      if (scrollingDown && currentScrollY > 50 && !isHidden) {
        gsap.to(logoContainer, {
          y: -100,
          duration: 0.5,
          ease: 'power2.inOut',
          overwrite: true
        });
        isHidden = true;
      }
      // If scrolling up or at top, show logo
      else if ((!scrollingDown || currentScrollY <= 50) && isHidden) {
        gsap.to(logoContainer, {
          y: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          overwrite: true
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
            ease: 'power2.inOut',
            overwrite: true
          });
          isHidden = false;
        }
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    const scrollCleanup = () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };

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
        
        // Small movement during hero scroll (will be combined with hide animation)
        // The hide animation takes priority, so this is minimal
        
        // Detect background and apply appropriate blend mode and filter
        const bgType = detectBackgroundColor(heroSection);
        const isDarkBg = bgType === 'dark' || progress < 0.4;
        
        // Keep blend mode active from start
        if (isDarkBg) {
          const blendProgress = Math.min(progress / 0.4, 1);
          logo.style.mixBlendMode = 'difference';
          gsap.to(logo, {
            filter: 'none',
            opacity: 1, // Full opacity
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true
          });
        } else {
          // Keep blend mode active
          const transitionProgress = (progress - 0.4) / 0.6;
          logo.style.mixBlendMode = 'difference';
          gsap.to(logo, {
            filter: 'none',
            opacity: 1, // Full opacity
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true
          });
        }
      }
    });
    triggers.push(heroScrollTrigger);

    // Button expands as user scrolls: 88% → 115% (larger final size)
    if (demoButtonContainer) {
      const initialScroll = window.scrollY;
      const expandProgress = Math.min(initialScroll / 300, 1);
      const initialScale = 0.88 + expandProgress * 0.27; // 0.88 → 1.15
      gsap.set(demoButtonContainer, {
        left: "50%",
        xPercent: -50,
        transformOrigin: "center center",
        scale: initialScale
      });
      const buttonExpandTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=300",
        scrub: 1.5,
        onUpdate: (self) => {
          const scale = 0.88 + self.progress * 0.27; // 88% → 115% over scroll
          gsap.set(demoButtonContainer, { scale });
        }
      });
      triggers.push(buttonExpandTrigger);
    }

    // Note: Blend mode switching is handled by heroBlendTrigger below
    // This trigger is kept for any other future effects

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
          // Keep blend mode when off hero (handled by heroBlendTrigger)
          if (logo) {
            logo.style.mixBlendMode = 'difference';
            gsap.to(logo, {
              filter: 'none',
              opacity: 1, // Full opacity
              duration: 0.5,
              ease: 'power2.inOut',
              overwrite: true
            });
          }
        },
        onEnterBack: () => {
          const bgType = detectBackgroundColor(section);
          // Keep blend mode when off hero (handled by heroBlendTrigger)
          if (logo) {
            logo.style.mixBlendMode = 'difference';
            gsap.to(logo, {
              filter: 'none',
              opacity: 1, // Full opacity
              duration: 0.5,
              ease: 'power2.inOut',
              overwrite: true
            });
          }
        }
      });
      triggers.push(sectionTrigger);
    });

    // Initialize logo - blend mode from start
    if (logo) {
      logo.style.mixBlendMode = 'difference';
      gsap.set(logo, {
        filter: 'none',
        opacity: 1, // Full opacity
        backdropFilter: 'blur(0px)' // Can be enhanced if needed
      });
    }

    // Initialize containers with blend mode class
    if (logoContainer) {
      logoContainer.classList.add('mix-blend-difference');
    }
    // demoButtonContainer: no mix-blend, solid black button

    // Blend mode is now active from start, no need to toggle on/off
    // Keeping trigger for any future effects if needed

    // Initialize logo container position (top left)
    if (logoContainer) {
      gsap.set(logoContainer, {
        x: 0, // Top left, no centering
        y: 0 // At top (will slide up/down)
      });
    }

    // Initialize demo button container position (top right)
    if (demoButtonContainer) {
      gsap.set(demoButtonContainer, {
        x: 0, // Top right, no centering
        y: 0 // At top (will slide up/down)
      });
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
      scrollCleanup();
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
      
      {/* OWL AI Logo - Top Left (Independent Element, slides with GSAP) */}
      <div 
        ref={logoContainerRef} 
        className="fixed top-6 sm:top-7 md:top-8 left-6 md:left-14 z-50 pointer-events-none"
      >
        <img 
          ref={logoRef}
          src="/photo logos hero/cropped-OWL-AI-white.png" 
          alt="OWL AI Logo" 
          className="h-9 sm:h-10 md:h-12 w-auto"
          style={{ 
            mixBlendMode: 'difference',
            filter: 'none',
            willChange: 'mix-blend-mode, filter, opacity'
          }}
        />
      </div>

      {/* Request a Demo Button - Centred (Independent Element, slides with GSAP) */}
      <div
        ref={demoButtonContainerRef}
        className="fixed top-6 sm:top-7 md:top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <a 
          href="/demo" 
          ref={demoButtonRef}
          className="cursor-target inline-flex items-center justify-center h-14 sm:h-16 md:h-[4.5rem] px-9 sm:px-11 md:px-16 rounded-xl bg-[#246193] text-white font-semibold text-lg sm:text-xl md:text-2xl md:hover:bg-[#1a4a6b] transition-colors duration-300 focus:outline-none [font-family:'Manrope',Helvetica]"
        >
          <span ref={demoButtonTextRef} className="inline-block">Request a Free Demo</span>
        </a>
      </div>
      
      <div className="flex flex-col w-full items-start">
        <div className="relative w-full">
          {/* Hero Section */}
          <section 
            ref={heroSectionRef}
            className="relative pt-32 pb-12 px-6 md:px-14 w-full"
          >
            {/* Text Above Video */}
            <div className="mb-8 md:mb-12 pb-10 md:pb-18 lg:pb-22 text-center">
              <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                Turn Any Analyst Into an Alpha Engine<br className="hidden md:block" /> in <span className="text-[#246193]">2 Minutes</span>
              </h1>
            </div>
            
            {/* Full-width Video Frame */}
            <div 
              ref={videoContainerRef}
              className="relative w-full rounded-xl overflow-hidden aspect-video cursor-pointer" 
              onClick={toggleSound}
            >
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  muted
                  onCanPlay={() => {
                    const fallback = document.getElementById('fallback-bg');
                    if (fallback) {
                      fallback.classList.add('hidden');
                      fallback.style.display = 'none';
                    }
                    // Ensure video is muted if loading is not complete
                    const video = videoRef.current;
                    if (video) {
                      if (!loadingComplete) {
                        video.pause();
                        video.muted = true;
                      } else {
                        // Loading complete - ensure muted and playing
                        video.muted = true;
                        setVideoUnmuted(false);
                      }
                    }
                  }}
                  onPlay={() => {
                    setIsPlaying(true);
                  }}
                  onPause={() => {
                    setIsPlaying(false);
                  }}
                  onError={(e) => {
                    // Video failed to load - hide video and show fallback
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('fallback-bg');
                    if (fallback) {
                      fallback.classList.remove('hidden');
                      fallback.style.display = 'block';
                    }
                  }}
                >
                  <source src="/Owl Ai Lpv (optimised).webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Fallback background gradient - only show if video fails */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0 hidden flex items-center justify-center" id="fallback-bg">
                  <div className="text-white/60 text-sm text-center px-4">
                    <p className="mb-2">Video loading...</p>
                    <p className="text-xs opacity-50">If this persists, ensure Git LFS is installed and run: git lfs pull</p>
                  </div>
                </div>
                
                {/* Sound indicator - Desktop (follows cursor) */}
                <div 
                  ref={muteButtonRef} 
                  className={`hidden md:block fixed z-30 transition-opacity duration-150 ease-out ${
                    showMuteButton ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    pointerEvents: showMuteButton ? 'auto' : 'none'
                  }}
                >
                  <div className="bg-white rounded-xl px-2.5 py-2">
                    <div className="text-black text-[10px] sm:text-xs [font-family:'Manrope',Helvetica]">
                      {videoUnmuted ? "Sound Off" : "Sound On"}
                    </div>
                  </div>
                </div>
                
                {/* Click to Unmute Button - shown when video is muted */}
                {!videoUnmuted && (
                  <div className="absolute top-4 right-4 z-30">
                    <button
                      ref={unmuteButtonRef}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSound();
                      }}
                      className="cursor-target group relative px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-xl flex items-center justify-center md:hover:scale-105"
                      style={{ backgroundColor: '#000000' }}
                    >
                      <span 
                        className="text-white text-sm md:text-base lg:text-lg font-semibold [font-family:'Manrope',Helvetica]"
                        style={{ color: '#ffffff' }}
                      >
                        Click to Unmute
                      </span>
                    </button>
                  </div>
                )}
                
                
            </div>
          </section>

          {/* Brand Strip - Separate section filling remaining 10% */}
          <div ref={brandStripRef} className="relative w-full h-[15vh] md:h-[18vh]">
            <Section01_BrandStrip />
          </div>

          {/* Main Content Area */}
          <div className="relative w-full bg-white overflow-x-hidden">
            {/* Problem */}
            <div ref={blogSectionRef}>
              <Section04_BlogAndStats />
            </div>

            {/* Platform */}
            <Section08_PortfolioAndTestimonials />

            {/* Solution */}
            <Section02_OurExpertise />

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
