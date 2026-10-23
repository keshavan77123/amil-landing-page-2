import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Navigation } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import ScrollReveal from '../components/ScrollReveal';
import { hotelData } from '../data/hotel';

const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Hotel%20Amil%2C%20259-A%2C%20Tenkasi%20Main%20Road%2C%20Rajapalayam%2C%20Tamil%20Nadu%20626142';
const googleMapsEmbedUrl = 'https://www.google.com/maps?q=Hotel%20Amil%2C%20259-A%2C%20Tenkasi%20Main%20Road%2C%20Rajapalayam%2C%20Tamil%20Nadu%20626142&output=embed';

export const Contact = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hotel Amil — General Contact Message:', formData);
    setFormSent(true);
  };

  return (
    <div className="bg-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollReveal yOffset={25}>
          <SectionHeading
            eyebrow="GET IN TOUCH"
            title="Contact & Concierge Desk"
            subtitle="We invite your inquiries regarding room reservations, private banquets, wedding receptions, or general travel arrangements in Rajapalayam."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-8">
          {/* Left Column: Contact Cards & Details */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.1} yOffset={25}>
              <div className="bg-warm-white border border-border-light/80 p-6 sm:p-8 shadow-soft-luxury space-y-6">
                <div>
                  <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-1">
                    PROPERTY LOCATION
                  </span>
                  <h3 className="text-xl font-serif text-charcoal mb-2">Hotel Amil</h3>
                  <div className="flex items-start space-x-3 text-xs font-sans text-text-muted leading-relaxed">
                    <MapPin className="w-4 h-4 text-amil-red mt-0.5 flex-shrink-0" />
                    <span>{hotelData.fullAddress}</span>
                  </div>
                </div>

                <div className="border-t border-border-light/60 pt-5">
                  <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
                    DIRECT CONTACT LINES
                  </span>
                  <div className="space-y-2 text-xs font-sans text-charcoal-text">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-amil-red flex-shrink-0" />
                      <span><strong>Telephone:</strong> <a href="tel:+918111075108">+91 81110 75108</a></span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-amil-red flex-shrink-0" />
                      <span><strong>Mobile / Desk:</strong> {hotelData.mobile}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-amil-red flex-shrink-0" />
                      <span><strong>Reservations:</strong> {hotelData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border-light/60 pt-5">
                  <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
                    RECEPTION HOURS
                  </span>
                  <div className="flex items-center space-x-3 text-xs font-sans text-text-muted">
                    <Clock className="w-4 h-4 text-amil-red flex-shrink-0" />
                    <span>Front Desk: 24 Hours / 7 Days a Week</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={hotelData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="primary" size="md" className="w-full text-xs">
                      Chat with Concierge on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2} yOffset={25}>
              <div className="bg-warm-white border border-border-light/80 p-6 sm:p-10 shadow-soft-luxury">
                <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-1">
                  CORRESPONDENCE
                </span>
                <h3 className="text-2xl font-serif text-charcoal mb-4">
                  Send a Message to Management
                </h3>

                {formSent ? (
                  <div className="p-8 text-center bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="text-lg font-serif text-emerald-950 mb-2">Message Dispatched</h4>
                    <p className="text-xs font-sans text-emerald-800">
                      Thank you for contacting Hotel Amil. Our guest relations executive will review your inquiry and respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSent(false)}
                      className="mt-4 text-xs font-sans font-semibold text-amil-red uppercase tracking-luxury hover:underline"
                    >
                      Send Another Note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-xs font-sans text-charcoal-text uppercase tracking-wider mb-1">
                          Your Name *
                        </label>
                        <input
                          id="contactName"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="contactPhone" className="block text-xs font-sans text-charcoal-text uppercase tracking-wider mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="contactPhone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full p-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactEmail" className="block text-xs font-sans text-charcoal-text uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          id="contactEmail"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
                          placeholder="name@domain.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="contactSubject" className="block text-xs font-sans text-charcoal-text uppercase tracking-wider mb-1">
                          Inquiry Topic *
                        </label>
                        <select
                          id="contactSubject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full p-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
                        >
                          <option value="General Inquiry">General Hospitality Inquiry</option>
                          <option value="Banquet & Weddings">Banquet & Weddings</option>
                          <option value="Corporate Booking">Corporate Tariff & Group Bookings</option>
                          <option value="Restaurant Dining">Saffron Restaurant & Catering</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contactMessage" className="block text-xs font-sans text-charcoal-text uppercase tracking-wider mb-1">
                        Message Content *
                      </label>
                      <textarea
                        id="contactMessage"
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
                        placeholder="How may our concierge assist you?"
                      />
                    </div>

                    <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                      <Send className="w-3.5 h-3.5 mr-2 inline" />
                      Send Inquiries
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Section 34: Google Maps Embed */}
        <section className="mt-16">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red block">
                GEOGRAPHIC NAVIGATION
              </span>
              <h3 className="text-xl font-serif text-charcoal">
                Location & Accessibility in Rajapalayam
              </h3>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase font-sans font-semibold tracking-luxury text-amil-red hover:underline flex items-center"
            >
              <Navigation className="w-3.5 h-3.5 mr-1" /> Open in Google Maps
            </a>
          </div>

          <div className="relative w-full aspect-[21/9] min-h-[300px] bg-[#EFE9DF] border border-border-light/80 overflow-hidden shadow-soft-luxury">
            <iframe
              title="Hotel Amil, Rajapalayam location on Google Maps"
              src={googleMapsEmbedUrl}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
