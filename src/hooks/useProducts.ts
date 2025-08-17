import { useState, useEffect } from 'react';
import { Product } from '../types';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an actual API call
      const { products: fetchedProducts } = await import('../data/products');
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};