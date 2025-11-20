import { test, expect } from '@playwright/test';
import {attachScreenshot} from '../helpers/attach-screenshot';

test.describe('Login Functionality',
    {
        annotation:
        {
            type: "Epic",
            description: "CURA Health Care Login Functionality",
        },
        tag: '@regression'
    }, () => {
        test.beforeEach('Navigate to the Login Page', async ({ page }) => {
            await page.goto('https://katalon-demo-cura.herokuapp.com/');
            await page.getByRole('link', { name: 'Make Appointment' }).click();
            try {
                await expect(page.getByText('Please login to make')).toBeVisible();
            } catch (error) {
                throw new Error('Login page not displayed.');
            }
        });

        test('Should login successfully with valid credentials',
            {
                annotation:
                {
                    type: "Story",
                    description: "Login with valid credentials"
                },
                tag: '@smoke'
            }, async ({ page }) => {
                await page.getByLabel('Username').fill('John Doe');
                await page.getByLabel('Password').fill('ThisIsNotAPassword');
                await page.getByRole('button', { name: 'Login' }).click();
                try {
                    await expect(page.locator('h2')).toContainText('Make Appointment');
                } catch (error) {
                    throw new Error('Login failed.');
                }
                await attachScreenshot('Successful Login', page, test.info());
            });

        test('Should show error message with invalid credentials',
            {
                annotation:
                {
                    type: "Story",
                    description: "Login with invalid credentials"
                },
                tag: '@smoke'
            }, async ({ page }) => {
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
                await attachScreenshot('Failed Login', page, test.info());
            });
    });
