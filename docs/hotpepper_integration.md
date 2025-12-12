# 🌶️ ホットペッパーAPI (リクルートWebサービス) 統合設計書

## 1. 概要
Google Maps Platformの情報に加え、ホットペッパーグルメサーチAPIから店舗情報を取得し、**「視覚的な訴求力（画像）」**、**「アクセスの利便性（最寄り駅）」**、**「AI分析の精度向上」**、**「収益化 (アフィリエイト)」** を実現する。

## 2. 取得項目と利用用途 (拡張版)

ホットペッパーAPI (`GET /gourmet/v1/`) から可能な限り詳細な情報を取得し、Google情報のエアポケットを埋める。

| カテゴリ | HP APIフィールド | アプリ内での用途 | AI分析への反映 ("Detailed Place Information") | UI表示 |
| :--- | :--- | :--- | :--- | :--- |
| **基本情報** | `id` | 重複排除・管理用ID | - | - |
| | `name` | マッチング検証用 | - | - |
| **画像** | `photo.pc.l` (大画像) | **店舗のメインビジュアル**として利用。<br>Google Photosより優先、あるいは併用する。 | ✅ 雰囲気理解の補完（将来的にVision AI連携も） | **一覧**: サムネイル<br>**詳細**: ヒーロー画像 |
| **アクセス** | `station_name` | **最寄り駅**を表示。 | ✅ (交通の便・立地評価) | **一覧/詳細**: バッジ表示 |
| | `access` | 詳細な行き方説明。 | - | **詳細**: アクセス欄 |
| | `parking` | 駐車場情報 (あり/なし/詳細)。 | ✅ **ファミリー/地方利用**スコアに直結。 | **詳細**: 設備欄 |
| **営業情報** | `open` | 営業時間テキスト。 | ✅ (深夜/早朝の判定) | **詳細**: 基本情報欄 |
| | `lunch` | ランチ営業有無。 | ✅ **ランチ利用**スコアに直結。 | **詳細**: ランチ有無バッジ |
| | `midnight` | 23時以降営業。 | ✅ **2次会/深夜**スコアに直結。 | **詳細**: 深夜営業バッジ |
| **販促・PR** | `catch` | お店のキャッチコピー (短)。 | ✅ **最重要**。店の「売り」をAIにインプット。 | **詳細**: AIサマリー引用 |
| | `genre.catch` | ジャンル説明。 | ✅ 料理ジャンルの具体化。 | - |
| | `budget.average` | 平均予算テキスト。 | ✅ Googleの価格帯情報の補完・検証。 | - |
| **詳細設備** | `child` | **お子様連れ** (あり/なし/詳細)。 | ✅ **ファミリー**スコアの決定打。 | **一覧/詳細**: ファミリータグ補強 |
| | `pet` | ペット同伴。 | ✅ (ニッチ利用シーン対応) | **詳細**: 特記事項 |
| | `barrier_free` | バリアフリー情報。 | ✅ (高齢者/車椅子) アクセシビリティ評価。 | **詳細**: 設備欄 |
| | `wifi` | WiFi有無。 | ✅ **ビジネス/ノマド**評価。 | **詳細**: 設備アイコン |
| | `course` | コースの有無。 | ✅ **宴会/接待**評価。 | - |
| | `free_drink` | 飲み放題。 | ✅ **宴会/グループ**評価。 | **詳細**: 飲み放題あり |
| | `free_food` | 食べ放題。 | ✅ **学生/グループ**評価。 | **詳細**: 食べ放題あり |
| | `private_room` | 個室情報。 | ✅ **接待/デート/グループ**評価。 | **詳細**: 設備欄 |
| | `horigotatsu`<br>`tatami` | 掘りごたつ/座敷。 | ✅ **ファミリー/宴会**評価。 | **詳細**: 設備欄 |
| | `card` | カード可否詳細。 | ✅ 決済利便性評価。 | **詳細**: 決済欄 |
| | `english` | 英語メニューの有無。 | ✅ (インバウンド評価) | **詳細**: インバウンド対応 |
| **収益化** | `urls.pc` | 店舗ページURL。 | - | **詳細**: 予約ボタン等 |

## 3. クレジット表示要件

リクルートWebサービスの規約に基づき、以下のクレジット表記を実装する。

*   **配置場所**:
    *   **一覧画面**: 取得した画像・情報を使用しているリストの最下部、またはフッター。
    *   **詳細画面**: ホットペッパー情報の表示セクション下部、または画面最下部フッター。
*   **文言**: 「Powered by ホットペッパーグルメ」 (または規定のロゴ画像)
*   **リンク**: リクルートWebサービスのトップページへのリンクを設定。

## 4. 実装戦略

(前回設計の 3.1, 3.2, 3.3 を踏襲しつつ以下を強化)

### 4.1. データフロー拡張
*   Google検索 (`searchPlaces`) 後、クライアントサイドで **非同期 (`useEffect` or `useQuery`)** にホットペッパー検索を実行。
*   取得できた項目（特に `child`, `private_room`, `lunch` 等）を `Place` オブジェクトにマージ。
*   マージ完了後、AI分析 (`analyzePlace`) をキックする。
    *   ※もしホットペッパー取得に時間がかかりすぎる（例: 3秒以上）場合は、Googleデータのみで先行してAI分析を開始するフォールバックも検討。

### 4.2. Schema拡張

```typescript
export interface HotPepperData {
  id: string;
  url: string;
  imageUrl?: string;
  station?: string;
  access?: string;
  catchCopy?: string;
  budgetAverage?: string;
  
  // フラグ系 (YES/NO/詳細)
  hasLunch?: string;
  hasMidnight?: string;
  hasChild?: string; // お子様連れ
  hasPet?: string;
  hasParking?: string;
  hasBarrierFree?: string;
  hasWifi?: string;
  hasCourse?: string;
  hasFreeDrink?: string;
  hasFreeFood?: string;
  hasPrivateRoom?: string;
  hasTatami?: string;
  hasHorigotatsu?: string;
  hasCard?: string;
  hasEnglish?: string;
}
```

## 5. 次のアクション

1.  APIキー取得・設定 (環境変数 `HOTPEPPER_API_KEY`)
2.  `Place` インターフェース更新
3.  APIクライアント機能の実装 (`packages/lib/src/hotpepper/client.ts` 等)
4.  UIコンポーネントへのクレジット表記追加 (`<HotPepperCredit />`)
