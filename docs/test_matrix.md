# Test Design Matrix (v2.2)

**Based on**: `docs/仕様書.md` (Design Elements List)
**Strategy**: Layered Testing (Logic Unit Tests + UI/E2E Tests)

---

## 1. Logic & AI Layer (Unit Tests)
**Tool**: Vitest (`tests/unit/**/*.test.ts`)
**Command**: `npx vitest run tests/unit/`
**Focus**: Business Logic, Calculations, State Transitions (Hooks)

| Spec ID | Name | File / Component | Test Case ID | Type | Title | Action | Expected Result |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **A-01** | **Sakura Detection** | `analyzer.service.ts` | **TM-A-01-01** | **正常系** | **ペナルティ計算ロジック** | 平均サクラスコアを入力とする | ペナルティ値が計算式 `(AvgSakura/5.0)*2.5` 通りに正しく算出されること |
| **A-01** | **Sakura Detection** | `analyzer.service.ts` | **TM-A-01-02** | **正常系** | **スコア範囲の正規化** | AI分析を実行する | `trueScore` や `axisScores` が必ず `1.0`〜`5.0` の範囲内に収まっている（丸め処理含む）こと |
| **A-01** | **Sakura Detection** | `analyzer.service.ts` | **TM-A-01-03** | **異常系** | **AIレスポンス耐性** | AIが不正なJSONや範囲外の数値を返す | `try/catch` または正規化ロジックによりシステムがクラッシュせず、安全なデフォルト値等で分析を完了できること |
| **L-01** | **Search Process** | `place.ts` | **TM-L-01-01** | **SKIP** | **外部依存（API/DB）が強いためスキップ** | - | モック化コストが高く、E2Eテスト(TM-U-03-01)での検証で代替する |
| **L-02** | **Async Analysis** | `place.ts` | **TM-L-02-01** | **SKIP** | **インフラ依存（Cloud Tasks）のためスキップ** | - | ローカル環境でのキューイング動作検証は困難なため、実環境(Staging)での結合テストに委ねる |
| **L-03** | **Re-ranking** | `personalize.ts` | **TM-L-03-01** | **正常系** | **好みベクトルのブレンド** | 「Global設定」と「シナリオ設定」のベクトルを合成する | 指定された比率で正しく合成されること |
| **L-03** | **Re-ranking** | `personalize.ts` | **TM-L-03-02** | **正常系** | **ソート順序** | 店舗リストをソートする | 算出された `effectiveScore` の降順（高い順）に店舗リストが並び替えられること |
| **L-06** | **Compare Logic** | `comparison.ts` | **TM-L-06-01** | **正常系** | **類似度判定** | 類似度計算を実行する | ユーザーの好みベクトルと店舗特徴ベクトルのコサイン類似度が正しく計算され、勝敗が判定されること |
| **L-09** | **Update Status** | `user.ts` | **TM-L-09-01** | **SKIP** | **DB書き込み単純操作のためスキップ** | - | UI操作に伴うE2Eテスト(TM-U-08-01)で包含して検証する |
| **L-10** | **Learning Logic** | `user.ts` | **TM-L-10-01** | **正常系** | **XP獲得計算** | 評価アクションを実行する | Global XP および選択したタグの XP が規定値（例：+20）加算されること |
| **L-16** | **Routing Validator** | `seo-helpers.ts` | **TM-L-16-01** | **異常系** | **許可リスト照合** | `seo-areas.ts` に存在しないエリアIDやシーンIDを指定する | `false` (不正) を返すこと |
| **L-17** | **Ranking Fetch DB** | `ranking.ts` | **TM-L-17-01** | **SKIP** | **DBクエリのためスキップ** | - | E2Eテスト(TM-U-14-01)でのランキング表示確認にて代替する |
| **L-18** | **Batch Aggregation** | `crons/stats` | **TM-L-18-01** | **SKIP** | **Pending機能のためスキップ** | - | 実装完了後にテストを設計する |
| **L-19** | **Stats Logics** | `ranking.ts` | **TM-L-19-01** | **SKIP** | **Pending機能のためスキップ** | - | 実装完了後にテストを設計する |
| **H-01** | **Filter Logic** | `useFilterParams.ts`| **TM-H-01-01** | **正常系** | **URL同期** | React Stateを変更する | URLパラメータ(`?focus=...`)に正しく反映されること |
| **H-02** | **Score Logic** | `usePersonalizedScores.ts`| **TM-H-02-01** | **正常系** | **スコア計算呼び出し** | フィルタを変更する | `getPersonalizedScores` が適切な引数で呼び出されること |
| **H-03** | **Sort Hook** | `usePlaceSorter.ts` | **TM-H-03-01** | **正常系** | **ソート切り替え** | 「AIスコア順」と「Google評価順」を切り替える | リストの `sortedPlaces` の並び順が正しく変化すること |
| **H-04** | **Realtime Places** | `useRealtimePlaces.ts`| **TM-H-04-01** | **SKIP** | **Firestoreリスナーのためスキップ** | - | E2Eテストでのリスト更新確認にて代替する |
| **H-05** | **Interactions** | `useUserInteractions.ts`| **TM-H-05-01** | **SKIP** | **認証依存が強いためスキップ** | - | E2Eテスト(TM-U-07-01)にて代替する |
| **H-06** | **Status Hook** | `useUserInteractionStatus.ts`| **TM-H-06-01** | **SKIP** | **認証依存が強いためスキップ** | - | E2Eテスト(TM-U-07-01)にて代替する |

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
| Spec ID | Name | File / Component | Test Case ID | Type | Title | Action | Expected Result |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **U-01** | **Home Hero** | `HeroSection` | **TM-U-01-01** | **正常系** | **初期表示検証 (VRT)** | ホーム画面を表示する | タイトル、検索フォーム、ブランドカラーがデザイン通りに描画されていること |
| **U-01** | **Home Hero** | `SearchInput` | **TM-U-01-02** | **異常系** | **入力バリデーション** | 空文字または最大文字数超えで検索する | ボタンが無効化またはエラーメッセージが表示されること |
| **U-02** | **App Shell** | `ClientHomeWrapper` | **TM-U-02-01** | **正常系** | **初期ロード** | ルートURLにアクセスする | ローディング無くコンテンツが表示され、SEO用メタデータが含まれていること |
| **U-02** | **App Shell** | `ClientHomeWrapper` | **TM-U-02-02** | **異常系** | **APIエラーハンドリング** | 初期データ取得APIが500エラーを返す | アプリケーションがクラッシュせず、適切なエラーメッセージ(Toast/Alert)が表示されること |
| **U-03** | **List View** | `PlaceListView` | **TM-U-03-01** | **正常系** | **リスト描画** | APIから検索結果データが返却される | カードリスト（標準20件）が正しくレンダリングされること |
| **U-03** | **List View** | `PlaceListView` | **TM-U-03-02** | **準正常** | **検索結果ゼロ** | 検索結果が0件となる条件で表示する | 「条件に一致するお店が見つかりませんでした」等のEmpty Stateが表示されること |
| **U-03** | **Search** | `ClientHomeWrapper` | **TM-U-03-03** | **異常系** | **リロードと状態維持** | 検索結果表示中にリロードを行う | URLパラメータ(`?q=...`)から検索状態が復元され、同じ結果が表示されること |
| **U-03** | **Filter (Manual)** | `PreferenceFilter` | **TM-U-03-04** | **正常系** | **軸・シーンの同時選択** | 「雰囲気」と「デート」を同時に選択する | URLパラメータに `focus=atmosphere&scenes=date` が反映され、両条件がActiveになること |
| **U-03** | **Filter (Auto)** | `PreferenceFilter` | **TM-U-03-05** | **準正常** | **未ログインのAuto切替** | 未ログインで「傾向を自動反映」を押下する | ログインダイアログが表示され、モードが切り替わらないこと |
| **U-03** | **Sort** | `PlaceListView` | **TM-U-03-06** | **正常系** | **ソート順序の即時反映** | 「AI分析スコア順」と「Google評価順」を切り替える | 「Google」時はレート4.5、「AI」時はレート3.5(AI期待値)の店舗が先頭に来ること |
| **U-03** | **Interaction** | `ActionButtons` | **TM-U-03-07** | **準正常** | **未ログインのいいね** | 未ログインで「いいね」ボタンを押下する | 確認ダイアログが表示され、アクションがキャンセルされること |
| **U-03** | **Interaction** | `PlaceList` | **TM-U-03-08** | **正常系** | **再計算ボタンの出現** | 古いスコア(isScoreOutdated=true)状態で表示する | 「スコア再計算」ボタンが出現し、クリック後に消えること |
| **U-03** | **Filter (Manual)** | `PlaceListItem` | **TM-U-03-09** | **正常系** | **手動スコア計算の詳細検証** | 4軸全てと利用シーンを順次トグル選択する | 各ステップにおいて `PlaceListItem` 上のAIスコア(Star)が期待値通りに変化すること |
| **U-03** | **Filter (Auto)** | `PlaceListItem` | **TM-U-03-10** | **正常系** | **自動スコア計算の詳細検証** | ログイン状態で「傾向を自動反映」をONにする | ユーザー好みに基づいて再計算されたスコアが、リスト上の各店舗に即座に適用されること |
| **U-03** | **Interaction** | `ActionButtons` | **TM-U-03-11** | **正常系** | **Global Like (タグなし)** | ログイン状態で「いいね」を押下(タグ選択なし) | 1.ハートが赤化 2.User Global XP上昇 3.`preferenceVector`更新 がなされること |
| **U-03** | **Interaction** | `ActionButtons` | **TM-U-03-12** | **正常系** | **Tagged Like (タグ指定)** | ログイン状態で「いいね」を押下(タグ選択あり) | 1.ハートが赤化 2.Global/Tag XP上昇 3.Scenario Prefs更新 4.Interaction作成 がなされること |
| **U-04** | **Detail View** | `PlaceDetailView` | **TM-U-04-01** | **正常系** | **詳細表示** | 店舗詳細画面へ遷移する | 店舗名(Heading)、テキスト、AI分析スコアが正しく表示され、戻るボタンでリスト位置が維持されること |
| **U-04** | **Detail View** | `PlaceDetailView` | **TM-U-04-02** | **異常系** | **無効なIDアクセス** | 存在しない店舗IDでアクセスする | アプリケーションシェル(Header/Nav)が崩れずに維持され、適切なエラーハンドリングがなされること |
| **U-04** | **Detail View** | `PlaceDetailView` | **TM-U-04-03** | **正常系** | **インタラクション** | 「比較する」「いいね」を押下する | 選択状態がUI（ボタン色など）に即座に反映され、比較トレイが出現すること |
| **U-04** | **Detail View** | `PlaceDetailView` | **TM-U-04-04** | **正常系** | **リスト巡回** | 「次の店」「前の店」ボタンを押下する | URLのIDパラメータが切り替わり、詳細情報の表示内容が遷移先の店舗に更新されること |
| **U-04** | **Detail View** | `PlaceDetailView` | **TM-U-04-05** | **準正常** | **リスト境界** | リストの先頭/末尾の店舗でナビゲーションを試みる | 「前の店」/「次の店」ボタンが非表示または無効化され、エラーが発生しないこと |
| **U-04** | **Detail View** | `PlaceDetailView` | **TM-U-04-06** | **異常系** | **高速操作** | 「次の店」を連打する | 状態不整合やクラッシュが起きず、最終的に正しい店舗が表示されること |
| **U-05** | **Comparison Tray** | `ComparisonTray` | **TM-U-05-01** | **正常系** | **比較トレイ追加** | リストで「比較」ボタンを押下する | 画面下部にトレイが出現し、選択した店舗が追加されること |
| **U-05** | **Comparison Tray** | `ComparisonTray` | **TM-U-05-02** | **異常系** | **追加上限チェック** | 3店舗目を追加しようとする | 追加がブロックされ、警告Toastが表示されること |
| **U-05** | **Comparison Tray** | `ComparisonTray` | **TM-U-05-03** | **正常系** | **トレイ要素削除** | トレイ内の店舗の削除ボタン(×)を押下する | トレイから削除され、リスト上の選択状態も解除されること |
| **U-06** | **Verdict Modal** | `VerdictModal` | **TM-U-06-01** | **正常系** | **判定実行フロー** | 「AIで判定」ボタンを押下する | モーダルが開き、勝者（Winner）とその選定理由が表示されること |
| **U-07** | **Profile** | `ProfileView` | **TM-U-07-01** | **正常系** | **保存アイテムの連動** | 「いいね」した店舗を確認する | プロフィール画面の「保存済み」タブ内に表示されること |
| **U-07** | **Profile** | `ProfileView` | **TM-U-07-02** | **準正常** | **データなし** | 保存リストや閲覧履歴が空の状態で表示する | 適切なEmpty Stateメッセージが表示されること |
| **U-08** | **Memo Modal** | `MemoModal` | **TM-U-08-01** | **正常系** | **メモ保存フロー** | 「来店済」にしてメモを入力・保存する | リスト上のステータスが更新され、メモ内容が保持されること |
| **U-09** | **Filter** | `PreferenceFilter` | **TM-U-09-01** | **正常系** | **軸トグル操作** | 評価軸（例：雰囲気）をONにする | チャート形状が変化し、リストが再ソートされること |
| **U-10** | **Tag Management** | `TagManagement` | **TM-U-10-01** | **正常系** | **タグCRUD** | タグ追加および削除操作を行う | 正常に登録・削除が完了しリストに反映されること |
| **U-10** | **Tag Management** | `TagManagement` | **TM-U-10-02** | **異常系** | **タグ重複・上限エラー** | 重複タグや上限超えで追加操作を行う | エラーメッセージが表示され操作が拒否されること |
| **U-11** | **Feedback** | `LearningPopup` | **TM-U-11-01** | **正常系** | **学習フィードバック** | 評価タグを選択完了する | 獲得XP（例：+20 XP）を示すポップアップアニメーションが表示されること |
| **U-12** | **Pricing Modal** | - | **TM-U-12-01** | **SKIP** | **Pending機能のためスキップ** | - | - |
| **U-13** | **Video Ad** | - | **TM-U-13-01** | **SKIP** | **Pending機能のためスキップ** | - | - |
| **U-14** | **Ranking Page** | `RankingPage` | **TM-U-14-01** | **正常系** | **ランキング表示 (VRT)** | ランキングページを表示する | 1〜3位にバッジが付与され、タイトルがSEO要件（エリア×シーン）を満たしていること |
| **U-14** | **Ranking Page** | `RankingPage` | **TM-U-14-02** | **異常系** | **不正パラメータ (404)** | 存在しないエリア・シーンでアクセスする | `notFound()`がトリガーされ、404画面が表示されること |
| **U-15** | **Footer Links** | `Footer` | **TM-U-15-01** | **正常系** | **リンク遷移** | フッターの「エリア一覧」をクリックする | ディレクトリHubページ(`U-17`)へ正しく遷移すること |
| **U-16** | **Directory Page** | `DirectoryPage` | **TM-U-16-01** | **正常系** | **リンク集表示** | 都道府県ページを表示する | 市区町村およびシーンへのリンク一覧が正しく描画されること |
| **U-17** | **Hub Page** | `HubPage` | **TM-U-17-01** | **SKIP** | **Pending機能のためスキップ** | - | - |
| **U-18** | **Global Header** | `Header` | **TM-U-18-01** | **正常系** | **ナビゲーション** | ロゴをクリックする | トップへ戻り、ログイン状態がUIに反映されていること |
| **U-21** | **Sakura Badge** | `PlaceListItem` | **TM-U-21-01** | **正常系** | **バッジ表示ロジック** | スコアに基づき表示を確認する | スコア4.0以上で「赤バッジ」、2.5以上で「黄バッジ」が表示されること |

