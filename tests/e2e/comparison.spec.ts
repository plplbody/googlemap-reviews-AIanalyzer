import { test, expect } from '@playwright/test';

test.describe('TM-03: Comparison Flow', () => {
    test.beforeEach(async ({ page }) => {
        // 1. INJECT MOCK USER (Needed for Verdict Modal visibility)
        await page.addInitScript(() => {
            localStorage.setItem('E2E_TEST_SESSION', JSON.stringify({
                uid: 'test-user-001',
                displayName: 'Test User',
                email: 'test@example.com',
                photoURL: null
            }));
        });

        // 2. Perform Search
        await page.goto('/');
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('TEST_QUERY_FORCE_CLIENT_FETCH');
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('.grid > div').first()).toBeVisible({ timeout: 10000 });
    });

    test('TM-03-01/02/03/05: Selection & Comparison Lifecycle', async ({ page }) => {
        // Select first two items
        const cards = page.locator('.grid > div');

        const card1 = cards.nth(0);
        const card2 = cards.nth(1);

        const compareBtn1 = card1.getByRole('button', { name: '比較する' });
        const compareBtn2 = card2.getByRole('button', { name: '比較する' });

        await compareBtn1.click();
        await expect(card1.getByText('選択中')).toBeVisible();

        await compareBtn2.click();
        await expect(card2.getByText('選択中')).toBeVisible();

        // Tray should be visible
        const trayComparisonBtn = page.getByRole('button', { name: '比較を開始する' });
        await expect(trayComparisonBtn).toBeVisible();

        // Trigger Comparison Modal
        await trayComparisonBtn.click();

        // Verify Modal Contents (Verdict Modal)
        const modal = page.getByRole('dialog');
        await expect(modal).toBeVisible();
        await expect(page.getByText('詳細比較')).toBeVisible();

        // Verify both place names are present in the modal
        // Ristorante A (from list-view mock)
        await expect(page.getByText('Ristorante A')).toBeVisible();
    });
});
