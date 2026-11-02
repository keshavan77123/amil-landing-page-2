import React, { useEffect, useRef, useState } from 'react';
import { RotateCw } from 'lucide-react';
import 'pannellum';
import 'pannellum/build/pannellum.css';

// Antique-gold accent colour (matches muted-gold design token)
const GOLD = '#B08D57';

export const RoomPanoramaViewer = ({ panorama, roomName = 'Room' }) => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const initializedRef = useRef(false);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  // 1. Observe container entry into viewport (lazy initialization)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Initialize only once
        }
      },
      {
        rootMargin: '200px 0px', // preload 200px before scrolling into view
        threshold: 0.01,
      }
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Initialize Pannellum once when in view
  useEffect(() => {
    if (!isInView || !panorama) return;
    const container = containerRef.current;
    if (!container) return;

    // Strict single initialization guard
    if (initializedRef.current) return;

    if (!window.pannellum) {
      setFailed(true);
      setIsLoading(false);
      return;
    }

    initializedRef.current = true;

    try {
      const viewer = window.pannellum.viewer(container, {
        type: 'equirectangular',
        panorama,
        autoLoad: true,
        showControls: true,
        showFullscreenCtrl: true,
        showZoomCtrl: true,
        mouseZoom: true,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        pitch: 0,
        yaw: 0,
      });

      viewerRef.current = viewer;

      viewer.on('load', () => {
        setIsLoading(false);
      });

      viewer.on('error', () => {
        setFailed(true);
        setIsLoading(false);
      });
    } catch (err) {
      console.error('Failed to initialize Pannellum viewer:', err);
      setFailed(true);
      setIsLoading(false);
    }

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e) {
          // ignore cleanup errors
        }
        viewerRef.current = null;
        initializedRef.current = false;
      }
    };
  }, [isInView, panorama]);

  return (
    <div
      ref={wrapperRef}
      className="amil-panorama relative overflow-hidden bg-charcoal select-none group w-full max-w-[1100px] mx-auto h-[240px] sm:h-[280px] lg:h-[320px]"
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

      {/* Panorama Container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Ambient gradient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal/50 via-transparent to-charcoal/25" />

      {/* Loading state indicator */}
      {isLoading && !failed && (
        <div className="absolute inset-0 z-15 flex flex-col items-center justify-center bg-charcoal/85 transition-opacity duration-300 pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-muted-gold/25 border-t-muted-gold animate-spin mb-2" />
          <span className="text-[10px] font-sans tracking-luxury uppercase text-muted-gold/90 font-medium">
            Loading 360° Virtual Tour...
          </span>
        </div>
      )}

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
          className="w-3 h-3 flex-shrink-0"
          style={{ color: GOLD }}
        />
        <span
          className="text-[9px] font-sans font-semibold tracking-luxury uppercase"
          style={{ color: GOLD }}
        >
          360° VIRTUAL TOUR
        </span>
      </div>

      {/* ── Bottom-centre: drag & zoom hint ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
        <div
          className="flex items-center space-x-2 px-3 py-1 text-[9px] font-sans font-light uppercase tracking-luxury opacity-80"
          style={{
            background: 'rgba(26,24,21,0.75)',
            backdropFilter: 'blur(6px)',
            border: `1px solid ${GOLD}30`,
            color: 'rgba(246,241,233,0.85)',
          }}
        >
          <span style={{ color: GOLD, fontWeight: 700, fontSize: '10px' }}>←</span>
          <span>Drag to look around · Scroll to zoom</span>
          <span style={{ color: GOLD, fontWeight: 700, fontSize: '10px' }}>→</span>
        </div>
      </div>

      {/* ── Bottom: antique-gold rail line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
        style={{ background: `${GOLD}66` }}
      />

      {failed && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-charcoal/90 px-6 text-center">
          <p className="font-sans text-xs tracking-luxury uppercase text-ivory/80">
            360° panorama could not be loaded.
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomPanoramaViewer;
