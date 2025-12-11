(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/firebase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "firestore",
    ()=>firestore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
;
const firebaseConfig = {
    apiKey: "demo-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "xenon-bivouac-479813-u1",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
// Initialize Firebase
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])()[0];
const firestore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
// Connect to Emulator in Dev
if ("TURBOPACK compile-time truthy", 1) {
    // Check if already connected to avoid errors on hot reload?
    // Firestore SDK handles this gracefully usually, but let's be safe
    // Actually, connectFirestoreEmulator should be called before any operation
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectFirestoreEmulator"])(firestore, 'localhost', 8080);
        console.log('Connected to Firestore Emulator');
    } catch (e) {
    // Ignore if already connected
    }
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/SearchInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SearchInput({ onSearchStart, onSearchComplete }) {
    _s();
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [area, setArea] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSearch = async (e)=>{
        e.preventDefault();
        if (!keyword.trim() && !area.trim()) return;
        setLoading(true);
        onSearchStart();
        try {
            // Combine keyword and area for the search query
            const searchQuery = [
                keyword,
                area
            ].filter(Boolean).join(' ');
            await onSearchComplete(searchQuery);
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto relative z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSearch,
            className: "relative flex items-center bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 overflow-hidden p-2 h-20 w-full group",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col justify-center px-6 border-r border-slate-200/50 hover:bg-white/50 transition-colors h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "keyword",
                            className: "text-xs font-bold text-slate-500 mb-0.5 uppercase tracking-wider",
                            children: "Keyword"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SearchInput.tsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "keyword",
                            type: "text",
                            value: keyword,
                            onChange: (e)=>setKeyword(e.target.value),
                            placeholder: "店名・ジャンル・キーワード",
                            className: "w-full bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-bold placeholder:text-slate-300 text-base truncate"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SearchInput.tsx",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SearchInput.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col justify-center px-6 hover:bg-white/50 transition-colors h-full hidden md:flex",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "area",
                            className: "text-xs font-bold text-slate-500 mb-0.5 uppercase tracking-wider",
                            children: "Area"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SearchInput.tsx",
                            lineNumber: 53,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "area",
                            type: "text",
                            value: area,
                            onChange: (e)=>setArea(e.target.value),
                            placeholder: "エリア（例：渋谷、銀座）",
                            className: "w-full bg-transparent border-none focus:ring-0 p-0 text-slate-900 font-bold placeholder:text-slate-300 text-base truncate"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SearchInput.tsx",
                            lineNumber: 54,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SearchInput.tsx",
                    lineNumber: 52,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: loading,
                    className: "ml-2 bg-[#E65100] hover:bg-[#F57C00] text-white p-4 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-orange-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 aspect-square h-14 w-14",
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-6 h-6 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SearchInput.tsx",
                        lineNumber: 70,
                        columnNumber: 32
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "w-6 h-6 font-bold"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SearchInput.tsx",
                        lineNumber: 70,
                        columnNumber: 79
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/SearchInput.tsx",
                    lineNumber: 65,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/SearchInput.tsx",
            lineNumber: 36,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/SearchInput.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
_s(SearchInput, "DvdG6xV27ibtuzLLA8CYtO9GkoI=");
_c = SearchInput;
var _c;
__turbopack_context__.k.register(_c, "SearchInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/server/actions/data:b86e56 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40e435efbaae0dfe597a9f49211d91019dc5811eb7":"searchAndAnalyze"},"src/server/actions/place.ts",""] */ __turbopack_context__.s([
    "searchAndAnalyze",
    ()=>searchAndAnalyze
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var searchAndAnalyze = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40e435efbaae0dfe597a9f49211d91019dc5811eb7", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "searchAndAnalyze"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGxhY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInO1xyXG5cclxuaW1wb3J0IHsgR29vZ2xlQXV0aCB9IGZyb20gJ2dvb2dsZS1hdXRoLWxpYnJhcnknO1xyXG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tICdAL2xpYi9maXJlYmFzZS9hZG1pbic7XHJcbmltcG9ydCB7IGVucXVldWVBbmFseXNpcyB9IGZyb20gJ0AvbGliL3F1ZXVlL2NsaWVudCc7XHJcbmltcG9ydCB7IFBsYWNlIH0gZnJvbSAnQC90eXBlcy9zY2hlbWEnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEFuZEFuYWx5emUocXVlcnk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zb2xlLmxvZyhgQW5hbHl6aW5nIHBsYWNlOiAke3F1ZXJ5fWApO1xyXG4gICAgY29uc3QgcGxhY2VJZCA9IHF1ZXJ5OyAvLyBJbiB0aGUgbmV3IGZsb3csIHF1ZXJ5IGlzIHRoZSBwbGFjZUlkXHJcblxyXG4gICAgY29uc3QgZG9jUmVmID0gZ2V0RmlyZXN0b3JlKCkuY29sbGVjdGlvbigncGxhY2VzJykuZG9jKHBsYWNlSWQpO1xyXG4gICAgY29uc3QgZG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xyXG5cclxuICAgIGlmIChkb2MuZXhpc3RzKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgYXMgUGxhY2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBsYWNlICR7cGxhY2VJZH0gZm91bmQuIFN0YXR1czogJHtkYXRhLnN0YXR1c31gKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGV4cGlyYXRpb24gKDMwIGRheXMpXHJcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSBkYXRhLnVwZGF0ZWRBdCA/IChkYXRhLnVwZGF0ZWRBdCBhcyBhbnkpLnRvRGF0ZSgpIDogbmV3IERhdGUoMCk7IC8vIEhhbmRsZSBGaXJlc3RvcmUgVGltZXN0YW1wXHJcbiAgICAgICAgY29uc3QgZGlmZlRpbWUgPSBNYXRoLmFicyhub3cuZ2V0VGltZSgpIC0gdXBkYXRlZEF0LmdldFRpbWUoKSk7XHJcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmNlaWwoZGlmZlRpbWUgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG5cclxuICAgICAgICBpZiAoZGlmZkRheXMgPiAzMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGxhY2UgJHtwbGFjZUlkfSBkYXRhIGlzIGV4cGlyZWQgKCR7ZGlmZkRheXN9IGRheXMgb2xkKS4gUmUtZmV0Y2hpbmcuLi5gKTtcclxuICAgICAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGZldGNoIGxvZ2ljXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBhd2FpdCBlbnF1ZXVlQW5hbHlzaXMocGxhY2VJZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGFjZUlkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGFjZUlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB3ZSBhcmUgaGVyZSwgaXQgbWVhbnMgZWl0aGVyIGRvYyBkb2Vzbid0IGV4aXN0IE9SIGl0J3MgZXhwaXJlZC5cclxuICAgIC8vIFdlIG5lZWQgdG8gZmV0Y2ggZnJvbSBHb29nbGUgUGxhY2VzIEFQSS5cclxuICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBmcmVzaCBkYXRhIGZvciBwbGFjZSAke3BsYWNlSWR9Li4uYCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhdXRoID0gbmV3IEdvb2dsZUF1dGgoe1xyXG4gICAgICAgICAgICBzY29wZXM6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2Nsb3VkLXBsYXRmb3JtJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGF1dGguZ2V0Q2xpZW50KCk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBjbGllbnQuZ2V0QWNjZXNzVG9rZW4oKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGBodHRwczovL3BsYWNlcy5nb29nbGVhcGlzLmNvbS92MS9wbGFjZXMvJHtwbGFjZUlkfT9sYW5ndWFnZUNvZGU9amFgO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VuLnRva2VufWAsXHJcbiAgICAgICAgICAgICdYLUdvb2ctRmllbGRNYXNrJzogJ2lkLGRpc3BsYXlOYW1lLGZvcm1hdHRlZEFkZHJlc3MscmF0aW5nLHVzZXJSYXRpbmdDb3VudCxyZXZpZXdzLHByaWNlTGV2ZWwscHJpY2VSYW5nZSxwYXltZW50T3B0aW9ucyxkZWxpdmVyeSx0YWtlb3V0LGRpbmVJbixyZXNlcnZhYmxlLHNlcnZlc0JlZXIsc2VydmVzV2luZSxzZXJ2ZXNWZWdldGFyaWFuRm9vZCxzZXJ2ZXNDb2ZmZWUsc2VydmVzQnJlYWtmYXN0LHNlcnZlc0x1bmNoLHNlcnZlc0Rpbm5lcixnb29kRm9yQ2hpbGRyZW4sZ29vZEZvckdyb3VwcyxyZXN0cm9vbSxhY2Nlc3NpYmlsaXR5T3B0aW9ucydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGJhc2VVcmwsIHsgbWV0aG9kOiAnR0VUJywgaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0dvb2dsZSBQbGFjZXMgQVBJIERldGFpbHMgRXJyb3I6JywgZXJyb3JUZXh0KTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb29nbGUgUGxhY2VzIEFQSSBFcnJvcjogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQVBJIFJlc3BvbnNlIERhdGE6JywgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpO1xyXG5cclxuICAgICAgICAvLyBFeHRyYWN0IHJldmlld3NcclxuICAgICAgICBjb25zdCByZXZpZXdzID0gZGF0YS5yZXZpZXdzPy5tYXAoKHI6IGFueSkgPT4gci50ZXh0Py50ZXh0KS5maWx0ZXIoQm9vbGVhbikgfHwgW107XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGVkIHJldmlld3M6ICR7cmV2aWV3cy5sZW5ndGh9YCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1BsYWNlOiBQbGFjZSA9IHtcclxuICAgICAgICAgICAgaWQ6IGRhdGEuaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IGRhdGEuZGlzcGxheU5hbWU/LnRleHQgfHwgJ1Vua25vd24nLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBkYXRhLmZvcm1hdHRlZEFkZHJlc3MsXHJcbiAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nOiBkYXRhLnJhdGluZyB8fCAwLFxyXG4gICAgICAgICAgICB1c2VyUmF0aW5nc1RvdGFsOiBkYXRhLnVzZXJSYXRpbmdDb3VudCB8fCAwLFxyXG4gICAgICAgICAgICAuLi4oZGF0YS5wcmljZUxldmVsID8geyBwcmljZUxldmVsOiBkYXRhLnByaWNlTGV2ZWwgfSA6IHt9KSxcclxuICAgICAgICAgICAgLi4uKGRhdGEucHJpY2VSYW5nZSA/IHsgcHJpY2VSYW5nZTogZGF0YS5wcmljZVJhbmdlIH0gOiB7fSksXHJcbiAgICAgICAgICAgIHJldmlld3M6IHJldmlld3MsXHJcbiAgICAgICAgICAgIGRldGFpbGVkSW5mbzoge1xyXG4gICAgICAgICAgICAgICAgcGF5bWVudE9wdGlvbnM6IGRhdGEucGF5bWVudE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5OiBkYXRhLmRlbGl2ZXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRha2VvdXQ6IGRhdGEudGFrZW91dCxcclxuICAgICAgICAgICAgICAgICAgICBkaW5lSW46IGRhdGEuZGluZUluLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc2VydmFibGU6IGRhdGEucmVzZXJ2YWJsZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9mZmVyaW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlc0JlZXI6IGRhdGEuc2VydmVzQmVlcixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNXaW5lOiBkYXRhLnNlcnZlc1dpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVzVmVnZXRhcmlhbkZvb2Q6IGRhdGEuc2VydmVzVmVnZXRhcmlhbkZvb2QsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVzQ29mZmVlOiBkYXRhLnNlcnZlc0NvZmZlZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRpbmluZ09wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNCcmVha2Zhc3Q6IGRhdGEuc2VydmVzQnJlYWtmYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlc0x1bmNoOiBkYXRhLnNlcnZlc0x1bmNoLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlc0Rpbm5lcjogZGF0YS5zZXJ2ZXNEaW5uZXJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhbWVuaXRpZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXN0cm9vbTogZGF0YS5yZXN0cm9vbSxcclxuICAgICAgICAgICAgICAgICAgICBnb29kRm9yQ2hpbGRyZW46IGRhdGEuZ29vZEZvckNoaWxkcmVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGdvb2RGb3JHcm91cHM6IGRhdGEuZ29vZEZvckdyb3Vwc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhdHVzOiAncGVuZGluZycsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogZG9jLmV4aXN0cyA/IChkb2MuZGF0YSgpIGFzIFBsYWNlKS5jcmVhdGVkQXQgOiBuZXcgRGF0ZSgpLCAvLyBLZWVwIG9yaWdpbmFsIGNyZWF0ZWRBdCBpZiBleGlzdHNcclxuICAgICAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGF3YWl0IGRvY1JlZi5zZXQobmV3UGxhY2UpO1xyXG4gICAgICAgIGF3YWl0IGVucXVldWVBbmFseXNpcyhwbGFjZUlkKTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBwbGFjZSBkZXRhaWxzOicsIGVycm9yKTtcclxuICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGxhY2VJZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQbGFjZVNlYXJjaFJlc3VsdCB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcmF0aW5nOiBudW1iZXI7XHJcbiAgICB1c2VyUmF0aW5nc1RvdGFsOiBudW1iZXI7XHJcbiAgICB2aWNpbml0eT86IHN0cmluZztcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2VhcmNoUGxhY2VzSWRPbmx5KHF1ZXJ5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XHJcbiAgICBjb25zb2xlLmxvZyhgU2VhcmNoaW5nIHBsYWNlcyAoSUQgb25seSkgZm9yOiAke3F1ZXJ5fWApO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhdXRoID0gbmV3IEdvb2dsZUF1dGgoe1xyXG4gICAgICAgICAgICBzY29wZXM6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2Nsb3VkLXBsYXRmb3JtJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGF1dGguZ2V0Q2xpZW50KCk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBjbGllbnQuZ2V0QWNjZXNzVG9rZW4oKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9wbGFjZXMuZ29vZ2xlYXBpcy5jb20vdjEvcGxhY2VzOnNlYXJjaFRleHQnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW4udG9rZW59YCxcclxuICAgICAgICAgICAgICAgICdYLUdvb2ctRmllbGRNYXNrJzogJ3BsYWNlcy5pZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdGV4dFF1ZXJ5OiBxdWVyeSxcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZTogJ2phJyxcclxuICAgICAgICAgICAgICAgIG1heFJlc3VsdENvdW50OiAyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR29vZ2xlIFBsYWNlcyBBUEkgRXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEucGxhY2VzPy5tYXAoKHA6IGFueSkgPT4gcC5pZCkgfHwgW107XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzZWFyY2ggcGxhY2VzIChJRCBvbmx5KTonLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBsYWNlU2VhcmNoUmVzcG9uc2Uge1xyXG4gICAgcGxhY2VzOiBQbGFjZVNlYXJjaFJlc3VsdFtdO1xyXG4gICAgbmV4dFBhZ2VUb2tlbj86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaFBsYWNlcyhxdWVyeTogc3RyaW5nLCBwYWdlVG9rZW4/OiBzdHJpbmcpOiBQcm9taXNlPFBsYWNlU2VhcmNoUmVzcG9uc2U+IHtcclxuICAgIGNvbnNvbGUubG9nKGBTZWFyY2hpbmcgcGxhY2VzIGxpc3QgZm9yOiAke3F1ZXJ5fSwgcGFnZVRva2VuOiAke3BhZ2VUb2tlbiA/ICdZZXMnIDogJ05vJ31gKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIDEuIElEIFNlYXJjaCAoRnJlZSkgLSBTa2lwIGlmIHBhZ2luZ1xyXG4gICAgICAgIC8vIFBhZ2luYXRpb24gdXN1YWxseSBpbXBsaWVzIHdlIHNraXAgdGhlIGVmZmljaWVudCBJRC1vbmx5IGNoZWNrIGJlY2F1c2Ugd2UgY2FuJ3QgZWFzaWx5IG1hcCBwYWdlcyB0byBJRHMgd2l0aG91dCBmZXRjaGluZy5cclxuICAgICAgICAvLyBBbHNvLCBjYWNoZSBsb2dpYyBpcyBjb21wbGV4IHdpdGggcGFnaW5hdGlvbi5cclxuICAgICAgICAvLyBGb3Igc2ltcGxpY2l0eTogSWYgcGFnZVRva2VuIGlzIHByZXNlbnQsIGdvIHN0cmFpZ2h0IHRvIEFQSS5cclxuICAgICAgICAvLyBJZiBubyBwYWdlVG9rZW4sIHdlIGNhbiBUUlkgY2FjaGUsIGJ1dCB3ZSBuZWVkIHRvIGtub3cgaWYgd2UgaGF2ZSAqYWxsKiByZXN1bHRzP1xyXG4gICAgICAgIC8vIEFjdHVhbGx5LCB0aGUgcHJldmlvdXMgY2FjaGUgbG9naWMgd2FzIFwiSWYgd2UgaGF2ZSBBTEwgMjAgSURzIGluIGNhY2hlXCIuXHJcbiAgICAgICAgLy8gTm93IHZhbGlkIGZvciBmaXJzdCBwYWdlLlxyXG5cclxuICAgICAgICBsZXQgcGxhY2VJZHM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIC8vIE9ubHkgZG8gSUQgc2VhcmNoIGZvciBmaXJzdCBwYWdlIHRvIGNoZWNrIGNhY2hlXHJcbiAgICAgICAgaWYgKCFwYWdlVG9rZW4pIHtcclxuICAgICAgICAgICAgcGxhY2VJZHMgPSBhd2FpdCBzZWFyY2hQbGFjZXNJZE9ubHkocXVlcnkpO1xyXG4gICAgICAgICAgICBpZiAocGxhY2VJZHMubGVuZ3RoID09PSAwICYmICFwYWdlVG9rZW4pIHJldHVybiB7IHBsYWNlczogW10gfTtcclxuXHJcbiAgICAgICAgICAgIC8vIDIuIENoZWNrIENhY2hlIChPbmx5IGZvciBmaXJzdCBwYWdlKVxyXG4gICAgICAgICAgICBjb25zdCBkYiA9IGdldEZpcmVzdG9yZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBwbGFjZXNSZWYgPSBkYi5jb2xsZWN0aW9uKCdwbGFjZXMnKTtcclxuICAgICAgICAgICAgY29uc3QgY2FjaGVkUGxhY2VzOiBQbGFjZVNlYXJjaFJlc3VsdFtdID0gW107XHJcbiAgICAgICAgICAgIGxldCBhbGxDYWNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBpZCBvZiBwbGFjZUlkcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgcGxhY2VzUmVmLmRvYyhpZCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jLmV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIGFzIFBsYWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGV4cGlyYXRpb24gKDMwIGRheXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSBkYXRhLnVwZGF0ZWRBdCA/IChkYXRhLnVwZGF0ZWRBdCBhcyBhbnkpLnRvRGF0ZSgpIDogbmV3IERhdGUoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZlRpbWUgPSBNYXRoLmFicyhub3cuZ2V0VGltZSgpIC0gdXBkYXRlZEF0LmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmNlaWwoZGlmZlRpbWUgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZkRheXMgPD0gMzAgJiYgZGF0YS5zdGF0dXMgIT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVkUGxhY2VzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGRhdGEuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXRpbmc6IGRhdGEub3JpZ2luYWxSYXRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyUmF0aW5nc1RvdGFsOiBkYXRhLnVzZXJSYXRpbmdzVG90YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWNpbml0eTogZGF0YS5hZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbENhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbENhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAzLiBDb25kaXRpb25hbCBSZXR1cm4gKE9ubHkgaWYgYWxsIGNhY2hlZCBhbmQgbm8gcGFnZSB0b2tlbiBuZWVkZWQgbG9naWM/KVxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGNhY2hlZCBkYXRhIGZvciB0aGUgdG9wIDIwLCB3ZSByZXR1cm4gdGhlbS5cclxuICAgICAgICAgICAgLy8gQ29udmVydGluZyBjYWNoZSBoaXRzIHRvIGEgXCJOZXh0IFBhZ2VcIiBjYXBhYmxlIHJlc3BvbnNlIGlzIHRyaWNreSBiZWNhdXNlIHdlIGRvbid0IGhhdmUgdGhlIG5leHRQYWdlVG9rZW4gZnJvbSB0aGUgb3JpZ2luYWwgQVBJIGNhbGwgc3RvcmVkLlxyXG4gICAgICAgICAgICAvLyBJZiB3ZSByZXR1cm4gY2FjaGVkIGRhdGEsIHRoZSB1c2VyIENBTk5PVCBsb2FkIG1vcmUgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHRoZSB0b2tlbi5cclxuICAgICAgICAgICAgLy8gRVJST1I6IFVzaW5nIGNhY2hlIGJyZWFrcyBwYWdpbmF0aW9uP1xyXG4gICAgICAgICAgICAvLyBcIkxvYWQgTW9yZVwiIHJlbGllcyBvbiBHb29nbGUncyBgbmV4dFBhZ2VUb2tlbmAuIFJldmlld2luZyBmbG93OlxyXG4gICAgICAgICAgICAvLyBRdWVyeSAtPiBHb29nbGUgQVBJIC0+IFJldHVybnMgaXRlbXMgKyBUb2tlbi5cclxuICAgICAgICAgICAgLy8gSWYgd2Ugc2F0aXNmeSBmcm9tIENhY2hlLCB3ZSBET04nVCBoYXZlIHRoZSBUb2tlbi5cclxuICAgICAgICAgICAgLy8gU28gaWYgd2UgdXNlIENhY2hlLCBcIkxvYWQgTW9yZVwiIGlzIGltcG9zc2libGUgdW5sZXNzIHdlIHJlLWZldGNoIGZyb20gQVBJIHVzaW5nIHRoZSBvcmlnaW5hbCBxdWVyeT9cclxuICAgICAgICAgICAgLy8gQ29tcHJvbWlzZTogSWYgd2UgcmV0dXJuIGNhY2hlZCByZXN1bHRzLCB3ZSBzZXQgYG5leHRQYWdlVG9rZW5gIHRvIG51bGwuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHdhbnRzIFwiTW9yZVwiLCB0aGV5IG1pZ2h0IGJlIHN0dWNrP1xyXG4gICAgICAgICAgICAvLyBBY3R1YWxseSwgaWYgdGhlIGNhY2hlIGhhcyAyMCBpdGVtcywgYW5kIHdlIHNob3cgMjAgaXRlbXMuLi5cclxuICAgICAgICAgICAgLy8gVXNlciBzYXlzIFwiTG9hZCBNb3JlXCIuIFdlIGRvbid0IGhhdmUgdG9rZW4uXHJcbiAgICAgICAgICAgIC8vIFdlJ2QgaGF2ZSB0byB0cmlnZ2VyIGEgTkVXIHNlYXJjaCAoQVBJKSBza2lwcGluZyB0aGUgZmlyc3QgMjA/IE5vLCBHb29nbGUgQVBJIGRvZXNuJ3Qgc3VwcG9ydCBcIm9mZnNldFwiLlxyXG4gICAgICAgICAgICAvLyBTbywgaWYgd2Ugd2FudCB0byBzdXBwb3J0IFwiTG9hZCBNb3JlXCIsIHdlIE1VU1QgZmV0Y2ggZnJvbSBBUEkgdG8gZ2V0IHRoZSB0b2tlbiwgT1Igd2UgYWNjZXB0IHRoYXQgXCJDYWNoZWQgcmVzdWx0cyBoYXZlIG5vIG5leHQgcGFnZVwiLlxyXG4gICAgICAgICAgICAvLyBTaW5jZSB0aGUgdXNlciBFWFBMSUNJVExZIHJlcXVlc3RlZCBcIk1vcmVcIiwgd2Ugc2hvdWxkIHByaW9yaXRpemUgQVBJIHRva2VuIGF2YWlsYWJpbGl0eSBpZiBwb3NzaWJsZSwgT1IganVzdCBkaXNhYmxlIGNhY2hlIGZvciBub3cgdG8gZW5zdXJlIGZlYXR1cmUgd29ya3M/XHJcbiAgICAgICAgICAgIC8vIE9yLCB3ZSByZXR1cm4gY2FjaGVkIHJlc3VsdHMsIGJ1dCBpZiB1c2VyIGNsaWNrcyBcIk1vcmVcIiAod2hpY2ggd29uJ3QgZXhpc3Q/KSwgdGhleSBjYW4ndC5cclxuICAgICAgICAgICAgLy8gTGV0J3MgRGlzYWJsZSBDYWNoZSBmb3Igbm93IHRvIGVuc3VyZSBQYWdpbmF0aW9uIHdvcmtzIGNvcnJlY3RseSBhcyBwZXIgdXNlciByZXF1ZXN0LlxyXG4gICAgICAgICAgICAvLyBPciBvbmx5IGRpc2FibGUgY2FjaGUgaWYgd2UgZXhwZWN0IG1vcmUgdGhhbiAyMCByZXN1bHRzPyBXZSBkb24ndCBrbm93LlxyXG4gICAgICAgICAgICAvLyBEaXNhYmxpbmcgY2FjaGUgZm9yIFNlYXJjaCBMaXN0IGlzIHNhZmVyIGZvciB0aGlzIGZlYXR1cmUuXHJcblxyXG4gICAgICAgICAgICAvLyBOT1RFOiBDYWNoaW5nIGN1cnJlbnRseSBkaXNhYmxlZCBmb3IgZGlyZWN0IHNlYXJjaCB0byBlbnN1cmUgUEFHSU5BVElPTiB3b3JrcyAobmVlZHMgZnJlc2ggbmV4dFBhZ2VUb2tlbikuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnRmV0Y2hpbmcgZnJlc2ggZGF0YSBmcm9tIEFQSS4uLicpO1xyXG5cclxuICAgICAgICAvLyA0LiBGYWxsYmFjayB0byBGdWxsIFNlYXJjaCAoUHJvKVxyXG4gICAgICAgIGNvbnN0IGF1dGggPSBuZXcgR29vZ2xlQXV0aCh7XHJcbiAgICAgICAgICAgIHNjb3BlczogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvY2xvdWQtcGxhdGZvcm0nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgYXV0aC5nZXRDbGllbnQoKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGNsaWVudC5nZXRBY2Nlc3NUb2tlbigpO1xyXG5cclxuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keTogYW55ID0ge1xyXG4gICAgICAgICAgICB0ZXh0UXVlcnk6IHF1ZXJ5LFxyXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGU6ICdqYScsXHJcbiAgICAgICAgICAgIG1heFJlc3VsdENvdW50OiAyMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChwYWdlVG9rZW4pIHtcclxuICAgICAgICAgICAgcmVxdWVzdEJvZHkucGFnZVRva2VuID0gcGFnZVRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9wbGFjZXMuZ29vZ2xlYXBpcy5jb20vdjEvcGxhY2VzOnNlYXJjaFRleHQnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW4udG9rZW59YCxcclxuICAgICAgICAgICAgICAgICdYLUdvb2ctRmllbGRNYXNrJzogJ3BsYWNlcy5pZCxwbGFjZXMuZGlzcGxheU5hbWUscGxhY2VzLmZvcm1hdHRlZEFkZHJlc3MscGxhY2VzLnJhdGluZyxwbGFjZXMudXNlclJhdGluZ0NvdW50LHBsYWNlcy5yZXZpZXdzLHBsYWNlcy5wcmljZUxldmVsLHBsYWNlcy5wcmljZVJhbmdlLHBsYWNlcy5wYXltZW50T3B0aW9ucyxwbGFjZXMuZGVsaXZlcnkscGxhY2VzLnRha2VvdXQscGxhY2VzLmRpbmVJbixwbGFjZXMucmVzZXJ2YWJsZSxwbGFjZXMuc2VydmVzQmVlcixwbGFjZXMuc2VydmVzV2luZSxwbGFjZXMuc2VydmVzVmVnZXRhcmlhbkZvb2QscGxhY2VzLnNlcnZlc0NvZmZlZSxwbGFjZXMuc2VydmVzQnJlYWtmYXN0LHBsYWNlcy5zZXJ2ZXNMdW5jaCxwbGFjZXMuc2VydmVzRGlubmVyLHBsYWNlcy5nb29kRm9yQ2hpbGRyZW4scGxhY2VzLmdvb2RGb3JHcm91cHMscGxhY2VzLnJlc3Ryb29tLHBsYWNlcy5hY2Nlc3NpYmlsaXR5T3B0aW9ucyxuZXh0UGFnZVRva2VuJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0dvb2dsZSBQbGFjZXMgQVBJIEVycm9yOicsIGVycm9yVGV4dCk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR29vZ2xlIFBsYWNlcyBBUEkgRXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5wbGFjZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgcGxhY2VzOiBbXSB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoKTsgLy8gRW5zdXJlIERCIGlzIGluaXRpYWxpemVkXHJcbiAgICAgICAgY29uc3QgcGxhY2VzUmVmID0gZGIuY29sbGVjdGlvbigncGxhY2VzJyk7XHJcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBkYi5iYXRjaCgpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IFBsYWNlU2VhcmNoUmVzdWx0W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBwbGFjZURhdGEgb2YgZGF0YS5wbGFjZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgcmV2aWV3cyA9IHBsYWNlRGF0YS5yZXZpZXdzPy5tYXAoKHI6IGFueSkgPT4gci50ZXh0Py50ZXh0KS5maWx0ZXIoQm9vbGVhbikgfHwgW107XHJcblxyXG4gICAgICAgICAgICAvLyBDb25zdHJ1Y3QgZnVsbCBQbGFjZSBvYmplY3QgdG8gY2FjaGVcclxuICAgICAgICAgICAgLy8gVXNlIFBhcnRpYWw8UGxhY2U+IHRvIGF2b2lkICdtaXNzaW5nIHByb3BlcnR5JyBlcnJvcnMgd2hlbiB3ZSBkZWxpYmVyYXRlbHkgb21pdCAnc3RhdHVzJyB0byBwcmVzZXJ2ZSBpdFxyXG4gICAgICAgICAgICBjb25zdCBuZXdQbGFjZTogUGFydGlhbDxQbGFjZT4gPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogcGxhY2VEYXRhLmlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogcGxhY2VEYXRhLmRpc3BsYXlOYW1lPy50ZXh0IHx8ICdVbmtub3duJyxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IHBsYWNlRGF0YS5mb3JtYXR0ZWRBZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmc6IHBsYWNlRGF0YS5yYXRpbmcgfHwgMCxcclxuICAgICAgICAgICAgICAgIHVzZXJSYXRpbmdzVG90YWw6IHBsYWNlRGF0YS51c2VyUmF0aW5nQ291bnQgfHwgMCxcclxuICAgICAgICAgICAgICAgIC4uLihwbGFjZURhdGEucHJpY2VMZXZlbCA/IHsgcHJpY2VMZXZlbDogcGxhY2VEYXRhLnByaWNlTGV2ZWwgfSA6IHt9KSxcclxuICAgICAgICAgICAgICAgIC4uLihwbGFjZURhdGEucHJpY2VSYW5nZSA/IHsgcHJpY2VSYW5nZTogcGxhY2VEYXRhLnByaWNlUmFuZ2UgfSA6IHt9KSxcclxuICAgICAgICAgICAgICAgIHJldmlld3M6IHJldmlld3MsXHJcbiAgICAgICAgICAgICAgICBkZXRhaWxlZEluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXltZW50T3B0aW9uczogcGxhY2VEYXRhLnBheW1lbnRPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5OiBwbGFjZURhdGEuZGVsaXZlcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2VvdXQ6IHBsYWNlRGF0YS50YWtlb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaW5lSW46IHBsYWNlRGF0YS5kaW5lSW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VydmFibGU6IHBsYWNlRGF0YS5yZXNlcnZhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvZmZlcmluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVzQmVlcjogcGxhY2VEYXRhLnNlcnZlc0JlZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlc1dpbmU6IHBsYWNlRGF0YS5zZXJ2ZXNXaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNWZWdldGFyaWFuRm9vZDogcGxhY2VEYXRhLnNlcnZlc1ZlZ2V0YXJpYW5Gb29kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNDb2ZmZWU6IHBsYWNlRGF0YS5zZXJ2ZXNDb2ZmZWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpbmluZ09wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVzQnJlYWtmYXN0OiBwbGFjZURhdGEuc2VydmVzQnJlYWtmYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNMdW5jaDogcGxhY2VEYXRhLnNlcnZlc0x1bmNoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNEaW5uZXI6IHBsYWNlRGF0YS5zZXJ2ZXNEaW5uZXJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFtZW5pdGllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cm9vbTogcGxhY2VEYXRhLnJlc3Ryb29tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnb29kRm9yQ2hpbGRyZW46IHBsYWNlRGF0YS5nb29kRm9yQ2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvb2RGb3JHcm91cHM6IHBsYWNlRGF0YS5nb29kRm9yR3JvdXBzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByZXBhcmUgZm9yIHJldHVyblxyXG4gICAgICAgICAgICByZXN1bHRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWQ6IHBsYWNlRGF0YS5pZCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IHBsYWNlRGF0YS5kaXNwbGF5TmFtZT8udGV4dCB8fCAnVW5rbm93bicsXHJcbiAgICAgICAgICAgICAgICByYXRpbmc6IHBsYWNlRGF0YS5yYXRpbmcgfHwgMCxcclxuICAgICAgICAgICAgICAgIHVzZXJSYXRpbmdzVG90YWw6IHBsYWNlRGF0YS51c2VyUmF0aW5nQ291bnQgfHwgMCxcclxuICAgICAgICAgICAgICAgIHZpY2luaXR5OiBwbGFjZURhdGEuZm9ybWF0dGVkQWRkcmVzc1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IHBsYWNlc1JlZi5kb2MocGxhY2VEYXRhLmlkKTtcclxuICAgICAgICAgICAgLy8gVXNlIG1lcmdlOiB0cnVlIHRvIHVwZGF0ZSBleGlzdGluZyBkb2NzIHdpdGhvdXQgd2lwaW5nIG90aGVyIGZpZWxkc1xyXG4gICAgICAgICAgICBiYXRjaC5zZXQocmVmLCBuZXdQbGFjZSwgeyBtZXJnZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IGJhdGNoLmNvbW1pdCgpO1xyXG5cclxuICAgICAgICAvLyBGaXJlLWFuZC1mb3JnZXQgYW5hbHlzaXMgZm9yIGl0ZW1zIG5lZWRpbmcgaXRcclxuICAgICAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZWZzID0gcmVzdWx0cy5tYXAociA9PiBwbGFjZXNSZWYuZG9jKHIuaWQpKTtcclxuICAgICAgICAgICAgaWYgKHJlZnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc25hcHNob3RzID0gYXdhaXQgZGIuZ2V0QWxsKC4uLnJlZnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc25hcCBvZiBzbmFwc2hvdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gc25hcC5kYXRhKCkgYXMgUGxhY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBpZjpcclxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBTdGF0dXMgaXMgTUlTU0lORyAobmV3KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDIuIE9SIFN0YXR1cyBpcyAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMy4gV2UgZG8gTk9UIHJlLXRyaWdnZXIgaWYgJ3BlbmRpbmcnLCAncHJvY2Vzc2luZycsICdjb21wbGV0ZWQnLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5zdGF0dXMgfHwgZC5zdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRyaWdnZXJpbmcgYW5hbHlzaXMgZm9yICR7ZC5pZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHN0YXR1cyB0byBwZW5kaW5nIHRvIHByZXZlbnQgZG91YmxlLXF1ZXVlaW5nPyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWRlYWxseSB5ZXMsIGJ1dCBmaXJlLWFuZC1mb3JnZXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVucXVldWVBbmFseXNpcyhkLmlkKS5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBlbnF1ZXVlICR7ZC5pZH1gLCBlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2hlY2tpbmcgc3RhdHVzIGZvciBhbmFseXNpcyB0cmlnZ2VyXCIsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGxhY2VzOiByZXN1bHRzLFxyXG4gICAgICAgICAgICBuZXh0UGFnZVRva2VuOiBkYXRhLm5leHRQYWdlVG9rZW5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNlYXJjaCBwbGFjZXM6JywgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7IHBsYWNlczogW10gfTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFTQU9zQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/server/actions/data:70c0ed [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0047edd4398ea13d9b3b9f4186ff417685fecbe909":"getGoogleMapsApiKey"},"src/server/actions/config.ts",""] */ __turbopack_context__.s([
    "getGoogleMapsApiKey",
    ()=>getGoogleMapsApiKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getGoogleMapsApiKey = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("0047edd4398ea13d9b3b9f4186ff417685fecbe909", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getGoogleMapsApiKey"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29uZmlnLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRHb29nbGVNYXBzQXBpS2V5KCk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBrZXkgPSBwcm9jZXNzLmVudi5HT09HTEVfTUFQU19BUElfS0VZO1xyXG4gICAgY29uc29sZS5sb2coJ2dldEdvb2dsZU1hcHNBcGlLZXkgY2FsbGVkLiBLZXkgZXhpc3RzOicsICEha2V5KTtcclxuICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdHT09HTEVfTUFQU19BUElfS0VZIGlzIG5vdCBzZXQnKTtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ga2V5O1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoieVNBRXNCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AnalysisResult.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalysisResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$b86e56__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/server/actions/data:b86e56 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$70c0ed__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/server/actions/data:70c0ed [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/RadarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarRadiusAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Radar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-client] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.js [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils.js [app-client] (ecmascript) <export default as Utensils>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wine.js [app-client] (ecmascript) <export default as Wine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Accessibility$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/accessibility.js [app-client] (ecmascript) <export default as Accessibility>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AnalysisResult({ place, focusedAxes = [], onToggleAxis }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('evaluation');
    const [apiKey, setApiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isRetrying, setIsRetrying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalysisResult.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$70c0ed__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getGoogleMapsApiKey"])().then({
                "AnalysisResult.useEffect": (key)=>{
                    console.log('API Key fetched:', !!key);
                    setApiKey(key);
                }
            }["AnalysisResult.useEffect"]);
        }
    }["AnalysisResult.useEffect"], []);
    const handleRetry = async ()=>{
        setIsRetrying(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$b86e56__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["searchAndAnalyze"])(place.id);
        } catch (error) {
            console.error("Retry failed:", error);
            setIsRetrying(false);
        }
    };
    if (place.status === 'pending' || place.status === 'processing' || isRetrying) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center p-12 space-y-4 animate-pulse",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "w-12 h-12 text-rose-500 animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl text-slate-800 font-medium",
                    children: "AIが分析中..."
                }, void 0, false, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-500",
                    children: "数千件のレビューから真実を抽出しています"
                }, void 0, false, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 43,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AnalysisResult.tsx",
            lineNumber: 40,
            columnNumber: 13
        }, this);
    }
    if (place.status === 'error') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 bg-red-50 border border-red-100 rounded-3xl text-center shadow-sm flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-600 font-medium",
                    children: "分析に失敗しました。時間をおいて再度お試しください。"
                }, void 0, false, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 51,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleRetry,
                    disabled: isRetrying,
                    className: "flex items-center gap-2 px-6 py-2 bg-white border border-red-200 text-red-600 rounded-full hover:bg-red-50 transition-colors font-medium shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            className: `w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 57,
                            columnNumber: 21
                        }, this),
                        "再試行する"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 52,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AnalysisResult.tsx",
            lineNumber: 50,
            columnNumber: 13
        }, this);
    }
    // Personalized Score Calculation
    const calculatePersonalizedScore = ()=>{
        if (!place.axisScores || focusedAxes.length === 0) return null;
        const scores = place.axisScores;
        let totalScore = 0;
        let totalWeight = 0;
        const axesMap = {
            'taste': scores.taste,
            'service': scores.service,
            'atmosphere': scores.atmosphere,
            'cost': scores.cost
        };
        [
            'taste',
            'service',
            'atmosphere',
            'cost'
        ].forEach((axis)=>{
            const score = axesMap[axis] || 0;
            const weight = focusedAxes.includes(axis) ? 3 : 1;
            totalScore += score * weight;
            totalWeight += weight;
        });
        return totalScore / totalWeight;
    };
    const yourScore = calculatePersonalizedScore();
    const data = place.axisScores ? [
        {
            subject: '味',
            A: place.axisScores.taste,
            fullMark: 5
        },
        {
            subject: '接客',
            A: place.axisScores.service,
            fullMark: 5
        },
        {
            subject: '雰囲気',
            A: place.axisScores.atmosphere,
            fullMark: 5
        },
        {
            subject: 'コスパ',
            A: place.axisScores.cost,
            fullMark: 5
        }
    ] : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-slate-500 text-sm font-medium",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Google Maps 掲載店"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 104,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-4xl font-extrabold text-slate-900 tracking-tight leading-tight",
                            children: place.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 108,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                (()=>{
                                    // 1. Try Price Range
                                    if (place.priceRange) {
                                        const start = place.priceRange.startPrice?.units;
                                        const end = place.priceRange.endPrice?.units;
                                        if (start || end) {
                                            const label = `${start ? '¥' + Number(start).toLocaleString() : ''} ~ ${end ? '¥' + Number(end).toLocaleString() : ''}`;
                                            let color = 'bg-slate-500 text-white shadow-sm';
                                            let prefix = '';
                                            const price = Number(start || end || 0);
                                            if (price >= 10000) {
                                                color = 'bg-rose-600 text-white shadow-sm shadow-rose-200';
                                                prefix = '最高級';
                                            } else if (price >= 3000) {
                                                color = 'bg-orange-500 text-white shadow-sm shadow-orange-200';
                                                prefix = '高級';
                                            } else if (price >= 1000) {
                                                color = 'bg-blue-500 text-white shadow-sm shadow-blue-200';
                                                prefix = '標準';
                                            } else {
                                                color = 'bg-emerald-500 text-white shadow-sm shadow-emerald-200';
                                                prefix = 'お手頃';
                                            }
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border ${color}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            prefix,
                                                            " (",
                                                            label,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 139,
                                                columnNumber: 41
                                            }, this);
                                        }
                                    }
                                    // 2. Try Price Level
                                    const info = getPriceLevelInfo(place.priceLevel);
                                    if (!info) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border ${info.color}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 152,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: info.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 153,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 151,
                                        columnNumber: 33
                                    }, this);
                                })(),
                                place.usageScores?.business && place.usageScores.business >= 4.0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-bold tracking-wide shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 159,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "ビジネス"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 160,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 158,
                                    columnNumber: 29
                                }, this),
                                place.usageScores?.date && place.usageScores.date >= 4.0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold tracking-wide shadow-sm shadow-rose-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            className: "w-3 h-3 fill-current"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 165,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "デート"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 166,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 164,
                                    columnNumber: 29
                                }, this),
                                place.usageScores?.solo && place.usageScores.solo >= 4.0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-wide shadow-sm shadow-emerald-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 171,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "お一人様"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 172,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 170,
                                    columnNumber: 29
                                }, this),
                                place.usageScores?.family && place.usageScores.family >= 4.0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold tracking-wide shadow-sm shadow-orange-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 177,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "ファミリー"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 178,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 176,
                                    columnNumber: 29
                                }, this),
                                place.axisScores?.taste && place.axisScores.taste >= 4.5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-white text-xs font-bold tracking-wide shadow-sm shadow-amber-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 183,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "美食家認定"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 184,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 182,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 111,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 text-sm text-slate-600 mt-2",
                            children: [
                                place.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            className: "w-4 h-4 text-slate-400 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 193,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: place.address
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 194,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 192,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"], {
                                            className: "w-4 h-4 text-slate-400 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 199,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.id}`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-blue-600 hover:underline",
                                            children: "Google Mapで見る"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 200,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 198,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 190,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-slate-400 text-xs mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 213,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "tabular-nums",
                                    children: [
                                        "最終更新: ",
                                        formatDate(place.updatedAt)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 214,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 212,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 103,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex border-b border-gray-200 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('evaluation'),
                        className: `px-6 py-3 text-sm font-medium transition-colors relative ${activeTab === 'evaluation' ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'}`,
                        children: [
                            "評価",
                            activeTab === 'evaluation' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 w-full h-0.5 bg-orange-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 230,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 221,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('map'),
                        className: `px-6 py-3 text-sm font-medium transition-colors relative ${activeTab === 'map' ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'}`,
                        children: [
                            "地図",
                            activeTab === 'map' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 w-full h-0.5 bg-orange-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 242,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 233,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 220,
                columnNumber: 13
            }, this),
            activeTab === 'map' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-[500px] w-full",
                children: apiKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                    width: "100%",
                    height: "100%",
                    style: {
                        border: 0,
                        borderRadius: '0.75rem'
                    },
                    loading: "lazy",
                    allowFullScreen: true,
                    referrerPolicy: "no-referrer-when-downgrade",
                    src: `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${place.id}`
                }, void 0, false, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 251,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full flex items-center justify-center bg-gray-50 text-gray-400",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-8 h-8 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 262,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 261,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 249,
                columnNumber: 17
            }, this),
            activeTab === 'evaluation' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-slate-500",
                                children: "重視するポイントを選択してスコアをパーソナライズ（最大2つ）"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 273,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 justify-center",
                                children: [
                                    {
                                        id: 'taste',
                                        label: '味・料理',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__["Utensils"]
                                    },
                                    {
                                        id: 'service',
                                        label: '接客・サービス',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"]
                                    },
                                    {
                                        id: 'atmosphere',
                                        label: '雰囲気・空間',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"]
                                    },
                                    {
                                        id: 'cost',
                                        label: 'コスパ',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                                    }
                                ].map((axis)=>{
                                    const isSelected = focusedAxes.includes(axis.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onToggleAxis && onToggleAxis(axis.id),
                                        disabled: !onToggleAxis,
                                        className: `
                                       flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border shadow-sm
                                       ${isSelected ? 'bg-[#E65100] text-white border-[#E65100] transform scale-105 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-[#E65100] hover:text-[#E65100]'}
                                     `,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(axis.icon, {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 297,
                                                columnNumber: 41
                                            }, this),
                                            axis.label
                                        ]
                                    }, axis.id, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 285,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 276,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 272,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                            yourScore ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-6 rounded-xl shadow-lg border border-[#E65100] flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E65100] to-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 310,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[#E65100] font-bold mb-2",
                                        children: "あなたへのマッチ度"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 311,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-6xl font-bold text-[#E65100] tabular-nums",
                                                children: yourScore.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 313,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl text-orange-300 ml-1",
                                                children: "/5.0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 314,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 312,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mt-2 text-orange-500",
                                        children: [
                                            ...Array(5)
                                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                className: `w-6 h-6 ${i < Math.round(yourScore) ? 'fill-current' : 'text-orange-200'}`
                                            }, i, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 318,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 316,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex flex-col items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-slate-400",
                                                children: "AI分析スコア"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 325,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl font-bold text-slate-500",
                                                children: place.trueScore?.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 326,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 324,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 309,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-6 rounded-xl shadow-sm border border-orange-100 flex flex-col items-center justify-center relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 331,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-gray-500 font-medium mb-2",
                                        children: "AI分析スコア"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 332,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-6xl font-bold text-gray-900 tabular-nums",
                                                children: place.trueScore?.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 334,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl text-gray-400 ml-1",
                                                children: "/5.0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 335,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 333,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mt-2 text-orange-500",
                                        children: [
                                            ...Array(5)
                                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                className: `w-6 h-6 ${i < Math.round(place.trueScore || 0) ? 'fill-current' : 'text-gray-200'}`
                                            }, i, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 339,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 337,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mt-4 text-center",
                                        children: [
                                            "※信頼度の高い上位5件のレビューをもとに",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 346,
                                                columnNumber: 57
                                            }, this),
                                            "スコアを算出しています"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 345,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 330,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-gray-500 font-medium mb-2",
                                        children: "Google Map Score"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 353,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-4xl font-bold text-gray-700 tabular-nums",
                                                children: place.originalRating.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 355,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl text-gray-400 ml-1",
                                                children: "/5.0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 356,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 354,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mt-2 text-yellow-400",
                                        children: [
                                            ...Array(5)
                                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                className: `w-5 h-5 ${i < Math.round(place.originalRating) ? 'fill-current' : 'text-gray-300'}`
                                            }, i, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 360,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 358,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tabular-nums",
                                                children: place.userRatingsTotal.toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 367,
                                                columnNumber: 33
                                            }, this),
                                            " 件の評価"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 366,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 352,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 306,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1 bg-white rounded-3xl shadow-lg border border-slate-100 p-8 h-96",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-slate-900 mb-6",
                                        children: "バランス分析"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 376,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarChart"], {
                                            cx: "50%",
                                            cy: "45%",
                                            outerRadius: "70%",
                                            data: data,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarGrid"], {
                                                    stroke: "#e2e8f0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                                    dataKey: "subject",
                                                    tick: {
                                                        fill: '#64748b',
                                                        fontSize: 13,
                                                        fontWeight: 600
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarRadiusAxis"], {
                                                    angle: 30,
                                                    domain: [
                                                        0,
                                                        5
                                                    ],
                                                    tick: false,
                                                    axisLine: false
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                                    name: "Score",
                                                    dataKey: "A",
                                                    stroke: "#f43f5e",
                                                    strokeWidth: 3,
                                                    fill: "#f43f5e",
                                                    fillOpacity: 0.2
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 378,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 377,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 375,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"],
                                        label: "味・品質",
                                        value: place.axisScores?.taste
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 396,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"],
                                        label: "接客・サービス",
                                        value: place.axisScores?.service
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 397,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                        label: "雰囲気",
                                        value: place.axisScores?.atmosphere
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 398,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
                                        label: "コストパフォーマンス",
                                        value: place.axisScores?.cost
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 399,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 395,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 373,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-3xl shadow-lg border border-slate-100 p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-slate-900 mb-4",
                                    children: "AI分析サマリー"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 406,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-slate-600 leading-relaxed",
                                    children: place.summary
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 407,
                                    columnNumber: 29
                                }, this),
                                place.gapReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "flex items-center gap-2 font-bold text-amber-800 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 41
                                                }, this),
                                                "スコア分析インサイト"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 411,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-amber-900 text-sm leading-relaxed",
                                            children: place.gapReason
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalysisResult.tsx",
                                            lineNumber: 415,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 410,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 405,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 404,
                        columnNumber: 21
                    }, this),
                    place.axisAnalysis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "評価軸別 詳細分析"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 426,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AxisAnalysisCard, {
                                        title: "味・品質",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"],
                                        data: place.axisAnalysis.taste,
                                        color: "rose"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 428,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AxisAnalysisCard, {
                                        title: "接客・サービス",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"],
                                        data: place.axisAnalysis.service,
                                        color: "blue"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 434,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AxisAnalysisCard, {
                                        title: "雰囲気",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                        data: place.axisAnalysis.atmosphere,
                                        color: "purple"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 440,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AxisAnalysisCard, {
                                        title: "コストパフォーマンス",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
                                        data: place.axisAnalysis.cost,
                                        color: "emerald"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 446,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 427,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 425,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold text-slate-900 mb-8",
                                children: "どんなシーンにおすすめ？"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 458,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsageCard, {
                                        label: "ビジネス",
                                        subLabel: "接待・会食",
                                        value: place.usageScores?.business
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 460,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsageCard, {
                                        label: "デート",
                                        subLabel: "記念日・カップル",
                                        value: place.usageScores?.date
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 461,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsageCard, {
                                        label: "お一人様",
                                        subLabel: "ランチ・サク飲み",
                                        value: place.usageScores?.solo
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 462,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsageCard, {
                                        label: "ファミリー",
                                        subLabel: "お子様連れ",
                                        value: place.usageScores?.family
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 463,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsageCard, {
                                        label: "団体利用",
                                        subLabel: "宴会・飲み会",
                                        value: place.usageScores?.group
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 464,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 459,
                                columnNumber: 25
                            }, this),
                            place.usageSummary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-600 leading-relaxed",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-slate-700 mr-2",
                                        children: "💡 シーン分析:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 468,
                                        columnNumber: 33
                                    }, this),
                                    place.usageSummary
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 467,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 457,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BasicInfoSection, {
                        place: place
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 475,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnalysisResult.tsx",
        lineNumber: 99,
        columnNumber: 9
    }, this);
}
_s(AnalysisResult, "vG6We1mVl4X844Bh2tjxo4qo+e4=");
_c = AnalysisResult;
function BasicInfoSection({ place }) {
    const { detailedInfo } = place;
    if (!detailedInfo) return null;
    const { paymentOptions, serviceOptions, offerings, amenities, diningOptions } = detailedInfo;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-xl font-bold text-slate-900 mb-8",
                children: "基本情報"
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 490,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoGroup, {
                        title: "サービスオプション",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__["Utensils"],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "デリバリー",
                                value: serviceOptions?.delivery
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 495,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "テイクアウト",
                                value: serviceOptions?.takeout
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 496,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "イートイン",
                                value: serviceOptions?.dineIn
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 497,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "予約可",
                                value: serviceOptions?.reservable
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 498,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 494,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoGroup, {
                        title: "提供メニュー",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wine$3e$__["Wine"],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "アルコール",
                                value: offerings?.servesBeer || offerings?.servesWine
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 503,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "ベジタリアン料理",
                                value: offerings?.servesVegetarianFood
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 504,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "コーヒー",
                                value: offerings?.servesCoffee
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 505,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "朝食",
                                value: diningOptions?.servesBreakfast
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 506,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "ランチ",
                                value: diningOptions?.servesLunch
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 507,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "ディナー",
                                value: diningOptions?.servesDinner
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 508,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 502,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoGroup, {
                        title: "設備・環境",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$accessibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Accessibility$3e$__["Accessibility"],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "トイレ",
                                value: amenities?.restroom
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 513,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "子供連れOK",
                                value: amenities?.goodForChildren
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 514,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                label: "団体OK",
                                value: amenities?.goodForGroups
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 515,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 512,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoGroup, {
                        title: "決済方法",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
                        children: paymentOptions && paymentOptions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: paymentOptions.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200",
                                    children: formatPaymentOption(p)
                                }, i, false, {
                                    fileName: "[project]/src/components/AnalysisResult.tsx",
                                    lineNumber: 523,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 521,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-slate-400",
                            children: "情報なし"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 529,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 519,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 491,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnalysisResult.tsx",
        lineNumber: 489,
        columnNumber: 9
    }, this);
}
_c1 = BasicInfoSection;
function InfoGroup({ title, icon: Icon, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "w-5 h-5 text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 541,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 542,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 540,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 pl-2",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 544,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnalysisResult.tsx",
        lineNumber: 539,
        columnNumber: 9
    }, this);
}
_c2 = InfoGroup;
function InfoItem({ label, value }) {
    if (value === undefined) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 text-sm",
        children: [
            value ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                className: "w-4 h-4 text-emerald-500 shrink-0"
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 556,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                className: "w-4 h-4 text-slate-300 shrink-0"
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 558,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: value ? 'text-slate-700 font-medium' : 'text-slate-400',
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 560,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnalysisResult.tsx",
        lineNumber: 554,
        columnNumber: 9
    }, this);
}
_c3 = InfoItem;
function formatPaymentOption(option) {
    // Simple formatter, can be expanded
    return option.replace(/_/g, ' ').replace('PAYMENT_OPTION_', '');
}
function UsageCard({ label, subLabel, value }) {
    const score = value || 0;
    const isHigh = score >= 4.0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${isHigh ? 'bg-white border-rose-100 hover:border-rose-200' : 'bg-slate-50 border-transparent'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-slate-900 font-bold text-lg",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 578,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500 mt-1",
                                children: subLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 579,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 577,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-2xl font-black ${isHigh ? 'text-rose-500' : 'text-slate-300'}`,
                        children: score.toFixed(1)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 581,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 576,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2 bg-slate-100 rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-full rounded-full transition-all duration-1000 ${isHigh ? 'bg-rose-500' : 'bg-slate-300'}`,
                    style: {
                        width: `${score / 5 * 100}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 586,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 585,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnalysisResult.tsx",
        lineNumber: 575,
        columnNumber: 9
    }, this);
}
_c4 = UsageCard;
function MetricCard({ icon: Icon, label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 rounded-xl bg-slate-50 text-slate-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "w-6 h-6"
                }, void 0, false, {
                    fileName: "[project]/src/components/AnalysisResult.tsx",
                    lineNumber: 599,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 598,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-bold text-slate-900",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 603,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl font-black text-slate-900",
                                children: value?.toFixed(1)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 604,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 602,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 bg-slate-100 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-slate-900 rounded-full transition-all duration-1000",
                            style: {
                                width: `${value / 5 * 100}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 607,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 606,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 601,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnalysisResult.tsx",
        lineNumber: 597,
        columnNumber: 9
    }, this);
}
_c5 = MetricCard;
function AxisAnalysisCard({ title, icon: Icon, data, color }) {
    const colorClasses = {
        rose: {
            bg: 'bg-rose-50',
            border: 'border-rose-100',
            text: 'text-rose-800',
            dot: 'bg-rose-500'
        },
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            text: 'text-blue-800',
            dot: 'bg-blue-500'
        },
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-100',
            text: 'text-purple-800',
            dot: 'bg-purple-500'
        },
        emerald: {
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            text: 'text-emerald-800',
            dot: 'bg-emerald-500'
        }
    };
    const c = colorClasses[color] || colorClasses.rose;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-3xl border ${c.bg} ${c.border} p-6 h-full`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-2 rounded-xl bg-white/60 ${c.text}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnalysisResult.tsx",
                            lineNumber: 630,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 629,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: `font-bold text-lg ${c.text}`,
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 632,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 628,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-slate-700 font-medium mb-4 leading-relaxed bg-white/50 p-3 rounded-xl",
                children: data?.summary
            }, void 0, false, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 635,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 642,
                                        columnNumber: 25
                                    }, this),
                                    " 評価ポイント"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 641,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2",
                                children: data?.pros?.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-2 text-sm text-slate-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `mt-1.5 w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 647,
                                                columnNumber: 33
                                            }, this),
                                            p
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 646,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 644,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 640,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "w-3 h-3 rotate-180"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 655,
                                        columnNumber: 25
                                    }, this),
                                    " 懸念ポイント"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 654,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2",
                                children: data?.cons?.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-2 text-sm text-slate-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                                lineNumber: 660,
                                                columnNumber: 33
                                            }, this),
                                            c
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/AnalysisResult.tsx",
                                        lineNumber: 659,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalysisResult.tsx",
                                lineNumber: 657,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalysisResult.tsx",
                        lineNumber: 653,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalysisResult.tsx",
                lineNumber: 639,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnalysisResult.tsx",
        lineNumber: 627,
        columnNumber: 9
    }, this);
}
_c6 = AxisAnalysisCard;
function formatDate(date) {
    if (!date) return '不明';
    try {
        // Handle Firestore Timestamp (seconds, nanoseconds)
        if (date.seconds) {
            return new Date(date.seconds * 1000).toLocaleDateString('ja-JP');
        }
        // Handle string or Date object
        return new Date(date).toLocaleDateString('ja-JP');
    } catch (e) {
        return '不明';
    }
}
function getPriceLevelInfo(level) {
    switch(level){
        case 'PRICE_LEVEL_FREE':
            return {
                label: '無料',
                color: 'bg-slate-500 text-white shadow-sm'
            };
        case 'PRICE_LEVEL_INEXPENSIVE':
            return {
                label: 'お手頃 (~1,000円)',
                color: 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
            };
        case 'PRICE_LEVEL_MODERATE':
            return {
                label: '標準 (1,000円~3,000円)',
                color: 'bg-blue-500 text-white shadow-sm shadow-blue-200'
            };
        case 'PRICE_LEVEL_EXPENSIVE':
            return {
                label: '高級 (3,000円~10,000円)',
                color: 'bg-orange-500 text-white shadow-sm shadow-orange-200'
            };
        case 'PRICE_LEVEL_VERY_EXPENSIVE':
            return {
                label: '最高級 (10,000円~)',
                color: 'bg-rose-600 text-white shadow-sm shadow-rose-200'
            };
        default:
            return null;
    }
}
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "AnalysisResult");
__turbopack_context__.k.register(_c1, "BasicInfoSection");
__turbopack_context__.k.register(_c2, "InfoGroup");
__turbopack_context__.k.register(_c3, "InfoItem");
__turbopack_context__.k.register(_c4, "UsageCard");
__turbopack_context__.k.register(_c5, "MetricCard");
__turbopack_context__.k.register(_c6, "AxisAnalysisCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/ListingCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ListingCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
'use client';
;
;
function ListingCard({ title, location, rating, price, imageUrl, tags, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group cursor-pointer flex flex-col gap-4",
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100",
                children: [
                    imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: imageUrl,
                        alt: title,
                        className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/ListingCard.tsx",
                        lineNumber: 33,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full w-full items-center justify-center bg-gray-200 text-gray-400",
                        children: "No Image"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/ListingCard.tsx",
                        lineNumber: 39,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/ListingCard.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/ListingCard.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    tags && tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-1",
                        children: tags.map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] uppercase tracking-wider font-medium text-[#E65100] border border-[#E65100]/20 px-2 py-0.5 rounded-full",
                                children: tag
                            }, i, false, {
                                fileName: "[project]/src/components/ui/ListingCard.tsx",
                                lineNumber: 53,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/ListingCard.tsx",
                        lineNumber: 51,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-baseline",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-serif font-bold text-gray-900 group-hover:text-[#E65100] transition-colors duration-300 line-clamp-1",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ListingCard.tsx",
                                lineNumber: 61,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 shrink-0 bg-[#FAFAFA] px-2 py-0.5 rounded-full border border-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                        className: "w-3 h-3 fill-[#C5A059] text-[#C5A059]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/ListingCard.tsx",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-gray-700",
                                        children: rating.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/ListingCard.tsx",
                                        lineNumber: 66,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/ListingCard.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/ListingCard.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center text-sm text-gray-500 font-sans",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: location
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ListingCard.tsx",
                                lineNumber: 71,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900",
                                children: price
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ListingCard.tsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/ListingCard.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/ListingCard.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ListingCard.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
_c = ListingCard;
var _c;
__turbopack_context__.k.register(_c, "ListingCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PlaceListItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlaceListItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PlaceListItem({ initialPlace, onSelect, focusedAxes = [] }) {
    _s();
    const [placeData, setPlaceData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlaceListItem.useEffect": ()=>{
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firestore"], 'places', initialPlace.id), {
                "PlaceListItem.useEffect.unsubscribe": (docSnapshot)=>{
                    if (docSnapshot.exists()) {
                        setPlaceData({
                            ...docSnapshot.data(),
                            id: docSnapshot.id
                        });
                    }
                }
            }["PlaceListItem.useEffect.unsubscribe"]);
            return ({
                "PlaceListItem.useEffect": ()=>unsubscribe()
            })["PlaceListItem.useEffect"];
        }
    }["PlaceListItem.useEffect"], [
        initialPlace.id
    ]);
    const displayPlace = placeData ? {
        ...initialPlace,
        ...placeData
    } : initialPlace;
    const isAnalyzed = placeData?.trueScore != null;
    const isAnalyzing = placeData?.status === 'processing' || !isAnalyzed && placeData?.status !== 'error' && placeData?.status !== 'completed'; // Simplified check
    // Personalized Score Calculation
    const calculatePersonalizedScore = ()=>{
        if (!placeData?.axisScores || focusedAxes.length === 0) return null;
        const scores = placeData.axisScores;
        let totalScore = 0;
        let totalWeight = 0;
        const axesMap = {
            'taste': scores.taste,
            'service': scores.service,
            'atmosphere': scores.atmosphere,
            'cost': scores.cost
        };
        // Standard Axes (Taste, Service, Atmosphere, Cost)
        [
            'taste',
            'service',
            'atmosphere',
            'cost'
        ].forEach((axis)=>{
            const score = axesMap[axis] || 0;
            const weight = focusedAxes.includes(axis) ? 3 : 1;
            totalScore += score * weight;
            totalWeight += weight;
        });
        return totalScore / totalWeight;
    };
    const yourScore = calculatePersonalizedScore();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>onSelect(initialPlace.id),
        className: "bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 cursor-pointer group flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 flex-grow pr-2",
                        children: displayPlace.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlaceListItem.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-end shrink-0 ml-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-400 font-bold mb-0.5",
                                children: "Google Map Score"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                lineNumber: 75,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center bg-slate-50 px-2 py-1 rounded-lg border border-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                        className: "w-4 h-4 text-yellow-400 fill-yellow-400 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                        lineNumber: 77,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-slate-700",
                                        children: displayPlace.rating || initialPlace.rating
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-400 ml-1",
                                        children: [
                                            "(",
                                            displayPlace.userRatingsTotal || initialPlace.userRatingsTotal,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                        lineNumber: 79,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                lineNumber: 76,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PlaceListItem.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PlaceListItem.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden",
                children: isAnalyzed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        yourScore ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-in fade-in slide-in-from-top-2 duration-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base font-bold text-[#E65100] block mb-1",
                                                children: "あなたへのマッチ度"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                                lineNumber: 93,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-baseline gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl font-black text-[#E65100]",
                                                        children: yourScore.toFixed(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex text-orange-500",
                                                        children: [
                                                            ...Array(5)
                                                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                className: `w-4 h-4 ${i < Math.round(yourScore) ? 'fill-current' : 'text-gray-300'}`
                                                            }, i, false, {
                                                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 53
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                                lineNumber: 94,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                        lineNumber: 92,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right opacity-75",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-slate-400 block",
                                                children: "AI分析スコア"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                                lineNumber: 110,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-bold text-slate-600",
                                                children: placeData.trueScore?.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                                lineNumber: 111,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                        lineNumber: 109,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                lineNumber: 91,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/PlaceListItem.tsx",
                            lineNumber: 90,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold text-slate-500 block mb-1",
                                        children: "AI分析スコア"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                        lineNumber: 120,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl font-black text-[#E65100]",
                                                children: placeData.trueScore.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                                lineNumber: 122,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex text-orange-500",
                                                children: [
                                                    ...Array(5)
                                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                        className: `w-4 h-4 ${i < Math.round(placeData.trueScore || 0) ? 'fill-current' : 'text-gray-300'}`
                                                    }, i, false, {
                                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                                lineNumber: 125,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PlaceListItem.tsx",
                                        lineNumber: 121,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                lineNumber: 119,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/PlaceListItem.tsx",
                            lineNumber: 118,
                            columnNumber: 29
                        }, this),
                        placeData?.axisScores && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-4 gap-2 pt-3 border-t border-slate-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-xs font-medium mb-0.5 ${focusedAxes.includes('taste') ? 'text-[#E65100] font-bold' : 'text-slate-500'}`,
                                            children: "味"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlaceListItem.tsx",
                                            lineNumber: 142,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-base font-bold ${focusedAxes.includes('taste') ? 'text-[#E65100]' : 'text-slate-700'}`,
                                            children: placeData.axisScores.taste.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlaceListItem.tsx",
                                            lineNumber: 143,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PlaceListItem.tsx",
                                    lineNumber: 141,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-xs font-medium mb-0.5 ${focusedAxes.includes('service') ? 'text-[#E65100] font-bold' : 'text-slate-500'}`,
                                            children: "接客"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlaceListItem.tsx",
                                            lineNumber: 146,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-base font-bold ${focusedAxes.includes('service') ? 'text-[#E65100]' : 'text-slate-700'}`,
                                            children: placeData.axisScores.service.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlaceListItem.tsx",
                                            lineNumber: 147,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PlaceListItem.tsx",
                                    lineNumber: 145,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-xs font-medium mb-0.5 ${focusedAxes.includes('atmosphere') ? 'text-[#E65100] font-bold' : 'text-slate-500'}`,
                                            children: "雰囲気"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlaceListItem.tsx",
                                            lineNumber: 150,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-base font-bold ${focusedAxes.includes('atmosphere') ? 'text-[#E65100]' : 'text-slate-700'}`,
                                            children: placeData.axisScores.atmosphere.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlaceListItem.tsx",
                                            lineNumber: 151,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PlaceListItem.tsx",
                                    lineNumber: 149,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-xs font-medium mb-0.5 ${focusedAxes.includes('cost') ? 'text-[#E65100] font-bold' : 'text-slate-500'}`,
                                            children: "コスパ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlaceListItem.tsx",
                                            lineNumber: 154,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-base font-bold ${focusedAxes.includes('cost') ? 'text-[#E65100]' : 'text-slate-700'}`,
                                            children: placeData.axisScores.cost.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlaceListItem.tsx",
                                            lineNumber: 155,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PlaceListItem.tsx",
                                    lineNumber: 153,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/PlaceListItem.tsx",
                            lineNumber: 140,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PlaceListItem.tsx",
                    lineNumber: 87,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center py-4 gap-2 text-slate-400",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "w-5 h-5 animate-spin text-orange-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PlaceListItem.tsx",
                                lineNumber: 163,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/PlaceListItem.tsx",
                            lineNumber: 162,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "AI分析中..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/PlaceListItem.tsx",
                            lineNumber: 165,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PlaceListItem.tsx",
                    lineNumber: 161,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PlaceListItem.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow",
                children: (placeData?.address || initialPlace.vicinity) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start text-slate-500 text-sm mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                            className: "w-4 h-4 mr-1 mt-0.5 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/PlaceListItem.tsx",
                            lineNumber: 174,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "line-clamp-2",
                            children: placeData?.address || initialPlace.vicinity
                        }, void 0, false, {
                            fileName: "[project]/src/components/PlaceListItem.tsx",
                            lineNumber: 175,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PlaceListItem.tsx",
                    lineNumber: 173,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PlaceListItem.tsx",
                lineNumber: 170,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end mt-4 pt-4 border-t border-slate-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-bold text-slate-400 group-hover:text-orange-500 flex items-center transition-colors",
                    children: [
                        "詳細を見る ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "w-4 h-4 ml-1"
                        }, void 0, false, {
                            fileName: "[project]/src/components/PlaceListItem.tsx",
                            lineNumber: 182,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PlaceListItem.tsx",
                    lineNumber: 181,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PlaceListItem.tsx",
                lineNumber: 180,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PlaceListItem.tsx",
        lineNumber: 66,
        columnNumber: 9
    }, this);
}
_s(PlaceListItem, "DPxajjUrLc8C9XfctkoXlupsAGo=");
_c = PlaceListItem;
var _c;
__turbopack_context__.k.register(_c, "PlaceListItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PlaceList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlaceList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlaceListItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PlaceListItem.tsx [app-client] (ecmascript)");
'use client';
;
;
function PlaceList({ places, onSelect, onLoadMore, hasMore, loadingMore, focusedAxes }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-slate-900 mb-1",
                        children: "検索結果"
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlaceList.tsx",
                        lineNumber: 20,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500",
                        children: "検索キーワードに関連度の高い上位20件を表示しています"
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlaceList.tsx",
                        lineNumber: 21,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PlaceList.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8",
                children: places.map((place)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlaceListItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        initialPlace: place,
                        onSelect: onSelect,
                        focusedAxes: focusedAxes
                    }, place.id, false, {
                        fileName: "[project]/src/components/PlaceList.tsx",
                        lineNumber: 27,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/PlaceList.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this),
            hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mt-8 pb-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onLoadMore,
                    disabled: loadingMore,
                    className: "px-8 py-3 bg-white border border-slate-200 text-slate-600 font-medium rounded-full hover:bg-slate-50 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                    children: loadingMore ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PlaceList.tsx",
                                lineNumber: 45,
                                columnNumber: 33
                            }, this),
                            "読み込み中..."
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: "もっと見る"
                    }, void 0, false)
                }, void 0, false, {
                    fileName: "[project]/src/components/PlaceList.tsx",
                    lineNumber: 38,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PlaceList.tsx",
                lineNumber: 37,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PlaceList.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
_c = PlaceList;
var _c;
__turbopack_context__.k.register(_c, "PlaceList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/server/actions/data:95589c [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60d5cce93d4ea252ac94154191dbf7337d7cc925bf":"searchPlaces"},"src/server/actions/place.ts",""] */ __turbopack_context__.s([
    "searchPlaces",
    ()=>searchPlaces
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var searchPlaces = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60d5cce93d4ea252ac94154191dbf7337d7cc925bf", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "searchPlaces"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGxhY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInO1xyXG5cclxuaW1wb3J0IHsgR29vZ2xlQXV0aCB9IGZyb20gJ2dvb2dsZS1hdXRoLWxpYnJhcnknO1xyXG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tICdAL2xpYi9maXJlYmFzZS9hZG1pbic7XHJcbmltcG9ydCB7IGVucXVldWVBbmFseXNpcyB9IGZyb20gJ0AvbGliL3F1ZXVlL2NsaWVudCc7XHJcbmltcG9ydCB7IFBsYWNlIH0gZnJvbSAnQC90eXBlcy9zY2hlbWEnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEFuZEFuYWx5emUocXVlcnk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zb2xlLmxvZyhgQW5hbHl6aW5nIHBsYWNlOiAke3F1ZXJ5fWApO1xyXG4gICAgY29uc3QgcGxhY2VJZCA9IHF1ZXJ5OyAvLyBJbiB0aGUgbmV3IGZsb3csIHF1ZXJ5IGlzIHRoZSBwbGFjZUlkXHJcblxyXG4gICAgY29uc3QgZG9jUmVmID0gZ2V0RmlyZXN0b3JlKCkuY29sbGVjdGlvbigncGxhY2VzJykuZG9jKHBsYWNlSWQpO1xyXG4gICAgY29uc3QgZG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xyXG5cclxuICAgIGlmIChkb2MuZXhpc3RzKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5kYXRhKCkgYXMgUGxhY2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBsYWNlICR7cGxhY2VJZH0gZm91bmQuIFN0YXR1czogJHtkYXRhLnN0YXR1c31gKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGV4cGlyYXRpb24gKDMwIGRheXMpXHJcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSBkYXRhLnVwZGF0ZWRBdCA/IChkYXRhLnVwZGF0ZWRBdCBhcyBhbnkpLnRvRGF0ZSgpIDogbmV3IERhdGUoMCk7IC8vIEhhbmRsZSBGaXJlc3RvcmUgVGltZXN0YW1wXHJcbiAgICAgICAgY29uc3QgZGlmZlRpbWUgPSBNYXRoLmFicyhub3cuZ2V0VGltZSgpIC0gdXBkYXRlZEF0LmdldFRpbWUoKSk7XHJcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmNlaWwoZGlmZlRpbWUgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG5cclxuICAgICAgICBpZiAoZGlmZkRheXMgPiAzMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGxhY2UgJHtwbGFjZUlkfSBkYXRhIGlzIGV4cGlyZWQgKCR7ZGlmZkRheXN9IGRheXMgb2xkKS4gUmUtZmV0Y2hpbmcuLi5gKTtcclxuICAgICAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGZldGNoIGxvZ2ljXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBhd2FpdCBlbnF1ZXVlQW5hbHlzaXMocGxhY2VJZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGFjZUlkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGFjZUlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB3ZSBhcmUgaGVyZSwgaXQgbWVhbnMgZWl0aGVyIGRvYyBkb2Vzbid0IGV4aXN0IE9SIGl0J3MgZXhwaXJlZC5cclxuICAgIC8vIFdlIG5lZWQgdG8gZmV0Y2ggZnJvbSBHb29nbGUgUGxhY2VzIEFQSS5cclxuICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBmcmVzaCBkYXRhIGZvciBwbGFjZSAke3BsYWNlSWR9Li4uYCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhdXRoID0gbmV3IEdvb2dsZUF1dGgoe1xyXG4gICAgICAgICAgICBzY29wZXM6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2Nsb3VkLXBsYXRmb3JtJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGF1dGguZ2V0Q2xpZW50KCk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBjbGllbnQuZ2V0QWNjZXNzVG9rZW4oKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGBodHRwczovL3BsYWNlcy5nb29nbGVhcGlzLmNvbS92MS9wbGFjZXMvJHtwbGFjZUlkfT9sYW5ndWFnZUNvZGU9amFgO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VuLnRva2VufWAsXHJcbiAgICAgICAgICAgICdYLUdvb2ctRmllbGRNYXNrJzogJ2lkLGRpc3BsYXlOYW1lLGZvcm1hdHRlZEFkZHJlc3MscmF0aW5nLHVzZXJSYXRpbmdDb3VudCxyZXZpZXdzLHByaWNlTGV2ZWwscHJpY2VSYW5nZSxwYXltZW50T3B0aW9ucyxkZWxpdmVyeSx0YWtlb3V0LGRpbmVJbixyZXNlcnZhYmxlLHNlcnZlc0JlZXIsc2VydmVzV2luZSxzZXJ2ZXNWZWdldGFyaWFuRm9vZCxzZXJ2ZXNDb2ZmZWUsc2VydmVzQnJlYWtmYXN0LHNlcnZlc0x1bmNoLHNlcnZlc0Rpbm5lcixnb29kRm9yQ2hpbGRyZW4sZ29vZEZvckdyb3VwcyxyZXN0cm9vbSxhY2Nlc3NpYmlsaXR5T3B0aW9ucydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGJhc2VVcmwsIHsgbWV0aG9kOiAnR0VUJywgaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0dvb2dsZSBQbGFjZXMgQVBJIERldGFpbHMgRXJyb3I6JywgZXJyb3JUZXh0KTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb29nbGUgUGxhY2VzIEFQSSBFcnJvcjogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQVBJIFJlc3BvbnNlIERhdGE6JywgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpO1xyXG5cclxuICAgICAgICAvLyBFeHRyYWN0IHJldmlld3NcclxuICAgICAgICBjb25zdCByZXZpZXdzID0gZGF0YS5yZXZpZXdzPy5tYXAoKHI6IGFueSkgPT4gci50ZXh0Py50ZXh0KS5maWx0ZXIoQm9vbGVhbikgfHwgW107XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGVkIHJldmlld3M6ICR7cmV2aWV3cy5sZW5ndGh9YCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1BsYWNlOiBQbGFjZSA9IHtcclxuICAgICAgICAgICAgaWQ6IGRhdGEuaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IGRhdGEuZGlzcGxheU5hbWU/LnRleHQgfHwgJ1Vua25vd24nLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBkYXRhLmZvcm1hdHRlZEFkZHJlc3MsXHJcbiAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nOiBkYXRhLnJhdGluZyB8fCAwLFxyXG4gICAgICAgICAgICB1c2VyUmF0aW5nc1RvdGFsOiBkYXRhLnVzZXJSYXRpbmdDb3VudCB8fCAwLFxyXG4gICAgICAgICAgICAuLi4oZGF0YS5wcmljZUxldmVsID8geyBwcmljZUxldmVsOiBkYXRhLnByaWNlTGV2ZWwgfSA6IHt9KSxcclxuICAgICAgICAgICAgLi4uKGRhdGEucHJpY2VSYW5nZSA/IHsgcHJpY2VSYW5nZTogZGF0YS5wcmljZVJhbmdlIH0gOiB7fSksXHJcbiAgICAgICAgICAgIHJldmlld3M6IHJldmlld3MsXHJcbiAgICAgICAgICAgIGRldGFpbGVkSW5mbzoge1xyXG4gICAgICAgICAgICAgICAgcGF5bWVudE9wdGlvbnM6IGRhdGEucGF5bWVudE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5OiBkYXRhLmRlbGl2ZXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRha2VvdXQ6IGRhdGEudGFrZW91dCxcclxuICAgICAgICAgICAgICAgICAgICBkaW5lSW46IGRhdGEuZGluZUluLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc2VydmFibGU6IGRhdGEucmVzZXJ2YWJsZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9mZmVyaW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlc0JlZXI6IGRhdGEuc2VydmVzQmVlcixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNXaW5lOiBkYXRhLnNlcnZlc1dpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVzVmVnZXRhcmlhbkZvb2Q6IGRhdGEuc2VydmVzVmVnZXRhcmlhbkZvb2QsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVzQ29mZmVlOiBkYXRhLnNlcnZlc0NvZmZlZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRpbmluZ09wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNCcmVha2Zhc3Q6IGRhdGEuc2VydmVzQnJlYWtmYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlc0x1bmNoOiBkYXRhLnNlcnZlc0x1bmNoLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlc0Rpbm5lcjogZGF0YS5zZXJ2ZXNEaW5uZXJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhbWVuaXRpZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXN0cm9vbTogZGF0YS5yZXN0cm9vbSxcclxuICAgICAgICAgICAgICAgICAgICBnb29kRm9yQ2hpbGRyZW46IGRhdGEuZ29vZEZvckNoaWxkcmVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGdvb2RGb3JHcm91cHM6IGRhdGEuZ29vZEZvckdyb3Vwc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhdHVzOiAncGVuZGluZycsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogZG9jLmV4aXN0cyA/IChkb2MuZGF0YSgpIGFzIFBsYWNlKS5jcmVhdGVkQXQgOiBuZXcgRGF0ZSgpLCAvLyBLZWVwIG9yaWdpbmFsIGNyZWF0ZWRBdCBpZiBleGlzdHNcclxuICAgICAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGF3YWl0IGRvY1JlZi5zZXQobmV3UGxhY2UpO1xyXG4gICAgICAgIGF3YWl0IGVucXVldWVBbmFseXNpcyhwbGFjZUlkKTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBwbGFjZSBkZXRhaWxzOicsIGVycm9yKTtcclxuICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGxhY2VJZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQbGFjZVNlYXJjaFJlc3VsdCB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcmF0aW5nOiBudW1iZXI7XHJcbiAgICB1c2VyUmF0aW5nc1RvdGFsOiBudW1iZXI7XHJcbiAgICB2aWNpbml0eT86IHN0cmluZztcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2VhcmNoUGxhY2VzSWRPbmx5KHF1ZXJ5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XHJcbiAgICBjb25zb2xlLmxvZyhgU2VhcmNoaW5nIHBsYWNlcyAoSUQgb25seSkgZm9yOiAke3F1ZXJ5fWApO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhdXRoID0gbmV3IEdvb2dsZUF1dGgoe1xyXG4gICAgICAgICAgICBzY29wZXM6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2Nsb3VkLXBsYXRmb3JtJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGF1dGguZ2V0Q2xpZW50KCk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBjbGllbnQuZ2V0QWNjZXNzVG9rZW4oKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9wbGFjZXMuZ29vZ2xlYXBpcy5jb20vdjEvcGxhY2VzOnNlYXJjaFRleHQnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW4udG9rZW59YCxcclxuICAgICAgICAgICAgICAgICdYLUdvb2ctRmllbGRNYXNrJzogJ3BsYWNlcy5pZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdGV4dFF1ZXJ5OiBxdWVyeSxcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZTogJ2phJyxcclxuICAgICAgICAgICAgICAgIG1heFJlc3VsdENvdW50OiAyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR29vZ2xlIFBsYWNlcyBBUEkgRXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEucGxhY2VzPy5tYXAoKHA6IGFueSkgPT4gcC5pZCkgfHwgW107XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzZWFyY2ggcGxhY2VzIChJRCBvbmx5KTonLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBsYWNlU2VhcmNoUmVzcG9uc2Uge1xyXG4gICAgcGxhY2VzOiBQbGFjZVNlYXJjaFJlc3VsdFtdO1xyXG4gICAgbmV4dFBhZ2VUb2tlbj86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaFBsYWNlcyhxdWVyeTogc3RyaW5nLCBwYWdlVG9rZW4/OiBzdHJpbmcpOiBQcm9taXNlPFBsYWNlU2VhcmNoUmVzcG9uc2U+IHtcclxuICAgIGNvbnNvbGUubG9nKGBTZWFyY2hpbmcgcGxhY2VzIGxpc3QgZm9yOiAke3F1ZXJ5fSwgcGFnZVRva2VuOiAke3BhZ2VUb2tlbiA/ICdZZXMnIDogJ05vJ31gKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIDEuIElEIFNlYXJjaCAoRnJlZSkgLSBTa2lwIGlmIHBhZ2luZ1xyXG4gICAgICAgIC8vIFBhZ2luYXRpb24gdXN1YWxseSBpbXBsaWVzIHdlIHNraXAgdGhlIGVmZmljaWVudCBJRC1vbmx5IGNoZWNrIGJlY2F1c2Ugd2UgY2FuJ3QgZWFzaWx5IG1hcCBwYWdlcyB0byBJRHMgd2l0aG91dCBmZXRjaGluZy5cclxuICAgICAgICAvLyBBbHNvLCBjYWNoZSBsb2dpYyBpcyBjb21wbGV4IHdpdGggcGFnaW5hdGlvbi5cclxuICAgICAgICAvLyBGb3Igc2ltcGxpY2l0eTogSWYgcGFnZVRva2VuIGlzIHByZXNlbnQsIGdvIHN0cmFpZ2h0IHRvIEFQSS5cclxuICAgICAgICAvLyBJZiBubyBwYWdlVG9rZW4sIHdlIGNhbiBUUlkgY2FjaGUsIGJ1dCB3ZSBuZWVkIHRvIGtub3cgaWYgd2UgaGF2ZSAqYWxsKiByZXN1bHRzP1xyXG4gICAgICAgIC8vIEFjdHVhbGx5LCB0aGUgcHJldmlvdXMgY2FjaGUgbG9naWMgd2FzIFwiSWYgd2UgaGF2ZSBBTEwgMjAgSURzIGluIGNhY2hlXCIuXHJcbiAgICAgICAgLy8gTm93IHZhbGlkIGZvciBmaXJzdCBwYWdlLlxyXG5cclxuICAgICAgICBsZXQgcGxhY2VJZHM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIC8vIE9ubHkgZG8gSUQgc2VhcmNoIGZvciBmaXJzdCBwYWdlIHRvIGNoZWNrIGNhY2hlXHJcbiAgICAgICAgaWYgKCFwYWdlVG9rZW4pIHtcclxuICAgICAgICAgICAgcGxhY2VJZHMgPSBhd2FpdCBzZWFyY2hQbGFjZXNJZE9ubHkocXVlcnkpO1xyXG4gICAgICAgICAgICBpZiAocGxhY2VJZHMubGVuZ3RoID09PSAwICYmICFwYWdlVG9rZW4pIHJldHVybiB7IHBsYWNlczogW10gfTtcclxuXHJcbiAgICAgICAgICAgIC8vIDIuIENoZWNrIENhY2hlIChPbmx5IGZvciBmaXJzdCBwYWdlKVxyXG4gICAgICAgICAgICBjb25zdCBkYiA9IGdldEZpcmVzdG9yZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBwbGFjZXNSZWYgPSBkYi5jb2xsZWN0aW9uKCdwbGFjZXMnKTtcclxuICAgICAgICAgICAgY29uc3QgY2FjaGVkUGxhY2VzOiBQbGFjZVNlYXJjaFJlc3VsdFtdID0gW107XHJcbiAgICAgICAgICAgIGxldCBhbGxDYWNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBpZCBvZiBwbGFjZUlkcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgcGxhY2VzUmVmLmRvYyhpZCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jLmV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBkb2MuZGF0YSgpIGFzIFBsYWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGV4cGlyYXRpb24gKDMwIGRheXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSBkYXRhLnVwZGF0ZWRBdCA/IChkYXRhLnVwZGF0ZWRBdCBhcyBhbnkpLnRvRGF0ZSgpIDogbmV3IERhdGUoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZlRpbWUgPSBNYXRoLmFicyhub3cuZ2V0VGltZSgpIC0gdXBkYXRlZEF0LmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmNlaWwoZGlmZlRpbWUgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZkRheXMgPD0gMzAgJiYgZGF0YS5zdGF0dXMgIT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVkUGxhY2VzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGRhdGEuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXRpbmc6IGRhdGEub3JpZ2luYWxSYXRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyUmF0aW5nc1RvdGFsOiBkYXRhLnVzZXJSYXRpbmdzVG90YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWNpbml0eTogZGF0YS5hZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbENhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbENhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAzLiBDb25kaXRpb25hbCBSZXR1cm4gKE9ubHkgaWYgYWxsIGNhY2hlZCBhbmQgbm8gcGFnZSB0b2tlbiBuZWVkZWQgbG9naWM/KVxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGNhY2hlZCBkYXRhIGZvciB0aGUgdG9wIDIwLCB3ZSByZXR1cm4gdGhlbS5cclxuICAgICAgICAgICAgLy8gQ29udmVydGluZyBjYWNoZSBoaXRzIHRvIGEgXCJOZXh0IFBhZ2VcIiBjYXBhYmxlIHJlc3BvbnNlIGlzIHRyaWNreSBiZWNhdXNlIHdlIGRvbid0IGhhdmUgdGhlIG5leHRQYWdlVG9rZW4gZnJvbSB0aGUgb3JpZ2luYWwgQVBJIGNhbGwgc3RvcmVkLlxyXG4gICAgICAgICAgICAvLyBJZiB3ZSByZXR1cm4gY2FjaGVkIGRhdGEsIHRoZSB1c2VyIENBTk5PVCBsb2FkIG1vcmUgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHRoZSB0b2tlbi5cclxuICAgICAgICAgICAgLy8gRVJST1I6IFVzaW5nIGNhY2hlIGJyZWFrcyBwYWdpbmF0aW9uP1xyXG4gICAgICAgICAgICAvLyBcIkxvYWQgTW9yZVwiIHJlbGllcyBvbiBHb29nbGUncyBgbmV4dFBhZ2VUb2tlbmAuIFJldmlld2luZyBmbG93OlxyXG4gICAgICAgICAgICAvLyBRdWVyeSAtPiBHb29nbGUgQVBJIC0+IFJldHVybnMgaXRlbXMgKyBUb2tlbi5cclxuICAgICAgICAgICAgLy8gSWYgd2Ugc2F0aXNmeSBmcm9tIENhY2hlLCB3ZSBET04nVCBoYXZlIHRoZSBUb2tlbi5cclxuICAgICAgICAgICAgLy8gU28gaWYgd2UgdXNlIENhY2hlLCBcIkxvYWQgTW9yZVwiIGlzIGltcG9zc2libGUgdW5sZXNzIHdlIHJlLWZldGNoIGZyb20gQVBJIHVzaW5nIHRoZSBvcmlnaW5hbCBxdWVyeT9cclxuICAgICAgICAgICAgLy8gQ29tcHJvbWlzZTogSWYgd2UgcmV0dXJuIGNhY2hlZCByZXN1bHRzLCB3ZSBzZXQgYG5leHRQYWdlVG9rZW5gIHRvIG51bGwuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHdhbnRzIFwiTW9yZVwiLCB0aGV5IG1pZ2h0IGJlIHN0dWNrP1xyXG4gICAgICAgICAgICAvLyBBY3R1YWxseSwgaWYgdGhlIGNhY2hlIGhhcyAyMCBpdGVtcywgYW5kIHdlIHNob3cgMjAgaXRlbXMuLi5cclxuICAgICAgICAgICAgLy8gVXNlciBzYXlzIFwiTG9hZCBNb3JlXCIuIFdlIGRvbid0IGhhdmUgdG9rZW4uXHJcbiAgICAgICAgICAgIC8vIFdlJ2QgaGF2ZSB0byB0cmlnZ2VyIGEgTkVXIHNlYXJjaCAoQVBJKSBza2lwcGluZyB0aGUgZmlyc3QgMjA/IE5vLCBHb29nbGUgQVBJIGRvZXNuJ3Qgc3VwcG9ydCBcIm9mZnNldFwiLlxyXG4gICAgICAgICAgICAvLyBTbywgaWYgd2Ugd2FudCB0byBzdXBwb3J0IFwiTG9hZCBNb3JlXCIsIHdlIE1VU1QgZmV0Y2ggZnJvbSBBUEkgdG8gZ2V0IHRoZSB0b2tlbiwgT1Igd2UgYWNjZXB0IHRoYXQgXCJDYWNoZWQgcmVzdWx0cyBoYXZlIG5vIG5leHQgcGFnZVwiLlxyXG4gICAgICAgICAgICAvLyBTaW5jZSB0aGUgdXNlciBFWFBMSUNJVExZIHJlcXVlc3RlZCBcIk1vcmVcIiwgd2Ugc2hvdWxkIHByaW9yaXRpemUgQVBJIHRva2VuIGF2YWlsYWJpbGl0eSBpZiBwb3NzaWJsZSwgT1IganVzdCBkaXNhYmxlIGNhY2hlIGZvciBub3cgdG8gZW5zdXJlIGZlYXR1cmUgd29ya3M/XHJcbiAgICAgICAgICAgIC8vIE9yLCB3ZSByZXR1cm4gY2FjaGVkIHJlc3VsdHMsIGJ1dCBpZiB1c2VyIGNsaWNrcyBcIk1vcmVcIiAod2hpY2ggd29uJ3QgZXhpc3Q/KSwgdGhleSBjYW4ndC5cclxuICAgICAgICAgICAgLy8gTGV0J3MgRGlzYWJsZSBDYWNoZSBmb3Igbm93IHRvIGVuc3VyZSBQYWdpbmF0aW9uIHdvcmtzIGNvcnJlY3RseSBhcyBwZXIgdXNlciByZXF1ZXN0LlxyXG4gICAgICAgICAgICAvLyBPciBvbmx5IGRpc2FibGUgY2FjaGUgaWYgd2UgZXhwZWN0IG1vcmUgdGhhbiAyMCByZXN1bHRzPyBXZSBkb24ndCBrbm93LlxyXG4gICAgICAgICAgICAvLyBEaXNhYmxpbmcgY2FjaGUgZm9yIFNlYXJjaCBMaXN0IGlzIHNhZmVyIGZvciB0aGlzIGZlYXR1cmUuXHJcblxyXG4gICAgICAgICAgICAvLyBOT1RFOiBDYWNoaW5nIGN1cnJlbnRseSBkaXNhYmxlZCBmb3IgZGlyZWN0IHNlYXJjaCB0byBlbnN1cmUgUEFHSU5BVElPTiB3b3JrcyAobmVlZHMgZnJlc2ggbmV4dFBhZ2VUb2tlbikuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnRmV0Y2hpbmcgZnJlc2ggZGF0YSBmcm9tIEFQSS4uLicpO1xyXG5cclxuICAgICAgICAvLyA0LiBGYWxsYmFjayB0byBGdWxsIFNlYXJjaCAoUHJvKVxyXG4gICAgICAgIGNvbnN0IGF1dGggPSBuZXcgR29vZ2xlQXV0aCh7XHJcbiAgICAgICAgICAgIHNjb3BlczogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvY2xvdWQtcGxhdGZvcm0nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgYXV0aC5nZXRDbGllbnQoKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGNsaWVudC5nZXRBY2Nlc3NUb2tlbigpO1xyXG5cclxuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keTogYW55ID0ge1xyXG4gICAgICAgICAgICB0ZXh0UXVlcnk6IHF1ZXJ5LFxyXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGU6ICdqYScsXHJcbiAgICAgICAgICAgIG1heFJlc3VsdENvdW50OiAyMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChwYWdlVG9rZW4pIHtcclxuICAgICAgICAgICAgcmVxdWVzdEJvZHkucGFnZVRva2VuID0gcGFnZVRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9wbGFjZXMuZ29vZ2xlYXBpcy5jb20vdjEvcGxhY2VzOnNlYXJjaFRleHQnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW4udG9rZW59YCxcclxuICAgICAgICAgICAgICAgICdYLUdvb2ctRmllbGRNYXNrJzogJ3BsYWNlcy5pZCxwbGFjZXMuZGlzcGxheU5hbWUscGxhY2VzLmZvcm1hdHRlZEFkZHJlc3MscGxhY2VzLnJhdGluZyxwbGFjZXMudXNlclJhdGluZ0NvdW50LHBsYWNlcy5yZXZpZXdzLHBsYWNlcy5wcmljZUxldmVsLHBsYWNlcy5wcmljZVJhbmdlLHBsYWNlcy5wYXltZW50T3B0aW9ucyxwbGFjZXMuZGVsaXZlcnkscGxhY2VzLnRha2VvdXQscGxhY2VzLmRpbmVJbixwbGFjZXMucmVzZXJ2YWJsZSxwbGFjZXMuc2VydmVzQmVlcixwbGFjZXMuc2VydmVzV2luZSxwbGFjZXMuc2VydmVzVmVnZXRhcmlhbkZvb2QscGxhY2VzLnNlcnZlc0NvZmZlZSxwbGFjZXMuc2VydmVzQnJlYWtmYXN0LHBsYWNlcy5zZXJ2ZXNMdW5jaCxwbGFjZXMuc2VydmVzRGlubmVyLHBsYWNlcy5nb29kRm9yQ2hpbGRyZW4scGxhY2VzLmdvb2RGb3JHcm91cHMscGxhY2VzLnJlc3Ryb29tLHBsYWNlcy5hY2Nlc3NpYmlsaXR5T3B0aW9ucyxuZXh0UGFnZVRva2VuJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0dvb2dsZSBQbGFjZXMgQVBJIEVycm9yOicsIGVycm9yVGV4dCk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR29vZ2xlIFBsYWNlcyBBUEkgRXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5wbGFjZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgcGxhY2VzOiBbXSB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoKTsgLy8gRW5zdXJlIERCIGlzIGluaXRpYWxpemVkXHJcbiAgICAgICAgY29uc3QgcGxhY2VzUmVmID0gZGIuY29sbGVjdGlvbigncGxhY2VzJyk7XHJcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBkYi5iYXRjaCgpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IFBsYWNlU2VhcmNoUmVzdWx0W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBwbGFjZURhdGEgb2YgZGF0YS5wbGFjZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgcmV2aWV3cyA9IHBsYWNlRGF0YS5yZXZpZXdzPy5tYXAoKHI6IGFueSkgPT4gci50ZXh0Py50ZXh0KS5maWx0ZXIoQm9vbGVhbikgfHwgW107XHJcblxyXG4gICAgICAgICAgICAvLyBDb25zdHJ1Y3QgZnVsbCBQbGFjZSBvYmplY3QgdG8gY2FjaGVcclxuICAgICAgICAgICAgLy8gVXNlIFBhcnRpYWw8UGxhY2U+IHRvIGF2b2lkICdtaXNzaW5nIHByb3BlcnR5JyBlcnJvcnMgd2hlbiB3ZSBkZWxpYmVyYXRlbHkgb21pdCAnc3RhdHVzJyB0byBwcmVzZXJ2ZSBpdFxyXG4gICAgICAgICAgICBjb25zdCBuZXdQbGFjZTogUGFydGlhbDxQbGFjZT4gPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogcGxhY2VEYXRhLmlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogcGxhY2VEYXRhLmRpc3BsYXlOYW1lPy50ZXh0IHx8ICdVbmtub3duJyxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IHBsYWNlRGF0YS5mb3JtYXR0ZWRBZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmc6IHBsYWNlRGF0YS5yYXRpbmcgfHwgMCxcclxuICAgICAgICAgICAgICAgIHVzZXJSYXRpbmdzVG90YWw6IHBsYWNlRGF0YS51c2VyUmF0aW5nQ291bnQgfHwgMCxcclxuICAgICAgICAgICAgICAgIC4uLihwbGFjZURhdGEucHJpY2VMZXZlbCA/IHsgcHJpY2VMZXZlbDogcGxhY2VEYXRhLnByaWNlTGV2ZWwgfSA6IHt9KSxcclxuICAgICAgICAgICAgICAgIC4uLihwbGFjZURhdGEucHJpY2VSYW5nZSA/IHsgcHJpY2VSYW5nZTogcGxhY2VEYXRhLnByaWNlUmFuZ2UgfSA6IHt9KSxcclxuICAgICAgICAgICAgICAgIHJldmlld3M6IHJldmlld3MsXHJcbiAgICAgICAgICAgICAgICBkZXRhaWxlZEluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXltZW50T3B0aW9uczogcGxhY2VEYXRhLnBheW1lbnRPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5OiBwbGFjZURhdGEuZGVsaXZlcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2VvdXQ6IHBsYWNlRGF0YS50YWtlb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaW5lSW46IHBsYWNlRGF0YS5kaW5lSW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VydmFibGU6IHBsYWNlRGF0YS5yZXNlcnZhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvZmZlcmluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVzQmVlcjogcGxhY2VEYXRhLnNlcnZlc0JlZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlc1dpbmU6IHBsYWNlRGF0YS5zZXJ2ZXNXaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNWZWdldGFyaWFuRm9vZDogcGxhY2VEYXRhLnNlcnZlc1ZlZ2V0YXJpYW5Gb29kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNDb2ZmZWU6IHBsYWNlRGF0YS5zZXJ2ZXNDb2ZmZWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpbmluZ09wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVzQnJlYWtmYXN0OiBwbGFjZURhdGEuc2VydmVzQnJlYWtmYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNMdW5jaDogcGxhY2VEYXRhLnNlcnZlc0x1bmNoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXNEaW5uZXI6IHBsYWNlRGF0YS5zZXJ2ZXNEaW5uZXJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFtZW5pdGllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cm9vbTogcGxhY2VEYXRhLnJlc3Ryb29tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnb29kRm9yQ2hpbGRyZW46IHBsYWNlRGF0YS5nb29kRm9yQ2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvb2RGb3JHcm91cHM6IHBsYWNlRGF0YS5nb29kRm9yR3JvdXBzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByZXBhcmUgZm9yIHJldHVyblxyXG4gICAgICAgICAgICByZXN1bHRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWQ6IHBsYWNlRGF0YS5pZCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IHBsYWNlRGF0YS5kaXNwbGF5TmFtZT8udGV4dCB8fCAnVW5rbm93bicsXHJcbiAgICAgICAgICAgICAgICByYXRpbmc6IHBsYWNlRGF0YS5yYXRpbmcgfHwgMCxcclxuICAgICAgICAgICAgICAgIHVzZXJSYXRpbmdzVG90YWw6IHBsYWNlRGF0YS51c2VyUmF0aW5nQ291bnQgfHwgMCxcclxuICAgICAgICAgICAgICAgIHZpY2luaXR5OiBwbGFjZURhdGEuZm9ybWF0dGVkQWRkcmVzc1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IHBsYWNlc1JlZi5kb2MocGxhY2VEYXRhLmlkKTtcclxuICAgICAgICAgICAgLy8gVXNlIG1lcmdlOiB0cnVlIHRvIHVwZGF0ZSBleGlzdGluZyBkb2NzIHdpdGhvdXQgd2lwaW5nIG90aGVyIGZpZWxkc1xyXG4gICAgICAgICAgICBiYXRjaC5zZXQocmVmLCBuZXdQbGFjZSwgeyBtZXJnZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IGJhdGNoLmNvbW1pdCgpO1xyXG5cclxuICAgICAgICAvLyBGaXJlLWFuZC1mb3JnZXQgYW5hbHlzaXMgZm9yIGl0ZW1zIG5lZWRpbmcgaXRcclxuICAgICAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZWZzID0gcmVzdWx0cy5tYXAociA9PiBwbGFjZXNSZWYuZG9jKHIuaWQpKTtcclxuICAgICAgICAgICAgaWYgKHJlZnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc25hcHNob3RzID0gYXdhaXQgZGIuZ2V0QWxsKC4uLnJlZnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc25hcCBvZiBzbmFwc2hvdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gc25hcC5kYXRhKCkgYXMgUGxhY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBpZjpcclxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBTdGF0dXMgaXMgTUlTU0lORyAobmV3KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDIuIE9SIFN0YXR1cyBpcyAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMy4gV2UgZG8gTk9UIHJlLXRyaWdnZXIgaWYgJ3BlbmRpbmcnLCAncHJvY2Vzc2luZycsICdjb21wbGV0ZWQnLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5zdGF0dXMgfHwgZC5zdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRyaWdnZXJpbmcgYW5hbHlzaXMgZm9yICR7ZC5pZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHN0YXR1cyB0byBwZW5kaW5nIHRvIHByZXZlbnQgZG91YmxlLXF1ZXVlaW5nPyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWRlYWxseSB5ZXMsIGJ1dCBmaXJlLWFuZC1mb3JnZXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVucXVldWVBbmFseXNpcyhkLmlkKS5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBlbnF1ZXVlICR7ZC5pZH1gLCBlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2hlY2tpbmcgc3RhdHVzIGZvciBhbmFseXNpcyB0cmlnZ2VyXCIsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGxhY2VzOiByZXN1bHRzLFxyXG4gICAgICAgICAgICBuZXh0UGFnZVRva2VuOiBkYXRhLm5leHRQYWdlVG9rZW5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNlYXJjaCBwbGFjZXM6JywgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7IHBsYWNlczogW10gfTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImlTQXVLc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SearchInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SearchInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnalysisResult$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AnalysisResult.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ListingCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ListingCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlaceList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PlaceList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$95589c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/server/actions/data:95589c [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$b86e56__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/server/actions/data:b86e56 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils.js [app-client] (ecmascript) <export default as Utensils>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
// プレミアム表示用のモックデータ（デモ用）
// 実際のアプリではデータベースから取得しますが、ここでは固定データを使用しています
const FEATURED_PLACES = [
    {
        id: "1",
        title: "鮨 銀座 おのでら",
        location: "東京都中央区銀座",
        rating: 4.85,
        price: "¥30,000~",
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1470&auto=format&fit=crop",
        tags: [
            "寿司",
            "ミシュラン",
            "個室あり"
        ]
    },
    {
        id: "2",
        title: "L'Effervescence",
        location: "東京都港区西麻布",
        rating: 4.92,
        price: "¥50,000~",
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1374&auto=format&fit=crop",
        tags: [
            "フレンチ",
            "隠れ家",
            "記念日"
        ]
    },
    {
        id: "3",
        title: "鳥しき",
        location: "東京都品川区上大崎",
        rating: 4.75,
        price: "¥15,000~",
        imageUrl: "https://images.unsplash.com/photo-1625937751876-4515cd8e7752?q=80&w=1374&auto=format&fit=crop",
        tags: [
            "焼き鳥",
            "予約困難",
            "カウンター"
        ]
    },
    {
        id: "4",
        title: "NARISAWA",
        location: "東京都港区南青山",
        rating: 4.88,
        price: "¥45,000~",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop",
        tags: [
            "イノベーティブ",
            "自然派",
            "世界の名店"
        ]
    }
];
function HomeContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    // URLパラメータから状態を導出
    const viewState = searchParams.get("view") || "HOME";
    const query = searchParams.get("q") || "";
    const placeId = searchParams.get("id");
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [nextPageToken, setNextPageToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [place, setPlace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingMore, setLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize state from URL on first load
    const [focusedAxes, setFocusedAxes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "HomeContent.useState": ()=>{
            const focusParam = searchParams.get("focus");
            return focusParam ? focusParam.split(",") : [];
        }
    }["HomeContent.useState"]);
    const handleAxisToggle = (axisId)=>{
        let newAxes;
        if (focusedAxes.includes(axisId)) {
            newAxes = focusedAxes.filter((id)=>id !== axisId);
        } else {
            if (focusedAxes.length >= 2) {
                newAxes = focusedAxes; // Max 2 selected
            } else {
                newAxes = [
                    ...focusedAxes,
                    axisId
                ];
            }
        }
        setFocusedAxes(newAxes);
        // Sync to URL
        const params = new URLSearchParams(searchParams.toString());
        if (newAxes.length > 0) {
            params.set("focus", newAxes.join(","));
        } else {
            params.delete("focus");
        }
        router.replace(`?${params.toString()}`, {
            scroll: false
        });
    };
    // Also sync state if URL changes externally (e.g. back button)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeContent.useEffect": ()=>{
            const focusParam = searchParams.get("focus");
            const axes = focusParam ? focusParam.split(",") : [];
            // Only update if different to avoid excess renders/loops
            setFocusedAxes({
                "HomeContent.useEffect": (prev)=>{
                    if (prev.length === axes.length && prev.every({
                        "HomeContent.useEffect": (v)=>axes.includes(v)
                    }["HomeContent.useEffect"])) return prev;
                    return axes;
                }
            }["HomeContent.useEffect"]);
        }
    }["HomeContent.useEffect"], [
        searchParams
    ]);
    // URLパラメータの変更を監視してデータを取得
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeContent.useEffect": ()=>{
            const fetchData = {
                "HomeContent.useEffect.fetchData": async ()=>{
                    if (viewState === "LIST" && query) {
                        setLoading(true);
                        // Reset results when query changes (handled by router but safe to ensure)
                        try {
                            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$95589c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["searchPlaces"])(query);
                            setSearchResults(response.places);
                            setNextPageToken(response.nextPageToken);
                        } catch (error) {
                            console.error(error);
                        } finally{
                            setLoading(false);
                        }
                    } else if (viewState === "DETAIL" && placeId) {
                        setLoading(true);
                        try {
                            // 詳細表示の場合は、まず分析/取得アクションを呼ぶ（必要なら）
                            // ただし、Firestoreのリスナーでデータ同期するため、ここではIDセットのみで良い場合もあるが、
                            // 初回分析トリガーのために searchAndAnalyze を呼ぶ必要がある
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$b86e56__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["searchAndAnalyze"])(placeId);
                        } catch (error) {
                            console.error(error);
                        } finally{
                            setLoading(false);
                        }
                    } else if (viewState === "HOME") {
                        setSearchResults([]);
                        setNextPageToken(undefined);
                        setPlace(null);
                    }
                }
            }["HomeContent.useEffect.fetchData"];
            fetchData();
        }
    }["HomeContent.useEffect"], [
        viewState,
        query,
        placeId
    ]);
    // 詳細表示時のリアルタイムリスナー
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeContent.useEffect": ()=>{
            if (viewState !== "DETAIL" || !placeId) return;
            console.log(`Start listening for place: ${placeId}`);
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firestore"], "places", placeId), {
                "HomeContent.useEffect.unsubscribe": (docSnapshot)=>{
                    if (docSnapshot.exists()) {
                        const data = docSnapshot.data();
                        // status check or error handling could be here
                        setPlace({
                            ...data,
                            id: docSnapshot.id
                        });
                    } else {
                        console.log("Place not found in Firestore");
                    }
                }
            }["HomeContent.useEffect.unsubscribe"], {
                "HomeContent.useEffect.unsubscribe": (error)=>{
                    console.error("Firestore listen error:", error);
                }
            }["HomeContent.useEffect.unsubscribe"]);
            return ({
                "HomeContent.useEffect": ()=>unsubscribe()
            })["HomeContent.useEffect"];
        }
    }["HomeContent.useEffect"], [
        viewState,
        placeId
    ]);
    const handleLoadMore = async ()=>{
        if (!nextPageToken || loadingMore) return;
        setLoadingMore(true);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$data$3a$95589c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["searchPlaces"])(query, nextPageToken);
            setSearchResults((prev)=>[
                    ...prev,
                    ...response.places
                ]);
            setNextPageToken(response.nextPageToken);
        } catch (error) {
            console.error("Failed to load more", error);
        } finally{
            setLoadingMore(false);
        }
    };
    // Firestore Listener for List View (Real-time Analysis Updates)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeContent.useEffect": ()=>{
            if (searchResults.length === 0) return;
        // We can't listen to all at once easily if list is huge, but for 20-40 items it's okay to split or just listen.
        // 'in' query limit is 30. We might have more due to "Load More".
        // Strategy: Listen to the *latest* batch? Or just the visible ones?
        // If we have 100 items, listening to 100 docs is heavy.
        // But user wants to see scores appear.
        // Let's listen to the *ids* that were just added or all?
        // Let's implement a listener that updates `searchResults` with new data from Firestore.
        // However, `searchResults` is `PlaceSearchResult`. We need to add `trueScore` etc to it.
        // Better: Render `PlaceList` normally. Pass `searchResults` which are basic.
        // Inside `PlaceList` -> `PlaceCard`, have each card listen to its doc?
        // That is 20-40 listeners. Firestore client handles this well (multiplexes).
        // This isolates the logic and prevents re-rendering the whole List on one item update.
        // PROPOSAL: Don't do it here. Do it in a new component `PlaceListCard` which wraps the display.
        // This allows granular updates.
        // But `PlaceList` is currently one big component.
        // Let's Refactor `PlaceList` to use a `PlaceCard` component that listens for data.
        // This is clean and scalable.
        }
    }["HomeContent.useEffect"], []); // Intentionally empty or removed, shifting logic to PlaceList logic.
    // 検索開始時の処理
    const handleSearchStart = ()=>{
        setLoading(true);
    };
    const handleSearchComplete = async (newQuery)=>{
        // URLを更新して遷移
        const params = new URLSearchParams();
        params.set("view", "LIST");
        params.set("q", newQuery);
        router.push(`/?${params.toString()}`);
    };
    const handlePlaceSelect = async (selectedPlaceId)=>{
        // URLを更新して遷移
        const params = new URLSearchParams();
        params.set("view", "DETAIL");
        params.set("id", selectedPlaceId);
        // 検索クエリも保持
        if (query) params.set("q", query);
        // 重視ポイントも詳細画面へ引き継ぐ
        if (focusedAxes.length > 0) {
            params.set("focus", focusedAxes.join(","));
        }
        router.push(`/?${params.toString()}`);
    };
    const resetHome = ()=>{
        router.push("/");
    };
    const handleBack = ()=>{
        router.back();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-serif selection:bg-[#E65100]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: `absolute top-0 w-full z-50 p-6 flex justify-between items-center transition-colors duration-300 ${viewState === 'HOME' ? 'text-white' : 'text-slate-900'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-2xl font-bold tracking-widest cursor-pointer",
                        onClick: resetHome,
                        children: "GASTRONOMY AI"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex gap-8 text-sm font-medium tracking-wide",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "cursor-pointer hover:text-[#E65100] transition-colors",
                                children: "COLLECTIONS"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "cursor-pointer hover:text-[#E65100] transition-colors",
                                children: "ABOUT"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "cursor-pointer hover:text-[#E65100] transition-colors",
                                children: "LOGIN"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            viewState === "HOME" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 z-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
                                    alt: "Fine Dining",
                                    className: "w-full h-full object-cover brightness-[0.4]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-5xl md:text-7xl font-bold text-white tracking-tight text-shadow-lg leading-tight",
                                                children: [
                                                    "真実の",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#E65100]",
                                                        children: "美味"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 22
                                                    }, this),
                                                    "を、",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 19
                                                    }, this),
                                                    "見極める。"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-200 text-lg md:text-xl font-sans font-light tracking-wide max-w-2xl mx-auto",
                                                children: "AIが数千の口コミを分析し、隠された名店と真の評価を明らかにします。"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SearchInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            onSearchStart: handleSearchStart,
                                            onSearchComplete: handleSearchComplete
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-24 bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container mx-auto px-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-12 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-4 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#E65100]/10 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "w-8 h-8 text-[#E65100]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold",
                                                children: "AI分析"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 font-sans text-sm leading-relaxed",
                                                children: [
                                                    "膨大な口コミから感情を読み解き、",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 21
                                                    }, this),
                                                    "数値だけでは見えない魅力を抽出。"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 316,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-4 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#E65100]/10 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                    className: "w-8 h-8 text-[#C5A059]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 328,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold",
                                                children: "真のスコア"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 font-sans text-sm leading-relaxed",
                                                children: [
                                                    "サクラや偏見を排除した、",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 21
                                                    }, this),
                                                    "純粋な味とサービスの評価を算出。"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-4 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#E65100]/10 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                    className: "w-8 h-8 text-[#1A1A1A]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 339,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold",
                                                children: "トレンド予測"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 font-sans text-sm leading-relaxed",
                                                children: [
                                                    "次に流行る店、予約困難になる店を",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 21
                                                    }, this),
                                                    "いち早くキャッチ。"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 315,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 314,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-24 bg-[#FAFAFA]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container mx-auto px-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-end mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-3xl font-bold mb-2",
                                                    children: "Curated Selection"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-500 font-sans",
                                                    children: "AIが高く評価した、今行くべき名店"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 357,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-[#E65100] font-sans font-medium hover:underline",
                                            children: "View All"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4",
                                    children: FEATURED_PLACES.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ListingCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            ...item,
                                            onClick: ()=>console.log("Clicked", item.title)
                                        }, item.id, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 354,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            viewState === "LIST" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-32 pb-24 min-h-screen bg-slate-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-6 mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleBack,
                                    className: "flex items-center gap-2 text-slate-500 hover:text-[#E65100] transition-colors w-fit font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this),
                                        "Back to Home"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full max-w-4xl mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SearchInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        onSearchStart: handleSearchStart,
                                        onSearchComplete: handleSearchComplete
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 396,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 395,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-500 font-medium",
                                            children: "重視するポイントを最大2つ選択してください。あなたへのマッチ度を計算します。"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 404,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2 justify-center",
                                            children: [
                                                {
                                                    id: 'taste',
                                                    label: '味・料理',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__["Utensils"]
                                                },
                                                {
                                                    id: 'service',
                                                    label: '接客・サービス',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"]
                                                },
                                                {
                                                    id: 'atmosphere',
                                                    label: '雰囲気・空間',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"]
                                                },
                                                {
                                                    id: 'cost',
                                                    label: 'コスパ',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                                                }
                                            ].map((axis)=>{
                                                const isSelected = focusedAxes.includes(axis.id);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleAxisToggle(axis.id),
                                                    className: `
                          flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                          ${isSelected ? 'bg-[#E65100] text-white border-[#E65100] shadow-md transform scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-[#E65100] hover:text-[#E65100]'}
                        `,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(axis.icon, {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 25
                                                        }, this),
                                                        axis.label
                                                    ]
                                                }, axis.id, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 405,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 387,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 386,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlaceList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        places: searchResults,
                        onSelect: handlePlaceSelect,
                        onLoadMore: handleLoadMore,
                        hasMore: !!nextPageToken,
                        loadingMore: loadingMore,
                        focusedAxes: focusedAxes
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 435,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 385,
                columnNumber: 9
            }, this),
            viewState === "DETAIL" && place && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-32 pb-24 container mx-auto px-6 animate-in fade-in duration-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleBack,
                        className: "flex items-center gap-2 text-slate-500 hover:text-[#E65100] transition-colors mb-6 font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 453,
                                columnNumber: 13
                            }, this),
                            "Back to List"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 449,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnalysisResult$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        place: place,
                        focusedAxes: focusedAxes,
                        onToggleAxis: handleAxisToggle
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 456,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 448,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
_s(HomeContent, "PMmc3erAA8DWol69AZ4YXzCr9bU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = HomeContent;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-[#FAFAFA]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse text-[#E65100]",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 471,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 470,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeContent, {}, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 474,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 469,
        columnNumber: 5
    }, this);
}
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "HomeContent");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_af1c1e84._.js.map