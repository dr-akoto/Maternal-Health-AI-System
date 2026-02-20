import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Heart } from 'lucide-react-native';
import { api } from '@/lib/api';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, userRole, loading: authLoading, user, signOut, reloadProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [noProfile, setNoProfile] = useState(false);

  // Redirect when user is authenticated and has a role
  useEffect(() => {
    if (!authLoading && user && userRole) {
      setLoading(false);
      setNoProfile(false);
      if (userRole === 'mother') {
        router.replace('/(mother)/(tabs)' as any);
      } else if (userRole === 'doctor') {
        router.replace('/(doctor)/(tabs)' as any);
      } else if (userRole === 'admin') {
        router.replace('/(admin)/(tabs)' as any);
      }
    } else if (!authLoading && user && !userRole) {
      // User authenticated but no profile found
      setLoading(false);
      setNoProfile(true);
      setError('Your profile was not created. Click below to create it.');
    }
  }, [userRole, authLoading, user]);

  // Create missing profile using API
  const handleCreateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    
    try {
      const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
      
      // Use API to create profile
      const { data, error: profileError } = await api.createProfile(fullName);
      
      if (profileError) {
        throw new Error(profileError.error || 'Failed to create profile');
      }
      
      // Reload profile
      setNoProfile(false);
      await reloadProfile();
    } catch (err: any) {
      console.error('Error creating profile:', err);
      setError(err.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message || 'Login failed. Please try again.');
      setLoading(false);
    } else {
      // Success - loading will stop when redirect happens via useEffect
      // Add a small delay then stop loading if redirect doesn't happen
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Heart size={60} color="#007AFF" fill="#007AFF" />
          <Text style={styles.title}>Maternal Health</Text>
          <Text style={styles.subtitle}>Welcome back</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {noProfile ? (
            <View>
              <Button
                title="Create My Profile"
                onPress={handleCreateProfile}
                loading={loading}
                style={styles.createProfileButton}
              />
              <TouchableOpacity
                onPress={async () => {
                  await signOut();
                  setNoProfile(false);
                  setError('');
                }}
                style={styles.linkButton}
              >
                <Text style={styles.linkText}>Sign in with different account</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.button}
            />
          )}

          <TouchableOpacity
            onPress={() => router.push('/forgot-password')}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            onPress={() => router.push('/register')}
            style={styles.linkButton}
          >
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text style={styles.signupLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 8,
  },
  createProfileButton: {
    marginTop: 8,
    backgroundColor: '#10B981',
  },
  error: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
