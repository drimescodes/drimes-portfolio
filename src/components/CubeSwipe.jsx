import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import Home from "../pages/Home";
import About from "../pages/About";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

const PAGES = [
    { path: "/", label: "Home", component: Home },
    { path: "/aboutme", label: "About", component: About },
    { path: "/experience", label: "Experience", component: Experience },
    { path: "/projects", label: "Projects", component: Projects },
    { path: "/contact", label: "Contact", component: Contact },
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
    const [isPeeking, setIsPeeking] = useState(false);

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

    // First mobile visit: nudge the cube toward the neighbouring page and back,
    // so people see it can be swiped
    useEffect(() => {
        if (!isMobile || !isMainPage) return;
        let seen = false;
        try {
            seen = !!sessionStorage.getItem("swipe-hint-seen");
        } catch {
            // storage blocked: still show the peek
        }
        if (seen) return;

        const dir = NextComponent ? -1 : 1;
        const peek = containerWidth * 0.2 * dir;
        const timers = [
            setTimeout(() => {
                setIsSwiping(true);
                setDragX(dir);
            }, 1000),
            setTimeout(() => {
                setIsPeeking(true);
                setDragX(peek);
            }, 1050),
            setTimeout(() => setDragX(dir), 1750),
            setTimeout(() => {
                setIsPeeking(false);
                setIsSwiping(false);
                setDragX(0);
                try {
                    sessionStorage.setItem("swipe-hint-seen", "true");
                } catch {
                    // storage blocked: the peek just shows again next visit
                }
            }, 2400),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isMobile]);

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
            if (!isMainPage || !isMobile || isAnimating || isPeeking) return;
            touchStartRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
            isDraggingRef.current = true;
            isLockedRef.current = false;
        },
        [isMainPage, isMobile, isAnimating, isPeeking]
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

    // Rotate the cube to the neighbouring page, same as a completed swipe.
    // Settle into the 3D state first, then animate, so the faces don't jump.
    const rotateTo = (dir) => {
        const target = pageIndex + dir;
        if (isAnimating || isPeeking || target < 0 || target >= PAGES.length) return;
        setIsSwiping(true);
        setDragX(-dir);
        requestAnimationFrame(() =>
            requestAnimationFrame(() => {
                pendingNavRef.current = target;
                setAnimateTarget(dir > 0 ? -90 : 90);
                setIsAnimating(true);
            })
        );
    };

    const goToPage = (index) => {
        if (index === pageIndex) return;
        if (Math.abs(index - pageIndex) === 1) {
            rotateTo(index - pageIndex);
            return;
        }
        navigate(PAGES[index].path);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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
        useTransition = isPeeking;
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

    // flow-root keeps the page's top margin inside the front face; otherwise
    // it collapses out and shifts the whole cube down, so the side faces land
    // 64px too low
    const frontFaceStyle = {
        display: "flow-root",
        transform: showCube ? `translateZ(${tz}px)` : "none",
        backfaceVisibility: "hidden",
        width: "100%",
    };
    const sideFaceStyle = (role) => ({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100vh",
        transform: `rotateY(${role === "next" ? 90 : -90}deg) translateZ(${tz}px)`,
        backfaceVisibility: "hidden",
    });
    const faces = [
        PrevComponent && showPrev && { index: pageIndex - 1, role: "prev" },
        { index: pageIndex, role: "front" },
        NextComponent && showNext && { index: pageIndex + 1, role: "next" },
    ].filter(Boolean);

    const prevPage = PAGES[pageIndex - 1];
    const nextPage = PAGES[pageIndex + 1];

    // Rendered outside the perspective container: perspective makes it the
    // containing block for fixed children, which would pin them to the page
    // instead of the viewport
    const pageNav = (
        <nav
            aria-label="Pages"
            className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] bg-[#1d1d20]/95 backdrop-blur border-t border-[#2c2c31] text-sm text-[#cacaca]"
        >
            <div className="justify-self-start">
                {prevPage && (
                    <button
                        onClick={() => rotateTo(-1)}
                        className="flex items-center py-2 pr-2 font-semibold"
                    >
                        <RiArrowLeftSLine size={22} className="text-[#54d5bb]" />
                        {prevPage.label}
                    </button>
                )}
            </div>
            <div className="flex items-center">
                {PAGES.map((page, i) => (
                    <button
                        key={page.path}
                        onClick={() => goToPage(i)}
                        aria-label={page.label}
                        aria-current={i === pageIndex ? "page" : undefined}
                        className="p-1.5"
                    >
                        <span
                            className={`block h-2 rounded-full transition-all duration-300 ${
                                i === pageIndex ? "w-5 bg-[#54d5bb]" : "w-2 bg-[#4a4a52]"
                            }`}
                        />
                    </button>
                ))}
            </div>
            <div className="justify-self-end">
                {nextPage && (
                    <button
                        onClick={() => rotateTo(1)}
                        className="flex items-center py-2 pl-2 font-semibold"
                    >
                        {nextPage.label}
                        <RiArrowRightSLine size={22} className="text-[#54d5bb]" />
                    </button>
                )}
            </div>
        </nav>
    );

    return (
        <>
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
                    transition: useTransition
                        ? isPeeking
                            ? "transform 0.6s ease-in-out"
                            : "transform 0.3s ease-out"
                        : "none",
                    width: "100%",
                }}
            >
                {/* Faces are keyed by page, so when the cube lands the side face
                    becomes the front face without remounting (no replayed
                    entrance animations, no refetches) */}
                {faces.map(({ index, role }) => {
                    const Page = PAGES[index].component;
                    return (
                        <div
                            key={PAGES[index].path}
                            style={role === "front" ? frontFaceStyle : sideFaceStyle(role)}
                        >
                            <Page />
                        </div>
                    );
                })}
            </div>
        </div>
        {pageNav}
        </>
    );
};

export default CubeSwipe;
