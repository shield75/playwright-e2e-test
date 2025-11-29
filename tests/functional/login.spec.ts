import { test, expect } from '@playwright/test';
import { attachScreenshot } from '../helpers/attach-screenshot';
import {log } from '../helpers/logger';

test.describe('Login Functionality',
    {
        annotation:
        {
            type: "Epic",
            description: "CURA Health Care Login Functionality",
        },
        tag: '@regression'
    }, () => {
        test.beforeEach('Navigate to the Login Page', async ({ page }, testInfo) => {
            const envConfig = testInfo.project.use as any;
            await log("log", `Automation environment : ${envConfig.envName}`);

            await log('info', `Navigating to the CURA Health Care Application`);
            await page.goto(envConfig.healthCareUrl);

            await page.getByRole('link', { name: 'Make Appointment' }).click();
            try {
                await log ('info', `Login page is displayed`);
                await expect(page.getByText('Please login to make')).toBeVisible();
            } catch (error) {
                await log('error', `Login page not displayed.`);
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
                await page.getByLabel('Username').fill(process.env.TEST_USERNAME);
                await log('info', `Entered username: ${process.env.TEST_USERNAME}`);
                await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);
                await log('info', `Entered password: ${process.env.TEST_PASSWORD}`);
                await page.getByRole('button', { name: 'Login' }).click();
                try {
                    await expect(page.locator('h2')).toContainText('Make Appointment');
                    await log('info', `Successfully logged in.`);
                } catch (error) {
                    await log('error', `Login failed.`);
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
                await page.getByLabel('Username').fill(process.env.INVALID_USERNAME);
                await page.getByLabel('Password').fill(process.env.INVALID_PASSWORD);
                await page.getByRole('button', { name: 'Login' }).click();
                try {
                    await log('info', `Validation message is displayed for invalid login.`);
                    await expect(page.locator('#login')).toContainText(
                        'Login failed! Please ensure the username and password are valid.'
                    );
                } catch (error) {
                    await log('error', `Error message not displayed for invalid login.`);
                    throw new Error('Error message not displayed for invalid login.');
                }
                await attachScreenshot('Failed Login', page, test.info());
            });
    });
