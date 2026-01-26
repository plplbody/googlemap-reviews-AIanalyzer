# Test Design Matrix (テスト設計書)

**目的**: UI/UXの品質保証（QA）における網羅性を担保するため、ユーザー操作とシステム挙動の組み合わせを定義する。
**基準**: `docs/仕様書.md` v2.0 に準拠。

## テスト実行 & レポート
*   **テスト実行**: `npx playwright test` (または `npx playwright test tests/e2e/scenario1.spec.ts`)
*   **レポート表示**: `npx playwright show-report`
*   **ポート指定でレポート表示**: `npx playwright show-report --port 9324` (ポート競合時)

## 凡例
*   **ID**: テスト管理ID (TM-xx-yy)
*   **State**: 画面やコンポーネントの状態 (Normal, Loading, Error, Empty, Disabled)
*   **Scenario Ref**: `仕様書.md` のシナリオID (S1-01等)

---

## 1. Search & Hero Area (U-01)
**対象コンポーネント**: `HeroSection`, `SearchInput`

| ID | Component | Element | State | Condition | Action | Expected Behavior | Ref |
|:---|:---|:---|:---|:---|:---|:---|:---|
| TM-01-01 | `HeroSection` | Hero Text | Normal | - | Check | "あなた専属の" / "AIグルメコンシェルジュ" が表示されている。 | S1-01 |
| TM-01-02 | `SearchInput` | Input Field | Normal | - | 文字入力 ("表参道") | 値が反映され、入力ボタンが活性化する。 | S1-02 |
| TM-01-03 | `SearchInput` | Input Field | Normal | - | 空文字 ("") に変更 | 入力ボタンが非活性(Disabled)になる。 | E1-01 |
| TM-01-04 | `SearchInput` | Input Field | Normal | 記号のみ ("!@#") | Submit | エラー「検索キーワードには文字を含めてください」を表示。 | E1-02 |
| TM-01-05 | `SearchInput` | Input Field | Normal | 101文字以上 | Submit | エラー「検索キーワードは100文字以内で入力してください」を表示。 | E1-03 |
| TM-01-06 | `SearchInput` | Submit Button | Normal | 入力あり | Click | `onSearchStart` が発火し、ローディング表示(Spinner)に切り替わる。 | S1-03 |
| TM-01-07 | `SearchInput` | Submit Button | Loading | 通信中 | Click | クリック無効。多重送信されないこと。 | G-02 |
| TM-01-08 | `SearchInput` | Submit Button | Disabled | 空文字 | MouseOver | クリック不可スタイル（Cursor: not-allowed等）を確認。 | - |

## 2. List View & Filtering (U-03, U-09)
**対象コンポーネント**: `PlaceListView`, `PreferenceFilter`, `PlaceListItem`

