import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { logger } from "../utils/logger";

When("the user clicks on learner in the login menu", async function (this: CustomWorld) {
    logger.info("Step: Clicking Learner tab in login menu");
    const homePage = new HomePage(this.page);
    await homePage.clickLearnerRole();
});

When("the user clicks on sign up as a participant", async function (this: CustomWorld) {
    logger.info("Step: Clicking 'Sign up as Participant' link");
    const homePage = new HomePage(this.page);
    await homePage.clickSignUpAsParticipant();
});

When(
    "the user enters valid {string}, {string}, {string}, {string}, {string}, and {string}",
    async function (
        this: CustomWorld,
        firstName: string,
        lastName: string,
        email: string,
        number: string,
        password: string,
        confirmPassword: string
    ) {
        // Generate unique timestamp for email and phone to ensure successful registration on live server
        const uniqueId = Date.now().toString().slice(-6);
        const dynamicEmail = email.includes("@")
            ? email.replace("@", `_${uniqueId}@`)
            : `user_${uniqueId}@test.com`;
        const dynamicNumber = number.length === 10
            ? number.slice(0, 4) + uniqueId
            : number;

        logger.info(`Step: Entering valid participant details for ${firstName} ${lastName} (Email: ${dynamicEmail}, Phone: ${dynamicNumber})`);
        const registerPage = new RegisterPage(this.page);
        await registerPage.enterValidDetails(
            firstName,
            lastName,
            dynamicEmail,
            dynamicNumber,
            password,
            confirmPassword
        );
    }
);

When("the user accepts the terms and conditions", async function (this: CustomWorld) {
    logger.info("Step: Accepting terms and conditions");
    const registerPage = new RegisterPage(this.page);
    await registerPage.acceptTerms();
});

When("the user submits the registration form", async function (this: CustomWorld) {
    logger.info("Step: Submitting registration form");
    const registerPage = new RegisterPage(this.page);
    await registerPage.submitForm();
});

Then("the user should be registered successfully", async function (this: CustomWorld) {
    logger.info("Step: Validating successful registration message banner");
    const registerPage = new RegisterPage(this.page);
    await registerPage.assertRegistrationSuccess("Registration submitted successfully");
});
