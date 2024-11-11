// frontend/src/modules/auth/components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../../modules/auth/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authenticate } = useAuthContext();

  if (!authenticate) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, renderiza el componente hijo
  return <>{children}</>;
};

export default ProtectedRoute;
