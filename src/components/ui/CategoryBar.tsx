'use client';

import {
    Utensils,
    Coffee,
    Beer,
} from 'lucide-react';

const categories = [
    { label: 'レストラン', icon: Utensils },
    { label: 'カフェ', icon: Coffee },
    { label: '居酒屋・バー', icon: Beer },
];

export default function CategoryBar() {
    return (
        <div className="w-full bg-white pt-4 pb-2 sticky top-20 z-40 shadow-sm border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-2 min-w-[64px] cursor-pointer group opacity-70 hover:opacity-100 transition-opacity border-b-2 border-transparent hover:border-gray-300 pb-2"
                        >
                            <category.icon className="w-6 h-6 text-gray-600 group-hover:text-black" strokeWidth={1.5} />
                            <span className="text-xs font-medium text-gray-600 group-hover:text-black whitespace-nowrap">
                                {category.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
