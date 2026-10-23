import React, { useState } from 'react';
import { Building2, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';

export const PaymentOptions = ({ selectedOption = 'hotel', onSelect }) => {
  const [selected, setSelected] = useState(selectedOption);

  const options = [
    {
      id: 'hotel',
      name: 'Pay at Hotel',
      description: 'Settle your bill in person upon arrival with Cash, UPI, or Card.',
      icon: Building2,
    },
    {
      id: 'upi',
      name: 'Instant UPI',
      description: 'Google Pay, PhonePe, Paytm, or BHIM QR payment on confirmation.',
      icon: Smartphone,
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      description: 'Visa, MasterCard, RuPay, and American Express accepted.',
      icon: CreditCard,
    },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    if (onSelect) onSelect(id);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase font-sans font-semibold tracking-luxury text-charcoal-text">
          Payment Preference
        </label>
        <div className="flex items-center text-[11px] text-text-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-amil-red mr-1" />
          <span>Pay securely upon stay</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {options.map((option) => {
          const Icon = option.icon;
          const isCurrent = selected === option.id;

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`cursor-pointer p-3.5 border transition-all duration-200 text-left flex flex-col justify-between ${
                isCurrent
                  ? 'border-amil-red bg-amil-red/[0.03] ring-1 ring-amil-red'
                  : 'border-border-light/80 bg-warm-white hover:border-charcoal-text/30'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-amil-red' : 'text-text-muted'}`} />
                <span className={`text-xs font-sans font-semibold ${isCurrent ? 'text-amil-red' : 'text-charcoal'}`}>
                  {option.name}
                </span>
              </div>
              <p className="text-[11px] font-sans text-text-muted leading-tight">
                {option.description}
              </p>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-text-muted italic">
        * No upfront charge is required to submit an enquiry. Reservation payment terms will be coordinated directly by Hotel Amil reservations desk.
      </p>
    </div>
  );
};

export default PaymentOptions;
