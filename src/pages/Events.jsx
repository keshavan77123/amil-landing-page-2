import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, CheckCircle, User,
  Phone, Mail, Users, MessageSquare, Calendar,
  Heart, Briefcase, Baby, Star, Sparkles, ArrowRight,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { Button } from '../components/ui/Button';
import { hotelData } from '../data/hotel';

// ─────────────────────────────────────────────────────────────
// HERO SLIDE DATA
// Each slide drives: background, eyebrow, heading, description,
// right-side categories, and CTA — all from a single object.
// ─────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 'wedding',
    // Generated image stored locally; Unsplash fallback for dev if not yet present
    image: '/images/events/BanquetHall3_8k.png',
    eyebrow: 'CELEBRATE AT HOTEL AMIL',
    heading: 'Made for Moments That Matter.',
    description:
      'From elegant wedding receptions to meaningful family celebrations, discover a welcoming setting for the occasions that matter most.',
    categories: ['Wedding & Receptions', 'Family Celebrations', 'Banquet & Halls'],
    ctaText: 'PLAN AN EVENT',
    ctaHref: '#event-enquiry',
  },
  {
    id: 'romantic',
    image: '/images/events/RestaurentTable_8k.png',
    eyebrow: 'SPECIAL MOMENTS AT HOTEL AMIL',
    heading: 'Make Every Moment Unforgettable.',
    description:
      'Celebrate meaningful moments with an intimate atmosphere and thoughtful hospitality.',
    categories: ['Candlelight Dining', 'Private Couple Occasions', "Valentine's Day"],
    ctaText: 'EXPLORE ROMANTIC EXPERIENCES',
    ctaHref: '#romantic-section',
  },
  {
    id: 'corporate',
    image: '/images/events/events-hero-corporate.jpg',
    eyebrow: 'BUSINESS & HOSPITALITY',
    heading: 'Where Business Meets Hospitality.',
    description:
      'Bring people together in a welcoming setting for professional meetings, discussions, and corporate gatherings.',
    categories: ['Corporate Meetings', 'Bank Meetings', 'Conferences'],
    ctaText: 'ENQUIRE ABOUT MEETINGS',
    ctaHref: '#event-enquiry',
  },
  {
    id: 'celebration',
    image: '/images/events/EventBabyShower2_8k.png',
    eyebrow: "CELEBRATE LIFE'S MILESTONES",
    heading: "Celebrate Life's Beautiful Milestones.",
    description:
      "From birthdays to baby showers, make life's special moments meaningful with the people who matter most.",
    categories: ['Birthday Parties', 'Baby Showers', 'Family Celebrations'],
    ctaText: 'PLAN YOUR CELEBRATION',
    ctaHref: '#event-enquiry',
  },
];

// ─────────────────────────────────────────────────────────────
// CONTENT TRANSITION VARIANTS (framer-motion)
// ─────────────────────────────────────────────────────────────
const contentVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1.0] },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.35, ease: 'easeIn' },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.25, 0.1, 0.25, 1.0] },
  }),
  exit: { opacity: 0, x: 10, transition: { duration: 0.25 } },
};

