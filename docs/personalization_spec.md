# パーソナライズ機能・「自分だけのお店ノート」詳細設計書

## 1. コンセプト
**「AIと共に育てる、あなただけのグルメノート」**
ユーザーが検索して見ていく中で、「なんとなく良い」「なんとなく違う」と感じた直感をAIにフィードバック。
その「なんとなく」を特徴タグの選択で言語化させることで、AIの学習精度を高め、検索結果を自分色に染め上げていく。

## 2. ユーザーアクション設計

### A. アクション定義 (Updated)
**訪問の実績は問わず**、ユーザーの直感的な「好み（Preference）」を収集する。

| アクション | 名称 | Trigger | データ更新 | AI学習ウェイト |
| :--- | :--- | :--- | :--- | :--- |
| **保存** | `Save` | タップのみ | `isFavorite: true` | **対象外 (0)**: 備忘録用途 |
| **Good** | `Good` | タップのみ | `evaluation: 'good'` | **+1.0**: 漠然とした好意 |
| **Good+** | `Good (詳細)` | タグ選択時 | `selectedFeatures: {...}` | **+3.0**: 明確な嗜好 (言語化) |
| **Bad** | `Bad` | タップのみ | `evaluation: 'bad'` | **-1.0**: 漠然とした拒否 |
| **Bad+** | `Bad (詳細)` | タグ選択時 | `negativeReason: ...` | **-3.0**: 明確な回避 (言語化) |

※ `isVisited` (訪問済) フラグは、別途「行ったボタン」を設けるか、Good/Badとは切り離して管理する（今回はGood/Badの好みにフォーカス）。

### B. 詳細フィードバックフロー (Granular Feedback)
ユーザーの「なんとなく」を言語化するフェーズ。
1.  **Good/Bad ボタン押下**
2.  **フィードバックモーダル表示**
    *   **特徴タグ選択エリア**: その店のAI抽出済みタグ（後述のマスタータグ）をチップ表示。
    *   **軸評価**: 味・接客・雰囲気・コスパ。

## 3. 画面・UI設計

### A. クライアント側 (Frontend)

#### 1. 店舗詳細画面 (Detail View)
*   **アクションバー**:
    *   `[Save]` (Bookmark Icon)
    *   `[Bad]` (Thumbs Down Icon)
    *   `[Good]` (Thumbs Up / Heart Icon)

#### 2. マイページ「自分だけのお店ノート」 (`/profile`)
*   **傾向分析セクション (Editable)**:
    *   **レーダーチャート**: 4軸（味・接客・雰囲気・コスパ）の重視度（ドラッグ編集可）。
    *   **好みタグ (Fav Tags)**: 学習した特徴量（例：「静寂重視」「こってり派」）を表示・削除可能。
*   **リスト管理セクション**:
    *   タブ: [Saved] [Good] [Bad]
        *   ※ Good/Badリストは、訪問履歴ではなく「好みの備忘録」として機能する。

#### 3. 検索結果一覧画面 (List View)
*   **「自分の傾向を反映」トグルスイッチ**:
    *   ON: **パーソナルマッチ度 (Match %)** を優先表示し、その順序でソート。
    *   OFF: AIスコア (Stars) を優先表示し、客観的な順序でソート。

## 4. データ構造 (Schema)

### User Profile (`users/{uid}`)
```typescript
interface UserProfile {
  uid: string;
  // AI Preference (学習結果)
  aiPreferences: {
    taste: number;
    service: number;
    atmosphere: number;
    cost: number;
  };
  // Vector Profile (マスター特徴量に対する重み)
  // key: feature_key (e.g., 'noise_level'), value: weight (-inf to inf)
  featureAffinities: Record<string, number>;
  
  updatedAt: Timestamp;
}
```

### User Interaction (`users/{uid}/interactions/{placeId}`)
```typescript
interface Interaction {
  placeId: string;
  isSaved: boolean;       // マイリスト
  
  evaluation?: {
    type: 'good' | 'bad'; // 好み判定
    timestamp: Timestamp;
    // selectedFeatureKeys: ユーザーがタップした特徴量のキー
    selectedFeatureKeys: string[]; 
    negativeAxes?: ('taste'|'service'|'atmosphere'|'cost')[];
    note?: string;
  };
}
```

## 5. 特徴量抽出とベクトル化 (Feature Extraction Design)

