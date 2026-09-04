import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/world";
import { AddTrainerPage } from "../../pages/ADMIN/addTrainerPage";
import trainerData from "../../../../testdata/trainerData.json";
import { logger } from "../../utils/logger";

let capturedMessage: string;
let createdTrainerEmail: string;

Given("the admin navigates to the Trainers page", async function (this: CustomWorld) {
    await this.loginPage.Adminlogin();
    logger.info("Admin login successful");

    this.addTrainerPage = new AddTrainerPage(this.page);
    await this.addTrainerPage.clickTrainersMenu();
    logger.info("Trainers page opened");
});

When("the admin clicks the Add Trainer button", async function (this: CustomWorld) {
    await this.addTrainerPage.clickAddTrainer();
    logger.info("Add Trainer button clicked");
});

When("the admin fills all trainer details with valid data", async function (this: CustomWorld) {
    createdTrainerEmail = `${Date.now()}.${trainerData.email}`;

    await this.addTrainerPage.fillAllTrainerDetails({
        fullName: trainerData.fullName,
        email: createdTrainerEmail,
        mobile: trainerData.mobile,
        department: trainerData.department,
        designation: trainerData.designation,
        experience: trainerData.experience,
        password: trainerData.password,
        confirmPassword: trainerData.confirmPassword
    });

    logger.info(`Trainer details entered for: ${createdTrainerEmail}`);
});

When("the admin fills only the mandatory trainer details", async function (this: CustomWorld) {
    createdTrainerEmail = `${Date.now()}.${trainerData.email}`;

    await this.addTrainerPage.fillMandatoryTrainerDetails({
        fullName: trainerData.fullName,
        email: createdTrainerEmail,
        password: trainerData.password,
        confirmPassword: trainerData.confirmPassword
    });

    logger.info(`Mandatory trainer details entered for: ${createdTrainerEmail}`);
});

When("the admin fills all trainer details except confirm password", async function (this: CustomWorld) {
    createdTrainerEmail = `${Date.now()}.${trainerData.email}`;

    await this.addTrainerPage.fillAllTrainerDetails({
        fullName: trainerData.fullName,
        email: createdTrainerEmail,
        mobile: trainerData.mobile,
        department: trainerData.department,
        designation: trainerData.designation,
        experience: trainerData.experience,
        password: trainerData.password,
        confirmPassword: ""
    });

    logger.info("Trainer details entered without Confirm Password");
});

When("the admin fills all trainer details with an invalid email", async function (this: CustomWorld) {
    await this.addTrainerPage.fillAllTrainerDetails({
        fullName: trainerData.fullName,
        email: trainerData.invalidEmail,
        mobile: trainerData.mobile,
        department: trainerData.department,
        designation: trainerData.designation,
        experience: trainerData.experience,
        password: trainerData.password,
        confirmPassword: trainerData.confirmPassword
    });

    logger.info(`Trainer details entered with invalid email: ${trainerData.invalidEmail}`);
});

When("the admin fills all trainer details with mismatched confirm password", async function (this: CustomWorld) {
    createdTrainerEmail = `${Date.now()}.${trainerData.email}`;

    await this.addTrainerPage.fillAllTrainerDetails({
        fullName: trainerData.fullName,
        email: createdTrainerEmail,
        mobile: trainerData.mobile,
        department: trainerData.department,
        designation: trainerData.designation,
        experience: trainerData.experience,
        password: trainerData.password,
        confirmPassword: trainerData.mismatchedConfirmPassword
    });

    logger.info("Trainer details entered with mismatched Confirm Password");
});

When("the admin clicks the Create Trainer button", async function (this: CustomWorld) {
    capturedMessage = await this.addTrainerPage.clickCreateTrainerAndCaptureAlert();
    logger.info(`Create Trainer clicked. Alert message: "${capturedMessage}"`);
});

Then("the trainer should be created successfully", async function (this: CustomWorld) {
    await this.addTrainerPage.verifyAlertMessage("Trainer created successfully");
    logger.info(`Trainer "${createdTrainerEmail}" created successfully`);
});

Then("the admin should see the message {string}", async function (this: CustomWorld, expectedMessage: string) {
    await this.addTrainerPage.verifyAlertMessage(expectedMessage);
    logger.info(`Validation message verified: "${expectedMessage}"`);
});

/**
 * Seeds a brand-new trainer with a freshly generated, unique email
 * so that View/Delete/Select scenarios never depend on pre-existing data.
 */
Given("the admin has created a new trainer with fresh data", async function (this: CustomWorld) {
    createdTrainerEmail = `${Date.now()}.${trainerData.email}`;

    await this.addTrainerPage.clickAddTrainer();

    await this.addTrainerPage.fillMandatoryTrainerDetails({
        fullName: `${trainerData.fullName} ${Date.now()}`,
        email: createdTrainerEmail,
        password: trainerData.password,
        confirmPassword: trainerData.confirmPassword
    });

    await this.addTrainerPage.clickCreateTrainerAndCaptureAlert();
    await this.addTrainerPage.verifyAlertMessage("Trainer created successfully");

    await this.addTrainerPage.clickBackToTrainers();
    await this.addTrainerPage.searchTrainer(createdTrainerEmail);

    logger.info(`Fresh trainer seeded for scenario: ${createdTrainerEmail}`);
});

When("the admin clicks the View icon for a trainer", async function (this: CustomWorld) {
    await this.addTrainerPage.clickViewIcon(createdTrainerEmail);
    logger.info(`View icon clicked for trainer: ${createdTrainerEmail}`);
});

Then("the trainer details should be displayed", async function (this: CustomWorld) {
    await this.addTrainerPage.verifyTrainerDetailsDisplayed();
    logger.info(`Trainer details panel verified for: ${createdTrainerEmail}`);
});

When("the admin clicks the Delete icon for a trainer", async function (this: CustomWorld) {
    await this.addTrainerPage.clickDeleteIcon(createdTrainerEmail);
    logger.info(`Delete icon clicked for trainer: ${createdTrainerEmail}`);
});

When("the admin confirms the deletion", async function (this: CustomWorld) {
    await this.addTrainerPage.confirmDeletion();
    logger.info("Deletion confirmed");
});

When("the admin cancels the deletion", async function (this: CustomWorld) {
    await this.addTrainerPage.cancelDeletion();
    logger.info("Deletion cancelled");
});

Then("the trainer should be removed from the trainer list", async function (this: CustomWorld) {
    await this.addTrainerPage.verifyTrainerRemoved(createdTrainerEmail);
    logger.info(`Trainer removal verified for: ${createdTrainerEmail}`);
});

Then("the trainer should remain in the trainer list", async function (this: CustomWorld) {
    await this.addTrainerPage.verifyTrainerPresent(createdTrainerEmail);
    logger.info(`Trainer still present as expected: ${createdTrainerEmail}`);
});

When("the admin clicks the Select All checkbox", async function (this: CustomWorld) {
    await this.addTrainerPage.clickSelectAllCheckbox();
    logger.info("Select All checkbox clicked");
});

Then("all trainers in the list should be selected", async function (this: CustomWorld) {
    await this.addTrainerPage.verifyAllTrainersSelected();
    logger.info("All trainers confirmed selected");
});

Given("all trainers are selected", async function (this: CustomWorld) {
    await this.addTrainerPage.clickSelectAllCheckbox();
    await this.addTrainerPage.verifyAllTrainersSelected();
    logger.info("Preconditioned all trainers as selected");
});

Then("all trainers should be unselected", async function (this: CustomWorld) {
    await this.addTrainerPage.verifyAllTrainersUnselected();
    logger.info("All trainers confirmed unselected");
});