import {test, expect} from '@playwright/test';
import {login} from './helpers/login';
import {checkout} from './helpers/checkout';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce');

});
test.describe('Checkout validation', () => {

const checkoutCases = [
  {
    field: 'First Name',
    firstName: '',
    lastName: 'Kaminski',
    postalCode: '12345',
    error: 'Error: First Name is required'
  },
  {
    field: 'Last Name',
    firstName: 'Tomasz',
    lastName: '',
    postalCode: '12345',
    error: 'Error: Last Name is required'
  },
  {
    field: 'Postal Code',
    firstName: 'Tomasz',
    lastName: 'Kaminski',
    postalCode: '',
    error: 'Error: Postal Code is required'
  }
];

for (const testCase of checkoutCases) {

  test(`checkout validation: ${testCase.field}`, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation(
        testCase.firstName,
        testCase.lastName,
        testCase.postalCode
    );
    await checkoutPage.continue();
    await expect(checkoutPage.getErrorMessage()).toHaveText(testCase.error);
  });

}
});
test('Checkout E2E process', async ({ page }) => {
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
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
});