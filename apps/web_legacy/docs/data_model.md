# データモデル設計書

## 1. Firestore Schema

本アプリケーションでは、Firestoreの `places` コレクションに全ての店舗データと分析結果を保存します。

### 1.1. Collection: `places`

ドキュメントIDは **Google Place ID** を使用します。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Google Place ID (Document IDと同じ)。 |
| `name` | `string` | 店舗名。 |
| `address` | `string` | 住所。 |
| `originalRating` | `number` | Google Maps上の元スコア (0-5)。 |
| `userRatingsTotal` | `number` | Google Maps上の総評価数。 |
| `reviews` | `string[]` | 分析に使用した口コミテキストの配列（APIから取得）。 |
| `status` | `string` | 分析ステータス (`pending`, `processing`, `completed`, `error`)。 |
| `createdAt` | `Timestamp` | データ作成日時。 |
| `updatedAt` | `Timestamp` | データ更新日時。30日以上経過すると自動更新のトリガーとなります。 |

### 1.2. Analysis Results (AI Output)

AI分析が完了すると、以下のフィールドが追加・更新されます。

| Field | Type | Description |
| :--- | :--- | :--- |
| `trueScore` | `number` | **AI分析スコア (AI Analysis Score)**。AIが算出した真の評価 (0-5)。 |
| `summary` | `string` | 全体的な要約コメント。 |
| `gapReason` | `string` | GoogleスコアとAI分析スコアの乖離理由。 |
| `axisScores` | `Map` | 4軸評価スコア。 |
| &nbsp;&nbsp;`taste` | `number` | 味・品質。 |
| &nbsp;&nbsp;`service` | `number` | 接客・サービス。 |
| &nbsp;&nbsp;`atmosphere` | `number` | 雰囲気。 |
| &nbsp;&nbsp;`cost` | `number` | コストパフォーマンス。 |
| `usageScores` | `Map` | 利用シーン別スコア。 |
| &nbsp;&nbsp;`business` | `number` | ビジネス・接待。 |
| &nbsp;&nbsp;`date` | `number` | デート。 |
| &nbsp;&nbsp;`solo` | `number` | お一人様。 |
| &nbsp;&nbsp;`family` | `number` | 家族連れ。 |
| `usageSummary` | `string` | 利用シーン評価の根拠となる要約コメント。 |
| `axisAnalysis` | `Map` | 評価軸ごとの詳細分析。 |
| &nbsp;&nbsp;`[axis].pros` | `string[]` | 評価されている点（リスト）。 |
| &nbsp;&nbsp;`[axis].cons` | `string[]` | 懸念されている点（リスト）。 |
| &nbsp;&nbsp;`[axis].summary` | `string` | その軸の要約。 |
| `analysisStats` | `Map` | 分析統計情報。 |
| &nbsp;&nbsp;`totalReviewsFetched` | `number` | 取得したレビュー総数。 |
| &nbsp;&nbsp;`validReviews` | `number` | 分析に使用した有効レビュー数。 |
| &nbsp;&nbsp;`excludedReviews` | `number` | 除外されたレビュー数。 |
| `lastAnalyzedAt` | `Timestamp` | 最終分析日時。 |

## 2. TypeScript Interface

`src/types/schema.ts` で定義されている型定義の抜粋です。

```typescript
export interface Place {
  id: string;
  name: string;
  address?: string;
  };

  lastAnalyzedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AxisAnalysisDetail {
  pros: string[];
  cons: string[];
  summary: string;
}
```
