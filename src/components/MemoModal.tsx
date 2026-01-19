import { useState, useEffect, useRef } from 'react';
import { X, Check, ThumbsDown, HelpCircle, Save } from 'lucide-react';

interface MemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (memo: string, repeat: 'yes' | 'no' | 'maybe') => Promise<void>;
    initialMemo?: string;
    initialRepeat?: 'yes' | 'no' | 'maybe';
}

export default function MemoModal({ isOpen, onClose, onSave, initialMemo = '', initialRepeat = 'maybe' }: MemoModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [memo, setMemo] = useState(initialMemo);
    const [repeat, setRepeat] = useState<'yes' | 'no' | 'maybe'>(initialRepeat);
    const [isSaving, setIsSaving] = useState(false);

    // Sync props to state when opened
    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen) {
            setMemo(initialMemo || '');
            setRepeat(initialRepeat || 'maybe');
            setIsSaving(false);

            if (dialog && !dialog.open) {
                dialog.showModal();
            }
        } else {
            if (dialog && dialog.open) {
                dialog.close();
            }
        }

        // Cleanup on unmount
        return () => {
            if (dialog && dialog.open) {
                dialog.close();
            }
        };
    }, [isOpen, initialMemo, initialRepeat]);

    const handleSave = async () => {
        if (memo.length > 500) {
            alert("メモは500文字以内で入力してください");
            return;
        }

        setIsSaving(true);
        try {
            await onSave(memo, repeat);
            onClose();
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    // Backdrop click handler for <dialog>
    // Clicking the ::backdrop pseudo-element triggers a click on the dialog element itself
    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        // Stop propagation to prevent PlaceListItem (parent) from catching the click
        e.stopPropagation();

        if (e.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className="m-auto rounded-2xl w-[90vh] max-w-sm p-0 shadow-xl border border-brand-gray overflow-hidden backdrop:bg-black/50 backdrop:backdrop-blur-sm animate-in zoom-in-95 duration-200 open:animate-in open:fade-in open:zoom-in-95 bg-transparent"
            onClick={handleDialogClick}
            onCancel={onClose}
            aria-labelledby="memo-modal-title"
        >
            <div className="bg-white rounded-2xl w-full h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-brand-gray bg-brand-gray-light/30">
                    <h3 id="memo-modal-title" className="font-bold text-brand-black flex items-center gap-2">
                        <span className="text-lg">📝</span>
                        来店メモ
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5 transition-colors">
                        <X className="w-5 h-5 text-brand-black-light" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-6">
                    {/* Repeat Section */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-black-light block">また行きたい？</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => setRepeat('yes')}
                                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${repeat === 'yes'
                                    ? 'bg-brand-orange-dark border-brand-orange-light text-brand-gray-dark shadow-sm'
                                    : 'bg-brand-gray-light border-brand-gray hover:bg-brand-gray text-brand-black-light'
                                    }`}
                            >
                                <Check className={`w-5 h-5 ${repeat === 'yes' ? 'stroke-[3]' : ''}`} />
                                <span className="text-xs font-bold">あり</span>
                            </button>

                            <button
                                onClick={() => setRepeat('maybe')}
                                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${repeat === 'maybe'
                                    ? 'bg-brand-orange-dark border-brand-orange-light text-brand-gray-dark shadow-sm'
                                    : 'bg-brand-gray-light border-brand-gray hover:bg-brand-gray text-brand-black-light'
                                    }`}
                            >
                                <HelpCircle className={`w-5 h-5 ${repeat === 'maybe' ? 'stroke-[3]' : ''}`} />
                                <span className="text-xs font-bold">迷う</span>
                            </button>

                            <button
                                onClick={() => setRepeat('no')}
                                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${repeat === 'no'
                                    ? 'bg-brand-orange-dark border-brand-orange-light text-brand-gray-dark shadow-sm'
                                    : 'bg-brand-gray-light border-brand-gray hover:bg-brand-gray text-brand-black-light'
                                    }`}
                            >
                                <ThumbsDown className={`w-5 h-5 ${repeat === 'no' ? 'stroke-[3]' : ''}`} />
                                <span className="text-xs font-bold">なし</span>
                            </button>
                        </div>
                    </div>

                    {/* Memo Section */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-black-light block">メモ (任意)</label>
                        <textarea
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            placeholder="美味しかったメニュー、雰囲気、混雑具合など..."
                            className="w-full min-h-[100px] p-3 rounded-xl border border-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-orange-dark/20 text-sm resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-brand-gray flex justify-end gap-3 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-bold text-brand-black-light hover:bg-gray-200 rounded-lg transition-colors"
                        disabled={isSaving}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-brand-orange-dark text-brand-gray-dark font-bold text-sm rounded-lg hover:bg-brand-orange shadow-sm disabled:opacity-50 transition-all active:scale-95"
                    >
                        {isSaving ? (
                            <>保存中...</>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                保存する
                            </>
                        )}
                    </button>
                </div>
            </div>
        </dialog>
    );
}
