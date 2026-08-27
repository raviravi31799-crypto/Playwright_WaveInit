import {When,Then} from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { logger } from "../utils/logger";


/**
 * Click Trainer Role
 */
When("the user clicks on trainer in the login menu",async function (this: CustomWorld) {

        logger.info("Step: Clicking Trainer in login menu");
        await this.homePage.clickTrainerRole();
    }
);


/**
 * Enter Trainer Credentials
 *
 * Email and password are handled by HomePage.
 */
When("the user enters trainer {string} and {string}",async function (this: CustomWorld,username: string,password: string) {

        logger.info("Step: Entering Trainer credentials");

        logger.info(`Username: ${username || "<empty>"}`);

        logger.info(`Password: ${password? "********": "<empty>"}`);


        if (username) {

            await this.homePage.enterEmail(
                username
            );
        }


        if (password) {

            await this.homePage.enterPassword(
                password
            );
        }
    }
);


/**
 * Click Sign In
 *
 * Sign In button is handled by HomePage.
 */
When(
    "the user clicks on sign in",
    async function (
        this: CustomWorld
    ) {

        logger.info(
            "Step: Clicking Sign In"
        );

        await this.homePage.clickSignIn();
    }
);


/**
 * Verify Trainer Login Result
 *
 * Trainer-specific validation is handled by TrainerPage.
 */
Then(
    "the trainer login result should be {string}",
    async function (
        this: CustomWorld,
        expectedResult: string
    ) {

        logger.info(
            `Expected Trainer login result: ${expectedResult}`
        );


        switch (
            expectedResult.toLowerCase()
        ) {

            case "success":

                await this.trainerPage
                    .verifyTrainerLoginSuccess();

                break;


            case "invalid":

                await this.trainerPage
                    .verifyInvalidCredentials();

                break;


            case "required":

                await this.trainerPage
                    .verifyRequiredFieldValidation();

                break;


            default:

                throw new Error(
                    `Unknown expected login result: ${expectedResult}`
                );
        }
    }
);