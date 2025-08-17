import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      showToast('Please log in to add items to your cart');
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  const handleViewDetails = () => {
    onViewDetails(product);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer" onClick={handleViewDetails}>
      <div className="relative overflow-hidden rounded-t-2xl">
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Sale
          </div>
        )}
        {product.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Featured
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 rounded-t-2xl">
            <span className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-2xl">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleViewDetails}
              className="bg-white text-slate-900 p-3 rounded-full shadow-lg hover:bg-amber-500 hover:text-white transition-colors duration-200"
              title="View details"
              aria-label="View details"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200">
            {product.name}
          </h3>
        </div>
        
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-600 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-slate-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            title="Add to cart"
            aria-label="Add to cart"
            className={`p-3 rounded-full transition-all duration-200 ${
              product.inStock
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-110'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;