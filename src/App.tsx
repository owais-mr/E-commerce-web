import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import RequireAuth from './components/RequireAuth';
import { Product } from './types';
import { useProducts } from './hooks/useProducts';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import { useState, useMemo } from 'react';

// Move navigation logic into a wrapper component inside Router

const App = () => {
  const { products, loading, error, refetch } = useProducts();
  const [categories, setCategories] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Update categories when products change
  useMemo(() => {
    if (products.length > 0) {
      // Extract unique categories from products
      const cats = Array.from(new Set(products.map((p: Product) => p.category)));
      setCategories(['All', ...cats]);
    }
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Calculate product counts for each category
  const categoryCounts = useMemo(() => {
    const counts: { [category: string]: number } = {};
    counts['All'] = products.length;
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Render error state
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-2xl text-red-600 mb-4">Error Loading Products</div>
        <p className="text-slate-600 mb-6">{error}</p>
        <button
          onClick={refetch}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              {/* Protected routes */}
              <Route
                path="/*"
                element={
                  <RequireAuth>
                    <Header
                      onCartClick={() => setIsCartOpen(true)}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                    />
                    <Routes>
                      <Route
                        path="/"
                        element={loading ? (
                          <div className="text-center py-16 text-xl text-slate-600">Loading products...</div>
                        ) : (
                          <HomePage
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            categories={categories}
                            categoryCounts={categoryCounts}
                            products={filteredProducts}
                          />
                        )}
                      />
                      <Route path="product/:productId" element={<ProductDetails />} />
                      <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                      <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                      <Route path="about" element={<AboutPage />} />
                      {/* Catch-all: redirect unknown routes to home */}
                      <Route path="*" element={<HomePage
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            categories={categories}
                            categoryCounts={categoryCounts}
                            products={filteredProducts}
                          />} />
                    </Routes>
                    <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                    <Footer />
                  </RequireAuth>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;