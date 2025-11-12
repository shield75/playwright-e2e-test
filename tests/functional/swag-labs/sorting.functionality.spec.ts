import { test, expect } from "@playwright/test";
import { assertSortingOrder } from "../../helpers/sorting-helper";

test.describe("Sorting Functionality on Swag Labs", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });

    test("Should sor porducts by name A to Z", async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('az');
        let productNames: string[] = await page.locator('.inventory_item_name').allTextContents();
        await assertSortingOrder<string>(productNames, 'asc');
    });

    test("Should sort products by name Z to A", async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('za');
        let productNames: string[] = await page.locator('.inventory_item_name').allTextContents();
        await assertSortingOrder<string>(productNames, 'desc');
    });

    test("Should sort products by price low to high", async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        let priceValues : number[] = await page.locator('.inventory_item_price').allTextContents().then(texts => {
            return texts
                .map(p => p.replace(/\$/g, '').replace(/,/g, '').trim())
                .map(p => parseFloat(p))
                .filter(n => !Number.isNaN(n));
        });
        await assertSortingOrder<number>(priceValues, 'asc');
    });

    test("Should sort products by price high to low", async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
        let priceValues : number[] = await page.locator('.inventory_item_price').allTextContents().then(texts => {
            return texts
                .map(p => p.replace(/\$/g, '').replace(/,/g, '').trim())
                .map(p => parseFloat(p))
                .filter(n => !Number.isNaN(n));
        });
        await assertSortingOrder<number>(priceValues, 'desc');
    });

});