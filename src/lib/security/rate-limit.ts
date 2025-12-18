import { getFirestore } from '@/lib/firebase/admin';
import { headers } from 'next/headers';

const RATE_LIMIT_COLLECTION = 'rate_limits';
const LIMIT_COUNT = Number(process.env.RATE_LIMIT_COUNT) || 20; // Max requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

export async function checkRateLimit(): Promise<void> {
    const headersList = await headers();
    // Get IP from typical proxy headers or fallback
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    if (ip === 'unknown') {
        // Skip rate limit if IP cannot be determined (safe fallback for some environments, but risky)
        // In Cloud Run, x-forwarded-for should be present.
        console.warn('Rate Limit: Could not determine IP address.');
        return;
    }

    const db = getFirestore();
    const docRef = db.collection(RATE_LIMIT_COLLECTION).doc(ip.replace(/[^a-zA-Z0-9]/g, '_')); // Sanitize IP for doc ID

    const now = Date.now();

    try {
        await db.runTransaction(async (t) => {
            const doc = await t.get(docRef);
            const data = doc.data();

            if (!data) {
                // First request
                t.set(docRef, { count: 1, resetAt: now + WINDOW_MS });
            } else {
                if (now > data.resetAt) {
                    // Window expired, reset
                    t.set(docRef, { count: 1, resetAt: now + WINDOW_MS });
                } else {
                    // Within window
                    if (data.count >= LIMIT_COUNT) {
                        throw new Error('Rate limit exceeded');
                    }
                    t.update(docRef, { count: data.count + 1 });
                }
            }
        });
    } catch (error: any) {
        if (error.message === 'Rate limit exceeded') {
            console.warn(`[Security] Rate limit exceeded for IP: ${ip}`);
            throw new Error('アクセス頻度が高すぎます。しばらく待ってから再試行してください。');
        }
        // Iterate error handling: Don't block user if DB fails? 
        // For security, we usually default to fail-open (allow) or fail-closed (block).
        // Let's log and allow if DB error, to prevent service outage.
        console.error('Rate Limit Error:', error);
    }
}
