// HeroBookingBar.jsx – Refined hotel booking bar overlay for Hotel Amil
// Features:
// 1. Transparent default state allowing the hero photography to show through.
// 2. Active field switches to warm ivory/cream with dark charcoal text.
// 3. Generous left-side padding for balanced horizontal alignment.
// 4. ~10% visual size reduction for a compact, luxury aesthetic.
// 5. Permanently burgundy "CHECK RATES" action button.
// 6. 100% preservation of all date/guest validation and booking routes.

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Calendar, Users, ChevronDown, Plus, Minus, X, ArrowRight } from 'lucide-react';

/** Helper to parse a "YYYY-MM-DD" string into a local Date without UTC offset shifts **/
const parseLocalDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

/** Format Date object back to "YYYY-MM-DD" for standard input / URL params **/
const formatYMD = (date) => {
  if (!date || isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/** Format a "YYYY-MM-DD" date string into prominent day/month + weekday/year line **/
const formatDateDisplay = (dateStr, fallbackText = 'Select Date') => {
  const date = parseLocalDate(dateStr);
  if (!date || isNaN(date.getTime())) {
    return {
      dayMonth: fallbackText,
      weekdayYear: 'Add date',
      isPlaceholder: true,
    };
  }

  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const year = date.getFullYear();

  return {
    dayMonth: `${day} ${month}`,
    weekdayYear: `${weekday}, ${year}`,
    isPlaceholder: false,
  };
};

/** Refined Guest & Room Popover portal with smart boundary positioning **/
const GuestPopover = ({ open, onClose, data, setData, triggerRef }) => {
  const [pos, setPos] = useState({ bottom: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!triggerRef?.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      const popoverWidth = 320;
      const center = rect.left + rect.width / 2;
      const minLeft = popoverWidth / 2 + 16;
      const maxLeft = window.innerWidth - popoverWidth / 2 - 16;
      const clampedLeft = Math.max(minLeft, Math.min(maxLeft, center));

      setPos({
        bottom: window.innerHeight - rect.top + 10,
        left: clampedLeft,
      });
    }
  }, [triggerRef]);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const inc = (field, max) => {
    setData((prev) => ({
      ...prev,
      [field]: Math.min(max, prev[field] + 1),
    }));
  };

  const dec = (field, min) => {
    setData((prev) => ({
      ...prev,
      [field]: Math.max(min, prev[field] - 1),
    }));
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center lg:items-start justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Select Guests and Rooms"
    >
      {/* Dimmed backdrop for dismissal */}
      <div
        className="fixed inset-0 bg-charcoal/30 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popover Card */}
      <div
        data-hero-popover
        onClick={(e) => e.stopPropagation()}
        style={
          typeof window !== 'undefined' && window.innerWidth >= 1024 && pos.bottom > 0
            ? {
                position: 'fixed',
                bottom: `${pos.bottom}px`,
                left: `${pos.left}px`,
                transform: 'translateX(-50%)',
              }
            : undefined
        }
        className="relative w-[92vw] sm:w-80 max-w-sm mb-4 sm:mb-0 bg-warm-white border border-border-light/80 rounded-2xl shadow-[0_20px_50px_rgba(26,24,21,0.28)] p-5 z-50 transition-all duration-200 ease-out animate-in fade-in zoom-in-95"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-light/70">
          <div>
            <h4 className="text-sm font-serif font-semibold text-charcoal">Guests & Rooms</h4>
            <p className="text-[11px] font-sans text-text-muted">Maximum 4 guests per room</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-charcoal hover:bg-black/5 transition-colors focus:outline-none focus:ring-1 focus:ring-amil-red"
            aria-label="Close guests menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Rows */}
        <div className="space-y-3.5">
          {/* Adults */}
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-sm font-sans font-medium text-charcoal">Adults</span>
              <span className="block text-[11px] font-sans text-text-muted">Ages 13 and above</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={() => dec('adults', 1)}
                disabled={data.adults <= 1}
                className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-charcoal hover:bg-amil-red hover:text-ivory hover:border-amil-red disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-all focus:outline-none focus:ring-1 focus:ring-amil-red"
                aria-label="Decrease adults"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-sans font-semibold text-charcoal select-none">
                {data.adults}
              </span>
              <button
                type="button"
                onClick={() => inc('adults', 20)}
                disabled={data.adults >= 20}
                className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-charcoal hover:bg-amil-red hover:text-ivory hover:border-amil-red disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-all focus:outline-none focus:ring-1 focus:ring-amil-red"
                aria-label="Increase adults"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between pt-2.5 border-t border-border-light/40">
            <div>
              <span className="block text-sm font-sans font-medium text-charcoal">Children</span>
              <span className="block text-[11px] font-sans text-text-muted">Ages 0 to 12</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={() => dec('children', 0)}
                disabled={data.children <= 0}
                className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-charcoal hover:bg-amil-red hover:text-ivory hover:border-amil-red disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-all focus:outline-none focus:ring-1 focus:ring-amil-red"
                aria-label="Decrease children"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-sans font-semibold text-charcoal select-none">
                {data.children}
              </span>
              <button
                type="button"
                onClick={() => inc('children', 10)}
                disabled={data.children >= 10}
                className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-charcoal hover:bg-amil-red hover:text-ivory hover:border-amil-red disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-all focus:outline-none focus:ring-1 focus:ring-amil-red"
                aria-label="Increase children"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex items-center justify-between pt-2.5 border-t border-border-light/40">
            <div>
              <span className="block text-sm font-sans font-medium text-charcoal">Rooms</span>
              <span className="block text-[11px] font-sans text-text-muted">Required accommodation</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={() => dec('rooms', 1)}
                disabled={data.rooms <= 1}
                className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-charcoal hover:bg-amil-red hover:text-ivory hover:border-amil-red disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-all focus:outline-none focus:ring-1 focus:ring-amil-red"
                aria-label="Decrease rooms"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-sans font-semibold text-charcoal select-none">
                {data.rooms}
              </span>
              <button
                type="button"
                onClick={() => inc('rooms', 10)}
                disabled={data.rooms >= 10}
                className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-charcoal hover:bg-amil-red hover:text-ivory hover:border-amil-red disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-all focus:outline-none focus:ring-1 focus:ring-amil-red"
                aria-label="Increase rooms"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 bg-amil-red hover:bg-amil-red-dark text-ivory text-xs uppercase tracking-luxury font-semibold py-2.5 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amil-red/50 active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </div>,
    document.body
  );
};

export const HeroBookingBar = () => {
  const navigate = useNavigate();

  // Dynamic baseline dates
  const todayDate = new Date();
  const today = formatYMD(todayDate);

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = formatYMD(tomorrowDate);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);

  const [guestData, setGuestData] = useState({ rooms: 1, adults: 2, children: 0 });
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Active field tracking: 'checkIn' | 'checkOut' | 'guests' | null
  const [activeField, setActiveField] = useState(null);

  const checkInInputRef = useRef(null);
  const checkOutInputRef = useRef(null);
  const guestsTriggerRef = useRef(null);
  const barContainerRef = useRef(null);

  // Dismiss active states when clicking outside the booking bar & popover
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (barContainerRef.current && barContainerRef.current.contains(e.target)) {
        return;
      }
      const popoverEl = document.querySelector('[data-hero-popover]');
      if (popoverEl && popoverEl.contains(e.target)) {
        return;
      }
      setActiveField(null);
      setPopoverOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  // Minimum allowed checkout date (always at least the day after check-in)
  const getMinCheckOut = () => {
    if (!checkIn) return today;
    const d = parseLocalDate(checkIn);
    if (!d) return today;
    d.setDate(d.getDate() + 1);
    return formatYMD(d);
  };

  // Check-in date change handler: automatically validates and advances checkOut if needed
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    if (newCheckIn) {
      const minOut = (() => {
        const d = parseLocalDate(newCheckIn);
        d.setDate(d.getDate() + 1);
        return formatYMD(d);
      })();

      if (!checkOut || checkOut <= newCheckIn) {
        setCheckOut(minOut);
      }
    }
  };

  const handleCheckOutChange = (e) => {
    setCheckOut(e.target.value);
  };

  // Formatted date values for luxury typography presentation
  const checkInDisplay = formatDateDisplay(checkIn, 'Select Date');
  const checkOutDisplay = formatDateDisplay(checkOut, 'Select Date');

  // Submit / Navigate to booking enquiry with parameters intact
  const handleBookNow = () => {
    const params = new URLSearchParams({
      checkIn: checkIn || today,
      checkOut: checkOut || tomorrow,
      adults: guestData.adults.toString(),
      children: guestData.children.toString(),
      rooms: guestData.rooms.toString(),
    });
    navigate(`/booking?${params.toString()}`);
  };

  const isCheckInActive = activeField === 'checkIn';
  const isCheckOutActive = activeField === 'checkOut';
  const isGuestsActive = activeField === 'guests' || popoverOpen;

  return (
    <div className="relative -mt-[40px] mb-5 min-[360px]:mb-6 px-1 min-[340px]:px-2 min-[360px]:px-3 sm:px-0 sm:mt-0 sm:mb-0 sm:absolute sm:bottom-4 md:bottom-5 lg:bottom-6 xl:bottom-8 sm:left-1/2 sm:-translate-x-1/2 w-[96%] min-[360px]:w-[94%] sm:w-[88%] max-w-md sm:max-w-2xl lg:max-w-[685px] xl:max-w-[748px] z-30 flex justify-center mx-auto shrink-0">
      {/* Outer Card: High-contrast luxury charcoal in normal document flow on phones, floating glassmorphism on tablet & desktop */}
      <div
        ref={barContainerRef}
        id="hero-booking-card"
        className="w-full bg-[#FAF7F2] sm:bg-charcoal/40 backdrop-blur-md border border-[#E8DEC8] sm:border-white/20 rounded-2xl shadow-[0_12px_36px_rgba(26,24,21,0.12)] sm:shadow-[0_16px_45px_rgba(0,0,0,0.35)] p-1.5 min-[340px]:p-2 sm:pl-3 sm:pr-1.5 sm:py-1.5 lg:pl-4 lg:pr-1.5 lg:py-1 transition-all duration-300"
      >
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* ROW 1 (Phone: Side-by-Side Check-In & Check-Out | Tablet & Desktop: Preserved Flow) */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center sm:contents">
            {/* FIELD 1: CHECK-IN */}
            <div
              className={`relative flex-1 group px-1.5 min-[340px]:px-2.5 py-1.5 sm:px-3 lg:px-2.5 lg:py-1 rounded-xl cursor-pointer transition-all duration-300 ${
                isCheckInActive
                  ? 'bg-white/90 sm:bg-[#FAF7F2] shadow-sm sm:shadow-md border border-[#E8DEC8]'
                  : 'bg-transparent hover:bg-black/[0.03] sm:hover:bg-white/10 border border-transparent'
              }`}
              onClick={() => {
                setActiveField('checkIn');
                try {
                  checkInInputRef.current?.showPicker();
                } catch {
                  checkInInputRef.current?.focus();
                }
              }}
            >
              {/* Native date input overlaying the cell for full accessibility */}
              <input
                ref={checkInInputRef}
                id="hero-checkin"
                type="date"
                value={checkIn}
                min={today}
                onFocus={() => setActiveField('checkIn')}
                onChange={handleCheckInChange}
                aria-label="Check-in Date"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center space-x-1 min-[340px]:space-x-1.5 sm:space-x-2 pointer-events-none">
                <div
                  className={`w-4 h-4 min-[340px]:w-5 min-[340px]:h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    isCheckInActive
                      ? 'text-amil-red sm:bg-warm-white sm:border sm:border-border-light/80'
                      : 'text-amil-red sm:text-muted-gold sm:bg-black/30 sm:border sm:border-white/20 group-hover:border-muted-gold/60'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 min-[340px]:w-4 min-[340px]:h-4 sm:w-3 sm:h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`block text-[8.5px] min-[340px]:text-[9px] font-sans font-semibold tracking-[0.08em] min-[340px]:tracking-luxury uppercase transition-colors ${
                      isCheckInActive ? 'text-amil-red' : 'text-amil-red sm:text-ivory/80'
                    }`}
                  >
                    CHECK-IN
                  </span>
                  <span
                    className={`block text-[12.5px] min-[320px]:text-[13px] min-[340px]:text-[14px] sm:text-[13.5px] lg:text-[14.5px] font-serif font-medium leading-tight tracking-tight whitespace-nowrap transition-colors ${
                      isCheckInActive ? 'text-charcoal' : 'text-charcoal sm:text-ivory'
                    }`}
                  >
                    {checkInDisplay.dayMonth}
                  </span>
                  <span
                    className={`block text-[8.5px] min-[340px]:text-[9.5px] sm:text-[10px] font-sans leading-tight truncate transition-colors ${
                      isCheckInActive ? 'text-text-muted' : 'text-text-muted sm:text-ivory/70'
                    }`}
                  >
                    {checkInDisplay.weekdayYear}
                  </span>
                </div>
              </div>
            </div>

            {/* Separator between Check-In & Check-Out */}
            {/* Phone: Vertical hairline between side-by-side columns */}
            <div
              className={`w-[1px] h-7 my-auto sm:hidden transition-opacity duration-300 ${
                isCheckInActive || isCheckOutActive ? 'opacity-0' : 'bg-[#E8DEC8]'
              }`}
              aria-hidden="true"
            />
            {/* Tablet: Horizontal hairline */}
            <div
              className={`hidden sm:block lg:hidden h-[1px] w-full transition-opacity duration-300 my-1 ${
                isCheckInActive || isCheckOutActive ? 'opacity-0' : 'bg-white/15'
              }`}
              aria-hidden="true"
            />
            {/* Desktop: Vertical hairline */}
            <div
              className={`hidden lg:block w-[1px] h-6 my-auto transition-opacity duration-300 ${
                isCheckInActive || isCheckOutActive ? 'opacity-0' : 'bg-white/25'
              }`}
              aria-hidden="true"
            />

            {/* FIELD 2: CHECK-OUT */}
            <div
              className={`relative flex-1 group px-1.5 min-[340px]:px-2.5 py-1.5 sm:px-3 lg:px-2.5 lg:py-1 rounded-xl cursor-pointer transition-all duration-300 ${
                isCheckOutActive
                  ? 'bg-white/90 sm:bg-[#FAF7F2] shadow-sm sm:shadow-md border border-[#E8DEC8]'
                  : 'bg-transparent hover:bg-black/[0.03] sm:hover:bg-white/10 border border-transparent'
              }`}
              onClick={() => {
                setActiveField('checkOut');
                try {
                  checkOutInputRef.current?.showPicker();
                } catch {
                  checkOutInputRef.current?.focus();
                }
              }}
            >
              {/* Native date input overlaying the cell for full accessibility */}
              <input
                ref={checkOutInputRef}
                id="hero-checkout"
                type="date"
                value={checkOut}
                min={getMinCheckOut()}
                onFocus={() => setActiveField('checkOut')}
                onChange={handleCheckOutChange}
                aria-label="Check-out Date"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center space-x-1 min-[340px]:space-x-1.5 sm:space-x-2 pointer-events-none">
                <div
                  className={`w-4 h-4 min-[340px]:w-5 min-[340px]:h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    isCheckOutActive
                      ? 'text-amil-red sm:bg-warm-white sm:border sm:border-border-light/80'
                      : 'text-amil-red sm:text-muted-gold sm:bg-black/30 sm:border sm:border-white/20 group-hover:border-muted-gold/60'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 min-[340px]:w-4 min-[340px]:h-4 sm:w-3 sm:h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`block text-[8.5px] min-[340px]:text-[9px] font-sans font-semibold tracking-[0.08em] min-[340px]:tracking-luxury uppercase transition-colors ${
                      isCheckOutActive ? 'text-amil-red' : 'text-amil-red sm:text-ivory/80'
                    }`}
                  >
                    CHECK-OUT
                  </span>
                  <span
                    className={`block text-[12.5px] min-[320px]:text-[13px] min-[340px]:text-[14px] sm:text-[13.5px] lg:text-[14.5px] font-serif font-medium leading-tight tracking-tight whitespace-nowrap transition-colors ${
                      isCheckOutActive ? 'text-charcoal' : 'text-charcoal sm:text-ivory'
                    }`}
                  >
                    {checkOutDisplay.dayMonth}
                  </span>
                  <span
                    className={`block text-[8.5px] min-[340px]:text-[9.5px] sm:text-[10px] font-sans leading-tight truncate transition-colors ${
                      isCheckOutActive ? 'text-text-muted' : 'text-text-muted sm:text-ivory/70'
                    }`}
                  >
                    {checkOutDisplay.weekdayYear}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Separator 2 (Desktop vertical hairline / Mobile & Tablet horizontal hairline) */}
          <div
            className={`hidden lg:block w-[1px] h-6 my-auto transition-opacity duration-300 ${
              isCheckOutActive || isGuestsActive ? 'opacity-0' : 'bg-white/25'
            }`}
            aria-hidden="true"
          />
          <div
            className={`lg:hidden h-[1px] w-full transition-opacity duration-300 my-1 ${
              isCheckOutActive || isGuestsActive ? 'opacity-0' : 'bg-[#E8DEC8] sm:bg-white/15'
            }`}
            aria-hidden="true"
          />

          {/* ROW 2 (Phone: Full-width Guests & Rooms | Tablet & Desktop: Preserved) */}
          <div
            ref={guestsTriggerRef}
            className={`relative flex-1 group px-2 min-[340px]:px-3 py-1.5 lg:px-2.5 lg:py-1 rounded-xl cursor-pointer transition-all duration-300 focus:outline-none ${
              isGuestsActive
                ? 'bg-white/90 sm:bg-[#FAF7F2] shadow-sm sm:shadow-md border border-[#E8DEC8]'
                : 'bg-transparent hover:bg-black/[0.03] sm:hover:bg-white/10 border border-transparent'
            }`}
            onClick={() => {
              const nextOpen = !popoverOpen;
              setPopoverOpen(nextOpen);
              setActiveField(nextOpen ? 'guests' : null);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const nextOpen = !popoverOpen;
                setPopoverOpen(nextOpen);
                setActiveField(nextOpen ? 'guests' : null);
              }
            }}
            aria-haspopup="dialog"
            aria-expanded={popoverOpen}
            aria-label="Select guests and rooms"
          >
            <div className="flex items-center space-x-1.5 min-[340px]:space-x-2">
              <div
                className={`w-4 h-4 min-[340px]:w-5 min-[340px]:h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                  isGuestsActive
                    ? 'text-amil-red sm:bg-warm-white sm:border sm:border-border-light/80'
                    : 'text-amil-red sm:text-muted-gold sm:bg-black/30 sm:border sm:border-white/20 group-hover:border-muted-gold/60'
                }`}
              >
                <Users className="w-3.5 h-3.5 min-[340px]:w-4 min-[340px]:h-4 sm:w-3 sm:h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={`block text-[8.5px] min-[340px]:text-[9px] font-sans font-semibold tracking-[0.08em] min-[340px]:tracking-luxury uppercase transition-colors ${
                    isGuestsActive ? 'text-amil-red' : 'text-amil-red sm:text-ivory/80'
                  }`}
                >
                  GUESTS
                </span>
                <span
                  className={`block text-[11px] min-[340px]:text-xs lg:text-[12.5px] font-serif font-medium leading-tight truncate transition-colors ${
                    isGuestsActive ? 'text-charcoal' : 'text-charcoal sm:text-ivory'
                  }`}
                >
                  {guestData.adults} {guestData.adults === 1 ? 'Adult' : 'Adults'} · {guestData.children} {guestData.children === 1 ? 'Child' : 'Children'}
                </span>
                <span
                  className={`block text-[9px] min-[340px]:text-[10px] font-sans leading-tight transition-colors ${
                    isGuestsActive ? 'text-text-muted' : 'text-text-muted sm:text-ivory/70'
                  }`}
                >
                  {guestData.rooms} {guestData.rooms === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 flex-shrink-0 ${
                  isGuestsActive ? 'rotate-180 text-amil-red' : 'text-amil-red/80 sm:text-ivory/70 group-hover:text-amil-red sm:group-hover:text-ivory'
                }`}
              />
            </div>
          </div>

          {/* Separator 3 for Tablet only */}
          <div
            className={`hidden sm:block lg:hidden h-[1px] w-full transition-opacity duration-300 my-1 ${
              isGuestsActive ? 'opacity-0' : 'bg-white/15'
            }`}
            aria-hidden="true"
          />

          {/* ROW 3 (Phone: Full-width CHECK RATES Button | Tablet: Full-width | Desktop: Inline) */}
          <div className="p-0.5 lg:pl-1.5 shrink-0">
            <button
              id="hero-check-rates-btn"
              type="button"
              onClick={handleBookNow}
              className="w-full lg:w-auto px-3 min-[340px]:px-5 py-2.5 min-[340px]:py-3 bg-[#7B1113] hover:bg-[#660C0E] sm:bg-amil-red sm:hover:bg-amil-red-dark text-white font-sans font-semibold uppercase text-[10.5px] min-[340px]:text-[11px] lg:text-xs tracking-[0.1em] min-[340px]:tracking-luxury rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1.5 active:scale-[0.98] group focus:outline-none focus:ring-2 focus:ring-amil-red focus:ring-offset-2"
            >
              <span className="whitespace-nowrap">CHECK RATES</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Guest & Room Popover Portal */}
      <GuestPopover
        open={popoverOpen}
        onClose={() => {
          setPopoverOpen(false);
          setActiveField(null);
        }}
        data={guestData}
        setData={setGuestData}
        triggerRef={guestsTriggerRef}
      />
    </div>
  );
};

export default HeroBookingBar;
