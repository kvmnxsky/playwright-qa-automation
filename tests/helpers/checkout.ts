import { Page } from "@playwright/test";
export async function checkout(page: Page, firstName: string, lastName: string, zipCode: string) {
    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    await page.getByPlaceholder('Zip/Postal Code').fill(zipCode);
    await page.getByRole('button', { name: 'Continue' }).click();

}