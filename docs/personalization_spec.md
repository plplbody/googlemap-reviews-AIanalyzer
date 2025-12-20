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
ユーザー自身が積極的に好みを設定・管理する場所。
*   **基本プロファイル設定 (New)**:
    *   **よく行くエリア (Favorite Areas)**: フォーム入力または選択式。「新宿」「渋谷」など。
    *   **好きなジャンル (Favorite Genres)**: 選択式（マスタージャンル一覧から選択）。
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
  featureAffinities: Record<string, number>; // key: feature_key, value: weight

  // Explicit User Preferences (自己申告)
  favoriteAreas: string[];  // e.g. ["Shinjuku", "Ginza"]
  favoriteGenres: string[]; // e.g. ["Ramen", "Italian"]
  
  updatedAt: Timestamp;
}
```

### Place (`places/{placeId}`) - Additions
```typescript
interface Place {
  // ... existing fields ...
  
  // AI Extracted/API Context Data
  area: string;        // Normalized Area (e.g. "Shinjuku-ku" from address_components)
  genre: string[];     // Normalized Genres (API 'types' field, e.g. ["ramen_restaurant", "restaurant"])
  
  featureVector: Record<string, number>; // -1.0 to 1.0 matched to Master Keys
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
（表は前述の通り）

### B. エリア・ジャンルの正規化 (Normalization Logic)

Google Places API の構造化データを活用し、AI推定による表記ゆれを排除するとともに、処理コストを削減する。

#### 1. ジャンル (Genre)
Google Places API の `types` (または `primaryType`) フィールドをそのまま保存・利用する。
*   **Target Field**: `types` 配列 (例: `["ramen_restaurant", "restaurant", "food"]`)。
*   **Logic**:
    *   AI生成は行わず、APIから取得した `types` 配列を `genre` フィールドに格納する。
    *   フィルタリング時は、この配列内にユーザーが指定したジャンル（例: `ramen_restaurant`）が含まれているかで判定する。

#### 2. エリア (Area)
Google Places API の `address_components` フィールドから、行政区画（市区町村）を直接取得して保存する。
*   **Target Field**: `locality` (市/区) または `administrative_area_level_1` (都道府県) + `locality`。
*   **保存形式**: `"Shinjuku City", "Minato City"` などのAPI標準値をそのまま `area` として保存。
*   これにより、住所文字列解析やAI推論を行うことなく、正規化されたエリア情報を保持できる。

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
Firestore の Vector Search (KNN) 機能を利用し、ユーザーのベクトル ($V_{user}$) と近い特徴量を持つ店舗を、データベース全体（または指定エリア・ジャンル内）から抽出・提案する。

### B. "Recommended for You" フロー

1.  **Input (Context)**:
    *   **ベース**: ユーザーの `featureAffinities`。
    *   **フィルター**:
        *   Profileに保存された `favoriteAreas` と `favoriteGenres` をデフォルトとして提示。
        *   ユーザーは「今日は気分を変えてエリア: 銀座」のように変更可能。

2.  **Vector Search Execution**:
    ```typescript
    // 擬似コード
    const candidates = await store.collection('places')
      .where('majorGenre', 'in', selectedGenres) // 正規化されたジャンルでフィルタ
      .where('area', 'in', selectedAreas)        // 正規化されたエリアでフィルタ
      .findNearest('featureVector', userVector, { limit: 10, distanceMeasure: 'COSINE' });
    ```
    
3.  **Refinement (Quality Filter)**:
    抽出された候補の中から、**客観的なAIスコアが一定以上 (e.g., > 3.5)** の店のみを残す。なぜなら、いくら好みに合っていても、質の低い店を提案することはリスクであるため。

4.  **Presentation**:
    **「あなたへの本日のおすすめ」** としてカード表示。
    *   バッジ: 「Match度: 95%」
    *   理由: 「あなたの好む #濃厚 #こってり な傾向にマッチしています」と添えて提示。

## 9. 技術的実装要件とリスク (Technical Implementation & Risks)

### A. 実装要件 (Technical Requirements)
1.  **Firestore Vector Search**:
    *   Firestoreのインデックス設定で、`featureVector` フィールドに対して「Vector Index」を作成する必要がある。
    *   これらはコンソールまたはTerraform等でプロビジョニングする必要がある（現在ベータ機能の可能性大）。
2.  **ベクトル更新の非同期処理**:
    *   ユーザーがGood/Badを押した瞬間にリアルタイムで全件再計算するのはコストが高い。
    *   `V_user` の更新はクライアントまたはサーバーアクションで行い、Vector Searchは「検索時」にその時点の `V_user` を利用するオンデマンド方式とする。

### B. 技術的リスク (Risks)
1.  **インデックス作成の制限**:
    *   FirestoreのVector Indexには作成数やサイズの制限がある場合がある。大規模データになった際、パーティション化（エリアごと等）が必要になる可能性がある。
2.  **コールドスタート問題**:
    *   新規ユーザーは `V_user` がゼロの状態であり、マッチングが機能しない。初期設定で「好きな雰囲気」等をいくつか選ばせるオンボーディングが必要となる可能性がある（今回はデフォルト値を0として扱う）。
3.  **APIコスト**:
    *   Vector Search自体への課金モデルを確認する必要がある（Read数としてカウントされるか等）。
