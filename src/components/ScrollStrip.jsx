import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from './ui/Button';

export const ScrollStrip = ({ children, title = '', eyebrow = '', className = '' }) => {
  const scrollContainerRef = useRef(null);
  const targetScrollRef = useRef(null);
  const rafIdRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    // Clear active programmatic target once reached
    if (targetScrollRef.current !== null && Math.abs(scrollLeft - targetScrollRef.current) < 5) {
      targetScrollRef.current = null;
    }

    const newCanScrollLeft = scrollLeft > 5;
    const newCanScrollRight = scrollLeft < scrollWidth - clientWidth - 5;

    setCanScrollLeft((prev) => (prev !== newCanScrollLeft ? newCanScrollLeft : prev));
    setCanScrollRight((prev) => (prev !== newCanScrollRight ? newCanScrollRight : prev));
  }, []);

  const handleScroll = () => {
    if (rafIdRef.current) return;
    rafIdRef.current = requestAnimationFrame(() => {
      checkScroll();
      rafIdRef.current = null;
    });
  };

  const getCardStride = () => {
    if (!scrollContainerRef.current) return 0;
    const items = scrollContainerRef.current.children;
    if (!items || items.length === 0) return 0;
    if (items.length >= 2) {
      const rect0 = items[0].getBoundingClientRect();
      const rect1 = items[1].getBoundingClientRect();
      const stride = rect1.left - rect0.left;
      if (stride > 0) return stride;
    }
    return items[0].getBoundingClientRect().width || 320;
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const stride = getCardStride();
    if (stride <= 0) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    // Use active target if mid-animation to prevent conflict during rapid consecutive clicks
    const currentScroll = targetScrollRef.current !== null ? targetScrollRef.current : container.scrollLeft;
    const target = direction === 'left' ? currentScroll - stride : currentScroll + stride;

    // Snap to nearest integer stride to guarantee exact card-to-padding alignment
    const nearestIndex = Math.round(target / stride);
    const snappedTarget = Math.max(0, Math.min(maxScroll, nearestIndex * stride));

    targetScrollRef.current = snappedTarget;
    container.scrollTo({ left: snappedTarget, behavior: 'smooth' });
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && scrollContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(scrollContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [checkScroll]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Header with Title and Round Arrow Controls */}
      {(title || eyebrow) && (
        <div className="flex items-end justify-between mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            {eyebrow && (
              <span className="text-[11px] font-sans font-semibold tracking-luxury text-amil-red uppercase block mb-2">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-charcoal font-normal">
                {title}
              </h2>
            )}
            <div className="w-10 h-[2px] bg-amil-red mt-3" />
          </div>

          {/* Desktop Pattern D Round Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            <Button
              variant="round-arrow"
              direction="left"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            />
            <Button
              variant="round-arrow"
              direction="right"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            />
          </div>
        </div>
      )}

      {/* Horizontal Scrollable Row */}
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onPointerDown={() => {
            targetScrollRef.current = null;
          }}
          onWheel={() => {
            targetScrollRef.current = null;
          }}
          className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-8 pb-4"
        >
          {children}
        </div>

        {/* Mobile Edge Fade Indicators */}
        {canScrollLeft && (
          <div className="sm:hidden absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-ivory to-transparent pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="sm:hidden absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-ivory to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default ScrollStrip;
