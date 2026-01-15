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
import { Alert, Image, Platform, View } from 'react-native';
import { Button, Loading } from '../../components';
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
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      {/* Logo Section */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 }}>
        <Image
          source={require('../../assets/pinged/pinged_slogan_transparent.png')}
          style={{ width: 500, height: 500 }}
          resizeMode="contain"
        />
      </View>

      {/* Buttons Section */}
      <View style={{ paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 50 : 40, gap: 16 }}>
        <Button
          title="Continue with Apple"
          onPress={handleAppleSignIn}
          variant="apple"
          fullWidth
          disabled={loading}
          icon={require('../../assets/social/apple_logo.png')}
        />

        <Button
          title="Continue with Google"
          onPress={handleGoogleSignIn}
          variant="google"
          fullWidth
          disabled={loading}
          icon={require('../../assets/social/google_logo.png')}
        />

        <Button
          title="Continue with Email"
          onPress={handleEmailSignIn}
          variant="primary"
          fullWidth
          disabled={loading}
          icon={require('../../assets/social/email_logo.png')}
        />
      </View>

      {loading && <Loading fullScreen text="Signing in..." />}
    </View>
  );
}
