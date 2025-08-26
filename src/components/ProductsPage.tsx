import React from 'react';
import ProductGrid from './ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-16 text-xl text-slate-600">Loading products...</div>;
  if (error) return <div className="text-center py-16 text-xl text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold mb-8 text-slate-800">All Products</h2>
      <ProductGrid products={products} onViewDetails={product => navigate(`/product/${product.id}`)} />
    </div>
  );
};

export default ProductsPage;
