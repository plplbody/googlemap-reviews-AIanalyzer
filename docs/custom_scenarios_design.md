# Custom Scenarios (Context Profiles) Design

## 1. Overview
Implementing "Custom User Scenarios" to allow users to separate their preferences based on context (e.g., "Solo Ramen" vs "Date Bar").
This prevents vector collision where conflicting preferences (Quiet vs Lively) cancel each other out.

## 2. User Experience (UX)

### A. Evaluation Flow (Learning)
1.  **User Action**: Taps "Like (Good)" on a restaurant.
2.  **Feedback**: "Saved!" toast appears.
3.  **Context Prompt**:
    *   Toast expands or shows a button: "Add Context / Add Scene".
    *   **UI**: A list of standard scenes (Solo, Date, Business) + **Custom Scenes** + **[+] Create New**.
4.  **Selection**:
    *   User selects "Solo Ramen" (Custom).
    *   **System Action**: Updates the `preferenceVector` specifically for the "Solo Ramen" profile in `users/{uid}/scenarios/{scenarioId}`.

### B. Search Flow (Personalization)
*   **Implicit**: If User searches "Ramen", checks if "Solo Ramen" profile exists. If yes, apply blend (30% Global + 70% Context).
*   **Explicit**: Filter Bar shows "Active Scene: General". User can tap to switch to "Solo Ramen".

## 3. Data Architecture Check

### Schema Update
**Subcollection**: `users/{uid}/scenarios/{scenarioId}`

```typescript
interface UserScenario {
    id: string; // Auto-generated or slug
    name: string; // "一人ラーメン", "デート"
    icon: string; // "🍜", "🍷"
    
    // The "Brain" for this context
    preferenceVector: number[]; // 768-dim (Context specific)
    aiPreferences: { // Axis Weights specific to this context
        taste: number;
        service: number;
        atmosphere: number;
        cost: number;
    };
    
    createdAt: Timestamp;
    updatedAt: Timestamp;
    interactionsCount: number;
}
```

### Logic Update (`submitEvaluation`)
*   **Input**: `scenarioId` (Optional).
*   **Logic**:
    *   Always update the **Global Profile** (`users/{uid}`) (Base learning).
    *   **IF** `scenarioId` is provided:
        *   Also fetch and update `users/{uid}/scenarios/{scenarioId}`.
        *   Apply `learningRate` to the specific vector.

## 4. Implementation Steps

1.  **DB**: No setup needed (Firestore is schemaless), just use the path.
2.  **Backend (`user.ts`)**:
    *   Update `submitEvaluation` to accept `scenarioId`.
    *   Refactor vector update logic into a reusable helper `updatePreferenceVector(currentVec, placeVec, type)`.
    *   Implement `createCustomScenario(name, icon)`.
3.  **Frontend**:
    *   Create `ScenePicker` component.
    *   Update `ActionButtons` to show Picker after "Good".
