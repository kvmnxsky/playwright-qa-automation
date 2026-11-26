import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { login } from './helpers/login';
import { users } from '../test-data/users';

test('products sorting is functional', async ({ page }) => {
    await login(page, users.standard.username, users.standard.password);


    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText('Sauce Labs Onesie'); 
const prices = 
    await page.locator('[data-test="inventory-item-price"]').allTextContents();
const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
const sortedPrices = [...numericPrices].sort((a, b) => a - b);
expect(numericPrices).toEqual(sortedPrices);
});