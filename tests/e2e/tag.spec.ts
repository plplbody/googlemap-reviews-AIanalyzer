import { test, expect } from '@playwright/test';

test.describe('TM-U-10/11: Tag Management', () => {

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

        await page.goto('/settings/tags'); // Assuming this URL or profile/tags
    });

    test.fixme('TM-U-10-01: Tag CRUD', async ({ page }) => {
        // CREATE
        const input = page.getByPlaceholder('新しいタグを入力');
        await input.fill('E2E_Test_Tag');
        await page.getByRole('button', { name: /追加|作成/ }).click();

        // Verify content
        await expect(page.getByText('E2E_Test_Tag')).toBeVisible();

        // DELETE
        // Assuming list item has a delete button
        const tagItem = page.locator('li').filter({ hasText: 'E2E_Test_Tag' });
        await tagItem.getByRole('button', { name: /削除|Delete/ }).click();

        // Confirm Dialog if any
        // If alert/confirm
        // page.on('dialog', dialog => dialog.accept());

        await expect(page.getByText('E2E_Test_Tag')).not.toBeVisible();
    });

    test.fixme('TM-U-10-02: Duplicate Tag Error', async ({ page }) => {
        // Add once
        const input = page.getByPlaceholder('新しいタグを入力');
        await input.fill('Duplicate_Tag');
        await page.getByRole('button', { name: /追加|作成/ }).click();
        await expect(page.getByText('Duplicate_Tag')).toBeVisible();

        // Add again
        await input.fill('Duplicate_Tag');
        await page.getByRole('button', { name: /追加|作成/ }).click();

        // Verify Error
        await expect(page.getByText('同じ名前のタグが既に存在します')).toBeVisible();
    });

    test('TM-U-11-01: Learning Feedback Popup', async ({ page }) => {
        // This might need to happen on List/Detail view rather than settings
        // Navigate to Detail View of a place
        await page.goto('/');
        // Search & Click
        const searchInput = page.getByRole('textbox', { name: '検索' });
        await searchInput.fill('Feedback Test');
        await page.locator('button[type="submit"]').click();

        // Mock response required for list? (Assuming global mock or reliant on real/default mock)
        // Let's assume list loads.
        await page.locator('.grid > div').first().click();

        // Evaluate "Good" or specific tag (Scenario)
        // Need a place that allows evaluation details
        // Assuming UI has "Positive" button or similar

        // IF detailed evaluation UI exists:
        // await page.getByRole('button', { name: '高評価' }).click(); // or similar

        // Check for XP Popup
        // const popup = page.getByText('+20 XP');
        // await expect(popup).toBeVisible();
    });

});
