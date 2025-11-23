// frontend/app/_layout.tsx

import { useEffect } from "react";
import { app } from "../config/firebase";
import { Slot } from "expo-router";

export default function RootLayout() {
  useEffect(() => {
    console.log("✅ Firebase App Name:", app.name);
  }, []);

  return <Slot />; // default Expo Router placeholder for child screens
}
