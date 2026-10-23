# Hotel Amil, Rajapalayam — Premium Website Frontend

A luxury hotel frontend website for **Hotel Amil, Rajapalayam**, built with React, Vite, Tailwind CSS, Framer Motion, Swiper.js, and Lucide Icons.

The design takes strong inspiration from the layout discipline, photography-first approach, and quiet luxury of **Four Seasons Hotels and Resorts**, while remaining true to Hotel Amil's recognizable brand identity: **Amil Red**, architectural crest, warm ivory, deep charcoal, and the signature motto *"For Your Comfort..."*.

---

## 1. Brand Color System ("Amil Red, Restrained")

* **Amil Red**: `#B32B2B` (Signature accent: CTAs, active indicators, fine dividers, small labels)
* **Amil Red Dark**: `#8F2424` (Hover states)
* **Charcoal**: `#1A1815` (Dark sections, photography overlays, footer)
* **Charcoal Text**: `#231F1C` (Primary typography on light backgrounds)
* **Warm Ivory**: `#F6F1E9` (Warm premium background)
* **Warm White**: `#FBF8F3` (Cards and content containers)
* **Muted Gold**: `#B08D57` (Discreet secondary details and accents)
* **Fine Border**: `#DED5C9` (Hairline dividers and editorial borders)
* **Text Muted**: `#756E67` (Supporting editorial prose)

---

## 2. The Four Layout Patterns

The website strictly follows four defined layout patterns:

* **Pattern A — Full image, minimal text below**: Used for room preview cards, amenity cards, and full grid views with subtle hover image zoom.
* **Pattern B — Split image and text**: Alternating editorial rhythm (`IMAGE | TEXT` and `TEXT | IMAGE`) used for the Welcome section, restaurant, cafe, pool, and banquet presentations.
* **Pattern C — Full-bleed background with floating text box**: Translucent charcoal panel (`rgba(26,24,21,0.75)`) with soft backdrop blur over full-screen photography. Used for the homepage hero carousel and mid-page statement banners.
* **Pattern D — Horizontal scrollable image strip with captions**: Inspired by luxury hotel destination strips with circular left/right chevron navigation controls. Used for Nearby Attractions and browsable excursions.

---

## 3. Interactive 360-Degree Room Viewer

* Implemented in `src/components/RoomSpin360Viewer.jsx`.
* Unified touch and pointer event handling (`pointerdown`, `pointermove`, `pointerup` with `touch-action: pan-y`).
* 36-frame sequence representing 360° rotation (1 frame ≈ 10° azimuth).
* Features interactive drag-to-rotate, "← Drag to explore →" prompt, real-time frame counter (`01 / 36`), Amil Red progress bar, and fullscreen view toggle.
* Smooth frame preloading ensures instantaneous, flicker-free rotation.

---

## 4. Reusable Room Detail Architecture

* Single reusable `src/components/RoomDetailView.jsx` component powers all four room categories:
  * Executive Room (`/rooms/executive`)
  * Twin Executive Room (`/rooms/twin-executive`)
  * Deluxe Suite (`/rooms/deluxe`)
  * Grand Family Suite (`/rooms/family`)
* Integrates:
  * Dominant 360° Room Viewer at the top
  * High-resolution Still Photo Gallery with modal lightbox
  * Editorial Room Overview and Amenity Badges
  * Pricing Matrix (Single, Double, Extra Person, Max Occupancy)
  * Live Availability Badge (placeholder ready for API integration)
  * Stay Date Picker with checkout date validation
  * Static Payment Preference selector (Pay at Hotel, UPI, Card)
  * "Proceed to Booking Enquiry" action that carries room ID, check-in, and check-out dates into the Booking Enquiry form URL parameters.

---

## 5. Centralized Data Architecture

All room information, amenities, regional attractions, and hotel metadata are decoupled into configuration files under `src/data/`:

* `src/data/rooms.js`: Tariffs, occupancy limits, bed configurations, descriptions, amenities, and image paths.
* `src/data/amenities.js`: Saffron Restaurant, 24-Hour Amil Cafe, The Azure Pool, Royal Banquet Hall, and Amil Bar.
* `src/data/nearby.js`: Srivilliputhur Andal Temple, Ayyanar Falls, Sanjeevi Hills, Shenbagathoppu Sanctuary, and Sastha Kovil.
* `src/data/hotel.js`: Contact numbers, address, email, social links, and policy guidelines (Check-in/out, CP Breakfast Plan, Cancellation, Pets, Visitors, Liquor).

Replacing photography or updating rates requires **no component modifications**.

---

## 6. Project Structure

```
hotel-amil/
├── public/
│   └── images/
│       ├── brand/
│       │   ├── hotel-amil-logo-red.svg
│       │   ├── hotel-amil-logo-reversed.svg
│       │   └── crest-watermark.svg
│       ├── hero/
│       ├── rooms/
│       │   ├── executive/
│       │   ├── twin-executive/
│       │   ├── deluxe/
│       │   └── family/
│       ├── amenities/
│       └── nearby/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── SectionHeading.jsx
│   │   ├── Navbar.jsx
│   │   ├── HeroCarousel.jsx
│   │   ├── RoomCard.jsx
│   │   ├── RoomSpin360Viewer.jsx
│   │   ├── RoomDetailView.jsx
│   │   ├── PhotoGallery.jsx
│   │   ├── AmenityCard.jsx
│   │   ├── NearbyCard.jsx
│   │   ├── ScrollStrip.jsx
│   │   ├── BookingForm.jsx
│   │   ├── AvailabilityBadge.jsx
│   │   ├── PaymentOptions.jsx
│   │   ├── WhatsAppButton.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollReveal.jsx
│   ├── data/
│   │   ├── rooms.js
│   │   ├── amenities.js
│   │   ├── nearby.js
│   │   └── hotel.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Rooms.jsx
│   │   ├── RoomDetail.jsx
│   │   ├── Amenities.jsx
│   │   ├── Nearby.jsx
│   │   ├── Policy.jsx
│   │   ├── BookingEnquiry.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 7. Development & Production Commands

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build production bundle
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```
