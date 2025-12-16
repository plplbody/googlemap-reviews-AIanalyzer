# 🚀 本番環境リリース手順書 (Zero to Production)

本プロジェクトを**新規作成したばかりのGoogle Cloud Project**にデプロイし、完全に動作させるための詳細手順書です。

## 1. Google Cloud プロジェクトのセットアップ

まず、Google Cloud Platform (GCP) 側で必要なAPIと設定を有効化します。

### 1.1. 必要なAPIの有効化
GCPコンソールの「APIs & Services > Library」から、以下のAPIを検索して**有効化 (Enable)** してください。

1.  **Places API (New)**: `places.googleapis.com` (店舗情報取得用)
    *   *注意: "Places API (New)" を選択してください。旧版ではありません。*
2.  **Vertex AI API**: `aiplatform.googleapis.com` (AI分析用)
3.  **Cloud Run Admin API**: `run.googleapis.com` (デプロイ用)
4.  **Artifact Registry API**: `artifactregistry.googleapis.com` (コンテナ保存用)
5.  **Cloud Build API**: `cloudbuild.googleapis.com` (ビルド用)

### 1.2. OAuth 同意画面の設定 (重要)
Firebase Authentication（Googleログイン）を使用するには、GCP側でOAuth同意画面の設定が必要です。

1.  GCPコンソールで **"APIs & Services" > "OAuth consent screen"** を開く。
2.  **User Type**: "External" (外部) を選択して作成。
3.  **App Information**:
    *   アプリ名: 任意の名称（例: "Gourmet AI Analyzer"）
    *   ユーザーサポートメール: 自分のメールアドレス
4.  **Developer Contact Information**: 自分のメールアドレス
5.  **Scopes**: デフォルトのままで保存して次へ。
6.  **Test Users**: テストであれば自分のメールアドレスを追加。本番公開時は「Publish」ボタンを押して本番化します。

### 1.3. Cloud Run サービスアカウントの権限設定
Cloud Run (および Cloud Tasks) が使用するサービスアカウントには、以下のIAMロールが必要です。
デフォルトの `Comput Engine default service account` を使う場合、多くの権限が初期状態で付与されていますが、セキュリティ強化のため専用のサービスアカウントを作成する場合は以下を付与してください。

| ロール名 | ID (`roles/...`) | 用途 |
| :--- | :--- | :--- |
| **Vertex AI ユーザー** | `roles/aiplatform.user` | Gemini (AI分析) の実行に必要 |
| **Cloud Datastore ユーザー** | `roles/datastore.user` | Firestore への読み書きに必要 |
| **Cloud Tasks エンキューアー** | `roles/cloudtasks.enqueuer` | 分析キューへのタスク追加に必要 |
| **サービスアカウントユーザー** | `roles/iam.serviceAccountUser` | Cloud Tasks が Cloud Run を起動する際の認証に必要 |
| **Service Usage コンシューマー** | `roles/serviceusage.serviceUsageConsumer` | 各種APIのクォータ利用に必要 |

> [!TIP]
> **設定方法**: GCPコンソールの "IAM & Admin" > "IAM" から、Cloud Runに割り当てるサービスアカウント（デフォルトは `[project-number]-compute@developer.gserviceaccount.com`）を編集し、上記のロールを追加します。

## 2. Firebase プロジェクトの作成とリンク

