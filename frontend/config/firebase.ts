// config/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only once (hot reload safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let analytics;
if (typeof window !== "undefined") {
    const { getAnalytics } = require("firebase/analytics");
    analytics = getAnalytics(app);
}

export { app, analytics };