// ─────────────────────────────────────────────────────────────
// EVENTS HERO CAROUSEL
// ─────────────────────────────────────────────────────────────
const EventsHero = () => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SLIDE_DURATION = 6000;

  const advance = useCallback(
    (dir = 1) => {
      setActive((prev) => (prev + dir + heroSlides.length) % heroSlides.length);
    },
    []
  );

  // Auto-advance timer — pauses on hover / reduced-motion
  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;
    timerRef.current = setInterval(() => advance(1), SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [advance, isHovered, prefersReducedMotion]);

  const slide = heroSlides[active];

  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Events at Hotel Amil hero carousel"
    >
      {/* ── Background images with crossfade ── */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out bg-cover bg-center"
          style={{
            backgroundImage: `url(${s.image})`,
            opacity: i === active ? 1 : 0,
            transform: i === active ? 'scale(1.04)' : 'scale(1)',
            transition: 'opacity 1200ms ease-in-out, transform 8000ms ease-out',
          }}
        />
      ))}

      {/* ── Cinematic overlay gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-charcoal/25 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20 z-10" />

      {/* ── Content layer ── */}
      <div className="relative z-20 flex items-center min-h-[100svh] pt-24 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* LEFT — Dynamic slide content */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${slide.id}`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Eyebrow */}
                  <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold block mb-4">
                    {slide.eyebrow}
                  </span>

                  {/* Heading */}
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-ivory font-normal leading-[1.12] mb-5">
                    {slide.heading}
                  </h1>

                  {/* Red divider */}
                  <div className="w-12 h-[2px] bg-amil-red mb-5" />

                  {/* Description */}
                  <p className="text-sm sm:text-base font-sans text-ivory/80 font-light leading-relaxed mb-8 max-w-lg">
                    {slide.description}
                  </p>

                  {/* CTA */}
                  <a
                    href={slide.ctaHref}
                    onClick={(e) => {
                      const el = document.querySelector(slide.ctaHref);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <Button variant="primary" size="lg">
                      {slide.ctaText}
                    </Button>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT — Dynamic categories panel */}
            <div className="hidden lg:block lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cats-${slide.id}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="border border-ivory/20 bg-charcoal/40 backdrop-blur-md p-7"
                >
                  <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block mb-5">
                    FEATURED AT THIS EVENT
                  </span>
                  {slide.categories.map((cat, i) => (
                    <motion.div
                      key={cat}
                      custom={i}
                      variants={categoryVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {i > 0 && <div className="h-[1px] bg-ivory/15 my-4" />}
                      <div className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-amil-red flex-shrink-0" />
                        <span className="text-sm font-sans text-ivory/90 font-light tracking-wide">
                          {cat}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* ── Navigation arrows ── */}
      <div className="absolute inset-y-0 left-4 md:left-6 z-30 flex items-center">
        <button
          onClick={() => advance(-1)}
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full border border-ivory/40 bg-charcoal/50 backdrop-blur-sm text-ivory flex items-center justify-center hover:bg-amil-red hover:border-amil-red transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-6 z-30 flex items-center">
        <button
          onClick={() => advance(1)}
          aria-label="Next slide"
          className="w-10 h-10 rounded-full border border-ivory/40 bg-charcoal/50 backdrop-blur-sm text-ivory flex items-center justify-center hover:bg-amil-red hover:border-amil-red transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center space-x-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-sm transition-all duration-300 ${
              i === active ? 'w-6 bg-amil-red' : 'w-2 bg-ivory/40 hover:bg-ivory/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// REUSABLE: alternating two-column section
// ─────────────────────────────────────────────────────────────
const EventSection = ({
  id,
  eyebrow,
  heading,
  description,
  ctaText,
  ctaHref = '#event-enquiry',
  imageSrc,
  imageAlt,
  imageCaption,
  imageLeft = true,
  bg = 'bg-ivory',
}) => {
  const handleCta = (e) => {
    const el = document.getElementById('event-enquiry');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const imageCol = (
    <div className="lg:col-span-7">
      <ScrollReveal yOffset={30}>
        <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {imageCaption && (
            <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
              {imageCaption}
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );

  const textCol = (
    <div className="lg:col-span-5">
      <ScrollReveal delay={0.2} yOffset={30}>
        <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
          {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
          {heading}
        </h2>
        <div className="w-12 h-[2px] bg-amil-red mb-6" />
        <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-8">
          {description}
        </p>
        <a href={ctaHref} onClick={handleCta}>
          <Button variant="secondary" size="md">
            {ctaText}
          </Button>
        </a>
      </ScrollReveal>
    </div>
  );

  return (
    <section id={id} className={`py-20 md:py-28 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {imageLeft ? (
            <>
              {imageCol}
              {textCol}
            </>
          ) : (
            <>
              <div className="lg:col-span-5 order-2 lg:order-1">{textCol.props.children}</div>
              <div className="lg:col-span-7 order-1 lg:order-2">{imageCol.props.children}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// EVENT ENQUIRY FORM
// Submits via mailto: (no backend required)
// with full validation, loading, and success states.
// ─────────────────────────────────────────────────────────────
const EVENT_TYPES = [
  'Wedding & Reception',
  'Corporate / Bank Meeting',
  'Baby Shower',
  'Private Couple Occasion',
  'Birthday Party',
  "Valentine's Day",
  'Other / Please Specify',
];

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  date: '',
  guests: '',
  details: '',
};

const INITIAL_ERRORS = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  date: '',
  guests: '',
};

const validate = (data) => {
  const errors = { ...INITIAL_ERRORS };
  if (!data.name.trim()) errors.name = 'Full name is required.';
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[+\d\s\-()]{7,15}$/.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.eventType) errors.eventType = 'Please select an event type.';
  if (!data.date) errors.date = 'Please select a preferred date.';
  if (!data.guests.trim()) {
    errors.guests = 'Expected number of guests is required.';
  } else if (isNaN(Number(data.guests)) || Number(data.guests) < 1) {
    errors.guests = 'Please enter a valid guest count.';
  }
  return errors;
};

const hasErrors = (errors) => Object.values(errors).some(Boolean);

const EventEnquiryForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);

    // Build mailto body
    const body = [
      `Full Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || 'Not provided'}`,
      `Event Type: ${form.eventType}`,
      `Preferred Date: ${form.date}`,
      `Expected Guests: ${form.guests}`,
      `Additional Details: ${form.details || 'None'}`,
    ].join('\n');

    const subject = encodeURIComponent(`Event Enquiry — ${form.eventType} — ${form.name}`);
    const bodyEnc = encodeURIComponent(body);
    const mailtoUrl = `mailto:${hotelData.inquiryEmail}?subject=${subject}&body=${bodyEnc}`;

    // Open the mail client — then transition to success state
    window.location.href = mailtoUrl;

    // Brief delay so the OS mail client opens before we show success
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setSubmitted(false);
  };

  const inputClass =
    'w-full px-3.5 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px] placeholder-text-muted/60 transition-colors';
  const errorClass = 'text-[11px] text-amil-red mt-1 font-sans';
  const labelClass =
    'block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5';

  if (submitted) {
    return (
      <div className="bg-warm-white border border-border-light/80 p-8 sm:p-12 text-center shadow-soft-luxury">
        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-300 text-green-600 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 stroke-[1.5]" />
        </div>
        <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
          Enquiry Sent
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-charcoal mb-4">
          Thank you, {form.name}
        </h3>
        <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed mb-6 max-w-md mx-auto">
          Your event enquiry for{' '}
          <strong className="text-charcoal">{form.eventType}</strong> has been prepared. Our
          team at Hotel Amil will follow up with you via the contact details provided.
        </p>
        <div className="p-4 bg-white border border-border-light/60 text-xs font-sans text-left space-y-1.5 mb-8 max-w-sm mx-auto text-charcoal-text">
          <p>
            <strong>Event Type:</strong> {form.eventType}
          </p>
          <p>
            <strong>Preferred Date:</strong> {form.date}
          </p>
          <p>
            <strong>Expected Guests:</strong> {form.guests}
          </p>
          <p>
            <strong>Contact:</strong> {form.phone}
          </p>
        </div>
        <Button variant="secondary" size="md" onClick={handleReset}>
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      id="event-enquiry-form-card"
      onSubmit={handleSubmit}
      noValidate
      className="bg-warm-white border border-border-light/80 p-6 sm:p-8 lg:p-10 shadow-elevated rounded-[2px]"
    >
      <div className="mb-8">
        <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
          Event Enquiry
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal">
          Tell Us About Your Event
        </h3>
        <p className="text-xs text-text-muted font-sans mt-1">
          Complete the details below and our team will follow up to discuss your requirements.
        </p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="ev-name" className={labelClass}>
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
            <input
              id="ev-name"
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Mr. Senthil Kumar"
              className={`${inputClass} pl-10`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'ev-name-err' : undefined}
            />
          </div>
          {errors.name && (
            <p id="ev-name-err" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ev-phone" className={labelClass}>
              Phone / WhatsApp *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
              <input
                id="ev-phone"
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`${inputClass} pl-10`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'ev-phone-err' : undefined}
              />
            </div>
            {errors.phone && (
              <p id="ev-phone-err" className={errorClass}>
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="ev-email" className={labelClass}>
              Email Address (optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
              <input
                id="ev-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`${inputClass} pl-10`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'ev-email-err' : undefined}
              />
            </div>
            {errors.email && (
              <p id="ev-email-err" className={errorClass}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="ev-type" className={labelClass}>
            Event Type *
          </label>
          <select
            id="ev-type"
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className={inputClass}
            aria-invalid={!!errors.eventType}
            aria-describedby={errors.eventType ? 'ev-type-err' : undefined}
          >
            <option value="">— Select an event type —</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p id="ev-type-err" className={errorClass}>
              {errors.eventType}
            </p>
          )}
        </div>

        {/* Date & Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ev-date" className={labelClass}>
              Preferred Date *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-text-muted absolute left-3.5 top-3 pointer-events-none" />
              <input
                id="ev-date"
                type="date"
                name="date"
                min={today}
                value={form.date}
                onChange={handleChange}
                className={`${inputClass} pl-10`}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? 'ev-date-err' : undefined}
              />
            </div>
            {errors.date && (
              <p id="ev-date-err" className={errorClass}>
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="ev-guests" className={labelClass}>
              Expected Guests *
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-text-muted absolute left-3.5 top-3 pointer-events-none" />
              <input
                id="ev-guests"
                type="number"
                name="guests"
                min="1"
                value={form.guests}
                onChange={handleChange}
                placeholder="e.g. 50"
                className={`${inputClass} pl-10`}
                aria-invalid={!!errors.guests}
                aria-describedby={errors.guests ? 'ev-guests-err' : undefined}
              />
            </div>
            {errors.guests && (
              <p id="ev-guests-err" className={errorClass}>
                {errors.guests}
              </p>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <label htmlFor="ev-details" className={labelClass}>
            Additional Details
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-text-muted absolute left-3.5 top-3 pointer-events-none" />
            <textarea
              id="ev-details"
              name="details"
              rows={4}
              value={form.details}
              onChange={handleChange}
              placeholder="e.g. Specific décor preferences, catering requirements, AV equipment, special arrangements..."
              className={`${inputClass} pl-10 resize-none`}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full text-xs tracking-luxury py-4 shadow-md"
          >
            {isSubmitting ? 'Opening mail client...' : 'SEND EVENT ENQUIRY'}
          </Button>
          <p className="text-[11px] text-text-muted text-center mt-3 font-sans">
            Our team will follow up within one business day via phone or WhatsApp.
          </p>
        </div>
      </div>
    </form>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN EVENTS PAGE
// ─────────────────────────────────────────────────────────────
export const Events = () => {
  return (
    <div className="bg-ivory">
      {/* ── 1. Dynamic Hero Carousel ── */}
      <EventsHero />

      {/* ── 2. Section intro strip ── */}
      <section className="py-14 md:py-16 bg-warm-white border-b border-border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal yOffset={20}>
            <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
              EVENTS AT HOTEL AMIL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.2] mb-4 max-w-3xl mx-auto">
              A Setting for Every Occasion
            </h2>
            <div className="w-12 h-[2px] bg-amil-red mx-auto mb-5" />
            <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed max-w-2xl mx-auto">
              From intimate candlelight dinners to grand wedding receptions and professional
              corporate gatherings, Hotel Amil offers a welcoming and comfortable setting for
              every meaningful occasion.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3. Wedding & Reception — Image LEFT | Text RIGHT ── */}
      <section id="wedding-section" className="py-20 md:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal yOffset={30}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                  <img
                    src="/images/amenities/banquetHall-8k.png"
                    alt="Elegant hotel banquet hall set for a wedding reception at Hotel Amil"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                    Banquet Hall • Hotel Amil
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2} yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                  WEDDING & RECEPTION
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                  Celebrate the Beginning of Forever.
                </h2>
                <div className="w-12 h-[2px] bg-amil-red mb-6" />
                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-8">
                  Discover a welcoming setting for wedding receptions and meaningful celebrations
                  with family and friends. Our banquet hall can be arranged to reflect your
                  personal style and the warmth of your occasion.
                </p>
                <a
                  href="#event-enquiry"
                  onClick={(e) => {
                    const el = document.getElementById('event-enquiry');
                    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                  }}
                >
                  <Button variant="secondary" size="md">PLAN YOUR RECEPTION</Button>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Corporate & Bank Meetings — Text LEFT | Image RIGHT ── */}
      <section id="corporate-section" className="py-20 md:py-24 bg-warm-white border-y border-border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                  CORPORATE & BANK MEETINGS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                  Where Business Meets Hospitality.
                </h2>
                <div className="w-12 h-[2px] bg-amil-red mb-6" />
                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-6">
                  Explore a professional and comfortable atmosphere for meetings, discussions, and
                  corporate gatherings. Our team can help arrange the setting to suit your
                  professional requirements.
                </p>
                <div className="space-y-3 mb-8 text-xs font-sans text-charcoal-text">
                  {['Professional Meeting Setup', 'AV & Presentation Support Available', 'Catering & Refreshments on Request'].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amil-red flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#event-enquiry"
                  onClick={(e) => {
                    const el = document.getElementById('event-enquiry');
                    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                  }}
                >
                  <Button variant="secondary" size="md">ENQUIRE ABOUT MEETINGS</Button>
                </a>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal delay={0.2} yOffset={30}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                  <img
                    src="/images/events/CorporateMeeting_8k.png"
                    alt="Professional hotel conference room for corporate and bank meetings"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                    Conference • Hotel Amil
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Baby Shower — Image LEFT | Text RIGHT ── */}
      <section id="baby-shower-section" className="py-20 md:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal yOffset={30}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                  <img
                    src="/images/events/EventsBabyShower_8k.png"
                    alt="Elegant baby shower decorations in a hotel event space"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                    Baby Shower • Hotel Amil
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2} yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                  BABY SHOWER
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                  Welcoming a Little Miracle.
                </h2>
                <div className="w-12 h-[2px] bg-amil-red mb-6" />
                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-8">
                  Celebrate an exciting new beginning with family and friends in a beautifully
                  prepared setting. Our team can help create a warm and memorable atmosphere
                  for this special occasion.
                </p>
                <a
                  href="#event-enquiry"
                  onClick={(e) => {
                    const el = document.getElementById('event-enquiry');
                    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                  }}
                >
                  <Button variant="secondary" size="md">PLAN A BABY SHOWER</Button>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Private Couple Occasions — Text LEFT | Image RIGHT ── */}
      <section id="romantic-section" className="py-20 md:py-24 bg-warm-white border-y border-border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                  PRIVATE COUPLE OCCASIONS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                  Just the Two of You.
                </h2>
                <div className="w-12 h-[2px] bg-amil-red mb-6" />
                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-8">
                  Create meaningful memories with a private, intimate atmosphere for special
                  occasions. Our team can help you plan a thoughtful experience tailored to
                  your moment.
                </p>
                <a
                  href="#event-enquiry"
                  onClick={(e) => {
                    const el = document.getElementById('event-enquiry');
                    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                  }}
                >
                  <Button variant="secondary" size="md">ENQUIRE FOR YOUR OCCASION</Button>
                </a>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal delay={0.2} yOffset={30}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
                    alt="Private romantic candlelight dinner at Hotel Amil"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                    Private Dining • Hotel Amil
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Birthday Parties — Image LEFT | Text RIGHT ── */}
      <section id="birthday-section" className="py-20 md:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal yOffset={30}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                  <img
                    src="/images/events/EventsBirthDay_8k.png"
                    alt="Premium birthday celebration with elegant decorations at Hotel Amil"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                    Birthday Celebrations • Hotel Amil
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2} yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                  BIRTHDAY PARTIES
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                  Make Every Birthday Memorable.
                </h2>
                <div className="w-12 h-[2px] bg-amil-red mb-6" />
                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-8">
                  Celebrate birthdays and personal milestones with the people who make every
                  moment special. We can help you create the perfect setting for a birthday
                  celebration to remember.
                </p>
                <a
                  href="#event-enquiry"
                  onClick={(e) => {
                    const el = document.getElementById('event-enquiry');
                    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                  }}
                >
                  <Button variant="secondary" size="md">PLAN A BIRTHDAY CELEBRATION</Button>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. NEW PREMIUM EVENT ENQUIRY SECTION ── */}
      <section
        id="event-enquiry"
        className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden bg-charcoal text-ivory"
      >
        {/* Replaceable Photographic Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/amenities/banquetHall-8k.png')` }}
        />

        {/* Restrained Charcoal Overlays for Maximum Text Contrast & Warm Cinematic Ambience */}
        <div className="absolute inset-0 bg-charcoal/80 sm:bg-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
            
            {/* ── LEFT COLUMN: Editorial Introduction & Highlights ── */}
            <div className="lg:col-span-5 text-left">
              <ScrollReveal yOffset={30}>
                {/* Eyebrow */}
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold block mb-3">
                  CELEBRATIONS AT HOTEL AMIL
                </span>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-warm-white font-normal leading-[1.18] tracking-tight mb-4">
                  Made for moments that matter.
                </h2>

                {/* Amil Red Divider */}
                <div className="w-12 h-[2px] bg-amil-red mb-6" />

                {/* Supporting Description */}
                <p className="text-xs sm:text-sm lg:text-base font-sans text-ivory/80 font-light leading-relaxed mb-8 max-w-lg">
                  From intimate celebrations to grand occasions, create meaningful moments with warm hospitality at Hotel Amil.
                </p>

                {/* Three Event Highlights */}
                <div className="space-y-6 mb-8 border-y border-white/15 py-6">
                  {/* Highlight 1 */}
                  <div className="flex items-start gap-4">
                    <span className="text-muted-gold font-sans text-xs sm:text-sm font-semibold tracking-luxury mt-0.5">
                      01
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-serif text-warm-white font-normal mb-1">
                        Intimate Celebrations
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-ivory/70 font-light leading-relaxed">
                        Create cherished moments with your loved ones.
                      </p>
                    </div>
                  </div>

                  {/* Highlight 2 */}
                  <div className="flex items-start gap-4">
                    <span className="text-muted-gold font-sans text-xs sm:text-sm font-semibold tracking-luxury mt-0.5">
                      02
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-serif text-warm-white font-normal mb-1">
                        Family Gatherings
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-ivory/70 font-light leading-relaxed">
                        Comfortable spaces for every special occasion.
                      </p>
                    </div>
                  </div>

                  {/* Highlight 3 */}
                  <div className="flex items-start gap-4">
                    <span className="text-muted-gold font-sans text-xs sm:text-sm font-semibold tracking-luxury mt-0.5">
                      03
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-serif text-warm-white font-normal mb-1">
                        Banquets & Special Occasions
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-ivory/70 font-light leading-relaxed">
                        Elegant settings for memorable events.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Button */}
                <div>
                  <a
                    href="#event-enquiry-form-card"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('ev-name') || document.getElementById('event-enquiry-form-card');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        el.focus?.();
                      }
                    }}
                    className="inline-block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="group !px-7 !py-4 shadow-soft-luxury hover:shadow-elevated transition-all duration-300 flex items-center gap-2.5"
                    >
                      <span className="tracking-luxury font-medium text-xs sm:text-sm">
                        PLAN YOUR EVENT
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                    </Button>
                  </a>
                </div>

                {/* Direct Front Desk Phone Contact Link */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-sans text-ivory/60">
                  <span>Prefer to speak directly?</span>
                  <a
                    href={`tel:${hotelData.phone.replace(/\s+/g, '')}`}
                    className="text-muted-gold hover:text-ivory underline underline-offset-4 transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call {hotelData.phone}</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* ── RIGHT COLUMN: Warm Ivory Event Enquiry Form ── */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.15} yOffset={25}>
                <EventEnquiryForm />
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
