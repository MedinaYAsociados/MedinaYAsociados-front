import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const context = useOutletContext();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet context={context} />;
}

export function LawyerRoute() {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();
  const context = useOutletContext();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!hasRole('lawyer')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet context={context} />;
}
