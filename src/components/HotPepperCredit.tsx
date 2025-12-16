import React from 'react';
import Link from 'next/link';

export function HotPepperCredit() {
    return (
        <div className="mt-2 text-xs text-slate-400 text-center">
            <Link href="http://webservice.recruit.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-500 transition-colors">
                Powered by ホットペッパー Webサービス
            </Link>
        </div>
    );
}
