import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { router } from 'expo-router';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { auth } from '../../config/firebase';
import { handleError } from '../../utils/errorHandler';

export default function AuthScreen() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Setup Google OAuth configuration
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'pinged',
        path: 'auth'
      });

      // Create Google Auth request
      const request = new AuthSession.AuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
        usePKCE: false,
        responseType: AuthSession.ResponseType.IdToken,
      });

      // Load and prompt for credentials
      await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      }).then(async (result) => {
        if (result.type === 'success' && result.params.id_token) {
          // Create Firebase credential from Google ID token
          const credential = GoogleAuthProvider.credential(result.params.id_token);
          await signInWithCredential(auth, credential);
          // AuthProvider will auto-route to tabs
        } else {
          throw new Error('Google sign-in was cancelled or failed');
        }
      });
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      const { title, message } = handleError(error);
      Alert.alert(title, message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      // Check if Apple Authentication is available (iOS 13+)
      if (Platform.OS !== 'ios') {
        Alert.alert('Not Available', 'Apple Sign-In is only available on iOS devices.');
        setLoading(false);
        return;
      }

      // Generate nonce for security
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );

      // Request Apple credentials
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      // Create Firebase credential from Apple token
      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: appleCredential.identityToken!,
        rawNonce: nonce,
      });

      await signInWithCredential(auth, credential);
      // AuthProvider will auto-route to tabs
    } catch (error: any) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        // User cancelled the sign-in flow
        console.log('Apple sign-in cancelled');
      } else {
        console.error('Apple Sign-In Error:', error);
        const { title, message } = handleError(error);
        Alert.alert(title, message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = () => {
    router.push('/(auth)/email');
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.appleButton]}
          onPress={handleAppleSignIn}
          disabled={loading}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/images/apple_logo.png')}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, styles.appleButtonText]}>
              Continue with Apple
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/images/google_logo.png')}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, styles.googleButtonText]}>
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={handleEmailSignIn}
          disabled={loading}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/images/email_logo.png')}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, styles.emailButtonText]}>
              Continue with Email
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 50 : 40,
    gap: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  appleButtonText: {
    color: '#FFFFFF',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  googleButtonText: {
    color: '#000000',
  },
  emailButton: {
    backgroundColor: '#007AFF',
  },
  emailButtonText: {
    color: '#FFFFFF',
  },
});
