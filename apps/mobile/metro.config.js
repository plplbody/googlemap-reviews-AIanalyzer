const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
];

// 3. Force Metro to resolve (sub)dependencies to a single version
config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    "react": path.resolve(projectRoot, "node_modules/react"),
    "react-native": path.resolve(projectRoot, "node_modules/react-native"),
    "react-native-svg": path.resolve(projectRoot, "node_modules/react-native-svg"),
    "lucide-react-native": path.resolve(projectRoot, "node_modules/lucide-react-native"),
};

// 4. Ensure we use the proper resolution strategy
config.resolver.disableHierarchicalLookup = true;

// 5. Handle Server Packages for API Routes
// When exporting for web (server), some packages should be external or ignored in client bundles
if (process.env.EXPO_PUBLIC_PROJECT_ROOT) {
  // This is a rough check for server environment if needed, but Metro runs for both.
  // We can just suppress warnings or mock them if they are imported in client by mistake?
  // Actually, for API routes, Metro bundles them separately.
  // Standard Expo setup usually handles this, but explicit externals might be needed if errors occur.
}

module.exports = withNativeWind(config, { input: "./global.css" });
