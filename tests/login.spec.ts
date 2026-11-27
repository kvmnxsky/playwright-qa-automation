import { test, expect } from '@playwright/test';
import { users } from '../test-data/users';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('standard user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.enterUsername(users.standard.username);
  await loginPage.enterPassword(users.standard.password);
  await loginPage.clickLogin();
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});
test('locked out user cannot login', async ({ page }) => {
 const loginPage = new LoginPage(page);
  await loginPage.enterUsername(users.locked.username);
  await loginPage.enterPassword(users.locked.password);
  await loginPage.clickLogin();
  await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});
