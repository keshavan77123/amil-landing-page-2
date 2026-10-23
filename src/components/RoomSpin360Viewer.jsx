import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Maximize2, Minimize2, RotateCw } from 'lucide-react';

// Antique-gold accent colour (matches muted-gold design token)
const GOLD = '#B08D57';

export const RoomSpin360Viewer = ({ images = [] }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const startFrameRef = useRef(0);
  const totalFrames = images.length || 36;

  // Preload frames into memory for fluid 60fps rotation
  useEffect(() => {
    if (!images.length) return;
    let loadedCount = 0;
    const imgElements = [];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= Math.min(10, images.length)) {
          setLoaded(true);
        }
      };
      imgElements.push(img);
    });

    return () => {
      imgElements.forEach((img) => {
        img.onload = null;
      });
    };
  }, [images]);

  // Handle pointer down (Mouse or Touch)
  const handlePointerDown = useCallback((e) => {
    setIsDragging(true);
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startFrameRef.current = currentFrame;

    if (e.target && e.target.setPointerCapture && e.pointerId) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {
        // Fallback for non-supported browsers
      }
    }
  }, [currentFrame]);

  // Handle pointer move
  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;

    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - startXRef.current;

    // 12 pixels per frame (10 degrees of rotation)
    const pixelsPerFrame = 12;
    const frameOffset = Math.floor(deltaX / pixelsPerFrame);

    // Invert direction so dragging right rotates right
    let newFrame = (startFrameRef.current - frameOffset) % totalFrames;
    if (newFrame < 0) {
      newFrame += totalFrames;
    }

    setCurrentFrame(newFrame);
  }, [isDragging, totalFrames]);

  // Handle pointer up
  const handlePointerUp = useCallback((e) => {
    setIsDragging(false);
    if (e.target && e.target.releasePointerCapture && e.pointerId) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Fallback
      }
    }
  }, []);

  // Fullscreen toggle — preserved exactly
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const activeImageSrc = images[currentFrame] || (images.length > 0 ? images[0] : '');
  const progress = ((currentFrame + 1) / totalFrames) * 100;

  // ── Compact royal dimensions (desktop: max 1100px / 320px tall) ──────────────
  // When in fullscreen the browser owns the dimensions; we still need h-screen.
  const outerCls = isFullscreen
    ? 'h-screen w-screen flex items-center justify-center'
    : 'w-full max-w-[1100px] mx-auto h-[240px] sm:h-[280px] lg:h-[320px]';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-charcoal select-none group ${outerCls}`}
      style={{ borderTop: `1px solid ${GOLD}33`, borderBottom: `1px solid ${GOLD}33` }}
    >
      {/* ── Subtle vignette frame (gold hairline left + right edges) ── */}
      <div
        className="absolute inset-y-0 left-0 w-[2px] z-10 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}55, transparent)` }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[2px] z-10 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}55, transparent)` }}
      />

      {/* ── 360° Canvas — drag interaction area ── */}
      <div
        className="w-full h-full spin-interaction-area flex items-center justify-center relative"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {activeImageSrc && (
          <img
            src={activeImageSrc}
            alt={`360 Room View — Frame ${currentFrame + 1} of ${totalFrames}`}
            className="w-full h-full object-cover pointer-events-none transition-none"
            draggable="false"
          />
        )}

        {/* Ambient gradient vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal/50 via-transparent to-charcoal/25" />
      </div>

      {/* ── Top-left: compact royal badge ── */}
      <div
        className="absolute top-3 left-3 z-20 flex items-center space-x-2 px-2.5 py-1 pointer-events-none"
        style={{
          background: 'rgba(26,24,21,0.82)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${GOLD}40`,
        }}
      >
        <RotateCw
          className={`w-3 h-3 flex-shrink-0 ${isDragging ? 'animate-spin' : ''}`}
          style={{ color: GOLD }}
        />
        <span
          className="text-[9px] font-sans font-semibold tracking-luxury uppercase"
          style={{ color: GOLD }}
        >
          360° Room Tour
        </span>
      </div>

      {/* ── Top-right: frame counter + fullscreen button ── */}
      <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5">
        {/* Frame counter */}
        <div
          className="px-2.5 py-1 text-[10px] font-mono"
          style={{
            background: 'rgba(26,24,21,0.82)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${GOLD}40`,
            color: 'rgba(246,241,233,0.7)',
          }}
        >
          <span style={{ color: 'var(--amil-red)', fontWeight: 600 }}>
            {String(currentFrame + 1).padStart(2, '0')}
          </span>
          <span style={{ color: 'rgba(246,241,233,0.35)', margin: '0 3px' }}>/</span>
          <span>{String(totalFrames).padStart(2, '0')}</span>
        </div>

        {/* Fullscreen toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-1.5 transition-colors"
          style={{
            background: 'rgba(26,24,21,0.82)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${GOLD}40`,
            color: 'rgba(246,241,233,0.8)',
          }}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(246,241,233,0.8)'; }}
        >
          {isFullscreen
            ? <Minimize2 className="w-3.5 h-3.5" />
            : <Maximize2 className="w-3.5 h-3.5" />
          }
        </button>
      </div>

      {/* ── Bottom-centre: drag hint (fades out while dragging) ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
        <div
          className={`flex items-center space-x-2 px-3 py-1 text-[9px] font-sans font-light uppercase tracking-luxury transition-all duration-300 ${
            isDragging ? 'opacity-20 scale-95' : 'opacity-80 scale-100'
          }`}
          style={{
            background: 'rgba(26,24,21,0.75)',
            backdropFilter: 'blur(6px)',
            border: `1px solid ${GOLD}30`,
            color: 'rgba(246,241,233,0.85)',
          }}
        >
          <span style={{ color: GOLD, fontWeight: 700, fontSize: '10px' }}>←</span>
          <span>Drag to rotate</span>
          <span style={{ color: GOLD, fontWeight: 700, fontSize: '10px' }}>→</span>
        </div>
      </div>

      {/* ── Bottom: antique-gold progress rail ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
        style={{ background: 'rgba(26,24,21,0.6)' }}
      >
        <div
          className="h-full transition-all duration-75"
          style={{ width: `${progress}%`, background: GOLD }}
        />
      </div>
    </div>
  );
};

export default RoomSpin360Viewer;
