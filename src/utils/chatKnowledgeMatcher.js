/**
 * HOTEL AMIL — VIRTUAL ASSISTANCE CHAT KNOWLEDGE MATCHER
 * Phase 4, Milestone 2: Intent-Matching Engine
 * 
 * Lightweight, deterministic intent-matching engine that resolves visitor questions
 * to verified Hotel Amil knowledge entries from src/data/virtualAssistanceKnowledge.js.
 * 
 * Resolution Order:
 * - Tier 1: Exact Quick Actions (Preserves 6 core website navigation actions)
 * - Tier 2: Specific Knowledge Queries (Rooms, Tariffs, Dining, Pool, Events, Policies, Contact)
 * - Tier 3: General Knowledge Categories (Overview intents)
 * - Tier 4: Safe Fallback (No hallucination, handles live availability & unsupported queries)
 */

import { VIRTUAL_ASSISTANCE_KNOWLEDGE } from '../data/virtualAssistanceKnowledge.js';

// Number words to digits mapping for quantity normalization
const NUMBER_WORDS = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
};

// Common English stopwords to ignore during keyword token scoring
const STOPWORDS = new Set([
  'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'can', 'could', 'should', 'would', 'will',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'our', 'their', 'this', 'that', 'these', 'those',
  'what', 'which', 'who', 'whom', 'when', 'why', 'how',
  'tell', 'show', 'give', 'please', 'about', 'there', 'any'
]);

/**
 * Normalizes input text: lowercases, cleans punctuation, collapses whitespace,
 * and converts spelled-out number words (e.g. "six" -> "6").
 * @param {string} text
 * @returns {string}
 */
export const normalizeQuery = (text) => {
  if (!text || typeof text !== 'string') return '';
  const cleaned = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/[\-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return '';

  const tokens = cleaned.split(' ').map((t) => NUMBER_WORDS[t] || t);
  return tokens.join(' ');
};

/**
 * Lightweight English stemmer/lemmatizer for singular/plural forms.
 * @param {string} word
 * @returns {string}
 */
export const lemmatize = (word) => {
  if (!word || word.length <= 3) return word;
  if (word === 'children' || word === 'kids') return 'child';
  if (word === 'men' || word === 'people' || word === 'guests') return 'guest';
  if (word === 'swimming') return 'swim';
  if (word === 'pricing' || word === 'prices') return 'price';
  if (word === 'tariffs') return 'tariff';
  if (word === 'enquiries' || word === 'inquiries') return 'enquiry';
  if (word === 'rooms') return 'room';
  if (word === 'suites') return 'suite';
  if (word === 'beds') return 'bed';
  if (word === 'timings') return 'timing';
  if (word === 'policies') return 'policy';
  if (word === 'facilities') return 'facility';
  if (word === 'amenities') return 'amenity';
  if (word === 'receptions') return 'reception';
  if (word === 'weddings') return 'wedding';
  if (word === 'meetings') return 'meeting';
  if (word === 'conferences') return 'conference';
  if (word === 'birthdays') return 'birthday';
  if (word === 'celebrations') return 'celebration';
  if (word === 'directions') return 'direction';
  if (word === 'numbers') return 'number';
  if (word === 'dishes') return 'dish';
  if (word === 'dogs') return 'dog';
  if (word === 'cats') return 'cat';
  if (word === 'pets') return 'pet';

  if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.endsWith('es') && (word.endsWith('shes') || word.endsWith('ches') || word.endsWith('xes'))) {
    return word.slice(0, -2);
  }
  if (word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('us')) {
    return word.slice(0, -1);
  }
  return word;
};

