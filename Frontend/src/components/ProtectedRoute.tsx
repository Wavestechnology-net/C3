import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

export default function ProtectedRoute({ children }: { children: JSX.Element, roles?: string[] }) {
  const {isAuthenticated, isAdmin, user, loading} = useAuth()

  if (loading) return <div>Loading...</div>;

  if (!loading && !isAuthenticated) return <Navigate to="/login" />;

  if (user && !isAdmin) return <Navigate to="/unauthorized" />;

  return children;
}