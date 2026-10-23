import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Landmark, Smartphone, Wallet, XCircle } from 'lucide-react';
import { roomsData } from '../data/rooms';
import { Button } from '../components/ui/Button';

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const booking = useMemo(() => {
    if (location.state?.booking) return location.state.booking;
    try { return JSON.parse(sessionStorage.getItem('hotel-amil-booking') || 'null'); } catch { return null; }
  }, [location.state]);
  const [paymentMethod, setPaymentMethod] = useState(() => ['card', 'upi', 'net-banking', 'wallets'].includes(booking?.paymentMethod) ? booking.paymentMethod : 'card');
  const room = roomsData.find((item) => item.id === booking?.roomId);
  const guestCount = Number.parseInt(booking?.guests, 10);
  const hasExactGuestCount = /^\d+$/.test(booking?.guests || '');
  const nightlyRate = room && hasExactGuestCount ? (guestCount <= 1 ? room.singlePrice : room.doublePrice + Math.max(0, guestCount - 2) * room.extraPersonPrice) : null;
  const nights = booking ? Math.round((new Date(`${booking.checkOut}T00:00:00`) - new Date(`${booking.checkIn}T00:00:00`)) / 86400000) : null;
  const roomAmount = nightlyRate && nights > 0 ? nightlyRate * nights : null;
  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: Smartphone },
    { id: 'net-banking', name: 'Net Banking', icon: Landmark },
    { id: 'wallets', name: 'Wallets', icon: Wallet },
  ];
  const returnToBooking = () => navigate('/booking', { state: { booking } });
  const completeDemoPayment = () => {
    setStatus('loading');
    window.setTimeout(() => {
      setStatus('success');
      window.setTimeout(() => navigate('/booking', { state: { booking, paymentResult: 'success' } }), 700);
    }, 700);
  };

  if (!booking || !room) {
    return <div className="bg-ivory min-h-screen flex items-center justify-center px-4 pt-28 pb-24"><div className="bg-warm-white border border-border-light/80 p-8 text-center shadow-soft-luxury max-w-md"><h1 className="text-2xl font-serif text-charcoal mb-3">Booking details required</h1><p className="text-xs font-sans text-text-muted mb-6">Please begin with your stay details before proceeding to payment.</p><Link to="/booking"><Button variant="primary">Return to Booking</Button></Link></div></div>;
  }

  return (
    <div className="bg-ivory pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center"><span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red">Secure checkout</span><h1 className="mt-2 text-3xl sm:text-4xl font-serif text-charcoal">Complete Your Reservation</h1><p className="mt-2 text-xs font-sans text-text-muted">Demo / test payment only — no real payment gateway is configured.</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-7 bg-warm-white border border-border-light/80 p-6 sm:p-8 shadow-soft-luxury">
            <h2 className="text-xs font-sans font-semibold tracking-luxury uppercase text-charcoal-text border-b border-border-light/60 pb-4">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {paymentMethods.map(({ id, name, icon: Icon }) => {
                const selected = paymentMethod === id;
                return <button key={id} type="button" onClick={() => setPaymentMethod(id)} disabled={status !== 'idle'} className={`p-4 border text-left flex items-center gap-3 transition-colors disabled:cursor-not-allowed ${selected ? 'border-amil-red bg-amil-red/[0.03] ring-1 ring-amil-red' : 'border-border-light/80 bg-white hover:border-charcoal-text/30'}`}><Icon className={`w-5 h-5 ${selected ? 'text-amil-red' : 'text-text-muted'}`} /><span className={`text-xs font-sans font-semibold ${selected ? 'text-amil-red' : 'text-charcoal'}`}>{name}</span></button>;
              })}
            </div>
            <div className="mt-6 border-t border-border-light/60 pt-5">
              {status === 'idle' && <><p className="text-[11px] font-sans text-text-muted leading-relaxed">This is a demo payment screen. Do not enter card, bank, or UPI credentials; none are collected or stored.</p><div className="mt-5 flex flex-col sm:flex-row gap-3"><Button variant="primary" size="lg" onClick={completeDemoPayment} className="flex-1">Complete Demo Payment</Button><Button variant="secondary" size="lg" onClick={() => setStatus('failure')} className="flex-1">Simulate Test Failure</Button><Button variant="ghost" size="lg" onClick={() => setStatus('cancelled')}>Cancel</Button></div></>}
              {status === 'loading' && <p className="text-xs font-sans text-text-muted text-center py-4">Processing demo payment...</p>}
              {status === 'success' && <p className="text-xs font-sans text-emerald-700 text-center py-4 flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" /> Demo payment successful. Continuing to your booking confirmation...</p>}
              {status === 'failure' && <div className="text-center py-2"><p className="text-xs font-sans text-rose-700 flex items-center justify-center gap-2"><XCircle className="w-4 h-4" /> Demo payment failed. No payment was taken.</p><div className="mt-5 flex justify-center gap-3"><Button variant="primary" onClick={() => setStatus('idle')}>Try Again</Button><Button variant="secondary" onClick={returnToBooking}>Return to Booking</Button></div></div>}
              {status === 'cancelled' && <div className="text-center py-2"><p className="text-xs font-sans text-text-muted">Demo payment cancelled. No payment was taken.</p><Button variant="secondary" onClick={returnToBooking} className="mt-5">Return to Booking</Button></div>}
            </div>
          </section>
          <aside className="lg:col-span-5 bg-warm-white border border-border-light/80 p-6 sm:p-8 shadow-soft-luxury">
            <h2 className="text-xs font-sans font-semibold tracking-luxury uppercase text-charcoal-text border-b border-border-light/60 pb-4">Booking Summary</h2>
            <dl className="mt-5 space-y-3 text-xs font-sans">
              <div className="flex justify-between gap-4"><dt className="text-text-muted">Guest</dt><dd className="text-charcoal font-medium text-right">{booking.name}</dd></div>
              {booking.email && <div className="flex justify-between gap-4"><dt className="text-text-muted">Email</dt><dd className="text-charcoal font-medium text-right break-all">{booking.email}</dd></div>}
              <div className="flex justify-between gap-4"><dt className="text-text-muted">Phone</dt><dd className="text-charcoal font-medium text-right">{booking.phone}</dd></div><div className="flex justify-between gap-4"><dt className="text-text-muted">Room</dt><dd className="text-charcoal font-medium text-right">{room.name}</dd></div><div className="flex justify-between gap-4"><dt className="text-text-muted">Check-in</dt><dd className="text-charcoal font-medium text-right">{booking.checkIn}</dd></div><div className="flex justify-between gap-4"><dt className="text-text-muted">Check-out</dt><dd className="text-charcoal font-medium text-right">{booking.checkOut}</dd></div><div className="flex justify-between gap-4"><dt className="text-text-muted">Guests</dt><dd className="text-charcoal font-medium text-right">{booking.guests}</dd></div>
              {roomAmount && <div className="flex justify-between gap-4 border-t border-border-light/60 pt-3"><dt className="text-text-muted">Room amount ({nights} night{nights === 1 ? '' : 's'})</dt><dd className="text-charcoal font-medium text-right">₹{roomAmount.toLocaleString('en-IN')}</dd></div>}
              {roomAmount && <div className="flex justify-between gap-4"><dt className="text-charcoal font-semibold">Estimated total</dt><dd className="text-amil-red font-semibold text-right">₹{roomAmount.toLocaleString('en-IN')}</dd></div>}
            </dl>
            <p className="mt-5 text-[10px] font-sans text-text-muted leading-relaxed">Taxes, fees, and number of rooms are not available in the existing booking data and are not included in this estimate.</p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Payment;
