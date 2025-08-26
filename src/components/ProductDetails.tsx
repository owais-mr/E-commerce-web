import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProduct } from '../hooks/useProduct';
import { Heart } from 'lucide-react';
import ProductReviews from './ProductReviews';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading, error, refetch } = useProduct(productId);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center py-16 text-xl text-slate-600">Loading product...</div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center py-16">
          <div className="text-2xl text-red-600 mb-4">Error Loading Product</div>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center py-16">
          <div className="text-2xl text-red-600 mb-4">Product Not Found</div>
          <p className="text-slate-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-lg p-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-amber-600 hover:underline">&larr; Back</button>
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="mb-2 text-slate-600">Category: {product.category}</div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold text-slate-900">
              ${product.price}
              {product.originalPrice && (
                <span className="text-slate-500 line-through ml-2">${product.originalPrice}</span>
              )}
            </div>
            <button 
              onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`p-2 rounded-full transition-colors duration-200 ${isInWishlist(product.id) ? 'bg-red-100 text-red-500' : 'bg-slate-100 hover:bg-red-100 hover:text-red-500'}`}
              title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
          <p className="mb-6 text-slate-700">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-slate-600">({product.reviews} reviews)</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${product.inStock ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
            >
              Add to Cart
            </button>
            <button
              onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-red-100'}`}
            >
              {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Product Reviews Section */}
      {product && <ProductReviews productId={product.id} />}
    </div>
  );
};

export default ProductDetails;
