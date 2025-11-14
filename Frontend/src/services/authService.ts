import type { Session, Subscription, User } from '@supabase/supabase-js';
import { supabase } from '../integration/supabase/client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface SupabaseUser {
  id: string;
  email: string | null;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
  created_at: string;
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const { email, password } = credentials;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const user = data.user;
  
  if (!user) {
    throw new Error('Login failed: No user returned');
  }

  
  return data.user;
};

export const register = async (credentials: RegisterCredentials): Promise<{user: User | null, session: Session | null}> => {
  const { email, password, name } = credentials;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  if (!user) {
    throw new Error('Registration failed: No user returned');
  }

  return data
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  
  return user;
};

export const forgotPassword = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw new Error(error.message);
  }
};

export const updatePassword = async (newPassword: string): Promise<void> => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  
  if (error) {
    throw new Error(error.message);
  }
};

export const onAuthStateChange = (
  callback: (event: string, session: Session | null) => void
): { data: { subscription: Subscription } } => {
  return supabase.auth.onAuthStateChange(callback);
};