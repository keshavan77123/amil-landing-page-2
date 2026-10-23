import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Calendar, User, Phone, Mail, Users, MessageSquare, ArrowRight } from 'lucide-react';
import { roomsData } from '../data/rooms';
import { Button } from './ui/Button';

export const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const storedBooking = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('hotel-amil-booking') || 'null');
    } catch {
      return null;
    }
  })();
  const returnedBooking = location.state?.booking || storedBooking;

  // Pre-populate from query parameters
  const initialRoom = searchParams.get('room') || 'executive';
  const initialCheckIn = searchParams.get('checkIn') || new Date().toISOString().split('T')[0];
  
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const initialCheckOut = searchParams.get('checkOut') || tomorrowDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: returnedBooking?.name || '',
    phone: returnedBooking?.phone || '',
    email: returnedBooking?.email || '',
    roomId: returnedBooking?.roomId || initialRoom,
    checkIn: returnedBooking?.checkIn || initialCheckIn,
    checkOut: returnedBooking?.checkOut || initialCheckOut,
    guests: returnedBooking?.guests || '2',
    specialRequests: returnedBooking?.specialRequests || '',
    paymentMethod: returnedBooking?.paymentMethod || searchParams.get('payment') || 'card',
    adults: returnedBooking?.adults || searchParams.get('adults') || '2',
    children: returnedBooking?.children || searchParams.get('children') || '0',
    promoCode: returnedBooking?.promoCode || searchParams.get('promo') || '',
  });

  const [submitted, setSubmitted] = useState(location.state?.paymentResult === 'success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const roomParam = searchParams.get('room');
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');

    setFormData((prev) => ({
      ...prev,
      roomId: roomParam || prev.roomId,
      checkIn: checkInParam || prev.checkIn,
      checkOut: checkOutParam || prev.checkOut,
    }));
  }, [searchParams]);

  useEffect(() => {
    if (location.state?.paymentResult === 'success') {
      sessionStorage.removeItem('hotel-amil-booking');
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    sessionStorage.setItem('hotel-amil-booking', JSON.stringify(formData));
    navigate('/payment', { state: { booking: formData } });
  };

  const selectedRoomObj = roomsData.find((r) => r.id === formData.roomId) || roomsData[0];

  if (submitted) {
    return (
      <div className="bg-warm-white border border-border-light/80 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-soft-luxury">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 stroke-[1.5]" />
        </div>
        <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
          Enquiry Received
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-charcoal mb-4">
          Thank You, {formData.name}
        </h3>
        <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed mb-6">
          Your reservation enquiry for the <strong>{selectedRoomObj.name}</strong> from <strong>{formData.checkIn}</strong> to <strong>{formData.checkOut}</strong> has been received by the Hotel Amil reservations team. Our front desk will contact you via WhatsApp/Phone at <strong>{formData.phone}</strong> shortly to confirm your booking and arrange your arrival.
        </p>
        <div className="p-4 bg-white/70 border border-border-light/60 text-xs font-sans text-left space-y-1.5 mb-8 text-charcoal-text">
          <p><strong>Room Category:</strong> {selectedRoomObj.name}</p>
          <p><strong>Guest Count:</strong> {formData.guests} Guests</p>
          <p><strong>Estimated Tariff:</strong> ₹{selectedRoomObj.singlePrice.toLocaleString('en-IN')} / night</p>
          <p><strong>Contact Phone:</strong> {formData.phone}</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              roomId: 'executive',
              checkIn: new Date().toISOString().split('T')[0],
              checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
              guests: '2',
              specialRequests: '',
            });
          }}
        >
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-warm-white border border-border-light/80 p-6 sm:p-10 shadow-soft-luxury">
      <div className="mb-8">
        <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
          Direct Reservation Request
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal">
          Guest & Stay Details
        </h3>
        <p className="text-xs text-text-muted font-sans mt-1">
          Complete the details below and our front desk will promptly verify availability and confirm your stay.
        </p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Mr. Senthil Kumar"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5">
              Contact Phone / WhatsApp *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="senthil@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
              />
            </div>
          </div>
        </div>

        {/* Room Category Selection */}
        <div>
          <label htmlFor="roomId" className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5">
            Preferred Room Category *
          </label>
          <select
            id="roomId"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
          >
            {roomsData.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} — From ₹{room.startingPrice.toLocaleString('en-IN')} / night (Max {room.maxOccupancy} Guests)
              </option>
            ))}
          </select>
        </div>

        {/* Check-in, Check-out & Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="formCheckIn" className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5">
              Check-in Date *
            </label>
            <input
              id="formCheckIn"
              type="date"
              name="checkIn"
              required
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
            />
          </div>

          <div>
            <label htmlFor="formCheckOut" className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5">
              Check-out Date *
            </label>
            <input
              id="formCheckOut"
              type="date"
              name="checkOut"
              required
              value={formData.checkOut}
              min={formData.checkIn}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
            />
          </div>

          <div>
            <label htmlFor="guests" className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5">
              Total Guests *
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6+ Guests (Family Suite)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="specialRequests" className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1.5">
            Special Requests / Dietary Notes
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows="3"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="e.g. Quiet upper floor room, extra rollaway bed, late arrival at 9 PM, airport pickup..."
            className="w-full p-3 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px]"
          />
        </div>

        {/* Submit CTA */}
        <div className="pt-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full text-xs tracking-luxury py-4 shadow-md flex items-center justify-center space-x-2"
          >
            <span>{isSubmitting ? 'Preparing Payment...' : 'Proceed to Payment'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-[11px] text-text-muted text-center mt-3">
            * Direct reservation guarantees best rates and flexible check-in assistance.
          </p>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
