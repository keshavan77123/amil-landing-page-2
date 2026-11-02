import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const EventLightbox = ({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  setCurrentIndex,
  onIndexChange
}) => {
  const total = images.length;

  const updateIndex = useCallback(
    (newIdx) => {
      setCurrentIndex(newIdx);
      if (onIndexChange) {
        onIndexChange(newIdx);
      }
    },
    [setCurrentIndex, onIndexChange]
  );

  const handlePrev = useCallback(
    (e) => {
      e?.stopPropagation();
      const prevIdx = (currentIndex - 1 + total) % total;
      updateIndex(prevIdx);
    },
    [currentIndex, total, updateIndex]
  );

  const handleNext = useCallback(
    (e) => {
      e?.stopPropagation();
      const nextIdx = (currentIndex + 1) % total;
      updateIndex(nextIdx);
    },
    [currentIndex, total, updateIndex]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || total === 0) return null;

  const currentImage = images[currentIndex] || {};

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Event photo preview"
        className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-50 pointer-events-auto">
          <div className="flex items-center gap-3">
            {currentImage.category && (
              <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-luxury uppercase px-2.5 py-1 bg-white/10 text-muted-gold rounded-sm border border-white/10">
                {currentImage.category}
              </span>
            )}
            <span className="text-xs sm:text-sm font-sans font-medium text-ivory/80 tracking-wider">
              {currentIndex + 1} / {total}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-charcoal/80 border border-ivory/20 text-ivory hover:text-white hover:bg-amil-red transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amil-red"
            aria-label="Close fullscreen preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Viewing Stage with Navigation Arrows */}
        <div
          className="relative w-full max-w-5xl mx-auto flex-grow flex items-center justify-center my-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          {total > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-charcoal/80 border border-ivory/25 text-ivory hover:bg-amil-red hover:border-amil-red active:scale-95 transition-all z-50 focus:outline-none focus:ring-2 focus:ring-amil-red"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>
          )}

          {/* Next Button */}
          {total > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-charcoal/80 border border-ivory/25 text-ivory hover:bg-amil-red hover:border-amil-red active:scale-95 transition-all z-50 focus:outline-none focus:ring-2 focus:ring-amil-red"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 stroke-[2]" />
            </button>
          )}

          {/* Main Full-size Image */}
          <div className="relative max-h-[68vh] sm:max-h-[72vh] flex flex-col items-center justify-center">
            <motion.div
              key={currentImage.src}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.8, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-sm border border-ivory/20 bg-charcoal shadow-2xl flex items-center justify-center max-h-[64vh] sm:max-h-[68vh]"
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt || 'Hotel Amil event venue photograph'}
                className="max-w-full max-h-[64vh] sm:max-h-[68vh] w-auto h-auto object-contain"
              />
            </motion.div>

            {/* Caption underneath */}
            {currentImage.caption && (
              <div className="mt-2.5 text-center max-w-2xl px-4">
                <p className="text-xs sm:text-sm font-sans text-ivory/90 font-light">
                  {currentImage.caption}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Fullscreen Thumbnail Strip */}
        <div
          className="w-full max-w-xl mx-auto flex items-center justify-center gap-2 sm:gap-3 z-50 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={img.src}
                type="button"
                aria-label={`Jump to photo ${idx + 1} of ${total}`}
                onClick={() => updateIndex(idx)}
                className={`relative w-14 sm:w-16 aspect-[16/11] overflow-hidden rounded-[2px] transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-amil-red ring-2 ring-amil-red/60 opacity-100 scale-105'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                } focus:outline-none focus:ring-1 focus:ring-amil-red`}
              >
                <img
                  src={img.src}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default EventLightbox;
