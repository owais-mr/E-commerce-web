import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { useToast } from './ToastContext';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState<Product[]>(() => {
    // Load wishlist items from localStorage on initial render
    try {
      const savedWishlist = localStorage.getItem('wishlistItems');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  // Save wishlist items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('wishlistItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [items]);

  const addToWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      showToast(`${product.name} is already in your wishlist`);
      return;
    }
    
    setItems(prevItems => [...prevItems, product]);
    showToast(`${product.name} added to wishlist`);
  };

  const removeFromWishlist = (productId: string) => {
    setItems(prevItems => {
      const filteredItems = prevItems.filter(item => item.id !== productId);
      if (filteredItems.length < prevItems.length) {
        showToast('Item removed from wishlist');
      }
      return filteredItems;
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    showToast('Wishlist cleared');
  };

  const value: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};