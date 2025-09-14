import { supabase } from './supabase';
import { User } from '../types/pkm';
import CryptoJS from 'crypto-js';

export class AuthService {
  /**
   * Sign up a new user
   */
  async signUp(email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        return { user: null, error: 'Failed to create user' };
      }

      // Generate encryption key for the user
      const encryptionKey = this.generateEncryptionKey(email, password);

      // Create user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          name,
          subscription_tier: 'free',
          subscription_status: 'active',
          encryption_key: encryptionKey,
        })
        .select()
        .single();

      if (userError) {
        return { user: null, error: userError.message };
      }

      return { user: userData, error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Sign in user
   */
  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        return { user: null, error: 'Authentication failed' };
      }

      // Get user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        return { user: null, error: userError.message };
      }

      return { user: userData, error: null };
    } catch (error) {
      console.error('Signin error:', error);
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      console.error('Signout error:', error);
      return { error: 'Failed to sign out' };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) return null;

      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return userData;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Generate encryption key for user
   */
  private generateEncryptionKey(email: string, password: string): string {
    const salt = CryptoJS.lib.WordArray.random(128/8);
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256/32,
      iterations: 10000
    });
    return key.toString();
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data, error: null };
    } catch (error) {
      console.error('Profile update error:', error);
      return { user: null, error: 'Failed to update profile' };
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  }
}

export const authService = new AuthService();