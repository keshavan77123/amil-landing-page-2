import React from 'react';
import BookingForm from '../components/BookingForm';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { hotelData } from '../data/hotel';
import { ShieldCheck, Phone, Clock, Sparkles } from 'lucide-react';

export const BookingEnquiry = () => {
  return (
    <div className="bg-ivory pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal yOffset={25}>
          <SectionHeading
            align="center"
            eyebrow="RESERVATIONS & STAYS"
            title="Book Your Stay at Hotel Amil"
            subtitle="Submit your preferred dates and room specifications. Our reservations desk will promptly review your request and confirm availability."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 items-start">
          {/* Main Booking Form */}
          <div className="lg:col-span-8">
            <ScrollReveal delay={0.1} yOffset={25}>
              <BookingForm />
            </ScrollReveal>
          </div>

          {/* Right Information Sidecard */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal delay={0.2} yOffset={25}>
              <div className="bg-warm-white border border-border-light/80 p-6 shadow-soft-luxury space-y-5">
                <h4 className="text-xs font-sans font-semibold tracking-luxury uppercase text-charcoal-text border-b border-border-light/60 pb-3">
                  Direct Booking Advantages
                </h4>

                <div className="space-y-4 text-xs font-sans">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="w-4 h-4 text-amil-red mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-charcoal">Best Available Tariff</strong>
                      <span className="text-text-muted">Zero online platform commission fees or hidden surcharges.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-4 h-4 text-amil-red mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-charcoal">Complimentary CP Breakfast</strong>
                      <span className="text-text-muted">Signature South Indian and continental breakfast buffet included.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-amil-red mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-charcoal">Priority Early Check-in</strong>
                      <span className="text-text-muted">Subject to room availability on your day of arrival.</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} yOffset={25}>
              <div className="bg-charcoal text-ivory p-6 border border-ivory/15 space-y-3">
                <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block">
                  Need Immediate Assistance?
                </span>
                <h4 className="text-lg font-serif">Front Desk Concierge</h4>
                <p className="text-xs text-ivory/70 font-light leading-relaxed">
                  Call our 24-hour reception directly to reserve suites with immediate vocal confirmation:
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${hotelData.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center text-xs font-sans font-semibold tracking-luxury text-amil-red bg-ivory px-4 py-2 hover:bg-warm-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 mr-2" />
                    {hotelData.phone}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingEnquiry;
