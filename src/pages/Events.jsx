import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Calendar, Users, Phone, Mail, User, Clock,
  Utensils, Sparkles, ShieldCheck, Volume2, Tv, Wind, Zap,
  Car, Heart, Briefcase, Baby, Gift, Building2, Check,
  MessageSquare, Cake, ChevronDown
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { Button } from '../components/ui/Button';
import { hotelData } from '../data/hotel';
import EventsHero from '../components/events/EventsHero';
import EventGallery from '../components/events/EventGallery';
import EventBookingModal from '../components/events/EventBookingModal';
import EventLightbox from '../components/events/EventLightbox';

// ─────────────────────────────────────────────────────────────
// ELEGANT ICONS & ORNAMENTS FOR REFINED EVENTS INTRODUCTION
// ─────────────────────────────────────────────────────────────
const WeddingRingsIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="8.5" cy="13.5" r="5" />
    <circle cx="15.5" cy="11.5" r="5" />
    <path d="M14.5 6.5l1-1.8 1.8 0.8-0.8 1.8" strokeWidth="1.4" />
  </svg>
);

const LuxuryFlourish = ({ className = 'w-16 h-4 text-muted-gold' }) => (
  <svg
    viewBox="0 0 84 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M42 2C39 6.5 32 9.5 21 9.5C13 9.5 6 7 0 9.5C6 12 13 9.5 21 9.5C32 9.5 39 12.5 42 17C45 12.5 52 9.5 63 9.5C71 9.5 78 12 84 9.5C78 7 71 9.5 63 9.5C52 9.5 45 6.5 42 2Z"
      fill="currentColor"
    />
    <circle cx="42" cy="9.5" r="2.2" fill="currentColor" />
  </svg>
);

const QUICK_CATEGORIES = [
  {
    name: 'Wedding Celebrations',
    target: '#wedding-section',
    icon: WeddingRingsIcon
  },
  {
    name: 'Corporate Meetings',
    target: '#corporate-section',
    icon: Briefcase
  },
  {
    name: 'Birthday Parties',
    target: '#birthday-section',
    icon: Cake
  },
  {
    name: 'Family Gatherings',
    target: '#baby-shower-section',
    icon: Users
  }
];

