'use client';

import { useState } from 'react';
import { createCustomScenario } from '@/server/actions/user';
import { Loader2 } from 'lucide-react';
import { UserScenario } from '@/types/user';

interface TagCreationFormProps {
    uid: string;
    onSuccess: (newTag: UserScenario) => void;
    onCancel: () => void;
}

export default function TagCreationForm({ uid, onSuccess, onCancel }: TagCreationFormProps) {
    const [tagName, setTagName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async () => {
        if (!tagName.trim()) return;
        setIsLoading(true);
        try {
            const newScenario = await createCustomScenario(uid, tagName);
            onSuccess(newScenario as unknown as UserScenario);
        } catch (error) {
            console.error("Failed to create tag", error);
            alert("作成に失敗しました");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-in slide-in-from-right-4 duration-200">
            <div className="p-4">
                <p className="text-xs text-brand-black-light mb-2 text-center font-bold">
                    新しいテーマ（タグ）を追加
                </p>
                <input
                    autoFocus
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="例: ラーメン、隠れ家バー、休日ランチ、激辛..."
                    className="w-full p-3 rounded-xl border border-brand-gray-dark focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange-light text-brand-black placeholder:text-brand-black-ligh text-type-memo font-semibold mb-4 bg-brand-gray-light/30 transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                />
                <div className="bg-brand-orange-light/10 border border-brand-orange/20 rounded-lg p-3 mb-4">
                    <p className="text-[10px] text-brand-orange-dark leading-relaxed flex gap-2">
                        <span className="text-sm">💡</span>
                        <span>
                            <b>ジャンルでも利用シーンでもOK。</b><br />
                            タグを切り替えれば、AIのマインドセットもそのテーマ専用に切り替わります。
                        </span>
                    </p>
                </div>
            </div>

            {/* Footer Area */}
            <div className="p-3 border-t border-brand-gray-dark bg-brand-gray-light/30 flex justify-end gap-2 shrink-0">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-type-button text-brand-black-light hover:text-brand-black hover:bg-brand-gray rounded-lg transition-colors"
                >
                    キャンセル
                </button>
                <button
                    disabled={!tagName.trim() || isLoading}
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white text-sm font-bold rounded-lg shadow-sm hover:bg-brand-black-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    作成する
                </button>
            </div>
        </div>
    );
}
