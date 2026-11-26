import { Page } from '@playwright/test';
export class CartPage {

  constructor(private page: Page) {
  }
    async proceedToCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
}
    async removeProduct(product: string) {
      await this.page.locator('.cart_item_label').filter({ hasText: product }).getByRole('button', { name: 'Remove' }).click();
    }

}