import { test, expect } from '@playwright/test';

test('la page d\'accueil s\'affiche', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.locator('header').getByText('StockiFlow')).toBeVisible();
});