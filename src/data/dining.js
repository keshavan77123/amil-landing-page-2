export const saffronRestaurantData = {
  id: "saffron-restaurant",
  name: "Saffron Restaurant",
  tagline: "Fine Dining & Authentic Royal Cuisine",
  eyebrow: "PREMIER GASTRONOMY AT HOTEL AMIL",
  description: "Saffron Restaurant is the culinary crown of Hotel Amil, offering an authentic gastronomic journey through the royal heritage of Tamil Nadu, fragrant Chettinad spice traditions, succulent North Indian tandoori grills, and refined continental selections. Handcrafted by seasoned master chefs using fresh, locally sourced native ingredients.",
  ambience: "Warm teak wood accents, soft ambient brass lighting, acoustic tranquility, and private family dining alcoves.",
  seatingCapacity: "120 Guests",
  timings: [
    { meal: "CP Complimentary Breakfast Buffet", time: "7:00 AM – 10:30 AM", notes: "Lavish spread of traditional South Indian tiffins, fresh filter kaapi, juices, and continental choices." },
    { meal: "Royal Lunch", time: "12:30 PM – 3:30 PM", notes: "A la carte specialities, Virudhunagar Biryani, and traditional multi-course Tamil thalis." },
    { meal: "Gourmet Dinner", time: "7:00 PM – 11:00 PM", notes: "Candlelit dining featuring Chettinad curries, fresh tandoor breads, kebabs, and desserts." }
  ],
  contact: {
    roomExtension: "Ext. 201",
    directPhone: "+91 4563 233600",
    reservations: "Info@hotelamil.com"
  },
  images: [
    "/images/Dining/Restaurent_8k.png",
    "/images/Dining/Restaurent2_8k.png",
    "/images/Restaurent/chicken fings.jpeg",
    "/images/Restaurent/chicken Tandoori.jpeg"
  ],
  signatureDishes: [
    // --- 16 FEATURED INITIAL DISHES ---
    // Breakfast (3)
    {
      id: "amils-breakfast",
      name: "Amil's Breakfast",
      category: "Breakfast",
      isVeg: true,
      description: "A wholesome South Indian breakfast with fresh juice, idly, dosa, vada, pongal, poori bhaji, and tea or coffee.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/amils-breakfast.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "ghee-pongal",
      name: "Ghee Pongal",
      category: "Breakfast",
      isVeg: true,
      description: "A classic South Indian dish made with rice and moong dal, finished with ghee and mild spices.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/ghee-pongal.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "masala-dosa",
      name: "Masala Dosa",
      category: "Breakfast",
      isVeg: true,
      description: "Crispy golden dosa served with a flavourful spiced potato filling, with chutney and sambar.",
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/masala-dosa.svg",
      isVerified: false,
      status: "Proposed"
    },
    // Soups (2)
    {
      id: "veg-manchow-soup",
      name: "Veg Manchow Soup",
      category: "Soups",
      isVeg: true,
      description: "A flavourful Indo-Chinese style soup with fresh vegetables.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/veg-manchow-soup.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "chicken-manchow-soup",
      name: "Chicken Manchow Soup",
      category: "Soups",
      isVeg: false,
      description: "A rich and hearty Indo-Chinese style chicken soup.",
      image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/chicken-manchow-soup.svg",
      isVerified: false,
      status: "Proposed"
    },
    // Starters (3)
    {
      id: "paneer-tikka-angara",
      name: "Paneer Tikka Angara",
      category: "Starters",
      isVeg: true,
      description: "Farm-fresh cottage cheese cubes infused with smoked Kashmiri chili, Greek yogurt, and ajwain roasted in clay tandoor.",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/paneer-tikka-angara.svg",
      isVerified: true,
      status: "Verified (Hotel Amil Menu)"
    },
    {
      id: "gobi-65",
      name: "Gobi 65",
      category: "Starters",
      isVeg: true,
      description: "Crispy cauliflower tossed in South Indian spices.",
      image: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/gobi-65.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "chicken-spring-roll",
      name: "Chicken Spring Roll",
      category: "Starters",
      isVeg: false,
      description: "Crispy rolls filled with seasoned chicken, served with a tangy dip.",
      image: "/images/Restaurent/chicken Tandoori.jpeg",
      fallbackImage: "/images/Dining/dishes/chicken-spring-roll.svg",
      isVerified: false,
      status: "Proposed"
    },
    // Biryani (2)
    {
      id: "mutton-biryani",
      name: "Virudhunagar Golden Mutton Biryani",
      category: "Biryani",
      isVeg: false,
      description: "Aromatic Seeraga Samba rice cooked with tender mutton and traditional spices.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/mutton-biryani.svg",
      isVerified: true,
      status: "Verified (Hotel Amil Menu)"
    },
    {
      id: "chicken-biryani",
      name: "Chicken Biryani",
      category: "Biryani",
      isVeg: false,
      description: "Fragrant rice cooked with succulent chicken and a blend of spices.",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/chicken-biryani.svg",
      isVerified: false,
      status: "Proposed"
    },
    // Main Course (3)
    {
      id: "chettinad-chicken",
      name: "Saffron Royal Chettinad Chicken",
      category: "Main Course",
      isVeg: false,
      description: "Country chicken simmered in freshly stone-ground black pepper, shallots, kalpasi stone flower, and curry leaves.",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/chettinad-chicken.svg",
      isVerified: true,
      status: "Verified (Hotel Amil Menu)"
    },
    {
      id: "meen-pollichathu",
      name: "Meen Pollichathu",
      category: "Main Course",
      isVeg: false,
      description: "Marinated fish wrapped in banana leaf and griddled to perfection.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/meen-pollichathu.svg",
      isVerified: true,
      status: "Verified (Hotel Amil Menu)"
    },
    {
      id: "paneer-butter-masala",
      name: "Paneer Butter Masala",
      category: "Main Course",
      isVeg: true,
      description: "Soft paneer cubes cooked in a rich and flavourful tomato gravy.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/paneer-butter-masala.svg",
      isVerified: false,
      status: "Proposed"
    },
    // Desserts (2)
    {
      id: "tirunelveli-halwa",
      name: "Tirunelveli Ghee Halwa",
      category: "Desserts",
      isVeg: true,
      description: "Authentic slow-cooked wheat halwa drenched in fragrant cow's ghee and roasted cashews.",
      image: "https://images.unsplash.com/photo-1605197584547-c93e1160313c?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/tirunelveli-halwa.svg",
      isVerified: false,
      status: "Proposed (Requiring Confirmation)"
    },
    {
      id: "gulab-jamun",
      name: "Gulab Jamun",
      category: "Desserts",
      isVeg: true,
      description: "Soft, juicy dumplings soaked in aromatic sugar syrup.",
      image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/gulab-jamun.svg",
      isVerified: false,
      status: "Proposed"
    },
    // Snacks (1)
    {
      id: "veg-spring-roll",
      name: "Veg Spring Roll",
      category: "Snacks",
      isVeg: true,
      description: "Crispy rolls filled with fresh vegetables, served with a tangy dip.",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/veg-spring-roll.svg",
      isVerified: false,
      status: "Proposed"
    },

    // --- ADDITIONAL DISHES (REVEALED BY VIEW MORE DISHES) ---
    {
      id: "butter-chicken",
      name: "Butter Chicken",
      category: "Main Course",
      isVeg: false,
      description: "Tender chicken simmered in a rich and creamy tomato gravy.",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/butter-chicken.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "butter-naan",
      name: "Butter Naan",
      category: "Main Course",
      isVeg: true,
      description: "Soft and fluffy naan baked to perfection in a traditional tandoor.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/butter-naan.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "veg-thali",
      name: "Royal Rajapalayam Veg Thali",
      category: "Main Course",
      isVeg: true,
      description: "Grand traditional silver service featuring 11 authentic dishes, sambar, rasam, kootu, poriyal, dessert, and vadai.",
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/veg-thali.svg",
      isVerified: true,
      status: "Verified (Hotel Amil Menu)"
    },
    {
      id: "filter-kaapi",
      name: "Traditional Kumbakonam Degree Filter Kaapi",
      category: "Beverages",
      isVeg: true,
      description: "Authentic double-drip chicory blend served frothing hot in traditional brass dabarah and tumbler.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/filter-kaapi.svg",
      isVerified: true,
      status: "Verified (Hotel Amil Menu)"
    },
    {
      id: "ice-cream",
      name: "Ice Cream",
      category: "Desserts",
      isVeg: true,
      description: "A delightful selection of creamy ice cream flavours.",
      image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/ice-cream.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "medhu-vadai",
      name: "Crispy Medhu Vadai",
      category: "Snacks",
      isVeg: true,
      description: "Golden crispy lentil fritters infused with whole black pepper, ginger, and curry leaves.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/medhu-vadai.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "mutton-sukka",
      name: "Mutton Sukka Varuval",
      category: "Starters",
      isVeg: false,
      description: "Tender chunks of mutton slow-roasted with shallots, crushed peppercorns, and fresh coconut slices.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/mutton-sukka.svg",
      isVerified: false,
      status: "Proposed"
    },
    {
      id: "sweet-corn-soup",
      name: "Sweet Corn Veg Soup",
      category: "Soups",
      isVeg: true,
      description: "A soothing and creamy Indo-Chinese soup loaded with crushed golden sweet corn and garden vegetables.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
      fallbackImage: "/images/Dining/dishes/sweet-corn-soup.svg",
      isVerified: false,
      status: "Proposed"
    }
  ],
  features: [
    "Complimentary CP Breakfast Buffet for Hotel Residents",
    "Dedicated Pure Vegetarian & Jain Preparations",
    "Private Family Dining Alcoves",
    "Round-the-Clock In-Room Dining Service",
    "Special Kids & Senior Friendly Menus",
    "Chauffeur & Takeaway Pack Service for Travelers"
  ]
};

export const cafeData = {
  id: "amil-cafe",
  name: "24-Hour Amil Cafe",
  tagline: "Artisanal Brews, Fresh Bakes & Midnight Comfort",
  eyebrow: "OPEN 24 HOURS, 7 DAYS A WEEK",
  description: "Whether you arrive in the quiet hours of midnight or desire a rejuvenating dawn espresso before visiting the local temples, the 24-Hour Amil Cafe stands ready. Savor freshly brewed South Indian filter coffee, Italian espresso roasts, light gourmet sandwiches, and traditional evening snacks in an intimate, relaxing lounge setting.",
  image: "/images/Dining/cafe.png",
  timings: "Open 24 Hours Daily",
  contact: "Ext. 202",
  features: [
    "24/7 Continuous Service",
    "Specialty Filter Coffee & Espresso",
    "Fresh Artisanal Croissants & Pastries",
    "Midnight Savory Platters & Light Bites"
  ]
};
