import React, { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const ProjectDetail = ({ project, isOpen, onClose }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const sheetRef = useRef(null);
    const dragStartY = useRef(0);
    const currentTranslateY = useRef(0);
    const isDragging = useRef(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    }, [onClose]);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Bottom sheet drag handlers
    const handleDragStart = useCallback((e) => {
        isDragging.current = true;
        dragStartY.current = e.touches[0].clientY;
        currentTranslateY.current = 0;
        if (sheetRef.current) {
            sheetRef.current.style.transition = "none";
        }
    }, []);

    const handleDragMove = useCallback((e) => {
        if (!isDragging.current) return;
        const deltaY = e.touches[0].clientY - dragStartY.current;
        if (deltaY > 0) {
            currentTranslateY.current = deltaY;
            if (sheetRef.current) {
                sheetRef.current.style.transform = `translateY(${deltaY}px)`;
            }
        }
    }, []);

    const handleDragEnd = useCallback(() => {
        isDragging.current = false;
        if (sheetRef.current) {
            sheetRef.current.style.transition = "transform 0.3s ease-out";
            if (currentTranslateY.current > 100) {
                sheetRef.current.style.transform = "translateY(100%)";
                setTimeout(onClose, 300);
            } else {
                sheetRef.current.style.transform = "translateY(0)";
            }
        }
        currentTranslateY.current = 0;
    }, [onClose]);

    if ((!isOpen && !isClosing) || !project) return null;

    const content = isMobile ? (
        // Mobile: bottom sheet
        <div
            className="fixed inset-0 z-[999]"
            onClick={handleClose}
        >
            <div className="absolute inset-0 bg-black/50" />

            <div
                ref={sheetRef}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                className="absolute bottom-0 left-0 right-0 bg-[#222222] rounded-t-2xl max-h-[70vh] overflow-y-auto"
                style={{ animation: isClosing ? "slideDown 0.3s ease-in forwards" : "slideUp 0.3s ease-out" }}
            >
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-10 h-1 rounded-full bg-gray-600" />
                </div>

                <div className="px-6 pb-8">
                    <h3 className="text-[#54d5bb] text-lg font-semibold mb-1">
                        {project.title}
                    </h3>
                    <span className="text-[#54d5bb] text-xs font-medium">
                        {project.technology}
                    </span>
                    <p className="text-[#cacaca] text-sm leading-relaxed mt-4">
                        {project.backstory || project.description}
                    </p>

                    <div className="flex gap-4 mt-6">
                        {project.github !== "#" && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#8892b0] text-sm hover:text-[#54d5bb] transition-colors"
                            >
                                GitHub →
                            </a>
                        )}
                        <a
                            href={project.deployed}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8892b0] text-sm hover:text-[#54d5bb] transition-colors"
                        >
                            Live →
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
      `}</style>
        </div>
    ) : (
        // Desktop: centered modal
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            onClick={handleClose}
        >
            <div className="absolute inset-0 bg-black/50" />

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#222222] rounded-xl max-w-md w-full mx-4 p-8"
                style={{ animation: isClosing ? "fadeOut 0.2s ease-in forwards" : "fadeIn 0.2s ease-out" }}
            >
                <h3 className="text-[#54d5bb] text-xl font-semibold mb-1">
                    {project.title}
                </h3>
                <span className="text-[#54d5bb] text-xs font-medium">
                    {project.technology}
                </span>
                <p className="text-[#cacaca] text-sm leading-relaxed mt-4">
                    {project.backstory || project.description}
                </p>

                <div className="flex gap-4 mt-6">
                    {project.github !== "#" && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8892b0] text-sm hover:text-[#54d5bb] transition-colors"
                        >
                            GitHub →
                        </a>
                    )}
                    <a
                        href={project.deployed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8892b0] text-sm hover:text-[#54d5bb] transition-colors"
                    >
                        Live →
                    </a>
                </div>

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-[#cacaca] transition-colors text-lg"
                >
                    ✕
                </button>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
      `}</style>
        </div>
    );

    // Portal to document.body so it escapes CubeSwipe's 3D transforms
    return createPortal(content, document.body);
};

export default ProjectDetail;
