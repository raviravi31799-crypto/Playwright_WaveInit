import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { logger } from "../utils/logger";


// ==================================================
// TRAINER LOGIN
// ==================================================

Given(
    "the trainer logs in with valid credentials for profile",
    async function (this: CustomWorld) {

        logger.info(
            "Logging in as Trainer for Profile functionality"
        );

        await this.homePage.enterEmail(
            "rahul@gmail.com"
        );

        await this.homePage.enterPassword(
            "rahul1234"
        );

        await this.homePage.clickSignIn();

        await this.trainerPage.verifyTrainerLoginSuccess();

        logger.info(
            "Trainer login completed successfully"
        );
    }
);


// ==================================================
// OPEN MY PROFILE
// ==================================================

When(
    "the trainer opens My Profile",
    async function (this: CustomWorld) {

        logger.info(
            "Opening Trainer My Profile"
        );

        await this.trainerProfilePage.openProfileMenu();

        await this.trainerProfilePage.clickMyProfile();

        await this.trainerProfilePage.verifyProfilePage();

        logger.info(
            "Trainer My Profile opened successfully"
        );
    }
);


// ==================================================
// ADD SKILL
// ==================================================

When(
    "the trainer clicks on Add Skill",
    async function (this: CustomWorld) {

        logger.info(
            "Clicking Add Skill"
        );

        await this.trainerProfilePage.clickAddSkill();
    }
);


When(
    "the trainer enters skill {string}",
    async function (
        this: CustomWorld,
        skill: string
    ) {

        logger.info(
            `Entering trainer skill: ${skill}`
        );

        await this.trainerProfilePage.enterSkill(
            skill
        );
    }
);


When(
    "the trainer clicks on Add Skill button",
    async function (this: CustomWorld) {

        logger.info(
            "Clicking Add Skill submit button"
        );

        await this.trainerProfilePage
            .clickAddSkillSubmit();
    }
);


Then(
    "the skill {string} should be displayed in the trainer profile",
    async function (
        this: CustomWorld,
        skill: string
    ) {

        logger.info(
            `Verifying added skill: ${skill}`
        );

        await this.trainerProfilePage
            .verifySkillAdded(skill);

        logger.info(
            `Skill "${skill}" verification passed`
        );
    }
);


// ==================================================
// INVALID EXPERIENCE
// ==================================================

When(
    "the trainer clicks on Add Experience",
    async function (this: CustomWorld) {

        logger.info(
            "Clicking Add Experience"
        );

        await this.trainerProfilePage
            .clickAddExperience();
    }
);


When(
    "the trainer enters company name {string}",
    async function (
        this: CustomWorld,
        companyName: string
    ) {

        logger.info(
            `Entering company name: "${companyName}"`
        );

        await this.trainerProfilePage
            .enterCompanyName(companyName);
    }
);


When(
    "the trainer enters role {string}",
    async function (
        this: CustomWorld,
        role: string
    ) {

        logger.info(
            `Entering role: "${role}"`
        );

        await this.trainerProfilePage
            .enterRole(role);
    }
);


When(
    "the trainer enters start date {string}",
    async function (
        this: CustomWorld,
        startDate: string
    ) {

        logger.info(
            `Entering start date: "${startDate}"`
        );

        await this.trainerProfilePage
            .enterStartDate(startDate);
    }
);


When(
    "the trainer clicks on Add Experience button",
    async function (this: CustomWorld) {

        logger.info(
            "Clicking Add Experience submit button"
        );

        await this.trainerProfilePage
            .clickAddExperienceSubmit();
    }
);


Then(
    "the validation message should be displayed for {string}",
    async function (
        this: CustomWorld,
        missingField: string
    ) {

        logger.info(
            `Verifying required validation message for: "${missingField}"`
        );

        await this.trainerProfilePage
            .verifyExperienceValidation(
                missingField
            );

        logger.info(
            `Required validation verified for: "${missingField}"`
        );
    }
);