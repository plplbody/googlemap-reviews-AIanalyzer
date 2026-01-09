'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchInputProps {
    onSearchStart: () => void;
    onSearchComplete: (query: string) => void;
}

export default function SearchInput({ onSearchStart, onSearchComplete }: SearchInputProps) {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        onSearchStart();
        try {
            await onSearchComplete(query.trim());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto relative z-10">
            <form onSubmit={handleSearch} className="relative z-10 flex items-center bg-brand-gray-light backdrop-blur-md border border-brand-gray-dark rounded-full shadow-lg hover:shadow-brand/20 overflow-visible p-2 h-20 w-full group">

                {/* Single Search Input */}
                <div className="flex-1 flex flex-col justify-center items-center px-6 transition-colors h-full">
                    <label htmlFor="search" className="text-type-body font-bold text-brand-black uppercase tracking-wider mb-2">検索</label>
                    <input
                        id="search"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="例：「新宿 個室居酒屋」「池袋 カフェ」"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-type-body text-brand-black font-bold placeholder:text-brand-black-light truncate caret-brand-black-light"
                        style={{ transition: 'background-color 5000s ease-in-out 0s' }}
                    />
                </div>

                {/* 検索ボタン */}
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="ml-2 bg-brand-orange-dark hover:bg-brand-orange text-white p-4 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-brand/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 aspect-square h-14 w-14 shrink-0"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6 font-bold" />}
                </button>
            </form>
        </div>
    );
}
