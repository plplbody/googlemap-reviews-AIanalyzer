'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function RankingHeaderWrapper() {
    const router = useRouter();
    return <Header viewState="LIST" onResetHome={() => router.push('/')} />;
}
