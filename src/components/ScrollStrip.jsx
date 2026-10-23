import React, { useRef, useState, useEffect } from 'react';
import { Button } from './ui/Button';

export const ScrollStrip = ({ children, title = '', eyebrow = '', className = '' }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

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
          onScroll={checkScroll}
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
