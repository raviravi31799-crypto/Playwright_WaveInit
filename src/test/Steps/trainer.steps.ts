import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { HomePage } from "../pages/home.page";
import { TrainerPage } from "../pages/trainer.page";
import { logger } from "../utils/logger";



When("the user clicks on trainer in the login menu",async function (this: CustomWorld) {

        logger.info("Step: Clicking Trainer in login menu");

        const homePage = new HomePage(this.page);

        await homePage.clickTrainerRole();
    }
);

When("the user enters trainer {string} and {string}",async function (this: CustomWorld, username: string, password: string) {

        logger.info(`Step: Entering Trainer credentials`);

        logger.info(`Username: ${username || "<empty>"}`);

        logger.info(`Password: ${password ? "********" : "<empty>"}`);

        const homePage = new HomePage(this.page);

        if (username) {
            await homePage.enterEmail(username);
        }

        if (password) {
            await homePage.enterPassword(password);
        }
    }
);

When("the user clicks on sign in", async function (this: CustomWorld) {

        logger.info("Step: Clicking Sign In");

        const homePage =new HomePage(this.page);

        await homePage.clickSignIn();
    }
);

Then("the trainer login result should be {string}", async function (this: CustomWorld, expectedResult: string) {

        logger.info(`Expected Trainer login result: ${expectedResult}`);

        const trainerPage = new TrainerPage(this.page);

        switch (expectedResult.toLowerCase()) {

            case "success":

                await trainerPage.verifyTrainerLoginSuccess();

                break;


            case "invalid":

                await trainerPage.verifyInvalidCredentials();

                break;


            case "required":

                await trainerPage.verifyRequiredFieldValidation();

                break;


            default:

                throw new Error(
                    `Unknown expected login result: ${expectedResult}`
                );
        }
    }
);