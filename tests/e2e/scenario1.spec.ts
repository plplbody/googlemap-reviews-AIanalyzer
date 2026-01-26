import { test, expect } from '@playwright/test';

// --- Fixtures (FIX-S1-01) ---
const MOCK_PLACES_RES = {
    places: Array.from({ length: 40 }, (_, i) => ({
        id: `place_${i}`,
        name: i === 0 ? 'Ristorante A' : `Italian Place ${i}`,
        summary: i === 0 ? '静かな個室あり' : '美味しいパスタ',
        address: 'Tokyo, Minato',
        location: { lat: 35.6, lng: 139.7 },
        googleMapsUri: 'https://maps.google.com',
        // Place 0: Low Google (3.5), High AI (4.8)
        // Place 1: High Google (4.5), Low AI (3.0)
        originalRating: i === 0 ? 3.5 : (i === 1 ? 4.5 : 4.0),
        userRatingsTotal: 100,
        priceLevel: 'PRICE_LEVEL_EXPENSIVE',
        types: ['restaurant'],
        primaryType: 'restaurant',
        photos: [],
        trueScore: i === 0 ? 4.8 : (i === 1 ? 3.0 : 2.0),
        aiPreferences: {
            taste: 3.0,
            service: 3.0,
            atmosphere: i === 0 ? 4.8 : 3.0,
            cost: 3.0
        },
        status: 'completed'
    })),
    uuid: 'test-uuid'
};