// ─────────────────────────────────────────────────────────────
// TIER 1: EXACT QUICK ACTION DEFINITIONS
// ─────────────────────────────────────────────────────────────
const TIER_1_QUICK_ACTIONS = [
  {
    labels: ['explore rooms', 'rooms'],
    targetId: 'rooms-overview',
    reason: 'Tier 1: Explore Rooms Quick Action'
  },
  {
    labels: ['restaurant & dining', 'restaurant and dining', 'dining & menus', 'dining and menus', 'dining'],
    targetId: 'dining-overview',
    reason: 'Tier 1: Restaurant & Dining Quick Action'
  },
  {
    labels: ['hotel facilities', 'facilities & services', 'facilities and services', 'facilities', 'amenities'],
    targetId: 'amenities-overview',
    reason: 'Tier 1: Hotel Facilities Quick Action'
  },
  {
    labels: ['events & celebrations', 'events and celebrations', 'events'],
    targetId: 'events-overview',
    reason: 'Tier 1: Events & Celebrations Quick Action'
  },
  {
    labels: ['booking enquiries', 'booking inquiries', 'booking inquiry', 'booking'],
    targetId: 'booking-process',
    reason: 'Tier 1: Booking Enquiries Quick Action'
  },
  {
    labels: ['location & contact', 'location and contact', 'location', 'contact'],
    targetId: 'location-address',
    reason: 'Tier 1: Location & Contact Quick Action'
  }
];

