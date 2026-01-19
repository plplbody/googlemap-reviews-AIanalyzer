'use client';

import { useRef, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import TagCreationForm from './TagCreationForm';
import { UserScenario } from '@/types/user';

interface CreateTagModalProps {
    uid: string;
    onClose: () => void;
    onCreated: (newTag: UserScenario) => void;
}

export default function CreateTagModal({ uid, onClose, onCreated }: CreateTagModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            className="m-auto rounded-2xl shadow-xl backdrop:bg-black/40 bg-transparent p-0 open:animate-in open:fade-in open:zoom-in-95 backdrop:open:animate-in backdrop:open:fade-in duration-200"
            onClick={(e) => {
                if (e.target === dialogRef.current) handleClose();
            }}
            onCancel={handleClose}
        >
            <div className="bg-white w-[340px] overflow-hidden rounded-2xl relative">
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-orange-light to-brand-orange-light/30 px-5 py-2 border-b border-brand-orange/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-orange/10 p-1.5 rounded-full">
                            <Sparkles className="w-4 h-4 text-brand-orange-dark" />
                        </div>
                        <h3 className="text-type-body font-bold text-brand-black">新しいAIタグを作成</h3>
                    </div>
                    <button onClick={handleClose} className="text-brand-black-light hover:text-brand-black transition-colors p-1 rounded-full hover:bg-black/5">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <TagCreationForm
                    uid={uid}
                    onSuccess={(newTag) => {
                        onCreated(newTag);
                        handleClose();
                    }}
                    onCancel={handleClose}
                />
            </div>
        </dialog>
    );
}
