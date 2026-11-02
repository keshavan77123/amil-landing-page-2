import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Users, Phone, Mail, User, Clock,
  Utensils, CheckCircle2, MessageSquare, Sparkles, Send
} from 'lucide-react';
import { hotelData } from '../../data/hotel';
import { Button } from '../ui/Button';

export const EVENT_CATEGORIES = [
  'Wedding & Reception',
  'Corporate & Bank Meetings',
  'Baby Shower',
  'Private Couple Occasions',
  'Birthday Parties',
  'Other / Custom Event'
];

export const TIME_SLOTS = [
  'Morning / Muhurtham (07:00 AM - 01:00 PM)',
  'Afternoon / Luncheon (11:00 AM - 04:00 PM)',
  'Evening / Dinner (05:00 PM - 11:00 PM)',
  'Full Day (08:00 AM - 10:00 PM)'
];

export const CATERING_OPTIONS = [
  'Traditional South Indian Leaf Feast (Kalyana Sappadu)',
  'Grand Multi-Cuisine Buffet (Veg & Non-Veg)',
  'Pure Vegetarian Buffet',
  'Executive High Tea & Refreshments',
  'Custom Menu / Undecided'
];

export const EventBookingModal = ({
  isOpen,
  onClose,
  defaultEventType = 'Wedding & Reception'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: defaultEventType,
    date: '',
    guests: '',
    timeSlot: TIME_SLOTS[0],
    catering: CATERING_OPTIONS[0],
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedType, setSubmittedType] = useState(null); // 'whatsapp' | 'email' | null

  // Synchronize defaultEventType whenever modal opens with a new event
  useEffect(() => {
    if (defaultEventType) {
      setFormData((prev) => ({
        ...prev,
        eventType: defaultEventType
      }));
    }
  }, [defaultEventType, isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[+\d\s\-()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.date) newErrors.date = 'Please select a preferred date.';
    if (!formData.guests.trim()) {
      newErrors.guests = 'Guest count is required.';
    } else if (isNaN(Number(formData.guests)) || Number(formData.guests) < 1) {
      newErrors.guests = 'Please enter a valid guest count.';
    }
    return newErrors;
  };

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message = [
      `*Hotel Amil — Event Reservation Enquiry*`,
      `----------------------------------------`,
      `*Event Type:* ${formData.eventType}`,
      `*Client Name:* ${formData.name}`,
      `*Contact Phone:* ${formData.phone}`,
      `*Email:* ${formData.email || 'Not specified'}`,
      `*Event Date:* ${formData.date}`,
      `*Expected Guests:* ${formData.guests}`,
      `*Preferred Slot:* ${formData.timeSlot}`,
      `*Catering Option:* ${formData.catering}`,
      `*Special Requests:* ${formData.specialRequests || 'None specified'}`,
      `----------------------------------------`,
      `_Sent from hotelamil.com/events_`
    ].join('\n');

    const whatsappNumber = hotelData.whatsappNumber || '917867094947';
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmittedType('whatsapp');
  };

  const handleEmailBooking = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subject = `Event Booking Enquiry — ${formData.eventType} — ${formData.name}`;
    const body = [
      `Dear Hotel Amil Events Team,`,
      ``,
      `I would like to enquire about reserving venue space for an upcoming event at Hotel Amil, Rajapalayam:`,
      ``,
      `• Event Category: ${formData.eventType}`,
      `• Client Name: ${formData.name}`,
      `• Phone Number: ${formData.phone}`,
      `• Email: ${formData.email || 'Not provided'}`,
      `• Preferred Date: ${formData.date}`,
      `• Expected Guests: ${formData.guests}`,
      `• Preferred Time Slot: ${formData.timeSlot}`,
      `• Catering Preference: ${formData.catering}`,
      `• Additional Notes: ${formData.specialRequests || 'None'}`,
      ``,
      `Kindly contact me with availability and pricing quote.`,
      ``,
      `Warm regards,`,
      `${formData.name}`
    ].join('\n');

    const mailtoUrl = `mailto:${hotelData.inquiryEmail || 'Info@hotelamil.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setSubmittedType('email');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: defaultEventType,
      date: '',
      guests: '',
      timeSlot: TIME_SLOTS[0],
      catering: CATERING_OPTIONS[0],
      specialRequests: ''
    });
    setErrors({});
    setSubmittedType(null);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-warm-white border border-border-light shadow-2xl rounded-sm overflow-hidden my-6 text-charcoal-text"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header banner */}
            <div className="bg-charcoal text-ivory px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block">
                  HOTEL AMIL BANQUETS & EVENTS
                </span>
                <h3
                  id="booking-modal-title"
                  className="text-xl sm:text-2xl font-serif text-warm-white font-normal mt-0.5"
                >
                  Check Venue Availability & Pricing
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amil-red text-ivory flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedType ? (
              <div className="p-8 sm:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
                </div>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
                  Enquiry Dispatched
                </span>
                <h4 className="text-2xl font-serif text-charcoal font-normal mb-3">
                  Thank you, {formData.name}!
                </h4>
                <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed max-w-md mx-auto mb-6">
                  {submittedType === 'whatsapp'
                    ? 'Your event reservation inquiry has been forwarded to Hotel Amil’s official WhatsApp desk. Our event manager will reply with dates and availability shortly.'
                    : 'Your event inquiry email has been opened in your mail app. Our banquet coordination team will respond within one business day.'}
                </p>

                <div className="bg-white border border-border-light/70 p-4 rounded-sm text-left text-xs font-sans space-y-1.5 max-w-sm mx-auto mb-6">
                  <p>
                    <strong className="text-charcoal">Event:</strong> {formData.eventType}
                  </p>
                  <p>
                    <strong className="text-charcoal">Date:</strong> {formData.date}
                  </p>
                  <p>
                    <strong className="text-charcoal">Guests:</strong> {formData.guests} persons
                  </p>
                  <p>
                    <strong className="text-charcoal">Direct Front Desk:</strong>{' '}
                    <a
                      href={`tel:${hotelData.phone.replace(/\s+/g, '')}`}
                      className="text-amil-red hover:underline font-medium"
                    >
                      {hotelData.phone}
                    </a>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="secondary" size="md" onClick={handleReset}>
                    Submit Another Request
                  </Button>
                  <Button variant="primary" size="md" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppBooking} className="p-6 sm:p-8 space-y-5">
                <div className="bg-ivory/60 border border-border-light/70 p-3 rounded-sm flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-muted-gold flex-shrink-0" />
                  <p className="text-xs font-sans text-text-muted leading-relaxed">
                    Selecting your preferred date and guest count allows our banquet team to instantly verify hall calendar availability and prepare a customized quote.
                  </p>
                </div>

                {/* Event Type & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="modal-event-type"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                    >
                      Event Category *
                    </label>
                    <select
                      id="modal-event-type"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors"
                    >
                      {EVENT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="modal-date"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                    >
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                      <input
                        id="modal-date"
                        type="date"
                        name="date"
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors"
                      />
                    </div>
                    {errors.date && (
                      <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.date}</p>
                    )}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                    >
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                      <input
                        id="modal-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. S. Ramanathan"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="modal-phone"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                    >
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                      <input
                        id="modal-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email & Expected Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="modal-email"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                    >
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                      <input
                        id="modal-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="client@example.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="modal-guests"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                    >
                      Expected Guests *
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                      <input
                        id="modal-guests"
                        type="number"
                        name="guests"
                        min="1"
                        value={formData.guests}
                        onChange={handleChange}
                        placeholder="e.g. 150"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors"
                      />
                    </div>
                    {errors.guests && (
                      <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.guests}</p>
                    )}
                  </div>
                </div>

                {/* Time Slot & Catering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="modal-slot"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                    >
                      Preferred Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                      <select
                        id="modal-slot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="modal-catering"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                    >
                      Catering Preference
                    </label>
                    <div className="relative">
                      <Utensils className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                      <select
                        id="modal-catering"
                        name="catering"
                        value={formData.catering}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors"
                      >
                        {CATERING_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label
                    htmlFor="modal-requests"
                    className="block text-xs font-sans font-medium uppercase tracking-wider text-charcoal-text mb-1"
                  >
                    Special Requests / AV / Décor Notes
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                    <textarea
                      id="modal-requests"
                      name="specialRequests"
                      rows={2}
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="e.g. Stage floral theme, microphone setup, cake cutting arrangements..."
                      className="w-full pl-9 pr-3 py-2 bg-white border border-border-light text-xs font-sans text-charcoal rounded-[2px] focus:outline-none focus:border-amil-red transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 border-t border-border-light/70 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppBooking}
                      className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs font-semibold tracking-wider uppercase rounded-[2px] flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Inquire via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleEmailBooking}
                      className="w-full py-3 px-4 bg-amil-red hover:bg-amil-red-dark text-ivory font-sans text-xs font-semibold tracking-wider uppercase rounded-[2px] flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Email Inquiry</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-sans text-text-muted pt-1">
                    <span>Direct Call Assistance:</span>
                    <a
                      href={`tel:${hotelData.phone.replace(/\s+/g, '')}`}
                      className="text-charcoal hover:text-amil-red font-medium flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{hotelData.phone}</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventBookingModal;
