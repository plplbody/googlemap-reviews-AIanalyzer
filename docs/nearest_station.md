# 最寄駅情報取得機能設計書

## 概要
Google Places APIから取得した店舗の緯度経度情報を使用し、HeartRails Express APIを経由して最寄駅情報を取得する。
取得した情報は「駅名 + 距離」の形式で保存し、**一覧画面**および詳細画面のアクセス情報として表示する。
一覧画面表示時に非同期でAPIへ問い合わせを行い、順次情報を表示させる。

## 1. 外部API仕様
(変更なし)

## 2. データモデル変更
(変更なし: `nearestStation` フィールド追加)

## 3. 実装ロジック

### A. バックエンド / Server Actions

`src/lib/heartrails/client.ts` を作成し、APIコールロジックを実装。

**Server Action**: `src/server/actions/station.ts` (新規作成)
*   `enhancePlaceWithStation(placeId: string, lat: number, lng: number)`
    *   HeartRails APIをコール。
    *   Firestoreの該当ドキュメント (`places/{placeId}`) を更新 (`nearestStation` フィールド)。
    *   クライアントには何も返さない（Firestore経由でUI反映）。

### B. フロントエンド / 一覧画面での非同期取得

**`src/components/PlaceList.tsx` / `PlaceListItem.tsx`**

*   **現状**: `useRealtimePlaces` でFirestoreの更新をリアルタイム反映している。
*   **変更点**: `PlaceListItem` に `useEffect` を追加し、`nearestStation` が未取得の場合にサーバーアクションをトリガーする（ホットペッパーと同様のパターンを想定、もしホットペッパーがサーバーサイドで完結しているならそれに合わせるが、ユーザーの「一覧画面を表示した際に...非同期で」という要望に従い、クライアントトリガーを採用する）。

> **Update based on Code Analysis**: Existing code shows `searchPlaces` returns Google data instantly. HotPepper data is NOT explicitly fetched in `searchPlaces`. If it appears in the list, it must be because:
> 1. Detail view was visited previously (cached in Firestore).
> 2. OR there is a mechanism missing in my view.
>
> **Proposed Flow for Station Info**:
> 1. `PlaceListItem` mounts.
> 2. Check if `place.nearestStation` exists.
> 3. If NO:
>    *   Call Server Action `enhancePlaceWithStation(place.id, lat, lng)`.
>    *   Server Action fetches HeartRails -> Updates Firestore.
>    *   Firestore listeners (`useRealtimePlaces`) detect change -> UI updates automatically.

## 4. UI/UX

### 一覧画面 (`src/components/PlaceListItem.tsx`)
*   **変更箇所**: フッター部分の住所表示 (`MapPin` アイコンの箇所)。
*   **ロジック**:
    *   `nearestStation` があれば: `<TrainIcon /> {nearestStation}` を表示。
    *   なければ: 従来通り住所を表示、または「駅情報取得中...」スケルトンなど（スケルトンは過剰かもしれないので、住所を表示しつつ、データが来たら切り替わる形が良い）。

### 詳細画面 (`src/components/AnalysisResult.tsx`)
*   変更なし（`nearestStation` を優先表示）。

