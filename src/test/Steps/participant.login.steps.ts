import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { ParticipantPage } from "../pages/participant.page";
import { logger } from "../utils/logger";
import { readCsv, ParticipantLoginCsvData } from "../utils/csvReader";
import participantData from "../../../testdata/participantLoginData.json";

When("the user enters participant {string} and {string}", async function (this: CustomWorld, email: string, password: string) {
    logger.info(`Step: Entering participant credentials`);
    logger.info(`Email: ${email || "<empty>"}`);
    logger.info(`Password: ${password ? "********" : "<empty>"}`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.enterParticipantCredentials(email, password);
});

When("the user enters invalid participant credentials from json", async function (this: CustomWorld) {
    logger.info(`Step: Entering invalid participant credentials from json (Email: ${participantData.invalidUser.email})`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.enterParticipantCredentials(participantData.invalidUser.email, participantData.invalidUser.password);
});

When("the user enters invalid participant credentials", async function (this: CustomWorld) {
    logger.info(`Step: Entering invalid participant credentials (Email: ${participantData.invalidUser.email})`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.enterParticipantCredentials(participantData.invalidUser.email, participantData.invalidUser.password);
});

When("the user enters valid participant credentials from json", async function (this: CustomWorld) {
    logger.info(`Step: Entering valid participant credentials from json (Email: ${participantData.validUser.email})`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.enterParticipantCredentials(participantData.validUser.email, participantData.validUser.password);
});

When("the user enters participant credentials from json for {string}", async function (this: CustomWorld, userType: string) {
    const data = (participantData as Record<string, any>)[userType];
    if (!data) {
        throw new Error(`User type "${userType}" not found in participantLoginData.json`);
    }
    logger.info(`Step: Entering participant credentials from json for "${userType}" (Email: ${data.email})`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.enterParticipantCredentials(data.email, data.password);
});

When("the user clicks on sign in as learner", async function (this: CustomWorld) {
    logger.info("Step: Clicking Sign In as Learner");
    const participantPage = new ParticipantPage(this.page);
    await participantPage.clickSignIn();
});

Then("the user should see the welcome message {string} in the dashboard", async function (this: CustomWorld, welcomeMessage: string) {
    logger.info(`Step: Validating welcome message in dashboard: "${welcomeMessage}"`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.verifyWelcomeMessage(welcomeMessage);
});

Then("the user should see the login error message {string}", async function (this: CustomWorld, expectedError: string) {
    logger.info(`Step: Validating participant login error message: "${expectedError}"`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.verifyErrorMessage(expectedError);
});

Then("the user should see the login error message from json", async function (this: CustomWorld) {
    logger.info(`Step: Validating participant login error message from json: "${participantData.invalidUser.expectedError}"`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.verifyErrorMessage(participantData.invalidUser.expectedError);
});

Then("the user validates all participant login combinations from csv {string}", async function (this: CustomWorld, csvPath: string) {
    logger.info(`Step: Validating all participant login combinations from CSV: ${csvPath}`);
    const records = readCsv<ParticipantLoginCsvData>(csvPath);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.validateAllLoginCombinationsFromCsv(records);
});

Then("the user validates all participant login combinations from csv", async function (this: CustomWorld) {
    const defaultCsvPath = "testdata/participant_login_combinations.csv";
    logger.info(`Step: Validating all participant login combinations from default CSV: ${defaultCsvPath}`);
    const records = readCsv<ParticipantLoginCsvData>(defaultCsvPath);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.validateAllLoginCombinationsFromCsv(records);
});

Then("the user should see the required field validation tooltip containing {string}", async function (this: CustomWorld, expectedSnippet: string) {
    logger.info(`Step: Validating required field validation tooltip containing: "${expectedSnippet}"`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.assertRequiredFieldValidation(expectedSnippet);
});

When("the user clicks on forgot password link", async function (this: CustomWorld) {
    logger.info("Step: Clicking Forgot password link");
    const participantPage = new ParticipantPage(this.page);
    await participantPage.clickForgotPassword();
});

Then("the user should see the forgot password header {string}", async function (this: CustomWorld, headerTitle: string) {
    logger.info(`Step: Validating forgot password header: "${headerTitle}"`);
    const participantPage = new ParticipantPage(this.page);
    await participantPage.verifyForgotPasswordHeader(headerTitle);
});
