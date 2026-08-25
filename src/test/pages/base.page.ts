import { Locator, Page } from "@playwright/test";
import { ENV } from "../utils/envReader";
import { logger } from "../utils/logger";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a URL or default Base URL
     */
    async navigateTo(url: string = ENV.BASE_URL): Promise<void> {
        logger.info(`Navigating to URL: ${url}`);
        await this.page.goto(url, { waitUntil: "domcontentloaded" });
    }

    /**
     * Common Click method with automatic waiting and logging
     */
    async click(locator: Locator | string, elementName: string = "Element"): Promise<void> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        logger.info(`Clicking on: ${elementName}`);
        await element.waitFor({ state: "visible" });
        await element.click();
    }

    /**
     * Common sendKeys / fill method with automatic waiting and logging
     */
    async sendKeys(locator: Locator | string, value: string, elementName: string = "Input Field"): Promise<void> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        logger.info(`Entering "${value}" into: ${elementName}`);
        await element.waitFor({ state: "visible" });
        await element.fill(value);
    }

    /**
     * Clear and type text into an input field
     */
    async clearAndType(locator: Locator | string, value: string, elementName: string = "Input Field"): Promise<void> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        logger.info(`Clearing and entering "${value}" into: ${elementName}`);
        await element.waitFor({ state: "visible" });
        await element.clear();
        await element.fill(value);
    }

    /**
     * Common Check Checkbox / Radio method
     */
    async check(locator: Locator | string, elementName: string = "Checkbox"): Promise<void> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        logger.info(`Checking: ${elementName}`);
        await element.waitFor({ state: "visible" });
        await element.check();
    }

    /**
     * Common Uncheck Checkbox method
     */
    async uncheck(locator: Locator | string, elementName: string = "Checkbox"): Promise<void> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        logger.info(`Unchecking: ${elementName}`);
        await element.waitFor({ state: "visible" });
        await element.uncheck();
    }

    /**
     * Get text content from element
     */
    async getText(locator: Locator | string, elementName: string = "Element"): Promise<string> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        logger.info(`Getting text from: ${elementName}`);
        await element.waitFor({ state: "visible" });
        const text = (await element.textContent()) || "";
        logger.info(`Text retrieved from ${elementName}: "${text.trim()}"`);
        return text.trim();
    }

    /**
     * Get input field value
     */
    async getInputValue(locator: Locator | string, elementName: string = "Input Field"): Promise<string> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        logger.info(`Getting value from: ${elementName}`);
        await element.waitFor({ state: "visible" });
        return await element.inputValue();
    }

    /**
     * Wait for an element to be visible
     */
    async waitForElementVisible(locator: Locator | string, timeout: number = 10000): Promise<void> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.waitFor({ state: "visible", timeout });
    }

    /**
     * Wait for an element to be hidden / disappear
     */
    async waitForElementHidden(locator: Locator | string, timeout: number = 10000): Promise<void> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.waitFor({ state: "hidden", timeout });
    }

    /**
     * Check if element is currently visible
     */
    async isVisible(locator: Locator | string): Promise<boolean> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        return await element.isVisible();
    }

    /**
     * Select an option from dropdown by value or label
     */
    async selectOption(locator: Locator | string, valueOrLabel: string, elementName: string = "Dropdown"): Promise<void> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        logger.info(`Selecting "${valueOrLabel}" from: ${elementName}`);
        await element.waitFor({ state: "visible" });
        await element.selectOption(valueOrLabel);
    }

    /**
     * Get Page Title
     */
    async getTitle(): Promise<string> {
        const title = await this.page.title();
        logger.info(`Page Title: "${title}"`);
        return title;
    }

    /**
     * Get Current URL
     */
    async getUrl(): Promise<string> {
        const url = this.page.url();
        logger.info(`Current URL: ${url}`);
        return url;
    }

    /**
     * Reload the current page
     */
    async reload(): Promise<void> {
        logger.info("Reloading page");
        await this.page.reload({ waitUntil: "domcontentloaded" });
    }
}

export default BasePage;
