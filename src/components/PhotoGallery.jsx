import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const PhotoGallery = ({ images = [], roomName = 'Room' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const currentImage = images[activeIndex];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Primary Display Card */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/10 border border-border-light/60 cursor-pointer group"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={currentImage}
          alt={`${roomName} photograph ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
        
        {/* Enlarge Hint */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-charcoal/70 backdrop-blur-sm text-ivory text-xs flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="text-[11px] font-sans tracking-wider uppercase">View Fullscreen</span>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-charcoal/60 backdrop-blur-sm text-ivory text-[11px] font-mono">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`relative aspect-[16/10] overflow-hidden border transition-all duration-300 ${
              activeIndex === idx
                ? 'border-amil-red ring-1 ring-amil-red opacity-100'
                : 'border-border-light/60 opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`${roomName} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-ivory hover:text-amil-red transition-colors z-50"
            aria-label="Close fullscreen lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-charcoal/60 border border-ivory/20 text-ivory hover:bg-amil-red transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-charcoal/60 border border-ivory/20 text-ivory hover:bg-amil-red transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={`${roomName} fullscreen`}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />
            <div className="text-center mt-3 text-ivory/70 text-xs font-sans tracking-luxury uppercase">
              {roomName} • {activeIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
