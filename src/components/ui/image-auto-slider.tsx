import React, { useEffect, useRef, useState } from "react";

export const Component = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const duplicatedImages = [...images, ...images];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes scroll-right { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-50%); } 
        }
        .infinite-scroll { 
          animation: scroll-right 30s linear infinite; 
          will-change: transform;
        }
        .infinite-scroll.paused { 
          animation-play-state: paused; 
        }
        .scroll-container { 
          mask: linear-gradient(90deg,transparent 0%,black 10%,black 90%,transparent 100%); 
          -webkit-mask: linear-gradient(90deg,transparent 0%,black 10%,black 90%,transparent 100%); 
        }
        .image-item { 
          transition: transform 0.2s ease; 
          will-change: transform;
        }
        .image-item:hover { 
          transform: scale(1.02); 
        }
      `}</style>

      <div ref={containerRef} className="w-full relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 w-full flex items-center justify-center py-6">
          <div className="scroll-container w-full">
            <div className={`infinite-scroll flex gap-6 w-max ${!isVisible ? 'paused' : ''}`}>
              {duplicatedImages.map((image, index) => (
                <div key={index} className="image-item flex-shrink-0 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src={image} 
                    alt={`Gallery image ${(index % images.length) + 1}`} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;