### A. 特徴量マスターモデル (Master Feature Models)
生成AIには以下の定義に基づき、各キーに対して **-1.0 (負の極) 〜 1.0 (正の極)** の値を振らせる。

#### 1. 味・品質 (Sensory & Visual)
| キー (Key) | 特徴量名 | 負の極 (-1.0) | 正の極 (+1.0) |
| :--- | :--- | :--- | :--- |
| `flavor_strength` | **味の濃淡** | あっさり / 淡白 | こってり / 濃厚 |
| `spiciness` | **辛さ・甘さ** | 甘め / マイルド | 辛い / スパイシー |
| `volume` | **ボリューム** | 少なめ / 上品 | ガッツリ / 大盛り |
| `innovation` | **創作性** | 王道 / 伝統的 | 創作 / 前衛的 |
| `visual_impact` | **映え度** | 実質本位 / 素朴 | 映え / フォトジェニック |

#### 2. サービス (SERVQUAL)
| キー (Key) | 特徴量名 | 負の極 (-1.0) | 正の極 (+1.0) |
| :--- | :--- | :--- | :--- |
| `staff_distance` | **接客距離** | 放任 / プライベート | 親密 / フレンドリー |
| `service_speed` | **提供速度** | ゆったり / スロー | スピーディ / 早い |
| `formality` | **フォーマル度** | カジュアル / フランク | 礼儀正しい / 厳格 |

#### 3. 雰囲気 (Servicescapes)
| キー (Key) | 特徴量名 | 負の極 (-1.0) | 正の極 (+1.0) |
| :--- | :--- | :--- | :--- |
| `noise_level` | **賑わい度** | 静寂 / 閑静 | 賑やか / 活気 |
| `lighting` | **照明照度** | 暗め / ムーディ | 明るい / 開放的 |
| `interior_style` | **新旧感** | レトロ / 老舗 / 昭和 | モダン / 最新 / 洗練 |
| `privacy` | **開放感** | 個室 / 隠れ家 | オーープン / 開放的 |

#### 4. コスパ
| キー (Key) | 特徴量名 | 負の極 (-1.0) | 正の極 (+1.0) |
| :--- | :--- | :--- | :--- |
| `price_class` | **価格帯印象** | 格安 / リーズナブル | 高級 / ハイエンド |

## 6. AIスコア計算ロジック (Calculation Logic)

ユーザーの満足度を最大化するため、**「客観的な店の質」**と**「主観的な好み」**を統合し、最終的に **0.0 ～ 5.0 のスコア** として正規化する。

### Step 1: ベクトル定義
*   **店舗ベクトル ($V_{place}$)**: AI分析スコア ($-1.0 \sim 1.0$)。
*   **ユーザーベクトル ($V_{user}$)**: 累積重み ($- \infty \sim + \infty$)。

### Step 2: 好み一致度の計算 ($S_{pref}$)
コサイン類似度を用いて、ベクトル間の角度（一致度）を計算し、それを 0.0〜5.0 の範囲にマッピングする。

1.  **コサイン類似度 ($S_{cos}$)**:
    $$S_{cos} = \frac{V_{user} \cdot V_{place}}{||V_{user}|| \times ||V_{place}||}$$
    *   範囲: $-1.0 \sim 1.0$ (-1:不一致, 0:無関係, 1:一致)

2.  **5段階スコアへの変換 ($S_{pref}$)**:
    $$S_{pref} = (S_{cos} + 1.0) \times 2.5$$
    *   -1.0 → 0.0点, 0.0 → 2.5点, 1.0 → 5.0点

### Step 3: 最終スコアの算出 ($S_{final}$)
$$S_{final} = \alpha \cdot S_{qual} + (1 - \alpha) \cdot S_{pref}$$

*   **$S_{qual}$**: AI分析品質スコア (0.0 ～ 5.0)
*   **$S_{pref}$**: 好み一致度 (0.0 ～ 5.0)
*   **$\alpha$ (品質重視率)**: デフォルト **0.6**

## 7. 具体的なサンプルケース (Sample Cases)

### Case 1: 「隠れ家カフェ探究」編

ユーザーAさんは「静かで落ち着く」店を好み、「賑やか」な場所を嫌います。

1.  **Action**:
    *   落ち着いた喫茶店に **Good+**。タグ「#静寂」「#暗め(ムーディ)」を選択。
    *   **学習**: $V_{user}$ の `noise_level` がマイナス方向（静寂）へ、`lighting` がマイナス方向（暗め）へ大きく強化される。
        *   `noise_level`: -3.0
        *   `lighting`: -3.0

