import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  CONFIRMED_ROOM_RATES,
  CART_STORAGE_KEY,
  calculateItemSubtotal,
  calculateNightsBetween,
  sanitizeCartItem,
} from '../utils/cartPricing';

// Re-export constants and calculations for direct consumer access
export {
  CONFIRMED_ROOM_RATES,
  CART_STORAGE_KEY,
  calculateItemSubtotal,
  calculateNightsBetween,
  sanitizeCartItem,
};

/**
 * Safely load initial cart state from localStorage with full schema recovery.
 */
const loadInitialCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const rawData = localStorage.getItem(CART_STORAGE_KEY);
    if (!rawData) return [];

    const parsed = JSON.parse(rawData);
    if (!Array.isArray(parsed)) {
      console.warn('Malformed cart data in localStorage; resetting to empty array.');
      return [];
    }

    const sanitized = parsed.map(sanitizeCartItem).filter(Boolean);
    return sanitized;
  } catch (error) {
    console.warn('Error reading cart from localStorage (recovering safely):', error);
    return [];
  }
};

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // Sync to localStorage whenever cartItems state changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);


  /**
   * Add a room booking item to the cart.
   * If an item with the identical unique id exists, updates its room count and subtotal.
   * Otherwise appends as a new line item.
   */
  const addToCart = useCallback((itemData) => {
    const sanitized = sanitizeCartItem(itemData);
    if (!sanitized) {
      console.error('Invalid cart item data provided to addToCart:', itemData);
      return;
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === sanitized.id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const newRooms = existing.rooms + sanitized.rooms;
        const newSubtotal = calculateItemSubtotal(existing.ratePerNight, existing.nights, newRooms);

        updated[existingIndex] = {
          ...existing,
          rooms: newRooms,
          subtotal: newSubtotal,
        };
        return updated;
      }

      return [...prevItems, sanitized];
    });
  }, []);

  /**
   * Update the number of rooms for an existing cart item by ID.
   * If newRoomCount <= 0, the item is removed.
   */
  const updateQuantity = useCallback((id, newRoomCount) => {
    setCartItems((prevItems) => {
      const targetCount = Number(newRoomCount);
      if (isNaN(targetCount) || targetCount <= 0) {
        return prevItems.filter((item) => item.id !== id);
      }

      return prevItems.map((item) => {
        if (item.id === id) {
          const rooms = Math.round(targetCount);
          const subtotal = calculateItemSubtotal(item.ratePerNight, item.nights, rooms);
          return {
            ...item,
            rooms,
            subtotal,
          };
        }
        return item;
      });
    });
  }, []);

  /**
   * Remove an item from the cart by its unique ID.
   */
  const removeItem = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  /**
   * Alias for removeItem for API compatibility.
   */
  const removeFromCart = removeItem;

  /**
   * Clear all items from the cart and purge localStorage.
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear cart storage:', error);
    }
  }, []);

  /**
   * Total number of distinct cart line items.
   */
  const totalItems = useMemo(() => {
    return cartItems.length;
  }, [cartItems]);

  /**
   * Total number of room units booked across all items.
   */
  const totalRooms = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.rooms || 0), 0);
  }, [cartItems]);

  /**
   * Total nights across all room items.
   */
  const totalNights = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + ((item.nights || 0) * (item.rooms || 0)), 0);
  }, [cartItems]);

  /**
   * Overall cart subtotal: sum of all item subtotals.
   * Formula: Subtotal = Σ (Rate per night × Number of nights × Number of rooms).
   */
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.subtotal || 0), 0);
  }, [cartItems]);

  // Window event listener and testing bridge for Phase 3.1.2 verification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__HOTEL_AMIL_CART__ = {
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        cartItems,
        isCartOpen,
      };

      const handleOpen = () => openCart();
      const handleClose = () => closeCart();
      window.addEventListener('hotel-amil:open-cart', handleOpen);
      window.addEventListener('hotel-amil:close-cart', handleClose);
      return () => {
        window.removeEventListener('hotel-amil:open-cart', handleOpen);
        window.removeEventListener('hotel-amil:close-cart', handleClose);
      };
    }
  }, [openCart, closeCart, toggleCart, addToCart, updateQuantity, removeItem, clearCart, cartItems, isCartOpen]);

  const value = useMemo(
    () => ({
      cartItems,
      totalItems,
      totalRooms,
      totalNights,
      subtotal,
      addToCart,
      updateQuantity,
      removeItem,
      removeFromCart,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      isDrawerOpen: isCartOpen,
      openDrawer: openCart,
      closeDrawer: closeCart,
      confirmedRates: CONFIRMED_ROOM_RATES,
    }),
    [
      cartItems,
      totalItems,
      totalRooms,
      totalNights,
      subtotal,
      addToCart,
      updateQuantity,
      removeItem,
      removeFromCart,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Custom hook to consume the CartContext safely.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
