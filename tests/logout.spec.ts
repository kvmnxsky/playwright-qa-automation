import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { users } from '../test-data/users';

test.beforeEach(async ({ page }) => {
    await login(page, users.standard.username, users.standard.password);
});

test('user is able to logout', async ({ page}) => {
    await page.getByRole('button', { name: 'Open Menu'}).click();
    await page.getByRole('button', { name: 'Logout'}).click();
    await expect(page).toHaveURL(/saucedemo\.com/);
    await expect(page.getByRole('button', { name: 'Login'})).toBeVisible();
});