| ID | Component | Element | State | Condition | Action | Expected Behavior | Ref |
|:---|:---|:---|:---|:---|:---|:---|:---|
| TM-02-01 | `PlaceListView` | Search Results | Loading | 初期ロード/検索中 | - | スケルトンスクリーン(Skeleton)が表示される。 | S1-03 |
| TM-02-02 | `PlaceListView` | Search Results | Empty | 結果0件 | - | "条件に一致するお店が見つかりませんでした"等のEmpty State表示。 | E1-04 |
| TM-02-03 | `PlaceListView` | Search Results | Error | APIエラー | - | ToastまたはAlertでエラーメッセージを表示。リトライ可能であること。 | G-01 |
| TM-02-04 | `PlaceListView` | Home Button | Normal | - | Click | 検索条件をクリアし、ホーム画面(`view=HOME`)へ遷移する。 | S1-Spec-03 |
| TM-02-05 | `PlaceListView` | Sort Toggle | Normal | 現在AI順 | Click ("Google評価") | Google評価順(Rating降順)に並び替わる。 | S1-Spec-01 |
| TM-02-06 | `PlaceListView` | Sort Toggle | Normal | 現在Google順 | Click ("AIスコア") | AI分析スコア順に並び替わる。 | - |
| TM-02-07 | `PreferenceFilter` | Accordion | Normal | 閉状態 | Click (Header) | アコーディオンが開く。 | - |
| TM-02-08 | `PreferenceFilter` | Mode Tab | Normal | 手動モード(初期) | Click ("自動反映") | (未ログイン) ログイン要求アラートを表示。<br>(ログイン済) 自動モードに切り替わり、AutoViewが表示される。 | - |
| TM-02-09 | `PreferenceFilter` | Mode Tab | Normal | 自動モード | Click ("手動選択") | 手動モードに切り替わり、ManualView(Axis/Scene)が表示される。 | - |
| TM-02-10 | `PreferenceFilter` | Axis Toggle | Normal | "雰囲気" OFF | Click | "雰囲気"がON(Active色)になり、リストが即座に再ソートされる。 | S1-04 |
| TM-02-11 | `PreferenceFilter` | Axis Toggle | Normal | "雰囲気" ON | Click | "雰囲気"がOFFになり、リストが即座に再ソートされる。 | - |
| TM-02-12 | `PlaceListItem` | Card Body | Normal | - | Click | 詳細画面(`view=DETAIL`)へ遷移する。 | S1-05 |
| TM-02-13 | `PlaceListItem` | Heart Button | Normal | 未保存 | Click | 即座にON表示になり、ログイン済なら保存APIが呼ばれる。 | S2-01 |
| TM-02-14 | `PlaceListItem` | Heart Button | Normal | 保存済 | Click | OFF表示になり、保存解除APIが呼ばれる。 | - |
| TM-02-15 | `PlaceListItem` | Heart Button | Normal | 未ログイン | Click | 確認ダイアログ→ログインフローが開始される。 | S2-Impl-02 |
| TM-02-16 | `PlaceListItem` | Visited Toggle | Normal | 未訪問(Profile) | Click | メモ入力モーダル(`MemoModal`)が開く。 | S2-03 |
| TM-02-17 | `PlaceListItem` | Comparison Check | Normal | 選択数 < 上限 | Click | 比較トレイ(`ComparisonTray`)が表示され、バッジ数が増える。 | S4-01 |
| TM-02-18 | `PlaceListItem` | Comparison Check | Normal | 選択数 = 上限 | Click | エラーToast "比較はX件までです" が表示される。 | E4-02 |
| TM-02-19 | `PreferenceFilter` | Scene Toggle | Normal | - | Click ("デート") | "デート"がONになり、該当シーンで絞り込まれる。 | - |
| TM-02-20 | `PlaceListView` | Load More Btn | Normal | 次ページあり | Click | 追加の20件が読み込まれ、リスト下部に追記される。 | - |
| TM-02-21 | `ActionButtons` | Tag Picker | Normal | Heart Click (Saved) | Display | タグ選択用のトースト(`TagPicker`)が表示される。 | S3-01 |
| TM-02-22 | `ActionButtons` | Feedback Popup | Normal | Tag Select / Close | Action | 学習フィードバック(`LearningFeedbackPopup`)が表示される。 | S3-01 |

## 3. Detail View (U-04, U-06)
**対象コンポーネント**: `PlaceDetailView`, `AnalysisResult`, `ActionButtons`

