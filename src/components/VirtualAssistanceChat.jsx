import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Minus, X, Bed, Utensils, Waves, Sparkles,
  Calendar, MapPin, Paperclip, Send, ChevronUp, ArrowRight
} from 'lucide-react';
import { matchKnowledge } from '../utils/chatKnowledgeMatcher';

// Structured configuration object for all six intelligent quick actions
const QUICK_ACTION_CONFIG = {
  rooms: {
    id: 'rooms',
    label: 'Explore Rooms',
    icon: Bed,
    response:
      'Hotel Amil offers four room categories: Executive Room starting from ₹3,800, Twin Executive Room starting from ₹4,200, Deluxe Suite starting from ₹5,600, and Grand Family Suite starting from ₹7,500 per night. Explore our accommodations to discover the available room features.',
    actionButton: 'Explore Accommodations →',
    destination: '/rooms',
  },
  dining: {
    id: 'dining',
    label: 'Restaurant & Dining',
    icon: Utensils,
    response:
      'Discover Saffron Restaurant, featuring authentic Tamil cuisine, Virudhunagar biryani, and Chettinad specialties. Breakfast is served from 7:00 AM to 10:30 AM, lunch from 12:30 PM to 3:30 PM, and dinner from 7:00 PM to 11:00 PM. Our 24-Hour Amil Cafe is available throughout the day.',
    actionButton: 'View Dining & Menus →',
    destination: '/dining',
  },
  facilities: {
    id: 'facilities',
    label: 'Hotel Facilities',
    icon: Waves,
    response:
      'Hotel Amil offers a range of facilities, including the Azure Swimming Pool, Saffron Restaurant, 24-Hour Amil Cafe, Amil Lounge & Bar, Royal Amil Banquet Hall, and secure parking facilities.',
    actionButton: 'Explore All Facilities →',
    destination: '/amenities',
  },
  events: {
    id: 'events',
    label: 'Events & Celebrations',
    icon: Sparkles,
    response:
      'Celebrate your special occasions at Hotel Amil. We host weddings, receptions, corporate meetings, Seemantham and baby showers, birthday celebrations, and private romantic dinners. Our event facilities include a banquet hall with a stated maximum capacity of up to 500 guests.',
    actionButton: 'Discover Event Spaces →',
    destination: '/events',
  },
  booking: {
    id: 'booking',
    label: 'Booking Enquiries',
    icon: Calendar,
    response:
      'Planning a stay at Hotel Amil? You can submit a reservation enquiry through our website. Published room tariffs start from ₹3,800 per night. Standard check-in is at 12:00 PM and check-out is at 11:00 AM. Room availability is confirmed by the reservations team.',
    actionButton: 'Open Reservation Form →',
    destination: '/booking',
  },
  contact: {
    id: 'contact',
    label: 'Location & Contact',
    icon: MapPin,
    response:
      'Hotel Amil is located at 120/4, Tenkasi Main Road, Near New Bus Stand, Rajapalayam, Tamil Nadu 626117. You can contact our front desk at +91 78670 94947 or email Info@hotelamil.com.',
    actionButton: 'View Location & Map →',
    destination: '/contact',
  },
};

const QUICK_ACTIONS = [
  QUICK_ACTION_CONFIG.rooms,
  QUICK_ACTION_CONFIG.dining,
  QUICK_ACTION_CONFIG.facilities,
  QUICK_ACTION_CONFIG.events,
  QUICK_ACTION_CONFIG.booking,
  QUICK_ACTION_CONFIG.contact,
];

