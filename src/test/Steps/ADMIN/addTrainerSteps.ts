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
