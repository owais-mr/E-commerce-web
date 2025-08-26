import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface Review {
  id: string;
  productId: string;
  userId: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (productId: string, rating: number, comment: string) => void;
  getProductReviews: (productId: string) => Review[];
  getUserReviews: () => Review[];
  getAverageRating: (productId: string) => number;
  deleteReview: (reviewId: string) => void;
  updateReview: (reviewId: string, rating: number, comment: string) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const savedReviews = localStorage.getItem('productReviews');
      return savedReviews ? JSON.parse(savedReviews) : [];
    } catch (error) {
      console.error('Error loading reviews from localStorage:', error);
      return [];
    }
  });

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('productReviews', JSON.stringify(reviews));
    } catch (error) {
      console.error('Error saving reviews to localStorage:', error);
    }
  }, [reviews]);

  const addReview = (productId: string, rating: number, comment: string) => {
    if (!user) {
      showToast('You must be logged in to leave a review');
      return;
    }

    // Check if user already reviewed this product
    const existingReview = reviews.find(
      (review) => review.productId === productId && review.userId === user.uid
    );

    if (existingReview) {
      showToast('You have already reviewed this product. You can update your review instead.');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      productId,
      userId: user.uid,
      userEmail: user.email || 'Anonymous',
      rating,
      comment,
      date: new Date().toISOString(),
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    showToast('Review added successfully!');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter((review) => review.productId === productId);
  };

  const getUserReviews = () => {
    if (!user) return [];
    return reviews.filter((review) => review.userId === user.uid);
  };

  const getAverageRating = (productId: string) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    
    const sum = productReviews.reduce((total, review) => total + review.rating, 0);
    return sum / productReviews.length;
  };

  const deleteReview = (reviewId: string) => {
    if (!user) {
      showToast('You must be logged in to delete a review');
      return;
    }

    const reviewToDelete = reviews.find((review) => review.id === reviewId);
    
    if (!reviewToDelete) {
      showToast('Review not found');
      return;
    }

    if (reviewToDelete.userId !== user.uid) {
      showToast('You can only delete your own reviews');
      return;
    }

    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    showToast('Review deleted successfully!');
  };

  const updateReview = (reviewId: string, rating: number, comment: string) => {
    if (!user) {
      showToast('You must be logged in to update a review');
      return;
    }

    const reviewToUpdate = reviews.find((review) => review.id === reviewId);
    
    if (!reviewToUpdate) {
      showToast('Review not found');
      return;
    }

    if (reviewToUpdate.userId !== user.uid) {
      showToast('You can only update your own reviews');
      return;
    }

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? { ...review, rating, comment, date: new Date().toISOString() }
          : review
      )
    );
    
    showToast('Review updated successfully!');
  };

  const value: ReviewContextType = {
    reviews,
    addReview,
    getProductReviews,
    getUserReviews,
    getAverageRating,
    deleteReview,
    updateReview,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};