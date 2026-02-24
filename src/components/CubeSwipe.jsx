import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

const PAGES = [
    { path: "/", component: Home },
    { path: "/aboutme", component: About },
    { path: "/experience", component: Experience },
    { path: "/projects", component: Projects },
    { path: "/contact", component: Contact },
];

const CubeSwipe = ({ children, nonMainPage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef(null);
    const touchStartRef = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const isLockedRef = useRef(false);
    const pendingNavRef = useRef(null);

    const [dragX, setDragX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animateTarget, setAnimateTarget] = useState(0);
    const [containerWidth, setContainerWidth] = useState(375);
    const [isMobile, setIsMobile] = useState(false);
    const [showHint, setShowHint] = useState(false);

    // Show swipe hint on first mobile visit
    useEffect(() => {
        if (typeof window === "undefined") return;
        const isMobileNow = window.innerWidth < 768;
        if (isMobileNow && !sessionStorage.getItem("swipe-hint-seen")) {
            setShowHint(true);
            const timer = setTimeout(() => {
                setShowHint(false);
                sessionStorage.setItem("swipe-hint-seen", "true");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, []);
    // CubeSwipe owns the page index — no remounts on navigate
    const [pageIndex, setPageIndex] = useState(() => {
        const idx = PAGES.findIndex((p) => p.path === location.pathname);
        return idx !== -1 ? idx : 0;
    });

    // Sync pageIndex when URL changes externally (navbar clicks, browser back/forward)
    useEffect(() => {
        const idx = PAGES.findIndex((p) => p.path === location.pathname);
        if (idx !== -1 && idx !== pageIndex && !isAnimating) {
            setPageIndex(idx);
        }
    }, [location.pathname]);

    const isMainPage = PAGES.some((p) => p.path === location.pathname);

    const PrevComponent = pageIndex > 0 ? PAGES[pageIndex - 1].component : null;
    const CurrentComponent = PAGES[pageIndex].component;
    const NextComponent =
        pageIndex < PAGES.length - 1 ? PAGES[pageIndex + 1].component : null;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleTouchStart = useCallback(
        (e) => {
            if (!isMainPage || !isMobile || isAnimating) return;
            touchStartRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
            isDraggingRef.current = true;
            isLockedRef.current = false;
        },
        [isMainPage, isMobile, isAnimating]
    );

    const handleTouchMove = useCallback(
        (e) => {
            if (!isDraggingRef.current || !isMainPage || isAnimating) return;

            const deltaX = e.touches[0].clientX - touchStartRef.current.x;
            const deltaY = e.touches[0].clientY - touchStartRef.current.y;

            if (!isLockedRef.current) {
                if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return;
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    isDraggingRef.current = false;
                    return;
                }
                isLockedRef.current = true;
            }

            if (deltaX > 0 && !PrevComponent) return;
            if (deltaX < 0 && !NextComponent) return;

            setIsSwiping(true);
            setDragX(deltaX);
            // Dismiss hint on first swipe
            if (showHint) {
                setShowHint(false);
                sessionStorage.setItem("swipe-hint-seen", "true");
            }
        },
        [isMainPage, PrevComponent, NextComponent, isAnimating]
    );

    const handleTouchEnd = useCallback(() => {
        if (!isDraggingRef.current || !isSwiping) {
            isDraggingRef.current = false;
            return;
        }

        isDraggingRef.current = false;
        const threshold = containerWidth * 0.3;

        if (dragX < -threshold && NextComponent) {
            setIsAnimating(true);
            setAnimateTarget(-90);
            pendingNavRef.current = pageIndex + 1;
        } else if (dragX > threshold && PrevComponent) {
            setIsAnimating(true);
            setAnimateTarget(90);
            pendingNavRef.current = pageIndex - 1;
        } else {
            setDragX(0);
            setIsSwiping(false);
        }
    }, [dragX, isSwiping, NextComponent, PrevComponent, pageIndex, containerWidth]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchmove", handleTouchMove, { passive: true });
        el.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchmove", handleTouchMove);
            el.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    // Non-main page (e.g. /thoughts): render children from Routes normally
    if (!isMainPage) {
        return <div ref={containerRef}>{nonMainPage}</div>;
    }

    // Desktop: render current page directly, no cube
    if (!isMobile) {
        return (
            <div ref={containerRef}>
                <CurrentComponent />
            </div>
        );
    }

    // Mobile: cube swipe
    const progress = Math.min(Math.abs(dragX) / containerWidth, 1);
    const angle = progress * 90;
    const tz = containerWidth / 2;

    let cubeRotation;
    let useTransition;
    if (isAnimating) {
        cubeRotation = animateTarget;
        useTransition = true;
    } else if (isSwiping) {
        cubeRotation = dragX < 0 ? -angle : angle;
        useTransition = false;
    } else {
        cubeRotation = 0;
        useTransition = false;
    }

    const showCube = isSwiping || isAnimating;
    const showNext =
        (isSwiping && dragX < 0) || (isAnimating && animateTarget < 0);
    const showPrev =
        (isSwiping && dragX > 0) || (isAnimating && animateTarget > 0);

    const handleTransitionEnd = () => {
        if (isAnimating && pendingNavRef.current !== null) {
            const newIndex = pendingNavRef.current;
            // Update internal state first (no remount)
            setPageIndex(newIndex);
            // Then sync URL
            navigate(PAGES[newIndex].path, { replace: false });
            pendingNavRef.current = null;
            setIsAnimating(false);
            setAnimateTarget(0);
            setDragX(0);
            setIsSwiping(false);
            // Gentle scroll to top after cube lands
            const start = window.scrollY;
            if (start > 0) {
                const duration = 600;
                const startTime = performance.now();
                const scroll = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                    window.scrollTo(0, start * (1 - ease));
                    if (progress < 1) requestAnimationFrame(scroll);
                };
                requestAnimationFrame(scroll);
            }
        }
    };

    return (
        <div
            ref={containerRef}
            style={{
                perspective: "1000px",
                position: "relative",
            }}
        >
            <div
                onTransitionEnd={handleTransitionEnd}
                style={{
                    transformStyle: "preserve-3d",
                    transform: showCube
                        ? `translateZ(-${tz}px) rotateY(${cubeRotation}deg)`
                        : "none",
                    transition: useTransition ? "transform 0.3s ease-out" : "none",
                    width: "100%",
                }}
            >
                {/* Front face - current page */}
                <div
                    style={{
                        transform: showCube ? `translateZ(${tz}px)` : "none",
                        backfaceVisibility: "hidden",
                        width: "100%",
                    }}
                >
                    <CurrentComponent />
                </div>

                {/* Right face - next page */}
                {NextComponent && showNext && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            minHeight: "100vh",
                            transform: `rotateY(90deg) translateZ(${tz}px)`,
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <NextComponent />
                    </div>
                )}

                {/* Left face - previous page */}
                {PrevComponent && showPrev && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            minHeight: "100vh",
                            transform: `rotateY(-90deg) translateZ(${tz}px)`,
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <PrevComponent />
                    </div>
                )}
            </div>

            {/* Swipe hint */}
            {showHint && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "85px",
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "center",
                        zIndex: 50,
                        animation: "fadeInOut 4s ease-in-out forwards",
                        pointerEvents: "none",
                    }}
                >
                    <span
                        style={{
                            color: "#8892b0",
                            fontSize: "13px",
                            letterSpacing: "0.5px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <span style={{ animation: "nudge 1.2s ease-in-out infinite" }}>‹</span>
                        swipe
                        <span style={{ animation: "nudge 1.2s ease-in-out infinite reverse" }}>›</span>
                    </span>
                </div>
            )}

            <style>{`
        @keyframes nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          15% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default CubeSwipe;
