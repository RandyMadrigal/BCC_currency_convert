import { createContext, ReactNode, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContextType } from '../types/authTypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();  // Hook que ahora devuelve AuthContextType
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