1.  [Firebase Console](https://console.firebase.google.com/) にアクセスし、「プロジェクトを追加」をクリック。
2.  プロジェクト名を入力する画面で、**既存のGoogle Cloudプロジェクト**を選択してリンクさせます。
3.  "Pay as you go" (Blaze Plan) の設定が必要になる場合があります（Cloud Run利用に必須）。

### 2.1. Webアプリの登録
1.  Firebaseコンソールトップの `</>` アイコン (Web) をクリック。
2.  アプリのニックネームを入力（例: `web-app`）。
3.  **Firebase Hosting** の設定は「後でする」でOKです（今回はCloud Runを使うため）。
4.  発行された `firebaseConfig` の値（`apiKey`など）は後で環境変数に使います。

### 2.2. Authentication (Googleログイン) の設定
1.  メニュー **Build > Authentication** を選択し「始める」。
2.  **Sign-in method** タブで **Google** プロバイダを選択し「有効にする」。
3.  **プロジェクトのサポートメール**: 自分のアドレスを選択。
4.  **保存** をクリック。
    *   *これだけで、裏側でGCPの「Credentials」にOAuth 2.0 クライアントIDが自動作成されます。*

### 2.3. Firestore データベースの作成
Authenticationの次は、データベースを有効化します。

1.  メニュー **Build > Firestore Database** を選択し「データベースの作成」をクリック。
2.  **Database ID**: `(default)` のまま次へ。
3.  **Location**: Cloud Runと同じリージョン (`asia-northeast1` / Tokyo) を選択。
    *   *注意: 後から変更できません。*
4.  **Security Rules**: 「本番環境モード (Production mode)」を選択して作成。
    *   *最初はすべて拒否されますが、後ほどの手順でローカルの `firestore.rules` をデプロイして上書きするため問題ありません。*

## 3. 本番環境変数の準備

Cloud Runに設定する環境変数を準備します。
手元のメモ帳などに控えてください。

| 変数名 | 取得元 / 設定値 |
| :--- | :--- |
| `HOTPEPPER_API_KEY` | リクルートWebサービスで発行したキー |
| `GOOGLE_MAPS_API_KEY` | GCPコンソール > Credentials で発行したAPIキー (詳細画面の地図表示用: Embed API) |
| `GEMINI_API_KEY` | (Vertex AIを使うため今回は**不要**ですがコード互換のためダミー値でも可、またはGemini APIキー) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebaseコンソール > Project Settings > General下部 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | 同上 (`projectId.firebaseapp.com`) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | 同上 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | 同上 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 同上 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | 同上 |

> [!NOTE]
> `GOOGLE_MAPS_API_KEY` は本番環境（Cloud Run）では**不要**です。自動的にサービスアカウント認証（ADC）が使われます。

## 4. デプロイ実行 (Cloud Run)

ターミナルを開き、プロジェクトのルートディレクトリで実行します。

### 4.1. ログインとプロジェクト設定
```bash
# GCPにログイン
gcloud auth login

# プロジェクトを設定
gcloud config set project [YOUR_PROJECT_ID]
```

### 4.2. デプロイコマンド
以下のコマンドをコピーし、`[YOUR_PROJECT_ID]` や各APIキーの部分を実測値に書き換えて実行してください。

> [!NOTE]
> `.gcloudignore` ファイルを作成済みです。これにより `.env` や `secrets/`、`docs/` などの不要・機密ファイルはアップロード対象から除外されます。

```bash
gcloud run deploy ai-concierge-for-gourmet --source . --platform managed --region asia-northeast1 --allow-unauthenticated --set-env-vars HOTPEPPER_API_KEY=xxx --set-env-vars GOOGLE_MAPS_API_KEY=xxx --set-env-vars NEXT_PUBLIC_HOST={GCRのURL}--set-env-vars GOOGLE_CLOUD_PROJECT={プロジェクトID}
```

*   途中で `Artifact Registry API` の有効化を求められた場合は `y` を押してください。

## 5. Firebase Hosting の設定 (独自ドメイン・CDN)

Cloud Run単体でも公開できますが、Firebase Hostingを前段に置くことで、**独自ドメインの利用**や**CDNによる高速化**が簡単に行なえます。

### 5.1. Firebase CLI ツールのインストール
まだインストールしていない場合、お手元のPCで実行してください。

```bash
npm install -g firebase-tools
firebase login
```

### 5.2. ホスティング設定のデプロイ
プロジェクトルートに `firebase.json` を作成済みです（Cloud Run `gourmet-app` へ転送する設定になっています）。
以下のコマンドで、この設定をFirebaseに適用します。

```bash
# ターゲットのプロジェクトを指定 (初回のみ)
firebase use [YOUR_PROJECT_ID]

# Hosting設定のみデプロイ
firebase deploy --only hosting

# Firestoreルールのみデプロイ
firebase deploy --only firestore:rules
```

デプロイが完了すると、Hosting用のURLが表示されます（例: `https://[project-id].web.app`）。
Cloud Runへの転送設定が効いているか、このURLにアクセスして確認してください。

> [!important]
> **セキュリティルールの適用**: `firebase deploy --only firestore:rules` を実行しないと、デフォルト設定（アクセス禁止、またはテストモードで期限切れ）のままとなり、アプリが動かないか、セキュリティリスクになります。必ず実行してください。

### 5.3. 独自ドメインの設定
1.  Firebaseコンソール > **Build** > **Hosting** を開く。
2.  「カスタム ドメインを追加」をクリック。
3.  使用したいドメイン（例: `www.example.com`）を入力。
4.  表示される TXTレコード を、お使いのDNSプロバイダ（お名前.com, Google Domains等）の設定画面で追加する。
5.  所有権が確認されると、SSL証明書が自動発行されます（数分〜数時間かかる場合があります）。

## 6. 動作確認

HostingのURL（または設定した独自ドメイン）にアクセスします。

1.  **トップページ表示**: 画面が正常に表示されるか。
2.  **検索機能**: キーワード検索を行い、Firestoreへの書き込みと表示ができるか。
3.  **ログイン**:
    *   「ログイン」ボタンを押し、Google認証画面が開くか。
    *   *注意*: 新しいドメイン（HostingのURL）も、Firebase Authenticationの **「承認済みドメイン」に追加** する必要があります（前述の「承認済みドメインの追加」手順を参照）。

## 7. トラブルシューティング
（以下変更なし）

## 8. 開発者限定で公開する方法
- Cloud Run > サービス > セキュリティ より、「認証が必要」にチェックをいれる。公開したい場合は「公開アクセスを許可」にチェックを入れる。
- 上記のチェックを入れることで、IAMユーザー限定のアクセスになる。
- IAM認証を行うためには、所定をトークンをリクエストヘッダーに含める必要がある。
- これを簡潔に行うため、gcloud ploxy を利用する。下記のコマンドを実行する。
```bash
gcloud run services proxy [サービス名] --project [プロジェクトID]
```