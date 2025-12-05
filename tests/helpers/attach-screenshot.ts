import { test, Page, TestInfo, Locator } from '@playwright/test';

export async function attachScreenshot(name: string, page: Page, testInfo: TestInfo) {
    await testInfo.attach(name, {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    });
}

/**Ful page Screenshot */
async function takeFullPageScreenshot(page: Page, screenshotName: string) {
    const screenshot = await page.screenshot({ fullPage: true });
    // Attach it to the report
    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: "image/png",
    });
}

/**Element Screenshot */
async function takeElementScreenshot(element: Locator, screenshotName: string) {
    // Take screenshot of the element
    const screenshot = await element.screenshot();

    // Attach it to the report
    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: "image/png",
    });
}