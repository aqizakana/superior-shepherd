import { test, expect } from '@playwright/test';

test.describe('Index page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should have correct title', async ({ page }) => {
        await expect(page).toHaveTitle('ホームページ');
    });

    test('should display greeting messages', async ({ page }) => {
        const greetingElement = page.locator('text=Hej');
        await expect(greetingElement).toBeVisible();
    });

    test('should show alert with greeting when button is clicked', async ({ page }) => {
        const button = page.locator('button:has-text("Get greeting")');

        // Setup dialog handler
        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toContain('Hello');
            await dialog.accept();
        });

        await button.click();

        // Wait for the console log
        await expect(page.locator('body')).toHaveScreenshot('after-greeting-click.png');
    });

    test('should handle newsletter signup', async ({ page }) => {
        const emailInput = page.locator('input[type="email"]');
        const submitButton = page.locator('button:has-text("Subscribe")');

        await emailInput.fill('test@example.com');
        await submitButton.click();

        // Check for success or error message
        const message = page.locator('p.error');
        if (await message.isVisible()) {
            await expect(message).toHaveText('Unable to sign up. Please try again later.');
        } else {
            // Add an assertion for successful signup if there's a success message in your actual implementation
        }
    });

    test('should prefetch and navigate to /dog/clifford when button is clicked', async ({ page }) => {
        const button = page.locator('button:has-text("Click me")');

        await Promise.all([
            page.waitForNavigation(),
            button.click()
        ]);

        expect(page.url()).toContain('/dog/clifford');
    });
});