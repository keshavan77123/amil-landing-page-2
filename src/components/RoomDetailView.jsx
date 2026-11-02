import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Users, Bed, Wind, Wifi, Tv, Bath,
  Coffee, Shield, Sparkles, ArrowRight,
  X, ChevronLeft, ChevronRight, Maximize2,
  Eye, Layers, Monitor, Mountain, RotateCw,
  Plus, Minus, AlertCircle
} from 'lucide-react';
import RoomSpin360Viewer from './RoomSpin360Viewer';
import RoomPanoramaViewer from './RoomPanoramaViewer';
import AvailabilityBadge from './AvailabilityBadge';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
import { CONFIRMED_ROOM_RATES, calculateItemSubtotal } from '../utils/cartPricing';

// ── Icon mapping helper for amenity strings ────────────────────────────────────
const getAmenityIcon = (amenityText) => {
  const lower = amenityText.toLowerCase();
  if (lower.includes('bed') || lower.includes('mattress')) return Bed;
  if (lower.includes('ac') || lower.includes('climate')) return Wind;
  if (lower.includes('wi-fi') || lower.includes('wifi') || lower.includes('internet')) return Wifi;
  if (lower.includes('tv') || lower.includes('smart')) return Tv;
  if (lower.includes('bath') || lower.includes('shower') || lower.includes('tub')) return Bath;
  if (lower.includes('coffee') || lower.includes('tea')) return Coffee;
  if (lower.includes('safe')) return Shield;
  return Sparkles;
};

// ── Key Amenities helper extracting concise confirmed amenities from room data ──
const getKeyAmenities = (room) => {
  if (!room) return [];
  const list = [];
  const lower = (room.amenities || []).map((a) => a.toLowerCase());

  // 1. High-Speed WiFi
  if (lower.some((a) => a.includes('wi-fi') || a.includes('wifi') || a.includes('internet'))) {
    list.push({ label: 'High-Speed WiFi', icon: Wifi });
  }
  // 2. Workstation / Desk / Lounge
  if (lower.some((a) => a.includes('desk') || a.includes('workstation'))) {
    list.push({ label: 'Workstation Desk', icon: Monitor });
  } else if (lower.some((a) => a.includes('lounge') || a.includes('salon'))) {
    list.push({ label: 'Living Lounge', icon: Sparkles });
  }
  // 3. Tea / Coffee
  if (lower.some((a) => a.includes('coffee') || a.includes('tea'))) {
    list.push({ label: 'Tea/Coffee Maker', icon: Coffee });
  }
  // 4. Air Conditioning
  if (lower.some((a) => a.includes('ac') || a.includes('climate') || a.includes('temperature'))) {
    list.push({ label: 'Air Conditioning', icon: Wind });
  }
  // 5. Minibar / Pantry
  if (lower.some((a) => a.includes('minibar') || a.includes('fridge') || a.includes('pantry'))) {
    list.push({ label: 'Minibar', icon: Sparkles });
  } else if (lower.some((a) => a.includes('soundproof'))) {
    list.push({ label: 'Soundproofing', icon: Sparkles });
  }
  // 6. In-Room Safe
  if (lower.some((a) => a.includes('safe'))) {
    list.push({ label: 'In-Room Safe', icon: Shield });
  }
  // 7. Premium Bathroom
  if (lower.some((a) => a.includes('bath') || a.includes('shower') || a.includes('tub'))) {
    list.push({ label: 'Premium Bathroom', icon: Bath });
  }
  // 8. Scenic View
  if (room.view && (room.view.includes('View') || room.view.includes('Mountain') || room.view.includes('Balcony'))) {
    list.push({ label: 'Scenic View', icon: Mountain });
  }

  return list;
};

