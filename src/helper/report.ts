import path from "path";
import fs from "fs";
import { ENV } from "../test/utils/envReader";

const report = require("multiple-cucumber-html-reporter");

const jsonDir = path.resolve(process.cwd(), "reports/cucumber-json");
const reportPath = path.resolve(process.cwd(), "reports/cucumber-html");

if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
}

if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
}

const jsonFiles = fs.readdirSync(jsonDir).filter(f => f.endsWith(".json"));

if (jsonFiles.length === 0) {
    console.log(`[INFO] No JSON report files found in ${jsonDir}. Run tests first: npm test`);
} else {
    report.generate({
        jsonDir: "./reports/cucumber-json",
        reportPath: "./reports/cucumber-html",
        reportName: "WaveInit LMS Automation Test Report",
        pageTitle: "WaveInit Test Report",
        displayDuration: true,
        displayReportTime: true,
        metadata: {
            browser: {
                name: ENV.BROWSER.charAt(0).toUpperCase() + ENV.BROWSER.slice(1),
                version: "Latest"
            },
            device: "Local Machine",
            platform: {
                name: process.platform === "win32" ? "Windows" : process.platform,
                version: process.platform === "win32" ? "11" : ""
            }
        },
        customData: {
            title: "Execution Information",
            data: [
                { label: "Project", value: "WaveInit LMS Automation" },
                { label: "Application URL", value: ENV.BASE_URL },
                { label: "Environment", value: ENV.TEST_ENV.toUpperCase() },
                { label: "Browser", value: ENV.BROWSER },
                { label: "Headless", value: String(ENV.HEADLESS) },
                { label: "Framework", value: "Playwright + Cucumber BDD + TypeScript" },
                { label: "Execution Time", value: new Date().toLocaleString() }
            ]
        }
    });

    console.log(`[SUCCESS] Multiple Cucumber HTML Report generated at: ${reportPath}/index.html`);
}