// ─────────────────────────────────────────────────────────────
// TIER 2: SPECIFIC ENTITY / INTENT TRIGGER RULES
// ─────────────────────────────────────────────────────────────
const ENTITY_TRIGGERS = [
  // Specific Room Categories
  {
    id: 'room-executive',
    triggers: ['executive room', 'executive', 'king room', 'business room', 'workstation room'],
    excludeIf: ['twin', 'suite', 'family']
  },
  {
    id: 'room-twin-executive',
    triggers: ['twin executive room', 'twin executive', 'twin room', 'twin bed', 'twin beds', '2 twin beds', 'two beds', 'separate beds', 'colleagues room']
  },
  {
    id: 'room-deluxe-suite',
    triggers: ['deluxe suite', 'deluxe room', 'suite with balcony', 'balcony', 'soaking tub', 'bathtub', 'penthouse suite', 'penthouse'],
    excludeIf: ['family']
  },
  {
    id: 'room-family-suite',
    triggers: [
      'family suite', 'grand family suite', 'family room', 'interconnected', 'two bedroom',
      '6 people', '6 guests', 'six people', 'six guests', 'suite for 6', 'large suite', 'family'
    ]
  },

  // Room Tariffs & Specifications
  {
    id: 'tariffs-comparison',
    triggers: ['tariff', 'tariffs', 'room price', 'room prices', 'room rate', 'room rates', 'cost per night', 'price per night', 'how much for room', 'pricing', 'room cost']
  },
  {
    id: 'in-room-amenities',
    triggers: ['room amenities', 'in room amenities', 'room facilities', 'smart tv', 'television', 'air conditioning', 'ac in room', 'hot water', 'kettle', 'coffee maker']
  },
  {
    id: 'wifi-internet',
    triggers: ['wifi', 'wi fi', 'internet', 'fiber', 'broadband', 'wireless internet', 'free wifi']
  },
  {
    id: 'room-sizes-occupancy',
    triggers: ['room size', 'room sizes', 'square feet', 'sq ft', 'how big', 'dimensions', 'occupancy', 'extra bed', 'extra person', 'bed type', 'max guests']
  },

  // Restaurants & Dining
  {
    id: 'saffron-restaurant',
    triggers: ['saffron restaurant', 'saffron', 'fine dining', 'biryani', 'chettinad', 'mutton biryani', 'chettinad chicken', 'virudhunagar biryani', 'where is the restaurant', 'where is restaurant']
  },
  {
    id: 'amil-cafe',
    triggers: ['amil cafe', 'cafe', 'coffee', 'filter coffee', 'filter kaapi', 'espresso', 'croissant', 'pastries', 'midnight food', 'late night food', '24 hour cafe', 'where is the cafe', 'where is cafe']
  },
  {
    id: 'dining-timings',
    triggers: [
      'restaurant timing', 'restaurant timings', 'dining hours',
      'breakfast time', 'breakfast timing', 'breakfast timings',
      'lunch time', 'lunch timing', 'lunch timings',
      'dinner time', 'dinner timing', 'dinner timings',
      'when is breakfast', 'when is lunch', 'when is dinner',
      'have lunch', 'have dinner'
    ]
  },
  {
    id: 'vegetarian-jain-diet',
    triggers: ['jain', 'jain food', 'pure veg', 'pure vegetarian', 'veg thali', 'vegetarian food', 'serve jain', 'serve vegetarian']
  },
  {
    id: 'in-room-dining',
    triggers: ['in room dining', 'room service', 'order food to room', 'food to room', 'food in room', 'order food in room', 'order food']
  },

  // Recreation & Facilities
  {
    id: 'swimming-pool',
    triggers: [
      'swimming pool', 'pool', 'azure pool', 'swim',
      'pool timing', 'pool timings', 'kids pool',
      'swimwear', 'swimwear compulsory', 'pool rules',
      'swimming pool open', 'where is the pool', 'where is pool'
    ]
  },
  {
    id: 'amil-bar',
    triggers: [
      'amil bar', 'bar', 'lounge', 'cocktail', 'cocktails',
      'single malt', 'whiskey', 'beer', 'wine', 'alcohol', 'spirits',
      'bar timing', 'where is the bar', 'where is bar'
    ]
  },
  {
    id: 'parking-facility',
    triggers: ['parking', 'car parking', 'bus parking', 'valet', 'valet parking', 'driver room', 'chauffeur', 'valet parking available']
  },
  {
    id: 'ev-charging-infrastructure',
    triggers: ['ev charging', 'electric vehicle', 'charging station', 'power backup', 'generator', 'dg set', 'electricity backup']
  },

  // Events & Banquets
  {
    id: 'events-wedding',
    triggers: ['wedding', 'marriage', 'reception', 'wedding hall', 'marriage hall', 'engagement', 'kalyana mandapam', 'kalyana sappadu', 'wedding venue']
  },
  {
    id: 'events-corporate',
    triggers: ['corporate', 'conference', 'seminar', 'boardroom', 'bank meet', 'dealer meet', 'workshop', 'corporate meeting', 'business meeting']
  },
  {
    id: 'events-baby-shower',
    triggers: ['baby shower', 'seemantham', 'valaikappu', 'cradle ceremony', 'naming ceremony']
  },
  {
    id: 'events-parties',
    triggers: ['birthday', 'birthday party', 'milestone celebration', 'anniversary party', 'family party', 'birthday celebration']
  },
  {
    id: 'events-candlelight',
    triggers: ['candlelight', 'candlelight dinner', 'romantic dinner', 'couple dinner', 'anniversary dinner', 'proposal', 'dinner for 2', 'dinner for two']
  },
  {
    id: 'events-overview',
    triggers: ['banquet hall', 'banquet', 'convention hall', 'how many people can your banquet hall accommodate', 'hall capacity', 'banquet capacity']
  },

  // Hotel Policies
  {
    id: 'policy-checkin-checkout',
    triggers: [
      'check in', 'check out', 'checkin', 'checkout',
      'check in time', 'check out time', 'early check in', 'late check out',
      'identification', 'id proof', 'id card', 'aadhaar', 'passport',
      'what identification'
    ]
  },
  {
    id: 'policy-cancellation',
    triggers: ['cancellation', 'cancel booking', 'cancel my booking', 'cancellation policy', 'refund', 'refund policy', 'modify booking']
  },
  {
    id: 'policy-pets',
    triggers: ['pet', 'pets', 'dog', 'dogs', 'cat', 'cats', 'animal', 'pet friendly', 'pets allowed', 'are pets allowed', 'allow pets']
  },
  {
    id: 'policy-visitors-liquor',
    triggers: ['visitor policy', 'visitors', 'outside guests', 'drinking policy', 'liquor policy', 'alcohol policy']
  },

  // Location & Contact
  {
    id: 'location-address',
    triggers: [
      'where is hotel amil', 'hotel address', 'location of hotel amil',
      'how do i reach hotel amil', 'how to reach hotel amil',
      'directions to the hotel', 'directions', 'pincode', 'where are you located'
    ]
  },
  {
    id: 'contact-details',
    triggers: [
      'phone number', 'hotel phone number', 'telephone', 'mobile',
      'call hotel', 'contact reservations', 'how can i contact',
      'contact details', 'front desk phone'
    ]
  },
  {
    id: 'whatsapp-concierge',
    triggers: ['whatsapp', 'whatsapp number', 'chat on whatsapp', 'whatsapp concierge']
  }
];

