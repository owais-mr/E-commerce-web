import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../hooks/useErrorHandler';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onCartClick }) => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleError } = useErrorHandler();
  const totalItems = getTotalItems();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      handleError(error);
    }
  };

  const navigation = [
    { name: 'Home', href: '/', onClick: () => navigate('/') },
    { name: 'Products', href: '#products', onClick: () => { navigate('/'); setTimeout(() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }, 100); } },
    { name: 'Categories', href: '#categories', onClick: () => { navigate('/'); setTimeout(() => { document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }); }, 100); } },
    { name: 'About', href: '/about', onClick: () => navigate('/about') },
    { name: 'Contact Us', href: '#contact', onClick: () => { 
      navigate('/'); 
      setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 100); 
    } },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button aria-label="Go to home" onClick={() => navigate('/')} className="bg-transparent border-0 p-0 m-0 cursor-pointer">
              <h1 className="text-2xl font-bold text-slate-800">
                Store<span className="text-amber-500">X</span>
              </h1>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={item.onClick}
                className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer no-bg-btn"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/wishlist')}
                  className="text-slate-600 hover:text-red-500 p-2 transition-colors duration-200 border border-slate-300 rounded-lg flex items-center"
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <span className="text-slate-700 font-medium mr-2 cursor-pointer" onClick={() => navigate('/profile')}>Hi, {user?.email || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-red-500 p-2 transition-colors duration-200 border border-slate-300 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-slate-600 hover:text-amber-500 p-2 transition-colors duration-200 border border-slate-300 rounded-lg"
              >
                Login
              </button>
            )}
            <button
              onClick={onCartClick}
              className="relative text-slate-600 hover:text-slate-900 p-2 transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onCartClick}
              className="relative text-slate-600 hover:text-slate-900 p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => { item.onClick(); setIsMobileMenuOpen(false); }}
                className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium w-full text-left bg-transparent border-none outline-none cursor-pointer no-bg-btn"
              >
                {item.name}
              </button>
            ))}
            <div className="border-t border-slate-200 pt-2">
              {user ? (
                <>
                  <span className="text-slate-700 font-medium mr-2">Hi, {user?.email || 'User'}</span>
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="text-slate-600 hover:text-red-500 block w-full text-left px-3 py-2 border border-slate-300 rounded-lg mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className="text-slate-600 hover:text-amber-500 block w-full text-left px-3 py-2 border border-slate-300 rounded-lg mt-2"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;