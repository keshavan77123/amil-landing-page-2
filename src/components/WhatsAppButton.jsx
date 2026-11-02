import React from 'react';
import { hotelData } from '../data/hotel';

export const WhatsAppButton = ({
  className = '',
  label = 'Chat on WhatsApp',
  isVisible = true,
  isLandscapeMobile = false,
}) => {
  return (
    <a
      id="floating-whatsapp-btn"
      href={hotelData.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Hotel Amil Concierge on WhatsApp"
      title={label}
      aria-hidden={!isVisible}
      style={{
        bottom: isLandscapeMobile
          ? 'calc(0.75rem + env(safe-area-inset-bottom, 0px))'
          : 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        right: isLandscapeMobile
          ? 'calc(1rem + env(safe-area-inset-right, 0px))'
          : 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      }}
      className={`fixed z-40 group flex items-center justify-center rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 sm:!bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:!right-[calc(1.5rem+env(safe-area-inset-right,0px))] ${
        isLandscapeMobile
          ? 'w-14 h-14'
          : 'w-[68px] h-[68px] min-[375px]:w-[76px] min-[375px]:h-[76px] sm:w-[78px] sm:h-[78px]'
      } ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
          : 'opacity-0 translate-y-4 pointer-events-none invisible'
      } ${className}`}
    >
      <img
        src="/images/icons/whatsapp-icon.png"
        alt={label}
        className="w-full h-full object-contain pointer-events-none select-none scale-[1.20] drop-shadow-[0_4px_14px_rgba(0,0,0,0.22)] group-hover:drop-shadow-[0_6px_18px_rgba(0,0,0,0.30)] transition-all duration-300 ease-out"
        loading="eager"
      />
    </a>
  );
};

export default WhatsAppButton;
