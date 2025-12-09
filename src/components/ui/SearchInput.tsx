'use client';

import { useState } from 'react';
import { Search, Loader2, MapPin, Calendar } from 'lucide-react';
import { searchAndAnalyze } from '@/server/actions/place';

interface SearchInputProps {
    onSearchStart: () => void;
    onSearchComplete: (query: string) => void;
}

export default function SearchInput({ onSearchStart, onSearchComplete }: SearchInputProps) {
    const [keyword, setKeyword] = useState('');
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword.trim() && !area.trim()) return;

        setLoading(true);
        onSearchStart();
        try {
            // Combine keyword and area for the search query
            const searchQuery = [keyword, area].filter(Boolean).join(' ');
            await onSearchComplete(searchQuery);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto relative z-10">
            <form onSubmit={handleSearch} className="relative flex items-center bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 overflow-hidden p-2 h-20 w-full group">

                {/* キーワード入力欄 */}
                <div className="flex-1 flex flex-col justify-center px-6 border-r border-slate-200/50 hover:bg-white/50 transition-colors h-full">
                    <label htmlFor="keyword" className="text-xs font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Keyword</label>
                    <input
                        id="keyword"
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="店名・ジャンル・キーワード"
                        className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-bold placeholder:text-slate-300 text-base truncate"
                    />
                </div>

                {/* エリア入力欄 */}
                <div className="flex-1 flex flex-col justify-center px-6 hover:bg-white/50 transition-colors h-full hidden md:flex">
                    <label htmlFor="area" className="text-xs font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Area</label>
                    <input
                        id="area"
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="エリア（例：渋谷、銀座）"
                        className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-bold placeholder:text-slate-300 text-base truncate"
                    />
                </div>

                {/* 検索ボタン */}
                <button
                    type="submit"
                    disabled={loading}
                    className="ml-2 bg-[#E65100] hover:bg-[#F57C00] text-white p-4 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-orange-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 aspect-square h-14 w-14"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6 font-bold" />}
                </button>
            </form>
        </div>
    );
}
