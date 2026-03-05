import React, { useState, useRef } from "react";

const MediaSlider = ({ media, projectTitle }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const touchStartX = useRef(0);

    const nextSlide = () =>
        setSlideIndex((prev) => (prev + 1) % media.length);
    const prevSlide = () =>
        setSlideIndex((prev) => (prev - 1 + media.length) % media.length);

    if (!media || media.length === 0) return null;

    return (
        <div className="media-slider">
            <h4 className="text-[#cacaca] text-base font-semibold mb-2">Media</h4>

            {/* Slider container */}
            <div
                className="relative overflow-hidden rounded-lg"
                onTouchStart={(e) => {
                    touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                    const diff = touchStartX.current - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) {
                        diff > 0 ? nextSlide() : prevSlide();
                    }
                }}
            >
                {/* Slides track */}
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                >
                    {media.map((item, i) => (
                        <img
                            key={i}
                            src={item}
                            alt={`${projectTitle} screenshot ${i + 1}`}
                            className="w-full h-[300px] flex-shrink-0 object-contain bg-[#1a1a1a] rounded-lg"
                            draggable={false}
                            loading="lazy"
                        />
                    ))}
                </div>

                {media.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full items-center justify-center text-sm transition-colors hidden md:flex"
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full items-center justify-center text-sm transition-colors hidden md:flex"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Dots + counter */}
            {media.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-3">
                    {media.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSlideIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === slideIndex ? "bg-[#54d5bb]" : "bg-gray-600"
                                }`}
                        />
                    ))}
                    <span className="text-gray-600 text-xs ml-2">
                        {slideIndex + 1}/{media.length}
                    </span>
                </div>
            )}
        </div>
    );
};

export default MediaSlider;
