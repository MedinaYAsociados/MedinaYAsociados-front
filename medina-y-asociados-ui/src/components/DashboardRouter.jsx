import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DashboardRouter() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const role = user.role || (Array.isArray(user.roles) ? user.roles[0] : null);

  switch (role) {
    case 'client':
      return <Navigate to="/dashboard/client" replace />;
    case 'lawyer':
      return <Navigate to="/dashboard/lawyer" replace />;
    case 'admin':
      return <Navigate to="/dashboard/admin" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default DashboardRouter;
