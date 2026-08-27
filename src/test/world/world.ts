import { AddTrainingPage } from './../pages/ADMIN/addTrainingPage';
import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import type { BasePage } from "../pages/basepage";
import type { HomePage } from "../pages/home.page";
import type { RegisterPage } from "../pages/register.page";
import { logger } from "../utils/logger";
import { LoginPage } from "../pages/ADMIN/Loginpage";
import { AddTrainerPage } from "../pages/ADMIN/addTrainerPage";
import { ParticipantPage } from "../pages/ADMIN/participantPage";

export class CustomWorld extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    basePage!: BasePage;
    homePage!: HomePage;
    registerPage!: RegisterPage;
    logger = logger;
    loginPage!: LoginPage;
    addTrainingPage!:AddTrainingPage;
    addTrainerPage!: AddTrainerPage;
    participantPage!: ParticipantPage;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);

export default CustomWorld;
