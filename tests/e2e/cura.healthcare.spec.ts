import { test, BrowserContext, Page } from '@playwright/test';
import { attachScreenshot } from '../helpers/attach-screenshot';
import { log } from '../helpers/logger';
import HomePage from '../page-objects/cura-healthcare/home.login.page';
import MakeAppointmentPage from '../page-objects/cura-healthcare/make.appointment.page';
import AppointmentSummaryPage from '../page-objects/cura-healthcare/appointment.summary.page';
import { getCurrentDateDDMMYYYY } from '../helpers/date-helper';
import { getRandomData } from '../helpers/data-helper';

test.describe.serial('E2E CURA Health Care Website Automation', () => {
    let context: BrowserContext;
    let page: Page;
    let homePage: HomePage;
    let makeAppointmentPage: MakeAppointmentPage;
    let appointmentSummaryPage: AppointmentSummaryPage;
    let envConfig: any;

    test.beforeAll(async ({ browser }, testInfo) => {
        // Get environment config
        envConfig = testInfo.project.use as any;

        context = await browser.newContext();
        page = await context.newPage();

        homePage = new HomePage(page);
        makeAppointmentPage = new MakeAppointmentPage(page);
        appointmentSummaryPage = new AppointmentSummaryPage(page);
    });

    test('Navigate to the Login Page', async () => {
        await log("log", `Automation environment : ${envConfig.envName}`);
        await log('info', `Navigating to the CURA Health Care Application`);
        await homePage.navigateTo(envConfig.healthCareUrl); // <-- dynamic from env config
        await homePage.click(homePage.getMakeAppointmentButton());
        await homePage.assertURL("profile.php#login", true);
        await homePage.assertVisible(homePage.getLoginPageHeaderText());
    });

    test('Login with valid credentials', async () => {
        await homePage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
        await makeAppointmentPage.assertURL("#appointment", true);
        await makeAppointmentPage.assertText(makeAppointmentPage.getMakeAppointmentHeader(), 'Make Appointment');
        await log('info', `Successfully logged in.`);
    });

    test('Make appointment with valid data', async () => {
        const randomFacility = getRandomData('appointment-data.json', 'facilities');
        const hospitalReadmission = true;
        const randomProgram = getRandomData('appointment-data.json', 'programs');
        const getCurrentDate = getCurrentDateDDMMYYYY();
        const randomComment = getRandomData('appointment-data.json', 'comments');

        await makeAppointmentPage.bookAppointment(randomFacility, hospitalReadmission, randomProgram, getCurrentDate, randomComment);

        await appointmentSummaryPage.assertURL("appointment.php#summary", true);
        await log('info', `Appointment booked successfully.`);
        
        await appointmentSummaryPage.assertVisible(appointmentSummaryPage.getAppointmentConfrimationHeader());
        await appointmentSummaryPage.appoinmentDetailesVerification(randomFacility, hospitalReadmission, randomProgram, getCurrentDate, randomComment);

        await attachScreenshot('Appointment Confirmation', page, test.info());
    });

    test.afterAll(async () => {
        await context.close();
    });
});
