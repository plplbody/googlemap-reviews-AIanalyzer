# Mobile App Migration Plan (Universal App)

## Objective
Convert the existing Next.js web application into a **Universal App** architecture using **Expo (React Native)** and **Next.js**.
This allows sharing 90%+ of UI and Logic code between Web (Next.js) and Mobile (iOS/Android).

## Architecture: Monorepo with Turborepo
We will restructure the project into a Monorepo workspace.

```
root/
  ├── apps/
  │   ├── web/ (Existing Next.js app)
  │   └── mobile/ (New Expo app)
  ├── packages/
  │   ├── ui/ (Shared UI components)
  │   ├── config/ (Shared ESLint, TSConfig)
  │   └── lib/ (Shared Business Logic)
  └── package.json (Workspaces root)
```

## Migration Steps

### Phase 1: Setup & Restructuring (Current)
1.  [x] **Initialize Monorepo**: Setup Turborepo at the root.
2.  [x] **Move Web App**: Move current root files to `apps/web`.
3.  [x] **Initialize Mobile App**: Create new Expo project in `apps/mobile`.
4.  [ ] **Fix Dependencies**: Update `package.json` to handle workspace dependencies.

### Phase 2: Shared Component Extraction
1.  [ ] **Create Shared UI Package**: Initialize `packages/ui` with React Native Web compatible setup (Tamagui or NativeWind).
2.  [ ] **Migrate Components**: Refactor existing components (`PlaceListItem`, `AnalysisResult`, etc.) to use shared UI primitives (`View`, `Text` instead of `div`, `p`).
    *   *Note: This is the most time-consuming part.*
3.  [ ] **Adapt Logic**: Move hooks (`useRealtimePlaces`) and pure functions to `packages/lib`.

### Phase 3: Mobile Implementation
1.  [ ] **Navigation**: Setup Expo Router (Solito) for mobile navigation.
2.  [ ] **Specific Replacements**:
    *   **Maps**: Replace Google Maps JavaScript SDK (Web) with `react-native-maps` (Mobile).
    *   **Charts**: Replace `recharts` (SVG/DOM) with a mobile-compatible library (e.g., `victory-native` or `react-native-gifted-charts`).

## Technical Stack
- **Frameworks**: Next.js (Web), Expo (Mobile)
- **Monorepo**: Turborepo
- **UI & Styling**: NativeWind (Tailwind CLI)
- **Navigation**: Solito (Shared URL state)

## Immediate Next Actions
1.  Move current contents to `apps/web` (safe in `dev` branch).
2.  Initialize root `package.json` and `turbo.json`.
