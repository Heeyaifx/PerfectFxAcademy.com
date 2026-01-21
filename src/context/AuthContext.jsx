import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const loginManual = (userData) => {
        setCurrentUser({
            uid: `user-${Date.now()}`,
            email: userData.email,
            displayName: userData.name
        });
    };

    const logout = async () => {
        try {
            await auth.signOut();
            setCurrentUser(null); // Explicitly clear state for demo user
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const value = {
        currentUser,
        loginManual,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
