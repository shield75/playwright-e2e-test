import {expect, type Page} from "@playwright/test";
import BasePage from "../base.page.js";
import {log} from "../../helpers/logger.js";

export default class MakeAppointmentPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getMakeAppointmentHeader() {
        return this.page.locator('h2');
    }

    getFacilityDropdown() {
        return this.page.getByLabel('Facility');
    }

    getHospitalReadmissionCheckbox() {
        return this.page.getByLabel('Apply for hospital readmission');
    }
    
    getHealthcareProgramRadio(program: string) {
        return this.page.getByRole('radio', { name: program });
    }

    getVisitDateInput() {
        return this.page.getByRole('textbox', { name: 'Visit Date (Required)' });
    }

    getCommentInput() {
        return this.page.getByRole('textbox', { name: 'Comment' });
    }

    getBookAppointmentButton() {
        return this.page.getByRole('button', { name: 'Book Appointment' });
    }

    async bookAppointment(facility: string, applyHospitalReadmission: boolean, healthcareProgram: string, visitDate: string, comment: string) {
    
        await log("info", `Selecting facility: ${facility}`);
        await this.typeInto(this.getFacilityDropdown(), facility);

        if (applyHospitalReadmission) {
            await log("info", `Checking hospital readmission checkbox`);
            await this.click(this.getHospitalReadmissionCheckbox());
        }

        await log("info", `Selecting healthcare program: ${healthcareProgram}`);
        await this.click(this.getHealthcareProgramRadio(healthcareProgram));

        await log("info", `Setting visit date: ${visitDate}`);
        await this.typeInto(this.getVisitDateInput(), visitDate);

        await log("info", `Entering comment: ${comment}`);
        await this.typeInto(this.getCommentInput(), comment);

        await log("info", `Clicking on Book Appointment button`);
        await this.click(this.getBookAppointmentButton());
    
    }
}