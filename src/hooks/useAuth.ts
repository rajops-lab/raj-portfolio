import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../lib/auth';
import { User } from '../types/pkm';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const { user: newUser, error } = await authService.signUp(email, password, name);
      if (newUser) {
        setUser(newUser);
      }
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: signedInUser, error } = await authService.signIn(email, password);
      if (signedInUser) {
        setUser(signedInUser);
      }
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { error: 'No user logged in' };
    
    const { user: updatedUser, error } = await authService.updateProfile(user.id, updates);
    if (updatedUser) {
      setUser(updatedUser);
    }
    return { error };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };
};

export { AuthContext };