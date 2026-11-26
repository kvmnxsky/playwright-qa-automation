import { test, expect} from '@playwright/test';
import { login } from './helpers/login';
import { users } from '../test-data/users'
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';



test.describe('Shopping Cart', () => {
    const products = {
        bike:'Sauce Labs Bike Light',
        backpack: 'Sauce Labs Backpack'
    };
test.beforeEach(async ({ page }) => {
     await login(page, users.standard.username, users.standard.password);
 
});
test('user can add a product to the cart', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(products.bike);
    await inventoryPage.openCart();
    await expect(page.getByText(products.bike)).toBeVisible();
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
test('user can add 2 products to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(products.bike);
    await inventoryPage.addProductToCart(products.backpack);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')
    await inventoryPage.openCart();
    await expect(page.getByText(products.bike)).toBeVisible();
    await expect(page.getByText(products.backpack)).toBeVisible();
});
test('user can remove 1 item from the cart', async ({ page }) => {
const inventoryPage = new InventoryPage(page);
const cartPage = new CartPage(page);
    await inventoryPage.addProductToCart(products.bike);
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.removeProduct(products.bike)
    await expect(page.getByText(products.bike)).toBeHidden();
    await expect(page.getByText(products.backpack)).toBeVisible();
});
});