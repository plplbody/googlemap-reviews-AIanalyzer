# パーソナライズ機能・「自分だけのお店ノート」詳細設計書

## 1. コンセプト
**「AIと共に育てる、あなただけのグルメノート」**
ユーザーが検索して見ていく中で、「なんとなく良い」「なんとなく違う」と感じた直感をAIにフィードバック。
その「なんとなく」を特徴タグの選択で言語化させることで、AIの学習精度を高め、検索結果を自分色に染め上げていく。

## 2. ユーザーアクション設計

### A. アクション定義 (Updated)
**訪問の実績は問わず**、ユーザーの直感的な「好み（Preference）」を収集する。

| アクション | 名称 | Trigger | データ更新 | Target Vector ($V_{target}$) |
| :--- | :--- | :--- | :--- | :--- |
| **保存** | `Save` | タップのみ | `isFavorite: true` | **対象外**: 備忘録用途 |
| **Good** | `Good` | タップのみ | `evaluation: 'good'`<br>`aiPreferences` (偏差学習) | **$V_{place}$**: 店の特徴そのものに近づける |
| **Bad** | `Bad` | タップのみ | `evaluation: 'bad'`<br>`aiPreferences` (逆偏差) | **$-1 \times V_{place}$**: 店の特徴の逆に近づける |
| **Bad+** | `Bad (詳細)` | タグ選択時 | `negativeFeedback`<br>`aiPreferences` (強化) | **Override**: 特定の特徴量を $\pm 1.0$ (完全拒否/渇望) に上書きして学習 |

