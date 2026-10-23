import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { hotelData } from '../data/hotel';
import { ShieldCheck, Clock, Coffee, AlertCircle, Ban, GlassWater } from 'lucide-react';

const policyIcons = {
  'check-in-out': Clock,
  'cp-breakfast': Coffee,
  'cancellation': ShieldCheck,
  'pets': Ban,
  'visitors': AlertCircle,
  'liquor': GlassWater,
};

export const Policy = () => {
  return (
    <div className="bg-ivory pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollReveal yOffset={25}>
          <SectionHeading
            eyebrow="GUEST INFORMATION & REGULATIONS"
            title="Hotel Policies & Terms of Stay"
            subtitle="To preserve quiet comfort, discretion, and well-being for all our residents, please review our hospitality guidelines and room policies."
          />
        </ScrollReveal>

        {/* Typographic Document Container */}
        <div className="mt-8 bg-warm-white border border-border-light/80 p-8 sm:p-12 shadow-soft-luxury divide-y divide-border-light/70">
          {hotelData.policies.map((policy, idx) => {
            const Icon = policyIcons[policy.id] || ShieldCheck;
            return (
              <ScrollReveal key={policy.id} delay={idx * 0.08} yOffset={20}>
                <div className="py-8 first:pt-0 last:pb-0">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="p-2.5 bg-ivory border border-border-light/80 text-amil-red flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-1">
                        Policy Section {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif text-charcoal font-normal">
                        {policy.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-sans font-medium text-charcoal-text/90 mb-4 pl-0 sm:pl-14">
                    {policy.summary}
                  </p>

                  <ul className="space-y-2 pl-0 sm:pl-14 text-xs font-sans text-text-muted font-light">
                    {policy.details.map((detail, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-amil-red font-bold mr-1">•</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Contact Assistance Note */}
        <div className="mt-12 text-center text-xs font-sans text-text-muted border-t border-border-light/60 pt-8">
          <p>
            Have specific inquiries regarding group bookings, early check-in, or special accommodations?
          </p>
          <p className="mt-1">
            Please contact our Duty Manager directly at{' '}
            <a href={`tel:${hotelData.phone.replace(/\s+/g, '')}`} className="text-amil-red font-semibold hover:underline">
              {hotelData.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${hotelData.email}`} className="text-amil-red font-semibold hover:underline">
              {hotelData.email}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
