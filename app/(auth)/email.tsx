import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { auth } from '../../config/firebase';
import { handleError } from '../../utils/errorHandler';

export default function EmailAuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    // Validate inputs
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    // For sign up, validate password confirmation
    if (!isLogin) {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
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
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            disabled={loading}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin 
              ? 'Sign in to continue' 
              : 'Sign up to get started'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>
          )}

          {/* Primary Action Button */}
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuth} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Toggle Mode */}
          <TouchableOpacity 
            onPress={toggleMode} 
            style={styles.toggleContainer}
            disabled={loading}
          >
            <Text style={styles.toggleText}>
              {isLogin 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <Text style={styles.toggleTextBold}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
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
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#666666',
  },
  toggleTextBold: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
