import * as admin from 'firebase-admin';

export function getFirestore() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
        admin.firestore().settings({ ignoreUndefinedProperties: true });
    }
    return admin.firestore();
}
