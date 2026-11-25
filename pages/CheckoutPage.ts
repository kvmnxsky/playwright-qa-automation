import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    constructor (private page: Page){}
        async fillCheckoutInformation(
            firstName: string, 
            lastName: string, 
            postalCode: string
        ){
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode); 
        }
        async continue(){
        await this.page.getByRole('button', { name: 'Continue' }).click()
        }
        getErrorMessage(): Locator {
            return this.page.locator('[data-test="error"]');
        }

}
