import { expect, type Locator, type Page } from "@playwright/test";
import { log } from "../helpers/logger.js";

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /* All reusable actions */
    async navigateTo(path: string) {
        await log("info", `Navigating to the path: ${path}`);
        await this.page.goto(path);
    }

    /** Click action */
    async click(ele: Locator) {
        try {
            await expect(ele).toBeVisible({ timeout: 10_000 }); // Custom timeout: Default - 5 seconds
            await ele.click();
        } catch (error) {
            await log("error", `Failed to click element: ${ele.toString()}, original error: ${error}`);
            throw error;
        }
    }

    /** Type action */
    async typeInto(ele: Locator, text: string) {
        try {
            await expect(ele).toBeVisible({ timeout: 10_000 });
            await ele.fill(text);
        } catch (error) {
            await log("error", `Failed to type into element: ${ele.toString()}, original error: ${error}`);
            throw error;
        }
    }

    async selectDropdownByValue(dropdown: Locator, value: string) {
        try {
            await dropdown.selectOption({ value });
        } catch (error) {
            console.error(`Failed to select value "${value}" from dropdown. Error: ${error}`);
            throw error;
        }
    }


    /** URL Assertion */
    async assertURL(expected: string, contains = false) {
        try {
            if (contains) {
                await expect(this.page).toHaveURL(new RegExp(expected));
            } else {
                await expect(this.page).toHaveURL(expected);
            }
        } catch (error) {
            await log("error", `URL assertion failed. Expected: ${expected}, Error: ${error}`);
            throw error;
        }
    }


    /** Visible Assertion */
    async assertVisible(ele: Locator) {
        try {
            await expect(ele).toBeVisible({ timeout: 10_000 });
        } catch (error) {
            await log("error", `Element not visible: ${ele.toString()}, Error: ${error}`);
            throw error;
        }
    }

    /** Text Assertion */
    async assertText(ele: Locator, expected: string) {
        try {
            await expect(ele).toBeVisible({ timeout: 10_000 });
            await expect(ele).toHaveText(expected);
        } catch (error) {
            await log("error", `Text assertion failed for ${ele.toString()}. Expected: "${expected}", Error: ${error}`);
            throw error;
        }
    }


}
