import { test, expect} from '@playwright/test';
import { login } from './helpers/login';

test.describe('Shopping Cart', () => {
test.beforeEach(async ({ page }) => {
     await login(page, 'standard_user', 'secret_sauce'); 
});
test('user can add a product to the cart', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});

test('user can remove a product from the cart', async ({ page }) => {
   await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
}); 
});