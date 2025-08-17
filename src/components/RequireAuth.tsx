import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user && location.pathname !== '/auth') {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
