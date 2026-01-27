# Test Design Matrix (v2.2)

**Based on**: `docs/仕様書.md` (Design Elements List)
**Strategy**: Layered Testing (Logic Unit Tests + UI/E2E Tests)

---

## 1. Logic & AI Layer (Unit Tests)
**Tool**: Vitest (`tests/unit/**/*.test.ts`)
**Command**: `npx vitest run tests/unit/`
**Focus**: Business Logic, Calculations, State Transitions (Hooks)

| Spec ID | Name | File / Component | Test Case ID | Type | Test Description |
|:---|:---|:---|:---|:---|:---|
| **A-01** | **Sakura Detection** | `analyzer.service.ts` | **TM-A-01-01** | **正常系** | **ペナルティ計算ロジック**<br>平均サクラスコアに基づき、ペナルティ値が計算式 `(AvgSakura/5.0)*2.5` 通りに正しく算出されることを検証する。 |
| **A-01** | **Sakura Detection** | `analyzer.service.ts` | **TM-A-01-02** | **正常系** | **スコア範囲の正規化**<br>AIが出力する `trueScore` や `axisScores` が、必ず `1.0`〜`5.0` の範囲内に収まっている（丸め処理含む）ことを検証する。 |
| **A-01** | **Sakura Detection** | `analyzer.service.ts` | **TM-A-01-03** | **異常系** | **AIレスポンス耐性**<br>AIが不正なJSONや範囲外の数値を返した場合でも、`try/catch` または正規化ロジックによりシステムがクラッシュせず、安全なデフォルト値等で分析を完了できることを検証する。 |
| **L-01** | **Search Process** | `place.ts` | **TM-L-01-01** | **SKIP** | **外部依存（API/DB）が強いためスキップ**<br>モック化コストが高く、E2Eテスト(TM-U-03-01)での検証で代替する。 |
| **L-02** | **Async Analysis** | `place.ts` | **TM-L-02-01** | **SKIP** | **インフラ依存（Cloud Tasks）のためスキップ**<br>ローカル環境でのキューイング動作検証は困難なため、実環境(Staging)での結合テストに委ねる。 |
| **L-03** | **Re-ranking** | `personalize.ts` | **TM-L-03-01** | **正常系** | **好みベクトルのブレンド**<br>「Global設定」と「シナリオ設定」のベクトルが、指定された比率で正しく合成されることを検証する。 |
| **L-03** | **Re-ranking** | `personalize.ts` | **TM-L-03-02** | **正常系** | **ソート順序**<br>算出された `effectiveScore` の降順（高い順）に店舗リストが並び替えられることを検証する。 |
| **L-06** | **Compare Logic** | `comparison.ts` | **TM-L-06-01** | **正常系** | **類似度判定**<br>ユーザーの好みベクトルと店舗特徴ベクトルのコサイン類似度が正しく計算され、勝敗が判定されることを検証する。 |
| **L-09** | **Update Status** | `user.ts` | **TM-L-09-01** | **SKIP** | **DB書き込み単純操作のためスキップ**<br>UI操作に伴うE2Eテスト(TM-U-08-01)で包含して検証する。 |
| **L-10** | **Learning Logic** | `user.ts` | **TM-L-10-01** | **正常系** | **XP獲得計算**<br>評価実行後、Global XP および選択したタグの XP が規定値（例：+20）加算されることを検証する。 |
| **L-16** | **Routing Validator** | `seo-helpers.ts` | **TM-L-16-01** | **異常系** | **許可リスト照合**<br>`seo-areas.ts` に存在しないエリアIDやシーンIDが指定された場合、`false` (不正) を返すことを検証する。 |
| **L-17** | **Ranking Fetch DB** | `ranking.ts` | **TM-L-17-01** | **SKIP** | **DBクエリのためスキップ**<br>E2Eテスト(TM-U-14-01)でのランキング表示確認にて代替する。 |
| **L-18** | **Batch Aggregation** | `crons/stats` | **TM-L-18-01** | **SKIP** | **Pending機能のためスキップ**<br>実装完了後にテストを設計する。 |
| **L-19** | **Stats Logics** | `ranking.ts` | **TM-L-19-01** | **SKIP** | **Pending機能のためスキップ**<br>実装完了後にテストを設計する。 |
| **H-01** | **Filter Logic** | `useFilterParams.ts`| **TM-H-01-01** | **正常系** | **URL同期**<br>React Stateの変更がURLパラメータ(`?focus=...`)に正しく反映されることを検証する。 |
| **H-02** | **Score Logic** | `usePersonalizedScores.ts`| **TM-H-02-01** | **正常系** | **スコア計算呼び出し**<br>フィルタ変更時に `getPersonalizedScores` が適切な引数で呼び出されることを検証する。 |
| **H-03** | **Sort Hook** | `usePlaceSorter.ts` | **TM-H-03-01** | **正常系** | **ソート切り替え**<br>「AIスコア順」と「Google評価順」を切り替えた際、リストの `sortedPlaces` の並び順が正しく変化することを検証する。 |
| **H-04** | **Realtime Places** | `useRealtimePlaces.ts`| **TM-H-04-01** | **SKIP** | **Firestoreリスナーのためスキップ**<br>E2Eテストでのリスト更新確認にて代替する。 |
| **H-05** | **Interactions** | `useUserInteractions.ts`| **TM-H-05-01** | **SKIP** | **認証依存が強いためスキップ**<br>E2Eテスト(TM-U-07-01)にて代替する。 |
| **H-06** | **Status Hook** | `useUserInteractionStatus.ts`| **TM-H-06-01** | **SKIP** | **認証依存が強いためスキップ**<br>E2Eテスト(TM-U-07-01)にて代替する。 |

