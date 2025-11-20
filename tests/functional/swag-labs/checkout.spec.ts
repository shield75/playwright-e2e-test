import { test, expect } from '@playwright/test';
import { addAllureMetadata } from '../../helpers/allure-defaults';
import { getData } from '../../helpers/data-helper';

test.describe('Swag Labs Checkout Tests', () => {
    {
        test('Checkout Functionality', async ({ page }, testInfo) => {

            // Push test-specific metadata (optional)
            addAllureMetadata({
                severity: 'critical',
                epic: 'Shopping Cart',
                feature: 'Checkout Flow',
                story: 'Successful Checkout',
                tags: ['Smoke', 'Regression', 'Checkout', 'Swag Labs']
            });

            const loginData = getData('swag-labs/login.json', 'username');
            const passwordData = getData('swag-labs/login.json', 'password');

            //Login to the application
            await page.goto('https://www.saucedemo.com/');
            await page.locator('#user-name').fill(loginData);
            await page.locator('#password').fill(passwordData);
            await page.locator('#login-button').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

            //Add first item to the cart
            let products = page.locator('.inventory_item_name');
            let firstProductName = await products.first().innerText();
            await products.first().click();
            await page.locator('[data-test="add-to-cart"]').click();

            //Go to the cart
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
            await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(firstProductName);

            //Proceed to checkout
            await page.locator('[data-test="checkout"]').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

            //Fill checkout information
            await page.locator('[data-test="firstName"]').fill(getData('swag-labs/checkout-data.json', 'firstName'));
            await page.locator('[data-test="lastName"]').fill(getData('swag-labs/checkout-data.json', 'lastName'));
            await page.locator('[data-test="postalCode"]').fill(getData('swag-labs/checkout-data.json', 'postalCode'));

            //Continue to next step
            await page.locator('[data-test="continue"]').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

            //Finish checkout
            await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(firstProductName);
            await page.locator('[data-test="finish"]').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
            await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
            await expect(page.locator('.complete-header')).toContainText('Thank you for your order!')
        });

        test('Critical failure example', async () => {
            throw new Error('critical: checkout failed');
        });
    }
});


