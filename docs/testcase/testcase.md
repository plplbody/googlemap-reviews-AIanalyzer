# プロジェクト機能テスト計画 (F-01 ~ F-04)

本ドキュメントは、F-01からF-04の機能に関する正常性および分岐網羅性を確認するための統合テスト計画である。
各機能について、UI, Logic, AI, DB の各レイヤーでのテストケースを定義する。

---

## F-01: 検索 & AI分析機能

### 1. UI Layer Tests
対象: `src/app/page.tsx`, `PlaceList`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **01-UI-01** | **Non-blocking Search** | 検索開始直後にリスト画面へ遷移し、プレースホルダーが表示されること（オーバーレイなし）。 | [ ] |
| **01-UI-02** | **Place List Display** | `trueScore`（金色の星）と`originalRating`（灰色）が正しく表示されること。 | [ ] |
| **01-UI-03** | **Skeleton Loading** | `status: pending` のアイテムがスケルトン状態で表示され、完了後にフェードインすること。 | [ ] |

### 2. Logic Layer Tests
対象: `src/server/actions/place.ts`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **01-Logic-01** | **Progressive Loading** | 最初の20件が即座に返却され、その後バックグラウンドで次の20件が追加取得されること。 | [ ] |
| **01-Logic-02** | **Client-side Cache** | 検索後に詳細へ遷移し戻った際、APIコールが発生せずキャッシュ(`cachedResults`)が表示されること。 | [ ] |
| **01-Logic-03** | **Server-side Cache** | Firestoreに有効なキャッシュがある場合、APIコールをスキップしてDB値を返すこと。 | [ ] |

### 3. AI Layer Tests
対象: `src/server/services/analyzer.service.ts`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **01-AI-01** | **Sentiment Analysis** | レビュー本文からポジティブ/ネガティブを正しく判定できること。 | [ ] |
| **01-AI-02** | **Spam Detection** | 定型文や内容のないレビューの重みを下げていること。 | [ ] |

### 4. DB Layer Tests
対象: Firestore `places` collection
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **01-DB-01** | **Schema Validation** | 保存データが `Place` 型の必須フィールド網羅していること。 | [ ] |

---

## F-02: 多軸評価・分析

### 1. UI Layer Tests
対象: `src/components/AnalysisResult.tsx`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **02-UI-01** | **Radar Chart** | 4軸スコアが正しく正規化され、相対的な大小関係が視覚的にわかること。 | [ ] |
| **02-UI-02** | **Gap Reason** | Gap Analysisテキストが適切にレンダリングされること。 | [ ] |

### 2. Logic Layer Tests
対象: `src/server/actions/place.ts`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **02-Logic-01** | **Score Normalization** | 各軸のスコアが 0.0 - 5.0 の範囲に収まっていること。 | [ ] |

### 3. AI Layer Tests
対象: Gemini Prompt
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **02-AI-01** | **Aspect Extraction** | レビュー文から「味」「接客」等の要素を正しく抽出・分類できること。 | [ ] |

### 4. DB Layer Tests
対象: Firestore `places/{id}`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **02-DB-01** | **Axis Scores** | `axisScores` フィールドに4軸の数値が保存されていること。 | [ ] |

---

## F-03: 利用シーン判定

### 1. UI Layer Tests
対象: `src/app/page.tsx`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **03-UI-01** | **Scene Badges** | 適性スコア4.0以上のシーンバッジがカードに表示されること。 | [ ] |
| **03-UI-02** | **Filter Interaction** | フィルタ選択時、該当店舗のみにリストが絞り込まれること。 | [ ] |

### 2. Logic Layer Tests
対象: `src/server/actions/place.ts`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **03-Logic-01** | **Filter Logic (OR)** | 複数シーン選択時、いずれかが基準値を超えていればヒットするOR条件であること。 | [ ] |

### 3. AI Layer Tests
対象: Analyzer Service
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **03-AI-01** | **Context Matching** | 「静か」「接待」等のキーワードから Business 適性を高く判定すること。 | [ ] |

---

## F-04: パーソナライズ・ノート機能

### 1. UI Layer Tests
対象: `src/app/profile/page.tsx`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **04-UI-01** | **Action Buttons** | Good/Badボタン押下時に即時UI反映（楽観的更新）されること。 | [ ] |
| **04-UI-02** | **Profile Tabs** | 保存/Good/Badのタブ切り替えとリスト表示が正しいこと。 | [ ] |
| **04-UI-03** | **Preference Radar** | ユーザーの学習傾向レーダーチャートが表示されること。 | [ ] |
| **04-UI-04** | **Guest Tooltip & Login** | 未ログイン時に自動反映ONを押すと、ログイン推奨ツールチップまたはログイン画面が表示されること。 | [ ] |

### 2. Logic Layer Tests
対象: `src/server/actions/user.ts` (EMA)
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **04-Logic-01** | **Good Learning** | Good評価時、ユーザーベクトルが店舗ベクトルへ近づくこと ($+0.2$ EMA)。 | [ ] |
| **04-Logic-02** | **Bad Learning** | Bad評価時、ユーザーベクトルが店舗ベクトルから遠ざかること ($-0.5$ EMA)。 | [ ] |
| **04-Logic-03** | **Undo** | 評価取り消し時に、ベクトルが元の状態に戻ること。 | [ ] |

### 3. AI Layer Tests
対象: Vertex AI Embedding
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **04-AI-01** | **Vector Generation** | 店舗情報から正しい次元数(768)のベクトルが生成されること。 | [ ] |

### 4. DB Layer Tests
対象: Firestore `users/{uid}`
| ID | テスト観点 | 期待結果 | 結果 |
| :--- | :--- | :--- | :--- |
| **04-DB-01** | **Interaction Log** | `users/{uid}/interactions` に評価ログとUndo用情報が記録されること。 | [ ] |
