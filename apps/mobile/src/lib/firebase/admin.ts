import * as admin from 'firebase-admin';

export function getFirestore() {
    if (!admin.apps.length) {
        // Use default credentials (GOOGLE_APPLICATION_CREDENTIALS env var or GCloud CLI state)
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
        admin.firestore().settings({ ignoreUndefinedProperties: true });
    }
    return admin.firestore();
}
