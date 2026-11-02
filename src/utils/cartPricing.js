/**
 * Hotel Amil Confirmed Room Rates (₹ / night)
 * Confirmed tariffs for Hotel Amil room categories:
 * - Executive Room: ₹2,625/night
 * - Twin / Double Executive Room: ₹3,675/night
 * - Deluxe Suite: ₹4,725/night
 * - Grand Family Suite: ₹7,875/night
 */
export const CONFIRMED_ROOM_RATES = {
  'executive': 2625,
  'twin-executive': 3675,
  'deluxe': 4725,
  'family': 7875,
  // Backward compatibility aliases
  'executive-single': 2625,
  'executive-double': 3675,
};

export const CART_STORAGE_KEY = 'hotel_amil_cart';

/**
 * Calculate room item subtotal based strictly on confirmed Hotel Amil pricing:
 * Room subtotal = Rate per night × Number of nights × Number of rooms.
 * No GST, taxes, extra-person charges or discounts are applied.
 *
 * @param {number} ratePerNight - Rate per night in INR
 * @param {number} nights - Number of stay nights (minimum 1)
 * @param {number} rooms - Number of rooms reserved (minimum 1)
 * @returns {number} Subtotal in INR
 */
export const calculateItemSubtotal = (ratePerNight, nights, rooms) => {
  const safeRate = Math.max(0, Number(ratePerNight) || 0);
  const safeNights = Math.max(1, Number(nights) || 1);
  const safeRooms = Math.max(1, Number(rooms) || 1);
  return safeRate * safeNights * safeRooms;
};

/**
 * Calculate difference in nights between two YYYY-MM-DD date strings.
 * Enforces a minimum of 1 night for stay calculations.
 *
 * @param {string} checkIn - YYYY-MM-DD date string
 * @param {string} checkOut - YYYY-MM-DD date string
 * @returns {number} Count of nights
 */
export const calculateNightsBetween = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays || 1);
};

/**
 * Validate and sanitize a cart item object loaded from localStorage or passed to addToCart.
 * Returns null if the item is invalid.
 *
 * @param {object} raw - Unsanitized raw item object
 * @returns {object|null} Sanitized item or null
 */
export const sanitizeCartItem = (raw) => {
  if (!raw || typeof raw !== 'object') return null;

  const roomId = typeof raw.roomId === 'string' ? raw.roomId.trim() : 'room';
  const roomName = typeof raw.roomName === 'string' ? raw.roomName.trim() : 'Hotel Amil Room';
  const category = typeof raw.category === 'string' ? raw.category.trim() : 'Room';
  const image = typeof raw.image === 'string' ? raw.image : '';
  const checkIn = typeof raw.checkIn === 'string' ? raw.checkIn : '';
  const checkOut = typeof raw.checkOut === 'string' ? raw.checkOut : '';

  const nights = Number.isFinite(Number(raw.nights)) && Number(raw.nights) > 0
    ? Math.round(Number(raw.nights))
    : calculateNightsBetween(checkIn, checkOut);

  const adults = Number.isFinite(Number(raw.adults)) && Number(raw.adults) > 0
    ? Math.round(Number(raw.adults))
    : 1;

  const children = Number.isFinite(Number(raw.children)) && Number(raw.children) >= 0
    ? Math.round(Number(raw.children))
    : 0;

  const rooms = Number.isFinite(Number(raw.rooms)) && Number(raw.rooms) > 0
    ? Math.round(Number(raw.rooms))
    : 1;

  const ratePerNight = Number.isFinite(Number(raw.ratePerNight)) && Number(raw.ratePerNight) >= 0
    ? Number(raw.ratePerNight)
    : (CONFIRMED_ROOM_RATES[roomId] || 0);

  const subtotal = calculateItemSubtotal(ratePerNight, nights, rooms);

  // Stable composite ID if none provided
  const id = typeof raw.id === 'string' && raw.id.trim()
    ? raw.id.trim()
    : `${roomId}_${checkIn}_${checkOut}_${adults}A_${children}C`;

  return {
    id,
    roomId,
    roomName,
    category,
    image,
    checkIn,
    checkOut,
    nights,
    adults,
    children,
    rooms,
    ratePerNight,
    subtotal,
  };
};
