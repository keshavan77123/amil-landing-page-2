import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { hotelData } from '../data/hotel';

export const WhatsAppButton = ({ className = '', label = 'Chat on WhatsApp' }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolledOnMobile, setIsScrolledOnMobile] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolledOnMobile(true);
      return;
    }
    const checkScroll = () => {
      setIsScrolledOnMobile(window.scrollY > 80);
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [isHomePage]);

  return (
    <a
      href={hotelData.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Hotel Amil Concierge on WhatsApp"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group flex items-center justify-center space-x-2 bg-charcoal/90 hover:bg-amil-red text-ivory p-3.5 2xl:px-4 2xl:py-3 rounded-full shadow-elevated border border-ivory/20 backdrop-blur-md transition-all duration-300 hover:scale-105 ${
        isHomePage && !isScrolledOnMobile ? 'max-sm:hidden' : ''
      } ${className}`}
    >
      <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-ivory transition-colors flex-shrink-0" />
      <span className="hidden 2xl:inline text-xs font-sans font-medium tracking-luxury uppercase whitespace-nowrap">
        {label}
      </span>
    </a>
  );
};

export default WhatsAppButton;
