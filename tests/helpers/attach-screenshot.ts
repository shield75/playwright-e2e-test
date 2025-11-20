import { Page, TestInfo } from '@playwright/test';

export async function attachScreenshot(name: string, page: Page, testInfo: TestInfo) {
    await testInfo.attach(name, {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    });
}
