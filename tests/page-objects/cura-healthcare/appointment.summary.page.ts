import {expect, type Page} from "@playwright/test";
import BasePage from "../base.page.js";
import {log} from "../../helpers/logger.js";

export default class AppointmentSummaryPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getAppointmentConfrimationHeader() {
        return this.page.getByRole('heading', { name: 'Appointment Confirmation' });
    }

    getFacilityValue() {
        return this.page.locator('#facility');
    }

    getHospitalReadmissionValue() {
        return this.page.locator('#hospital_readmission');
    }

    getHealthcareProgramValue() {
        return this.page.locator('#program');
    }

    getVisitDateValue() {
        return this.page.locator('#visit_date');
    }

    getCommentValue() {
        return this.page.locator('#comment');
    }


   async appoinmentDetailesVerification(expectedFacility: string, expectedHospitalReadmission: boolean, expectedProgram: string, expectedVisitDate: string, expectedComment: string) {
        
        try {
            const hospitalReadmissionText = expectedHospitalReadmission ? 'Yes' : 'No';

            this.assertText(this.getFacilityValue(), expectedFacility);
            this.assertText(this.getHospitalReadmissionValue(), hospitalReadmissionText);
            this.assertText(this.getHealthcareProgramValue(), expectedProgram);
            this.assertText(this.getVisitDateValue(), expectedVisitDate);
            this.assertText(this.getCommentValue(), expectedComment);

            await log("info", `Appointment details verified successfully.`);
        } catch (error) {
            await log("error", `Appointment details verification failed. Error: ${error}`);
            throw error;
        }

    }




}