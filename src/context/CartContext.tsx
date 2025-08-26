import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartContextType, CartItem, Product } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

interface Coupon {
  code: string;
  discountPercent: number;
  isValid: boolean;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart items from localStorage on initial render
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
  
  const [coupon, setCoupon] = useState<Coupon | null>(() => {
    try {
      const savedCoupon = localStorage.getItem('cartCoupon');
      return savedCoupon ? JSON.parse(savedCoupon) : null;
    } catch (error) {
      console.error('Error loading coupon from localStorage:', error);
      return null;
    }
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);
  
  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem('cartCoupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('cartCoupon');
      }
    } catch (error) {
      console.error('Error saving coupon to localStorage:', error);
    }
  }, [coupon]);

  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const applyCoupon = (code: string) => {
    // In a real app, this would validate against a backend API
    const validCoupons = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'SPECIAL50': 50
    };
    
    if (code in validCoupons) {
      setCoupon({
        code,
        discountPercent: validCoupons[code as keyof typeof validCoupons],
        isValid: true
      });
      return true;
    } else {
      return false;
    }
  };
  
  const removeCoupon = () => {
    setCoupon(null);
  };
  
  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };
  
  const getDiscountAmount = () => {
    if (!coupon) return 0;
    return (getSubtotal() * coupon.discountPercent) / 100;
  };
  
  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    return subtotal - discount;
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSubtotal,
    coupon,
    applyCoupon,
    removeCoupon,
    getDiscountAmount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};