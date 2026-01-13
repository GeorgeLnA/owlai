import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ElementLight } from "./screens/ElementLight";
import { ElementBanks } from "./screens/ElementBanks/ElementBanks";
import { DemoPage } from "./screens/DemoPage";
import { DemoSuccessPage } from "./screens/DemoSuccessPage";
import LoadingScreen from "./components/ui/loading-screen";

const Boot = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let isMounted = true;

    // Set a maximum loading time to prevent infinite loading
    const maxLoadingTime = 3000; // 3 seconds max
    timeoutId = window.setTimeout(() => {
      if (isMounted) {
        console.log('Loading timeout reached, proceeding with app');
        setIsLoaded(true);
      }
    }, maxLoadingTime);

    // Lightweight preloading - only critical resources
    const preloadCriticalResources = async () => {
      try {
        // Only preload hero video, skip heavy images
        const videoPromise = new Promise<boolean>((resolve) => {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.oncanplaythrough = () => resolve(true);
          video.onerror = () => resolve(true); // Continue even if video fails
          video.onloadstart = () => resolve(true); // Fallback
          video.src = '/Owl Ai Lpv (optimised).webm';
          
          // Timeout for video loading
          setTimeout(() => resolve(true), 1500);
        });

        await videoPromise;
        
        if (isMounted) {
          setIsLoaded(true);
          clearTimeout(timeoutId);
        }
      } catch (error) {
        console.warn('Resource preloading failed:', error);
        if (isMounted) {
          setIsLoaded(true);
          clearTimeout(timeoutId);
        }
      }
    };

    preloadCriticalResources();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const shouldShowLoader = !(isLoaded && loaderDone);

  const params = new URLSearchParams(window.location.search);
  const icp = params.get("icp");
  const page = params.get("page");

  let Page;
  if (page === "demo") {
    Page = DemoPage;
  } else if (page === "demo-success") {
    Page = DemoSuccessPage;
  } else if (icp === "banks") {
    Page = ElementBanks;
  } else {
    Page = ElementLight;
  }

  return (
    <>
      {shouldShowLoader && <LoadingScreen loop={false} onComplete={() => setLoaderDone(true)} />}
      <div className="opacity-100">
        <Page loadingComplete={loaderDone} />
      </div>
    </>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Boot />
  </StrictMode>,
);