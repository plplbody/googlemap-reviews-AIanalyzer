'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { signInWithGoogle, signOut, useUserProfile } from '@/lib/firebase/auth';
import { UserProfile } from '@/types/user';

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    signInWithGoogle: () => Promise<User>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    signInWithGoogle: async () => { throw new Error("not implemented") },
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { profile, loading: profileLoading } = useUserProfile(user);

    useEffect(() => {
        // E2E Test Backdoor (Development Only)
        if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
            const e2eSession = localStorage.getItem('E2E_TEST_SESSION');
            if (e2eSession) {
                console.log("[E2E] Loading Mock Session");
                try {
                    const mockUser = JSON.parse(e2eSession);
                    setUser(mockUser);
                    setLoading(false);
                    return; // Skip Firebase listener
                } catch (e) {
                    console.error("[E2E] Invalid Session Data");
                }
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            loading: loading || profileLoading,
            signInWithGoogle,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}
