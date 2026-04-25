import type { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loggedUser, selectIsAuthenticated } from '../services/authSlice';

export default function ProtectedRoute({ children, roles }: { children: JSX.Element, roles?: string[] }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(loggedUser);

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (roles && user && !roles.includes(user?.role)) return <Navigate to="/unauthorized" />;

  return children;
}