test.describe('Scenario 1: 店舗検索メカニズム (TM-01, TM-02)', () => {

    test.beforeEach(async ({ page }) => {
        // Mock API Response
        await page.route('/api/places/search', async route => {
            const json = MOCK_PLACES_RES;
            await route.fulfill({ json });
        });
    });

    test('TM-01: Hero & Search Input Validation', async ({ page }) => {
        // TM-01-01: Hero Text
        await test.step('TM-01-01: Hero Display', async () => {
            await page.goto('/');
            await expect(page).toHaveTitle(/AI Concierge for グルメ/);
            await expect(page.getByText('AIグルメコンシェルジュ')).toBeVisible();
        });

        // TM-01-02: Normal Input
        const searchInput = page.getByRole('textbox', { name: '検索' });
        // Use form scoping to avoid matching Header buttons
        const submitBtn = page.locator('form button[type="submit"]');

        await test.step('TM-01-02: Normal Input', async () => {
            await searchInput.fill('表参道 イタリアン');
            await expect(searchInput).toHaveValue('表参道 イタリアン');
            await expect(submitBtn).toBeEnabled();
        });

        // TM-01-03: Empty Input -> Disabled
        await test.step('TM-01-03: Empty Input', async () => {
            await searchInput.fill('');
            await expect(submitBtn).toBeDisabled();
        });

        // TM-01-04: Symbols Only
        await test.step('TM-01-04: Symbols Only Validation', async () => {
            await searchInput.fill('!@#');
            // Assuming blur or submit triggers validation based on implementation
            // Since `SearchInput` in code validates onSubmit, we try click.
            // But verify if button is enabled? regex test(trimmed) in code allows symbols? 
            // Looking at code: `/[a-zA-Z0-9\u3040-\u309F...]/.test` -> !@# fails this.
            // But button is NOT disabled by this regex in `disabled={!query.trim()}`.
            // So button is enabled, but click triggers error state.
            await submitBtn.click();
            await expect(page.getByText('検索キーワードには文字を含めてください')).toBeVisible();
        });

        // TM-01-05: Length Limit
        await test.step('TM-01-05: Length Limit', async () => {
            const longText = 'あ'.repeat(101);
            await searchInput.fill(longText);
            await submitBtn.click();
            await expect(page.getByText('検索キーワードは100文字以内で入力してください')).toBeVisible();
        });
    });

    test('TM-02: List View, Filtering & Sorting', async ({ page }) => {
        // Setup state for list view
        await page.goto('/');
        const searchInput = page.getByRole('textbox', { name: '検索' });
        const submitBtn = page.locator('form button[type="submit"]');

        // TM-01-06: Search Execution & Loading
        await test.step('TM-01-06 / TM-02-01: Search & Loading', async () => {
            // Use a query that is guaranteed to return 0 results from the server
            // to force the Client Component to perform the fetch, which we can mock.
            const query = 'TEST_QUERY_FORCE_CLIENT_FETCH';
            await searchInput.fill(query);

            // Wait for API request
            const requestPromise = page.waitForRequest(req => req.url().includes('/api/places/search'));
            await submitBtn.click();

            // Verify Navigation happened (Client-side routing)
            await expect(page).toHaveURL(/view=LIST/);

            const request = await requestPromise;
            expect(request.postDataJSON().query).toBe(query);

            // TM-02-01: Result Appearance
            // Title check skipped
            await expect(page.getByText('Ristorante A')).toBeVisible();
        });

        // TM-02-05, 06: Sorting
        await test.step('TM-02-05/06: Sorting', async () => {
            const aiSortBtn = page.getByRole('button', { name: 'AI分析スコア' });
            const googleSortBtn = page.getByRole('button', { name: 'Google評価' });

            // Default: AI Score. Place 0 (4.8) > Place 1 (3.0)
            await expect(page.locator('.grid > div').first().locator('h3')).toHaveText('Ristorante A');

            // Toggle to Google
            await googleSortBtn.click();

            // Google Sort: Place 1 (4.5) > Place 0 (3.5)
            await expect(page.locator('.grid > div').first().locator('h3')).toHaveText('Italian Place 1');

            // Toggle back to AI
            await aiSortBtn.click();
            // Back to Place A
            await expect(page.locator('.grid > div').first().locator('h3')).toHaveText('Ristorante A');
        });

        // TM-02-07, 09, 10: Filtering
        await test.step('TM-02-09/10: Filter "Atmosphere"', async () => {
            // Open accordion if closed (Desktop default open? Code says `isOpen` state initial `false`? No, check code)
            // `PreferenceFilter.tsx` -> `useState(false)` initial? 
            // Wait, in `PreferenceFilter` code: `const [isOpen, setIsOpen] = useState(false);`
            // So we MUST open it first. TM-02-07
            const accordionHeader = page.getByText(/モード/); // "手動条件指定モード" etc
            await accordionHeader.click();

            // Click Atmosphere
            const atmoBtn = page.getByRole('button', { name: '雰囲気' });
            await atmoBtn.click();

            // Verify "Ristorante A" (Atmo 4.8) is first.
            // In our mock, Place 0 is named "Ristorante A".
            const firstCard = page.locator('.grid > div').first();
            const firstCardTitle = firstCard.locator('h3');
            await expect(firstCardTitle).toHaveText('Ristorante A');

            // Verify Score display (Score 4.8)
            await expect(firstCard).toContainText('4.8');
        });

        // TM-02-04: Home Reset
        await test.step('TM-02-04: Home Button', async () => {
            const homeBtn = page.getByText('ホーム');
            await homeBtn.click();

            // Should verify URL / and empty input
            await expect(page).toHaveURL('/');
            await expect(searchInput).toHaveValue('');
        });
    });

    test('TM-02-02: Empty Results State', async ({ page }) => {
        // Override mock for empty
        await page.route('/api/places/search', async route => {
            await route.fulfill({ json: { places: [], uuid: 'empty' } });
        });

        await page.goto('/');
        // Use a force-fetch query
        await page.getByRole('textbox', { name: '検索' }).fill('TEST_EMPTY_QUERY');

        // Wait for request to ensure we caught it
        const requestPromise = page.waitForRequest(req => req.url().includes('/api/places/search'));

        // Click search (use form submit)
        await page.locator('form button[type="submit"]').click();

        await requestPromise;

        // Expect Empty UI
        // Verify title is visible
        await expect(page.getByText('「TEST_EMPTY_QUERY」の検索結果')).toBeVisible();
        // Verify 0 items in grid
        await expect(page.locator('.grid > div')).toHaveCount(0);
    });
});