// ── Asymmetric Gallery with inline lightbox ───────────────────────────────────
// Scoped to room-detail pages only. Does NOT modify PhotoGallery.jsx.
const AsymmetricGallery = ({ images = [], roomName = 'Room', hasPanorama = false, isTwinExecutive = false }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const has4 = images.length >= 4;
  const has5 = images.length >= 5;

  // Reusable gallery cell with hover overlay and fullscreen icon
  const GalleryCell = ({ src, alt, index, className = '' }) => (
    <div
      className={`relative overflow-hidden bg-charcoal/10 cursor-pointer group border border-border-light/40 ${className}`}
      onClick={() => openLightbox(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') openLightbox(index);
      }}
      aria-label={`Open ${alt} in full screen`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/22 transition-colors duration-300" />
      {/* Fullscreen icon hint */}
      <div className="absolute bottom-2.5 right-2.5 p-1.5 bg-charcoal/65 backdrop-blur-sm text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Maximize2 className="w-3.5 h-3.5" />
      </div>
    </div>
  );

  return (
    <>
      {/* ── Asymmetric grid ──────────────────────────────────── */}
      <div className="space-y-1.5 sm:space-y-2">

        {/* TOP ROW: large primary image (left) + 2 stacked images (right) */}
        <div
          className="flex gap-1.5 sm:gap-2"
          style={{ height: 'clamp(260px, 40vw, 430px)' }}
        >
          {/* Primary large image — wider */}
          <GalleryCell
            src={images[0]}
            alt={`${roomName} — Main View`}
            index={0}
            className="flex-[2]"
          />

          {/* Right column: 2 images stacked, or single if only 2 images */}
          {images.length >= 3 ? (
            <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
              <GalleryCell
                src={images[1]}
                alt={`${roomName} — View 2`}
                index={1}
                className="flex-1"
              />
              <GalleryCell
                src={images[2]}
                alt={`${roomName} — View 3`}
                index={2}
                className="flex-1"
              />
            </div>
          ) : images.length === 2 ? (
            <GalleryCell
              src={images[1]}
              alt={`${roomName} — View 2`}
              index={1}
              className="flex-1"
            />
          ) : null}
        </div>

        {/* BOTTOM ROW: images 4 & 5 side by side (or just image 4 full-width) */}
        {has4 && (
          <div
            className="flex gap-1.5 sm:gap-2"
            style={{ height: 'clamp(130px, 17vw, 195px)' }}
          >
            {/* Image 4 */}
            <GalleryCell
              src={images[3]}
              alt={`${roomName} — View 4`}
              index={3}
              className="flex-1"
            />
            {/* Image 5 — slightly wider to mirror the top-row asymmetry */}
            {has5 && (
              <GalleryCell
                src={images[4]}
                alt={`${roomName} — View 5`}
                index={4}
                className="flex-[1.6]"
              />
            )}
          </div>
        )}
      </div>

      {/* ── View all photos and 360 Tour buttons ───────────── */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="inline-flex items-center space-x-2 text-[11px] font-sans font-semibold tracking-luxury uppercase text-charcoal-text hover:text-amil-red transition-colors border border-border-light/70 hover:border-amil-red px-4 py-2.5 bg-warm-white"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>View All {images.length} Photos</span>
        </button>

        {isTwinExecutive && hasPanorama && (
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('virtual-tour-360');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 text-[11px] font-sans font-semibold tracking-luxury uppercase text-muted-gold hover:text-amil-red transition-colors border border-muted-gold/60 hover:border-amil-red px-4 py-2.5 bg-warm-white shadow-xs"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>360° Virtual Tour</span>
          </button>
        )}
      </div>

      {/* ── Lightbox modal ──────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/96 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 text-ivory hover:text-amil-red transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 sm:left-7 p-3 rounded-full bg-charcoal/60 border border-ivory/20 text-ivory hover:bg-amil-red transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 sm:right-7 p-3 rounded-full bg-charcoal/60 border border-ivory/20 text-ivory hover:bg-amil-red transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[88vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`${roomName} — Fullscreen View ${lightboxIndex + 1}`}
              className="max-w-full max-h-[88vh] object-contain shadow-2xl"
            />
            <div className="text-center mt-3 text-ivory/55 text-xs font-sans tracking-luxury uppercase">
              {roomName} &nbsp;·&nbsp; {lightboxIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ── Section label component (scoped, room-detail only) ────────────────────────
const SectionLabel = ({ number, label }) => (
  <div className="mb-6 flex items-center space-x-3">
    <span className="text-amil-red font-serif text-sm leading-none">{number}</span>
    <div className="w-6 h-[1px] bg-amil-red/50" />
    <h2 className="text-[11px] uppercase font-sans font-semibold tracking-luxury text-charcoal-text">
      {label}
    </h2>
  </div>
);

// ── Main RoomDetailView ───────────────────────────────────────────────────────
export const RoomDetailView = ({ room }) => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  // Date state with defaults
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [dateError, setDateError] = useState('');
  const [occupancyError, setOccupancyError] = useState('');
  const keyAmenities = getKeyAmenities(room);

  // Nights calculation (enforces minimum 1 night)
  const nights = useMemo(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) return 1;
    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);
    const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays || 1);
  }, [checkIn, checkOut]);

  // Occupancy calculations
  const totalGuests = adults + children;
  const maxOccupancyPerRoom = room?.maxOccupancy || 3;
  const maxPermittedGuests = maxOccupancyPerRoom * rooms;
  const isOccupancyExceeded = totalGuests > maxPermittedGuests;

  // Authoritative room rate and subtotal preview
  const ratePerNight = CONFIRMED_ROOM_RATES[room?.id] || room?.startingPrice || 0;
  const estimatedSubtotal = calculateItemSubtotal(ratePerNight, nights, rooms);

  if (!room) {
    return (
      <div className="py-24 text-center">
        <p className="text-charcoal-text font-serif text-2xl">Room category not found.</p>
        <Link to="/rooms" className="text-amil-red mt-4 inline-block font-sans text-sm">
          Return to All Rooms →
        </Link>
      </div>
    );
  }

  // ── Stay & Guest Handlers ──────────────────────────────────────────────────
  const handleRoomsChange = (updater) => {
    setRooms((prev) => {
      const raw = typeof updater === 'function' ? updater(prev) : updater;
      return Math.max(1, Math.round(Number(raw) || 1));
    });
    setOccupancyError('');
  };

  const handleAdultsChange = (updater) => {
    setAdults((prev) => {
      const raw = typeof updater === 'function' ? updater(prev) : updater;
      return Math.max(1, Math.round(Number(raw) || 1));
    });
    setOccupancyError('');
  };

  const handleChildrenChange = (updater) => {
    setChildren((prev) => {
      const raw = typeof updater === 'function' ? updater(prev) : updater;
      return Math.max(0, Math.round(Number(raw) || 0));
    });
    setOccupancyError('');
  };

  const handleCheckInChange = (e) => {
    const val = e.target.value;
    setCheckIn(val);
    if (val < today) {
      setDateError('Check-in date cannot be in the past.');
      return;
    }
    if (checkOut && val >= checkOut) {
      const nextDay = new Date(val);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
      setDateError('');
    } else {
      setDateError('');
    }
  };

  const handleCheckOutChange = (e) => {
    const val = e.target.value;
    if (val <= checkIn) {
      setDateError('Check-out date must be after check-in date.');
      setCheckOut(val);
    } else {
      setDateError('');
      setCheckOut(val);
    }
  };

  const handleAddToReservation = () => {
    // 1. Date Validation
    if (!checkIn || checkIn < today) {
      setDateError('Check-in date cannot be in the past.');
      return;
    }
    if (!checkOut || checkOut <= checkIn) {
      setDateError('Please ensure check-out date is later than check-in date.');
      return;
    }
    if (nights < 1) {
      setDateError('At least one night must be selected.');
      return;
    }

    // 2. Occupancy Validation
    if (isOccupancyExceeded) {
      setOccupancyError(
        `Occupancy limit exceeded: ${rooms} ${rooms === 1 ? 'room accommodates' : 'rooms accommodate'} up to ${maxPermittedGuests} guests (${totalGuests} selected: ${adults} ${adults === 1 ? 'adult' : 'adults'}${children > 0 ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''}). Please add more rooms or adjust guest count.`
      );
      return;
    }

    // Clear any previous errors
    setDateError('');
    setOccupancyError('');

    // 3. Prepare Cart Item payload conforming to established contract
    const itemData = {
      roomId: room.id,
      roomName: room.name,
      category: room.category || room.name,
      image: room.images && room.images.length > 0 ? room.images[0] : '',
      checkIn: checkIn,
      checkOut: checkOut,
      nights: nights,
      adults: adults,
      children: children,
      rooms: rooms,
      ratePerNight: ratePerNight,
      subtotal: estimatedSubtotal,
    };

    // 4. Add to cart and automatically open reservation drawer
    addToCart(itemData);
    openCart();
  };

  const handleProceedToBooking = () => {
    if (checkOut <= checkIn) {
      setDateError('Please ensure check-out date is later than check-in date.');
      return;
    }
    if (isOccupancyExceeded) {
      setOccupancyError(`Occupancy limit exceeded: ${rooms} ${rooms === 1 ? 'room accommodates' : 'rooms accommodate'} up to ${maxPermittedGuests} guests.`);
      return;
    }
    const params = new URLSearchParams({
      room: room.id,
      checkIn: checkIn,
      checkOut: checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
      payment: 'hotel',
    });
    navigate(`/booking?${params.toString()}`);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">

      {/* ── Breadcrumb ── */}
      <nav className="text-xs font-sans text-text-muted mb-7 flex items-center space-x-2" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-amil-red transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/rooms" className="hover:text-amil-red transition-colors">Rooms</Link>
        <span aria-hidden="true">/</span>
        <span className="text-charcoal font-medium">{room.name}</span>
      </nav>

      {/* ── Room Introduction ── */}
      <header className="mb-10">
        <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
          {room.category} Collection
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-tight">
          {room.name}
        </h1>
        <p className="text-base text-text-muted font-sans font-light mt-2.5 max-w-2xl leading-relaxed">
          {room.tagline}
        </p>

        {/* Inline key specs row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 text-xs font-sans">
          <div className="flex items-center space-x-1.5 text-charcoal-text">
            <Bed className="w-3.5 h-3.5 text-amil-red flex-shrink-0" />
            <span>{room.bedType}</span>
          </div>
          <span className="text-border-light" aria-hidden="true">|</span>
          <div className="flex items-center space-x-1.5 text-charcoal-text">
            <Users className="w-3.5 h-3.5 text-amil-red flex-shrink-0" />
            <span>Max {room.maxOccupancy} Guests</span>
          </div>
          <span className="text-border-light" aria-hidden="true">|</span>
          <span className="text-text-muted">{room.size}</span>
          <span className="text-border-light" aria-hidden="true">|</span>
          <span className="text-amil-red font-semibold">
            From ₹{room.startingPrice.toLocaleString('en-IN')} / night
          </span>
        </div>

        <div className="w-12 h-[2px] bg-amil-red mt-5" aria-hidden="true" />
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 01 — ROOM GALLERY + BOOKING CARD
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="mb-16" aria-label="Room Gallery and Booking">
        <SectionLabel number="01" label="Room Gallery" />

        {/* Two-column: gallery (left) + booking card (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Gallery column */}
          <div className="lg:col-span-8">
            <AsymmetricGallery
              images={room.images}
              roomName={room.name}
              hasPanorama={!!room.panorama}
              isTwinExecutive={room.id === 'twin-executive'}
            />
          </div>

          {/* Booking card column — sticky on desktop */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-warm-white border border-border-light/80 p-5 sm:p-6 shadow-soft-luxury space-y-5">

              {/* Pricing */}
              <div>
                <span className="text-[10px] uppercase font-sans font-semibold tracking-luxury text-text-muted block mb-1">
                  Room Tariff
                </span>
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-3xl font-serif text-charcoal">
                    ₹{room.singlePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-sans text-text-muted">/ night</span>
                </div>

                {/* Pricing breakdown table */}
                <div className="border border-border-light/60 text-xs font-sans divide-y divide-border-light/60 bg-white/60">
                  <div className="flex justify-between p-2.5">
                    <span className="text-text-muted">Single Occupancy</span>
                    <span className="font-medium text-charcoal">₹{room.singlePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span className="text-text-muted">Double Occupancy</span>
                    <span className="font-medium text-charcoal">₹{room.doublePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span className="text-text-muted">Extra Person (Rollaway)</span>
                    <span className="font-medium text-charcoal">₹{room.extraPersonPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-warm-white">
                    <span className="text-charcoal font-medium">Max Occupancy</span>
                    <span className="text-amil-red font-semibold">{room.maxOccupancy} Guests</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="border-t border-border-light/60 pt-4">
                <span className="text-[10px] uppercase font-sans font-semibold tracking-luxury text-text-muted block mb-2">
                  Live Status
                </span>
                <AvailabilityBadge isAvailable={room.available} count={4} />
              </div>

              {/* Date Selection */}
              <div className="border-t border-border-light/60 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-sans font-semibold tracking-luxury text-text-muted block">
                    Select Stay Dates
                  </span>
                  <span className="text-[11px] font-sans text-text-muted font-medium" data-testid="rdv-nights-count">
                    {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="rdv-checkin" className="text-[11px] font-sans text-charcoal-text font-medium block mb-1">
                      Check-in
                    </label>
                    <input
                      id="rdv-checkin"
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={handleCheckInChange}
                      className="w-full bg-white border border-border-light p-2.5 text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="rdv-checkout" className="text-[11px] font-sans text-charcoal-text font-medium block mb-1">
                      Check-out
                    </label>
                    <input
                      id="rdv-checkout"
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={handleCheckOutChange}
                      className="w-full bg-white border border-border-light p-2.5 text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
                    />
                  </div>
                </div>
                {dateError && (
                  <p className="text-[11px] text-rose-600 font-sans flex items-center space-x-1" role="alert" data-testid="rdv-date-error">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 inline mr-1" />
                    <span>{dateError}</span>
                  </p>
                )}
              </div>

              {/* Guest & Room Quantity Controls */}
              <div className="border-t border-border-light/60 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-sans font-semibold tracking-luxury text-text-muted block">
                    Guests &amp; Rooms
                  </span>
                  <span className="text-[11px] font-sans text-text-muted">
                    Max {room.maxOccupancy} / room
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Rooms Selector */}
                  <div className="bg-white border border-border-light p-2.5 rounded-[2px] flex flex-col justify-between">
                    <span className="text-[11px] font-sans font-medium text-charcoal-text block mb-1.5 text-center">
                      Rooms
                    </span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleRoomsChange((prev) => prev - 1)}
                        disabled={rooms <= 1}
                        aria-label="Decrease number of rooms"
                        data-testid="rdv-rooms-dec"
                        className="w-6 h-6 rounded flex items-center justify-center border border-border-light text-charcoal hover:bg-amil-red hover:text-white hover:border-amil-red disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-serif font-semibold text-charcoal" data-testid="rdv-rooms-count">
                        {rooms}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRoomsChange((prev) => prev + 1)}
                        aria-label="Increase number of rooms"
                        data-testid="rdv-rooms-inc"
                        className="w-6 h-6 rounded flex items-center justify-center border border-border-light text-charcoal hover:bg-amil-red hover:text-white hover:border-amil-red transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Adults Selector */}
                  <div className="bg-white border border-border-light p-2.5 rounded-[2px] flex flex-col justify-between">
                    <span className="text-[11px] font-sans font-medium text-charcoal-text block mb-1.5 text-center">
                      Adults
                    </span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleAdultsChange((prev) => prev - 1)}
                        disabled={adults <= 1}
                        aria-label="Decrease number of adults"
                        data-testid="rdv-adults-dec"
                        className="w-6 h-6 rounded flex items-center justify-center border border-border-light text-charcoal hover:bg-amil-red hover:text-white hover:border-amil-red disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-serif font-semibold text-charcoal" data-testid="rdv-adults-count">
                        {adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdultsChange((prev) => prev + 1)}
                        aria-label="Increase number of adults"
                        data-testid="rdv-adults-inc"
                        className="w-6 h-6 rounded flex items-center justify-center border border-border-light text-charcoal hover:bg-amil-red hover:text-white hover:border-amil-red transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Children Selector */}
                  <div className="bg-white border border-border-light p-2.5 rounded-[2px] flex flex-col justify-between">
                    <span className="text-[11px] font-sans font-medium text-charcoal-text block mb-1.5 text-center">
                      Children
                    </span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleChildrenChange((prev) => prev - 1)}
                        disabled={children <= 0}
                        aria-label="Decrease number of children"
                        data-testid="rdv-children-dec"
                        className="w-6 h-6 rounded flex items-center justify-center border border-border-light text-charcoal hover:bg-amil-red hover:text-white hover:border-amil-red disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal disabled:hover:border-border-light transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-serif font-semibold text-charcoal" data-testid="rdv-children-count">
                        {children}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleChildrenChange((prev) => prev + 1)}
                        aria-label="Increase number of children"
                        data-testid="rdv-children-inc"
                        className="w-6 h-6 rounded flex items-center justify-center border border-border-light text-charcoal hover:bg-amil-red hover:text-white hover:border-amil-red transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Occupancy Validation Alert */}
                {isOccupancyExceeded && (
                  <div
                    className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-sans rounded-[2px] leading-relaxed flex items-start space-x-2"
                    role="alert"
                    data-testid="rdv-occupancy-error"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Occupancy limit exceeded:</strong> {rooms} {rooms === 1 ? 'room accommodates' : 'rooms accommodate'} up to {maxPermittedGuests} guests ({totalGuests} selected: {adults} {adults === 1 ? 'adult' : 'adults'}{children > 0 ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''}). Please add more rooms or adjust guest count.
                    </div>
                  </div>
                )}

                {/* Stay Summary / Estimation Box */}
                <div className="bg-[#FAF7F2] border border-[#E8DEC8] p-2.5 rounded-[2px] text-xs font-sans space-y-1">
                  <div className="flex justify-between text-text-muted text-[11px]">
                    <span>Stay Duration:</span>
                    <span className="font-medium text-charcoal">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  </div>
                  <div className="flex justify-between text-text-muted text-[11px]">
                    <span>Accommodation:</span>
                    <span className="font-medium text-charcoal">{rooms} {rooms === 1 ? 'Room' : 'Rooms'} · {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E8DEC8] pt-1 text-charcoal font-semibold text-xs">
                    <span>Estimated Total:</span>
                    <span className="text-amil-red font-serif text-sm">₹{estimatedSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Reservation & Booking Actions */}
              <div className="border-t border-border-light/60 pt-4 space-y-2.5">
                {/* Primary Action: Add to Shopping Cart Reservation */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToReservation}
                  className="w-full text-xs tracking-luxury py-4 shadow-md flex items-center justify-center space-x-2 active:scale-[0.99] transition-all"
                  data-testid="rdv-add-to-reservation-btn"
                >
                  <Bed className="w-4 h-4 shrink-0" />
                  <span>Add to Reservation</span>
                </Button>

                {/* Secondary Action: Direct Booking Enquiry */}
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleProceedToBooking}
                  className="w-full text-xs tracking-luxury py-3 shadow-xs flex items-center justify-center space-x-2 active:scale-[0.99] transition-all"
                  data-testid="rdv-proceed-enquiry-btn"
                >
                  <span>Proceed to Booking Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <p className="text-[10px] text-text-muted text-center pt-1 font-light">
                  Reserve multiple rooms in cart · Or proceed with direct enquiry
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 02 — ROOM DETAILS + 360° VIRTUAL TOUR
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="mb-16 border-t border-border-light/60 pt-12" aria-label="Room Details and 360 Virtual Tour">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">

          {/* Left Column: 1:1 Aspect Ratio Square 360° Virtual Tour Viewer */}
          <div className="lg:col-span-6 w-full" id="virtual-tour-360">
            {room.id === 'twin-executive' && (
              <div className="mb-3.5">
                <span className="text-[11px] uppercase font-sans font-semibold tracking-luxury text-amil-red block">
                  EXPLORE THE ROOM IN 360°
                </span>
                <p className="text-xs sm:text-sm text-text-muted font-sans font-light mt-1">
                  Discover every corner of our Twin Executive Room through an immersive panoramic experience.
                </p>
              </div>
            )}
            <div className="relative w-full aspect-square overflow-hidden bg-charcoal border border-muted-gold/50 shadow-soft-luxury [&>div]:!h-full [&>div]:!w-full [&>div]:!max-w-none [&>div]:!mx-0 [&>div]:!border-0 [&_img]:!object-contain">
              {room.panorama ? (
                <RoomPanoramaViewer panorama={room.panorama} roomName={room.name} />
              ) : (
                <RoomSpin360Viewer images={room.spinImages} />
              )}
            </div>
          </div>

          {/* Right Column: Room Information & Specifications */}
          <div className="lg:col-span-6 w-full">
            {/* Section Number & Divider */}
            <div className="mb-3.5 flex items-center space-x-3">
              <span className="text-muted-gold font-serif text-sm leading-none font-semibold">02</span>
              <div className="w-12 h-[1px] bg-muted-gold/60" />
            </div>

            {/* Room Name Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amil-red-dark font-normal leading-tight mb-2 tracking-tight">
              {room.name}
            </h2>

            {/* Room Tagline / Subtitle */}
            <p className="text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold mb-4">
              {room.tagline}
            </p>

            {/* Room Description */}
            <p className="text-xs sm:text-sm lg:text-base font-sans text-text-muted font-light leading-relaxed mb-6">
              {room.description}
            </p>

            {/* Room Specifications Panel */}
            <div className="bg-warm-white border border-border-light/80 p-5 sm:p-6 mb-6 text-xs font-sans shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">

                {/* Room Space */}
                <div className="flex items-start space-x-3 sm:pr-4 sm:border-r sm:border-border-light/60">
                  <Maximize2 className="w-4 h-4 text-muted-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-text-muted block text-[10px] uppercase tracking-luxury font-medium">
                      ROOM SPACE
                    </span>
                    <span className="font-medium text-charcoal block text-xs sm:text-sm">
                      {room.size}
                    </span>
                  </div>
                </div>

                {/* Bedding */}
                <div className="flex items-start space-x-3 sm:pl-2">
                  <Bed className="w-4 h-4 text-muted-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-text-muted block text-[10px] uppercase tracking-luxury font-medium">
                      BEDDING
                    </span>
                    <span className="font-medium text-charcoal block text-xs sm:text-sm">
                      {room.bedType}
                    </span>
                  </div>
                </div>

                {/* Outlook */}
                <div className="flex items-start space-x-3 sm:pr-4 sm:border-r sm:border-border-light/60 border-t border-border-light/60 pt-4 sm:border-t-0 sm:pt-0">
                  <Eye className="w-4 h-4 text-muted-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-text-muted block text-[10px] uppercase tracking-luxury font-medium">
                      OUTLOOK
                    </span>
                    <span className="font-medium text-charcoal block text-xs sm:text-sm">
                      {room.view}
                    </span>
                  </div>
                </div>

                {/* Floor */}
                <div className="flex items-start space-x-3 sm:pl-2 border-t border-border-light/60 pt-4 sm:border-t-0 sm:pt-0">
                  <Layers className="w-4 h-4 text-muted-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-text-muted block text-[10px] uppercase tracking-luxury font-medium">
                      FLOOR
                    </span>
                    <span className="font-medium text-charcoal block text-xs sm:text-sm">
                      {room.floor}
                    </span>
                  </div>
                </div>

                {/* Maximum Permitted Occupancy */}
                <div className="col-span-1 sm:col-span-2 pt-4 border-t border-border-light/60 flex items-start space-x-3">
                  <Users className="w-4 h-4 text-muted-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-text-muted block text-[10px] uppercase tracking-luxury font-medium">
                      MAXIMUM PERMITTED OCCUPANCY
                    </span>
                    <span className="font-medium text-charcoal block text-xs sm:text-sm">
                      {room.maxOccupancy} Guests
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Key Amenities Underneath Specs */}
            {keyAmenities.length > 0 && (
              <div>
                <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block mb-3">
                  KEY AMENITIES
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2.5 text-center">
                  {keyAmenities.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center p-2 rounded-[2px] bg-warm-white border border-border-light/60 shadow-xs"
                      >
                        <ItemIcon className="w-4 h-4 text-muted-gold flex-shrink-0 mb-1" />
                        <span className="text-[9px] font-sans text-charcoal leading-tight line-clamp-2">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 03 — ROOM AMENITIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border-light/60 pt-12" aria-label="Room Amenities">
        <SectionLabel number="03" label="Room Amenities" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {room.amenities.map((amenity, idx) => {
            const Icon = getAmenityIcon(amenity);
            return (
              <div
                key={idx}
                className="flex items-center space-x-3 p-3.5 bg-warm-white border border-border-light/50 text-xs font-sans text-charcoal-text"
              >
                <Icon className="w-4 h-4 text-amil-red flex-shrink-0" aria-hidden="true" />
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default RoomDetailView;