// ─────────────────────────────────────────────────────────────
// TIER 4: UNSUPPORTED TOPICS & LIVE VACANCY DETECTORS
// ─────────────────────────────────────────────────────────────
const isLiveAvailabilityQuery = (normalized) => {
  const hasLiveTiming = /\b(tonight|today|now|right now|tomorrow|at the moment)\b/.test(normalized);
  const hasAvailability = /\b(available|availability|vacant|vacancy|free room|book for tonight)\b/.test(normalized);
  return hasLiveTiming && hasAvailability;
};

const UNSUPPORTED_TOPICS = [
  /\b(bicycle|bike|cycle|cycling|rent a car|car rental)\b/,
  /\b(weather|temperature|forecast|rain|climate today)\b/,
  /\b(flight|flights|airline|airlines|train ticket|railway ticket)\b/,
  /\b(massage|spa|salon|gym|fitness center)\b/
];

const isUnsupportedQuery = (normalized) => {
  return UNSUPPORTED_TOPICS.some((regex) => regex.test(normalized));
};

/**
 * Main intent-matching engine function.
 * Matches a user text query against the 35 verified Hotel Amil knowledge entries.
 * 
 * @param {string} query
 * @returns {object} Formatted match result adhering to Step 5 specification
 */
export const matchKnowledge = (query) => {
  // Safe Fallback for empty or non-string queries
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return {
      matched: false,
      entryId: null,
      category: null,
      answer: null,
      actionButton: null,
      destination: null,
      confidence: 0,
      matchReason: 'Empty query'
    };
  }

  const normalized = normalizeQuery(query);
  const rawLower = query.toLowerCase().trim();

  // Tier 4 Pre-check: Live Room Availability queries
  if (isLiveAvailabilityQuery(normalized)) {
    return {
      matched: false,
      entryId: null,
      category: null,
      answer: null,
      actionButton: null,
      destination: null,
      confidence: 0,
      matchReason: 'Live room availability cannot be verified client-side'
    };
  }

  // Tier 4 Pre-check: Unsupported out-of-scope topics
  if (isUnsupportedQuery(normalized)) {
    return {
      matched: false,
      entryId: null,
      category: null,
      answer: null,
      actionButton: null,
      destination: null,
      confidence: 0,
      matchReason: 'Query refers to an unsupported service or out-of-scope topic'
    };
  }

  // ───────────────────────────────────────────────────────────
  // TIER 1: EXACT QUICK ACTION MATCHING
  // ───────────────────────────────────────────────────────────
  for (const qa of TIER_1_QUICK_ACTIONS) {
    if (qa.labels.includes(rawLower) || qa.labels.includes(normalized)) {
      const entry = VIRTUAL_ASSISTANCE_KNOWLEDGE.find((e) => e.id === qa.targetId);
      if (entry) {
        return {
          matched: true,
          entryId: entry.id,
          category: entry.category,
          answer: entry.answer,
          actionButton: entry.actionButton || null,
          destination: entry.destination || null,
          confidence: 1.0,
          matchReason: qa.reason
        };
      }
    }
  }

  // Tokenize and lemmatize non-stopword query tokens
  const queryTokens = normalized.split(' ').filter((t) => t.length > 0);
  const meaningfulTokens = queryTokens.filter((t) => !STOPWORDS.has(t));
  const lemmatizedMeaningfulTokens = meaningfulTokens.map((t) => lemmatize(t));

  // ───────────────────────────────────────────────────────────
  // SCORING KNOWLEDGE ENTRIES (TIER 2 & TIER 3)
  // ───────────────────────────────────────────────────────────
  const scoredEntries = [];

  for (const entry of VIRTUAL_ASSISTANCE_KNOWLEDGE) {
    let score = 0;
    const matchReasons = [];

    // 1. Negative keywords exclusion
    if (entry.negativeKeywords && Array.isArray(entry.negativeKeywords)) {
      const isDisqualified = entry.negativeKeywords.some((neg) => {
        const normNeg = normalizeQuery(neg);
        return (
          normalized.includes(normNeg) ||
          meaningfulTokens.includes(normNeg) ||
          lemmatizedMeaningfulTokens.includes(normNeg)
        );
      });
      if (isDisqualified) {
        continue; // Exclude entry from consideration
      }
    }

    // 2. Specific Entity Trigger evaluation (Tier 2 boost)
    const entityDef = ENTITY_TRIGGERS.find((et) => et.id === entry.id);
    if (entityDef) {
      if (entityDef.excludeIf && entityDef.excludeIf.some((ex) => normalized.includes(ex))) {
        // Excluded by entity definition rule
      } else {
        for (const trigger of entityDef.triggers) {
          const normTrigger = normalizeQuery(trigger);
          if (normalized.includes(normTrigger)) {
            const triggerLength = normTrigger.split(' ').length;
            const boost = 25 + triggerLength * 5;
            score += boost;
            matchReasons.push(`Entity trigger: "${trigger}" (+${boost})`);
            break;
          }
        }
      }
    }

    // 3. Exact phrase match against entry.keywords
    if (entry.keywords && Array.isArray(entry.keywords)) {
      for (const kw of entry.keywords) {
        const normKw = normalizeQuery(kw);
        if (normKw && normalized.includes(normKw)) {
          const kwWords = normKw.split(' ').length;
          const phraseScore = kwWords > 1 ? 14 + kwWords * 6 : 8;
          score += phraseScore;
          matchReasons.push(`Keyword phrase: "${kw}" (+${phraseScore})`);
        }
      }
    }

    // 4. Token overlap matching against keywords
    const entryKeywordTokens = new Set();
    if (entry.keywords) {
      for (const kw of entry.keywords) {
        const tokens = normalizeQuery(kw).split(' ');
        for (const t of tokens) {
          if (t && !STOPWORDS.has(t)) {
            entryKeywordTokens.add(t);
            entryKeywordTokens.add(lemmatize(t));
          }
        }
      }
    }

    let tokenMatchCount = 0;
    for (let i = 0; i < meaningfulTokens.length; i++) {
      const rawToken = meaningfulTokens[i];
      const lemmaToken = lemmatizedMeaningfulTokens[i];
      if (entryKeywordTokens.has(rawToken) || entryKeywordTokens.has(lemmaToken)) {
        tokenMatchCount++;
      }
    }

    if (tokenMatchCount > 0) {
      const tokenScore = tokenMatchCount * 4;
      score += tokenScore;
      matchReasons.push(`Token matches: ${tokenMatchCount} (+${tokenScore})`);
    }

    // 5. Entry Priority weight
    const priorityScore = (entry.priority || 50) * 0.1;
    score += priorityScore;

    if (score > 10) {
      scoredEntries.push({
        entry,
        score,
        baseScore: score - priorityScore,
        matchReasons
      });
    }
  }

  // Sort candidates by score descending
  scoredEntries.sort((a, b) => b.score - a.score);

  // ───────────────────────────────────────────────────────────
  // TIER 4: FALLBACK EVALUATION
  // ───────────────────────────────────────────────────────────
  if (scoredEntries.length === 0 || scoredEntries[0].baseScore < 6) {
    return {
      matched: false,
      entryId: null,
      category: null,
      answer: null,
      actionButton: null,
      destination: null,
      confidence: 0,
      matchReason: 'No confident knowledge base match found'
    };
  }

  const bestCandidate = scoredEntries[0];
  const { entry, score, baseScore, matchReasons } = bestCandidate;

  // Calculate calibrated confidence
  let confidence = 0.5;
  if (baseScore >= 30) {
    confidence = 0.95;
  } else if (baseScore >= 20) {
    confidence = 0.88;
  } else if (baseScore >= 12) {
    confidence = 0.78;
  } else if (baseScore >= 6) {
    confidence = 0.65;
  }

  const matchReasonText = matchReasons.length > 0
    ? matchReasons.slice(0, 2).join('; ')
    : `Scored match (${score.toFixed(1)} pts)`;

  return {
    matched: true,
    entryId: entry.id,
    category: entry.category,
    answer: entry.answer,
    actionButton: entry.actionButton || null,
    destination: entry.destination || null,
    confidence: Number(confidence.toFixed(2)),
    matchReason: matchReasonText
  };
};
