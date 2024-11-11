import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface RequireAuthProps {
  allowedRoles: Array<'USER' | 'ADMIN'>;
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { user } = useAuthContext();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;