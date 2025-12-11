import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: "demo-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "xenon-bivouac-479813-u1",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

// Connect to Emulator in Dev
if (__DEV__) {
    try {
        // Platform specific localhost
        // Android Emulator: 10.0.2.2
        // iOS Simulator / Web: localhost
        // Physical Device: needs LAN IP (hardcoded for now or use Constants)
        const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

        // Note: Check if already connected? SDK throws if connected twice usually.
        // We catch error to ignore.
        // Also port 8080 seems to be used.
        connectFirestoreEmulator(firestore, host, 8080);
        console.log(`Connected to Firestore Emulator at ${host}:8080`);
    } catch (e) {
        // Ignore if already connected
        console.log('Firestore Emulator connection skipped/failed', e);
    }
}

export { firestore };
