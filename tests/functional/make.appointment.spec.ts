import { test, expect } from '@playwright/test';
import { getCurrentDateDDMMYYYY } from '../helpers/date-helper';
import { getRandomData } from '../helpers/data-helper';


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
        const randomFacility = getRandomData('appointment-data.json', 'facilities')
        const randomProgram = getRandomData('appointment-data.json', 'programs')
        const getCurrentDate = getCurrentDateDDMMYYYY();
        const randomComment = getRandomData('appointment-data.json', 'comments')

        //Select random facility
        await page.getByLabel('Facility').selectOption(randomFacility);

        //Check the checkbox
        await page
            .getByRole('checkbox', { name: 'Apply for hospital readmission' })
            .check();

        //Select a random healthcare program
        await page.getByRole('radio', { name: randomProgram }).check();

        //Set visit date
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page
            .getByRole('textbox', { name: 'Visit Date (Required)' })
            .fill(getCurrentDate);
        await page
            .getByRole('textbox', { name: 'Visit Date (Required)' })
            .press('Enter');

        //Fill comment    
        await page.getByRole('textbox', { name: 'Comment' }).fill(randomComment);

        await page.getByRole('button', { name: 'Book Appointment' }).click();
        try {
            await expect(
                page.getByRole('heading', { name: 'Appointment Confirmation' })
            ).toBeVisible();
        } catch (error) {
            throw new Error('Appointment confirmation page not displayed.');
        }
        try {
            await expect(page.locator('#facility')).toContainText(randomFacility);
            await expect(page.locator('#hospital_readmission')).toContainText('Yes');
            await expect(page.locator('#program')).toContainText(randomProgram);
            await expect(page.locator('#visit_date')).toContainText(
                getCurrentDate
            );
            await expect(page.locator('#comment')).toContainText(randomComment);
        } catch (error) {
            throw new Error('Appointment details do not match the input data.');
        }
    });
});
