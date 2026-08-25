import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { logger } from "../utils/logger";
import { LoginPage } from "../pages/ADMIN/Loginpage";

export class CustomWorld extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    logger = logger;
    loginPage!: LoginPage;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);

export default CustomWorld;
