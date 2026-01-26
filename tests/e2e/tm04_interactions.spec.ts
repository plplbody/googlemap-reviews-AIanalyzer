import { test, expect } from '@playwright/test';

// TM-04: Profile & Interactions
// Ref: docs/test_matrix.md
test.describe('TM-04: Profile & Interactions', () => {

    const MOCK_INTERACTIONS = [
        {
            placeId: 'place_0',
            place: {
                id: 'place_0',
                name: 'Ristorante A',
                summary: ['Delicious pasta'],
                location: { lat: 35.6, lng: 139.7 }
            },
            interaction: {
                uid: 'test-user-001',
                placeId: 'place_0',
                isVisited: false,
                isSaved: true,
                evaluation: { type: 'good', timestamp: new Date() },
                updatedAt: new Date()
            }
        }
    ];

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

        // 2. MOCK FIREBASE INTERACTIONS FETCH
        // Need to mock API response for List View as we use List View for testing interactions
        await page.route('/api/places/search', async route => {
            await route.fulfill({
                json: {
                    places: [
                        {
                            id: 'place_0',
                            name: 'Ristorante A',
                            summary: ['Delicious pasta', 'Great atmosphere'],
                            axisScores: { taste: 4, service: 3, atmosphere: 4.8, cost: 3 },
                            originalRating: 3.5,
                            userRatingsTotal: 100,
                            location: { lat: 35.6, lng: 139.7 },
                            status: 'completed'
                        }
                    ],
                    nextPageToken: null
                }
            });
        });

        await page.goto('/');

        // Force Client Fetch
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('TEST_QUERY_FORCE_CLIENT_FETCH');
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('.grid > div').first()).toBeVisible({ timeout: 10000 });
    });

    // TM-04-07, 08, 09, 10, 11: Interactions
    test('TM-04-07~11: Visited & Memo Interactions', async ({ page }) => {
        // TM-04-07: Toggle Visited ON
        // "来店したらチェック" (Before click)
        const visitBtn = page.getByRole('button', { name: '来店' });

        // Initial: Not Visited
        await visitBtn.click();

        // TM-04-09: Memo Button Appears and Opens Modal
        const memoBtn = page.getByRole('button', { name: /メモ/ });
        await expect(memoBtn).toBeVisible();

        await memoBtn.click();

        // Checks Modal Content
        await expect(page.getByText('来店メモ')).toBeVisible();
        await expect(page.getByText('また行きたい？')).toBeVisible();

        // TM-04-10: Repeat Options
        const yesBtn = page.getByRole('button', { name: 'あり' });
        await yesBtn.click();

        // TM-04-11: Save
        await page.getByPlaceholder('美味しかったメニュー、雰囲気、混雑具合など...').fill('Test Memo Content');
        await page.getByRole('button', { name: '保存する' }).click();

        // Modal should close
        await expect(page.getByText('来店メモ')).not.toBeVisible();

        // Verify Content Updates in Card (Optimistic UI)
        await expect(page.getByText('Test Memo Content')).toBeVisible();
        await expect(page.getByText('リピート: あり')).toBeVisible();
    });
});
