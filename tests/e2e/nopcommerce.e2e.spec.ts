import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import HomePage from "../page-objects/nop-commerce/home.page";
import CustList from "../page-objects/nop-commerce/customerList.page";
import constants from "../../data/constants.json";
import fileHelper from "../helpers/file-helper";
import manualUsers from "../../data/manual-users.json";

test.describe("E2E Customer Search", () => {
    test("E2E_TC001: Search the external customers in customer portal", async ({ page, request }, testInfo) => {
        // Env Config
        const envConfig = testInfo.project.use as any;

        /**1. Get list of users */
        // Make a GET call
        await log("info", `Making a GET call using ${envConfig.apiURL}`);
        const res = await request.get(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`, {
            headers: {
                "x-api-key": process.env.RES_RES_API_KEY,
            },
        });

        // Assert the status code
        expect(res.status()).toBe(200);
        await log("info", `The GET call is succesfull with ${res.status()}`);

        // Get list of users
        const userData = await res.json();
        //await log("info", `List of users: ${JSON.stringify(userData)}`);

        // Inject new data
        userData.data.push(manualUsers);

        // Write the list of users
        fileHelper.writeFile(`${process.cwd()}/data/api-res/list-of-users.json`, `${JSON.stringify(userData, undefined, 4)}`);


        /**2. Login to web */
        const homePage = new HomePage(page);
        await homePage.loginToNopeCommerceApp(
            envConfig.nopCommerceWeb,
            process.env.NOP_COMMERCE_TEST_USERNAME,
            process.env.NOP_COMMERCE_TEST_PASSWORD
        );

        /** 3. Customer search */
        const USER_DATA = userData.data;
        const customerListPage = new CustList(page);
        await customerListPage.goToCustomerListPage(`${envConfig.nopCommerceWeb}/Admin/Customer/List`);

        // Iterate over the list of users
        for (const user of USER_DATA) {
            let customerNotFound = await customerListPage.searchAndConfirmUser(user.first_name, user.last_name);
            await log("info", customerNotFound.toString());
            if (customerNotFound) {
                await log("warn", `The given user: ${user.first_name} ${user.last_name} could not found in the portal`);
            } else {
                await log("info", `The given user: ${user.first_name} ${user.first_name} found in the portal`);
            }
        }
    });
});
