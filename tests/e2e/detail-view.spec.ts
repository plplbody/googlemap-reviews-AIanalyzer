import { test, expect } from '@playwright/test';

// U-04: Detail View
// SEC-01: XSS Vulnerability Check
test.describe('U-04 & SEC-01: Detail View & Security', () => {

    const MOCK_XSS_PLACE = {
        id: 'place_xss',
        name: 'XSS Restaurant <script>window.XSS_TEST=true</script>',
        summary: ['<b>Safe Bold</b>', '<img src=x onerror=alert(1)>'], // Array of strings for summary
        axisScores: { taste: 3, service: 3, atmosphere: 3, cost: 3 },
        originalRating: 4.0,
        userRatingsTotal: 50,
        location: { lat: 35.6, lng: 139.7 },
        status: 'completed',
        // Mocking structure for detail view
        reviews: [],
        images: []
    };

    test.beforeEach(async ({ page }) => {
        // Navigate to List View
        await page.goto('/');
        const input = page.getByRole('textbox', { name: '検索' });
        await input.fill('Mock Search');
        await page.locator('button[type="submit"]').click();

        // Wait for list to render
        await expect(page.locator('.grid > div').first()).toBeVisible();
    });

    // U-04: Detail View Rendering
    // U-04: Detail View Rendering
    test.fixme('U-04: Open Detail View and Verify Content', async ({ page }) => {
        // Click the first card (Mock Ristorante A)
        // Using text selector to be sure we are clicking the right item
        const card = page.getByText('Mock Ristorante A');
        await expect(card).toBeVisible();
        await card.click();

        // Check URL/View State
        await expect(page).toHaveURL(/view=DETAIL/);

        // Verify Content
        const backButton = page.getByRole('button', { name: /戻る|Back/ });
        await expect(backButton).toBeVisible();

        // Verify Radar Chart
        await expect(page.locator('canvas')).toBeVisible();
    });

    // SEC-01: XSS Check
    test.fixme('SEC-01: Verify XSS Prevention in Place Name and Summary', async ({ page }) => {
        // 1. Select the specific XSS Place from the list
        // Using partial text match "XSS Restaurant" which works even if browser escapes script
        const xssCard = page.getByText('XSS Restaurant', { exact: false }).first();

        await expect(xssCard).toBeVisible();
        await xssCard.click();

        // 2. Check Name XSS inside Detail View
        // If safe, the script tag is escaped and rendered as text.
        // So we EXPECT to see the script text literally.
        await expect(page.getByText('<script>window.XSS_TEST=true</script>')).toBeVisible();

        // Also verify window.XSS_TEST is undefined (script didn't execute)
        const xssProp = await page.evaluate(() => (window as any).XSS_TEST);
        expect(xssProp).toBeUndefined();

        // 3. Check Summary XSS
        // MockFetcher summary includes '<img src=x onerror=alert(1)>'
        await expect(page.getByText('<img src=x onerror=alert(1)>')).toBeVisible();
    });
});
