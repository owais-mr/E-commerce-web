import React from 'react';
import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors duration-200"
              title="Close Product Details"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-l-2xl">
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Sale
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-4 right-16 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Featured
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 md:h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {product.name}
                  </h1>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-slate-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                
                <div className="mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button className="p-3 border-2 border-slate-300 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors duration-200" title="Add to Wishlist">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-2">Product Features</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Premium quality materials</li>
                    <li>• Fast and free shipping</li>
                    <li>• 30-day return guarantee</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optionally, keep ProductModal for quick view in the future, but currently not used
export default ProductModal;