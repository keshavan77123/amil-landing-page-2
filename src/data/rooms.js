// Helper to generate the 36-frame spin sequence path array
const generateSpinSequence = (roomId) => {
  return Array.from({ length: 36 }, (_, i) => `/images/rooms/${roomId}/${roomId}-${i + 1}.svg`);
};

export const roomsData = [
  {
    id: "executive",
    name: "Executive Room",
    category: "Executive",
    tagline: "Tailored elegance for the discerning business traveler and couples.",
    shortDescription: "A serene haven featuring refined walnut finishes, plush king bedding, and an ergonomic workspace.",
    description: "Our Executive Rooms are thoughtfully designed to provide an atmosphere of quiet luxury and supreme calm. Accented with bespoke wood finishes, warm ambient lighting, and rich hand-woven fabrics, each room offers a plush king-sized bed, high-speed fiber internet, and a dedicated executive workstation overlooking the lush Western Ghats foothills.",
    size: "340 sq. ft. / 32 sq. m",
    bedType: "1 Plush King Bed",
    view: "City & Garden View",
    floor: "Floors 2 & 3",
    maxOccupancy: 3,
    startingPrice: 3800,
    singlePrice: 3800,
    doublePrice: 4400,
    extraPersonPrice: 900,
    available: true,
    images: [
      "/images/rooms/executive/ExecutiveRoom_8K.png",
      "/images/rooms/executive/ExecutiveRoom4_8k.png",
      "/images/rooms/executive/Executive3_8k.jpeg",
      "/images/rooms/executive/Amenities_8k.png",
      "/images/rooms/executive/ExecutiveRoom2_8k.png"
    ],
    panorama: "/images/Virtual%20Tour/ExecutiveRoom360_8k.png",
    spinImages: generateSpinSequence("executive"),
    amenities: [
      "Plush King-Size Mattress",
      "Individual Climate Control AC",
      "Complimentary High-Speed Wi-Fi",
      "43-inch Ultra HD Smart TV",
      "Italian Marble Ensuite Bathroom",
      "24-Hour Hot & Cold Water",
      "Ergonomic Executive Desk & Chair",
      "Gourmet Tea & Coffee Station",
      "Electronic In-Room Safe",
      "Round-the-Clock In-Room Dining",
      "Daily Housekeeping & Turndown",
      "Premium Cotton Bathrobes & Linens"
    ]
  },
  {
    id: "twin-executive",
    name: "Twin Executive Room",
    category: "Twin Executive",
    tagline: "Sophisticated twin accommodation with generous space and dual comfort.",
    shortDescription: "Spacious layout fitted with twin orthopaedic beds, acoustic soundproofing, and refined amenities.",
    description: "Perfect for colleagues, conference attendees, or companions traveling together, the Twin Executive Room combines expansive roominess with private individual comfort. Featuring two distinct custom single beds with premium pocket-spring mattresses, acoustic glazing to ensure undisturbed rest, and a private conversational seating corner.",
    size: "360 sq. ft. / 34 sq. m",
    bedType: "2 Individual Twin Beds",
    view: "Courtyard & Mountain View",
    floor: "Floors 2 & 3",
    maxOccupancy: 3,
    startingPrice: 4200,
    singlePrice: 4200,
    doublePrice: 4800,
    extraPersonPrice: 900,
    available: true,
    images: [
      "/images/rooms/twin-executive/TwinBed_8k.png",
      "/images/rooms/twin-executive/TwinExecutive3_8k.jpeg",
      "/images/rooms/twin-executive/TwinExecutiveAmenities-8k.jpeg",
      "/images/rooms/twin-executive/TwinExecutive4_8k.jpeg"
    ],
    spinImages: generateSpinSequence("twin-executive"),
    amenities: [
      "Twin Custom Pocket-Spring Beds",
      "Independent AC Temperature Control",
      "Complimentary High-Speed Wi-Fi",
      "43-inch Ultra HD Smart TV",
      "Spacious Walk-in Rain Shower",
      "24-Hour Hot & Cold Water",
      "Twin Bedside Power & USB Outlets",
      "Tea & Artisan Coffee Maker",
      "Digital Safe Box",
      "Acoustic Soundproof Windows",
      "24-Hour In-Room Dining Service",
      "Complimentary Bottled Mineral Water"
    ]
  },
  {
    id: "deluxe",
    name: "Deluxe Suite",
    category: "Deluxe",
    tagline: "Elevated residential luxury with panoramic views and expanded living.",
    shortDescription: "An expansive suite elevated by a separate seating parlor, private balcony, and deep soaking tub.",
    description: "The Deluxe Suite at Hotel Amil is an expression of generous spatial harmony and refined craftsmanship. Featuring a distinct living lounge separate from the primary master bedroom, a private balcony that opens to sweeping views of the Rajapalayam hills, and an opulent marble bathroom with a deep soaking tub and rain shower.",
    size: "480 sq. ft. / 45 sq. m",
    bedType: "1 Master California King Bed",
    view: "Panoramic Western Ghats View",
    floor: "Floor 4 (Penthouse Level)",
    maxOccupancy: 4,
    startingPrice: 5600,
    singlePrice: 5600,
    doublePrice: 6200,
    extraPersonPrice: 1100,
    available: true,
    images: [
      "/images/rooms/deluxe/Delux3_8k.jpeg",
      "/images/rooms/deluxe/Delux_8k.png",
      "/images/rooms/deluxe/Delux2_8k.png",
      "/images/rooms/deluxe/deluxe3.jpeg"
    ],
    panorama: "/images/Virtual%20Tour/Delux360_8k.png",
    spinImages: generateSpinSequence("deluxe"),
    amenities: [
      "California King Master Bed",
      "Separate Living Lounge & Sofa Suite",
      "Private Scenic Balcony with Seating",
      "High-Speed Fiber Wi-Fi",
      "55-inch Ultra HD Smart LED TV",
      "Deep Soaking Tub & Rain Shower",
      "Complimentary Nespresso Coffee Machine",
      "Minibar with Curated Refreshments",
      "Walk-in Wardrobe & Dressing Area",
      "Personal Electronic Safe",
      "Express Laundry & Pressing Service",
      "Priority Concierge & In-Room Dining"
    ]
  },
  {
    id: "family",
    name: "Grand Family Suite",
    category: "Family",
    tagline: "Gracious multi-room luxury designed for family vacations and gatherings.",
    shortDescription: "Two interconnected bedrooms, ample dining space, and bespoke comforts for the entire family.",
    description: "Designed for families seeking uncompromising quality and togetherness, our Grand Family Suite provides interconnected spacious bedrooms, two independent bathrooms, and a welcoming central lounge and dining alcove. It ensures complete privacy for parents alongside comfort and security for children or elders.",
    size: "650 sq. ft. / 60 sq. m",
    bedType: "1 Master King + 2 Queen Beds",
    view: "Dual Panoramic Scenic Views",
    floor: "Floors 3 & 4",
    maxOccupancy: 6,
    startingPrice: 7500,
    singlePrice: 7500,
    doublePrice: 8200,
    extraPersonPrice: 1200,
    available: true,
    images: [
      "/images/rooms/family/FamilyRoom-8k.png",
      "/images/rooms/family/FamilyRoom3_8k.jpeg",
      "/images/rooms/family/FamilyRoom2_8k.jpeg",
      "/images/rooms/family/FamilyAmenities_8k.png"
    ],
    panorama: "/images/Virtual%20Tour/FamilyRoom360_8k.png",
    spinImages: generateSpinSequence("family"),
    amenities: [
      "Two Interconnected Luxury Bedrooms",
      "Two Full Bathrooms with Rain Showers",
      "Central Dining Table & Living Salon",
      "Two 50-inch Ultra HD Smart TVs",
      "High-Speed Fiber Wi-Fi for All Devices",
      "Pantry with Microwave & Mini Fridge",
      "Baby Cot & Extra Bedding on Request",
      "Artisan Tea & Coffee Bar",
      "Two In-Room Digital Safes",
      "Complimentary Welcome Fruit Basket",
      "Dedicated Family Concierge Assistant",
      "24-Hour Express In-Room Dining"
    ]
  }
];

export const getRoomById = (id) => {
  return roomsData.find((room) => room.id === id) || roomsData[0];
};
