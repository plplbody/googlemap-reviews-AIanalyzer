import { useState, useEffect, useRef } from 'react';
import { getUserScenarios, createCustomScenario } from '@/server/actions/user';
import { UserScenario } from '@/types/user';
import { Plus, X, Loader2, Check } from 'lucide-react';


interface ScenePickerProps {
    uid: string;
    onSelect: (scenarioIds: string[]) => void;
    onClose: () => void;
}

const DEFAULT_SCENARIOS = [
    { id: 'solo', name: '少人数' },
    { id: 'group', name: '団体' },
    { id: 'date', name: 'デート' },
    { id: 'business', name: 'ビジネス' },
    { id: 'family', name: 'ファミリー' },
];

export function ScenePicker({ uid, onSelect, onClose }: ScenePickerProps) {
    const [customScenarios, setCustomScenarios] = useState<UserScenario[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newSceneName, setNewSceneName] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchScenarios = async () => {
            try {
                const data = await getUserScenarios(uid);
                // Filter out scenarios that are already in DEFAULT_SCENARIOS (e.g. 'solo', 'date' that might be in DB)
                const filtered = data.filter(s => !DEFAULT_SCENARIOS.some(def => def.id === s.id));
                setCustomScenarios(filtered);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchScenarios();
    }, [uid]);

    // Handle click outside to dismiss
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const handleConfirm = () => {
        if (selectedIds.size > 0) {
            onSelect(Array.from(selectedIds));
        }
        onClose();
    };

    const handleCreate = async () => {
        if (!newSceneName.trim()) return;
        setCreateLoading(true);
        try {
            const newScenario = await createCustomScenario(uid, newSceneName.trim());
            // @ts-ignore - Date vs Timestamp mismatch might occur, allow for UI
            setCustomScenarios(prev => [newScenario, ...prev]);
            setNewSceneName('');
            setIsCreating(false);

            // Auto-select and add to set
            setSelectedIds(prev => new Set(prev).add(newScenario.id));
        } catch (error) {
            console.error(error);
            alert('作成に失敗しました'); // Simple alert for now
        } finally {
            setCreateLoading(false);
        }
    };

    return (
        <>
            {/* Picking UI (Toast-like) */}
            <div ref={pickerRef} className="fixed bottom-14 -right-20 z-[70] w-80 bg-white rounded-2xl shadow-md border border-brand-gray/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-brand-black">利用シーンを選択 (複数可)</h3>
                        <button onClick={onClose} className="text-brand-black/40 hover:text-brand-black">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {/* Default Scenarios */}
                        {DEFAULT_SCENARIOS.map(scene => (
                            <button
                                key={scene.id}
                                onClick={() => toggleSelection(scene.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${selectedIds.has(scene.id)
                                    ? 'bg-orange-100 text-orange-600 border-orange-200'
                                    : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'
                                    }`}
                            >
                                {scene.name}
                            </button>
                        ))}

                        {/* Custom Scenarios */}
                        {loading ? (
                            <Loader2 className="w-4 h-4 text-brand-black/30 animate-spin" />
                        ) : (
                            customScenarios.map(scene => (
                                <button
                                    key={scene.id}
                                    onClick={() => toggleSelection(scene.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border items-center flex gap-1 ${selectedIds.has(scene.id)
                                        ? 'bg-orange-100 text-orange-600 border-orange-200'
                                        : 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100'
                                        }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${selectedIds.has(scene.id) ? 'bg-orange-500' : 'bg-orange-300'}`} />
                                    {scene.name}
                                </button>
                            ))
                        )}
                    </div>

                    {/* Creation Area */}
                    {isCreating ? (
                        <div className="flex items-center gap-2 mt-2 mb-3">
                            <input
                                type="text"
                                value={newSceneName}
                                onChange={(e) => setNewSceneName(e.target.value)}
                                placeholder="シーン名 (例: 激辛)"
                                className="flex-1 text-xs px-2 py-1.5 rounded border border-brand-gray focus:outline-none focus:border-orange-400"
                                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                                autoFocus
                            />
                            <button
                                onClick={handleCreate}
                                disabled={createLoading}
                                className="p-1.5 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
                            >
                                {createLoading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center mt-2">
                            <button
                                onClick={() => setIsCreating(true)}
                                className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors"
                            >
                                <Plus size={14} />
                                カスタムシーンを作成
                            </button>

                            <button
                                onClick={handleConfirm}
                                disabled={selectedIds.size === 0}
                                className="px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full hover:bg-orange-600 disabled:opacity-50 transition-all shadow-sm"
                            >
                                決定 ({selectedIds.size})
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer / Ignore hint */}
                <div className="bg-slate-50 px-4 py-2 text-[10px] text-slate-400 text-center">
                    選択すると、このシーンの好みを個別学習します
                </div>
            </div>
        </>
    );
}
