// Import redirecting via Authentication context and tab navigator
import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

// Create tab layout component that checks authentication state
export default function TabsLayout() {
    // Access user and loading state from authentication context
    const { user, loading } = useAuth();

    // Show loading indicator while checking authentication state
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Redirect to authentication screen if user is not logged in
    if (!user) {
        return <Redirect href="../(auth)" />;
    }

    // Render tab navigator if user is authenticated
    return (
        <Tabs screenOptions={{ headerShown: false }} >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="events" options={{ title: 'Events' }} />
            <Tabs.Screen name="swipe" options={{ title: 'Swipe' }} />
            <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    );
}