import React, { useState } from 'react';
import { useReviews } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { Star, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { getProductReviews, addReview, deleteReview, updateReview, getAverageRating } = useReviews();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>('');

  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in to leave a review');
      return;
    }

    if (comment.trim() === '') {
      showToast('Please enter a comment');
      return;
    }

    addReview(productId, rating, comment);
    setRating(5);
    setComment('');
  };

  const handleEdit = (reviewId: string) => {
    const reviewToEdit = reviews.find(review => review.id === reviewId);
    if (reviewToEdit) {
      setEditingReviewId(reviewId);
      setEditRating(reviewToEdit.rating);
      setEditComment(reviewToEdit.comment);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReviewId && editComment.trim() !== '') {
      updateReview(editingReviewId, editRating, editComment);
      setEditingReviewId(null);
    }
  };

  const handleDelete = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-12 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Average Rating */}
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="ml-2 text-lg font-medium">
          {averageRating.toFixed(1)} out of 5 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
        </span>
      </div>
      
      {/* Review Form */}
      {user && (
        <form onSubmit={handleSubmit} className="mb-8 bg-slate-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-slate-700 mb-2">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={4}
              placeholder="Share your experience with this product..."
            />
          </div>
          
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Submit Review
          </button>
        </form>
      )}
      
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-slate-500 text-center py-4">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-slate-200 pb-6 last:border-0">
              {editingReviewId === review.id ? (
                <form onSubmit={handleUpdate} className="bg-slate-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-slate-700 mb-2">Rating</label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRating(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star className={`w-6 h-6 ${star <= editRating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="editComment" className="block text-slate-700 mb-2">Comment</label>
                    <textarea
                      id="editComment"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingReviewId(null)}
                      className="bg-slate-300 hover:bg-slate-400 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <h4 className="font-medium text-slate-800">{review.userEmail}</h4>
                      <p className="text-sm text-slate-500 mb-2">{formatDate(review.date)}</p>
                    </div>
                    
                    {user && user.uid === review.userId && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(review.id)}
                          className="p-1 text-slate-500 hover:text-amber-500 transition-colors duration-200"
                          title="Edit review"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-1 text-slate-500 hover:text-red-500 transition-colors duration-200"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-slate-700">{review.comment}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;