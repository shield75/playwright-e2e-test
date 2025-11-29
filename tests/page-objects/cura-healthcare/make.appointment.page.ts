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
}