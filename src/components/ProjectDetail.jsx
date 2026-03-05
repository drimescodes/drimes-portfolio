import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import MediaSlider from "./MediaSlider";

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

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, handleClose]);

    const handleDragStart = useCallback((e) => {
        const sheet = sheetRef.current;
        if (!sheet) return;

        // Check if touch started on the slider area — don't interfere
        const target = e.target;
        if (target.closest('.media-slider')) return;

        // Only allow drag-to-dismiss if scrolled to top (or touching the drag handle)
        const isDragHandle = target.closest('.drag-handle');
        if (!isDragHandle && sheet.scrollTop > 0) return;

        isDragging.current = true;
        dragStartY.current = e.touches[0].clientY;
        currentTranslateY.current = 0;
        sheet.style.transition = "none";
    }, []);

    const handleDragMove = useCallback((e) => {
        if (!isDragging.current) return;
        const deltaY = e.touches[0].clientY - dragStartY.current;
        if (deltaY > 0) {
            currentTranslateY.current = deltaY;
            if (sheetRef.current) {
                sheetRef.current.style.transform = `translateY(${deltaY}px)`;
            }
            e.preventDefault(); // Prevent scroll while dragging sheet down
        } else {
            // User is swiping up — cancel drag, let scroll happen
            isDragging.current = false;
            if (sheetRef.current) {
                sheetRef.current.style.transition = "transform 0.3s ease-out";
                sheetRef.current.style.transform = "translateY(0)";
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

    // Shared content sections
    const renderContent = () => (
        <div className="space-y-5">
            {/* Title */}
            <div>
                <h3 className="text-[#54d5bb] text-xl font-semibold">
                    {project.title}
                </h3>
                <div className="flex gap-4 mt-2">
                    {project.github !== "#" && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8892b0] text-xs hover:text-[#54d5bb] transition-colors"
                        >
                            GitHub →
                        </a>
                    )}
                    {project.links ? (
                        project.links.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#8892b0] text-xs hover:text-[#54d5bb] transition-colors"
                            >
                                {link.label} →
                            </a>
                        ))
                    ) : (
                        <a
                            href={project.deployed}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8892b0] text-xs hover:text-[#54d5bb] transition-colors"
                        >
                            Live →
                        </a>
                    )}
                </div>

                {/* Collaborator credit */}
                {project.collaborator && (
                    <p className="text-[#8892b0] text-xs mt-1">
                        {project.collaborator.role} by{" "}
                        <a
                            href={project.collaborator.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#54d5bb] hover:underline"
                        >
                            {project.collaborator.name}
                        </a>
                    </p>
                )}
            </div>

            {/* Overview */}
            {project.overview && (
                <div>
                    <h4 className="text-[#cacaca] text-base font-semibold mb-2">Overview</h4>
                    <p className="text-[#8892b0] text-base leading-relaxed">
                        {project.overview}
                    </p>
                </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
                <div>
                    <h4 className="text-[#cacaca] text-base font-semibold mb-2">Features</h4>
                    <ul className="space-y-1.5">
                        {project.features.map((feature, i) => (
                            <li key={i} className="text-[#8892b0] text-base flex items-start gap-2">
                                <span className="text-[#54d5bb] mt-0.5 text-xs">▸</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tech badges */}
            {project.tech && project.tech.length > 0 && (
                <div>
                    <h4 className="text-[#cacaca] text-base font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="text-[#54d5bb] text-xs px-2.5 py-1 rounded-full border border-[#54d5bb]/30 bg-[#54d5bb]/5"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
                <div>
                    <h4 className="text-[#cacaca] text-base font-semibold mb-2">Challenges</h4>
                    <ul className="space-y-1.5">
                        {project.challenges.map((challenge, i) => (
                            <li key={i} className="text-[#8892b0] text-base flex items-start gap-2">
                                <span className="text-gray-500 mt-0.5 text-xs">•</span>
                                {challenge}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Media slider */}
            {project.media && project.media.length > 0 && (
                <MediaSlider media={project.media} projectTitle={project.title} />
            )}
        </div>
    );

    const content = isMobile ? (
        <div className="fixed inset-0 z-[999]" onClick={handleClose}>
            <div className="absolute inset-0 bg-black/50" />

            <div
                ref={sheetRef}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                className="absolute bottom-0 left-0 right-0 bg-[#222222] rounded-t-2xl max-h-[80vh] overflow-y-auto project-detail-scroll"
                style={{
                    animation: isClosing
                        ? "slideDown 0.3s ease-in forwards"
                        : "slideUp 0.3s ease-out",
                }}
            >
                <div className="drag-handle flex justify-center pt-3 pb-2 sticky top-0 bg-[#222222] z-10">
                    <div className="w-10 h-1 rounded-full bg-gray-600" />
                </div>

                <div className="px-6 pb-8">{renderContent()}</div>
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
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            onClick={handleClose}
        >
            <div className="absolute inset-0 bg-black/50" />

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#222222] rounded-xl max-w-2xl w-full mx-4 p-8 max-h-[80vh] overflow-y-auto project-detail-scroll"
                style={{
                    animation: isClosing
                        ? "fadeOut 0.2s ease-in forwards"
                        : "fadeIn 0.2s ease-out",
                }}
            >
                {renderContent()}

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

    return createPortal(
        <>
            {content}
            <style>{`
                .project-detail-scroll::-webkit-scrollbar {
                    width: 4px;
                }
                .project-detail-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .project-detail-scroll::-webkit-scrollbar-thumb {
                    background: #3a3a3a;
                    border-radius: 4px;
                }
                .project-detail-scroll::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
                .project-detail-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #3a3a3a transparent;
                }
            `}</style>
        </>,
        document.body
    );
};

export default ProjectDetail;
