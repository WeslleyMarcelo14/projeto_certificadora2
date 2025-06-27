'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import FullScreenLoader from './FullScreenLoader';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <FullScreenLoader message="Carregando sistema..." />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
