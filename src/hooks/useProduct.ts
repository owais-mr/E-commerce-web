import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProduct = (productId: string | undefined): UseProductResult => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!productId) {
        throw new Error('Product ID is required');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would be an actual API call
      const { products } = await import('../data/products');
      const foundProduct = products.find((p: Product) => p.id.toString() === productId);
      
      if (!foundProduct) {
        throw new Error('Product not found');
      }
      
      setProduct(foundProduct);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product. Please try again later.';
      setError(errorMessage);
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};