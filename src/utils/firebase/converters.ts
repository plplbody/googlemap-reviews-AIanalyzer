import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';

export const genericConverter = <T>(): FirestoreDataConverter<T> => ({
    toFirestore(modelObject: T): DocumentData {
        return modelObject as DocumentData;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
        const data = snapshot.data();
        return convertTimestamps(data) as T;
    }
});

/**
 * Recursively converts Firestore Timestamps to native Date objects
 */
function convertTimestamps(data: any): any {
    if (data === null || data === undefined) return data;

    if (data instanceof Timestamp) {
        return data.toDate();
    }

    if (Array.isArray(data)) {
        return data.map(item => convertTimestamps(item));
    }

    if (typeof data === 'object') {
        const result: any = {};
        for (const key of Object.keys(data)) {
            result[key] = convertTimestamps(data[key]);
        }
        return result;
    }

    return data;
}

/**
 * Safe Date converter for Server Actions serialization
 */
export function safeSerialize<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}
