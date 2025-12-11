import { Place } from '@repo/lib';
import { Settings, MapPin, ChevronRight, Loader2, Star } from 'lucide-react-native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

interface PlaceListItemProps {
    place: Place;
    onSelect: (placeId: string) => void;
    focusedAxes?: string[];
}

export default function PlaceListItem({ place, onSelect, focusedAxes = [] }: PlaceListItemProps) {
    const isAnalyzed = place.status === 'completed' && place.trueScore !== undefined;
    const isAnalyzing = place.status === 'pending' || place.status === 'processing';

    // Personalized Score Calculation
    const calculatePersonalizedScore = () => {
        if (!place.axisScores || focusedAxes.length === 0) return null;

        const scores = place.axisScores;
        let totalScore = 0;
        let totalWeight = 0;

        const axesMap: Record<string, number> = {
            'taste': scores.taste,
            'service': scores.service,
            'atmosphere': scores.atmosphere,
            'cost': scores.cost
        };

        ['taste', 'service', 'atmosphere', 'cost'].forEach(axis => {
            const score = axesMap[axis] || 0;
            const weight = focusedAxes.includes(axis) ? 3 : 1;
            totalScore += score * weight;
            totalWeight += weight;
        });

        return totalScore / totalWeight;
    };

    const yourScore = calculatePersonalizedScore();

    return (
        <TouchableOpacity
            onPress={() => onSelect(place.id)}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4"
        >
            <View className="flex-row justify-between items-start mb-4">
                <Text className="text-xl font-bold text-slate-900 flex-1 mr-2" numberOfLines={1}>
                    {place.name}
                </Text>
                <View className="items-end">
                    <Text className="text-xs text-slate-400 font-bold mb-0.5">Google Map Score</Text>
                    <View className="flex-row items-center bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" fill="#FACC15" />
                        <Text className="font-bold text-slate-700">{place.originalRating?.toFixed(1) || '0.0'}</Text>
                        <Text className="text-xs text-slate-400 ml-1">({place.userRatingsTotal || 0})</Text>
                    </View>
                </View>
            </View>

            {/* AI Analysis Score Badge */}
            <View className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                {isAnalyzed ? (
                    <View className="gap-3">
                        {/* Personalized Score Display */}
                        {yourScore ? (
                            <View>
                                <View className="flex-row items-center justify-between mb-2">
                                    <View>
                                        <Text className="text-base font-bold text-[#E65100] mb-1">あなたへのマッチ度</Text>
                                        <View className="flex-row items-baseline gap-2">
                                            <Text className="text-xl font-black text-[#E65100]">
                                                {yourScore.toFixed(1)}
                                            </Text>
                                            <View className="flex-row">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        color={i < Math.round(yourScore) ? '#F97316' : '#E2E8F0'}
                                                        fill={i < Math.round(yourScore) ? '#F97316' : 'none'}
                                                    />
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                    {/* Standard AI Score (Secondary) */}
                                    <View className="items-end opacity-75">
                                        <Text className="text-xs font-bold text-slate-400">AI分析スコア</Text>
                                        <Text className="text-lg font-bold text-slate-500">{place.trueScore?.toFixed(1)}</Text>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            // Standard AI Score Only
                            <View className="flex-row items-center justify-between">
                                <View>
                                    <Text className="text-base font-bold text-[#E65100] mb-1">AI分析スコア</Text>
                                    <View className="flex-row items-baseline gap-2">
                                        <Text className="text-3xl font-black text-[#E65100]">
                                            {place.trueScore?.toFixed(1)}
                                        </Text>
                                        <View className="flex-row">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={20}
                                                    color={i < Math.round(place.trueScore || 0) ? '#F97316' : '#E2E8F0'}
                                                    fill={i < Math.round(place.trueScore || 0) ? '#F97316' : 'none'}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}

                        {/* Axis Scores */}
                        {place.axisScores && (
                            <View className="flex-row pt-3 border-t border-slate-200 justify-between">
                                {[
                                    { k: 'taste', l: '味' },
                                    { k: 'service', l: '接客' },
                                    { k: 'atmosphere', l: '雰囲気' },
                                    { k: 'cost', l: 'コスパ' }
                                ].map((axis) => {
                                    const isFocused = focusedAxes.includes(axis.k);
                                    const score = place.axisScores?.[axis.k as keyof typeof place.axisScores] || 0;
                                    return (
                                        <View key={axis.k} className="items-center w-1/4">
                                            <Text className={`text-[10px] mb-0.5 ${isFocused ? 'text-[#E65100] font-bold' : 'text-slate-400'}`}>
                                                {axis.l}
                                            </Text>
                                            <Text className={`text-sm font-bold ${isFocused ? 'text-[#E65100]' : 'text-slate-600'}`}>
                                                {score.toFixed(1)}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                ) : isAnalyzing ? (
                    <View className="flex-row items-center justify-center py-4 gap-2">
                        <ActivityIndicator color="#E65100" />
                        <Text className="text-sm font-bold text-[#E65100]">AI分析中...</Text>
                    </View>
                ) : (
                    <View className="flex-row items-center justify-center py-4">
                        <Text className="text-slate-400 text-sm">分析待ち</Text>
                    </View>
                )}
            </View>

            <View className="mt-auto pt-4 flex-row items-center justify-between border-t border-slate-50">
                <View className="flex-row items-center gap-1 flex-shrink">
                    <MapPin size={12} color="#94A3B8" />
                    <Text className="text-xs text-slate-400 flex-1" numberOfLines={1}>{place.address}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Text className="text-xs text-[#E65100] font-medium">View Details</Text>
                    <ChevronRight size={12} color="#E65100" />
                </View>
            </View>
        </TouchableOpacity>
    );
}
