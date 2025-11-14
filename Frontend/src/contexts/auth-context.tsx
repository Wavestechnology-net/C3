import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  getCurrentUser as authGetCurrentUser,
  type LoginCredentials,
  type RegisterCredentials,
} from '../services/authService';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integration/supabase/client';
import { redirect } from 'react-router-dom';

interface AuthContextType {
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (credentials: RegisterCredentials) => Promise<{user: User | null, session: Session | null}>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
     logoutOnExpiry(session)

      if(session?.user){
        setUser(session.user)
        setIsAuthenticated(true)
        
        const jwt = session?.access_token;
        const payload = jwt ? JSON.parse(atob(jwt.split('.')[1])) : null;
        setIsAdmin(payload?.is_admin === true)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      logoutOnExpiry(session);
      
      if(session?.user){
        setUser(session.user)
        setIsAuthenticated(true)
        const jwt = session?.access_token;
        const payload = jwt ? JSON.parse(atob(jwt.split('.')[1])) : null;
        
        setIsAdmin(payload?.is_admin === true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<User> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authLogin(credentials);
      
      setUser(result);
      setIsAuthenticated(true);
      return result;
    } catch (err: any) {
      if(err?.code === "unexpected_failure"){
        setError('Error: 500 | Internal Server Error');
      }
      else{
        setError('Error: ' + err.message || 'Login failed');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<{user: User | null, session: Session | null}> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authRegister(credentials);
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await authLogout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err: any){
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async (): Promise<User | null> => {
    try {
      const currentUser = await authGetCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      return currentUser;
    } catch (err: any) {
      setError(err.message || 'Failed to get current user');
      return null;
    }
  };

  const value: AuthContextType = {
    login,
    register,
    logout,
    getCurrentUser,
    user,
    isAuthenticated,
    isAdmin,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function logoutOnExpiry(session: Session | null){
  const date = new Date();
  const currentTime = Math.round(date.getTime() / 1000)
  console.log("session.expires_at: ", session?.expires_at);
  console.log("session.expires_in: ", session?.expires_in);
  console.log("currentTime: ", currentTime);
  
  
  if(session?.expires_at && session?.expires_at < currentTime){
    console.log("Logging out from session...");
    supabase.auth.signOut();
    redirect("/login")
  }
}