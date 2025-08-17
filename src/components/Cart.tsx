import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shopping Cart ({items.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
              title="Close Cart"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Your cart is empty</h3>
                <p className="text-slate-500">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 bg-slate-50 p-4 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800 mb-1">{item.product.name}</h3>
                      <p className="text-amber-600 font-semibold">${item.product.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 rounded-full bg-slate-100 hover:bg-amber-400 hover:text-white transition-colors duration-200"
                        title="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 rounded-full bg-slate-100 hover:bg-amber-400 hover:text-white transition-colors duration-200"
                        title="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white transition-colors duration-200"
                      title="Remove from cart"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-amber-600">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <button
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => { onClose(); navigate('/checkout'); }}
                >
                  Checkout
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full border border-slate-300 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;