import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const env = process.env.TEST_ENV || process.env.ENV || "qa";
const envFilePath = path.resolve(process.cwd(), `env/.env.${env}`);
const defaultEnvPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
} else if (fs.existsSync(defaultEnvPath)) {
    dotenv.config({ path: defaultEnvPath });
} else {
    dotenv.config();
}

export const ENV = {
    TEST_ENV: env,
    BASE_URL: process.env.BASE_URL || "https://www.waveinitlms.online/",
    BROWSER: (process.env.BROWSER || "chromium").toLowerCase() as "chromium" | "firefox" | "webkit",
    HEADLESS: process.env.HEADLESS !== undefined ? process.env.HEADLESS === "true" : true,
    DEFAULT_TIMEOUT: process.env.DEFAULT_TIMEOUT ? parseInt(process.env.DEFAULT_TIMEOUT, 10) : 30000,
    VALID_EMAIL: process.env.VALID_EMAIL || "",
    VALID_PASSWORD: process.env.VALID_PASSWORD || ""
};

export default ENV;
