import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('standard user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  // Public SauceDemo credentials only. For real accounts, use local .env variables
  // and GitHub Actions secrets in CI; never commit private credentials.
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});
