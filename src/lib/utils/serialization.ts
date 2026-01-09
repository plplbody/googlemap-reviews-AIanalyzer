
export const serializePlace = (data: any): any => {
    if (!data) return null;

    // Helper to convert Timestamp/Date to ISO string or number
    const toSerializable = (val: any) => {
        if (!val) return null;
        // Firestore Timestamp
        if (typeof val.toDate === 'function') {
            return val.toDate().toISOString(); // Return as string
            // Or return val.toDate() if Next.js supports Date (it often doesn't in SC props directly without "use client" boundary issues sometimes)
            // Error said: "Classes ... not supported". Date is a class.
            // Best to return string.
        }
        // JS Date
        if (val instanceof Date) {
            return val.toISOString();
        }
        // {_seconds, _nanoseconds} object (sometimes Firestore generic object)
        if (val._seconds !== undefined) {
             return new Date(val._seconds * 1000).toISOString();
        }
        return val;
    };

    return {
        ...data,
        createdAt: toSerializable(data.createdAt),
        updatedAt: toSerializable(data.updatedAt),
        lastAnalyzedAt: toSerializable(data.lastAnalyzedAt),
        // Handle nested if necessary, but usually Place top-level dates are the issue.
        // Recursive? Feature objects etc are plain JSON.
    };
};
