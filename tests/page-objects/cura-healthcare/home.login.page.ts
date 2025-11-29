import {expect, type Page} from "@playwright/test";
import BasePage from "../base.page.js";
import {log} from "../../helpers/logger.js";


export default class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    getMakeAppointmentButton() {
        return this.page.getByRole('link', { name: 'Make Appointment'})
    }

    getLoginPageHeaderText() {
        return this.page.getByText('Please login to make');
    }

    getUsernameField() {
        return this.page.getByLabel('Username');
    }

    getPasswordField() {
        return this.page.getByLabel('Password');
    }

    getLoginButton() {
        return this.page.getByRole('button', { name: 'Login' });
    }

    getLoginErrorMessage() {
        return this.page.locator('#login');
    }


    async login(username: string, password: string) {
        await this.typeInto(this.getUsernameField(), username);
        await log('info', `Entered username: ${username}`);
        await this.typeInto(this.getPasswordField(), password);
        await log('info', `Entered password`);
        await this.click(this.getLoginButton());
    }

}