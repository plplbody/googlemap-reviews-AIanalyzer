
import * as admin from 'firebase-admin';

// Configuration for connecting to the local Emulator
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.GOOGLE_CLOUD_PROJECT = 'xenon-bivouac-479813-u1';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
}

const db = admin.firestore();

async function main() {
    console.log('Connecting to Firestore Emulator at localhost:8080...');
    try {
        const snapshot = await db.collection('places').get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        console.log(`Found ${snapshot.size} documents in "places" collection:\n`);

        snapshot.forEach(doc => {
            const data = doc.data();
            console.log(`ID: ${doc.id}`);
            console.log(`Name: ${data.name}`);
            console.log(`Address: ${data.address}`);
            console.log(`Phone: ${data.phoneNumber}`);
            console.log(`Website: ${data.websiteUri}`);
            console.log(`Status: ${data.status}`);
            console.log(`AI Analysis Score: ${data.trueScore}`);
            console.log(`Usage Summary: ${data.usageSummary}`);
            console.log(`Usage Scores:`, JSON.stringify(data.usageScores));
            console.log('-----------------------------------');
        });
    } catch (error) {
        console.error('Error getting documents', error);
    }
}

main();