// ─────────────────────────────────────────────────────────────
// 5 EVENT CATEGORIES — EXACTLY 5 VERIFIED IMAGES EACH
// (Zero hallucinated images: 100% verified local assets)
// ─────────────────────────────────────────────────────────────
const EVENT_CATEGORIES_DATA = [
  {
    id: 'wedding-section',
    aliasId: null,
    number: '01',
    categoryName: 'Wedding & Reception',
    icon: Heart,
    tagline: 'CELEBRATE THE BEGINNING OF FOREVER',
    headline: 'Grand Wedding & Reception Banquets',
    description:
      'Discover an elegant setting for wedding receptions, engagements, and auspicious family ceremonies in Rajapalayam. Our grand banquet hall features high ceilings, ambient lighting, an elevated ceremonial stage, and authentic South Indian feast hospitality.',
    capacities: [
      { label: 'Theater Style', value: '250 – 300 Guests' },
      { label: 'Cluster / Round Table', value: '150 – 180 Guests' },
      { label: 'Floating Reception', value: '400+ Guests' },
      { label: 'Stage Dimensions', value: '24ft × 12ft Elevated' }
    ],
    technicalSpecs: [
      { icon: Wind, label: 'Central Air Conditioning', desc: 'Continuous high-capacity HVAC' },
      { icon: Zap, label: '100% Generator Backup', desc: 'Heavy-duty silent DG set' },
      { icon: Building2, label: 'Bridal / Green Room', desc: 'Air-conditioned suite with vanity' },
      { icon: Volume2, label: 'Acoustic Sound System', desc: 'Cordless handheld & lapel mics' }
    ],
    cateringOptions: [
      'Authentic South Indian plantain leaf feast (Traditional Kalyana Sappadu)',
      'Grand Multi-Cuisine Buffet (North Indian, South Indian, Tandoori & Chinese)',
      'Live interactive counters: Dosa varieties, Chaat, and artisanal dessert stations'
    ],
    gallery: [
      {
        src: '/images/events/Weeding/BanquetHall3_8k.png',
        alt: 'Grand wedding reception hall setup with floral chandeliers at Hotel Amil',
        caption: 'Grand Wedding Reception Banquet Hall with Floral Chandeliers & Linen Drapery',
        category: 'Wedding & Reception'
      },
      {
        src: '/images/amenities/banquetHall-8k.png',
        alt: 'Full auditorium view of Hotel Amil grand banquet hall',
        caption: 'Full Banquet Hall View with Audio-Visual Stage Setup',
        category: 'Wedding & Reception'
      },
      {
        src: '/images/events/Weeding/EventsFunction_8k.png',
        alt: 'Saffron grand dining hall for traditional wedding feast',
        caption: 'Saffron Grand Dining Hall for Traditional Kalyana Sappadu Feasts',
        category: 'Wedding & Reception'
      },
      {
        src: '/images/events/Weeding/EventReception_8k.png',
        alt: 'Hotel Amil grand entrance portico for wedding processions and guest welcoming',
        caption: 'Hotel Amil Grand Entrance Portico for Wedding Baraat & Processions',
        category: 'Wedding & Reception'
      },
      {
        src: '/images/events/Weeding/BanquetHall2_8k.png',
        alt: 'Expansive parking facility for wedding guest convoys and tourist coaches',
        caption: 'Expansive 60+ Guest Vehicle & Bus Parking Facility with Valet Service',
        category: 'Wedding & Reception'
      }
    ],
    ctaButton: 'Book Wedding Venue',
    themeBg: 'bg-ivory'
  },
  {
    id: 'corporate-section',
    aliasId: null,
    number: '02',
    categoryName: 'Corporate & Bank Meetings',
    icon: Briefcase,
    tagline: 'WHERE BUSINESS MEETS HOSPITALITY',
    headline: 'Conferences, Seminars & Bank Meets',
    description:
      'The trusted corporate venue in Virudhunagar district for banking annual reviews, dealer meets, medical symposiums, and executive workshops. Equipped with high-definition projection, wireless audio, and refined executive dining.',
    capacities: [
      { label: 'Theater Presentation', value: '180 – 200 Delegates' },
      { label: 'Classroom / Workshop', value: '80 – 100 Delegates' },
      { label: 'U-Shape / Boardroom', value: '40 – 55 Delegates' },
      { label: 'Cluster Discussion', value: '100 – 120 Delegates' }
    ],
    technicalSpecs: [
      { icon: Tv, label: 'Motorized HD Projection', desc: 'High-lumen projector & widescreen' },
      { icon: Volume2, label: 'JBL Sound & Microphones', desc: 'Podium mic, collar & wireless mics' },
      { icon: Zap, label: 'Uninterrupted DG Power', desc: 'Zero downtime cutover guarantee' },
      { icon: Sparkles, label: 'High-Speed Wi-Fi', desc: 'Dedicated corporate bandwidth' }
    ],
    cateringOptions: [
      'Executive High Tea: Fresh Kumbakonam degree filter coffee, tea, and warm savories',
      'Corporate Luncheon Buffet: Well-balanced vegetarian & non-vegetarian menus',
      'All-day mineral water station, refreshment mints, and break refreshments'
    ],
    gallery: [
      {
        src: '/images/events/corporate meeting/CorporateMeeting_8k.png',
        alt: 'Hotel Amil conference hall arranged with round discussion tables and presentation stage',
        caption: 'Conference Setup with Discussion Round Tables & Stage at Hotel Amil',
        category: 'Corporate & Bank Meetings'
      },
      {
        src: '/images/events/corporate meeting/CorporateMeeting2_8k.png',
        alt: 'Executive boardroom and business meeting presentation setup',
        caption: 'Executive Boardroom & Business Presentation Arrangement',
        category: 'Corporate & Bank Meetings'
      },
      {
        src: '/images/amenities/banquetHall-8k.png',
        alt: 'Seminar row seating with projection screen at Hotel Amil banquet hall',
        caption: 'Auditorium Seminar Seating with HD Projection Screen',
        category: 'Corporate & Bank Meetings'
      },
      {
        src: '/images/events/corporate meeting/CorporateMeeting3_8k.png',
        alt: 'Hotel Amil executive reception foyer and corporate delegate registration desk',
        caption: 'Executive Reception Foyer & Delegate Registration Desk',
        category: 'Corporate & Bank Meetings'
      },
      {
        src: '/images/events/corporate meeting/CorporateMeeting4_8k.png',
        alt: '24-Hour Amil Cafe for executive coffee breaks and refreshment pauses',
        caption: '24-Hour Amil Cafe for Executive High Tea & Business Breakout Sessions',
        category: 'Corporate & Bank Meetings'
      }
    ],
    ctaButton: 'Book Corporate Hall',
    themeBg: 'bg-warm-white'
  },
  {
    id: 'baby-shower-section',
    aliasId: null,
    number: '03',
    categoryName: 'Baby Shower',
    icon: Baby,
    tagline: 'WELCOMING A LITTLE MIRACLE',
    headline: 'Traditional Seemantham & Baby Showers',
    description:
      'Cherish auspicious Valaikappu and Seemantham rituals or joyful modern baby shower celebrations. We provide dedicated traditional floral backdrops, auspicious morning muhurtham scheduling, comfortable family seating, and special ceremonial feasts.',
    capacities: [
      { label: 'Family Cluster Tables', value: '100 – 140 Guests' },
      { label: 'Ritual Viewing Theater', value: '150 – 180 Guests' },
      { label: 'Floating Family Flow', value: '250 Guests' },
      { label: 'Auspicious Muhurtham', value: 'Morning & Evening Slots' }
    ],
    technicalSpecs: [
      { icon: Heart, label: 'Traditional Stage Decor', desc: 'Garland backdrops & ceremonial swing' },
      { icon: Building2, label: 'Mother’s Green Room', desc: 'Comfortable private AC resting suite' },
      { icon: Wind, label: 'Gentle Climate Control', desc: 'Even temperature across the hall' },
      { icon: Zap, label: '100% Generator Backup', desc: 'Uninterrupted auspicious rituals' }
    ],
    cateringOptions: [
      'Authentic 5-Rice Valaikappu feast (Chithirannam: Lemon, Tamarind, Coconut, Curd, Sambar)',
      'Grand traditional plantain leaf meal with payasam, vadai, and appalam',
      'Assorted traditional sweet boxes & high tea snack service for departing guests'
    ],
    gallery: [
      {
        src: '/images/events/BabyShower/EventsBabyShower_8k.png',
        alt: 'Traditional baby shower stage with flower garlands and ceremonial cradle at Hotel Amil',
        caption: 'Traditional Seemantham Stage with Floral Garlands & Ceremonial Swing',
        category: 'Baby Shower'
      },
      {
        src: '/images/events/BabyShower/EventBabyShower2_8k.png',
        alt: 'Valaikappu ceremony setup with Mom To Be backdrop and auspicious fruits at Hotel Amil',
        caption: 'Valaikappu Ceremony with Auspicious Fruits & "Mom To Be" Stage at Hotel Amil',
        category: 'Baby Shower'
      },
      {
        src: '/images/events/BabyShower/BabyShower2_8k.png',
        alt: 'Contemporary baby shower celebration table with 3-tier cake and floral styling',
        caption: 'Contemporary Baby Shower Celebration Theme with 3-Tier Cake & Floral Styling',
        category: 'Baby Shower'
      },
      {
        src: '/images/events/BabyShower/BabyShowerKit_8k.png',
        alt: 'Traditional family dining hall for auspicious 5-rice Valaikappu feast',
        caption: 'Family Dining Hall for Auspicious 5-Rice Valaikappu Ceremonial Feast',
        category: 'Baby Shower'
      },
      {
        src: '/images/events/BabyShower/EventAmilDiplay_8k.png',
        alt: 'Hotel Amil grand entrance welcoming families for auspicious celebrations',
        caption: 'Hotel Amil Grand Entrance Welcoming Families for Auspicious Celebrations',
        category: 'Baby Shower'
      }
    ],
    ctaButton: 'Book Baby Shower',
    themeBg: 'bg-ivory'
  },
  {
    id: 'couple-section',
    aliasId: 'romantic-section', // Maintains backwards compatibility with existing links
    number: '04',
    categoryName: 'Private Couple Occasions',
    icon: Sparkles,
    tagline: 'JUST THE TWO OF YOU',
    headline: 'Candlelight Dinners & Anniversaries',
    description:
      'Celebrate romantic anniversaries, milestone wedding proposals, birthdays, or special evenings in an intimate candlelit setting. Enjoy a personalized 4-course tasting menu, discreet private butler service, and romantic acoustic melodies.',
    capacities: [
      { label: 'Setting', value: 'Private Candlelit Table for 2' },
      { label: 'Venue Area', value: 'Reserved Alcove at Saffron' },
      { label: 'Hospitality', value: 'Dedicated Private Butler' },
      { label: 'Dining Format', value: 'Chef’s 4-Course Tasting' }
    ],
    technicalSpecs: [
      { icon: Heart, label: 'Romantic Table Styling', desc: 'Candlelight, rose petals & customized menu' },
      { icon: Utensils, label: 'Chef’s Curated Courses', desc: 'Artisanal starters, mains & dessert duo' },
      { icon: Volume2, label: 'Soft Acoustic Melodies', desc: 'Discreet background musical ambiance' },
      { icon: Gift, label: 'Celebration Surprises', desc: 'Custom cake cutting & floral bouquets' }
    ],
    cateringOptions: [
      'Chef’s 4-Course Romantic Dinner: Welcome mocktail, appetizers, signature mains & dessert',
      'Specialty North Indian & Continental selections from Saffron Restaurant',
      'Artisanal custom celebration cake and handpicked fresh rose flower bouquet'
    ],
    gallery: [
      {
        src: '/images/events/event-couple.jpg',
        alt: 'Private romantic candlelight dinner for two with candles and roses at Hotel Amil',
        caption: 'Private Candlelight Dinner for Two with Ambient Lighting & Fresh Roses',
        category: 'Private Couple Occasions'
      },
      {
        src: '/images/events/RestaurentTable_8k.png',
        alt: 'Hotel Amil luxury dining table setting with plush armchairs and fine tableware',
        caption: 'Hotel Amil Luxury Dining Table Setting with Plush Armchairs',
        category: 'Private Couple Occasions'
      },
      {
        src: '/images/Dining/Restaurent2_8k.png',
        alt: 'Intimate dining alcove at Saffron Restaurant',
        caption: 'Intimate Dining Alcove at Saffron Restaurant for Romantic Evenings',
        category: 'Private Couple Occasions'
      },
      {
        src: '/images/amenities/bar 8k - 1.png',
        alt: 'The Amil Lounge & Bar for pre-dinner vintage cocktails and refreshments',
        caption: 'The Amil Lounge & Bar for Pre-Dinner Cocktails & Fine Spirits',
        category: 'Private Couple Occasions'
      },
      {
        src: '/images/hero/bar hero - 4k.png',
        alt: 'Subdued romantic evening atmosphere at The Amil Bar',
        caption: 'Mood-Lit Intimate Sanctuary for Romantic Evening Conversations',
        category: 'Private Couple Occasions'
      }
    ],
    ctaButton: 'Book Romantic Occasion',
    themeBg: 'bg-warm-white'
  },
  {
    id: 'birthday-section',
    aliasId: null,
    number: '05',
    categoryName: 'Birthday Parties',
    icon: Gift,
    tagline: 'MAKE EVERY BIRTHDAY MEMORABLE',
    headline: '1st Birthdays & Milestone Celebrations',
    description:
      'From 1st birthday fairy wonderlands with illuminated marquee numbers and balloon arches to jubilant landmark 50th or 60th celebrations, we create festive atmospheres with custom themed decor, lively music, and crowd-pleasing dining.',
    capacities: [
      { label: 'Seated Banquet', value: '80 – 150 Guests' },
      { label: 'Floating Party Flow', value: '200 Guests' },
      { label: 'Party Game & DJ Floor', value: 'Open Dance Space' },
      { label: 'Celebration Slot', value: 'Morning / Evening Party' }
    ],
    technicalSpecs: [
      { icon: Sparkles, label: 'Themed Stage & Lighting', desc: 'Marquee letters, balloon arches & spotlights' },
      { icon: Volume2, label: 'Party Audio & Microphones', desc: 'Cordless mics for emcee, DJ system' },
      { icon: Wind, label: 'Central Air Conditioning', desc: 'Full hall climate comfort' },
      { icon: Zap, label: '100% Generator Backup', desc: 'Continuous celebration energy' }
    ],
    cateringOptions: [
      'Kids-friendly party menu: Mini burgers, pasta, french fries, and ice cream sundae bar',
      'Grand Multi-Cuisine family dinner buffet with vegetarian and non-vegetarian specialties',
      'Custom theme birthday cake coordination and live popcorn/cotton candy on request'
    ],
    gallery: [
      {
        src: '/images/events/BirthDay/EventsBirthDay2_8k.png',
        alt: 'Fairy wonderland 1st birthday stage with balloon arch and illuminated marquee letters at Hotel Amil',
        caption: 'Fairy Wonderland 1st Birthday Stage with Illuminated Marquee Letters at Hotel Amil',
        category: 'Birthday Parties'
      },
      {
        src: '/images/events/BirthDay/EventsBirthDay_8k.png',
        alt: 'Grand 10th birthday celebration stage with marquee lights RUDHVIN at Hotel Amil',
        caption: 'Grand Birthday Stage with Illuminated Marquee Lights "10 RUDHVIN" at Hotel Amil',
        category: 'Birthday Parties'
      },
      {
        src: '/images/events/BirthDay/EventsBirthDay3_8k.png',
        alt: 'Celebration banquet dining hall with golden ambient lighting and balloon decor',
        caption: 'Celebration Banquet Dining Hall with Golden Ambient Lighting',
        category: 'Birthday Parties'
      },
      {
        src: '/images/events/BirthDay/BirthDayPic_8k.png',
        alt: 'Hotel Amil banquet hall decorated with 1st birthday balloon arch and dressed tables',
        caption: 'Banquet Hall Decorated with 1st Birthday Balloon Arch & Festive Tables',
        category: 'Birthday Parties'
      },
      {
        src: '/images/events/BirthDay/BirthDayPic3_8k.png',
        alt: 'The Azure Poolside deck for outdoor birthday parties and celebration games',
        caption: 'The Azure Poolside Party & Celebration Deck for Refreshing Gatherings',
        category: 'Birthday Parties'
      }
    ],
    ctaButton: 'Book Birthday Party',
    themeBg: 'bg-ivory'
  }
];