---

## 2. UI & Interaction Layer (E2E / Component Tests)
**Tool**: Playwright (`tests/e2e/**/*.spec.ts`)
**Focus**: Rendering, User Flow, VRT (Visual Regression)

### 実行コマンド (Execution Commands)
E2Eテストは、外部APIへの依存を防ぐため、**モックデータを有効化**して実行することを推奨します。

**Windows (PowerShell)**:
```powershell
# ポート3005でモックサーバーを起動してテストを実行 (playwright.config.ts設定済み)
npx playwright test
```

**Manual Env Override (Optional)**:
```powershell
# 手動で環境変数を指定する場合（通常は不要）
$env:USE_MOCK_DATA="true"; $env:PORT="3005"; npx playwright test tests/e2e
```

### 2.1. Basic Flows (Scenario 1 & 5)
| Spec ID | Name | File / Component | Test Case ID | Type | Test Description |
|:---|:---|:---|:---|:---|:---|
| **U-01** | **Home Hero** | `HeroSection` | **TM-U-01-01** | **正常系** | **初期表示検証 (VRT)**<br>タイトル、検索フォーム、ブランドカラーがデザイン通りに描画されていることを画像比較で検証する。 |
| **U-01** | **Home Hero** | `SearchInput` | **TM-U-01-02** | **異常系** | **入力バリデーション**<br>空文字の送信や、最大文字数を超えた入力を行った際、ボタンが無効化またはエラーメッセージが表示されることを検証する。 |
| **U-02** | **App Shell** | `ClientHomeWrapper` | **TM-U-02-01** | **正常系** | **初期ロード**<br>ルートアクセス時にローディング無くコンテンツが表示され、SEO用メタデータが含まれていることを検証する。 |
| **U-02** | **App Shell** | `ClientHomeWrapper` | **TM-U-02-02** | **異常系** | **APIエラーハンドリング**<br>初期データ取得APIが500エラーを返した際、アプリケーションがクラッシュせず、適切なエラーメッセージ(Toast/Alert)が表示されることを検証する。 |
| **U-03** | **List View** | `PlaceListView` | **TM-U-03-01** | **正常系** | **リスト描画**<br>検索結果APIがデータを返した際、カードリスト（標準20件）が正しくレンダリングされることを検証する。 |
| **U-03** | **List View** | `PlaceListView` | **TM-U-03-02** | **準正常** | **検索結果ゼロ**<br>検索結果が0件の場合、「条件に一致するお店が見つかりませんでした」等のEmpty Stateが表示されることを検証する。 |
| **U-04** | **Detail View** | `PlaceDetailView` | **TM-U-04-01** | **正常系** | **詳細表示**<br>店舗名、画像、4軸スコアチャートが正しく表示され、戻るボタンでリスト位置が維持されることを検証する。 |
| **U-04** | **Detail View** | `PlaceDetailView` | **TM-U-04-02** | **異常系** | **無効なIDアクセス**<br>存在しない店舗IDで詳細ページにアクセスした際、404エラーページまたは適切なエラーメッセージが表示されることを検証する。 |
| **U-05** | **Comparison Tray** | `ComparisonTray` | **TM-U-05-01** | **正常系** | **比較トレイ追加**<br>リストで「比較」ボタンを押した際、画面下部にトレイが出現し、選択した店舗が追加されることを検証する。 |
| **U-05** | **Comparison Tray** | `ComparisonTray` | **TM-U-05-02** | **異常系** | **追加上限チェック**<br>既に2店舗選択されている状態で3店舗目を追加しようとした際、追加がブロックされ、警告Toastが表示されることを検証する。 |
| **U-06** | **Verdict Modal** | `VerdictModal` | **TM-U-06-01** | **正常系** | **判定実行フロー**<br>「AIで判定」ボタン押下後、モーダルが開き、勝者（Winner）とその選定理由が表示されることを検証する。 |
| **U-07** | **Profile** | `ProfileView` | **TM-U-07-01** | **正常系** | **保存アイテムの連動**<br>リスト画面で「ハート」を押した店舗が、プロフィール画面の「保存済み」タブ内に表示されることを検証する。 |
| **U-07** | **Profile** | `ProfileView` | **TM-U-07-02** | **準正常** | **データなし**<br>保存リストや閲覧履歴が空の場合、適切なEmpty Stateメッセージが表示されることを検証する。 |
| **U-08** | **Memo Modal** | `MemoModal` | **TM-U-08-01** | **正常系** | **メモ保存フロー**<br>「来店済」トグルONでモーダルが開き、テキストを入力して保存すると、リスト上のステータスが更新されることを検証する。 |
| **U-09** | **Filter** | `PreferenceFilter` | **TM-U-09-01** | **正常系** | **軸トグル操作**<br>評価軸（例：雰囲気）をONにした際、チャート形状が変化し、リストが再ソートされる動きを検証する。 |
| **U-10** | **Tag Management** | `TagManagement` | **TM-U-10-01** | **正常系** | **タグCRUD**<br>タグ管理画面にて新規タグの追加、および削除が正常に行えることを検証する。 |
| **U-10** | **Tag Management** | `TagManagement` | **TM-U-10-02** | **異常系** | **タグ重複・上限エラー**<br>重複するタグ名の登録や、上限数を超えた追加操作を行った際、エラーメッセージが表示され操作が拒否されることを検証する。 |
| **U-11** | **Feedback** | `LearningPopup` | **TM-U-11-01** | **正常系** | **学習フィードバック**<br>評価タグを選択した後、獲得XP（例：+20 XP）を示すポップアップアニメーションが表示されることを検証する。 |
| **U-12** | **Pricing Modal** | - | **TM-U-12-01** | **SKIP** | **Pending機能のためスキップ** |
| **U-13** | **Video Ad** | - | **TM-U-13-01** | **SKIP** | **Pending機能のためスキップ** |
| **U-14** | **Ranking Page** | `RankingPage` | **TM-U-14-01** | **正常系** | **ランキング表示 (VRT)**<br>1〜3位の店舗に金・銀・銅のバッジが付与され、ページタイトルがSEO要件（エリア×シーン）を満たしていることを検証する。 |
| **U-14** | **Ranking Page** | `RankingPage` | **TM-U-14-02** | **異常系** | **不正パラメータ (404)**<br>存在しないエリアやシーンをURLで指定した際、Next.jsの`notFound()`がトリガーされ、404画面が表示されることを検証する。 |
| **U-15** | **Footer Links** | `Footer` | **TM-U-15-01** | **正常系** | **リンク遷移**<br>フッターの「エリア一覧」リンクが、ディレクトリHubページ(`U-17`)へ正しく遷移することを検証する。 |
| **U-16** | **Directory Page** | `DirectoryPage` | **TM-U-16-01** | **正常系** | **リンク集表示**<br>都道府県ページにて、配下の市区町村およびシーンへのリンク一覧が正しく描画されることを検証する。 |
| **U-17** | **Hub Page** | `HubPage` | **TM-U-17-01** | **SKIP** | **Pending機能のためスキップ** |
| **U-18** | **Global Header** | `Header` | **TM-U-18-01** | **正常系** | **ナビゲーション**<br>ロゴクリックでトップへ戻り、ログイン状態がUIに反映されていることを検証する。 |
| **U-21** | **Sakura Badge** | `PlaceListItem` | **TM-U-21-01** | **正常系** | **バッジ表示ロジック**<br>スコア4.0以上の店舗に「赤バッジ(高リスク)」、2.5以上の店舗に「黄バッジ(中リスク)」が表示されることを検証する。 |

