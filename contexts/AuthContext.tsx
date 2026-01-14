// Import context, hooks and authentication state listeners
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

// Declare a interface for user authentication context
interface AuthContextType {
    user: User | null;
    loading: boolean;
}

// Create authentication context to be usable across the app
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component to wrap the app and manage authentication states
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // State variables for user and loading status
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Set up an authentication state listener on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Provide user and loading state to children components
    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};