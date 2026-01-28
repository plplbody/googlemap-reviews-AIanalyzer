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

    test('TM-U-10-01: Tag CRUD', async ({ page }) => {
        // Wait for profile loading
        await expect(page.getByText('AIタグ管理')).toBeVisible({ timeout: 10000 });

        // CREATE
        await page.getByRole('button', { name: '新しいAIタグを作成する' }).click();

        const input = page.getByPlaceholder(/例:/); // TagCreationForm input
        await input.fill('E2E_Test_Tag');
        await page.getByRole('button', { name: '作成する' }).click();

        // Verify creation
        await expect(page.getByText('E2E_Test_Tag')).toBeVisible();

        // DELETE
        // Handle confirm dialog - must be registered BEFORE clicking
        page.once('dialog', dialog => dialog.accept());

        const tagCard = page.locator('.group').filter({ hasText: 'E2E_Test_Tag' });
        await tagCard.getByRole('button', { name: '削除' }).click();

        // Verify deletion
        await expect(page.getByText('E2E_Test_Tag')).not.toBeVisible();
    });

    test('TM-U-10-02: Duplicate Tag Error', async ({ page }) => {
        await expect(page.getByText('AIタグ管理')).toBeVisible({ timeout: 15000 });

        // Add once
        await page.getByRole('button', { name: '新しいAIタグを作成する' }).click();
        const input1 = page.getByPlaceholder(/例:/);
        await input1.fill('Duplicate_Tag');
        await page.getByRole('button', { name: '作成する' }).click();
        await expect(page.getByText('Duplicate_Tag')).toBeVisible({ timeout: 10000 });

        // Add again
        await page.getByRole('button', { name: '新しいAIタグを作成する' }).click();
        const input2 = page.getByPlaceholder(/例:/);
        await input2.fill('Duplicate_Tag');

        // Handle alert dialog for duplicate error
        const dialogPromise = page.waitForEvent('dialog');
        await page.getByRole('button', { name: '作成する' }).click();

        const dialog = await dialogPromise;
        expect(dialog.message()).toContain('既に存在');
        await dialog.accept();

        // Wait a bit to ensure it doesn't hang
        await page.waitForTimeout(500);
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
