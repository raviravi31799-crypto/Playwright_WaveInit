import { CustomWorld } from "../world/world";
import { Browser, chromium, firefox, webkit } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { ENV } from "../utils/envReader";
import { logger } from "../utils/logger";
import path from "path";
import fs from "fs";
import { LoginPage } from "../pages/ADMIN/Loginpage";

let browser: Browser;

setDefaultTimeout(ENV.DEFAULT_TIMEOUT);

BeforeAll(async () => {
    logger.info(`Initializing test suite in [${ENV.TEST_ENV.toUpperCase()}] environment`);
    logger.info(`Target Base URL: ${ENV.BASE_URL}`);
    logger.info(`Browser: ${ENV.BROWSER}, Headless: ${ENV.HEADLESS}`);

    const launchOptions = {
        headless: ENV.HEADLESS,
        slowMo: ENV.HEADLESS ? 0 : 200
    };

    switch (ENV.BROWSER) {
        case "firefox":
            browser = await firefox.launch(launchOptions);
            break;
        case "webkit":
            browser = await webkit.launch(launchOptions);
            break;
        case "chromium":
        default:
            browser = await chromium.launch({...launchOptions,channel: "chrome"});
            break;
    }

    logger.info(`${ENV.BROWSER} browser launched in ${ENV.HEADLESS ? "Headless" : "Headed"} mode`);
});

Before(async function (this: CustomWorld, scenario) {
    logger.info(`>>> Starting Scenario: "${scenario.pickle.name}"`);
    this.browser = browser;
    this.browserContext = await this.browser.newContext({
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true
    });
    this.page = await this.browserContext.newPage();
    this.loginPage = new LoginPage(this.page);
});

After(async function (this: CustomWorld, { pickle, result }) {
    const scenarioName = pickle.name.replace(/[^a-zA-Z0-9_-]/g, "_");

    if (result?.status === Status.FAILED && this.page) {
        const screenshotDir = path.resolve(process.cwd(), "reports/screenshots");
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        const screenshotPath = path.join(screenshotDir, `${scenarioName}_FAILED.png`);
        const screenshot = await this.page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        await this.attach(screenshot, "image/png");
        logger.error(`Scenario FAILED: "${pickle.name}". Screenshot saved to: ${screenshotPath}`);
    } else {
        logger.info(`Scenario PASSED: "${pickle.name}"`);
    }

    if (this.page) {
        await this.page.close();
    }
    if (this.browserContext) {
        await this.browserContext.close();
    }
    logger.info(`<<< Completed Scenario: "${pickle.name}" with status: ${result?.status || "UNKNOWN"}`);
});

AfterAll(async () => {
    logger.info("Closing browser and finishing test execution...");
    if (browser) {
        await browser.close();
    }
    logger.info("Test execution completed.");
});
