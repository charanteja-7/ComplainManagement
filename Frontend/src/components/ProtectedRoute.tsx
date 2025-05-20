// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Props = {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'student';
};

const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) return <Navigate to="/" />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
