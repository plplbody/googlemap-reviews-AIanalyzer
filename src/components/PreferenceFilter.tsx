import { useState } from 'react';
import { User } from 'firebase/auth';
import { UserProfile, UserScenario } from '@/types/user';
import { Sparkles, Utensils, Heart, TrendingUp, Plus, ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
import { SelectionButton } from '@/components/ui/SelectionButton';
import InfoBadge from '@/components/ui/InfoBadge';
import { UserPreferenceRadar } from '@/components/UserPreferenceRadar';
import AITagChip from '@/components/AITagChip';
import CreateTagModal from '@/components/CreateTagModal';

// --- Types ---
type UserPreferenceVector = UserProfile['aiPreferences'];

interface OptionItem {
    id: string;
    label: string;
    icon?: LucideIcon;
}

// --- Constants ---
const AXIS_OPTIONS: OptionItem[] = [
    { id: 'taste', label: '味', icon: Utensils },
    { id: 'service', label: '接客', icon: Heart },
    { id: 'atmosphere', label: '雰囲気', icon: Sparkles },
    { id: 'cost', label: 'コスパ', icon: TrendingUp },
];

const SCENE_OPTIONS: OptionItem[] = [
    { id: 'solo', label: '少人数' },
    { id: 'group', label: '団体' },
    { id: 'date', label: 'デート' },
    { id: 'business', label: 'ビジネス' },
    { id: 'family', label: 'ファミリー' }
];

// --- Sub Components ---

const FilterOptionList = ({
    title,
    options,
    selectedIds,
    onToggle
}: {
    title?: string,
    options: OptionItem[],
    selectedIds: string[],
    onToggle: (id: string) => void
}) => (
    <div className="flex flex-col gap-2">
        {title && <h3 className="text-xs font-bold text-brand-black-light uppercase tracking-wider text-center">{title}</h3>}
        <div className="flex flex-wrap gap-2 justify-center">
            {options.map((opt) => (
                <SelectionButton
                    key={opt.id}
                    isSelected={selectedIds.includes(opt.id)}
                    onClick={() => onToggle(opt.id)}
                    label={opt.label}
                    icon={opt.icon}
                    variant="chip"
                />
            ))}
        </div>
    </div>
);

const ModeTabs = ({
    isAuto,
    onChange,
    onSignInReq,
    user
}: {
    isAuto: boolean,
    onChange: (val: boolean) => void,
    onSignInReq: () => void,
    user: User | null
}) => (
    <div className="flex justify-center mb-6 border-b border-brand-gray w-full">
        <div className="flex gap-8 relative">
            <button
                onClick={() => onChange(false)}
                className={`pb-3 px-2 text-type-button transition-all relative ${!isAuto ? 'text-brand-orange-dark' : 'text-brand-black-light hover:text-brand-black'}`}
            >
                手動選択
                {!isAuto && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange-dark rounded-t-full" />}
            </button>

            <button
                onClick={() => {
                    if (!user) { onSignInReq(); return; }
                    onChange(true);
                }}
                className={`pb-3 px-2 text-type-button transition-all relative flex items-center gap-2 ${isAuto ? 'text-brand-orange-dark' : 'text-brand-black-light hover:text-brand-orange'}`}
            >
                <Sparkles className="w-3.5 h-3.5" />
                {!user ? "ログインして傾向を自動反映" : "傾向を自動反映"}
                {isAuto && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange-dark rounded-t-full" />}
            </button>
        </div>
    </div>
);

const ManualView = ({
    focusedAxes,
    handleAxisToggle,
    focusedScenes,
    handleSceneToggle
}: {
    focusedAxes: string[];
    handleAxisToggle: (id: string) => void;
    focusedScenes: string[];
    handleSceneToggle: (id: string) => void;
}) => (
    <div className="flex flex-col gap-4">
        <FilterOptionList
            title="重視するポイント"
            options={AXIS_OPTIONS}
            selectedIds={focusedAxes}
            onToggle={handleAxisToggle}
        />
        <div className="pt-2 border-t border-brand-gray-light">
            <FilterOptionList
                title="利用シーン"
                options={SCENE_OPTIONS}
                selectedIds={focusedScenes}
                onToggle={handleSceneToggle}
            />
        </div>
    </div>
);

const AutoView = ({
    profile,
    effectivePrefs,
    focusedScenes,
    handleSceneToggle,
    focusedTags,
    handleTagToggle,
    userTags,
    setIsCreateTagOpen
}: {
    profile: UserProfile | null;
    effectivePrefs: UserPreferenceVector | null | undefined;
    focusedScenes: string[];
    handleSceneToggle: (id: string) => void;
    focusedTags: string[];
    handleTagToggle: (id: string) => void;
    userTags: UserScenario[];
    setIsCreateTagOpen: (val: boolean) => void;
}) => (
    <div className="flex flex-col items-center w-full">
        {/* Level Indicator */}
        {profile?.experience !== undefined && (
            <div className="flex justify-center items-center gap-2 mb-4">
                <InfoBadge
                    label={
                        <span className="text-xs font-bold text-brand-orange-dark px-3 py-1 rounded-full bg-brand-orange-light/20 border border-brand-orange-light/50">
                            学習度 Lv.{Math.floor(profile.experience / 100) + 1}
                        </span>
                    }
                    infoText="店舗を「いいね」することで学習度を上げられます。"
                />
            </div>
        )}

        {/* Radar Chart */}
        <div className="w-full max-w-[280px]">
            <UserPreferenceRadar preferences={effectivePrefs || profile?.aiPreferences} compact />
        </div>

        {/* Scenes */}
        <div className="w-full mt-4 pt-4 border-t border-brand-gray-light">
            <FilterOptionList
                title="利用シーン"
                options={SCENE_OPTIONS}
                selectedIds={focusedScenes}
                onToggle={handleSceneToggle}
            />
        </div>

        {/* AI Tags */}
        <div className="flex flex-col gap-2 mt-4 pt-4 w-full">
            <h3 className="text-xs font-bold text-brand-black-light text-center">AIタグ</h3>
            <div className="flex flex-wrap gap-2 justify-center">
                {userTags.map((tag) => (
                    <AITagChip
                        key={tag.id}
                        scenario={tag}
                        selected={focusedTags.includes(tag.id)}
                        onClick={() => handleTagToggle(tag.id)}
                        className="border-brand-orange-light ring-2 ring-brand-orange-light/20"
                    />
                ))}
                <SelectionButton
                    isSelected={false}
                    onClick={() => setIsCreateTagOpen(true)}
                    label="作成"
                    icon={Plus}
                    variant="chip"
                    className='border-dashed border-brand-gray-dark'
                />
            </div>
        </div>
    </div>
);

// --- Main Component ---

interface PreferenceFilterProps {
    user: User | null;
    profile: UserProfile | null;
    effectivePrefs: UserPreferenceVector | null | undefined;
    isAutoPersonalize: boolean;
    setIsAutoPersonalize: (val: boolean) => void;
    focusedAxes: string[];
    handleAxisToggle: (id: string) => void;
    focusedScenes: string[];
    handleSceneToggle: (id: string) => void;
    focusedTags: string[];
    handleTagToggle: (id: string) => void;
    userTags: UserScenario[];
    setUserTags: React.Dispatch<React.SetStateAction<UserScenario[]>>;
    onSignIn: () => void;
}

export default function PreferenceFilter(props: PreferenceFilterProps) {
    const {
        user,
        profile,
        effectivePrefs,
        isAutoPersonalize,
        setIsAutoPersonalize,
        focusedAxes,
        handleAxisToggle,
        focusedScenes,
        handleSceneToggle,
        focusedTags,
        handleTagToggle,
        userTags,
        setUserTags,
        onSignIn
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);

    const summaryText = isAutoPersonalize
        ? "AI自動最適化モード（学習データ反映中）"
        : "手動条件指定モード";

    return (
        <>
            <div className="px-1 py-2 transition-all duration-300">
                <div className="w-full max-w-4xl mx-auto">
                    {/* Accordion Header */}
                    <div
                        className="bg-white rounded-xl shadow-sm border border-brand-gray overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-full ${isAutoPersonalize ? 'bg-brand-orange/10' : 'bg-brand-gray'}`}>
                                    <Sparkles className={`w-4 h-4 ${isAutoPersonalize ? 'text-brand-orange' : 'text-brand-black-light'}`} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-brand-black">
                                        {summaryText}
                                    </span>
                                    {/* Collapsed State Preview */}
                                    {!isOpen && (
                                        <div className="flex gap-2 mt-1 overflow-hidden h-5">
                                            {isAutoPersonalize && (
                                                <>
                                                    {effectivePrefs && (
                                                        <span className="text-[10px] text-brand-black-light bg-brand-gray px-2 py-0.5 rounded-full whitespace-nowrap">
                                                            学習度 Lv.{Math.floor((profile?.experience || 0) / 100) + 1}
                                                        </span>
                                                    )}
                                                    {(focusedScenes.length > 0 || focusedTags.length > 0) && (
                                                        <span className="text-[10px] text-brand-black-light bg-brand-gray px-2 py-0.5 rounded-full truncate max-w-[200px]">
                                                            {[
                                                                ...focusedScenes.map(id => SCENE_OPTIONS.find(opt => opt.id === id)?.label),
                                                                ...focusedTags.map(id => userTags.find(tag => tag.id === id)?.name)
                                                            ].filter(Boolean).join(" / ")}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                            {!isAutoPersonalize && (focusedAxes.length > 0 || focusedScenes.length > 0) && (
                                                <span className="text-[10px] text-brand-black-light bg-brand-gray px-2 py-0.5 rounded-full truncate max-w-[200px]">
                                                    {[
                                                        ...focusedAxes.map(id => AXIS_OPTIONS.find(opt => opt.id === id)?.label),
                                                        ...focusedScenes.map(id => SCENE_OPTIONS.find(opt => opt.id === id)?.label)
                                                    ].filter(Boolean).join(" / ")}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="text-brand-black-light hover:text-brand-orange transition-colors">
                                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Accordion Body */}
                        {isOpen && (
                            <div
                                className="border-t border-brand-gray bg-white/50 animate-in slide-in-from-top-2 fade-in duration-200"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4">
                                    <ModeTabs
                                        isAuto={isAutoPersonalize}
                                        onChange={setIsAutoPersonalize}
                                        onSignInReq={onSignIn}
                                        user={user}
                                    />

                                    {!isAutoPersonalize ? (
                                        <ManualView
                                            focusedAxes={focusedAxes}
                                            handleAxisToggle={handleAxisToggle}
                                            focusedScenes={focusedScenes}
                                            handleSceneToggle={handleSceneToggle}
                                        />
                                    ) : (
                                        <AutoView
                                            profile={profile}
                                            effectivePrefs={effectivePrefs}
                                            focusedScenes={focusedScenes}
                                            handleSceneToggle={handleSceneToggle}
                                            focusedTags={focusedTags}
                                            handleTagToggle={handleTagToggle}
                                            userTags={userTags}
                                            setIsCreateTagOpen={setIsCreateTagOpen}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Tag Modal */}
            {isCreateTagOpen && user?.uid && (
                <CreateTagModal
                    uid={user.uid}
                    onClose={() => setIsCreateTagOpen(false)}
                    onCreated={(newTag) => {
                        setUserTags(prev => [...prev, newTag as any]);
                    }}
                />
            )}
        </>
    );
}
