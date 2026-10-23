import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Users, Bed, Wind, Wifi, Tv, Bath,
  Coffee, Shield, Sparkles, ArrowRight,
  X, ChevronLeft, ChevronRight, Maximize2
} from 'lucide-react';
import RoomSpin360Viewer from './RoomSpin360Viewer';
import RoomPanoramaViewer from './RoomPanoramaViewer';
import AvailabilityBadge from './AvailabilityBadge';
import PaymentOptions from './PaymentOptions';
import { Button } from './ui/Button';

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

// ── Asymmetric Gallery with inline lightbox ───────────────────────────────────
// Scoped to room-detail pages only. Does NOT modify PhotoGallery.jsx.
const AsymmetricGallery = ({ images = [], roomName = 'Room' }) => {
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

      {/* ── View all photos button ──────────────────────────── */}
      <button
        type="button"
        onClick={() => openLightbox(0)}
        className="mt-4 inline-flex items-center space-x-2 text-[11px] font-sans font-semibold tracking-luxury uppercase text-charcoal-text hover:text-amil-red transition-colors border border-border-light/70 hover:border-amil-red px-4 py-2.5 bg-warm-white"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        <span>View All {images.length} Photos</span>
      </button>

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

  // Date state with defaults
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [dateError, setDateError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('hotel');

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

  // ── Booking handlers (unchanged logic) ─────────────────────────────────────
  const handleCheckInChange = (e) => {
    const val = e.target.value;
    setCheckIn(val);
    if (checkOut && val >= checkOut) {
      const nextDay = new Date(val);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
      setDateError('');
    }
  };

  const handleCheckOutChange = (e) => {
    const val = e.target.value;
    if (val <= checkIn) {
      setDateError('Check-out date must be after check-in date.');
    } else {
      setDateError('');
      setCheckOut(val);
    }
  };

  const handleProceedToBooking = () => {
    if (checkOut <= checkIn) {
      setDateError('Please ensure check-out date is later than check-in date.');
      return;
    }
    const params = new URLSearchParams({
      room: room.id,
      checkIn: checkIn,
      checkOut: checkOut,
      payment: selectedPayment,
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
            <AsymmetricGallery images={room.images} roomName={room.name} />
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
                  <span className="text-xs font-sans text-text-muted">/ night (Single)</span>
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
                <span className="text-[10px] uppercase font-sans font-semibold tracking-luxury text-text-muted block">
                  Select Stay Dates
                </span>
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
                  <p className="text-[11px] text-rose-600 font-sans" role="alert">{dateError}</p>
                )}
              </div>

              {/* Payment Options */}
              <div className="border-t border-border-light/60 pt-4">
                <PaymentOptions
                  selectedOption={selectedPayment}
                  onSelect={(id) => setSelectedPayment(id)}
                />
              </div>

              {/* Booking CTA */}
              <div className="border-t border-border-light/60 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleProceedToBooking}
                  className="w-full text-xs tracking-luxury py-4 shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Booking Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-[10px] text-text-muted text-center mt-2.5 font-light">
                  Direct enquiry · Instant confirmation via WhatsApp &amp; Email
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 02 — ABOUT THIS ROOM
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="mb-16 border-t border-border-light/60 pt-12" aria-label="About This Room">
        <SectionLabel number="02" label="About This Room" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Room description */}
          <div className="lg:col-span-7">
            <p className="text-sm md:text-base font-sans text-text-muted font-light leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Room key specs panel */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 p-5 bg-warm-white border border-border-light/60 text-xs font-sans">
              <div className="space-y-1">
                <span className="text-text-muted block text-[10px] uppercase tracking-luxury">Room Space</span>
                <span className="font-medium text-charcoal">{room.size}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted block text-[10px] uppercase tracking-luxury">Bedding</span>
                <span className="font-medium text-charcoal">{room.bedType}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted block text-[10px] uppercase tracking-luxury">Outlook</span>
                <span className="font-medium text-charcoal">{room.view}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted block text-[10px] uppercase tracking-luxury">Floor</span>
                <span className="font-medium text-charcoal">{room.floor}</span>
              </div>
              <div className="col-span-2 pt-3 border-t border-border-light/60 space-y-1">
                <span className="text-text-muted block text-[10px] uppercase tracking-luxury">Maximum Permitted Occupancy</span>
                <span className="font-medium text-charcoal">{room.maxOccupancy} Guests</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 03 — EXPLORE THE ROOM (360° VIEWER)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="mb-16 border-t border-border-light/60 pt-12" aria-label="360 Virtual Room Tour">
        <SectionLabel number="03" label="Explore the Room" />
        <p className="text-xs text-text-muted font-sans mb-5 -mt-1">
          Drag to look around &nbsp;·&nbsp; Scroll to zoom &nbsp;·&nbsp; Click fullscreen for an immersive walkthrough
        </p>
        {room.panorama ? (
          <RoomPanoramaViewer panorama={room.panorama} />
        ) : (
          <RoomSpin360Viewer images={room.spinImages} />
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 04 — ROOM AMENITIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border-light/60 pt-12" aria-label="Room Amenities">
        <SectionLabel number="04" label="Room Amenities" />
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