※ **トグル機能**: 既にGood/Bad済の状態で再度同じボタンを押すと、評価（およびその学習効果）が取り消される（Undo）。
※ `isVisited` (訪問済) フラグは、別途「行ったボタン」を設けるか、Good/Badとは切り離して管理する。

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
  // AI Preference (Latent Deviation Vector / 評価軸の偏り)
  // 各軸が「平均からどれだけ乖離して重視されているか」を蓄積
  aiPreferences: {
    taste: number;      // e.g. +1.2 (重視)
    service: number;    // e.g. -0.5 (軽視)
    atmosphere: number; // e.g. +0.0 (普通)
    cost: number;       // e.g. -0.8 (軽視)
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
各特徴量は **-1.0 (負の極) 〜 1.0 (正の極)** の正規化された値として抽出される。抽出方法はAIによる文脈解析、またはAPIデータに基づく確定的アルゴリズムのいずれかである。

| Key | Feature Name | Extraction Method | -1.0 Meaning | +1.0 Meaning |
| :--- | :--- | :--- | :--- | :--- |
| **Taste** | | | | |
| `flavor_strength` | 味の濃淡 | **AI Prompt** | Light / あっさり・繊細 | Heavy / こってり・濃厚・パンチ |
| `spiciness` | 辛さ・甘さ | **AI Prompt** | Sweet / Mild | Spicy / 辛い |
| `volume` | ボリューム | **AI Prompt** | Small / 少なめ | Big / ガッツリ |
| `innovation` | 創作性 | **AI Prompt** | Traditional / 王道 | Innovative / 創作 |
| `visual_impact` | 映え度 | **AI Prompt** | Simple / 実質本位 | Photogenic / 映え |
| **Service** | | | | |
| `staff_distance` | 接客距離 | **AI Prompt** | Private / 放任 | Friendly / 親密 |
| `service_speed` | 提供速度 | **AI Prompt** | Slow / ゆったり | Fast / スピーディ |
| `formality` | フォーマル度 | **AI Prompt** | Casual / フランク | Formal / 厳格 |
| **Atmosphere** | | | | |
| `noise_level` | 賑わい度 | **AI Prompt** | Quiet / 静寂 | Noisy / 賑やか |
| `lighting` | 照明 | **AI Prompt** | Dark / 暗め | Bright / 明るい |
| `interior_style` | 新旧感 | **AI Prompt** | Retro / レトロ | Modern / 最新 |
| `privacy` | 開放感 | **AI Prompt** | Private / 個室的 | Open / 開放的 |
| **Cost** | | | | |
| `price_class` | 価格帯印象 | **Algorithm (Log-Normal)** | Very Cheap (~1,000円) | Expensive (~20,000円) |

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

### C. 価格帯の正規化 (Deterministic Price Vectorization)

`price_class` 特徴量は、生成AIの主観ではなく、Google Places APIの価格情報（`priceLevel` または `priceRange`）に基づき、**対数正規化（Logarithmic Normalization）** アルゴリズムを用いて算出する。これはヴェーバー・フェヒナーの法則（感覚量は刺激量の対数に比例する）に基づく。

1.  **代表価格 ($P$) の算出**:
    *   **Price Rangeあり**: Median of `startPrice` and `endPrice`.
    *   **Price Levelのみ**:
        *   `INEXPENSIVE`: 1,000 JPY
        *   `MODERATE`: 4,000 JPY
        *   `EXPENSIVE`: 10,000 JPY
        *   `VERY_EXPENSIVE`: 20,000 JPY

2.  **ベクトル化式 ($V$ / -1.0 ~ 1.0)**:
    日本の平均的な飲食店相場を基準に、以下のようにマッピングする。
    $$ V = \text{Clamp} \left( \frac{\log_{10}(P) - 3.65}{0.65}, \quad -1.0, \quad 1.0 \right) $$
    *   基準点 (0.0): $\approx$ 4,500円 ($\log_{10} \approx 3.65$)
    *   下限 (-1.0): $\approx$ 1,000円
    *   上限 (+1.0): $\approx$ 20,000円


## 6. AIスコア計算ロジック (Calculation Logic)

ユーザーの満足度を最大化するため、**「客観的な店の質」**と**「主観的な好み」**を統合し、最終的に **0.0 ～ 5.0 のスコア** として正規化する。

### Step 1: 評価軸の重み付け (Axis Weighting with Softmax)

ユーザーが「何を重視するか」という**評価軸の偏り（Latent Vector）**を重み付けスコアに変換し、そのユーザーにとっての「質の高さ ($S_{weighted}$」を算出する。

1.  **偏りの学習 (Latent Learning)**:
    ユーザーがGoodした店のスコア偏差（店スコア - **その店の平均スコア**）をEMAで蓄積する。
    これにより、「単に点数が高い店が好き」ではなく「**どの要素が突出している店が好きか**」という傾向を抽出する。
    $$ \mu_{place} = \text{Average}(S_{taste}, S_{service}, S_{atmosphere}, S_{cost}) $$
    $$ L_{new} = L_{old} + \alpha \times ((S_{place} - \mu_{place}) - L_{old}) $$

2.  **重みへの変換 (Softmax)**:
    蓄積された偏りベクトル $L$ をソフトマックス関数で確率分布（合計1.0）となる重み $w$ に変換する。
    $$ w_i = \frac{e^{L_i}}{\sum e^{L_j}} \quad (i \in \{taste, service, atmosphere, cost\}) $$

3.  **パーソナライズされた品質スコア ($S_{weighted}$)**:
    $$ S_{weighted} = \sum_{i} (w_i \times S_{place}[i]) $$
    ※ これにより、「全項目満点の店」は5.0を維持しつつ、特徴のある店はユーザーの好みに応じてスコアが上下する。

### Step 2: 好みベクトル一致度 ($S_{feat}$)
(旧 Step 3: 好みベクトル更新ロジック と同様)
ユーザーの特徴量ベクトル ($V_{user}$) と店舗の特徴量ベクトル ($V_{place}$) のコサイン類似度から算出。
$$ S_{feat} = (\text{CosineSim}(V_{user}, V_{place}) + 1.0) \times 2.5 $$

### Step 3: 最終スコアの算出 ($S_{final}$)
$$S_{final} = \beta \cdot S_{weighted} + (1 - \beta) \cdot S_{feat}$$

*   **$S_{weighted}$**: 重み付けされた品質スコア (0.0 ～ 5.0)
*   **$S_{feat}$**: 特徴量一致度 (0.0 ～ 5.0)
*   **$\beta$ (品質重視率)**: デフォルト **0.65** (質を担保しつつ好みを反映)

## 7. 具体的なサンプルケース (Sample Cases)

## 7. 具体的なサンプルケース (Sample Cases with EMA)

学習率 $\alpha = 0.2$ (20%学習) とした場合の推移例。

### Case 1: 「隠れ家カフェ探究」編 (Good評価)

ユーザーAさん（初期状態 $V_{user} = 0$）が、「静かで暗め」な店をGood評価した場合。

1.  **Action**:
    *   **Target Place**: 「Jazz Bar 𝒁」 ($V_{place}$)
        *   `noise_level`: -0.8 (静か)
        *   `lighting`: -0.9 (暗い)
    *   **User Selection**: **Good**
        *   $V_{target} = V_{place}$

2.  **Learning (EMA Update)**:
    $$V_{new} = V_{old} + 0.2 \times (V_{target} - V_{old})$$
    *   `noise_level`: $0 + 0.2 \times (-0.8 - 0) = \mathbf{-0.16}$
    *   `lighting`: $0 + 0.2 \times (-0.9 - 0) = \mathbf{-0.18}$
    *   **結果**: ユーザーの好みが「少し静かで暗い方」へ移動した。回数を重ねるごとに -0.8 に漸近していく。

### Case 2: 「ビジネス接待（個室命）」編 (Bad詳細評価)

ユーザーBさん（初期状態 $V_{user} = 0$）が、接待に使えない「賑やかな店」をBad評価し、「うるさすぎる」と指摘した場合。

1.  **Action**:
    *   **Target Place**: 「大衆ビアホール 𝑾」 ($V_{place}$)
        *   `noise_level`: 0.9 (賑やか)
    *   **User Selection**: **Bad (詳細)**
        *   理由選択: `noise_level` が `too_high` (うるさすぎる)

2.  **Target Definition**:
    *   **Base Target**: $-1 \times V_{place}$ (基本は逆) $\Rightarrow$ `noise_level`: -0.9
    *   **Specific Override**: ユーザーが「高すぎる」と指摘 $\Rightarrow$ Targetを **-1.0** (もっと低く!) に上書き。
    *   $V_{target}$ `noise_level` = **-1.0**

3.  **Learning (EMA Update)**:
    $$V_{new} = V_{old} + 0.2 \times (V_{target} - V_{old})$$
    *   `noise_level`: $0 + 0.2 \times (-1.0 - 0) = \mathbf{-0.2}$
    *   **結果**: 単なるBad (-0.18) よりも強く「静寂 (-1.0)」を求める方向へ修正された。

### Case 3: スコア計算の例 (Recommendation)

その後、別の「隠れ家個室 ($V_{place}$ `noise_level`: -0.9)」が候補に挙がった場合。

1.  **Calculation**:
    *   ユーザー $V_{user}$ `noise_level` は現在 **-0.2** (静寂好み)。
    *   店舗 $V_{place}$ `noise_level` は **-0.9**。
    *   ベクトルは同じ「マイナス方向」を向いているため、コサイン類似度は正の値（プラス）になり、マッチ度が高くなる。
    *   逆に「賑やかな店 (+0.9)」との類似度は、$-0.2$ と $+0.9$ で逆方向なのでマイナスになり、推奨されなくなる。

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
