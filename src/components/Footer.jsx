import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { hotelData } from '../data/hotel';

// Custom clean inline SVG social icons
const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-charcoal text-ivory pt-16 pb-12 border-t border-ivory/10 overflow-hidden">
      {/* Background Crest Watermark (Section 36) */}
      <div
        className="absolute -right-20 -bottom-20 w-[500px] h-[500px] pointer-events-none opacity-20 bg-no-repeat bg-contain"
        style={{ backgroundImage: `url('/images/brand/crest-watermark.svg')` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-ivory/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/images/brand/hotel-amil-logo-reversed.svg"
                alt="Hotel Amil"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-ivory/70 font-sans font-light leading-relaxed max-w-sm">
              Rooted in the serene foothills of Rajapalayam, Hotel Amil delivers quiet luxury, refined comfort, and authentic South Indian warmth for business travelers, vacationing families, and pilgrims alike.
            </p>
            <div className="pt-2">
              <span className="text-muted-gold font-cormorant italic text-lg block">
                "For Your Comfort..."
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold">
              Navigation
            </h4>
            <div className="w-8 h-[1px] bg-amil-red mb-3" />
            <ul className="space-y-2 text-xs font-sans tracking-wide">
              <li>
                <Link to="/" className="text-ivory/80 hover:text-amil-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-ivory/80 hover:text-amil-red transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/dining" className="text-ivory/80 hover:text-amil-red transition-colors">
                  Saffron Restaurant & Cafe
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="text-ivory/80 hover:text-amil-red transition-colors">
                  Amenities & Banquets
                </Link>
              </li>
              <li>
                <Link to="/nearby" className="text-ivory/80 hover:text-amil-red transition-colors">
                  Nearby Attractions
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-ivory/80 hover:text-amil-red transition-colors">
                  Hotel Policies & CP Plan
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ivory/80 hover:text-amil-red transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-amil-red hover:underline font-medium">
                  Direct Booking Enquiry →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold">
              Inquiries & Desk
            </h4>
            <div className="w-8 h-[1px] bg-amil-red mb-3" />
            <div className="space-y-3 text-xs font-sans text-ivory/80">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amil-red mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{hotelData.fullAddress}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amil-red flex-shrink-0" />
                <span>{hotelData.phone} / {hotelData.mobile}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amil-red flex-shrink-0" />
                <span>{hotelData.email}</span>
              </div>
            </div>
          </div>

          {/* Social & Connect */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold">
              Connect
            </h4>
            <div className="w-8 h-[1px] bg-amil-red mb-3" />
            <p className="text-[11px] text-ivory/70 font-sans leading-normal">
              Follow our culinary stories and hospitality updates:
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={hotelData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hotel Amil Instagram"
                className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/80 hover:text-amil-red hover:border-amil-red transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={hotelData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hotel Amil Facebook"
                className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/80 hover:text-amil-red hover:border-amil-red transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={hotelData.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hotel Amil WhatsApp"
                className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/80 hover:text-emerald-400 hover:border-emerald-400 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-ivory/50">
          <div>
            © {new Date().getFullYear()} Hotel Amil, Rajapalayam. All Rights Reserved. For Your Comfort...
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            <Link to="/policy" className="hover:text-ivory transition-colors">
              Privacy & Policies
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-amil-red transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
