import { ArrowLeft } from "lucide-react";
import AnalysisResult from "@/components/AnalysisResult";
import { Place } from "@/types/schema";
import { PersonalizedScore } from "@/server/actions/personalize";

interface PlaceDetailViewProps {
    place: Place;
    onBack: () => void;
    onNext: () => void;
    onPrev: () => void;
    hasPrev: boolean;
    hasNext: boolean;

    // Personalization / Filter props for AnalysisResult
    focusedAxes: string[];
    focusedScenes: string[];
    onToggleAxis: (id: string) => void;
    onToggleScene: (id: string) => void;
    isAutoMode: boolean;
    personalScore?: PersonalizedScore;
}

export default function PlaceDetailView({
    place,
    onBack,
    onNext,
    onPrev,
    hasPrev,
    hasNext,
    focusedAxes,
    focusedScenes,
    onToggleAxis,
    onToggleScene,
    isAutoMode,
    personalScore
}: PlaceDetailViewProps) {
    return (
        <div className="pt-32 pb-24 container mx-auto px-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    戻る
                </button>

                <div className="flex gap-4">
                    {hasPrev && (
                        <button
                            onClick={onPrev}
                            className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            前の店
                        </button>
                    )}

                    {hasNext && (
                        <button
                            onClick={onNext}
                            className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors font-medium"
                        >
                            次の店
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </button>
                    )}
                </div>
            </div>
            <AnalysisResult
                place={place}
                focusedAxes={focusedAxes}
                focusedScenes={focusedScenes}
                onToggleAxis={onToggleAxis}
                onToggleScene={onToggleScene}
                isAutoMode={isAutoMode}
                personalScore={personalScore}
            />
        </div>
    );
}
