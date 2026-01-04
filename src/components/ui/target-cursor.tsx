import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";

export type TargetCursorProps = {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
};

const HIDE_CLASS = "tcursor-hide";

const TargetCursor = ({
  // Include common logo selectors in default targets
  targetSelector = "button, a, [role='button'], img[alt*='logo' i], .logo, [data-logo='true'], .cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
}: TargetCursorProps): JSX.Element => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const iconOnlyRef = useRef<boolean>(false);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
      extraPadding: 8, // expand bounds so corners are a bit wider than text
    }),
    [],
  );

  const moveCursor = useCallback((x: number, y: number): void => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    const htmlEl = document.documentElement;
    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
      // Add a class that forces cursor: none on all descendants
      htmlEl.classList.add(HIDE_CLASS);
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(
      ".target-cursor-corner",
    ) as NodeListOf<HTMLDivElement>;

    let activeTarget: HTMLElement | null = null;
    let currentTargetMove: ((ev: MouseEvent) => void) | null = null;
    let currentLeaveHandler: ((ev: MouseEvent) => void) | null = null;
    let isAnimatingToTarget = false;
    let resumeTimeout: number | null = null;

    const cleanupTarget = (target: HTMLElement): void => {
      if (currentTargetMove) {
        target.removeEventListener("mousemove", currentTargetMove);
      }
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = (): void => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    createSpinTimeline();

    const moveHandler = (e: MouseEvent): void => moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler);

    const pickEffectiveTarget = (direct: HTMLElement): HTMLElement | null => {
      // Gather matching ancestors including the node itself
      const matches: HTMLElement[] = [];
      let cur: HTMLElement | null = direct;
      while (cur && cur !== document.body) {
        if (cur.matches(targetSelector)) matches.push(cur);
        cur = cur.parentElement as HTMLElement | null;
      }
      if (!matches.length) return null;

      // Prefer the closest ancestor that actually has visible text
      const withText = matches.find((el) => (el.textContent || "").trim().length > 0);
      return withText ?? matches[0];
    };

    const isLogoElement = (el: HTMLElement): boolean => {
      const alt = (el.getAttribute("alt") || "").toLowerCase();
      return (
        el.classList.contains("logo") ||
        el.getAttribute("data-logo") === "true" ||
        alt.includes("logo")
      );
    };

    const isIconOnly = (el: HTMLElement): boolean => {
      // Do not treat logos as icon-only; we want corners visible on logos
      if (isLogoElement(el)) return false;
      const tag = el.tagName.toLowerCase();
      const rect = el.getBoundingClientRect();
      const noText = ((el.textContent || "").trim().length === 0);
      const looksSmall = rect.width < 32 || rect.height < 24;
      const iconTags = ["svg", "path", "use", "img"]; // typical icon elements
      const onlyHasIconChild =
        el.children.length === 1 && iconTags.includes(el.children[0].tagName.toLowerCase());
      return noText && (iconTags.includes(tag) || onlyHasIconChild || looksSmall);
    };

    const enterHandler = (e: MouseEvent): void => {
      const directTarget = e.target as HTMLElement;
      const target = pickEffectiveTarget(directTarget);
      if (!target || !cursorRef.current || !cornersRef.current) return;

      if (activeTarget === target) return;

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      if (resumeTimeout) {
        window.clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;

      // Determine if this is an icon-only target and hide corners if so (but keep for logos)
      iconOnlyRef.current = isIconOnly(target);
      if (cornersRef.current) {
        gsap.to(Array.from(cornersRef.current), {
          opacity: iconOnlyRef.current ? 0 : 1,
          duration: 0.15,
          ease: "power2.out",
        });
      }

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();

      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX?: number, mouseY?: number): void => {
        if (!cursorRef.current || !cornersRef.current) return;
        if (iconOnlyRef.current) return; // skip animating corners for icons

        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current.getBoundingClientRect();

        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [tlc, trc, brc, blc] = Array.from(cornersRef.current);

        const { borderWidth, cornerSize, parallaxStrength, extraPadding } = constants;

        // Expand the target rectangle so the corners are slightly wider than the target
        const left = rect.left - extraPadding;
        const right = rect.right + extraPadding;
        const top = rect.top - extraPadding;
        const bottom = rect.bottom + extraPadding;

        let tlOffset = {
          x: left - cursorCenterX - borderWidth,
          y: top - cursorCenterY - borderWidth,
        };
        let trOffset = {
          x: right - cursorCenterX + borderWidth - cornerSize,
          y: top - cursorCenterY - borderWidth,
        };
        let brOffset = {
          x: right - cursorCenterX + borderWidth - cornerSize,
          y: bottom - cursorCenterY + borderWidth - cornerSize,
        };
        let blOffset = {
          x: left - cursorCenterX - borderWidth,
          y: bottom - cursorCenterY + borderWidth - cornerSize,
        };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = (left + right) / 2;
          const targetCenterY = (top + bottom) / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          tlOffset.x += mouseOffsetX;
          tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX;
          trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX;
          brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX;
          blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: offsets[index].x,
              y: offsets[index].y,
              duration: 0.2,
              ease: "power2.out",
            },
            0,
          );
        });
      };

      isAnimatingToTarget = true;
      updateCorners();

      window.setTimeout(() => {
        isAnimatingToTarget = false;
      }, 1);

      let moveThrottle: number | null = null;
      const targetMove = (ev: MouseEvent): void => {
        if (moveThrottle || isAnimatingToTarget) return;
        moveThrottle = window.requestAnimationFrame(() => {
          const mouseEvent = ev as MouseEvent;
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler = (): void => {
        activeTarget = null;
        isAnimatingToTarget = false;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);

          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0,
            );
          });

          // Ensure corners are visible again for the next non-icon target
          gsap.to(corners, { opacity: 1, duration: 0.15 });
        }

        resumeTimeout = window.setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(
              cursorRef.current,
              "rotation",
            ) as number;
            const normalizedRotation = currentRotation % 360;

            spinTl.current!.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current!, { rotation: "+=360", duration: spinDuration, ease: "none" });

            gsap.to(cursorRef.current!, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;

      target.addEventListener("mousemove", targetMove);
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
      document.documentElement.classList.remove(HIDE_CLASS);
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return;

    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: "transform" }}
    >
      <div
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"
        style={{ willChange: "transform" }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"
        style={{ willChange: "transform" }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"
        style={{ willChange: "transform" }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"
        style={{ willChange: "transform" }}
      />
    </div>
  );
};

export default TargetCursor;