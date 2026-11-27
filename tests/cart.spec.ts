import { test, expect} from '@playwright/test';
import { login } from './helpers/login';
import { users } from '../test-data/users'
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { products } from '../test-data/products';



test.describe('Shopping Cart', () => {

test.beforeEach(async ({ page }) => {
     await login(page, users.standard.username, users.standard.password);
 
});
test('user can add a product to the cart', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(products.bikeLight.name);
    await inventoryPage.openCart();
    await expect(page.getByText(products.bikeLight.name)).toBeVisible();
});

test('user can remove a product from the cart', async ({ page }) => {
   await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.getByText(products.backpack.name)).toBeVisible();

    await page.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByText(products.backpack.name)).not.toBeVisible();
}); 
test('user can add 2 products to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(products.bikeLight.name);
    await inventoryPage.addProductToCart(products.backpack.name);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')
    await inventoryPage.openCart();
    await expect(page.getByText(products.bikeLight.name)).toBeVisible();
    await expect(page.getByText(products.backpack.name)).toBeVisible();
});
test('user can remove 1 item from the cart', async ({ page }) => {
const inventoryPage = new InventoryPage(page);
const cartPage = new CartPage(page);
    await inventoryPage.addProductToCart(products.bikeLight.name);
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.removeProduct(products.bikeLight.name)
    await expect(page.getByText(products.bikeLight.name)).toBeHidden();
    await expect(page.getByText(products.backpack.name)).toBeVisible();
});
test('cart persistence check', async ({ page }) => {
const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openProductDetails(products.bikeLight.name);
    await page.getByRole('button', { name: 'Back to products'}).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});
test('reset app state', async ({ page }) => {
const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(products.backpack.name);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await inventoryPage.openHamburgerMenu();
    await page.getByRole('link', { name: 'Reset App State' }).click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
});
});