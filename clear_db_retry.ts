
import * as admin from 'firebase-admin';

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.GOOGLE_CLOUD_PROJECT = 'xenon-bivouac-479813-u1';

if (!admin.apps.length) {
    admin.initializeApp({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
}

const db = admin.firestore();

async function main() {
    console.log('Connecting to Firestore Emulator at localhost:8080...');
    const collectionRef = db.collection('places');
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
        console.log('No documents found to delete.');
        return;
    }

    console.log(`Found ${snapshot.size} documents. Deleting...`);

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('All documents deleted successfully.');
}

main();
