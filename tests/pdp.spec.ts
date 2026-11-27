import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { users } from '../test-data/users';
import { products } from '../test-data/products';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach( async ({ page }) => {
    await login(page, users.standard.username, users.standard.password);
});

test('product details are displayed correctly', async ({ page }) => {
const inventoryPage = new InventoryPage(page);
    await inventoryPage.openProductDetails(products.backpack.name);
    await expect(page).toHaveURL(/inventory-item.html\?id=/);
    await expect(page.getByText(products.backpack.name)).toBeVisible();
    await expect(page.getByText(products.backpack.price)).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
});
test('back button behavior is correct', async ({ page }) => {
const inventoryPage = new InventoryPage(page);
    await inventoryPage.openProductDetails(products.backpack.name);
    await expect(page).toHaveURL(/inventory-item.html\?id=/);
    await page.getByRole('button', { name: 'Back to products'}).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText(products.backpack.name)).toBeVisible();
});
