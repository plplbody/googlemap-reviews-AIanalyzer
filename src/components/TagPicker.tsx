import { useState, useEffect, useRef } from 'react';
import { createCustomScenario, getUserScenarios } from '@/server/actions/user';
import { UserScenario } from '@/types/user';
import { Plus, X, Check, Sparkles } from 'lucide-react';
import TagCreationForm from './TagCreationForm';
import AITagChip from './AITagChip';

export interface TagPickerProps {
    onSelect: (scenarioIds: string[], names: string[]) => void;
    onClose: () => void;
    uid: string;
}

export default function TagPicker({ onSelect, onClose, uid }: TagPickerProps) {
    const [scenarios, setScenarios] = useState<UserScenario[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(new Set());

    const pickerRef = useRef<HTMLDivElement>(null);

    // Handle click outside to dismiss
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        // Use mousedown to detect the start of a click outside, which feels snappier
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        const fetchScenarios = async () => {
            try {
                const data = await getUserScenarios(uid);
                // Filter out default scenes if they exist in DB (just in case), though user asked not to show them.
                // We just show whatever getUserScenarios returns + any local creations.
                setScenarios(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchScenarios();
    }, [uid]);



    const handleConfirm = () => {
        const selectedScenarios = scenarios.filter(s => selectedTagIds.has(s.id));
        onSelect(
            selectedScenarios.map(s => s.id),
            selectedScenarios.map(s => s.name)
        );
        onClose();
    };

    return (
        <div
            ref={pickerRef}
            className="absolute bottom-full mb-2 left-0 z-[100] w-[90vw] max-w-90 bg-white rounded-xl shadow-xl border border-brand-gray-light overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 origin-bottom-left"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-orange-light to-brand-orange-light/20 px-4 py-2 border-b border-brand-orange/10 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <div className="bg-brand-orange/10 p-1.5 rounded-full">
                        <Sparkles className="w-4 h-4 text-brand-orange-dark" />
                    </div>
                    <h3 className="text-brand-black text-type-body font-bold">AIタグを選択して特化学習</h3>
                </div>
                <button onClick={onClose} className="text-brand-black-light hover:text-brand-black transition-colors p-1 rounded-full hover:bg-black/5">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                {!isCreating ? (
                    <>
                        <p className="text-type-memo text-brand-black-light mb-4 text-center leading-relaxed">
                            作成した<span className="font-bold text-brand-orange">AIタグ</span>を選択して<br />あなただけのAIを育てましょう。
                        </p>

                        {/* User Created Tags */}
                        {scenarios.length > 0 ? (
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {scenarios.map((s) => {
                                        const isSelected = selectedTagIds.has(s.id);
                                        return (
                                            <AITagChip
                                                key={s.id}
                                                scenario={s}
                                                selected={isSelected}
                                                onClick={() => {
                                                    setSelectedTagIds(prev => {
                                                        const next = new Set(prev);
                                                        if (next.has(s.id)) next.delete(s.id);
                                                        else next.add(s.id);
                                                        return next;
                                                    });
                                                }}
                                                className='text-type-button'
                                            />
                                        );
                                    })
                                    }
                                </div>
                            </div>
                        ) : (
                            <p className="text-type-memo text-brand-gray-dark text-center mb-4">- AIタグはまだありません -</p>
                        )}

                        <div className="flex gap-2 mt-4 pt-4 border-t border-brand-gray">
                            <button
                                onClick={() => setIsCreating(true)}
                                className="flex-1 py-2 rounded-lg border border-brand-gray-dark border-dashed text-brand-black-light hover:border-brand-orange hover:text-brand-orange  transition-all flex items-center justify-center gap-2 text-type-button"
                            >
                                <Plus className="w-3 h-3" />
                                新規作成
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 py-2 bg-brand-orange text-white text-type-button rounded-lg shadow-sm hover:bg-brand-orange-dark transition-all"
                            >
                                決定
                            </button>
                        </div>
                    </>
                ) : (
                    <TagCreationForm
                        uid={uid}
                        onSuccess={(newScenario) => {
                            setScenarios(prev => [newScenario, ...prev]);
                            setSelectedTagIds(prev => new Set(prev).add(newScenario.id));
                            setIsCreating(false);
                        }}
                        onCancel={() => setIsCreating(false)}
                    />
                )}
            </div>
            {/* Footer Area removed as it's now inside TagCreationForm */}
        </div>
    );
}
