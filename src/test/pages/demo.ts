import { Page } from "@playwright/test";
import { ENV } from "../utils/envReader";
import { logger } from "../utils/logger";

export class DemoPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(): Promise<void> {
        logger.info(`Navigating to ${ENV.BASE_URL}`);
        await this.page.goto(ENV.BASE_URL, { waitUntil: "domcontentloaded" });
    }

    async getTitle(): Promise<string> {
        const title = await this.page.title();
        logger.info(`Page title is: "${title}"`);
        return title;
    }
}

export default DemoPage;
