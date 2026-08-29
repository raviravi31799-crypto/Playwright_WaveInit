import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { logger } from "../utils/logger";
import { readExcel, RegisterExcelData } from "../utils/excelReader";

When("the user clicks on learner in the login menu", async function (this: CustomWorld) {
    logger.info("Step: Clicking Learner tab in login menu");
    await this.homePage.clickLearnerRole();
});

When("the user clicks on sign up as a participant", async function (this: CustomWorld) {
    logger.info("Step: Clicking 'Sign up as Participant' link");
    await this.homePage.clickSignUpAsParticipant();
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
        // Generate completely unique random email & 10-digit phone for positive registration
        const randomSuffix = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const dynamicEmail = `tester_${randomSuffix}@gmail.com`;
        const dynamicNumber = "9" + Math.floor(100000000 + Math.random() * 900000000).toString();

        logger.info(`Step: Entering valid participant details for ${firstName} ${lastName} (Email: ${dynamicEmail}, Phone: ${dynamicNumber})`);
        await this.registerPage.enterExactDetails(
            firstName,
            lastName,
            dynamicEmail,
            dynamicNumber,
            password,
            confirmPassword
        );
    }
);

When(
    "the user enters existing {string}, {string}, {string}, {string}, {string}, and {string}",
    async function (
        this: CustomWorld,
        firstName: string,
        lastName: string,
        email: string,
        number: string,
        password: string,
        confirmPassword: string
    ) {
        logger.info(`Step: Entering existing participant credentials for ${firstName} ${lastName} (Email: ${email})`);
        await this.registerPage.enterExactDetails(
            firstName,
            lastName,
            email,
            number,
            password,
            confirmPassword
        );
    }
);

When(
    "the user enters mismatch password details {string}, {string}, {string}, {string}, {string}, and {string}",
    async function (
        this: CustomWorld,
        firstName: string,
        lastName: string,
        email: string,
        number: string,
        password: string,
        confirmPassword: string
    ) {
        logger.info(`Step: Entering registration details with mismatching passwords for ${firstName} ${lastName}`);
        await this.registerPage.enterExactDetails(
            firstName,
            lastName,
            email,
            number,
            password,
            confirmPassword
        );
    }
);

When(
    "the user enters unaccepted terms details {string}, {string}, {string}, {string}, {string}, and {string}",
    async function (
        this: CustomWorld,
        firstName: string,
        lastName: string,
        email: string,
        number: string,
        password: string,
        confirmPassword: string
    ) {
        logger.info(`Step: Entering registration details for ${firstName} ${lastName} without accepting terms`);
        await this.registerPage.enterExactDetails(
            firstName,
            lastName,
            email,
            number,
            password,
            confirmPassword
        );
    }
);

When(
    "the user enters empty field details {string}, {string}, {string}, {string}, {string}, and {string}",
    async function (
        this: CustomWorld,
        firstName: string,
        lastName: string,
        email: string,
        number: string,
        password: string,
        confirmPassword: string
    ) {
        logger.info(`Step: Entering registration details with empty fields for ${firstName} ${lastName}`);
        await this.registerPage.enterExactDetails(
            firstName,
            lastName,
            email,
            number,
            password,
            confirmPassword
        );
    }
);

When(
    "the user enters empty field details from excel",
    async function (this: CustomWorld) {
        const filePath = "src/test/data/register_empty_fields.xlsx";
        const testData = readExcel<RegisterExcelData>(filePath);
        await this.registerPage.validateAllEmptyFieldCombinations(testData);
    }
);

When(
    "the user enters empty field details from excel file {string}",
    async function (this: CustomWorld, filePath: string) {
        const testData = readExcel<RegisterExcelData>(filePath);
        await this.registerPage.validateAllEmptyFieldCombinations(testData);
    }
);

Then(
    "the user validates all empty field combinations from excel",
    async function (this: CustomWorld) {
        const filePath = "src/test/data/register_empty_fields.xlsx";
        const testData = readExcel<RegisterExcelData>(filePath);
        await this.registerPage.validateAllEmptyFieldCombinations(testData);
    }
);

Then(
    "the user validates all empty field combinations from excel file {string}",
    async function (this: CustomWorld, filePath: string) {
        const testData = readExcel<RegisterExcelData>(filePath);
        await this.registerPage.validateAllEmptyFieldCombinations(testData);
    }
);

When(
    "the user validates empty fields registration for all records in excel {string}",
    async function (this: CustomWorld, filePath: string) {
        const testData = readExcel<RegisterExcelData>(filePath);
        await this.registerPage.validateAllEmptyFieldCombinations(testData);
    }
);

When("the user accepts the terms and conditions", async function (this: CustomWorld) {
    logger.info("Step: Accepting terms and conditions");
    await this.registerPage.acceptTerms();
});

When("the user does not accept the terms and conditions", async function (this: CustomWorld) {
    logger.info("Step: Leaving terms and conditions unchecked");
    await this.registerPage.uncheckTerms();
});

When("the user submits the registration form", async function (this: CustomWorld) {
    logger.info("Step: Submitting registration form");
    await this.registerPage.submitForm();
});

Then("the user should be registered successfully", async function (this: CustomWorld) {
    logger.info("Step: Validating successful registration message banner");
    await this.registerPage.assertRegistrationSuccess("Registration submitted successfully");
});

Then("the user should see an error message {string}", async function (this: CustomWorld, errorMessage: string) {
    logger.info(`Step: Validating error message: "${errorMessage}"`);
    await this.registerPage.assertErrorMessage(errorMessage);
});

Then("the user should see a password mismatch error message {string}", async function (this: CustomWorld, errorMessage: string) {
    logger.info(`Step: Validating password mismatch error message: "${errorMessage}"`);
    await this.registerPage.assertPasswordMismatchError(errorMessage);
});

Then("the user should see a terms error message {string}", async function (this: CustomWorld, errorMessage: string) {
    logger.info(`Step: Validating terms error message: "${errorMessage}"`);
    await this.registerPage.assertTermsError(errorMessage);
});

Then("the user should see a required field validation error", async function (this: CustomWorld) {
    logger.info("Step: Validating required field validation error");
    await this.registerPage.assertRequiredFieldValidation("fill");
});

Then("the user should see a validation tooltip message containing {string}", async function (this: CustomWorld, expectedMsg: string) {
    logger.info(`Step: Validating tooltip message containing "${expectedMsg}"`);
    await this.registerPage.assertRequiredFieldValidation(expectedMsg);
});


