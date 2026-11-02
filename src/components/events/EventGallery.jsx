import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const EventGallery = ({
  images = [],
  categoryName = 'Event',
  onOpenLightbox
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const interactionTimerRef = useRef(null);

  const total = images.length;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track if gallery is in the browser viewport
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const triggerInteractionPause = useCallback(() => {
    setIsInteracting(true);
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
    // Pause auto-rotation for 8 seconds after manual user interaction
    interactionTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 8000);
  }, []);

  const handlePrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      triggerInteractionPause();
    },
    [total, triggerInteractionPause]
  );

  const handleNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % total);
      triggerInteractionPause();
    },
    [total, triggerInteractionPause]
  );

  const handleSelectThumbnail = (index) => {
    setCurrentIndex(index);
    triggerInteractionPause();
  };

  // Automatic image rotation (every 4.5 seconds)
  useEffect(() => {
    if (prefersReducedMotion || isHovered || isInteracting || !isInView || total <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isHovered, isInteracting, isInView, prefersReducedMotion]);

  // Clean up interaction timer on unmount
  useEffect(() => {
    return () => {
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!images || total === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      ref={containerRef}
      className="space-y-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${categoryName} photo gallery`}
    >
      {/* ── MAIN PROMINENT DISPLAY IMAGE ── */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group rounded-[2px] cursor-pointer select-none"
        onClick={() => {
          if (onOpenLightbox) {
            onOpenLightbox(images, currentIndex, (newIdx) => setCurrentIndex(newIdx));
          }
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onOpenLightbox) {
              onOpenLightbox(images, currentIndex, (newIdx) => setCurrentIndex(newIdx));
            }
          }
        }}
        aria-label={`View ${currentImage.caption || 'photo'} in fullscreen mode`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt || `${categoryName} photograph ${currentIndex + 1}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </AnimatePresence>

        {/* Fullscreen hover indicator pill */}
        <div className="absolute inset-0 bg-charcoal/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-2 bg-charcoal/80 backdrop-blur-md text-ivory text-xs font-sans tracking-luxury uppercase border border-ivory/20 flex items-center gap-2 rounded-sm shadow-md">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>View Fullscreen</span>
          </span>
        </div>

        {/* ── VISIBLE PREVIOUS BUTTON ── */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={`Previous ${categoryName} photo`}
          className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-charcoal/70 hover:bg-amil-red active:scale-95 text-ivory border border-ivory/25 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-amil-red"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </button>

        {/* ── VISIBLE NEXT BUTTON ── */}
        <button
          type="button"
          onClick={handleNext}
          aria-label={`Next ${categoryName} photo`}
          className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-charcoal/70 hover:bg-amil-red active:scale-95 text-ivory border border-ivory/25 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-amil-red"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </button>

        {/* ── CAPTION & SYNCHRONIZED COUNTER ── */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/95 via-charcoal/80 to-transparent pt-7 pb-2.5 px-3.5 sm:px-4 text-ivory flex items-center justify-between z-10 pointer-events-none">
          <span className="text-[11px] sm:text-xs font-sans tracking-wide truncate pr-3 text-ivory/95">
            {currentImage.caption || currentImage.alt}
          </span>
          <span className="text-[11px] sm:text-xs font-sans font-semibold text-muted-gold tracking-luxury uppercase flex-shrink-0 bg-charcoal/60 px-2 py-0.5 rounded-[2px] border border-ivory/15">
            {`${currentIndex + 1} / ${total}`}
          </span>
        </div>
      </div>

      {/* ── CLICKABLE 5-THUMBNAIL STRIP ── */}
      <div
        className="grid grid-cols-5 gap-2 sm:gap-2.5"
        role="tablist"
        aria-label={`${categoryName} gallery thumbnails`}
      >
        {images.map((img, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`Select photo ${idx + 1} of ${total}: ${img.caption || img.alt}`}
              onClick={() => handleSelectThumbnail(idx)}
              className={`relative aspect-[16/11] overflow-hidden rounded-[2px] transition-all duration-200 border-2 ${
                isSelected
                  ? 'border-amil-red ring-2 ring-amil-red/50 opacity-100 scale-[1.02] shadow-sm'
                  : 'border-border-light/80 opacity-60 hover:opacity-100 hover:border-ivory/80'
              } focus:outline-none focus:ring-2 focus:ring-amil-red`}
            >
              <img
                src={img.src}
                alt={img.alt || `${categoryName} thumbnail ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <span
                className={`absolute bottom-1 right-1 px-1 py-0.5 text-[9px] font-sans leading-none rounded-[1px] pointer-events-none ${
                  isSelected
                    ? 'bg-amil-red text-ivory font-bold'
                    : 'bg-charcoal/80 text-ivory/90'
                }`}
              >
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EventGallery;
