export interface User {
    id: string;
    userName: string;
    role: 'USER' | 'ADMIN';  // Agregamos el rol
    isActive: boolean;
  }
  
  export interface AuthContextType {
    token: string | null;
    user: User | null;
    authenticate: (username: string, password: string) => Promise<unknown>;
    logout: () => void;
  }
  