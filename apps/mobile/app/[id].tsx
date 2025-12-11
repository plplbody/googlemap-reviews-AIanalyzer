import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Place } from '@repo/lib';
import { firestore } from '../src/lib/firebase/client';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { AnalysisResult } from '@repo/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Share, MoreHorizontal } from 'lucide-react-native';

export default function PlaceDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [place, setPlace] = useState<Place | null>(null);
    const [loading, setLoading] = useState(true);

    // Initial Fetch & Realtime Subscription
    useEffect(() => {
        if (!id) return;

        console.log("Detail view for ID:", id);

        // 1. Subscribe to Firestore updates (Realtime AI Analysis)
        const unsub = onSnapshot(doc(firestore, 'places', id), (docSnap) => {
            if (docSnap.exists()) {
                setPlace({ id: docSnap.id, ...docSnap.data() } as Place);
                setLoading(false);
            } else {
                // If not in Firestore yet, we might need to rely on passed params or fetch from Google API.
                // But for this flow, we assume search -> list -> detail. 
                // Creating a place doc is usually done by search API loop. 
                // If search API didn't save it (it should have if updated logic), we might be missing data.

                // Fallback: Trigger analysis which usually "gets or creates"?
                // Actually Search API should save "basic info" to Firestore?
                // My Search API implementation DOES NOT save to Firestore yet (commented out).
                // So initial load might fail if not in Firestore.
                // We should handle "Fetch from API" if missing?
                setLoading(false);
            }
        });

        // 2. Trigger Analysis if needed
        // If we found it but it's not analyzed, or if we didn't find it (and we want to auto-analyze on detail open)
        // Let's trigger analysis on mount if not completed.
        triggerAnalysis(id);

        return () => unsub();
    }, [id]);

    const triggerAnalysis = async (placeId: string) => {
        try {
            await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ placeId })
            });
        } catch (e) {
            console.error("Analysis trigger failed", e);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!place) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>Place not found or initializing...</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4">
                    <Text className="text-blue-500">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row justify-between items-center px-4 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text className="font-bold text-lg text-slate-800" numberOfLines={1}>
                    {place.name}
                </Text>
                <View className="flex-row gap-4">
                    <Share size={24} color="#1E293B" />
                    <MoreHorizontal size={24} color="#1E293B" />
                </View>
            </View>

            <ScrollView className="flex-1">
                {/* Basic Info (Mock Image for now) */}
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop" }}
                    className="w-full h-64"
                />

                <View className="p-6">
                    <Text className="text-2xl font-bold text-slate-900 mb-2">{place.name}</Text>
                    <Text className="text-slate-500 mb-6">{place.address}</Text>

                    {/* AI Analysis Result Component */}
                    <AnalysisResult place={place} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
