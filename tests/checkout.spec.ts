import {test, expect} from '@playwright/test';
import {login} from './helpers/login';
import {checkout} from './helpers/checkout';

test('Checkout E2E process', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();
    await checkout(page, 'John', 'Smith', '12345');
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await page.getByRole('button', {name: 'Finish'}).click();
    await expect(page.locator('[data-test="checkout-complete-container"]')).toBeVisible();







}) 