// Response resolution flow:
// Priority 1: Preserve 6 core quick actions & exact button labels
// Priority 2: Use matchKnowledge(query) for natural-language questions
// Priority 3: Display verified answer & action button on knowledge match
// Priority 4: Safe, helpful fallback for unmatched/live/out-of-scope inquiries
const resolveAssistantResponse = (query) => {
  const q = query.toLowerCase().trim();

  // Priority 1: Exact Quick Action Label matching (Preserves Phase 3 navigation)
  if (q === 'explore rooms') return QUICK_ACTION_CONFIG.rooms;
  if (q === 'restaurant & dining' || q === 'restaurant and dining') return QUICK_ACTION_CONFIG.dining;
  if (q === 'hotel facilities') return QUICK_ACTION_CONFIG.facilities;
  if (q === 'events & celebrations' || q === 'events and celebrations') return QUICK_ACTION_CONFIG.events;
  if (q === 'booking enquiries' || q === 'booking inquiries') return QUICK_ACTION_CONFIG.booking;
  if (q === 'location & contact' || q === 'location and contact') return QUICK_ACTION_CONFIG.contact;

  // Priority 2: Natural-Language Question Matching via Knowledge Base Engine
  const matchResult = matchKnowledge(query);

  // Priority 3: Valid Knowledge Base Match
  if (matchResult && matchResult.matched && matchResult.answer) {
    return {
      response: matchResult.answer,
      actionButton: matchResult.actionButton || null,
      destination: matchResult.destination || null,
    };
  }

  // Priority 4: Safe Fallback (No hallucination, factual protection)
  // Specific fallback for real-time room availability inquiries
  if (matchResult && matchResult.matchReason && matchResult.matchReason.toLowerCase().includes('availability')) {
    return {
      response:
        'Room availability is subject to real-time verification by our reservations desk. Please submit your preferred dates via our online booking enquiry form or call our reception directly at +91 4563 233600 / +91 78670 94947 for immediate vocal confirmation.',
      actionButton: 'Open Reservation Form →',
      destination: '/booking',
    };
  }

  // Specific fallback for out-of-scope / unsupported services (e.g. bicycle rental, weather, flights)
  if (matchResult && matchResult.matchReason && matchResult.matchReason.toLowerCase().includes('unsupported')) {
    return {
      response:
        'Hotel Amil does not offer or maintain verified details for that specific request. For personalized travel assistance or special arrangements in Rajapalayam, our 24-hour concierge team will be delighted to assist you directly.',
      actionButton: 'Contact Concierge Desk →',
      destination: '/contact',
    };
  }

  // General safe fallback
  return {
    response:
      'Thank you for your enquiry. I do not have verified details on that specific topic at the moment. You may explore our accommodations, dining, and facilities using the quick actions, or contact our 24-hour front desk directly for personal assistance.',
    actionButton: 'Contact Concierge Desk →',
    destination: '/contact',
  };
};

