# 🌐 外部API連携仕様書 (External API Specification)

本アプリケーションが利用する外部APIサービスの仕様、統合方法、およびデータ利用に関する設計書です。

## 1. Google Maps Platform (Core Data)

### 1.1. Places API (New)
*   **用途**: 店舗の検索、基本情報（名称、住所、評価、レビュー、営業時間、価格帯、画像）の取得。
*   **エンドポイント**:
    *   **Text Search**: `https://places.googleapis.com/v1/places:searchText`
    *   **Place Details**: `https://places.googleapis.com/v1/places/{id}`
*   **認証**:
    *   **Server-Side**: Application Default Credentials (ADC) を使用。Cloud Runのサービスアカウント権限で実行。
*   **取得フィールド**:
    *   `id`, `displayName`, `formattedAddress`, `location`, `rating`, `userRatingCount`
    *   `reviews` (最大5件 x 5回 = 25件程度を取得し分析に使用)
    *   `priceLevel`, `priceRange`, `paymentOptions`
    *   `servesBeer`, `servesWine`, `servesLunch`, `servesDinner` 等の属性フラグ

### 1.2. Vertex AI API (Gemini)
*   **用途**: 口コミデータの高度分析、スコアリング、サマリー生成。
*   **モデル**: `gemini-2.0-flash-001` (または最新のFlashモデル)
*   **エンドポイント**: `https://us-central1-aiplatform.googleapis.com/v1/projects/...`
*   **認証**: ADC (Vertex AI User ロール)
*   **処理フロー**:
    1.  Frontend/Server Actionから `enqueueAnalysis` をコール。
    2.  Cloud Tasks が非同期で `src/server/services/analyzer.service.ts` を実行。
    3.  Firestoreからレビュー文を取得し、Geminiへプロンプト送信。
    4.  結果（JSON）をFirestoreへ書き戻す。

---

## 2. リクルートWebサービス (HotPepper Gourmet)

Google情報の不足（特に「座敷の有無」「子供連れ歓迎」「詳細なクーポン/コース」など）を補完し、日本国内での検索体験を向上させるために利用する。

### 2.1. API仕様
*   **サービス名**: ホットペッパーグルメサーチAPI
*   **バージョン**: `v1`
*   **認証**: クエリパラメータ `key={HOTPEPPER_API_KEY}`
*   **使用エンドポイント**: `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/`

### 2.2. 統合ロジック (`integrateHotPepperInfo`)
1.  **検索トリガー**: Google Places APIで店舗詳細を取得した際 (`searchAndAnalyze`)、非同期(Fire-and-forget)で実行。
2.  **マッチングロジック**:
    *   **電話番号検索**: Googleの `nationalPhoneNumber` とHotPepperの `tel` で完全一致検索（精度高）。
    *   **名称検索**: 電話番号がない場合、店舗名（正規化後）で検索（精度中）。
3.  **データマージ (Firestore)**:
    HotPepperデータが見つかった場合、以下のフィールドを `hotpepper` オブジェクトとして保存。

| フィールド | 用途 | UI表示 |
| :--- | :--- | :--- |
| `catch` | キャッチコピー | 詳細画面のサマリー等 |
| `child` | お子様連れ情報 | ファミリー向け判定スコアに使用 |
| `private_room` | 個室の有無 | デート/接待スコアに使用 |
| `budget.average` | 平均予算 | Google Price Levelの補完 |
| `photo.pc.l` | 店舗画像 | 詳細画面のメイン画像として優先利用 |
| `urls.pc` | 店舗URL | 予約/詳細リンク |

### 2.3. クレジット表記
リクルートWebサービスの規約に基づき、「Powered by ホットペッパーグルメ」のクレジットとリンクを店舗詳細画面および一覧画面に表示する。

---

## 3. HeartRails Express API (最寄駅情報)

店舗の正確な緯度経度から、「最寄り駅」と「距離」を特定し、ユーザーのアクセス判断を支援する。

### 3.1. API仕様
*   **サービス名**: HeartRails Express API (最寄駅検索)
*   **エンドポイント**: `http://express.heartrails.com/api/json`
*   **メソッド**: `method=getStations`
*   **パラメータ**: `x={lng}`, `y={lat}` (Google Mapsの座標を使用)

### 3.2. 統合ロジック (`updateStationInfo`)
1.  **検索トリガー**:
    *   一覧画面 (`PlaceList`) で店舗カードが表示された際、`nearestStation` データがない場合にクライアントからServer Actionをキック。
2.  **処理内容**:
    *   緯度経度をAPIに送信。
    *   レスポンスから最も近い駅（または路線が主要な駅）を選択。
    *   距離（m）を計算。
    *   形式: `「{路線名} {駅名}」 徒歩約{n}分 ({m}m)`
3.  **データ保存**: Firestoreの `places/{id}` に `nearestStation` 文字列として保存。

### 3.3. クレジット表記
HeartRails Expressの利用規約に基づき、アプリアプリケーション内（フッター等）にクレジット「Supported by HeartRails Express」を表示する。

---

## 4. エラーハンドリングとクォータ

| API | エラー時の挙動 | リトライ | 備考 |
| :--- | :--- | :--- | :--- |
| **Google Places** | `status: error` をDB保存 | なし (ユーザー再検索待ち) | コスト高のため無駄なリトライは避ける |
| **Vertex AI** | `status: error` をDB保存 | Cloud Tasksが自動リトライ | 一時的な過負荷の可能性が高いためリトライ有効 |
| **HotPepper** | マージせずスキップ | なし | 必須情報ではないため、失敗してもGoogleデータのみで表示 |
| **HeartRails** | API落ち等の場合スキップ | なし | UIには住所のみ表示される |

