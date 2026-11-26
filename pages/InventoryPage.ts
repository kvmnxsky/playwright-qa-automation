import { Page } from '@playwright/test';

export class InventoryPage {

  constructor(private page: Page) {
  }
    async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }
    async addProductToCart(product: string) {
      await this.page.locator('.inventory_item').filter({ hasText: product }).getByRole('button', { name: 'Add to cart' }).click();
    }
  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
  
  
  }

