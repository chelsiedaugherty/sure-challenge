import { test, expect } from '@playwright/test'; 

const url = 'https://sure-qa-challenge.vercel.app/';
const validZipCode = '12345';
const invalidZipCode = 'ABCDE';

test.describe('View Hurricane Insurance Plans', () => {
    test('should provide Hurricane Insurance Quotes to user', async ({ page }) => {
        // Navigate to Hurrican Insurance URL
        await page.goto(url);
        await expect(page.getByRole('heading', { name: 'Hurricane Insurance' })).toBeVisible();

        // Enter valid zip code
        await page.fill('input[name="postalCode"]', validZipCode);

        // Click on Get a Quote button
        await page.getByRole('button', { name: 'Get a Quote' }).click();

        // Verify Building Materials page loaded
        await expect(page.getByRole('heading', { name: 'What type of material is your home constructed with?' })).toBeVisible();

        // Select building material
        await page.getByRole('radio', {name: 'Sticks'}).click();

        // Click on Next button
        await page.getByRole('button', { name: 'Next' }).click();

        // Verify Water Proximity page loaded
        await expect(page.getByRole('heading', { name: 'Is your home located within 1 mile of a body of water?' })).toBeVisible();
   
        // Select water proximity
        await page.getByRole('radio', {name: 'Yes'}).click();

        // Click on Next button
        await page.getByRole('button', { name: 'Next' }).click();

        // Verify Quotes page loads and you see Standard & Complete plans on Quotes page
        await expect(page.getByRole('heading', { name: 'Your available plans' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Standard' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Complete' })).toBeVisible();

        // Verify you can see an enabled, unchecked checkbox & Include Flood Protection label
        await expect(page.getByRole('checkbox', { name: 'Include Flood Protection (+$176)'})).toBeVisible();

        // Check the Include Flood Protection checkbox
        await page.getByRole('checkbox', { name: 'Include Flood Protection (+$176)'}).click();

        // Close Page
        await page.close();
    });

    test('should show invalid zip code message on landing page if entered text is not 5-digit numbers', async ({ page }) => {
        // Navigate to Hurrican Insurance URL
        await page.goto(url);
        await expect(page.getByRole('heading', { name: 'Hurricane Insurance' })).toBeVisible();

        // Enter invalid zip code
        await page.fill('input[name="postalCode"]', invalidZipCode);

        // Verify invalid zip code message appears
        await expect(page.getByText('Invalid zip code')).toBeVisible();

        // Close Page
        await page.close();
    });

    test('should show required message on landing page when no zip code is entered', async ({ page }) => {
        // Navigate to Hurrican Insurance URL
        await page.goto(url);
        await expect(page.getByRole('heading', { name: 'Hurricane Insurance' })).toBeVisible();

        // Click on Get a Quote button
        await page.getByRole('button', { name: 'Get a Quote' }).click();

        // Verify required message appears
        await expect(page.getByText('Required')).toBeVisible();

        // Close Page
        await page.close();
    });

});