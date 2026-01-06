import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";

gsap.registerPlugin(Draggable);

type BrandItem = {
  image: string;
  alt: string;
};

const brands: BrandItem[] = [
  { image: "/photo logos hero/prudential-logo-cropped.jpg", alt: "Prudential" },
  { image: "/photo logos hero/worldquant-logo-cropped.jpg", alt: "WorldQuant" },
  { image: "/photo logos hero/Federated-Hermes-logo-cropped.jpg", alt: "Federated Hermes" },
  { image: "/photo logos hero/Point72-logo-cropped.jpg", alt: "Point72" },
  { image: "/photo logos hero/Dun-and-Bradstreet-logo-cropped.jpg", alt: "Dun and Bradstreet" },
];

export const Section01_BrandStrip = (): JSX.Element => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLUListElement | null>(null);
  const seq2Ref = useRef<HTMLUListElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const halfWidthRef = useRef<number>(0);
  const draggableInstanceRef = useRef<Draggable | null>(null);
  const [offset, setOffset] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mounted = true;
    const speedPxPerSecond = 60; // tune for smoothness

    const recalc = () => {
      const base = seqRef.current?.scrollWidth ?? 0;
      const ml = seq2Ref.current ? parseFloat(getComputedStyle(seq2Ref.current).marginLeft || "0") : 0;
      halfWidthRef.current = base + ml;
    };

    recalc();

    const handleResize = () => {
      // throttle with rAF
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          recalc();
          if (draggableInstanceRef.current && containerRef.current) {
            draggableInstanceRef.current.update();
          }
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Handle click/tap to swipe
    const handleClickSwipe = (e: MouseEvent | TouchEvent) => {
      if (!proxyRef.current || isDraggingRef.current) return;
      
      const rect = proxyRef.current.getBoundingClientRect();
      const clickX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const centerX = rect.left + rect.width / 2;
      const direction = clickX < centerX ? -1 : 1; // Left side = swipe right, right side = swipe left
      
      const loopWidth = halfWidthRef.current;
      if (loopWidth > 0) {
        const swipeAmount = loopWidth / 3; // Swipe 1/3 of the width on click
        const startOffset = offsetRef.current;
        let targetOffset = startOffset + (swipeAmount * direction);
        
        // Handle seamless loop
        while (targetOffset < 0) {
          targetOffset += loopWidth;
        }
        while (targetOffset >= loopWidth) {
          targetOffset -= loopWidth;
        }
        
        // Create animatable object for GSAP
        const animObj = { value: startOffset };
        
        // Animate the swipe
        gsap.to(animObj, {
          value: targetOffset,
          duration: 0.6,
          ease: "power2.out",
          onUpdate: () => {
            let currentOffset = animObj.value;
            // Handle seamless loop during animation
            while (currentOffset < 0) {
              currentOffset += loopWidth;
            }
            while (currentOffset >= loopWidth) {
              currentOffset -= loopWidth;
            }
            offsetRef.current = currentOffset;
            setOffset(currentOffset);
          }
        });
      }
    };

    // Set up Draggable with proxy element
    const setupDraggable = () => {
      if (proxyRef.current && !draggableInstanceRef.current) {
        let startX = 0;
        let startOffset = 0;
        let clickStartTime = 0;
        let clickStartX = 0;
        
        draggableInstanceRef.current = Draggable.create(proxyRef.current, {
          type: "x",
          inertia: true,
          dragResistance: 0.1,
          allowEventDefault: false,
          onPress: function(e) {
            startX = this.x;
            startOffset = offsetRef.current;
            isDraggingRef.current = true;
            pausedRef.current = true;
            clickStartTime = Date.now();
            clickStartX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
          },
          onDrag: function() {
            if (!mounted) return;
            const loopWidth = halfWidthRef.current;
            if (loopWidth > 0) {
              // Calculate offset based on drag distance (negative because dragging right should move content left)
              const dragDelta = this.x - startX;
              let newOffset = startOffset - dragDelta;
              
              // Handle seamless loop
              while (newOffset < 0) {
                newOffset += loopWidth;
              }
              while (newOffset >= loopWidth) {
                newOffset -= loopWidth;
              }
              
              offsetRef.current = newOffset;
              setOffset(offsetRef.current);
            }
          },
          onRelease: function(e) {
            const dragTime = Date.now() - clickStartTime;
            const dragDistance = Math.abs(this.x - startX);
            
            // If it was a quick click with minimal movement, trigger swipe
            if (dragTime < 250 && dragDistance < 8) {
              // Create a synthetic event for handleClickSwipe
              const syntheticEvent = {
                clientX: clickStartX,
                touches: [{ clientX: clickStartX }]
              } as MouseEvent;
              handleClickSwipe(syntheticEvent);
            }
            
            isDraggingRef.current = false;
            pausedRef.current = false;
            // Reset proxy position for next drag
            gsap.set(this.target, { x: 0, clearProps: "transform" });
            this.update();
          },
          onThrowUpdate: function() {
            if (!mounted) return;
            const loopWidth = halfWidthRef.current;
            if (loopWidth > 0) {
              const dragDelta = this.x - startX;
              let newOffset = startOffset - dragDelta;
              
              // Handle seamless loop
              while (newOffset < 0) {
                newOffset += loopWidth;
              }
              while (newOffset >= loopWidth) {
                newOffset -= loopWidth;
              }
              
              offsetRef.current = newOffset;
              setOffset(offsetRef.current);
            }
          }
        })[0];
        
        // Ensure the draggable is enabled
        if (draggableInstanceRef.current) {
          draggableInstanceRef.current.enable();
        }
      }
    };

    // Set up draggable after DOM is ready
    requestAnimationFrame(() => {
      setupDraggable();
    });

    const tick = (ts: number) => {
      if (!mounted) return;
      if (lastTsRef.current == null) {
        lastTsRef.current = ts;
      }
      const dt = Math.min(48, ts - lastTsRef.current);
      lastTsRef.current = ts;

      if (!pausedRef.current && !isDraggingRef.current) {
        offsetRef.current += (speedPxPerSecond * dt) / 1000;
        const loopWidth = halfWidthRef.current;
        if (loopWidth > 0 && offsetRef.current >= loopWidth) {
          offsetRef.current -= loopWidth;
        }
        setOffset(offsetRef.current);
      }

      requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      cancelAnimationFrame(id);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.kill();
        draggableInstanceRef.current = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full h-full border-y border-[#66666620] bg-white" aria-label="Section — Social Proof">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden flex items-center group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Proxy element for drag tracking */}
        <div
          ref={proxyRef}
          className="absolute inset-0 z-10 transition-cursor duration-150"
          style={{ 
            touchAction: "none", 
            userSelect: "none", 
            WebkitUserSelect: "none",
            cursor: isHovering ? "grab" : "pointer"
          }}
          onMouseDown={(e) => {
            if (e.currentTarget.style) {
              e.currentTarget.style.cursor = "grabbing";
            }
          }}
          onMouseUp={(e) => {
            if (e.currentTarget.style && isHovering) {
              e.currentTarget.style.cursor = "grab";
            }
          }}
        />
        {/* Left and right fade overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-20" />

        {/* Track driven by rAF */}
        <div
          ref={trackRef}
          className="flex items-center transform-gpu [will-change:transform] pointer-events-none"
          style={{ transform: `translate3d(-${offset}px,0,0)` }}
        >
          {/* First sequence */}
          <ul ref={seqRef} className="flex items-center gap-12 sm:gap-20 md:gap-32 pointer-events-none">
            {brands.map((brand, idx) => {
              const isPoint72 = brand.alt === "Point72";
              return (
                <li key={`seq1-${idx}`} className={`shrink-0 flex items-center justify-center ${isPoint72 ? "w-40 sm:w-48 md:w-56" : "w-32 sm:w-40 md:w-48"}`}>
                  <img
                    src={brand.image}
                    alt={brand.alt}
                    className={`logo w-full max-w-full object-contain opacity-60 ${isPoint72 ? "h-11 sm:h-14 md:h-16" : "h-9 sm:h-11 md:h-14"}`}
                    draggable="false"
                  />
                </li>
              );
            })}
          </ul>
          {/* Second sequence (duplicate for seamless loop) with gap matching the spacing */}
          <ul ref={seq2Ref} className="flex items-center gap-12 sm:gap-20 md:gap-32 ml-12 sm:ml-20 md:ml-32 pointer-events-none" aria-hidden="true">
            {brands.map((brand, idx) => {
              const isPoint72 = brand.alt === "Point72";
              return (
                <li key={`seq2-${idx}`} className={`shrink-0 flex items-center justify-center ${isPoint72 ? "w-40 sm:w-48 md:w-56" : "w-32 sm:w-40 md:w-48"}`}>
                  <img
                    src={brand.image}
                    alt={brand.alt}
                    className={`logo w-full max-w-full object-contain opacity-60 ${isPoint72 ? "h-11 sm:h-14 md:h-16" : "h-9 sm:h-11 md:h-14"}`}
                    draggable="false"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Section01_BrandStrip;