// ─────────────────────────────────────────────────────────────
// VENUE AMENITIES CHECKLIST DATA
// ─────────────────────────────────────────────────────────────
const VENUE_AMENITIES = [
  {
    icon: Zap,
    title: '100% Silent DG Backup',
    description: 'Heavy-duty commercial generator ensures zero interruption for lighting, AC, and sound during ceremonies.'
  },
  {
    icon: Wind,
    title: 'Central Air Conditioning',
    description: 'Even, climate-controlled comfort across the entire banquet hall, dining hall, and pre-function foyer.'
  },
  {
    icon: Building2,
    title: 'Bridal & Host Suite',
    description: 'Dedicated air-conditioned green room with full-length vanity mirror, wardrobe, and en-suite private restroom.'
  },
  {
    icon: Volume2,
    title: 'High-Fidelity Audio & Mics',
    description: 'Acoustically tuned sound reinforcement with cordless handheld, lapel, and podium microphones.'
  },
  {
    icon: Tv,
    title: 'Motorized HD Projection',
    description: 'Widescreen projection system with HDMI connectivity for presentations, videos, and wedding photo slideshows.'
  },
  {
    icon: Car,
    title: '60+ Vehicle Parking & Valet',
    description: 'Spacious on-site secure parking for cars and tour coaches with courteous valet attendants.'
  },
  {
    icon: Utensils,
    title: 'Certified Gourmet Kitchens',
    description: 'Separate, impeccably hygienic vegetarian and non-vegetarian kitchens led by seasoned executive chefs.'
  },
  {
    icon: ShieldCheck,
    title: 'Dedicated Event Coordinator',
    description: 'An experienced banquet supervisor oversees setup, dining schedules, and vendor coordination on the day.'
  }
];

