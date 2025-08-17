import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  categoryCounts: { [category: string]: number };
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange, categories, categoryCounts }) => {
  return (
    <div className="mb-8" id="categories">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Shop by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 hover:border-amber-300'
            }`}
          >
            {category} <span className="ml-2 text-xs text-slate-500">({categoryCounts[category] || 0})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;