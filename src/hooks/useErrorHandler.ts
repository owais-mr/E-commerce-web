import { useState } from 'react';

interface UseErrorHandlerResult {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  handleError: (error: unknown) => void;
}

export const useErrorHandler = (): UseErrorHandlerResult => {
  const [error, setError] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else if (typeof error === 'string') {
      setError(error);
    } else {
      setError('An unexpected error occurred');
    }
    console.error('Error:', error);
  };

  return {
    error,
    setError,
    clearError,
    handleError
  };
};