# セキュリティ実装方針および脆弱性対応計画書

本プロジェクトにおけるデータベース（Firestore）のセキュリティ方針、および将来的な機能拡張（ユーザー情報保存）に伴うリスク管理と脆弱性発生時の対応フローを定めます。

## 1. Firestore セキュリティルール実装方針

### 現状 (Phase 1)
*   **場所データ (`places` Collection)**:
    *   **Read**: `allow read: if true;`
        *   理由: 検索結果は一般公開情報（Google Maps / HotPepper等）の加工物であり、未ログインユーザーにも検索機能を提供するため。
    *   **Write**: `allow write: if false;`
        *   理由: クライアントからの直接書き込みは一切禁止する。データの作成・更新は全て「Server Actions (Admin SDK)」を経由し、サーバー側で入力値検証を行った上で実行する。

### 将来 (Phase 2: ユーザー情報保存)
*   **ユーザーデータ (`users` Collection)**:
    *   **Read/Write**: `allow read, write: if request.auth != null && request.auth.uid == userId;`
        *   理由: ユーザー自身のデータは本人のみアクセス可能とする（Owner Only）。
    *   **インデックス制限**: クエリによる全件取得を防ぐため、特定の複合インデックス以外の除外設定を検討する。

## 2. 脆弱性対応計画 (Vulnerability Response Plan)

万が一、セキュリティ上の問題や脆弱性が発見された場合、以下のフローで対応します。

### 2.1. 検知と報告
*   **検知ルート**: Isomorphic監視、Firebase Alert、ユーザー報告、定期監査。
*   **一次受付**: 開発責任者が報告を受領し、緊急度（Critical / High / Medium / Low）を判定する。

### 2.2. 緊急対応フロー (Critical / High)
**対象**: 情報漏洩の危険がある場合、サービス停止を伴う攻撃、権限昇格など。

1.  **遮断 (Containment)**:
    *   `firestore.rules` を緊急更新し、書き込み/読み取りを一時的に全てブロック (`allow read, write: if false;`) する。
    *   必要に応じて Cloud Run サービスへのトラフィックを遮断する。
2.  **調査 (Investigation)**:
    *   アクセスログ（Cloud Logging）の解析。
    *   影響範囲の特定（漏洩したID、改ざんされたデータ）。
3.  **修正 (Remediation)**:
    *   コード修正およびセキュリティルールの厳格化。
    *   影響を受けたデータの復元または無効化。
4.  **公開 (Release)**:
    *   修正版のデプロイ。
    *   影響を受けたユーザーへの通知（メール等）。

### 2.3. 通常対応フロー (Medium / Low)
**対象**: UX上の軽微な不具合、直ちに悪用困難な設定ミスなど。

1.  GitHub Issue として起票し、次期スプリントでの修正タスクに組み込む。
2.  修正方針を記載した `implementation_plan.md` を作成し、レビューを経て対応する。

## 3. 定期チェック項目
*   **Firestore Rules 監査**: 不要な `allow true` が残っていないか。
*   **npm audit**: 依存パッケージの脆弱性チェック。
*   **IAM権限**: Cloud Run サービスアカウントに過剰な権限（Admin等）が付与されていないか。

## 4. 脆弱性診断レポート (Codebase Vulnerability Assessment)

2025年12月実施のソースコード静的解析に基づく診断結果一覧です。
今後の開発におけるセキュリティチェックリストとして参照してください。

### 4.1. 診断結果一覧表

| カテゴリ | 脆弱性項目 | ステータス | 判定理由・現状 |
| :--- | :--- | :--- | :--- |
| **XSS** | クロスサイトスクリプティング | **✅ 対応済 (Safe)** | `dangerouslySetInnerHTML` の不使用を確認。Reactの自動エスケープ機構により保護されています。 |
| **Injection** | NoSQLインジェクション | **✅ 対応済 (Safe)** | Firestore SDKを使用しており、クエリインジェクションのリスクは極めて低い。Server Actions経由でのみ書き込みを許可。 |
| **Headers** | セキュリティヘッダ不備 (Clickjacking等) | **✅ 対応済 (Fixed)** | `next.config.ts` に推奨ヘッダ (HSTS, X-Frame-Options, X-Content-Type-Options) を追加設定済み。 |
| **CSRF** | クロスサイトリクエストフォージェリ | **✅ 対応済 (Safe)** | Next.js Server Actions はデフォルトでCSRF保護（Originチェック等）を含んでいるため安全。 |
| **SSRF** | サーバーサイドリクエストフォージェリ | **✅ 対応済 (Low Risk)** | ユーザー入力が直接URLとして解釈される箇所はない（APIパラメータとしてのみ使用）。 |
| **Auth** | ルート保護 (Middleware) | **⚠️ 未対応 (Warning)** | `middleware.ts` が存在せず、全ルートがPublic。現時点の仕様（検索アプリ）では許容されるが、将来管理画面追加時に必須。 |
| **DoS** | **高額請求攻撃 (Cost DoS)** | **🚨 未対応 (Critical)** | `searchPlaces` 等が認証なしで実行可能。悪意ある大量リクエストでPlaces API/Vertex AI課金が嵩むリスクがある。**最優先対応推奨**。 |
| **DoS** | **入力文字数制限** | **⚠️ 未対応 (Pending)** | 検索キーワードの長さに制限がない。極端な長文による処理遅延やログ肥大化のリスクがある。 |
| **Rate Limit** | アクセス頻度制限 | **⚠️ 未対応 (Pending)** | アプリケーションレベルでのレートリミットがない。APIクォータ枯渇攻撃（Wallet Denial of Service）のリスクがある。 |
| **Logs** | ログへの個人情報出力 | **ℹ️ 留意 (Info)** | `src/server/actions/place.ts` などでユーザー検索語句をログ出力している。個人名等が入力された場合にログに残る可能性がある。 |

### 4.2. 対応計画 (Mitigation Plan)

上記の「未対応」項目に対し、以下の優先順位で対応を進めます。

#### Priority 1: Cost DoS / Rate Limit 対策
*   **App Check の導入**: 未承認クライアント（Bot等）からのAPIアクセスを遮断する。
*   **レートリミット**: 検索機能利用時にIPアドレスまたは匿名IDベースでの回数制限（例: 10回/分）を導入する。

#### Priority 2: 入力バリデーション強化
*   **文字数制限**: Server Action (`place.ts`) 内で、検索クエリを最大 **100文字** 程度に制限するロジックを追加する。
*   **ログサニタイズ**: ログ出力時、特定のパターン（電話番号、メアド等）をマスクする処理を検討する。

#### Priority 3: 将来的な認証強化
*   **Middleware導入**: 管理機能 (`/admin` 等) を実装する際は、必ず `middleware.ts` を作成し、ルート単位での認証ガードを適用する。
