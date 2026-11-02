import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Car, Maximize2, X } from 'lucide-react';

export const DestinationGallery = ({
  destinationName = 'Destination',
  gallery = [],
  distance = '',
  drivingTime = '',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Ensure images are sorted in strict numerical order (1 -> 2 -> 3 -> 4)
  // Handles mixed extensions (.jpg, .jpeg, .png, .webp, .jfif, .svg) and prefixes ('img', 'image')
  const sortedGallery = useMemo(() => {
    if (!Array.isArray(gallery) || gallery.length <= 1) return gallery;

    const extractNumber = (item) => {
      const src = typeof item === 'string' ? item : (item?.src || '');
      const match = src.match(/(?:img|image|perspective|pic)[-_]?(\d+)/i) ||
                    src.match(/[-_](\d+)\.[^.]+$/i) ||
                    src.match(/(\d+)\.[^.]+$/i);
      return match ? parseInt(match[1], 10) : null;
    };

    return [...gallery].sort((a, b) => {
      const numA = extractNumber(a);
      const numB = extractNumber(b);
      if (numA !== null && numB !== null) {
        return numA - numB;
      }
      return 0;
    });
  }, [gallery]);

  const total = sortedGallery.length || 4;

  const currentImage = sortedGallery[currentIndex] || sortedGallery[0] || {
    src: '/images/nearby/placeholders/default.svg',
    alt: destinationName,
    caption: destinationName
  };

  const handlePrev = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    },
    [total]
  );

  const handleNext = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % total);
    },
    [total]
  );

  const handleOpenFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  // Keyboard navigation for card-level focus
  const handleKeyDown = useCallback(
    (e) => {
      if (isFullscreen) return; // handled by global listener when fullscreen
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpenFullscreen();
      }
    },
    [isFullscreen, handlePrev, handleNext, handleOpenFullscreen]
  );

  // Lock body scroll and register global keyboard listener when fullscreen is active
  useEffect(() => {
    if (!isFullscreen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseFullscreen();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isFullscreen, handleCloseFullscreen, handlePrev, handleNext]);

  return (
    <div
      className={`relative w-full focus:outline-none ${className}`}
      aria-label={`${destinationName} photography gallery`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
    >
      {/* ── MAIN FEATURED STAGE (aspect 16/10) ── */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury rounded-[2px] select-none group cursor-pointer"
        onClick={handleOpenFullscreen}
        title="Click to view fullscreen photo"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt || `${destinationName} photo ${currentIndex + 1}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/nearby/placeholders/default.svg';
            }}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </AnimatePresence>

        {/* ── FULLSCREEN EXPAND PROMPT BADGE ── */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenFullscreen();
          }}
          aria-label={`Open ${destinationName} photo in fullscreen`}
          className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 p-2 sm:p-2.5 rounded-full bg-charcoal/70 hover:bg-amil-red active:scale-95 text-ivory border border-ivory/25 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-20 opacity-90 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-amil-red"
          title="Fullscreen view"
        >
          <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
        </button>

        {/* ── MANDATORY FLOATING DISTANCE & TRAVEL TIME OVERLAY ── */}
        <div className="absolute bottom-11 sm:bottom-12 left-2.5 sm:left-4 z-20 flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-charcoal/85 backdrop-blur-md border border-ivory/20 rounded-[2px] shadow-lg text-ivory max-w-[calc(100%-20px)] pointer-events-none">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-medium text-ivory">
            <MapPin className="w-3.5 h-3.5 text-muted-gold flex-shrink-0" />
            <span className="whitespace-nowrap">{distance || 'Distance unavailable'}</span>
          </div>
          <span className="text-ivory/30 text-xs hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-medium text-ivory">
            <Car className="w-3.5 h-3.5 text-muted-gold flex-shrink-0" />
            <span className="whitespace-nowrap">{drivingTime || 'Travel time unavailable'}</span>
          </div>
        </div>

        {/* ── PREVIOUS BUTTON ── */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={`Previous photo of ${destinationName}`}
          className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-charcoal/70 hover:bg-amil-red active:scale-95 text-ivory border border-ivory/25 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-amil-red"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </button>

        {/* ── NEXT BUTTON ── */}
        <button
          type="button"
          onClick={handleNext}
          aria-label={`Next photo of ${destinationName}`}
          className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-charcoal/70 hover:bg-amil-red active:scale-95 text-ivory border border-ivory/25 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-amil-red"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </button>

        {/* ── CAPTION BAR & SYNCHRONIZED 1 / 4 COUNTER ── */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/95 via-charcoal/80 to-transparent pt-6 pb-2 px-3 sm:px-4 text-ivory flex items-center justify-between z-10 pointer-events-none">
          <span className="text-[11px] sm:text-xs font-sans tracking-wide truncate pr-3 text-ivory/95">
            {currentImage.caption || currentImage.alt}
          </span>
          <span className="text-[11px] sm:text-xs font-sans font-semibold text-muted-gold tracking-luxury uppercase flex-shrink-0 bg-charcoal/70 px-2 py-0.5 rounded-[2px] border border-ivory/15">
            {`${currentIndex + 1} / ${total}`}
          </span>
        </div>
      </div>

      {/* ── PREMIUM FULLSCREEN IMAGE VIEWER MODAL ── */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isFullscreen && (
              <motion.div
                key="fullscreen-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="fixed inset-0 z-[9999] flex flex-col bg-[#0D0B0A]/95 backdrop-blur-md select-none"
                role="dialog"
                aria-modal="true"
                aria-label={`${destinationName} fullscreen viewer`}
                onClick={handleCloseFullscreen}
              >
                {/* ── TOP HEADER BAR ── */}
                <div
                  className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-b from-black/80 to-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col pr-4">
                    <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold">
                      {destinationName}
                    </span>
                    <span className="text-xs sm:text-sm font-sans text-ivory/90 truncate max-w-[220px] sm:max-w-md md:max-w-lg">
                      {currentImage.caption || currentImage.alt}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <span className="text-xs sm:text-sm font-sans font-semibold text-muted-gold tracking-luxury uppercase bg-charcoal/80 px-2.5 sm:px-3 py-1 rounded-[2px] border border-ivory/20 shadow-sm">
                      {`${currentIndex + 1} / ${total}`}
                    </span>
                    <button
                      type="button"
                      onClick={handleCloseFullscreen}
                      aria-label="Close fullscreen view"
                      className="p-2 sm:p-2.5 rounded-full bg-charcoal/70 hover:bg-amil-red active:scale-95 text-ivory border border-ivory/25 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amil-red"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                    </button>
                  </div>
                </div>

                {/* ── MAIN FULLSCREEN STAGE (centered, object-contain, maximum scale) ── */}
                <div
                  className="relative flex-1 flex items-center justify-center p-2 sm:p-6 md:p-8 overflow-hidden"
                  onClick={handleCloseFullscreen}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage.src}
                      src={currentImage.src}
                      alt={currentImage.alt || `${destinationName} photo ${currentIndex + 1}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/nearby/placeholders/default.svg';
                      }}
                      className="max-h-[80vh] sm:max-h-[82vh] max-w-[95vw] sm:max-w-[90vw] object-contain shadow-2xl rounded-[2px] pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </AnimatePresence>

                  {/* ── FULLSCREEN PREVIOUS BUTTON ── */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev(e);
                    }}
                    aria-label={`Previous photo of ${destinationName}`}
                    className="absolute left-2.5 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-charcoal/80 hover:bg-amil-red active:scale-95 text-ivory border border-ivory/25 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 z-30 focus:outline-none focus:ring-2 focus:ring-amil-red"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
                  </button>

                  {/* ── FULLSCREEN NEXT BUTTON ── */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext(e);
                    }}
                    aria-label={`Next photo of ${destinationName}`}
                    className="absolute right-2.5 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-charcoal/80 hover:bg-amil-red active:scale-95 text-ivory border border-ivory/25 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 z-30 focus:outline-none focus:ring-2 focus:ring-amil-red"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
                  </button>
                </div>

                {/* ── BOTTOM CAPTION & KEYBOARD NAVIGATION HINT BAR ── */}
                <div
                  className="relative z-30 px-4 py-3 text-center bg-gradient-to-t from-black/85 to-transparent flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 max-w-7xl mx-auto w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-xs sm:text-sm font-sans text-ivory/90 truncate max-w-xl text-left">
                    {currentImage.caption || currentImage.alt}
                  </p>
                  <p className="text-[11px] sm:text-xs font-sans text-ivory/60 tracking-wide text-right">
                    Use <span className="text-muted-gold font-medium">←</span> and <span className="text-muted-gold font-medium">→</span> to navigate • Press <span className="text-muted-gold font-medium">ESC</span> to close
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default DestinationGallery;
