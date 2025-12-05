import fs from "fs";
import { log } from "./logger.js";
import path from "path";
/**
 * Reads file and returns string. For JSON, parse it before using
 */
function readFile(filePath: string): any {
    if (!fs.existsSync(filePath)) {
        throw new Error(`No file exists with given name:${filePath}`);
    }
    log("info", `Reading file: ${filePath}...`);
    let data = fs.readFileSync(filePath, "utf8");
    return data;
}
/**
 * Writes to target file. If target is json, stringify data
 * @param filePath fullpath incl extn of file
 * @param data
 */
function writeFile(filePath: string, data: string) {
    try {
        // Ensure parent directory exists
        const dir = path.dirname(filePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filePath, data);
        log("info", `Writing file: ${filePath}...`);
    } catch (err) {
        throw new Error(`Error writing to: ${filePath}, ${err}`);
    }
}

export default { readFile, writeFile };
