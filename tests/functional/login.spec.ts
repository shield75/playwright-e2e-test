import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
    test.beforeEach('Navigate to the Login Page', async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        try {
            await expect(page.getByText('Please login to make')).toBeVisible();
        } catch (error) {
            throw new Error('Login page not displayed.');
        }
    });

    test('Should login successfully with valid credentials', async ({ page }) => {
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        try {
            await expect(page.locator('h2')).toContainText('Make Appointment');
        } catch (error) {
            throw new Error('Login failed.');
        }
    });

    test('Should show error message with invalid credentials', async ({ page }) => {
        await page.getByLabel('Username').fill('Invalid User');
        await page.getByLabel('Password').fill('InvalidPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        try {
            await expect(page.locator('#login')).toContainText(
                'Login failed! Please ensure the username and password are valid.'
            );
        } catch (error) {
            throw new Error('Error message not displayed for invalid login.');
        }
    });
});
