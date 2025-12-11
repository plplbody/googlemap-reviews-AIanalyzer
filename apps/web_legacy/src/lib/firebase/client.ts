import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "demo-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "xenon-bivouac-479813-u1",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(app);

// Connect to Emulator in Dev
if (process.env.NODE_ENV === 'development') {
    // Check if already connected to avoid errors on hot reload?
    // Firestore SDK handles this gracefully usually, but let's be safe
    // Actually, connectFirestoreEmulator should be called before any operation
    try {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        console.log('Connected to Firestore Emulator');
    } catch (e) {
        // Ignore if already connected
    }
}

export { firestore };