2.  **Result (Recommendation)**:
    *   **Target**: 「Jazz Bar 𝒁」
        *   AI分析: `noise_level`: -0.9 (静か), `lighting`: -0.8 (暗い), `privacy`: -0.5 (隠れ家)。
        *   AI品質スコア ($S_{qual}$): **4.5**
    *   **Calculation**:
        *   $V_{user}$ と $V_{place}$ の向きがほぼ一致するため、コサイン類似度 $S_{cos} \approx 0.9$。
        *   好みスコア $S_{pref} = (0.9 + 1.0) \times 2.5 = \mathbf{4.75}$。
        *   最終スコア $S_{final} = 0.6 \times 4.5 + 0.4 \times 4.75 = 2.7 + 1.9 = \mathbf{4.6}$。
    *   **判定**: 客観的評価も高く、好みも合うため、**超おすすめ（4.6点）**として最上位に表示。

### Case 2: 「ビジネス接待（個室命）」編

ユーザーBさんは接待のため、「個室」がない店は絶対にNG（Bad）です。

1.  **Action**:
    *   賑やかでオープンスペースの居酒屋に **Bad+**。タグ「#賑やか」「#オープン」を選択。
    *   **学習**: 嫌いなものとしてマイナス評価されるため、ユーザーが求める方向はその逆（静か・個室）となるベクトルが形成される。
        *   `noise_level`: -3.0 (静寂を好む)
        *   `privacy`: -3.0 (個室・閉鎖空間を好む)

2.  **Result (Recommendation)**:
    *   **Target**: 「大衆ビアホール 𝑾」 (人気店)
        *   AI分析: `noise_level`: 1.0 (超賑やか), `privacy`: 1.0 (広大なオープンスペース)。
        *   AI品質スコア ($S_{qual}$): **4.8** (店としては超優良)
    *   **Calculation**:
        *   $V_{user}$ (マイナス指向) と $V_{place}$ (プラス特徴) は真逆の向き。コサイン類似度 $S_{cos} \approx -1.0$。
        *   好みスコア $S_{pref} = (-1.0 + 1.0) \times 2.5 = \mathbf{0.0}$。
        *   最終スコア $S_{final} = 0.6 \times 4.8 + 0.4 \times 0.0 = 2.88 + 0 = \mathbf{2.88}$。
    *   **判定**: 店自体の評価は高いが、ユーザーの目的（接待・個室）には全く合わないため、**低スコア（2.9点）**となりリスト下位へ沈む。

## 8. ディスカバリーモード (Vector Search Integration)

**目的**: ユーザー自身も気づいていない「好みに合うが、検索したことがない店」を、AIが能動的に提案する（Serendipityの創出）。

### A. 機能概要
Firestore の Vector Search 機能を利用し、ユーザーのベクトル ($V_{user}$) と近い特徴量を持つ店舗を、データベース全体（または指定エリア・ジャンル内）から抽出・提案する。

### B. "Recommended for You" フロー

1.  **Input (Context)**:
    *   ユーザーベクトル ($V_{user}$): 最新の好みプロファイル。
    *   コンテキストフィルター: ユーザーが選択した「今の気分（ジャンル）」や「エリア」。
        *   例: 「今日は【新宿】で【ラーメン】の気分だけど、いつもの店はいやだ」

2.  **Vector Search Execution**:
    Firestore `findNearest` クエリを実行し、**特徴量的な距離が近い順** に店舗候補を取得する。
    ```typescript
    // 擬似コード
    const candidates = await store.collection('places')
      .where('area', '==', 'Shinjuku') 
      .findNearest('featureVector', userVector, { limit: 10, distanceMeasure: 'COSINE' });
    ```
    
3.  **Refinement (Quality Filter)**:
    抽出された候補の中から、**客観的なAIスコアが一定以上 (e.g., > 3.5)** の店のみを残す。なぜなら、いくら好みに合っていても、質の低い店を提案することはリスクであるため。

4.  **Presentation**:
    **「あなたへの本日のおすすめ」** としてカード表示。
    *   バッジ: 「Match度: 95%」
    *   理由: 「あなたの好む #濃厚 #こってり な傾向にマッチしています」と添えて提示。

これにより、検索キーワードに依存しない、純粋な感性マッチングによる店舗との出会いを提供する。
