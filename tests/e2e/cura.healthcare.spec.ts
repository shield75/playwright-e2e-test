import { test, expect } from '@playwright/test';
import { attachScreenshot } from '../helpers/attach-screenshot';
import { log } from '../helpers/logger';
import HomePage from '../page-objects/cura-healthcare/home.login.page';
import MakeAppointmentPage from '../page-objects/cura-healthcare/make.appointment.page';
import { getCurrentDateDDMMYYYY } from '../helpers/date-helper';
import { getRandomData } from '../helpers/data-helper';
import AppointmentSummaryPage from '../page-objects/cura-healthcare/appointment.summary.page';

let homePage: HomePage;
let makeAppointmentPage: MakeAppointmentPage;
let appointmentSummaryPage: AppointmentSummaryPage;
test.describe.serial('E2E CURA Health Care Website Automation',
    {
        annotation:
        {
            type: "Epic",
            description: "CURA Health Care Website Automation",
        },
        tag: '@e2e'
    }, () => {
        test('Navigate to the Login Page', async ({ page }, testInfo) => {
            const envConfig = testInfo.project.use as any;
            await log("log", `Automation environment : ${envConfig.envName}`);

            homePage = new HomePage(page);
            makeAppointmentPage = new MakeAppointmentPage(page);
            appointmentSummaryPage = new AppointmentSummaryPage(page);

            await log('info', `Navigating to the CURA Health Care Application`);
            await homePage.navigateTo(envConfig.healthCareUrl);

            await homePage.click(homePage.getMakeAppointmentButton());

            await homePage.assertURL("profile.php#login", true);
            await homePage.assertVisible(homePage.getLoginPageHeaderText());
        });

        test('Should login successfully with valid credentials',
            {
                annotation:
                {
                    type: "Story",
                    description: "Login with valid credentials"
                }
            }, async ({ page }) => {
                await homePage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
                try {
                    await makeAppointmentPage.assertURL("#appointment", true);
                    await makeAppointmentPage.assertText(makeAppointmentPage.getMakeAppointmentHeader(), 'Make Appointment');
                    await log('info', `Successfully logged in.`);
                } catch (error) {
                    await log('error', `Login failed.`);
                    throw new Error('Login failed.');
                }
                await attachScreenshot('Successful Login', page, test.info());
            });

        test('Make appointment with valid data',
            {
                annotation:
                {
                    type: "Story",
                    description: "Make appointment with valid data"
                }
            },
            async ({page}) => {
            const randomFacility = getRandomData('appointment-data.json', 'facilities')
            const hospitalReadmission = true;
            const randomProgram = getRandomData('appointment-data.json', 'programs')
            const getCurrentDate = getCurrentDateDDMMYYYY();
            const randomComment = getRandomData('appointment-data.json', 'comments')

            await makeAppointmentPage.bookAppointment(randomFacility, hospitalReadmission, randomProgram, getCurrentDate, randomComment);

            await appointmentSummaryPage.assertURL("appointment.php#summary", true);
            await log('info', `Appointment booked successfully.`);

            await appointmentSummaryPage.assertVisible(appointmentSummaryPage.getAppointmentConfrimationHeader());

            await appointmentSummaryPage.appoinmentDetailesVerification(randomFacility, hospitalReadmission, randomProgram, getCurrentDate, randomComment);

            await attachScreenshot('Appointment Confirmation', page, test.info());

        });
    });