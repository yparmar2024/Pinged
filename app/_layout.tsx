// Import necessary modules and components
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Loading } from "../components/common/Loading/Loading";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

// Create a root layout component that wraps the app with AuthProvider and routes accordingly
function RootLayoutNav() {
  // Declare authentication state and routing hooks
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Effect to handle routing based on authentication state
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, loading, router, segments]);

  // Show loading indicator while authentication state is being determined
  if (loading) return <Loading fullScreen text="Loading..." />;

  return <Slot />;
}

// Export the main root layout component
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
