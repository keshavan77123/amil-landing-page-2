import fs from 'fs';
import path from 'path';

const base = './public/images';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper to write an SVG placeholder that can also serve as image file
function createSvgPlaceholder(filePath, label, subtitle = 'Hotel Amil, Rajapalayam') {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" style="background:#1A1815;">
  <defs>
    <radialGradient id="luxGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#2C2723" />
      <stop offset="60%" stop-color="#1A1815" />
      <stop offset="100%" stop-color="#110F0D" />
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#luxGrad)" />
  <rect x="40" y="40" width="1120" height="720" fill="none" stroke="#DED5C9" stroke-opacity="0.15" stroke-width="1" />
  
  <!-- Architectural Accent -->
  <g transform="translate(600, 320)" fill="none" stroke="#B32B2B" stroke-width="2">
    <polygon points="0,-40 -35,-10 35,-10" />
    <line x1="-40" y1="-10" x2="40" y2="-10" />
    <circle cx="0" cy="-24" r="5" fill="#B32B2B" stroke="none" />
    <rect x="-30" y="-6" width="60" height="10" />
    <line x1="-20" y1="4" x2="-20" y2="45" />
    <line x1="-7" y1="4" x2="-7" y2="45" />
    <line x1="7" y1="4" x2="7" y2="45" />
    <line x1="20" y1="4" x2="20" y2="45" />
    <line x1="-35" y1="45" x2="35" y2="45" stroke-width="2.5" />
  </g>

  <text x="600" y="420" font-family="'Inter', sans-serif" font-size="14" font-weight="600" letter-spacing="0.25em" fill="#B08D57" text-anchor="middle">HOTEL AMIL • PHOTOGRAPHY ASSET</text>
  <text x="600" y="460" font-family="'Playfair Display', serif" font-size="34" font-weight="600" fill="#F6F1E9" text-anchor="middle">${label.toUpperCase()}</text>
  <text x="600" y="500" font-family="'Cormorant Garamond', serif" font-size="20" font-style="italic" fill="#DED5C9" text-anchor="middle">"For Your Comfort..."</text>
  <text x="600" y="540" font-family="'Inter', sans-serif" font-size="12" fill="#756E67" text-anchor="middle">${subtitle}</text>
</svg>`;

  fs.writeFileSync(filePath, content);
}

// 1. Hero images
ensureDir(path.join(base, 'hero'));
for (let i = 1; i <= 4; i++) {
  createSvgPlaceholder(path.join(base, 'hero', `hero-${i}.jpg`), `Hero Photograph ${i}`);
  createSvgPlaceholder(path.join(base, 'hero', `hero-${i}.svg`), `Hero Photograph ${i}`);
}

// 2. Amenities
ensureDir(path.join(base, 'amenities'));
const amenitiesList = [
  { id: 'bar-1', label: 'The Amil Lounge & Bar' },
  { id: 'banquet-1', label: 'Grand Banquet Convention Hall' },
  { id: 'pool-1', label: 'The Azure Swimming Pool' },
  { id: 'restaurant-1', label: 'Saffron Fine Dining Restaurant' },
  { id: 'cafe-1', label: '24-Hour Amil Bistro Cafe' }
];

amenitiesList.forEach(a => {
  createSvgPlaceholder(path.join(base, 'amenities', `${a.id}.jpg`), a.label);
  createSvgPlaceholder(path.join(base, 'amenities', `${a.id}.svg`), a.label);
});

// 3. Nearby
ensureDir(path.join(base, 'nearby'));
const nearbyList = [
  { id: 'temple-1', label: 'Srivilliputhur Andal Temple Tower' },
  { id: 'temple-2', label: 'Sastha Kovil & Reservoir' },
  { id: 'falls-1', label: 'Ayyanar Cascading Falls' },
  { id: 'falls-2', label: 'Rajapalayam Sanjeevi Hills' }
];

nearbyList.forEach(n => {
  createSvgPlaceholder(path.join(base, 'nearby', `${n.id}.jpg`), n.label);
  createSvgPlaceholder(path.join(base, 'nearby', `${n.id}.svg`), n.label);
});

// 4. Room stills
const roomIds = ['executive', 'twin-executive', 'deluxe', 'family'];
roomIds.forEach(id => {
  const dir = path.join(base, 'rooms', id);
  ensureDir(dir);
  for (let i = 1; i <= 4; i++) {
    createSvgPlaceholder(path.join(dir, `${id}-${i}.jpg`), `${id} Suite View ${i}`);
  }
});

console.log('Static photographic placeholder files generated successfully.');
