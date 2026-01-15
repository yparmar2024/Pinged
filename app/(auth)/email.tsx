import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View
} from 'react-native';
import { Button, Input } from '../../components';
import { auth } from '../../config/firebase';
import { handleError } from '../../utils/errorHandler';

export default function EmailAuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleAuth = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let hasError = false;

    // Validate inputs
    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    // Validate password length
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    // For sign up, validate password confirmation
    if (!isLogin) {
      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // AuthProvider will auto-route to tabs
    } catch (error: any) {
      const { title, message } = handleError(error);
      Alert.alert(title, message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setConfirmPassword('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#F8F9FA' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={{ paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: 40 }}>
          <Button
            title="← Back"
            onPress={() => router.back()}
            variant="ghost"
            disabled={loading}
            style={{ marginBottom: 24, alignSelf: 'flex-start' }}
          />
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1C1C1C', marginBottom: 8 }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text style={{ fontSize: 16, color: '#666666' }}>
            {isLogin 
              ? 'Sign in to continue' 
              : 'Sign up to get started'}
          </Text>
        </View>

        {/* Form */}
        <View style={{ flex: 1 }}>
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            error={emailError}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
            error={passwordError}
            secureTextEntry
            editable={!loading}
          />

          {!isLogin && (
            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setConfirmPasswordError('');
              }}
              error={confirmPasswordError}
              secureTextEntry
              editable={!loading}
            />
          )}

          {/* Primary Action Button */}
          <Button
            title={isLogin ? 'Sign In' : 'Sign Up'}
            onPress={handleAuth}
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
            style={{ marginTop: 16 }}
          />

          {/* Toggle Mode */}
          <View style={{ marginTop: 24, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#666666', marginBottom: 8 }}>
              {isLogin 
                ? "Don't have an account?" 
                : "Already have an account?"}
            </Text>
            <Button
              title={isLogin ? 'Sign Up' : 'Sign In'}
              onPress={toggleMode}
              variant="text"
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


