import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthUser {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  userEmail: string | null; // backwards compat
  login: (email: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'user_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setIsAuthenticated(true);
        setUser(parsed);
      } catch {
        // legacy: tylko email string
        setIsAuthenticated(true);
        setUser({ email: savedSession, firstName: 'Jan', lastName: 'Kowalski' });
      }
    }
  }, []);

  const login = async (email: string, firstName = 'Jan', lastName = 'Kowalski') => {
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    const authUser: AuthUser = { email, firstName, lastName };
    setIsAuthenticated(true);
    setUser(authUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        userEmail: user?.email ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth musi być użyte wewnątrz AuthProvider');
  }
  return context;
}