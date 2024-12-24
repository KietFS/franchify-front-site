import { test, expect } from '@playwright/test';

test('homepage has title and links to about page', async ({ page }) => {
  // Go to the homepage
   await page.goto('http://localhost:3000/');

    // Check that the title is correct
    // const title = page.locator('title');
    // await expect(title).toHaveText('tea-market.vercel.app');

});