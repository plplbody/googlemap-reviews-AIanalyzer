import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { Platform } from "react-native";

export function App() {
    const ctx = require.context("./app");

    // Server Guard: Prevent SSR rendering of UI to avoid crashes
    if (Platform.OS === 'web' && typeof window === 'undefined') {
        return null;
    }

    return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
