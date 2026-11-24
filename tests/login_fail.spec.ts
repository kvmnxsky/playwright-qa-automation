import { test, expect } from '@playwright/test';
test('user cannot log in with an incorrect password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();

 const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toContainText(
    'Username and password do not match'
  );
});