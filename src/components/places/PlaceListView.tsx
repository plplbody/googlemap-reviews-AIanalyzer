import { Dispatch, SetStateAction } from 'react';
import { ArrowLeft, Sparkles, Star, MapPin } from "lucide-react";
import { SelectionButton } from '@/components/ui/SelectionButton';
import SearchInput from "@/components/ui/SearchInput";
import PreferenceFilter from '@/components/PreferenceFilter';
import PlaceList from '@/components/PlaceList';
import { Place } from "@/types/schema";
import { UserProfile, UserScenario } from "@/types/user";
import { PersonalizedScore } from "@/server/actions/personalize";
import { useSearch } from "@/contexts/SearchContext";
import { searchPlaces } from "@/server/actions/place";
import { useBulkUserInteractions } from "@/hooks/useBulkUserInteractions";

interface PlaceListViewProps {
    // Data
    sortedPlaces: Place[];
    loading: boolean;
    loadingMore: boolean;

    // Search
    onSearchStart: () => void;
    onSearchComplete: (query: string) => void;

    // Navigation
    onResetHome: () => void;
    onSelectPlace: (id: string, from?: string) => void;
    onLoadMore: () => void;

    // Personalization State
    user: any;
    profile: UserProfile | null;
    effectivePrefs: UserProfile['aiPreferences'] | undefined;
    isAutoPersonalize: boolean;
    setIsAutoPersonalize: (val: boolean) => void;

    // Filter State
    focusedAxes: string[];
    handleAxisToggle: (id: string) => void;
    focusedScenes: string[];
    handleSceneToggle: (id: string) => void;
    focusedTags: string[];
    handleTagToggle: (id: string) => void;

    // Tag State
    userTags: UserScenario[];
    setUserTags: Dispatch<SetStateAction<UserScenario[]>>;

    // Sort State
    sortBy: 'ai' | 'google';
    setSortBy: (val: 'ai' | 'google') => void;

    // Auth Action
    onSignIn: () => void;

    // Interaction / Scores
    pScores: Record<string, PersonalizedScore>;
    onActionComplete: (prefs?: any) => void;
    isScoreOutdated: boolean;
    onRecalculate: () => void;
}

export default function PlaceListView({
    sortedPlaces,
    loading,
    loadingMore,
    onSearchStart,
    onSearchComplete,
    onResetHome,
    onSelectPlace,
    onLoadMore,
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
    sortBy,
    setSortBy,
    onSignIn,
    pScores,
    onActionComplete,
    isScoreOutdated,
    onRecalculate
}: PlaceListViewProps) {
    const { cachedQuery, cachedNextPageToken } = useSearch();
    const hasMore = !!cachedNextPageToken;

    // S2-Impl-01: Bulk Fetch Interaction Status
    // Collect all place IDs currently shown
    const placeIds = sortedPlaces.map(p => p.id);
    const { interactions: bulkInteractions } = useBulkUserInteractions(user?.uid, placeIds);

    // Handlers for SearchInput are now simple wrappers or direct calls if we expose them
    // But SearchInput expects callbacks.
    // ClientHomeWrapper passed `handleSearchComplete` which pushes Router.
    // That logic (Routing) belongs to the Page/Wrapper. So we probably keep `onSearchStart/Complete` passed down for now
    // UNLESS we move `useRouter` here too.
    // The instructions said "Refactor Props Drilling", so cleaning up 5-6 props is good.
    // But `SearchContext` doesn't have `searchPlaces` logic, it just holds data.

    return (
        <div className="pt-32 pb-24 min-h-screen bg-brand-gray-light">
            <div className="container mx-auto px-6 mb-8">
                <div className="flex flex-col gap-6">
                    <button
                        onClick={onResetHome}
                        className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors w-fit font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        ホーム
                    </button>
                    {/* SearchInput still needs parent routing logic? Or can we pass it? */}
                    {/* Actually, let's keep search props for now as they involve Routing, which is better at top level.
                       But we can get `cachedQuery` from context directly. */}
                    <div className="w-full max-w-4xl mx-auto mb-4">
                        <SearchInput
                            onSearchStart={onSearchStart}
                            onSearchComplete={onSearchComplete}
                        />
                    </div>
                    {/* Reverting thought: Props Drilling fix is about passing data that is already in context.
                       `cachedQuery` is in context. `hasMore` is `!!cachedNextPageToken`.
                    */}

                    {/* Filter Selection UI (Sticky Accordion) */}
                    <div className="sticky top-5 z-40 w-full max-w-4xl mx-auto backdrop-blur-sm rounded-xl transition-all duration-300">
                        <PreferenceFilter
                            user={user}
                            profile={profile}
                            effectivePrefs={effectivePrefs}
                            isAutoPersonalize={isAutoPersonalize}
                            setIsAutoPersonalize={setIsAutoPersonalize}
                            focusedAxes={focusedAxes}
                            handleAxisToggle={handleAxisToggle}
                            focusedScenes={focusedScenes}
                            handleSceneToggle={handleSceneToggle}
                            focusedTags={focusedTags}
                            handleTagToggle={handleTagToggle}
                            userTags={userTags}
                            setUserTags={setUserTags}
                            onSignIn={onSignIn}
                        />
                    </div>

                    {/* Sort Controls */}
                    <div className="flex flex-col items-center mt-3 gap-2">
                        <span className="text-type-body font-bold text-brand-black">並び替え</span>
                        <div className="bg-white p-1 rounded-full border border-brand-gray flex shadow-sm">
                            <SelectionButton
                                isSelected={sortBy === 'ai'}
                                onClick={() => setSortBy('ai')}
                                label="AI分析スコア"
                                icon={Sparkles}
                                variant="segment"
                            />
                            <SelectionButton
                                isSelected={sortBy === 'google'}
                                onClick={() => setSortBy('google')}
                                label="Google評価"
                                icon={Star}
                                variant="segment"
                            />
                        </div>
                    </div>
                    <div className="w-full flex-1">
                        {loading && sortedPlaces.length === 0 ? (
                            <div className="py-20 flex flex-col items-center justify-center text-brand-black animate-pulse bg-white/50 rounded-xl border border-dashed border-brand-gray">
                                <MapPin className="mb-4 w-10 h-10 text-brand-black-light" />
                                <p className="font-bold text-lg">Googleマップから最新情報を検索中...</p>
                                <p className="text-sm mt-2">※AI分析はバックグラウンドで行われます</p>
                            </div>
                        ) : (
                            <PlaceList
                                places={sortedPlaces}
                                onSelect={onSelectPlace}
                                onLoadMore={onLoadMore}
                                hasMore={hasMore}
                                loadingMore={loadingMore}
                                focusedAxes={focusedAxes}
                                focusedScenes={focusedScenes}
                                personalizedScores={pScores}
                                onActionComplete={onActionComplete}
                                isScoreOutdated={isScoreOutdated}
                                onRecalculate={onRecalculate}
                                query={cachedQuery}
                                interactionStatusMap={bulkInteractions}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
