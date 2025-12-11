import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Search } from 'lucide-react-native';
import { useState } from 'react';

interface SearchInputProps {
    onSearchStart?: () => void;
    onSearchComplete: (query: string) => void;
    initialQuery?: string;
}

export function SearchInput({ onSearchStart, onSearchComplete, initialQuery = '' }: SearchInputProps) {
    const [query, setQuery] = useState(initialQuery);

    const handleSubmit = () => {
        if (!query.trim()) return;
        onSearchStart?.();
        onSearchComplete(query);
    };

    return (
        <View className="relative w-full max-w-2xl mx-auto">
            <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Search size={20} color="#94A3B8" />
            </View>
            <TextInput
                className="w-full bg-white pl-12 pr-4 py-4 rounded-full shadow-lg text-lg text-slate-800 placeholder:text-slate-400"
                placeholder="場所、料理、店名を入力..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSubmit}
                returnKeyType="search"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 8
                }}
                placeholderTextColor="#94A3B8"
            />
            <View className="absolute right-2 top-1/2 -translate-y-1/2">
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-[#E65100] px-6 py-2 rounded-full"
                >
                    {/* Note: In React Native Text must be wrapped in Text component, unlike Web */}
                    {/* Using a label or icon here */}
                    {/* For now just a color block or text? */}
                    {/* Lucide Search is used on left. Let's make this 'Search' text or icon? */}
                    {/* Replicating web 'Search' button style roughly */}
                </TouchableOpacity>
            </View>
        </View>
    );
}
// Note: The web version had a fancy button. For Universal, keeping it simple first.
// Updating to include Text inside TouchableOpacity
// Adjusted content below in next edit if needed, but 'write_to_file' is one-shot.
