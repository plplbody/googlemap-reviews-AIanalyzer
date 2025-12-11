process.env.EXPO_ROUTER_APP_ROOT = "./app";
process.env.EXPO_ROUTER_IMPORT_MODE = "sync";

module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            "react-native-reanimated/plugin",
            [
                "transform-inline-environment-variables",
                {
                    "include": [
                        "EXPO_ROUTER_APP_ROOT",
                        "EXPO_ROUTER_IMPORT_MODE"
                    ]
                }
            ],
            [
                "module-resolver",
                {
                    alias: {
                        "react-native-worklets/plugin": "react-native-worklets-core/plugin",
                        "react-native-worklets": "react-native-worklets-core",
                        "lucide-react-native": "lucide-react"
                    },
                },
            ],
        ],
    };
};
