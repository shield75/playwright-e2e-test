import { test, expect } from '@playwright/test';

test('Should load home page with corrrect title', async ({ page }) => {
  //Go to home page
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  //Assert the title
  await expect(page).toHaveTitle('CURA Healthcare Service');

  //Assert the header text
  await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');
});