export const VirtualAssistanceChat = ({ chatState, setChatState }) => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);
  const responseTimerRef = useRef(null);

  // Initial welcome message time
  const [welcomeTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  // Clean up pending response timers when component unmounts
  useEffect(() => {
    return () => {
      if (responseTimerRef.current) {
        clearTimeout(responseTimerRef.current);
      }
    };
  }, []);

  // Conversation session lifecycle:
  // - Closing chat ends the session and resets conversation state.
  // - Reopening starts a fresh session with the Vannakkam greeting.
  // - Minimizing preserves all messages in memory.
  useEffect(() => {
    if (chatState === 'closed') {
      if (responseTimerRef.current) {
        clearTimeout(responseTimerRef.current);
        responseTimerRef.current = null;
      }
      setIsTyping(false);
      setMessages([]);
      setInputText('');
    }
  }, [chatState]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && chatState === 'open') {
        setChatState('closed');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chatState, setChatState]);

  // Handle click outside to close chat
  useEffect(() => {
    if (chatState !== 'open') return;

    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        const buttonEl = document.querySelector('[aria-label="AMIL Virtual Assistance"]');
        if (buttonEl && buttonEl.contains(e.target)) return;
        setChatState('closed');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [chatState, setChatState]);

  // Auto-scroll when messages update, when typing indicator changes, or when chat restores
  useEffect(() => {
    if (chatState === 'open') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, chatState]);

  // Queue an assistant response with natural typing delay
  const queueAssistantResponse = (userQuery) => {
    if (responseTimerRef.current) {
      clearTimeout(responseTimerRef.current);
    }

    setIsTyping(true);

    // Natural demonstration delay of approx 850–1100ms
    const delay = 850 + Math.floor(Math.random() * 250);

    responseTimerRef.current = setTimeout(() => {
      const resolved = resolveAssistantResponse(userQuery);
      const assistantMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: resolved.response,
        actionButton: resolved.actionButton,
        destination: resolved.destination,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      responseTimerRef.current = null;
    }, delay);
  };

  // Handle user message submission
  const handleSendMessage = (e) => {
    e?.preventDefault();
    const text = inputText.trim();
    if (!text || isTyping) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    queueAssistantResponse(text);
  };

  // Handle Enter key submission and prevent Shift+Enter
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!e.shiftKey) {
        handleSendMessage();
      }
    }
  };

  // Handle quick action button click
  const handleQuickAction = (label) => {
    if (isTyping) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: label,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    queueAssistantResponse(label);
  };

  // Handle in-chat interactive navigation action
  const handleNavigate = (destination) => {
    if (!destination) return;
    navigate(destination);
  };

  return (
    <>
      {/* ── MINIMIZED FLOATING PILL ── */}
      <AnimatePresence>
        {chatState === 'minimized' && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setChatState('open')}
            role="button"
            tabIndex={0}
            aria-label="Restore Virtual Assistance Chat"
            className="fixed bottom-[160px] min-[375px]:bottom-[180px] sm:bottom-[196px] right-3 min-[375px]:right-4 sm:right-6 z-50 bg-[#762020] text-white px-3 py-1.5 min-[375px]:px-3.5 min-[375px]:py-2 rounded-full shadow-elevated border border-white/20 flex items-center space-x-2.5 cursor-pointer hover:bg-[#5E1818] transition-all select-none group focus:outline-none focus:ring-2 focus:ring-[#762020]/50"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-sans font-medium tracking-wide">AMIL Assistant</span>
            <ChevronUp className="w-3.5 h-3.5 text-white/80 group-hover:-translate-y-0.5 transition-transform" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CHAT WINDOW (Compact floating overlay) ── */}
      <AnimatePresence>
        {chatState === 'open' && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="virtual-assistance-title"
            className={`
              fixed z-50 flex flex-col overflow-hidden bg-[#FAF7F2] border border-[#E8DEC8] shadow-2xl rounded-2xl
              /* Mobile: Floating compact bottom-right overlay positioned above floating buttons */
              bottom-[160px] min-[375px]:bottom-[180px] right-3 min-[375px]:right-4
              w-[calc(100vw-24px)] max-w-[325px] min-[390px]:max-w-[340px]
              max-h-[calc(100vh-175px)] min-[375px]:max-h-[calc(100vh-195px)]
              /* Tablet & Desktop: Floating bottom-right panel (Preserved) */
              sm:inset-auto sm:bottom-28 sm:right-6 sm:w-[390px] lg:w-[420px] sm:h-[540px] lg:h-[570px] sm:max-h-[82vh] sm:max-w-none sm:rounded-2xl
            `}
          >
            {/* ── HEADER ── */}
            <div className="bg-[#762020] text-white px-3 py-2 min-[375px]:px-3.5 min-[375px]:py-2.5 sm:px-4.5 sm:py-3.5 flex items-center justify-between border-b border-white/10 shrink-0 select-none">
              {/* Left: Hotel Amil Branding Logo */}
              <div className="flex items-center space-x-2">
                <img
                  src="/images/brand/hotel-amil-logo-reversed.svg"
                  alt="Hotel Amil"
                  className="h-7 min-[375px]:h-8 sm:h-9 w-auto object-contain pointer-events-none"
                />
                <div className="border-l border-white/20 pl-2">
                  <h2
                    id="virtual-assistance-title"
                    className="text-[10px] min-[375px]:text-[11px] sm:text-xs font-sans font-bold tracking-luxury uppercase text-white leading-tight"
                  >
                    VIRTUAL ASSISTANCE
                  </h2>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 min-[375px]:w-2 min-[375px]:w-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span className="text-[9px] min-[375px]:text-[10px] font-sans text-white/85">Online</span>
                  </div>
                </div>
              </div>

              {/* Right: Window Controls */}
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setChatState('minimized')}
                  aria-label="Minimize Chat Window"
                  className="w-6 h-6 min-[375px]:w-7 min-[375px]:h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all"
                >
                  <Minus className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setChatState('closed')}
                  aria-label="Close Chat Window"
                  className="w-6 h-6 min-[375px]:w-7 min-[375px]:h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all"
                >
                  <X className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4" />
                </button>
              </div>
            </div>

            {/* ── CHAT BODY: Scrollable Message Area ── */}
            <div className="flex-1 overflow-y-auto p-2.5 min-[375px]:p-3 sm:p-4 space-y-2.5 min-[375px]:space-y-3 bg-[#FAF7F2] overscroll-contain">
              {/* Assistant Welcome Card (Exact Vannakkam greeting) */}
              <div className="flex items-start space-x-2">
                {/* Avatar */}
                <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-full bg-[#762020] flex items-center justify-center shrink-0 shadow-xs border border-white/30 p-1 mt-0.5">
                  <img
                    src="/images/brand/crest-watermark.svg"
                    alt="Assistant Avatar"
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>

                {/* Message Bubble */}
                <div className="flex-1 max-w-[90%] bg-white border border-[#E8DEC8] rounded-2xl rounded-tl-sm p-2.5 min-[375px]:p-3 shadow-xs">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-sans font-semibold text-[#762020] uppercase tracking-wider">
                      Demo Concierge
                    </span>
                    <span className="text-[8.5px] min-[375px]:text-[9px] font-sans text-text-muted/70">
                      {welcomeTime}
                    </span>
                  </div>
                  <p className="text-[10.5px] min-[375px]:text-[11.5px] sm:text-xs font-sans text-charcoal/90 leading-relaxed">
                    Vannakkam! Welcome to Hotel Amil. How may I assist you today?
                  </p>
                </div>
              </div>

              {/* Quick-Action Interface (Two-column grid arrangement) */}
              <div className="w-full">
                <div className="grid grid-cols-2 gap-1.5 min-[375px]:gap-2">
                  {QUICK_ACTIONS.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleQuickAction(action.label)}
                        disabled={isTyping}
                        className={`w-full flex items-center space-x-1.5 px-2 py-1.5 min-[375px]:py-2 bg-white hover:bg-[#FBF8F3] active:bg-[#F4EFEA] border border-[#E8DEC8] hover:border-[#762020]/40 rounded-xl shadow-xs transition-all text-left group min-h-[34px] min-[375px]:min-h-[36px] ${
                          isTyping ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5 text-[#762020] shrink-0 transition-transform group-hover:scale-110" />
                        <span className="text-[9.5px] min-[360px]:text-[10px] min-[390px]:text-[11px] font-sans font-medium text-[#762020] leading-tight truncate">
                          {action.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Conversation Messages (User & Assistant) */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-full bg-[#762020] flex items-center justify-center shrink-0 shadow-xs border border-white/30 p-1 mt-0.5">
                      <img
                        src="/images/brand/crest-watermark.svg"
                        alt="Assistant Avatar"
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-2.5 min-[375px]:p-3 text-[11px] min-[375px]:text-xs font-sans leading-relaxed shadow-xs max-w-[85%] break-words whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-[#762020] text-white rounded-tr-xs ml-auto'
                        : 'bg-white border border-[#E8DEC8] text-charcoal rounded-tl-xs'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <span className="block text-[8.5px] font-sans font-semibold text-[#762020] uppercase tracking-wider mb-1">
                        Demo Concierge
                      </span>
                    )}
                    <p>{msg.text}</p>

                    {/* Interactive Action Button for Assistant Messages */}
                    {msg.sender === 'assistant' && msg.actionButton && msg.destination && (
                      <div className="mt-2.5 pt-2 border-t border-[#E8DEC8]/80">
                        <button
                          type="button"
                          onClick={() => handleNavigate(msg.destination)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 min-[375px]:py-2 bg-[#762020] hover:bg-[#5E1818] active:bg-[#4D1313] text-white text-[10px] min-[375px]:text-[11px] font-sans font-medium rounded-xl shadow-xs transition-all duration-200 cursor-pointer group active:scale-[0.98] select-none"
                        >
                          <span>{msg.actionButton.replace(/\s*→$/, '')}</span>
                          <span className="sr-only"> →</span>
                          <ArrowRight className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" aria-hidden="true" />
                        </button>
                      </div>
                    )}

                    <span
                      className={`block text-[8.5px] min-[375px]:text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-text-muted/70'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Animated Three-Dot Assistant Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-2 justify-start">
                  <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-full bg-[#762020] flex items-center justify-center shrink-0 shadow-xs border border-white/30 p-1 mt-0.5">
                    <img
                      src="/images/brand/crest-watermark.svg"
                      alt="Assistant Avatar"
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div className="bg-white border border-[#E8DEC8] rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#762020] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#762020] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#762020] animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── INPUT AREA ── */}
            <form
              onSubmit={handleSendMessage}
              className="p-2 min-[375px]:p-2.5 sm:p-3 bg-white border-t border-[#E8DEC8] flex items-center space-x-1.5 min-[375px]:space-x-2 shrink-0"
            >
              {/* Visual Attachment Icon */}
              <button
                type="button"
                aria-label="Attach File (Visual Only)"
                title="Attach File"
                className="p-1 text-text-muted hover:text-charcoal active:scale-95 transition-all shrink-0 rounded-full"
              >
                <Paperclip className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4" />
              </button>

              {/* Text Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 min-w-0 bg-[#FAF7F2] border border-[#E8DEC8] focus:border-[#762020] focus:bg-white rounded-full px-3 py-1.5 min-[375px]:px-3.5 min-[375px]:py-2 text-[10.5px] min-[375px]:text-xs font-sans text-charcoal placeholder:text-text-muted/60 focus:outline-none transition-colors disabled:opacity-70"
              />

              {/* Circular Send Button */}
              <button
                type="submit"
                aria-label="Send Message"
                disabled={!inputText.trim() || isTyping}
                className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-full bg-[#762020] hover:bg-[#5E1818] disabled:opacity-40 text-white flex items-center justify-center transition-transform active:scale-95 shrink-0 shadow-xs"
              >
                <Send className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 translate-x-px" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VirtualAssistanceChat;
