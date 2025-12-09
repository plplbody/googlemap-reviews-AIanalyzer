# システムアーキテクチャ設計書

## 1. 全体構成

ローカル開発環境と本番環境の差異を吸収するため、以下の構成をとっています。

### 2.1. ローカル開発環境 (Docker Compose)

*   **App Container**: Next.jsアプリケーション。
*   **Firebase Emulator**: Firestoreのローカルエミュレータ。`./firebase-data` にデータを永続化。
*   **Queue Strategy**: Cloud Tasksのエミュレータは使用せず、`lib/queue/client.ts` 内で分岐し、**直接非同期関数 (`analyzePlace`) を実行**する簡易実装を採用。

### 2.2. 本番環境 (Cloud Run)

*   **App Container**: Artifact RegistryからデプロイされたNext.jsコンテナ。
*   **Firestore**: Google Cloudのマネージドサービス。
*   **Queue Strategy**: `lib/queue/client.ts` が **Cloud Tasks API** を呼び出し、タスクキューにリクエストを登録。Cloud Tasksが `app/api/tasks/analyze/route.ts` をHTTPトリガーで実行する。

## 3. データフロー (Data Flow)

### 3.1. 検索と分析フロー

1.  **Search (Client)**:
    *   ユーザーがキーワードを入力。
    *   `searchPlaces` Server Actionを実行。
    *   Google Places API (New) を呼び出し、候補リストを表示。

2.  **Select & Analyze (Client -> Server)**:
    *   ユーザーが店舗を選択。
    *   `searchAndAnalyze` Server Actionを実行。
    *   **Check DB**: Firestoreにデータがあるか確認。
        *   *あり*: 既存データを返す。
        *   *なし*: Google Places API (Details) から詳細と口コミを取得し、Firestoreに保存（Status: `pending`）。その後、分析タスクをエンキュー。

3.  **Async Analysis (Background)**:
    *   **Trigger**: (Local) 直接実行 / (Prod) Cloud Tasks -> API Route。
    *   **Analyze**: `analyzer.service.ts` が実行される。
    *   **Gemini**: 口コミデータをプロンプトに組み込み、Vertex AIへ送信。
    *   **Save**: 分析結果（True Score, Axis Analysis等）をFirestoreに保存（Status: `completed`）。

4.  **Realtime Update (Client)**:
    *   `AnalysisResult.tsx` がFirestoreの `onSnapshot` でドキュメントを監視。
    *   Statusが `completed` に変わった瞬間、画面に分析結果が自動反映される。

## 4. ディレクトリ構造

```text
src/
├── app/
│   ├── api/tasks/analyze/  # Cloud Tasks用エンドポイント
│   ├── page.tsx            # メイン画面 (Search + Result)
│   └── layout.tsx
├── components/             # UIコンポーネント (AnalysisResult, SearchInput等)
├── lib/
│   ├── firebase/           # Firebase Admin/Client初期化
│   ├── queue/              # タスクキュー・クライアント (環境分岐)
│   └── utils.ts
# システムアーキテクチャ設計書

## 1. 全体構成

ローカル開発環境と本番環境の差異を吸収するため、以下の構成をとっています。

### 2.1. ローカル開発環境 (Docker Compose)

*   **App Container**: Next.jsアプリケーション。
*   **Firebase Emulator**: Firestoreのローカルエミュレータ。`./firebase-data` にデータを永続化。
*   **Queue Strategy**: Cloud Tasksのエミュレータは使用せず、`lib/queue/client.ts` 内で分岐し、**直接非同期関数 (`analyzePlace`) を実行**する簡易実装を採用。

### 2.2. 本番環境 (Cloud Run)

*   **App Container**: Artifact RegistryからデプロイされたNext.jsコンテナ。
*   **Firestore**: Google Cloudのマネージドサービス。
*   **Queue Strategy**: `lib/queue/client.ts` が **Cloud Tasks API** を呼び出し、タスクキューにリクエストを登録。Cloud Tasksが `app/api/tasks/analyze/route.ts` をHTTPトリガーで実行する。

## 3. データフロー (Data Flow)

### 3.1. 検索と分析フロー

1.  **Search (Client)**:
    *   ユーザーがキーワードを入力。
    *   `searchPlaces` Server Actionを実行。
    *   Google Places API (New) を呼び出し、候補リストを表示。

2.  **Select & Analyze (Client -> Server)**:
    *   ユーザーが店舗を選択。
    *   `searchAndAnalyze` Server Actionを実行。
    *   **Check DB**: Firestoreにデータがあるか確認。
        *   *あり*: 既存データを返す。
        *   *なし*: Google Places API (Details) から詳細と口コミを取得し、Firestoreに保存（Status: `pending`）。その後、分析タスクをエンキュー。

3.  **Async Analysis (Background)**:
    *   **Trigger**: (Local) 直接実行 / (Prod) Cloud Tasks -> API Route。
    *   **Analyze**: `analyzer.service.ts` が実行される。
    *   **Gemini**: 口コミデータをプロンプトに組み込み、Vertex AIへ送信。
    *   **Save**: 分析結果（True Score, Axis Analysis等）をFirestoreに保存（Status: `completed`）。

4.  **Realtime Update (Client)**:
    *   `AnalysisResult.tsx` がFirestoreの `onSnapshot` でドキュメントを監視。
    *   Statusが `completed` に変わった瞬間、画面に分析結果が自動反映される。

## 4. ディレクトリ構造

```text
src/
├── app/
│   ├── api/tasks/analyze/  # Cloud Tasks用エンドポイント
│   ├── page.tsx            # メイン画面 (Search + Result)
│   └── layout.tsx
├── components/             # UIコンポーネント (AnalysisResult, SearchInput等)
├── lib/
│   ├── firebase/           # Firebase Admin/Client初期化
│   ├── queue/              # タスクキュー・クライアント (環境分岐)
│   └── utils.ts
├── server/
│   ├── actions/            # Server Actions (検索, 分析トリガー)
│   └── services/           # ビジネスロジック (Gemini分析, DB操作)
├── types/                  # TypeScript型定義 (Schema)
└── ...
```

## 5. API制限と設計判断 (API Limitations & Design Decisions)

### 5.1. Google Places API (New) の制約
*   **レビュー取得上限**: 1リクエストあたり最大5件まで。
*   **ソート順**: `reviews_sort` パラメータ（"newest"等）はサポートされておらず、デフォルトの「関連度順 (Most Relevant)」のみ。

### 5.2. 設計判断
*   **Legacy APIの不採用**: Legacy APIを使用すれば「新着順」で追加のレビューを取得可能だが、非推奨化のリスクと管理コストを考慮し不採用とした。
*   **透明性の確保**: 上記の制約を受け入れ、UI上で「上位5件のレビューに基づく」ことを明示する方針を採用。
