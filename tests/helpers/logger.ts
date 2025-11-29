import { test } from "@playwright/test";
import chalk from "chalk";

type LogLevel = "info" | "warn" | "error" | "log";

export async function log(level: LogLevel, message: string) {
    const plainLine = `[${level.toUpperCase()}]: ${message}`;
    let coloredLine =  plainLine;

    switch (level) {
        case "info":
            coloredLine = chalk.blue(plainLine);
            break;
        case "warn":
            coloredLine = chalk.yellow(plainLine);
            break;
        case "error":
            coloredLine = chalk.red(plainLine);
            break;
        default:
            coloredLine = chalk.white(plainLine);

    }
    (console[level] || console.log)(coloredLine);
    
    await test.step(plainLine, async () => {});

}
