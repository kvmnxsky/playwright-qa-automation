import { Page, Locator } from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {
  }
  async enterUsername(username: string) {
    await this.page.getByPlaceholder('Username').fill(username);
  }
  async enterPassword(password: string) {
    await this.page.getByPlaceholder('Password').fill(password);
  }
  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click(); 
  }
getErrorMessage(): Locator {
              return this.page.locator('[data-test="error"]');

  }}