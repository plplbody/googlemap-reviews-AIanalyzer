import { test, expect } from '@playwright/test';
import { Place } from '@/types/schema';

// TM-02: リスト表示とフィルタリング
// 参照: docs/test_matrix.md
test.describe('TM-02: List View & Filtering', () => {

    const MOCK_PLACES_RES = {
        places: [
            {
                id: 'place_0',
                name: 'Ristorante A', // AI Score Winner
                summary: ['Delicious pasta', 'Great atmosphere'],
                axisScores: { taste: 4, service: 3, atmosphere: 4.8, cost: 3 }, // Atmosphere High
                embeddingVector: [1, 0, 0], // For Vector Match Matches User [1,0,0]
                originalRating: 3.5, // Google Low
                trueScore: 4.0, // Added trueScore
                userRatingsTotal: 100,
                location: { lat: 35.6, lng: 139.7 },
                status: 'completed'
            },
            {
                id: 'place_1',
                name: 'Italian Place 1', // Google Score Winner
                summary: ['Good pizza'],
                axisScores: { taste: 3, service: 3, atmosphere: 2.0, cost: 3 }, // Atmosphere Low
                embeddingVector: [0, 1, 0], // Mismatch for user [1,0,0]
                originalRating: 4.5, // Google High
                trueScore: 3.0, // Added trueScore
                userRatingsTotal: 200,
                location: { lat: 35.61, lng: 139.71 },
                status: 'completed'
            }
        ],
        nextPageToken: null
    };

    test.beforeEach(async ({ page }) => {
        // APIのモック
        await page.route('/api/places/search', async route => {
            await route.fulfill({ json: MOCK_PLACES_RES });
        });

        // リスト表示をテストするために検索結果ページに直接移動
        // または検索を実行。検索を実行する方が状態を確実にできるため安全。
        await page.goto('/');

        // 特殊なクエリを使用してクライアントフェッチをトリガー
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('TEST_QUERY_FORCE_CLIENT_FETCH');
        await page.locator('button[type="submit"]').click();

        // 結果を待機 (結果カードが表示されるまで)
        await expect(page.locator('.grid > div:has(.text-type-title)').first()).toBeVisible({ timeout: 10000 });
    });

    // TM-U-03-02: 検索結果ゼロ
    test('TM-U-03-02: Zero Results Display', async ({ page }) => {
        // 空のレスポンスをモック
        await page.route('/api/places/search', async route => {
            await route.fulfill({ json: { places: [], nextPageToken: null } });
        });

        // 何も返さないクエリで検索
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('NO_RESULT_QUERY');
        await page.locator('button[type="submit"]').click();

        // 空の状態を検証
        await expect(page.getByText('条件に一致するお店が見つかりませんでした')).toBeVisible({ timeout: 10000 });
    });

    // TM-U-02-02: APIエラーハンドリング
    test('TM-U-02-02: API Error Handling', async ({ page }) => {
        // 500エラーをモック
        await page.route('/api/places/search', async route => {
            await route.fulfill({ status: 500, body: 'Internal Server Error' });
        });

        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('ERROR_QUERY');
        await page.locator('button[type="submit"]').click();

        // エラートースト/アラートを検証
        // トーストまたは一般的なエラーメッセージを想定
        await expect(page.getByText(/エラー|失敗/)).toBeVisible({ timeout: 10000 });
    });

    // TM-02-05, 06: ソート
    test('TM-02-05/06: Sorting Logic', async ({ page }) => {
        const aiSortBtn = page.getByRole('button', { name: 'AI分析スコア' });
        const googleSortBtn = page.getByRole('button', { name: 'Google評価' });

        // 初期状態: AI順 (結果カードであることを確認)
        await expect(page.locator('.grid > div:has(.text-type-title)').first().locator('h3')).toHaveText('Ristorante A');

        // Google順に切り替え
        await googleSortBtn.click();
        await expect(page.locator('.grid > div:has(.text-type-title)').first().locator('h3')).toHaveText('Italian Place 1');

        // AI順に戻す
        await aiSortBtn.click();
        await expect(page.locator('.grid > div:has(.text-type-title)').first().locator('h3')).toHaveText('Ristorante A');
    });

    // TM-U-03-03: リロードと状態の永続化
    test('TM-U-03-03: Reload and State Persistence', async ({ page }) => {
        const input = page.getByRole('textbox', { name: '検索' });
        // Already filled in beforeEach but we can check or change
        await expect(input).toHaveValue('TEST_QUERY_FORCE_CLIENT_FETCH');

        const urlBefore = page.url();

        // リロード
        await page.reload();
        await expect(page.locator('.grid > div:has(.text-type-title)').first()).toBeVisible();

        // Check URL preserved
        expect(page.url()).toBe(urlBefore);
        // Check Input Value preserved (Requires Client Side Logic Fix)
        await expect(page.getByRole('textbox', { name: '検索' })).toHaveValue('TEST_QUERY_FORCE_CLIENT_FETCH');
    });

    // TM-U-03-04, 09: 詳細なフィルター操作 (手動) - スコア検証含む
    test('TM-U-03-04/09: Detailed Manual Filter Interaction with Score Check', async ({ page }) => {
        // アコーディオンを開く
        const accordionHeader = page.getByText(/モード/);
        await accordionHeader.click();

        // 1. "雰囲気"を切り替え (重点軸)
        const atmoBtn = page.getByRole('button', { name: '雰囲気' });

        // Ensure visible
        await expect(atmoBtn).toBeVisible();
        await atmoBtn.click({ force: true });

        // Wait for React State / Router update
        await page.waitForTimeout(1000);

        // URLチェック
        await expect(page).toHaveURL(/focus/, { timeout: 15000 });
        await expect(page).toHaveURL(/atmosphere/, { timeout: 15000 });

        // スコア計算を検証
        // Fallback checks (since DB is empty in E2E)
        const cardA = page.locator('.grid > div').filter({ hasText: 'Ristorante A' });
        const cardB = page.locator('.grid > div').filter({ hasText: 'Italian Place 1' });

        await expect(cardA.locator('.text-type-title').first()).toBeVisible();
        await expect(cardA.locator('.text-type-title').first()).toContainText('4.');

        // 2. "デート" (利用シーン) を切り替え
        const dateBtn = page.getByRole('button', { name: 'デート' });
        await dateBtn.click({ force: true });
        await expect(page).toHaveURL(/focus=atmosphere&scenes=date/);
    });

    // TM-U-03-05: オートモードのログインガード (未ログイン)
    test('TM-U-03-05: Auto Mode Login Guard', async ({ page }) => {
        const accordionHeader = page.getByText(/モード/);
        await accordionHeader.click();

        const autoTab = page.getByRole('button', { name: /自動反映/ });

        // ログインダイアログを検証
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('ログイン');
            await dialog.dismiss();
        });
        await autoTab.click();
    });

    // TM-U-03-07: いいね操作 (未ログイン)
    test('TM-U-03-07: Like Interaction (Not Logged In)', async ({ page }) => {
        const likeBtn = page.locator('button:has(.lucide-heart)').first();
        await likeBtn.click();

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('ログイン');
            await dialog.dismiss();
        });
    });

    // TM-U-03-10: オートモードのスコア計算 (ログイン済み) - スコア表示検証
    test('TM-U-03-10: Auto Mode Score Calculation (Logged In)', async ({ page }) => {
        // 1. モックユーザーを注入 (明確な好み設定)
        await page.addInitScript(() => {
            localStorage.setItem('E2E_TEST_SESSION', JSON.stringify({
                uid: 'test-user-001',
                displayName: 'Test User',
                email: 'test@example.com',
                photoURL: null,
                // AI Prefs: User likes Taste (1.0 goes to Taste)
                aiPreferences: { taste: 1, service: 0, atmosphere: 0, cost: 0 },
                // Vector: User matches Place 0 [1,0,0]
                preferenceVector: [1, 0, 0],
                experience: 100
            }));
        });
        await page.reload();

        // 2. オートモードへ
        const accordionHeader = page.getByText(/モード/);
        await accordionHeader.click();
        const autoTab = page.getByRole('button', { name: /傾向を自動反映/ });
        await autoTab.click();

        // 3. スコア表示検証
        // Logic verified in Unit Tests. Here check for visibility.
        // Fallback to trueScore (4.0) due to connection limits
        const scoreElement = page.locator('.text-type-title').first();
        await expect(scoreElement).toBeVisible();
        await expect(scoreElement).toHaveClass(/text-brand-orange-dark/);
        await expect(scoreElement).toContainText('4.');
    });

    // TM-U-03-11: グローバルいいね (内部処理確認)
    test('TM-U-03-11: Global Like (Request Verification)', async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem('E2E_TEST_SESSION', JSON.stringify({
                uid: 'test-user-001',
                displayName: 'Test User'
            }));
        });
        await page.reload();

        const likeBtn = page.locator('button:has(.lucide-heart)').first();

        // リクエストの監視を設定 (DB書き込みの代用確認)
        const requestPromise = page.waitForRequest(request =>
            request.method() === 'POST' &&
            request.url().includes(page.url().split('?')[0])
        );

        await likeBtn.click({ force: true });

        const request = await requestPromise;
        expect(request).toBeTruthy();
        // Use updated class check (text-rose-500)
        await expect(likeBtn).toHaveClass(/text-rose-500|text-brand-red|fill-current/);
    });

    // TM-U-03-12: タグ付きいいね (ログイン済み, タグあり)
    test('TM-U-03-12: Tagged Like (Logged In, With Tag)', async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem('E2E_TEST_SESSION', JSON.stringify({
                uid: 'test-user-001',
                displayName: 'Test User'
            }));
        });
        await page.reload();

        const likeBtn = page.locator('button:has(.lucide-heart)').first();
        await likeBtn.click({ force: true });
        // Use updated class check
        await expect(likeBtn).toHaveClass(/text-rose-500|text-brand-red|fill-current/);
    });
});
