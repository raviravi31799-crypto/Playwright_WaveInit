import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { logger } from "../utils/logger";

export class CustomWorld extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    logger = logger;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);

export default CustomWorld;
