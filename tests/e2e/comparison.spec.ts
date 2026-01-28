
import { test, expect } from '@playwright/test';

test.describe('TM-03: Comparison Flow', () => {
    const MOCK_PLACES_4_ITEMS = {
        places: [
            { id: 'p1', name: 'Place 1', status: 'completed', axisScores: { taste: 4, service: 3, atmosphere: 4, cost: 3 }, originalRating: 4.5, userRatingsTotal: 100, priceLevel: 'PRICE_LEVEL_MODERATE', summary: ['Good'], trueScore: 4.5, avgSakuraScore: 3.5 },
            { id: 'p2', name: 'Place 2', status: 'completed', axisScores: { taste: 3, service: 3, atmosphere: 3, cost: 3 }, originalRating: 4.0, userRatingsTotal: 50, priceLevel: 'PRICE_LEVEL_MODERATE', summary: ['Okay'], trueScore: 4.0, avgSakuraScore: 3.0 },
            { id: 'p3', name: 'Place 3', status: 'completed', axisScores: { taste: 5, service: 5, atmosphere: 5, cost: 5 }, originalRating: 4.8, userRatingsTotal: 200, priceLevel: 'PRICE_LEVEL_EXPENSIVE', summary: ['Great'], trueScore: 4.8, avgSakuraScore: 4.5 },
            { id: 'p4', name: 'Place 4', status: 'completed', axisScores: { taste: 2, service: 2, atmosphere: 2, cost: 2 }, originalRating: 3.5, userRatingsTotal: 10, priceLevel: 'PRICE_LEVEL_INEXPENSIVE', summary: ['Bad'], trueScore: 3.5, avgSakuraScore: 2.0 },
            { id: 'p5', name: 'Place 5', status: 'completed', axisScores: { taste: 1, service: 1, atmosphere: 1, cost: 1 }, originalRating: 3.0, userRatingsTotal: 5, priceLevel: 'PRICE_LEVEL_FREE', summary: ['Worst'], trueScore: 3.0, avgSakuraScore: 1.5 }
        ],
        nextPageToken: null
    };

    test.beforeEach(async ({ page }) => {
        // 2. Mock Search API
        await page.route('*/**/api/places/search', async route => {
            console.log('Intercepted Search API');
            await route.fulfill({ json: MOCK_PLACES_4_ITEMS });
        });

        await page.goto('/?view=LIST&q=TEST_QUERY_FORCE_CLIENT_FETCH');

        // Wait for List View
        await expect(page).toHaveURL(/view=LIST/);

        const loading = page.getByText('Googleマップから最新情報を検索中');
        const empty = page.getByText('条件に一致するお店が見つかりませんでした');

        await expect(loading).not.toBeVisible({ timeout: 10000 });

        // Ensure Grid appears
        await expect(page.locator('.grid > div').first()).toBeVisible({ timeout: 5000 });

        // Ensure Place List is visible
        // Debugging: Assert text content to see what is rendered if it fails
        const firstCard = page.locator('.grid > div').first();
        await expect(firstCard).toBeVisible({ timeout: 5000 });
        await expect(firstCard).toContainText('AI分析スコア', { timeout: 5000 });
    });

    test('TM-03-01/02/03/05: Selection & Comparison Lifecycle', async ({ page }) => {
        // 最初の2つのアイテムを選択
        const cards = page.locator('.grid > div');
        const card1 = cards.nth(0);
        const card2 = cards.nth(1);

        // Use more specific button selectors
        const compareBtn1 = card1.getByRole('button', { name: /比較する|選択/ });
        const compareBtn2 = card2.getByRole('button', { name: /比較する|選択/ });

        // Click with force to ensure interaction despite overlays (though tray shouldn't block yet)
        await compareBtn1.click({ force: true });
        await expect(card1.getByText('選択中')).toBeVisible();

        await compareBtn2.click({ force: true });
        await expect(card2.getByText('選択中')).toBeVisible();

        // トレイが表示されるはず
        const trayComparisonBtn = page.getByRole('button', { name: 'AI比較する' });
        await expect(trayComparisonBtn).toBeVisible();

        // "比較失敗"のアラートリスナーを設定 (E2EではDBが空のため)
        // Note: Playwright automatically dismisses dialogs unless listener is set.
        // We set listener to verify the message.
        page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()} `);
            await dialog.dismiss();
        });

        // 比較をトリガー (p1, p2のDBデータがないため失敗する)
        await trayComparisonBtn.click();

        // Wait for potential dialog or error state due to Mock DB failure
        await page.waitForTimeout(500);
    });

    test('TM-U-06-01: Verdict Modal Execution & Calculation Display', async ({ page }) => {
        // Setup state: Select 2 items
        // We select by name to be robust against AI sorting
        const cards = page.locator('.grid > div');
        await expect(cards).toHaveCount(5, { timeout: 10000 });

        await cards.filter({ hasText: 'Place 1' }).getByRole('button', { name: /比較する|選択/ }).click({ force: true });
        await cards.filter({ hasText: 'Place 2' }).getByRole('button', { name: /比較する|選択/ }).click({ force: true });

        // Execute Mock Injection
        await page.waitForFunction(() => (window as any)._setVerdictTesting !== undefined, { timeout: 15000 });

        const mockResult = {
            winnerId: 'p1',
            reason: 'Test Reason: 98% Match',
            scores: { p1: 98, p2: 45 },
            matrix: {
                p1: { taste: { score: '4.5', pros: ['Tasty'], cons: [] } },
                p2: { taste: { score: '3.0', pros: [], cons: ['Salty'] } }
            }
        };

        await page.evaluate((data) => {
            (window as any)._setVerdictTesting(data);
        }, mockResult);

        // Verify Modal Opens
        const modal = page.locator('dialog');
        await expect(modal).toBeVisible({ timeout: 10000 });

        // Verify Content
        await expect(modal.getByText('あなたとのマッチ度 No.1')).toBeVisible({ timeout: 5000 });
        await expect(modal.getByRole('heading', { name: 'Place 1' })).toBeVisible({ timeout: 5000 });

        // Score Match (98% for p1, 45% for p2)
        // Use exact match to avoid strict mode violation
        await expect(modal.getByText('98', { exact: true })).toBeVisible();
        await expect(modal.getByText('45', { exact: true })).toBeVisible();

        // Close Modal
        await modal.getByRole('button', { name: '閉じる' }).click();
        await expect(modal).not.toBeVisible();
    });

    // TM-U-05-03: トレイ要素削除
    test('TM-U-05-03: Tray Item Removal', async ({ page }) => {
        // Setup state: Select 2 items
        const cards = page.locator('.grid > div');
        const card1 = cards.filter({ hasText: 'Place 1' });
        const card2 = cards.filter({ hasText: 'Place 2' });

        await card1.getByRole('button', { name: /比較する|選択/ }).click({ force: true });
        await card2.getByRole('button', { name: /比較する|選択/ }).click({ force: true });

        // Verify Tray shows 2 items
        await expect(page.getByText('2 / 3 選択中')).toBeVisible();

        // 1. Remove Item 1 from Tray
        // Specific selector for Tray Container
        const tray = page.locator('.fixed').filter({ hasText: '比較トレイ' });
        await expect(tray).toBeVisible();

        // Find the thumbnail specific container (using group class or relative positioning logic)
        // Thumbnail structure: <div className="relative group ...">
        const trayItem1 = tray.locator('.relative.group').filter({ hasText: 'Place 1' });
        await expect(trayItem1).toBeVisible();

        // Hover to show delete button (CSS: group-hover:opacity-100)
        await trayItem1.hover();

        // Find the '削除' (X) button
        const deleteBtn = trayItem1.getByRole('button', { name: '削除' });
        // Use force click if visibility is still an issue due to opacity: 0
        await deleteBtn.click({ force: true });

        // 2. Verify Item Removed
        await expect(page.getByText('1 / 3 選択中')).toBeVisible();
        await expect(trayItem1).toBeHidden();

        // 3. Verify List Selection State Reverted
        // Card 1 should show "比較する" instead of "選択中"
        console.log('DEBUG: Checking Card 1 for "選択中" text removal...');

        // Wait for removal to reflect in the UI
        // We use a custom locator to ensure we only look at the first card's button
        const card1Button = card1.getByRole('button', { name: /比較する|選択中/ });
        await expect(card1Button).toHaveText('比較する', { timeout: 5000 });
        await expect(card1.getByText('選択中')).toBeHidden({ timeout: 5000 });
    });

    test('TM-U-05-02: Selection Limit Check', async ({ page }) => {
        const cards = page.locator('.grid > div');

        // Ensure at least 4 items are rendered (wait for last one)
        await cards.nth(3).waitFor({ state: 'attached', timeout: 5000 });
        await expect(cards.count()).resolves.toBeGreaterThanOrEqual(4);

        const btn1 = cards.nth(0).getByRole('button', { name: /比較する|選択/ });
        const btn2 = cards.nth(1).getByRole('button', { name: /比較する|選択/ });
        const btn3 = cards.nth(2).getByRole('button', { name: /比較する|選択/ });
        const btn4 = cards.nth(3).getByRole('button', { name: /比較する|選択/ });

        // 3つのアイテムを選択 (上限は3)
        await btn1.click({ force: true });
        await btn2.click({ force: true });
        await btn3.click({ force: true });

        // アラートリスナーを設定
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('最大3件まで');
            await dialog.dismiss();
        });

        // 4つ目を選択しようとする (アラートがトリガーされるはず)
        await btn4.click({ force: true });

        // 4つ目のアイテムが選択されていないことを検証
        await expect(cards.nth(3).getByText('選択中')).not.toBeVisible();
    });
});
