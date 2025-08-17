import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import { Product } from '../types';

interface HomePageProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
  categoryCounts: { [category: string]: number };
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({
  selectedCategory,
  onCategoryChange,
  categories,
  categoryCounts,
  products,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Hero />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        categoryCounts={categoryCounts}
      />
      <ProductGrid products={products} onViewDetails={product => navigate(`/product/${product.id}`)} />
    </>
  );
};

export default HomePage;