// ─────────────────────────────────────────────────────────────
// EVENT ENQUIRY FORM (Submits via mailto / phone)
// ─────────────────────────────────────────────────────────────
const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  eventType: 'Wedding & Reception',
  date: '',
  guests: '',
  details: ''
};

const INITIAL_ERRORS = {
  name: '',
  phone: '',
  email: '',
  date: '',
  guests: ''
};

export const Events = () => {
  // Modal state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Wedding & Reception');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOnIndexChange, setLightboxOnIndexChange] = useState(null);

  // Bottom Inline Form state
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openBookingModal = (categoryName) => {
    setSelectedCategory(categoryName || 'Wedding & Reception');
    setBookingModalOpen(true);
  };

  const openLightbox = (imagesList, index = 0, onIndexChange = null) => {
    setLightboxImages(imagesList);
    setLightboxIndex(index);
    setLightboxOnIndexChange(() => onIndexChange);
    setLightboxOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateInlineForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.date) errs.date = 'Please select a preferred date.';
    if (!form.guests.trim()) {
      errs.guests = 'Guest count is required.';
    } else if (isNaN(Number(form.guests)) || Number(form.guests) < 1) {
      errs.guests = 'Please enter a valid guest count.';
    }
    return errs;
  };

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInlineForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);

    const body = [
      `Full Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || 'Not provided'}`,
      `Event Category: ${form.eventType}`,
      `Preferred Date: ${form.date}`,
      `Expected Guests: ${form.guests}`,
      `Additional Details: ${form.details || 'None'}`
    ].join('\n');

    const subject = encodeURIComponent(`Event Enquiry — ${form.eventType} — ${form.name}`);
    const mailtoUrl = `mailto:${hotelData.inquiryEmail || 'Info@hotelamil.com'}?subject=${subject}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-ivory text-charcoal-text font-sans">
      {/* ── 1. DYNAMIC HERO CAROUSEL ── */}
      <EventsHero onOpenBookingModal={openBookingModal} />

      {/* ── 2. EDITORIAL INTRO, CATEGORY STRIP, EDITORIAL HIGHLIGHT & KEY METRICS STRIP ── */}
      <section className="bg-warm-white border-b border-border-light/70 pt-5 pb-8 sm:py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 2A. Editorial Introduction */}
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
            <ScrollReveal yOffset={20} className="w-full">
              <span className="text-[10.5px] sm:text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-1.5 sm:mb-2.5">
                HOTEL AMIL BANQUETS & OCCASIONS
              </span>
              <h2 className="text-xl sm:text-3xl md:text-5xl font-serif text-charcoal font-normal leading-snug sm:leading-[1.2] mb-2 sm:mb-3.5">
                Distinguished Spaces for Every Celebration
              </h2>
              <div className="w-10 sm:w-12 h-[1.5px] sm:h-[2px] bg-amil-red mx-auto mb-2.5 sm:mb-4" />
              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed max-w-2xl mx-auto">
                Whether you are bringing together hundreds of loved ones for a grand wedding reception, convening an executive corporate seminar, or gathering for an intimate anniversary candlelight dinner, Hotel Amil delivers Rajapalayam’s premier event experience.
              </p>
            </ScrollReveal>
          </div>

          {/* 2B. Compact Event Category Strip ("PERFECT FOR EVERY OCCASION") */}
          <div data-testid="event-category-strip" className="max-w-2xl mx-auto mb-4 sm:mb-8">
            <div className="bg-[#FAF6F0]/90 border border-[#EAE3D8] rounded-[4px] p-3 sm:p-4 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red text-center block mb-2.5">
                PERFECT FOR EVERY OCCASION
              </span>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {QUICK_CATEGORIES.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <a
                      key={cat.name}
                      href={cat.target}
                      onClick={(e) => {
                        e.preventDefault();
                        const targetId = cat.target.replace('#', '');
                        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group flex flex-col items-center text-center focus:outline-none"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E2D8C7] flex items-center justify-center mb-1.5 shadow-2xs transition-transform duration-200 group-hover:scale-105 active:scale-95">
                        <IconComponent className="w-5 h-5 text-amil-red transition-colors duration-200" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-sans font-medium text-charcoal leading-tight group-hover:text-amil-red transition-colors duration-200 line-clamp-2">
                        {cat.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2C. Editorial Highlight Card with Subtle Champagne-Gold Ornamentation */}
          <div className="relative max-w-xl mx-auto mb-4 sm:mb-7 p-3.5 sm:p-6 bg-gradient-to-br from-[#FCFAF6] to-[#F7F2EA] border border-[#E8DFD1]/90 rounded-[4px] shadow-2xs overflow-hidden text-center">
            {/* Subtle architectural arch watermark */}
            <div className="absolute -right-5 -bottom-5 w-24 h-24 opacity-[0.05] pointer-events-none text-muted-gold flex items-center justify-center">
              <Building2 className="w-full h-full" />
            </div>

            <LuxuryFlourish className="w-14 sm:w-16 h-3.5 sm:h-4 text-muted-gold/80 mx-auto mb-2" />
            <h3 className="text-sm sm:text-lg md:text-xl font-serif text-charcoal font-normal leading-snug mb-1">
              Every Celebration Deserves an Extraordinary Setting.
            </h3>
            <p className="text-[10.5px] sm:text-xs font-sans text-text-muted font-light leading-relaxed max-w-md mx-auto">
              From intimate gatherings to grand celebrations, our banquet spaces are designed to make your moments truly unforgettable.
            </p>
          </div>

          {/* 2D. Minimal Scroll Indicator */}
          <div className="text-center mb-5 sm:mb-8">
            <a
              href="#event-metrics"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('event-metrics')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
              aria-label="Scroll to explore our event spaces"
            >
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-border-light/80 shadow-2xs flex items-center justify-center text-amil-red group-hover:bg-amil-red group-hover:text-white transition-all duration-200">
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red">
                SCROLL TO EXPLORE OUR EVENT SPACES
              </span>
            </a>
          </div>

          {/* 2E. Quick Metrics Bar: 2-column x 2-row on mobile, 4-column on desktop */}
          <div id="event-metrics" className="scroll-mt-24 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 border-t border-border-light/60 pt-6 sm:pt-8 md:pt-10">
            <div className="text-center p-3.5 sm:p-4 bg-white/70 border border-border-light/60 rounded-[2px] shadow-sm">
              <span className="text-2xl md:text-3xl font-serif text-charcoal block mb-1">
                300+
              </span>
              <span className="text-[11px] sm:text-xs font-sans font-medium uppercase tracking-normal sm:tracking-wider text-text-muted leading-tight block">
                Max Hall Capacity
              </span>
            </div>
            <div className="text-center p-3.5 sm:p-4 bg-white/70 border border-border-light/60 rounded-[2px] shadow-sm">
              <span className="text-2xl md:text-3xl font-serif text-charcoal block mb-1">
                100%
              </span>
              <span className="text-[11px] sm:text-xs font-sans font-medium uppercase tracking-normal sm:tracking-wider text-text-muted leading-tight block">
                DG Silent Power Backup
              </span>
            </div>
            <div className="text-center p-3.5 sm:p-4 bg-white/70 border border-border-light/60 rounded-[2px] shadow-sm">
              <span className="text-2xl md:text-3xl font-serif text-charcoal block mb-1">
                60+
              </span>
              <span className="text-[11px] sm:text-xs font-sans font-medium uppercase tracking-normal sm:tracking-wider text-text-muted leading-tight block">
                Secure Car Parking
              </span>
            </div>
            <div className="text-center p-3.5 sm:p-4 bg-white/70 border border-border-light/60 rounded-[2px] shadow-sm">
              <span className="text-2xl md:text-3xl font-serif text-charcoal block mb-1">
                Dual
              </span>
              <span className="text-[11px] sm:text-xs font-sans font-medium uppercase tracking-normal sm:tracking-wider text-text-muted leading-tight block">
                Veg & Non-Veg Kitchens
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DETAILED 5 CATEGORY SECTIONS ── */}
      {EVENT_CATEGORIES_DATA.map((cat, idx) => {
        const isEven = idx % 2 === 1;

        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`scroll-mt-24 py-20 md:py-28 border-b border-border-light/60 ${cat.themeBg}`}
          >
            {/* Alias anchor for backwards compatibility */}
            {cat.aliasId && <div id={cat.aliasId} className="scroll-mt-24" />}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Category Header Row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-border-light/80">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-gold font-sans text-xs sm:text-sm font-semibold tracking-luxury">
                      {cat.number}
                    </span>
                    <span className="text-muted-gold/60 text-xs">—</span>
                    <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red">
                      {cat.tagline}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.16]">
                    {cat.headline}
                  </h3>
                </div>

                <div className="flex-shrink-0">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => openBookingModal(cat.categoryName)}
                    className="flex items-center gap-2 text-xs tracking-luxury shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{cat.ctaButton.toUpperCase()}</span>
                  </Button>
                </div>
              </div>

              {/* Main 2-Column Content: Left Specs / Right Interactive Gallery */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                
                {/* Column 1: Editorial Details, Capacity Specs & Catering */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <ScrollReveal yOffset={25}>
                    <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    {/* Capacity Table Card */}
                    <div className="bg-white border border-border-light/80 rounded-[2px] p-5 sm:p-6 mb-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border-light/60">
                        <Users className="w-4 h-4 text-amil-red" />
                        <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal">
                          Seating & Capacity Specifications
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3.5">
                        {cat.capacities.map((cap) => (
                          <div key={cap.label} className="bg-ivory/50 p-2.5 rounded-[2px] border border-border-light/50">
                            <span className="block text-[10px] sm:text-[11px] font-sans text-text-muted uppercase tracking-wider">
                              {cap.label}
                            </span>
                            <span className="block text-xs sm:text-sm font-serif font-medium text-charcoal mt-0.5">
                              {cap.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Specs & Venue Amenities */}
                    <div className="mb-6 space-y-2.5">
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal block mb-2">
                        Hall Features & Stage Infrastructure:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cat.technicalSpecs.map((spec) => {
                          const SpecIcon = spec.icon;
                          return (
                            <div
                              key={spec.label}
                              className="flex items-start gap-2.5 p-2.5 bg-white/70 border border-border-light/60 rounded-[2px]"
                            >
                              <SpecIcon className="w-4 h-4 text-muted-gold flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-xs font-sans font-medium text-charcoal">
                                  {spec.label}
                                </span>
                                <span className="block text-[10px] font-sans text-text-muted">
                                  {spec.desc}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Catering Options Highlight */}
                    <div className="bg-warm-white border border-border-light/80 p-4 rounded-[2px] mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Utensils className="w-3.5 h-3.5 text-amil-red" />
                        <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal">
                          Catering & Dining Options
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs font-sans text-text-muted">
                        {cat.cateringOptions.map((opt) => (
                          <li key={opt} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-amil-red flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{opt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Link & Direct Front Desk Call */}
                    <div className="flex items-center gap-4 text-xs font-sans pt-1">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => openBookingModal(cat.categoryName)}
                      >
                        Check Dates for {cat.categoryName}
                      </Button>
                      <a
                        href={`tel:${hotelData.phone.replace(/\s+/g, '')}`}
                        className="text-text-muted hover:text-amil-red transition-colors flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{hotelData.phone}</span>
                      </a>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Column 2: Independent 5-Image Gallery with Controls */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <ScrollReveal delay={0.15} yOffset={25}>
                    <EventGallery
                      images={cat.gallery}
                      categoryName={cat.categoryName}
                      onOpenLightbox={openLightbox}
                    />
                  </ScrollReveal>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── 4. COMPREHENSIVE VENUE AMENITIES CHECKLIST ── */}
      <section className="py-20 md:py-24 bg-warm-white border-b border-border-light/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <ScrollReveal yOffset={25}>
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2.5">
                VENUE EXCELLENCE & INFRASTRUCTURE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.2] mb-3.5">
                Complete Banquet Amenities & Support
              </h2>
              <div className="w-12 h-[2px] bg-amil-red mx-auto mb-4" />
              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed">
                Every event at Hotel Amil is backed by enterprise-grade infrastructure, thoughtful guest comforts, and a seasoned hospitality team dedicated to flawless execution.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENUE_AMENITIES.map((amenity, i) => {
              const AmenityIcon = amenity.icon;
              return (
                <ScrollReveal key={amenity.title} delay={0.08 * i} yOffset={20}>
                  <div className="h-full bg-white border border-border-light/80 p-6 rounded-[2px] shadow-sm hover:shadow-soft-luxury hover:border-amil-red/40 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-sm bg-ivory border border-border-light flex items-center justify-center text-amil-red mb-4">
                        <AmenityIcon className="w-5 h-5 stroke-[1.75]" />
                      </div>
                      <h4 className="text-base font-serif text-charcoal font-medium mb-2">
                        {amenity.title}
                      </h4>
                      <p className="text-xs font-sans text-text-muted leading-relaxed font-light">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Banner calling to book */}
          <div className="mt-12 p-6 sm:p-8 bg-charcoal text-ivory rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-elevated">
            <div>
              <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block mb-1">
                NEED A CUSTOM EVENT ARRANGEMENT?
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-warm-white font-normal">
                Speak with our Resident Banquet Manager
              </h3>
              <p className="text-xs font-sans text-ivory/70 mt-1 max-w-xl">
                We coordinate personalized decor packages, floral styling, sound engineering, and multi-day ceremonial arrangements.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => openBookingModal('Wedding & Reception')}
              >
                CHECK AVAILABILITY
              </Button>
              <a
                href={`tel:${hotelData.phone.replace(/\s+/g, '')}`}
                className="px-5 py-2.5 border border-ivory/40 hover:border-ivory text-ivory text-xs font-sans font-medium uppercase tracking-luxury rounded-[2px] transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {hotelData.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FULL EVENT ENQUIRY SECTION & DIRECT CONTACT ── */}
      <section
        id="event-enquiry"
        className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden bg-charcoal text-ivory"
      >
        {/* Real photo background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/amenities/banquetHall-8k.png')` }}
        />

        {/* Ambient overlays */}
        <div className="absolute inset-0 bg-charcoal/80 sm:bg-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
            
            {/* Left Column: Introduction & Contact Details */}
            <div className="lg:col-span-5 text-left">
              <ScrollReveal yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold block mb-3">
                  CELEBRATIONS AT HOTEL AMIL
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-warm-white font-normal leading-[1.18] tracking-tight mb-4">
                  Made for moments that matter.
                </h2>
                <div className="w-12 h-[2px] bg-amil-red mb-6" />
                <p className="text-xs sm:text-sm lg:text-base font-sans text-ivory/80 font-light leading-relaxed mb-8 max-w-lg">
                  From intimate celebrations to grand family banquets and executive conferences, create unforgettable moments with the signature warmth of Hotel Amil.
                </p>

                {/* 3 Value Pillars */}
                <div className="space-y-6 mb-8 border-y border-white/15 py-6">
                  <div className="flex items-start gap-4">
                    <span className="text-muted-gold font-sans text-xs sm:text-sm font-semibold tracking-luxury mt-0.5">
                      01
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-serif text-warm-white font-normal mb-1">
                        Unmatched Banqueting Ambiance
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-ivory/70 font-light leading-relaxed">
                        Spacious, air-conditioned halls tailored with customized seating configurations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-muted-gold font-sans text-xs sm:text-sm font-semibold tracking-luxury mt-0.5">
                      02
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-serif text-warm-white font-normal mb-1">
                        Renowned Culinary Excellence
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-ivory/70 font-light leading-relaxed">
                        Traditional South Indian banana leaf feasts and multi-cuisine buffets.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-muted-gold font-sans text-xs sm:text-sm font-semibold tracking-luxury mt-0.5">
                      03
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-serif text-warm-white font-normal mb-1">
                        Flawless Technical Support
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-ivory/70 font-light leading-relaxed">
                        100% DG generator backup, HD projection, sound engineering, and dedicated managers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Front Desk Phone Contact Link */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs font-sans text-ivory/70">
                  <span>Prefer to speak immediately?</span>
                  <a
                    href={`tel:${hotelData.phone.replace(/\s+/g, '')}`}
                    className="text-muted-gold hover:text-ivory underline underline-offset-4 transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call {hotelData.phone}</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Inline Event Enquiry Form */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.15} yOffset={25}>
                {submitted ? (
                  <div className="bg-warm-white border border-border-light/80 p-8 sm:p-12 text-center shadow-soft-luxury rounded-[2px] text-charcoal">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
                    </div>
                    <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
                      Enquiry Submitted
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-charcoal mb-3">
                      Thank you, {form.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed mb-6 max-w-md mx-auto">
                      Your event enquiry for{' '}
                      <strong className="text-charcoal">{form.eventType}</strong> has been prepared. Our team at Hotel Amil will follow up with you via the contact details provided.
                    </p>
                    <div className="p-4 bg-white border border-border-light/60 text-xs font-sans text-left space-y-1.5 mb-6 max-w-sm mx-auto text-charcoal-text">
                      <p>
                        <strong>Category:</strong> {form.eventType}
                      </p>
                      <p>
                        <strong>Date:</strong> {form.date}
                      </p>
                      <p>
                        <strong>Expected Guests:</strong> {form.guests} persons
                      </p>
                      <p>
                        <strong>Phone:</strong> {form.phone}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        setForm(INITIAL_FORM);
                        setSubmitted(false);
                      }}
                    >
                      Submit Another Enquiry
                    </Button>
                  </div>
                ) : (
                  <form
                    id="event-enquiry-form-card"
                    onSubmit={handleInlineSubmit}
                    noValidate
                    className="bg-warm-white border border-border-light/80 p-6 sm:p-8 lg:p-10 shadow-elevated rounded-[2px] text-charcoal"
                  >
                    <div className="mb-6">
                      <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-1.5">
                        DIRECT EVENT RESERVATION
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal">
                        Tell Us About Your Event
                      </h3>
                      <p className="text-xs text-text-muted font-sans mt-1">
                        Complete your details below and our resident banquet manager will prepare an availability schedule and pricing proposal.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="inline-ev-name"
                          className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1"
                        >
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                          <input
                            id="inline-ev-name"
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleFormChange}
                            placeholder="e.g. S. Ramanathan"
                            className="w-full px-3.5 py-2.5 pl-10 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px] placeholder-text-muted/60 transition-colors"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.name}</p>
                        )}
                      </div>

                      {/* Phone & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="inline-ev-phone"
                            className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1"
                          >
                            Phone / WhatsApp *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                            <input
                              id="inline-ev-phone"
                              type="tel"
                              name="phone"
                              required
                              value={form.phone}
                              onChange={handleFormChange}
                              placeholder="+91 98765 43210"
                              className="w-full px-3.5 py-2.5 pl-10 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px] placeholder-text-muted/60 transition-colors"
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="inline-ev-email"
                            className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1"
                          >
                            Email (Optional)
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                            <input
                              id="inline-ev-email"
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleFormChange}
                              placeholder="client@example.com"
                              className="w-full px-3.5 py-2.5 pl-10 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px] placeholder-text-muted/60 transition-colors"
                            />
                          </div>
                          {errors.email && (
                            <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Event Category Selector */}
                      <div>
                        <label
                          htmlFor="inline-ev-type"
                          className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1"
                        >
                          Event Category *
                        </label>
                        <select
                          id="inline-ev-type"
                          name="eventType"
                          value={form.eventType}
                          onChange={handleFormChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px] transition-colors"
                        >
                          {EVENT_CATEGORIES_DATA.map((cat) => (
                            <option key={cat.id} value={cat.categoryName}>
                              {cat.categoryName}
                            </option>
                          ))}
                          <option value="Other / Special Occasion">
                            Other / Special Occasion
                          </option>
                        </select>
                      </div>

                      {/* Date & Guests */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="inline-ev-date"
                            className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1"
                          >
                            Preferred Date *
                          </label>
                          <div className="relative">
                            <Calendar className="w-4 h-4 text-text-muted absolute left-3.5 top-3 pointer-events-none" />
                            <input
                              id="inline-ev-date"
                              type="date"
                              name="date"
                              min={today}
                              value={form.date}
                              onChange={handleFormChange}
                              className="w-full px-3.5 py-2.5 pl-10 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px] transition-colors"
                            />
                          </div>
                          {errors.date && (
                            <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.date}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="inline-ev-guests"
                            className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1"
                          >
                            Expected Guests *
                          </label>
                          <div className="relative">
                            <Users className="w-4 h-4 text-text-muted absolute left-3.5 top-3 pointer-events-none" />
                            <input
                              id="inline-ev-guests"
                              type="number"
                              name="guests"
                              min="1"
                              value={form.guests}
                              onChange={handleFormChange}
                              placeholder="e.g. 150"
                              className="w-full px-3.5 py-2.5 pl-10 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px] transition-colors"
                            />
                          </div>
                          {errors.guests && (
                            <p className="text-[11px] text-amil-red mt-1 font-sans">{errors.guests}</p>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div>
                        <label
                          htmlFor="inline-ev-details"
                          className="block text-xs font-sans font-medium text-charcoal-text uppercase tracking-wider mb-1"
                        >
                          Specific Requirements / Décor / Catering Notes
                        </label>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 text-text-muted absolute left-3.5 top-3 pointer-events-none" />
                          <textarea
                            id="inline-ev-details"
                            name="details"
                            rows={3}
                            value={form.details}
                            onChange={handleFormChange}
                            placeholder="e.g. Stage backdrop flowers, sound system requirements, preferred lunch timings..."
                            className="w-full px-3.5 py-2 pl-10 bg-white border border-border-light text-xs font-sans text-charcoal focus:outline-none focus:border-amil-red rounded-[2px] resize-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full text-xs tracking-luxury py-4 shadow-md"
                        >
                          {isSubmitting ? 'OPENING EMAIL CLIENT...' : 'SEND EVENT ENQUIRY'}
                        </Button>
                        <p className="text-[11px] text-text-muted text-center mt-2.5 font-sans">
                          Our events desk typically replies within 2 to 4 business hours via phone or WhatsApp.
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── MODAL: Event Availability & Booking ── */}
      <EventBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultEventType={selectedCategory}
      />

      {/* ── LIGHTBOX: Full-Screen Viewing ── */}
      <EventLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
        onIndexChange={lightboxOnIndexChange}
      />
    </div>
  );
};

export default Events;
