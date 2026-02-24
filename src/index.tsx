import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ElementLight } from "./screens/ElementLight";
import { ElementBanks } from "./screens/ElementBanks/ElementBanks";
import { DemoPage } from "./screens/DemoPage";
import { DemoSuccessPage } from "./screens/DemoSuccessPage";
import { AdminPage } from "./screens/AdminPage/AdminPage";
import LoadingScreen from "./components/ui/loading-screen";
import { RequestFormProvider } from "./contexts/RequestFormContext";

const Boot = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

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

  // Listen for pathname changes (for browser back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Also listen for manual navigation
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setPathname(window.location.pathname);
    };

    return () => {
      window.removeEventListener('popstate', handlePopState);
      history.pushState = originalPushState;
    };
  }, []);

  const shouldShowLoader = !(isLoaded && loaderDone);

  // Use pathname for routing
  const params = new URLSearchParams(window.location.search);
  const icp = params.get("icp");

  // Skip loading screen for demo and admin pages
  const isDemoPage = pathname === "/demo" || pathname === "/demo-success";
  const isAdminPage = pathname === "/admin";

  let Page;
  if (pathname === "/demo") {
    Page = DemoPage;
  } else if (pathname === "/demo-success") {
    Page = DemoSuccessPage;
  } else if (pathname === "/admin") {
    Page = AdminPage;
  } else if (icp === "banks") {
    Page = ElementBanks;
  } else {
    Page = ElementLight;
  }

  return (
    <RequestFormProvider>
      {shouldShowLoader && !isDemoPage && !isAdminPage && (
        <LoadingScreen loop={false} onComplete={() => setLoaderDone(true)} />
      )}
      <div className="opacity-100">
        <Page loadingComplete={isDemoPage || isAdminPage ? true : loaderDone} />
      </div>
    </RequestFormProvider>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Boot />
  </StrictMode>,
);