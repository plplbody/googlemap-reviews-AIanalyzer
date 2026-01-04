'use client';

import { useState } from 'react';
import { Search, Loader2, MapPin, Calendar } from 'lucide-react';
import { getPlaceDetails } from '@/server/actions/place';

interface SearchInputProps {
    onSearchStart: () => void;
    onSearchComplete: (query: string) => void;
}

export default function SearchInput({ onSearchStart, onSearchComplete }: SearchInputProps) {
    const [keyword, setKeyword] = useState('');
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeField, setActiveField] = useState<'keyword' | 'area' | null>(null);

    // Suggestions Data
    const SUGGESTIONS = {
        keyword: [
            { label: '寿司', value: '寿司' },
            { label: '焼肉', value: '焼肉' },
            { label: 'ラーメン', value: 'ラーメン' },
            { label: 'イタリアン', value: 'イタリアン' },
            { label: 'カフェ', value: 'カフェ' },
            { label: '居酒屋', value: '居酒屋' },
            { label: 'デート', value: 'デート' },
            { label: '個室', value: '個室' },
            { label: '記念日', value: '記念日' },
            { label: 'ランチ', value: 'ランチ' },
        ],
        area: [
            { label: '新宿', value: '新宿' },
            { label: '渋谷', value: '渋谷' },
            { label: '東京', value: '東京' },
            { label: '六本木', value: '六本木' },
            { label: '銀座', value: '銀座' },
            { label: '横浜', value: '横浜' },
            { label: '池袋駅', value: '池袋駅' },
            { label: '恵比寿駅', value: '恵比寿駅' },
            { label: '品川駅', value: '品川駅' },
        ]
    };

    const handleSuggestionClick = (value: string, field: 'keyword' | 'area') => {
        if (field === 'keyword') {
            setKeyword(value);
        } else {
            setArea(value);
        }
        setActiveField(null); // Close panel
    };

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
            {/* Overlay to close suggestions when clicking outside */}
            {activeField && (
                <div
                    className="fixed inset-0 z-0 bg-transparent"
                    onClick={() => setActiveField(null)}
                />
            )}
            <form onSubmit={handleSearch} className="relative z-10 flex items-center bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:shadowbrand/20 transition-all duration-300 overflow-visible p-2 h-20 w-full group">

                {/* キーワード入力欄 */}
                <div className="flex-[1.2] flex flex-col justify-center px-4 border-r border-brand-gray hover:bg-white/50 transition-colors h-full">
                    <label htmlFor="keyword" className="text-xs font-bold text-brand-black/80 mb-0.5 uppercase tracking-wider">Keyword</label>
                    <input
                        id="keyword"
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="店名・ジャンル・キーワード"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-brand-black font-bold placeholder:text-brand-black/50 text-base truncate caret-brand-black/50"
                        style={{ transition: 'background-color 5000s ease-in-out 0s' }}
                        onFocus={() => setActiveField('keyword')}
                    />
                </div>

                {/* エリア入力欄 */}
                <div className="flex-1 flex flex-col justify-center px-4 hover:bg-white/50 transition-colors h-full border-l border-brand-gray">
                    <label htmlFor="area" className="text-xs font-bold text-brand-black/80 mb-0.5 uppercase tracking-wider">Area</label>
                    <input
                        id="area"
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="エリア・駅名"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-brand-black font-bold placeholder:text-brand-black/50 text-base truncate caret-brand-black/50"
                        style={{ transition: 'background-color 5000s ease-in-out 0s' }}
                        onFocus={() => setActiveField('area')}
                    />
                </div>

                {/* 検索ボタン */}
                <button
                    type="submit"
                    disabled={loading}
                    className="ml-2 bg-brand hover:bg-[#F57C00] text-white p-4 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg hover:shadowbrand/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 aspect-square h-14 w-14"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6 font-bold" />}
                </button>
            </form>

            {/* Suggestion Panel */}
            {activeField && (
                <div className="absolute top-24 left-0 w-full bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl p-6 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-2 mb-3 text-xs font-bold text-brand-black/80 uppercase tracking-wider">
                        {activeField === 'keyword' ? <Search className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {activeField === 'keyword' ? '人気のキーワード' : 'よく検索されるエリア・駅'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTIONS[activeField].map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleSuggestionClick(item.value, activeField)}
                                className="px-4 py-2 bg-white hover:bg-brand hover:text-white text-brand-black/80 rounded-full border border-brand-gray text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