| ID | Component | Element | State | Condition | Action | Expected Behavior | Ref |
|:---|:---|:---|:---|:---|:---|:---|:---|
| TM-03-01 | `PlaceDetailView` | Back Button | Normal | - | Click | 一覧画面に戻る。スクロール位置とフィルタ状態が維持されていること。 | S1-06 |
| TM-03-02 | `PlaceDetailView` | Next Button | Normal | 次の店あり | Click | 次の順位の店舗詳細へ遷移する。 | S1-Spec-02 |
| TM-03-03 | `PlaceDetailView` | Prev Button | Normal | 前の店あり | Click | 前の順位の店舗詳細へ遷移する。 | S1-Spec-02 |
| TM-03-04 | `PlaceDetailView` | Next/Prev | Disabled | 先頭/末尾 | Check | ボタンが表示されない、またはDisabled状態であること。 | - |
| TM-03-05 | `AnalysisHero` | Images | Normal | 複数画像 | Scroll/Swipe | 画像カルーセルが動作する。 | - |
| TM-03-06 | `ActionButtons` | Good Button | Normal | - | Click | タグ選択ポップオーバー(`FeedbackModal`)が開く。 | S3-01 |
| TM-03-07 | `VerdictModal` | - | Normal | 比較実行後 | Open | 勝者(Winner)と理由が表示される。 | S4-03 |

## 4. Profile & Interactions (U-07, U-08, U-10)
**対象コンポーネント**: `ProfileView`, `MemoModal`, `TagManagement`

| ID | Component | Element | State | Condition | Action | Expected Behavior | Ref |
|:---|:---|:---|:---|:---|:---|:---|:---|
| TM-04-01 | `ProfileView` | Tab Switch | Normal | - | Click (Visited) | 表示リストが「来店済み」に切り替わる。 | - |
| TM-04-02 | `MemoModal` | TextArea | Normal | - | 入力 | 文字入力が可能。 | S2-04 |
| TM-04-03 | `MemoModal` | TextArea | Normal | 500文字超 | 入力 | バリデーションエラー表示。保存不可。 | S2-01(Ref) |
| TM-04-04 | `MemoModal` | Save Button | Normal | - | Click | モーダルが閉じ、来店ステータス・メモが更新される。 | S2-04 |
| TM-04-05 | `TagManagement` | Create Button | Normal | 重複名 | Click | エラー「そのタグは既に存在します」を表示。 | E3-01 |
| TM-04-06 | `TagManagement` | Create Button | Normal | 上限数到達 | Check | ボタンが無効化(Disabled)されている。 | E3-02 |
| TM-04-07 | `PlaceListItem` | Visited Toggle | Normal | "来店したらチェック" | Click | "来店済" (Green Checked) に変化し、メモ編集ボタンが出現する。 | S2-03 |
| TM-04-08 | `PlaceListItem` | Visited Toggle | Normal | "来店済" | Click | "来店したらチェック" (Gray) に戻り、メモ編集ボタンが消える。 | - |
| TM-04-09 | `PlaceListItem` | Memo Button | Normal | "来店済" | Click | メモ入力モーダル(`MemoModal`)が開く。初期値が反映されていること。 | S2-03 |
| TM-04-10 | `MemoModal` | Repeat Options | Normal | - | Select ("あり") | 選択状態のスタイル(Orange/Bold)が適用される。 | - |
| TM-04-11 | `MemoModal` | Save Button | Normal | Valid Input | Click | モーダルが閉じ、リストアイテムに「リピートあり」「メモ内容」が表示される。 | S2-04 |

## 5. Ranking & SEO (U-14, U-15)
**対象コンポーネント**: `RankingPage`, `RankingNavigation`

| ID | Component | Element | State | Condition | Action | Expected Behavior | Ref |
|:---|:---|:---|:---|:---|:---|:---|:---|
| TM-05-01 | `RankingPage` | Metadata | Normal | - | Check (Head) | `<title>`, `<meta description>`, JSON-LD等が含まれている。 | S5-03 |
| TM-05-02 | `RankingPage` | List Items | Normal | - | Check | 上位3件に金銀銅のバッジスタイルが適用されている。 | S5-02 |
| TM-05-03 | `RankingNavigation`| Area Link | Normal | Valid Area | Click | 該当エリア・シーンのランキングページへ遷移する。 | - |
| TM-05-04 | `RankingPage` | - | Error | 不正Param | Access | 404ページが表示される（ソフト404でない）。 | E5-01 |
