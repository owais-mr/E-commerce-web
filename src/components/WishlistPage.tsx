import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">My Wishlist</h2>
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-700 mb-2">Your wishlist is empty</h3>
          <p className="text-slate-500 mb-6">Save items you like to your wishlist and review them anytime.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">My Wishlist ({items.length})</h2>
        <button
          onClick={clearWishlist}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors"
                title="Remove from wishlist"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 
                className="text-lg font-semibold mb-2 hover:text-amber-600 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.name}
              </h3>
              
              <div className="flex justify-between items-center mb-4">
                <div className="text-amber-600 font-bold">
                  ${product.price}
                  {product.originalPrice && (
                    <span className="text-slate-500 line-through ml-2 text-sm">${product.originalPrice}</span>
                  )}
                </div>
                <div className="text-sm text-slate-500">{product.category}</div>
              </div>
              
              <button
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className={`w-full py-2 rounded-lg font-medium flex items-center justify-center space-x-2 ${product.inStock ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;