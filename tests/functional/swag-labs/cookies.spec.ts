import { test, expect } from '@playwright/test';
import { getData } from '../../helpers/data-helper';

test.describe('Swag Labs Checkout Tests', () => {
    {
        test('Checkout Functionality', async ({ page }, testInfo) => {

            const loginData = getData('swag-labs/login.json', 'username');
            const passwordData = getData('swag-labs/login.json', 'password');

            //Login to the application
            await page.goto('https://www.saucedemo.com/');
            await page.locator('#user-name').fill(loginData);
            await page.locator('#password').fill(passwordData);
            await page.locator('#login-button').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

            //store the cookies
            const cookies = await page.context().cookies();
            process.env.SWAG_LABS_COOKIES = JSON.stringify(cookies)
        });

        test("Should login directly using stored cookies", async ({ page }) => {
            // Access the stored cookies
            console.log(`>> Swag Labs cookies: ${process.env.SWAG_LABS_COOKIES}`);
            const swagLabsCookies = JSON.parse(process.env.SWAG_LABS_COOKIES || '[]');

            // Set the cookies in the browser context
            await page.context().addCookies(swagLabsCookies);

            // Navigate to the inventory page directly
            await page.goto('https://www.saucedemo.com/inventory.html');
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
}}); 