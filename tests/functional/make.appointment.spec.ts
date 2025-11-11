import { test, expect } from '@playwright/test';
import fs from 'fs';

const testData = JSON.parse(
    fs.readFileSync('data/appointment-data.json', 'utf-8')
);
test.describe('Make Appointment Functionality', () => {
    test.beforeEach(
        'Navigate to the Login Page and Login with Valid credentials',
        async ({ page }) => {
            await page.goto('https://katalon-demo-cura.herokuapp.com/');
            await page.getByRole('link', { name: 'Make Appointment' }).click();
            try {
                await expect(page.getByText('Please login to make')).toBeVisible();
            } catch (error) {
                throw new Error('Login page not displayed.');
            }
            await page.getByLabel('Username').fill('John Doe');
            await page.getByLabel('Password').fill('ThisIsNotAPassword');
            await page.getByRole('button', { name: 'Login' }).click();
            try {
                await expect(page.locator('h2')).toContainText('Make Appointment');
            } catch (error) {
                throw new Error('Login failed.');
            }
        }
    );

    test('Make appointment with valid data', async ({ page }) => {
        const randomFacility =
            testData.facilities[
            Math.floor(Math.random() * testData.facilities.length)
            ];
        await page.getByLabel('Facility').selectOption(randomFacility);

        await page
            .getByRole('checkbox', { name: 'Apply for hospital readmission' })
            .check();

        const randomProgram =
            testData.programs[Math.floor(Math.random() * testData.programs.length)];
        await page.getByRole('radio', { name: randomProgram }).check();

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are zero-based
        const yyyy = today.getFullYear();
        const currentDateFormatted = `${dd}/${mm}/${yyyy}`;

        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page
            .getByRole('textbox', { name: 'Visit Date (Required)' })
            .fill(currentDateFormatted);
        await page
            .getByRole('textbox', { name: 'Visit Date (Required)' })
            .press('Enter');

        const randomComment =
            testData.comments[Math.floor(Math.random() * testData.comments.length)];
        await page.getByRole('textbox', { name: 'Comment' }).fill(randomComment);

        await page.getByRole('button', { name: 'Book Appointment' }).click();
        await expect(
            page.getByRole('heading', { name: 'Appointment Confirmation' })
        ).toBeVisible();

        await expect(page.locator('#facility')).toContainText(randomFacility);
        await expect(page.locator('#hospital_readmission')).toContainText('Yes');
        await expect(page.locator('#program')).toContainText(randomProgram);
        await expect(page.locator('#visit_date')).toContainText(
            currentDateFormatted
        );
        await expect(page.locator('#comment')).toContainText(randomComment);
    });
});