---

## 3. SEO & System (Integration)
**Tool**: Playwright (Request/Response Check)

| Spec ID | Name | File / Component | Test Case ID | Type | Test Description |
|:---|:---|:---|:---|:---|:---|
| **U-19** | **SEO Controller** | `JsonLd` | **TM-U-19-01** | **正常系** | **構造化データ出力**<br>DOM内に `application/ld+json` が出力され、Schema.org準拠の正しいJSON（ItemList/Restaurant）が含まれていることを検証する。 |
| **G-01** | **Error Handling** | `GlobalError` | **異常系** | **404ページ**<br>存在しないURLパスにアクセスした際、ソフト404ではなく、正しい404エラーページが表示されることを検証する。 |

---

## 4. Security Layer (Vulnerability Tests)
**Tool**: Playwright (E2E) & Vitest (Unit)
**Focus**: Security Requirements & Vulnerability Assessment

| Spec ID | Name | File / Component | Test Case ID | Type | Test Description |
|:---|:---|:---|:---|:---|:---|
| **SEC-01** | **XSS** | `PlaceDetailView` (Render) | **TM-SEC-01-01** | **異常系** | **スクリプト埋め込み無効化**<br>店舗名や詳細情報に `<script>` タグを含む文字列を強制的に注入し、実行されずにエスケープ表示されることを検証する。 |
| **SEC-02** | **NoSQL Injection** | `place.ts` (API) | **TM-SEC-02-01** | **異常系** | **クエリ汚染耐性**<br>検索クエリに `{ "$gt": "" }` 等のNoSQL演算子を含むJSONを送信し、全件取得などが起きず、通常の文字列として処理される（またはエラーになる）ことを検証する。 |
| **SEC-03** | **Headers** | `next.config.ts` | **TM-SEC-03-01** | **正常系** | **セキュリティヘッダ**<br>全てのHTTPレスポンスに `X-Frame-Options: DENY` や `Strict-Transport-Security` 等の推奨ヘッダが含まれていることを検証する。 |
| **SEC-04** | **CSRF** | `ServerActions` | **TM-SEC-04-01** | **正常系** | **Origin検証**<br>異なるOriginからのPOSTリクエストを送信し、Server Actionが拒否（4xxエラー）することを検証する。 |
| **SEC-05** | **SSRF** | `ImageLoader` | **TM-SEC-05-01** | **異常系** | **外部アクセス制限**<br>画像URLパラメータに `http://localhost:8080/admin` 等を指定しても、サーバー内部へのリクエストが発生しないことを検証する。 |
| **SEC-06** | **Auth Check** | `Middleware` | **TM-SEC-06-01** | **異常系** | **ルート保護 (TODO)**<br>認証が必要なルート（将来実装）へ未ログイン状態でアクセスした際、ログイン画面へリダイレクトされることを検証する。(現状はWarning扱い) |
| **SEC-07** | **Cost DoS** | `rate-limit.ts` | **TM-SEC-07-01** | **異常系** | **レートリミット**<br>短時間（例: 1分間）に規定回数（例: 20回）を超えて検索APIを連打した際、`429 Too Many Requests` が返却されることを検証する。 |
| **SEC-08** | **Input Length** | `searchPlaces` | **TM-SEC-08-01** | **異常系** | **長大文字列拒否**<br>1000文字以上の検索クエリを送信した際、サーバー側で処理を中断し、適切なエラーを返すことを検証する。 |
| **SEC-09** | **Logs** | `logger.ts` | **TM-SEC-09-01** | **正常系** | **個人情報マスク**<br>メールアドレスを含む文字列をログ出力させ、ファイルまたはコンソール出力上で特定文字列が `***@***` にマスクされていることを検証する。 |
| **SEC-10** | **API Key** | `ClientEnv` | **TM-SEC-10-01** | **異常系** | **APIキー制限**<br>公開APIキーを使用し、許可されていないReferer（例: `evil.com`）からリクエストを行った際、Google Maps API等が拒否することを検証する(Manual Check推奨)。 |
