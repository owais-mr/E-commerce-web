import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onViewDetails }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16" id="products">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-slate-700 mb-2">No products found</h3>
        <p className="text-slate-600">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="mb-16" id="products">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Our Products</h2>
        <span className="text-slate-600 font-medium">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export type { ProductGridProps };
export default ProductGrid;