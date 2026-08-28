import { AddTrainingPage } from './../pages/ADMIN/addTrainingPage';
import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import type { BasePage } from "../pages/basepage";
import type { HomePage } from "../pages/home.page";
import type { RegisterPage } from "../pages/register.page";
import type { TrainerPage } from "../pages/trainer.page";
import { logger } from "../utils/logger";
import { LoginPage } from "../pages/ADMIN/Loginpage";
import { AddTrainerPage } from "../pages/ADMIN/addTrainerPage";
import { ParticipantPage } from "../pages/ADMIN/participantPage";
import { ScheduleInterviewPage } from '../pages/ADMIN/Interviewpage';

import type { Participantpage } from "../pages/participant.page";
import type { ParticipantProfilePage } from "../pages/participantProfile.page";

export class CustomWorld extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    basePage!: BasePage;
    homePage!: HomePage;
    registerPage!: RegisterPage;
    trainerPage!: TrainerPage;
    logger = logger;
    loginPage!: LoginPage;
    addTrainingPage!: AddTrainingPage;
    addTrainerPage!: AddTrainerPage;
    participantPage!: ParticipantPage;
    interviewpage!:ScheduleInterviewPage;
    participantProfilePage!: ParticipantProfilePage;


    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);

export default CustomWorld;
