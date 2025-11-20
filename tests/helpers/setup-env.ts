// setup-env.ts
import fs from "fs";
import path from "path";
import type { FullConfig } from "@playwright/test";

const globalSetup = async (config: FullConfig) => {
    const resultsDir = path.join(process.cwd(), "allure-results");
    if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });

    // Environment
    const envData = [
        `Browser=Chromium`,
        `OS=${process.platform}`,
        `Build=1.0.0`,
        `App=Swag Labs`,
        `Tester=Anisur Rahman`,
        `Environment=Staging`
    ].join("\n");
    fs.writeFileSync(path.join(resultsDir, "environment.properties"), envData, "utf-8");

    // Categories
    const categoriesSrc = path.join(process.cwd(), "data/allure/allure-categories.json");
    const categoriesDest = path.join(resultsDir, "categories.json");
    fs.copyFileSync(categoriesSrc, categoriesDest);

    // Executor (manual values that ALWAYS show)
    const executor = {
        name: "Anisur Rahman",
        type: "local",
        build: "1.0.0",
        url: "https://www.saucedemo.com/",
        reportUrl: "https://github.com/shield75/playwright-e2e-test.git",
        description: "Tests executed locally by Anisur Rahman",
        stage: "Staging",

        parameters: [
            { name: "OS", value: `${process.platform} ${process.arch}` },
            { name: "Agent", value: `Node.js ${process.version}` },
            { name: "Environment", value: "Staging" },
            { name: "App", value: "Swag Labs" }
        ]
    };

    fs.writeFileSync(
        path.join(resultsDir, "executor.json"),
        JSON.stringify(executor, null, 2),
        "utf-8"
    );

    console.log("✅ Allure environment, categories, and executor are ready.");
};

export default globalSetup;