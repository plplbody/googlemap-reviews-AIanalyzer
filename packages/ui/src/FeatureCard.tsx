import { View, Text, Image, TouchableOpacity } from 'react-native';

interface FeatureCardProps {
    title: string;
    location: string;
    rating: number;
    price: string;
    imageUrl: string;
    tags: string[];
    onPress?: () => void;
}

export function FeatureCard({ title, location, rating, price, imageUrl, tags, onPress }: FeatureCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w-full md:w-[300px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all mb-4"
        >
            <Image
                source={{ uri: imageUrl }}
                className="w-full h-48 object-cover"
                style={{ height: 200 }}
            />
            <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-lg font-bold text-slate-800 flex-1 mr-2" numberOfLines={1}>{title}</Text>
                    <View className="bg-slate-100 px-2 py-1 rounded">
                        <Text className="text-xs font-bold text-slate-700">★ {rating.toFixed(2)}</Text>
                    </View>
                </View>
                <Text className="text-sm text-slate-500 mb-2">{location} • {price}</Text>
                <View className="flex-row flex-wrap gap-1">
                    {tags.map((tag, i) => (
                        <View key={i} className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            <Text className="text-[10px] text-slate-500">{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
}
