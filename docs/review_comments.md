# 仕様書レビュー (Scenarios 1-3 & 5)

**担当**: Reviewer (Lead Architect)
**対象**: `docs/仕様書.md`
**目的**: テストケース作成に向けた品質向上およびデザイナー・開発者間の認識齟齬防止

## Review Status Board

| ID | カテゴリ | 指摘内容 | 修正要求 (Action Item) | ステータス | メモ |
|:---|:---|:---|:---|:---|:---|
| **G-01** | General | **異常系・エラーハンドリングの欠落**<br>通信エラー、API制限、データ0件時の挙動が未定義。 | 各フロー/UI定義にエラー時の表示（トースト、アラート、Empty State）を明記する。 | **Done** | |
| **G-02** | General | **UI状態（States）の定義不足**<br>非同期処理中のLoading Stateの記述がない。 | U-xx 定義に Loading/Disabled 状態の挙動を追記する。 | **Done** | |
| **S1-01** | Scenario 1 | **検証基準が曖昧**<br>「最適化される」等の表現で合否判定ができない。 | テスト可能な合格基準（Acceptance Criteria）を追記する。<br>(例: Atmosphere重視なら4.0以上が3件以内) | **Done** | |
| **S1-02** | Scenario 1 | **検索クエリのバリデーション未定義**<br>空文字、長文、記号のみ等の挙動。 | `searchPlaces` のクライアント側バリデーションルール（文字数、禁止文字）を定義する。 | **Done** | |
| **S2-01** | Scenario 2 | **入力制約事項未定義**<br>メモ・タグの文字数、種別制限。 | UI上の入力制限（MaxLength, 絵文字可否など）を明記する。 | **Done** | |
| **S2-02** | Scenario 2 | **来店済み解除時の挙動**<br>誤操作のUndo、データ保持ポリシーが不明。 | トグルOFF時の挙動（データ保持ポリシー）を明確にする。 | **Done** | |
| **S3-01** | Scenario 3 | **タグ作成ルール**<br>重複、上限数などのエッジケース。 | タグ名のユニーク制約有無、エラーメッセージ定義。 | **Done** | |
| **S3-02** | Scenario 3 | **フィードバック表示時間**<br>XP獲得表示の消滅タイミング。 | `U-11` の表示時間（Duration）と終了操作を定義する。 | **Done** | |
| **D-01** | Data/Schema | **型定義連携**<br>TS InterfaceとFirestore Timestampの差異。 | Frontend型とDB型の差異（特にDate系）について補足資料を追加する。 | **Done** | |
| **S5-01** | Scenario 5 | **Allowlist定義・管理**<br>リストの実体と運用フローが不明。 | 定義場所（`constants/areas.ts`等）と管理方法を明記する。 | **Done** | |
| **S5-02** | Scenario 5 | **中間階層ページの欠落**<br>`/rankings/[pref]` 等へのアクセス挙動。 | 中間階層URLのハンドリング（リダイレクト等）を定義する。 | **Done** | |
| **S5-03** | Scenario 5 | **データ鮮度**<br>ISRの具体的な更新頻度が不明。 | `revalidate` 間隔（TTL）を定義する。 | **Done** | |
| **S5-04** | Scenario 5 | **検索結果0件時のSEO**<br>ソフト404リスクへの対策。 | データ少/0件時のHTTPステータスおよび `noindex` 付与ルールを定義する。 | **Done** | |
| **S5-05** | Scenario 5 | **エリア即時フィルター**<br>「隣接」のロジックが不明。 | 隣接エリア決定ロジック（または同一都道府県リスト等）を明記する。 | **Done** | |
| **S5-06** | Scenario 5 | **ID付与・統一**<br>シナリオ5のフロー図にIDがない。 | フロー図に `U-15`, `L-16`, `L-17` を付与する。 | **Done** | |
| **S5-07** | Scenario 5 | **設計要素一覧への追記**<br>新規IDが一覧にない。 | `2.2. 設計要素一覧` に `U-15`, `L-16`, `L-17` の定義列を追加する。 | **Done** | |
| **S5-Impl-01** | Scenario 5 (Impl) | **[Critical] JSON-LD未実装**<br>`Schema.org/ItemList` がないため検索エンジンがリストとして認識できない。 | `page.tsx` に構造化データを出力するLD+JSONを追加する。 | **Done** | |
| **S5-Impl-02** | Scenario 5 (Impl) | **[Perf.] DB二重読み込み**<br>`generateMetadata` と `Page` で `getRankingPlaces` が重複実行されている。 | `React.cache` を導入して Request Memoization を有効化する。 | **Done** | `ranking.ts`にて実装済 |
| **S5-Impl-03** | Scenario 5 (Impl) | **[Quality] ランキング精度懸念**<br>Firestoreクエリで `limit(100)` してからソートしており、高スコア店が漏れる可能性。 | DBクエリでのソート順を最適化（スコア保持またはRating順取得）する。 | **Done** | |
| **S5-Impl-04** | Scenario 5 (Impl) | **[SEO] 内部リンク網の欠落**<br>リスト画面から他シーン・他エリアへの誘導がない（孤立ページ化）。 | `RankingPage` に `AreaFilter` (隣接リンク) や `SceneFilter` を追加する。 | **Done** | `RankingNavigation`実装済 |
| **G-Impl-01** | General (Impl) | **[SEO/Critical] 全面CSRによるインデックス不可**<br>`src/app/page.tsx` が `"use client"` であり、初期HTMLが空。検索エンジンがコンテンツを認識できない。 | LP, List, Detail を Server Component 化し、データ取得をサーバー側で行う構造へリファクタリングする (または Hydration を適切に行う)。 | **Done** | Server Component化完了 |
| **G-Impl-02** | General (Impl) | **[SEO] メタデータ未実装**<br>動的な `<title>` や `<meta description>` の生成ロジックが `page.tsx` に存在しない。 | `generateMetadata` を実装し、ページ状態 (List/Detail) に応じて適切なメタタグを出力する。 | **Done** | 実装済 |
| **G-Impl-03** | General (Impl) | **[SEO] 構造化データ (JSON-LD) 全画面未実装**<br>LP(WebSite) , Detail(Restaurant) 含めすべて未実装。 | 各ビューに応じた JSON-LD コンポーネントを配置する。 | **Done** | 実装済 |
| **G-Impl-04** | General (Impl) | **[Maint.] Props Drilling (バケツリレー)**<br>`PlaceListView` に25個以上のPropsが渡されており、保守性が極めて低い。 | `UserContext` や `FilterContext` を活用し、末端コンポーネントで直接値を参照するようにリファクタリングする。 | **Done** | Refactoring完了 |

---
**凡例**:
*   **Pending**: 未対応（修正待ち）
*   **Doing**: 対応中
*   **Resolved**: 修正完了（レビュワー確認待ち）
*   **Done**: 確認完了（Close）
