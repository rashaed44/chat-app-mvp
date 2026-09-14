import React from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import MainTabs from './MainTabs';
import AuthStack from './AuthStack';

export default function AppNavigator() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}

function Inner() {
  const { user, loading } = useAuth();

  if (loading) return null; // you can add a splash screen here

  return user ? <MainTabs /> : <AuthStack />;
}
