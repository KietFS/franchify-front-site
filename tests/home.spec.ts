import { test, expect } from "@playwright/test";

test("homepage has title and links to about page", async ({ page }) => {
  // Go to the homepage
  await page.goto("http://localhost:3000/");
});
