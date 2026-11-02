/**
 * HOTEL AMIL — VIRTUAL ASSISTANCE KNOWLEDGE BASE
 * Phase 4, Milestone 1: Structured Knowledge Base
 * 
 * Sourced directly from verified Hotel Amil project data:
 * - src/data/hotel.js
 * - src/data/rooms.js
 * - src/data/dining.js
 * - src/data/amenities.js
 * - src/pages/Events.jsx
 * - src/pages/Contact.jsx
 * - src/pages/BookingEnquiry.jsx
 * - src/pages/Policy.jsx
 * 
 * All facts, dimensions, hours, policies, phone numbers, and navigation destinations
 * are 100% verified against production code. Zero hallucinated data.
 */

import { hotelData } from './hotel.js';

export const KNOWLEDGE_CATEGORIES = [
  "Rooms and accommodation",
  "Room tariffs and facilities",
  "Restaurants and dining",
  "Swimming pool and amenities",
  "Parking and infrastructure",
  "Events and celebrations",
  "Booking information",
  "Hotel policies",
  "Location and contact"
];

export const VIRTUAL_ASSISTANCE_KNOWLEDGE = [
  // ─────────────────────────────────────────────────────────────
  // 1. ROOMS AND ACCOMMODATION (5 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "rooms-overview",
    category: "Rooms and accommodation",
    keywords: [
      "rooms",
      "room categories",
      "accommodation",
      "accommodations",
      "suites",
      "stay options",
      "types of rooms",
      "available rooms",
      "show me rooms",
      "what rooms do you have"
    ],
    answer:
      "Hotel Amil features four thoughtfully designed accommodation categories:\n\n" +
      "• Executive Room (340 sq. ft.) — Plush King bed, ergonomic workstation, Western Ghats views\n" +
      "• Twin Executive Room (360 sq. ft.) — 2 Twin pocket-spring beds, acoustic soundproof rest\n" +
      "• Deluxe Suite (480 sq. ft.) — California King bed, separate living parlor, private scenic balcony, soaking tub\n" +
      "• Grand Family Suite (650 sq. ft.) — 1 King + 2 Queen beds, 2 full bathrooms, central dining lounge\n\n" +
      "All rooms include complimentary CP breakfast buffet at Saffron Restaurant, high-speed fiber Wi-Fi, and 360° virtual tours.",
    actionButton: "Explore Accommodations →",
    destination: "/rooms",
    priority: 70
  },
  {
    id: "room-executive",
    category: "Rooms and accommodation",
    keywords: [
      "executive room",
      "executive",
      "single room",
      "king room",
      "business room",
      "workstation room"
    ],
    negativeKeywords: ["twin", "suite", "family"],
    answer:
      "The Executive Room (340 sq. ft. / 32 sq. m) offers tailored elegance on Floors 2 & 3 for business travelers and couples. " +
      "It features a plush king-size bed, an ergonomic work desk with views of the Western Ghats foothills, Italian marble ensuite bathroom, " +
      "43-inch Ultra HD Smart TV, climate control AC, and digital safe. Accommodates up to 3 guests (from ₹3,800/night single, ₹4,400 double, ₹900 extra person).",
    actionButton: "View Executive Room →",
    destination: "/rooms/executive",
    priority: 85
  },
  {
    id: "room-twin-executive",
    category: "Rooms and accommodation",
    keywords: [
      "twin executive room",
      "twin room",
      "twin executive",
      "twin beds",
      "two beds",
      "separate beds",
      "colleagues room"
    ],
    answer:
      "The Twin Executive Room (360 sq. ft. / 34 sq. m) on Floors 2 & 3 is fitted with two individual custom orthopaedic pocket-spring single beds. " +
      "It features acoustic soundproof windows, a walk-in rain shower, 43-inch Ultra HD Smart TV, dual bedside power and USB outlets, " +
      "and a private conversational seating corner. Ideal for colleagues or traveling companions, accommodating up to 3 guests (from ₹4,200/night single, ₹4,800 double, ₹900 extra person).",
    actionButton: "View Twin Room →",
    destination: "/rooms/twin-executive",
    priority: 85
  },
  {
    id: "room-deluxe-suite",
    category: "Rooms and accommodation",
    keywords: [
      "deluxe suite",
      "deluxe room",
      "suite with balcony",
      "penthouse",
      "balcony room",
      "luxury suite",
      "soaking tub",
      "bathtub",
      "penthouse suite"
    ],
    negativeKeywords: ["family"],
    answer:
      "The Deluxe Suite (480 sq. ft. / 45 sq. m) is located on the Penthouse Level (Floor 4) and offers panoramic views of the Rajapalayam hills. " +
      "It includes a California King bed, separate living parlor with plush sofa suite, a private scenic balcony, deep soaking bathtub with rain shower, " +
      "55-inch Ultra HD Smart TV, and complimentary Nespresso coffee machine. Accommodates up to 4 guests (from ₹5,600/night single, ₹6,200 double, ₹1,100 extra person).",
    actionButton: "View Deluxe Suite →",
    destination: "/rooms/deluxe",
    priority: 85
  },
  {
    id: "room-family-suite",
    category: "Rooms and accommodation",
    keywords: [
      "family suite",
      "grand family suite",
      "family room",
      "interconnected room",
      "two bedroom",
      "large suite",
      "suite for 6",
      "kids room"
    ],
    answer:
      "The Grand Family Suite (650 sq. ft. / 60 sq. m) on Floors 3 & 4 provides gracious multi-room luxury designed for family vacations. " +
      "It features two interconnected bedrooms (1 Master King + 2 Queen beds), two full bathrooms with rain showers, a central living salon and dining table, " +
      "two 50-inch Smart TVs, and a pantry with microwave and mini fridge. Accommodates up to 6 guests (from ₹7,500/night single, ₹8,200 double, ₹1,200 extra person).",
    actionButton: "View Family Suite →",
    destination: "/rooms/family",
    priority: 85
  },

  // ─────────────────────────────────────────────────────────────
  // 2. ROOM TARIFFS AND FACILITIES (4 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "tariffs-comparison",
    category: "Room tariffs and facilities",
    keywords: [
      "tariff",
      "tariffs",
      "price",
      "prices",
      "room rate",
      "room rates",
      "cost",
      "how much",
      "room cost",
      "pricing",
      "room prices"
    ],
    answer:
      "Hotel Amil Room Tariffs (Continental Plan with Complimentary Breakfast):\n\n" +
      "• Executive Room: From ₹3,800 (Single) | ₹4,400 (Double) | Extra Person: ₹900\n" +
      "• Twin Executive Room: From ₹4,200 (Single) | ₹4,800 (Double) | Extra Person: ₹900\n" +
      "• Deluxe Suite: From ₹5,600 (Single) | ₹6,200 (Double) | Extra Person: ₹1,100\n" +
      "• Grand Family Suite: From ₹7,500 (Single) | ₹8,200 (Double) | Extra Person: ₹1,200\n\n" +
      "All room rates include complimentary CP breakfast buffet at Saffron Restaurant and high-speed Wi-Fi. Direct booking guarantees our best available tariff.",
    actionButton: "Compare All Rooms →",
    destination: "/rooms",
    priority: 80
  },
  {
    id: "in-room-amenities",
    category: "Room tariffs and facilities",
    keywords: [
      "in room amenities",
      "room amenities",
      "room facilities",
      "television",
      "smart tv",
      "air conditioning",
      "ac",
      "safe",
      "digital safe",
      "hot water",
      "kettle",
      "coffee maker"
    ],
    answer:
      "All guest rooms and suites at Hotel Amil are appointed with comprehensive modern comforts:\n\n" +
      "• Individual climate control air conditioning\n" +
      "• Complimentary high-speed fiber Wi-Fi\n" +
      "• 43-inch to 55-inch Ultra HD Smart TVs\n" +
      "• Italian marble ensuite bathroom with 24-hour hot & cold water\n" +
      "• Electronic digital in-room safe box\n" +
      "• Gourmet tea and artisan coffee maker\n" +
      "• Round-the-clock in-room dining service\n" +
      "• Daily housekeeping and evening turndown service",
    actionButton: "View Room Details →",
    destination: "/rooms",
    priority: 70
  },
  {
    id: "wifi-internet",
    category: "Room tariffs and facilities",
    keywords: [
      "wifi",
      "wi-fi",
      "internet",
      "fiber",
      "broadband",
      "network",
      "speed",
      "free wifi",
      "wireless internet"
    ],
    answer:
      "High-speed fiber Wi-Fi is complimentary for all resident guests throughout Hotel Amil, including all rooms, suites, Saffron Restaurant, Amil Cafe, and banquet spaces. Dedicated high-capacity bandwidth is also provided for corporate conferences and board meetings.",
    actionButton: "Explore Facilities →",
    destination: "/amenities",
    priority: 75
  },
  {
    id: "room-sizes-occupancy",
    category: "Room tariffs and facilities",
    keywords: [
      "room size",
      "square feet",
      "sq ft",
      "capacity",
      "occupancy",
      "how many guests",
      "max guests",
      "extra bed",
      "extra person",
      "bed type"
    ],
    answer:
      "Room Dimensions & Maximum Occupancy:\n\n" +
      "• Executive Room: 340 sq. ft. (32 sq. m) — Max 3 Guests (1 Plush King Bed)\n" +
      "• Twin Executive Room: 360 sq. ft. (34 sq. m) — Max 3 Guests (2 Twin Beds)\n" +
      "• Deluxe Suite: 480 sq. ft. (45 sq. m) — Max 4 Guests (1 California King Bed + Living Lounge)\n" +
      "• Grand Family Suite: 650 sq. ft. (60 sq. m) — Max 6 Guests (1 King + 2 Queen Beds)\n\n" +
      "Extra guest supplement: ₹900 (Executive & Twin), ₹1,100 (Deluxe), and ₹1,200 (Family Suite) per night.",
    actionButton: "Explore Accommodations →",
    destination: "/rooms",
    priority: 75
  },

  // ─────────────────────────────────────────────────────────────
  // 3. RESTAURANTS AND DINING (6 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "dining-overview",
    category: "Restaurants and dining",
    keywords: [
      "dining",
      "restaurants",
      "food",
      "eat",
      "cafe",
      "where to eat",
      "dining options",
      "food options"
    ],
    answer:
      "Hotel Amil offers two distinct dining destinations:\n\n" +
      "1. Saffron Restaurant — Premier fine dining celebrating authentic Tamil Nadu royal heritage, Chettinad spice traditions, Virudhunagar Biryani, tandoori grills, and pure vegetarian / Jain preparations (120 seating).\n" +
      "2. 24-Hour Amil Cafe — Round-the-clock bistro serving Kumbakonam degree filter kaapi, espresso roasts, fresh croissants, and midnight savory platters.\n\n" +
      "24-hour in-room dining is also available for all resident guests.",
    actionButton: "View Dining & Menus →",
    destination: "/dining",
    priority: 70
  },
  {
    id: "saffron-restaurant",
    category: "Restaurants and dining",
    keywords: [
      "saffron restaurant",
      "saffron",
      "fine dining",
      "biryani",
      "chettinad",
      "thali",
      "mutton biryani",
      "chettinad chicken",
      "virudhunagar biryani"
    ],
    answer:
      "Saffron Restaurant is Hotel Amil's premier gastronomy venue seating 120 guests with warm teak accents, ambient lighting, and private family alcoves. " +
      "Specialties include Virudhunagar Golden Mutton Biryani, Saffron Royal Chettinad Chicken, Meen Pollichathu, Paneer Tikka Angara, and the grand Royal Rajapalayam Veg Thali. " +
      "Contact: Dial Ext. 201 from your room or +91 4563 233600.",
    actionButton: "View Saffron Menu →",
    destination: "/dining",
    priority: 85
  },
  {
    id: "dining-timings",
    category: "Restaurants and dining",
    keywords: [
      "restaurant timings",
      "dining hours",
      "breakfast time",
      "breakfast timings",
      "lunch time",
      "lunch timings",
      "dinner time",
      "dinner timings",
      "when is breakfast",
      "when is lunch",
      "when is dinner"
    ],
    answer:
      "Dining & Meal Hours at Hotel Amil:\n\n" +
      "• Complimentary CP Breakfast Buffet: 7:00 AM – 10:30 AM (Saffron Restaurant)\n" +
      "• Royal Lunch: 12:30 PM – 3:30 PM (Saffron Restaurant)\n" +
      "• Gourmet Dinner: 7:00 PM – 11:00 PM (Saffron Restaurant)\n" +
      "• 24-Hour Amil Cafe: Open 24 Hours Daily, 7 days a week\n" +
      "• In-Room Dining: Available 24 Hours Daily via Ext. 201",
    actionButton: "View Dining Venues →",
    destination: "/dining",
    priority: 85
  },
  {
    id: "amil-cafe",
    category: "Restaurants and dining",
    keywords: [
      "amil cafe",
      "cafe",
      "coffee",
      "filter coffee",
      "filter kaapi",
      "espresso",
      "tea",
      "bistro",
      "croissant",
      "pastries",
      "midnight food",
      "late night food",
      "24 hour cafe"
    ],
    answer:
      "The 24-Hour Amil Cafe stands ready round-the-clock whether you arrive at midnight or depart at dawn. " +
      "Enjoy traditional Kumbakonam degree filter kaapi, Italian espresso roasts, freshly baked croissants and pastries, light gourmet sandwiches, and traditional evening savory snacks in an intimate lounge setting with seating for 45 guests. Dial Ext. 202 from your room.",
    actionButton: "Explore Amil Cafe →",
    destination: "/amenities#amil-cafe",
    priority: 85
  },
  {
    id: "vegetarian-jain-diet",
    category: "Restaurants and dining",
    keywords: [
      "vegetarian",
      "veg",
      "pure veg",
      "jain",
      "jain food",
      "veg thali",
      "vegan",
      "vegetarian food"
    ],
    answer:
      "Yes, Saffron Restaurant provides dedicated pure vegetarian and Jain culinary preparations crafted with separate utensils and fresh local produce. " +
      "Highlights include the Royal Rajapalayam Veg Thali (11 authentic dishes served in traditional silver style), Paneer Tikka Angara, Paneer Butter Masala, and wholesome South Indian tiffins.",
    actionButton: "Explore Dining Options →",
    destination: "/dining",
    priority: 80
  },
  {
    id: "in-room-dining",
    category: "Restaurants and dining",
    keywords: [
      "in room dining",
      "room service",
      "order food to room",
      "order food",
      "food in room",
      "dial ext 201",
      "room dining"
    ],
    answer:
      "Round-the-clock in-room dining is available 24 hours a day for all resident guests at Hotel Amil. " +
      "You can order full multi-course meals from Saffron Restaurant or light snacks and filter coffee from Amil Cafe directly to your room or suite. Dial Ext. 201 from your room telephone.",
    actionButton: "View Dining Details →",
    destination: "/dining",
    priority: 80
  },

  // ─────────────────────────────────────────────────────────────
  // 4. SWIMMING POOL AND AMENITIES (3 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "amenities-overview",
    category: "Swimming pool and amenities",
    keywords: [
      "facilities",
      "hotel facilities",
      "amenities",
      "what amenities",
      "recreation",
      "hotel services",
      "explore amenities"
    ],
    answer:
      "Hotel Amil offers a comprehensive collection of recreation, dining, and convention facilities:\n\n" +
      "• The Azure Pool — Open-air freshwater swimming pool with shallow children's wading section (6:30 AM – 7:30 PM)\n" +
      "• Saffron Restaurant — 120-guest fine dining venue serving royal Chettinad & multi-cuisine\n" +
      "• 24-Hour Amil Cafe — Round-the-clock artisanal coffee & bakery bistro\n" +
      "• The Amil Lounge & Bar — Discreet spirits and cocktail sanctuary (11:00 AM – 11:00 PM)\n" +
      "• The Royal Amil Banquet Hall — Grand convention venue accommodating up to 500 guests\n" +
      "• Expansive Parking — 24/7 guarded space for 100+ vehicles with EV charging & valet",
    actionButton: "Explore All Facilities →",
    destination: "/amenities",
    priority: 70
  },
  {
    id: "swimming-pool",
    category: "Swimming pool and amenities",
    keywords: [
      "swimming pool",
      "pool",
      "azure pool",
      "swim",
      "pool timings",
      "kids pool",
      "pool rules",
      "dress code pool",
      "swimwear"
    ],
    answer:
      "The Azure Pool is our pristine freshwater swimming pool framed by tropical landscaping and sundecks.\n\n" +
      "• Timings: 6:30 AM – 7:30 PM Daily\n" +
      "• Children's Section: Dedicated shallow wading pool for children\n" +
      "• Swimwear Policy: Appropriate synthetic swimwear is strictly required; shower before entering\n" +
      "• Child Safety: Children under 14 must be supervised by an adult guardian at all times\n" +
      "• Concierge Contact: Ext. 100",
    actionButton: "View Azure Pool →",
    destination: "/amenities#swimming-pool",
    priority: 85
  },
  {
    id: "amil-bar",
    category: "Swimming pool and amenities",
    keywords: [
      "bar",
      "amil bar",
      "lounge",
      "cocktails",
      "alcohol",
      "liquor",
      "beer",
      "wine",
      "drinks",
      "whiskey",
      "single malt",
      "spirits"
    ],
    answer:
      "The Amil Lounge & Bar is a discreet, mood-lit sanctum showcasing aged single malts, classic cocktails, vintage wines, and artisanal tapas.\n\n" +
      "• Timings: 11:00 AM – 11:00 PM Daily\n" +
      "• Seating: 50 guests in plush leather booths and private corners\n" +
      "• Regulations: Guests must be 21 years of age or older with valid government photo ID\n" +
      "• Dress Code: Smart casual attire required\n" +
      "• Bar Concierge: Dial Ext. 205",
    actionButton: "View Amil Bar →",
    destination: "/amenities#amil-bar",
    priority: 85
  },

  // ─────────────────────────────────────────────────────────────
  // 5. PARKING AND INFRASTRUCTURE (2 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "parking-facility",
    category: "Parking and infrastructure",
    keywords: [
      "parking",
      "car parking",
      "bus parking",
      "valet",
      "valet parking",
      "parking space",
      "secure parking",
      "driver room",
      "chauffeur",
      "vehicle parking"
    ],
    answer:
      "Hotel Amil provides an expansive, 24/7 guarded private parking facility within our secured hotel perimeter:\n\n" +
      "• Capacity: Accommodates 100+ cars, luxury SUVs, and dedicated bays for multi-axle tourist coaches\n" +
      "• Complimentary Valet: Professional valet parking service at the front entrance portico\n" +
      "• Security: 24/7 CCTV surveillance, illuminated bays, and uniformed security personnel\n" +
      "• Chauffeur Amenities: Comfortable resting lounge and restrooms for drivers\n" +
      "• Cost: Complimentary for all hotel residents, restaurant diners, and banquet delegates",
    actionButton: "View Parking Details →",
    destination: "/amenities#parking-area",
    priority: 80
  },
  {
    id: "ev-charging-infrastructure",
    category: "Parking and infrastructure",
    keywords: [
      "ev charging",
      "electric vehicle",
      "charging station",
      "power backup",
      "generator",
      "dg set",
      "electricity backup"
    ],
    answer:
      "Hotel Amil offers dedicated Electric Vehicle (EV) charging stations inside our secure parking grounds. " +
      "Additionally, the entire property is supported by a 100% heavy-duty silent DG generator system, providing zero-downtime power backup for all guest rooms, elevators, dining outlets, and convention halls.",
    actionButton: "Explore Facilities →",
    destination: "/amenities#parking-area",
    priority: 80
  },

  // ─────────────────────────────────────────────────────────────
  // 6. EVENTS AND CELEBRATIONS (6 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "events-overview",
    category: "Events and celebrations",
    keywords: [
      "events",
      "banquet",
      "banquet hall",
      "convention hall",
      "functions",
      "hall capacity",
      "celebrations",
      "royal amil banquet"
    ],
    answer:
      "The Royal Amil Banquet & Convention Hall is Rajapalayam's most distinguished venue for memorable weddings, family milestones, and corporate seminars:\n\n" +
      "• Grand Capacity: Up to 500 guests (Theater style) / 300 guests (Banquet round tables)\n" +
      "• Venue Highlights: Soaring ceilings, crystal chandeliers, pillarless architecture, integrated concert-grade AV, motorized HD projection, and bridal dressing suite\n" +
      "• Event Categories: Weddings & Receptions, Corporate Meetings, Baby Showers (Seemantham), Candlelight Dinners, and Milestone Birthday Parties\n" +
      "• Reservations: Contact +91 78670 94947 or Info@hotelamil.com",
    actionButton: "Discover Event Spaces →",
    destination: "/events",
    priority: 70
  },
  {
    id: "events-wedding",
    category: "Events and celebrations",
    keywords: [
      "wedding",
      "marriage",
      "reception",
      "wedding hall",
      "marriage hall",
      "engagement",
      "kalyana mandapam",
      "kalyana sappadu",
      "wedding venue"
    ],
    answer:
      "Grand Weddings & Receptions at Hotel Amil:\n\n" +
      "• Capacities: 250 – 300 guests (Theater style) | 150 – 180 (Round table) | 400+ (Floating reception)\n" +
      "• Stage Setup: 24ft × 12ft elevated ceremonial stage with floral chandelier drapery\n" +
      "• Facilities: Air-conditioned bridal dressing suite with vanity, continuous central HVAC, acoustic sound system with wireless mics, and 100% DG power backup\n" +
      "• Catering: Authentic South Indian plantain leaf feast (Traditional Kalyana Sappadu), multi-cuisine buffet, and live interactive dessert/chaat counters\n" +
      "• Contact: Events Desk at +91 78670 94947 or Info@hotelamil.com",
    actionButton: "Explore Wedding Hall →",
    destination: "/events#wedding-section",
    priority: 85
  },
  {
    id: "events-corporate",
    category: "Events and celebrations",
    keywords: [
      "corporate",
      "conference",
      "meeting",
      "seminar",
      "boardroom",
      "bank meet",
      "dealer meet",
      "workshop",
      "corporate meeting",
      "business meeting"
    ],
    answer:
      "Conferences, Seminars & Corporate Meets at Hotel Amil:\n\n" +
      "• Layouts: 180 – 200 delegates (Theater presentation) | 80 – 100 (Classroom/Workshop) | 40 – 55 (U-Shape/Boardroom) | 100 – 120 (Cluster)\n" +
      "• Technical Equipment: Motorized high-lumen HD projector with widescreen, JBL audio system with podium and lapel mics, dedicated corporate Wi-Fi, and 100% DG power cutover guarantee\n" +
      "• Catering: Executive High Tea with Kumbakonam degree filter coffee, corporate luncheon buffet, and all-day refreshment station\n" +
      "• Contact: +91 78670 94947 or Info@hotelamil.com",
    actionButton: "Explore Corporate Hall →",
    destination: "/events#corporate-section",
    priority: 85
  },
  {
    id: "events-baby-shower",
    category: "Events and celebrations",
    keywords: [
      "baby shower",
      "seemantham",
      "valaikappu",
      "naming ceremony",
      "cradle ceremony"
    ],
    answer:
      "Traditional Seemantham, Valaikappu & Baby Showers at Hotel Amil:\n\n" +
      "• Capacities: 100 – 140 guests (Family cluster tables) | 150 – 180 (Ritual viewing theater) | 250 (Floating family flow)\n" +
      "• Atmosphere: Traditional garland backdrops, ceremonial swing, auspicious morning/evening muhurtham scheduling, and a private AC Mother's resting suite\n" +
      "• Catering: Authentic 5-Rice Valaikappu feast (Chithirannam: Lemon, Tamarind, Coconut, Curd, Sambar), traditional plantain leaf meals, and departing sweet boxes",
    actionButton: "Explore Baby Showers →",
    destination: "/events#baby-shower-section",
    priority: 85
  },
  {
    id: "events-parties",
    category: "Events and celebrations",
    keywords: [
      "birthday",
      "birthday party",
      "1st birthday",
      "milestone celebration",
      "anniversary party",
      "family party",
      "birthday celebration"
    ],
    answer:
      "Birthday Parties & Milestone Celebrations at Hotel Amil:\n\n" +
      "• Capacities: 80 – 150 guests (Seated banquet) | 200 (Floating party flow)\n" +
      "• Venue Features: Themed stage decor with illuminated marquee letters, balloon arches, open dance/game floor, and party audio system\n" +
      "• Catering: Kids-friendly menu (mini burgers, pasta, french fries, ice cream sundae bar), grand multi-cuisine dinner buffet, and custom themed birthday cakes",
    actionButton: "Explore Birthday Packages →",
    destination: "/events#birthday-section",
    priority: 85
  },
  {
    id: "events-candlelight",
    category: "Events and celebrations",
    keywords: [
      "candlelight",
      "candlelight dinner",
      "romantic dinner",
      "couple dinner",
      "anniversary dinner",
      "private dining for two",
      "proposal",
      "romantic evening"
    ],
    answer:
      "Private Candlelight Dinners for Two at Hotel Amil:\n\n" +
      "• Setting: Reserved intimate dining alcove at Saffron Restaurant styled with candlelight, fresh rose petals, and romantic acoustic melodies\n" +
      "• Hospitality: Dedicated private butler exclusively attending your table\n" +
      "• Dining: Chef's curated 4-course tasting menu featuring welcome mocktail, appetizers, signature mains, dessert duo, and custom celebration cake coordination",
    actionButton: "Explore Romantic Dining →",
    destination: "/events#couple-section",
    priority: 85
  },

  // ─────────────────────────────────────────────────────────────
  // 7. BOOKING INFORMATION (2 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "booking-direct-advantages",
    category: "Booking information",
    keywords: [
      "direct booking",
      "why book direct",
      "offers",
      "discounts",
      "free breakfast",
      "booking advantages",
      "best tariff",
      "best rate"
    ],
    answer:
      "Key Advantages of Booking Directly with Hotel Amil:\n\n" +
      "• Best Available Tariff — Guaranteed lowest rates with zero online travel agent commission or platform surcharges\n" +
      "• Complimentary CP Breakfast — Signature South Indian and continental breakfast buffet included with every direct stay\n" +
      "• Priority Early Check-in — Enjoy priority early check-in privilege subject to room availability upon arrival\n" +
      "• Direct Concierge Communication — Seamless personal assistance for custom stay arrangements and dining preferences",
    actionButton: "Open Reservation Form →",
    destination: "/booking",
    priority: 80
  },
  {
    id: "booking-process",
    category: "Booking information",
    keywords: [
      "how to book",
      "book a room",
      "make a reservation",
      "reservation",
      "book stay",
      "room booking",
      "reserve room",
      "booking enquiry"
    ],
    answer:
      "To reserve a room or suite at Hotel Amil:\n\n" +
      "1. Online: Submit your preferred check-in dates, room category, and guest details through our online booking enquiry form at /booking.\n" +
      "2. Telephone: Call our 24-hour reception directly at +91 4563 233600 or +91 78670 94947 for immediate vocal booking confirmation.\n" +
      "3. WhatsApp: Message our front desk concierge directly at wa.me/917867094947.\n\n" +
      "Our reservations desk promptly verifies room availability and assists you with confirmation.",
    actionButton: "Open Reservation Form →",
    destination: "/booking",
    priority: 85
  },

  // ─────────────────────────────────────────────────────────────
  // 8. HOTEL POLICIES (4 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "policy-checkin-checkout",
    category: "Hotel policies",
    keywords: [
      "check in",
      "check out",
      "checkin",
      "checkout",
      "check-in time",
      "check-out time",
      "early check in",
      "late check out",
      "id proof",
      "id card",
      "aadhaar",
      "passport",
      "identification"
    ],
    answer:
      "Check-in, Check-out & Identification Policies:\n\n" +
      "• Check-in Time: 12:00 PM\n" +
      "• Check-out Time: 11:00 AM\n" +
      "• Early Check-in & Late Check-out: Subject to room availability; direct bookings receive priority consideration (supplemental charges may apply for extended timings)\n" +
      "• Mandatory Photo ID: A valid government-issued photographic ID (Aadhaar, Passport, or Driving License) is mandatory for all adult guests upon arrival. Foreign nationals must present a valid passport and Indian visa / OCI card.",
    actionButton: "View Hotel Policies →",
    destination: "/policy",
    priority: 90
  },
  {
    id: "policy-cancellation",
    category: "Hotel policies",
    keywords: [
      "cancellation",
      "cancellation policy",
      "cancel booking",
      "refund",
      "refund policy",
      "modify booking",
      "cancellation charges"
    ],
    answer:
      "Hotel Amil Cancellation Policy:\n\n" +
      "• Flexible Cancellation: Cancellations confirmed 48 hours or more prior to 12:00 PM on the arrival date incur zero retention fee.\n" +
      "• Within 48 Hours / No-Show: Cancellations made within 48 hours of arrival, or no-shows, will be charged the full tariff for the first night.\n" +
      "• Peak Festive Dates: Major festive dates (Diwali, Pongal, Andal Temple Brahmotsavam) may enforce non-refundable terms.",
    actionButton: "View Cancellation Terms →",
    destination: "/policy",
    priority: 90
  },
  {
    id: "policy-pets",
    category: "Hotel policies",
    keywords: [
      "pets",
      "pet policy",
      "dog",
      "dogs",
      "cat",
      "cats",
      "animal",
      "pet friendly",
      "are pets allowed",
      "allow pets"
    ],
    answer:
      "In consideration of all hotel residents' quiet comfort and hygiene, pets are strictly not permitted across all guest rooms, suites, and public dining venues at Hotel Amil.\n\n" +
      "Certified service animals for guests with special accessibility needs may be accommodated with prior concierge approval.",
    actionButton: "View Hotel Policies →",
    destination: "/policy",
    priority: 90
  },
  {
    id: "policy-visitors-liquor",
    category: "Hotel policies",
    keywords: [
      "visitor policy",
      "visitors",
      "guests policy",
      "outside guests",
      "drinking policy",
      "liquor policy",
      "alcohol policy",
      "liquor guidelines"
    ],
    answer:
      "Visitor & Liquor Guidelines at Hotel Amil:\n\n" +
      "• Visitor Regulations: Day visitors are welcome in the lobby and public dining venues up to 9:00 PM. Non-registered visitors are not permitted in guest rooms after 9:00 PM for guest safety and privacy. Overnight guests must be formally registered with valid photo ID.\n" +
      "• Liquor Guidelines: Alcohol consumption is permitted only within private suites or inside our licensed Amil Bar. Consumption in public hotel spaces, pool deck, or lobby areas is prohibited under local excise regulations. Minimum legal drinking age is 21 years.",
    actionButton: "View Hotel Policies →",
    destination: "/policy",
    priority: 85
  },
  {
    id: "grievance-redressal",
    category: "Hotel policies",
    keywords: [
      "grievance",
      "grievances",
      "grievance redressal",
      "how do i file a complaint",
      "i want to raise a complaint",
      "who can i contact for a grievance",
      "i have an unresolved service issue",
      "how can i report a problem",
      "guest complaint procedure",
      "complaint",
      "complaints",
      "file a complaint",
      "file complaint",
      "raise a complaint",
      "raise complaint",
      "lodge a complaint",
      "lodge complaint",
      "report a problem",
      "unresolved service issue",
      "unresolved service concern",
      "unresolved issue",
      "service complaint",
      "formal grievance",
      "formal complaint",
      "service concern",
      "service concerns",
      "service feedback",
      "escalation",
      "dispute",
      "grievance contact",
      "grievance phone",
      "grievance number"
    ],
    answer:
      `Hotel Amil is committed to addressing guest concerns and service feedback respectfully. For unresolved service concerns or formal grievances, you can contact our Grievance Redressal line at ${hotelData.grievance} or email ${hotelData.email}. For routine enquiries and general stay assistance, please contact our 24-hour reception at ${hotelData.phone}.`,
    actionButton: "View Grievance Policy →",
    destination: "/policy#grievance-redressal",
    priority: 95
  },

  // ─────────────────────────────────────────────────────────────
  // 9. LOCATION AND CONTACT (3 entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "location-address",
    category: "Location and contact",
    keywords: [
      "address",
      "where is hotel amil",
      "where are you located",
      "where are you",
      "hotel address",
      "hotel location",
      "location of hotel amil",
      "how do i reach",
      "how to reach",
      "pincode",
      "directions",
      "landmark",
      "near new bus stand",
      "rajapalayam address"
    ],
    answer:
      "Hotel Amil Location & Address:\n\n" +
      "120/4, Tenkasi Main Road, Near New Bus Stand, Rajapalayam, Tamil Nadu 626117, India.\n\n" +
      "Hotel Amil is prominently situated on Tenkasi Main Road near the New Bus Stand, offering swift access for travelers from Madurai, Srivilliputhur, Tenkasi, and Courtallam.",
    actionButton: "View Location & Map →",
    destination: "/contact",
    priority: 90
  },
  {
    id: "contact-details",
    category: "Location and contact",
    keywords: [
      "contact",
      "phone number",
      "telephone",
      "mobile",
      "email",
      "official email",
      "email address",
      "enquiry email",
      "mail id",
      "how to email",
      "send email",
      "front desk phone",
      "reception phone",
      "call hotel",
      "how to contact",
      "contact details",
      "enquiry",
      "inquiries"
    ],
    answer:
      "Direct Contact Details for Hotel Amil:\n\n" +
      "• Front Desk Landline: +91 4563 233600\n" +
      "• Mobile / Concierge Desk: +91 78670 94947\n" +
      "• Grievance Redressal: +91-8111007108\n" +
      "• Official Email: Info@hotelamil.com\n" +
      "• Reception & Concierge: Open 24 Hours, 7 Days a Week",
    actionButton: "Contact Concierge Desk →",
    destination: "/contact",
    priority: 90
  },
  {
    id: "official-email",
    category: "Location and contact",
    keywords: [
      "email",
      "email address",
      "official email",
      "mail id",
      "hotel email",
      "enquiry email",
      "how to email",
      "send email",
      "email hotel",
      "write email",
      "mail hotel"
    ],
    answer:
      "Hotel Amil's official email address is Info@hotelamil.com. You can write to us directly for room reservations, corporate events, dining inquiries, or general guest assistance.",
    actionButton: "View Contact Details →",
    destination: "/contact",
    priority: 95
  },
  {
    id: "whatsapp-concierge",
    category: "Location and contact",
    keywords: [
      "whatsapp",
      "chat on whatsapp",
      "whatsapp number",
      "text hotel",
      "message hotel",
      "whatsapp concierge",
      "whatsapp support"
    ],
    answer:
      "You can chat directly with the Hotel Amil Front Desk Concierge on WhatsApp at +91 78670 94947 for immediate assistance with room reservations, dining queries, or driving directions.",
    actionButton: "Contact Concierge Desk →",
    destination: "/contact",
    priority: 85
  }
];

/**
 * Helper to retrieve a single knowledge entry by unique id
 * @param {string} id
 * @returns {object|undefined}
 */
export const getKnowledgeEntryById = (id) => {
  return VIRTUAL_ASSISTANCE_KNOWLEDGE.find((entry) => entry.id === id);
};

/**
 * Helper to retrieve all knowledge entries belonging to a category
 * @param {string} category
 * @returns {Array<object>}
 */
export const getKnowledgeByCategory = (category) => {
  return VIRTUAL_ASSISTANCE_KNOWLEDGE.filter((entry) => entry.category === category);
};
