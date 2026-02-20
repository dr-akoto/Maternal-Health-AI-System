import { createClient, Session, AuthChangeEvent } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { Database } from '../types/supabase';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Check for missing configuration - only warn if truly not configured
const isConfigured = supabaseUrl && 
  !supabaseUrl.includes('your-project-id') && 
  !supabaseUrl.includes('placeholder') &&
  supabaseUrl.includes('.supabase.co');

if (!isConfigured) {
  console.warn(
    '⚠️ Supabase URL not configured!\n' +
    'Please update your .env file with your Supabase credentials:\n' +
    '1. Go to https://supabase.com and sign in\n' +
    '2. Create a new project or select existing one\n' +
    '3. Go to Project Settings > API\n' +
    '4. Copy the credentials to your .env file\n' +
    '5. Restart the Expo development server with: npx expo start -c'
  );
}

// Custom error handler
const handleError = (error: any, context: string) => {
  console.error(`[Supabase Error] ${context}:`, error);
  return error;
};

// Use actual URL if configured, otherwise placeholder (app will show warning but won't crash)
const effectiveUrl = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const effectiveKey = isConfigured ? supabaseAnonKey : 'placeholder-key';

// Create a singleton instance of the Supabase client
export const supabase = createClient<Database>(effectiveUrl, effectiveKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: {
      getItem: (key: string): string | null => {
        try {
          return localStorage.getItem(key);
        } catch (error) {
          handleError(error, 'LocalStorage access');
          return null;
        }
      },
      setItem: (key: string, value: string): void => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          handleError(error, 'LocalStorage set item');
        }
      },
      removeItem: (key: string): void => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          handleError(error, 'LocalStorage remove item');
        }
      },
    },
  },
}) as any;

// Type-safe database access
export type Tables = Database['public']['Tables'];

// Custom error class for auth errors
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// Authentication Service
export const authService = {
  // Sign up a new user with email and password
  async signUp(
    email: string, 
    password: string, 
    userData: {
      role: 'mother' | 'doctor' | 'admin';
      first_name: string;
      last_name: string;
      phone_number: string;
    }
  ) {
    try {
      // 1. Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email,
            role: userData.role,
          },
        },
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('User creation failed');

      // 2. Create role-specific profile
      // The profile tables reference auth.users directly via user_id
      const fullName = `${userData.first_name} ${userData.last_name}`.trim() || email.split('@')[0];

      if (userData.role === 'mother') {
        const { error: profileError } = await supabase
          .from('mother_profiles')
          .insert([{
            user_id: authData.user.id,
            full_name: fullName,
            phone: userData.phone_number || null,
          }]);
        if (profileError) {
          console.error('Mother profile creation error:', profileError);
          // Don't throw - auth user is created, profile can be created later
        }
      } else if (userData.role === 'doctor') {
        const { error: profileError } = await supabase
          .from('doctor_profiles')
          .insert([{
            user_id: authData.user.id,
            full_name: fullName,
            phone: userData.phone_number || 'Not provided',
            license_number: `PENDING-${authData.user.id.slice(0, 8)}`,
            specialization: 'General',
          }]);
        if (profileError) {
          console.error('Doctor profile creation error:', profileError);
          // Don't throw - auth user is created, profile can be created later
        }
      } else if (userData.role === 'admin') {
        const { error: profileError } = await supabase
          .from('admin_profiles')
          .insert([{
            user_id: authData.user.id,
            full_name: fullName,
            phone: userData.phone_number || null,
          }]);
        if (profileError) {
          console.error('Admin profile creation error:', profileError);
        }
      }

      return { data: authData, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error: handleError(error, 'Sign up') };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error: handleError(error, 'Sign in') };
    }
  },

  // Sign out the current user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: handleError(error, 'Sign out') };
    }
  },

  // Get the current user session
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { data: data.session, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { data: null, error: handleError(error, 'Get session') };
    }
  },

  // Reset password (frontend wrapper)
  async resetPasswordForEmail(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return { error };
      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: handleError(error, 'Reset password') };
    }
  },

  // Get current user with profile
  async getCurrentUser() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error('No user found');

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      let profile = null;
      if (userData.role === 'mother') {
        const { data: motherProfile } = await supabase
          .from('mother_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        profile = motherProfile;
      } else if (userData.role === 'doctor') {
        const { data: doctorProfile } = await supabase
          .from('doctor_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        profile = doctorProfile;
      }

      return { 
        data: { 
          ...user, 
          user_metadata: { ...user.user_metadata, role: userData.role },
          profile 
        }, 
        error: null 
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return { data: null, error: handleError(error, 'Get current user') };
    }
  },

  // Update user profile (updates the appropriate profile table based on role)
  async updateProfile(updates: Record<string, any>, role: 'mother' | 'doctor' | 'admin') {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const table = role === 'mother' ? 'mother_profiles' 
                  : role === 'doctor' ? 'doctor_profiles' 
                  : 'admin_profiles';

      const { error } = await supabase
        .from(table)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: handleError(error, 'Update profile') };
    }
  },

  // Subscribe to auth state changes
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      callback(event, session);
    });
  },

  // Check if user has a specific role
  async hasRole(role: 'mother' | 'doctor' | 'admin'): Promise<{ hasRole: boolean; error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { hasRole: false, error: 'No authenticated user' };

      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return { hasRole: userData?.role === role, error: null };
    } catch (error) {
      console.error('Error checking user role:', error);
      return { hasRole: false, error: handleError(error, 'Check role') };
    }
  },
};

// Real-time subscription helper
export const createSubscription = (
  channel: string,
  event: string,
  callback: (payload: any) => void
) => {
  const subscription = supabase
    .channel(channel)
    .on('postgres_changes', { event: '*', schema: 'public' }, callback)
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};
