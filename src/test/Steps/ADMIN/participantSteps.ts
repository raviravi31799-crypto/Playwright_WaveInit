import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/world";
import { ParticipantPage } from "../../pages/ADMIN/participantPage";
import { logger } from "../../utils/logger";

let currentFullName: string;
let currentEmail: string;

Given("the admin navigates to the Participants page", async function (this: CustomWorld) {
    await this.loginPage.Adminlogin();
    logger.info("Admin login successful");

    this.participantPage = new ParticipantPage(this.page);
    await this.participantPage.clickParticipantsMenu();
    logger.info("Participants page opened");
});

When("the admin clicks the Add Participant button", async function (this: CustomWorld) {
    await this.participantPage.clickAddParticipant();
    logger.info("Add Participant button clicked");
});

When(
    "the admin fills the participant details with name {string} email {string} phone {string} status {string} and password {string}",
    async function (this: CustomWorld, fullName: string, email: string, phone: string, status: string, password: string) {
        const uniqueSuffix = Date.now();
        currentFullName = `${fullName}${uniqueSuffix}`;
        currentEmail = `${uniqueSuffix}.${email}`;

        await this.participantPage.fillParticipantDetails({
            fullName: currentFullName,
            email: currentEmail,
            phone,
            status,
            password
        });

        logger.info(`Participant details entered for: ${currentFullName} (${currentEmail})`);
    }
);

When("the admin submits the participant form", async function (this: CustomWorld) {
    await this.participantPage.clickSubmit();
    logger.info("Participant form submitted");
});

When("the admin clicks the Cancel button", async function (this: CustomWorld) {
    await this.participantPage.clickCancel();
    logger.info("Cancel button clicked");
});

Then("the participant should be added successfully", async function (this: CustomWorld) {
    await this.participantPage.verifyToastContains(`${currentFullName} was added successfully`);
    logger.info(`Participant "${currentFullName}" added successfully`);
});

Then("the Add Participant form should be closed", async function (this: CustomWorld) {
    await this.participantPage.verifyFormClosed();
});

When("the admin searches for the participant", async function (this: CustomWorld) {
    await this.participantPage.searchParticipant(currentFullName);
    logger.info(`Searched for participant: ${currentFullName}`);
});

When("the admin approves the participant", async function (this: CustomWorld) {
    await this.participantPage.clickApprove(currentFullName);
    logger.info(`Approve clicked for participant: ${currentFullName}`);
});

When("the admin rejects the participant", async function (this: CustomWorld) {
    await this.participantPage.clickReject(currentFullName);
    logger.info(`Reject clicked for participant: ${currentFullName}`);
});

When("the admin deletes the participant", async function (this: CustomWorld) {
    await this.participantPage.clickDelete(currentFullName);
    logger.info(`Delete clicked for participant: ${currentFullName}`);
});

When("the admin confirms the deletion", async function (this: CustomWorld) {
    await this.participantPage.confirmDelete();
    logger.info(`Deletion confirmed for participant: ${currentFullName}`);
});

Then("the participant should be approved successfully", async function (this: CustomWorld) {
    await this.participantPage.verifyToastContains("approved");
    logger.info(`Participant "${currentFullName}" approved successfully`);
});

Then("the participant should be rejected successfully", async function (this: CustomWorld) {
    await this.participantPage.verifyToastContains("rejected");
    logger.info(`Participant "${currentFullName}" rejected successfully`);
});

Then("the participant should be deleted successfully", async function (this: CustomWorld) {
    await this.participantPage.verifyParticipantRemoved(currentFullName);
    logger.info(`Participant "${currentFullName}" deleted successfully`);
});
