import { test, expect } from '@playwright/test';

test.describe('TM-04: Profile & Interactions', () => {
    test.beforeEach(async ({ page }) => {
        // 1. INJECT MOCK USER
        await page.addInitScript(() => {
            localStorage.setItem('E2E_TEST_SESSION', JSON.stringify({
                uid: 'test-user-001',
                displayName: 'Test User',
                email: 'test@example.com',
                photoURL: null
            }));
        });

        // 2. Mock API for "personalize" and "interactions"
        // Force Client Fetch using special query
        await page.goto('/');
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('TEST_QUERY_FORCE_CLIENT_FETCH');
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('.grid > div').first()).toBeVisible({ timeout: 10000 });
    });

    test('TM-04-07~11: Visited & Memo Interactions', async ({ page }) => {
        // TM-04-07: Toggle Visited ON
        const visitBtn = page.getByRole('button', { name: /来店|チェックイン/ }).first();

        // Initial: Not Visited
        await visitBtn.click({ timeout: 10000 });

        // Should change to "来店済"
        await expect(page.getByText(/来店済|チェックイン済/)).toBeVisible({ timeout: 10000 });

        // TM-04-09: Memo Button Appears and Opens Modal
        const memoBtn = page.getByRole('button', { name: /メモ/ });
        await expect(memoBtn).toBeVisible();

        await memoBtn.click();

        // Checks Modal Content
        const modal = page.getByRole('dialog');
        await expect(modal.getByRole('heading', { name: '来店メモ' })).toBeVisible();
        await expect(modal.getByText('また行きたい？')).toBeVisible();

        // TM-04-10: Repeat Options
        const yesBtn = modal.getByRole('button', { name: 'あり' });
        await expect(yesBtn).toBeVisible();
        await yesBtn.click();

        // TM-04-11: Save
        await modal.getByPlaceholder('美味しかったメニュー、雰囲気、混雑具合など...').fill('Test Memo Content');
        await modal.getByRole('button', { name: '保存する' }).click();

        // Modal should close
        await expect(modal).not.toBeVisible();

        // Verify Content Updates in Card (Optimistic UI)
        await expect(page.getByText('Test Memo Content')).toBeVisible();
        await expect(page.getByText('リピート: あり')).toBeVisible();
    });
});