---

## 3. SEO & System (Integration)
**Tool**: Playwright (Request/Response Check)

| Spec ID | Name | File / Component | Test Case ID | Type | Title | Action | Expected Result |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **U-19** | **SEO Controller** | `JsonLd` | **TM-U-19-01** | **正常系** | **構造化データ出力** | DOM内を確認する | `application/ld+json` が出力され、Schema.org準拠の正しいJSON（ItemList/Restaurant）が含まれていること |
| **G-01** | **Error Handling** | `GlobalError` | **異常系** | **404ページ** | 存在しないURLパスにアクセスする | ソフト404ではなく、正しい404エラーページが表示されること |

---

## 4. Security Layer (Vulnerability Tests)
**Tool**: Playwright (E2E) & Vitest (Unit)
**Focus**: Security Requirements & Vulnerability Assessment

| Spec ID | Name | File / Component | Test Case ID | Type | Title | Action | Expected Result |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **SEC-01** | **XSS** | `PlaceDetailView` (Render) | **TM-SEC-01-01** | **異常系** | **スクリプト埋め込み無効化** | `<script>` タグを含む店舗名や詳細情報を注入する | `window.XSS_TEST` が実行されず(undefined)、コンテンツが安全にエスケープされて表示されること |
| **SEC-02** | **NoSQL Injection** | `place.ts` (API) | **TM-SEC-02-01** | **異常系** | **クエリ汚染耐性** | 検索クエリに `{ "$gt": "" }` 等の演算子を含むJSONを送信する | 全件取得などが起きず、文字列として処理または拒否されること |
| **SEC-03** | **Headers** | `next.config.ts` | **TM-SEC-03-01** | **正常系** | **セキュリティヘッダ** | HTTPレスポンスヘッダを確認する | `X-Frame-Options: DENY` や `Strict-Transport-Security` 等が含まれていること |
| **SEC-04** | **CSRF** | `ServerActions` | **TM-SEC-04-01** | **正常系** | **Origin検証** | 異なるOriginからPOSTリクエストを送信する | Server Actionが4xxエラーでリクエストを拒否すること |
| **SEC-05** | **SSRF** | `ImageLoader` | **TM-SEC-05-01** | **異常系** | **外部アクセス制限** | 画像パラメータにローカルIP等を指定する | サーバー内部へのリクエストが発生しないこと |
| **SEC-06** | **Auth Check** | `Middleware` | **TM-SEC-06-01** | **異常系** | **ルート保護 (TODO)** | 未ログインで認証必須ルートへアクセスする | ログイン画面へリダイレクトされること (現状はWarning) |
| **SEC-07** | **Cost DoS** | `rate-limit.ts` | **TM-SEC-07-01** | **異常系** | **レートリミット** | 短時間（ex: 1分）に規定回数超のリクエストを送る | `429 Too Many Requests` が返却されること |
| **SEC-08** | **Input Length** | `searchPlaces` | **TM-SEC-08-01** | **異常系** | **長大文字列拒否** | 1000文字以上の検索クエリを送信する | サーバー側で処理を中断し、適切なエラーが返却されること |
| **SEC-09** | **Logs** | `logger.ts` | **TM-SEC-09-01** | **正常系** | **個人情報マスク** | メールアドレスを含む文字列をログ出力させる | 特定文字列が `***@***` にマスクされ出力されること |
| **SEC-10** | **API Key** | `ClientEnv` | **TM-SEC-10-01** | **異常系** | **APIキー制限** | 許可されていないRefererからAPIキーを使用する | Google Maps API等がリクエストを拒否すること |
