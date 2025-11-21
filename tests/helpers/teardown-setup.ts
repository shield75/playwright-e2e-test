import fs from "fs";
import path from "path";
import type { FullConfig } from "@playwright/test";
import { exec } from "child_process";

const globalTeardown = async (config: FullConfig) => {

    /* Executed after all workers complete. Good place for cleanup tasks */
     console.log(`[INFO]: Starting the global teardown process ...`);
    // Generate Allure report for local runs
    if (process.env.ENV?.toUpperCase() === "PROD") {
        console.log(" >> Local run detected - starting Allure server...");
        exec("allure generate allure-results --clean -o allure-report && cp -r allure-report/history allure-results/history", (error, stdout, stderr) => {
            if (error) {
                console.error("ERROR: Starting Allure server:", error.message);
            }
        });
    }

    console.log(`[INFO]: Completed the global teardown process ...`);
}
export default globalTeardown;