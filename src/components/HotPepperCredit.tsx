import React from 'react';
import Link from 'next/link';

export function HotPepperCredit() {
    return (
        <div className="mt-2 text-xs text-brand-black-light text-center">
            <Link href="http://webservice.recruit.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-black transition-colors">
                Powered by ホットペッパー Webサービス
            </Link>
        </div>
    );
}
