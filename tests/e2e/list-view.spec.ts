import { test, expect } from '@playwright/test';

// TM-02: List View & Filtering
// Ref: docs/test_matrix.md
test.describe('TM-02: List View & Filtering', () => {

    const MOCK_PLACES_RES = {
        places: [
            {
                id: 'place_0',
                name: 'Ristorante A', // AI Score Winner
                summary: ['Delicious pasta', 'Great atmosphere'],
                axisScores: { taste: 4, service: 3, atmosphere: 4.8, cost: 3 }, // Atmosphere High
                originalRating: 3.5, // Google Low
                userRatingsTotal: 100,
                location: { lat: 35.6, lng: 139.7 },
                status: 'completed'
            },
            {
                id: 'place_1',
                name: 'Italian Place 1', // Google Score Winner
                summary: ['Good pizza'],
                axisScores: { taste: 3, service: 3, atmosphere: 2.0, cost: 3 }, // Atmosphere Low
                originalRating: 4.5, // Google High
                userRatingsTotal: 200,
                location: { lat: 35.61, lng: 139.71 },
                status: 'completed'
            }
        ],
        nextPageToken: null
    };

    test.beforeEach(async ({ page }) => {
        // Mock API
        await page.route('/api/places/search', async route => {
            await route.fulfill({ json: MOCK_PLACES_RES });
        });

        // Go to search result page directly to test List View
        // Or perform search. Performing search is safer to ensure state.
        await page.goto('/');

        // Trigger Client Fetch using special query
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('TEST_QUERY_FORCE_CLIENT_FETCH');
        await page.locator('button[type="submit"]').click();

        // Wait for results
        await expect(page.locator('.grid > div').first()).toBeVisible({ timeout: 10000 });
    });

    // TM-02-05, 06: Sort
    test('TM-02-05/06: Sorting Logic', async ({ page }) => {
        const aiSortBtn = page.getByRole('button', { name: 'AI分析スコア' });
        const googleSortBtn = page.getByRole('button', { name: 'Google評価' });

        // Initial: AI Order
        await expect(page.locator('.grid > div').first().locator('h3')).toHaveText('Ristorante A');

        // Switch to Google
        await googleSortBtn.click();
        await expect(page.locator('.grid > div').first().locator('h3')).toHaveText('Italian Place 1');

        // Switch back
        await aiSortBtn.click();
        await expect(page.locator('.grid > div').first().locator('h3')).toHaveText('Ristorante A');
    });

    // TM-02-07, 10, 11: Filter Interaction (Manual)
    test('TM-02-07/10/11: Manual Filter Interaction', async ({ page }) => {
        // TM-02-07: Open Accordion
        const accordionHeader = page.getByText(/モード/);
        await accordionHeader.click();

        // TM-02-10: Toggle "Atmosphere" ON
        const atmoBtn = page.getByRole('button', { name: '雰囲気' });
        await atmoBtn.click();

        // Check Sort (Ristorante A is high atmosphere)
        await expect(page.locator('.grid > div').first().locator('h3')).toHaveText('Ristorante A');
        // Visual check for active state? (Class check is brittle, relying on behavior)

        // TM-02-11: Toggle OFF
        await atmoBtn.click();
        // Should revert or stay same? (If uncheck, default sort applies, which is AI Score, so result same.
        // But implementation might shift weighting.
        // Main check is that it is clickable and doesn't crash.)
    });

    // TM-02-08: Manual -> Auto (Login Req)
    test('TM-02-08: Manual to Auto Mode (Login Required)', async ({ page }) => {
        const accordionHeader = page.getByText(/モード/);
        await accordionHeader.click();

        const autoTab = page.getByRole('button', { name: /自動反映/ }); // "ログインして傾向を自動反映"

        // Setup Dialog/Alert listener
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('ログイン');
            await dialog.dismiss();
        });

        await autoTab.click();
    });

    // TM-02-09: Auto -> Manual (Logged In State)
    test('TM-02-09: Auto to Manual Mode (Switching)', async ({ page }) => {
        // 1. INJECT MOCK USER
        await page.addInitScript(() => {
            localStorage.setItem('E2E_TEST_SESSION', JSON.stringify({
                uid: 'test-user-001',
                displayName: 'Test User',
                email: 'test@example.com',
                photoURL: null
            }));
        });

        // Reload to apply mock session
        await page.reload();

        // Trigger Client Fetch using special query
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('TEST_QUERY_FORCE_CLIENT_FETCH');
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('.grid > div').first()).toBeVisible();

        // 2. Open Accordion
        const accordionHeader = page.getByText(/モード/);
        await accordionHeader.click();

        // 3. Verify Initial State is likely Manual (Default) OR if User Prefs exist, maybe Auto?
        // But App defaults to Manual usually unless persisted.
        // Let's click Auto first to Enable it (should NOT ask for login now)
        const autoTab = page.getByRole('button', { name: /傾向を自動反映/ }); // Different label if logged in?
        await autoTab.click();

        // Verify Auto View Visible (Radar Chart etc)
        await expect(page.getByText('AIタグ')).toBeVisible(); // AutoView has AI Tags

        // 4. TM-02-09: Click "Manual Selection"
        const manualTab = page.getByRole('button', { name: '手動選択' });
        await manualTab.click();

        // Verify Manual View Visible (Axis Options)
        await expect(page.getByText('重視するポイント')).toBeVisible(); // ManualView has specific title
    });
});
