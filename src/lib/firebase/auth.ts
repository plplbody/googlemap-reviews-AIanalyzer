import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { auth, firestore } from './client';
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/user';

// Google Sign-In
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user profile exists, if not create one
        const userRef = doc(firestore, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const newProfile: UserProfile = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || 'No Name',
                photoURL: user.photoURL || '',
                createdAt: serverTimestamp() as any, // Cast for client-side compat
                updatedAt: serverTimestamp() as any,
                aiPreferences: { taste: 0, service: 0, atmosphere: 0, cost: 0 },
                featureAffinities: {},
                favoriteAreas: [],
                favoriteGenres: []
            };
            await setDoc(userRef, newProfile);
        }
        return user;
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error;
    }
};

// Sign Out
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
        throw error;
    }
};

// Auto-Sync User Profile Hook
export function useUserProfile(user: User | null) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setProfile(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const userRef = doc(firestore, 'users', user.uid);

        const unsubscribe = onSnapshot(userRef, (snap) => {
            if (snap.exists()) {
                setProfile(snap.data() as UserProfile);
            } else {
                setProfile(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error listening to user profile:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    return { profile, loading };
}

// Auth State Hook
export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return { user, loading };
}
