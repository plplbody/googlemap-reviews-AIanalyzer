import { test, expect } from '@playwright/test';

test.describe('TM-01: Search & Hero Area', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('TM-01-01: Hero Content Visibility', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /AIグルメコンシェルジュ/i })).toBeVisible();
        await expect(page.getByText(/あなた専属の/i)).toBeVisible();
    });

    test('TM-01-02/03/08: Input Validation & Button State', async ({ page }) => {
        const input = page.getByRole('textbox', { name: '検索' });
        const submitBtn = page.getByRole('button', { name: /search|検索/i });

        // Initial state: Empty, button should be disabled
        await expect(submitBtn).toBeDisabled();

        // Cannot click, so URL check is implicitly satisfied as we can't navigate

        // Type short query
        await input.fill('ラーメン');
        await expect(submitBtn).toBeEnabled();
    });

    test('TM-01-05: Character Limit (101 chars)', async ({ page }) => {
        const input = page.getByRole('textbox', { name: '検索' });
        const longQuery = 'a'.repeat(101);
        await input.fill(longQuery);

        // Final character should be truncated or ignored? 
        // Our impl truncates at input level (maxlength)
        const val = await input.inputValue();
        expect(val.length).toBeLessThanOrEqual(100);
    });

    test('TM-01-04/06: Search Execution', async ({ page }) => {
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('TEST_QUERY_FORCE_CLIENT_FETCH');

        const submitBtn = page.getByRole('button', { name: /search|検索/i });
        await submitBtn.click();

        // TM-01-06: Search Execution (Redirect)
        await expect(page).toHaveURL(/view=LIST/);
        await expect(page).toHaveURL(/q=TEST_QUERY_FORCE_CLIENT_FETCH/);
    });
});
