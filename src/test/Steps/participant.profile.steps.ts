import { When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { ParticipantProfilePage } from "../pages/participantProfile.page";
import { logger } from "../utils/logger";
import profileData from "../../../testdata/participantProfileData.json";

When("the user navigates to the participant profile page", async function (this: CustomWorld) {
    logger.info("Step: Navigating to participant profile page");
    this.participantProfilePage = new ParticipantProfilePage(this.page);
    await this.participantProfilePage.navigateToProfile();
});

Then("the user should see the profile page header {string}", async function (this: CustomWorld, expectedHeader: string) {
    logger.info(`Step: Verifying profile page header: "${expectedHeader}"`);
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.verifyProfileHeader(expectedHeader);
});

Then("the user should see personal information with full name {string}, email {string}, phone {string}, participant ID {string}, department {string}, designation {string}, and account status {string}", async function (
    this: CustomWorld,
    fullName: string,
    email: string,
    phone: string,
    participantId: string,
    department: string,
    designation: string,
    accountStatus: string
) {
    logger.info("Step: Verifying personal information fields");
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.verifyPersonalInformation({
        fullName,
        email,
        phone,
        participantId,
        department,
        designation,
        accountStatus
    });
});

Then("the user should see the personal information matching test data", async function (this: CustomWorld) {
    logger.info("Step: Verifying personal information matching json test data");
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.verifyPersonalInformation({
        fullName: profileData.personalInfo.fullName,
        email: profileData.personalInfo.email,
        phone: profileData.personalInfo.phone,
        participantId: profileData.personalInfo.participantId,
        department: profileData.personalInfo.department,
        designation: profileData.personalInfo.designation,
        accountStatus: profileData.personalInfo.accountStatus
    });
});

Then("the user should see the learning activity heatmap section", async function (this: CustomWorld) {
    logger.info("Step: Verifying learning activity heatmap section");
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.verifyLearningActivityHeatmap();
});

When("the user selects {string} in the heatmap timeframe dropdown", async function (this: CustomWorld, timeframe: string) {
    logger.info(`Step: Selecting heatmap timeframe "${timeframe}"`);
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.selectHeatmapTimeframe(timeframe);
});

Then("the user should see the heatmap timeframe options:", async function (this: CustomWorld, dataTable: DataTable) {
    logger.info("Step: Verifying heatmap dropdown options");
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    const expectedOptions = dataTable.raw().flat();
    await this.participantProfilePage.verifyHeatmapTimeframeOptions(expectedOptions);
});

Then("the user should see the activity summary metrics with days active {string}, courses accessed {string}, lessons completed {string}, assessments taken {string}, and time spent {string}", async function (
    this: CustomWorld,
    daysActive: string,
    coursesAccessed: string,
    lessonsCompleted: string,
    assessmentsTaken: string,
    timeSpentLearning: string
) {
    logger.info("Step: Verifying activity summary metrics");
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.verifyActivitySummary({
        daysActive,
        coursesAccessed,
        lessonsCompleted,
        assessmentsTaken,
        timeSpentLearning
    });
});

Then("the user should see the activity summary matching test data", async function (this: CustomWorld) {
    logger.info("Step: Verifying activity summary matching json test data");
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.verifyActivitySummary({
        timeframe: profileData.activitySummary.timeframe,
        daysActive: profileData.activitySummary.daysActive,
        coursesAccessed: profileData.activitySummary.coursesAccessed,
        lessonsCompleted: profileData.activitySummary.lessonsCompleted,
        assessmentsTaken: profileData.activitySummary.assessmentsTaken,
        timeSpentLearning: profileData.activitySummary.timeSpentLearning
    });
});

Then("the user should see profile completion percentage {string}", async function (this: CustomWorld, percentage: string) {
    logger.info(`Step: Verifying profile completion percentage "${percentage}"`);
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.verifyProfileCompletion(percentage);
});

When("the user clicks on back to dashboard button", async function (this: CustomWorld) {
    logger.info("Step: Clicking back to dashboard button");
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.clickBackToDashboard();
});

When("the user uploads profile photo {string} from testdata", async function (this: CustomWorld, imageName: string) {
    logger.info(`Step: Uploading profile photo "${imageName}" from testdata directory`);
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    const filePath = `testdata/${imageName}`;
    await this.participantProfilePage.uploadProfilePhoto(filePath);
});

When("the user uploads profile photo from testdata", async function (this: CustomWorld) {
    const defaultImage = "testdata/1T2A9487.jpg.jpeg";
    logger.info(`Step: Uploading default profile photo "${defaultImage}" from testdata directory`);
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    await this.participantProfilePage.uploadProfilePhoto(defaultImage);
});

When("the user uploads resume {string} from testdata", async function (this: CustomWorld, resumeFileName: string) {
    logger.info(`Step: Uploading resume "${resumeFileName}" from testdata directory`);
    this.participantProfilePage = this.participantProfilePage || new ParticipantProfilePage(this.page);
    const filePath = `testdata/${resumeFileName}`;
    await this.participantProfilePage.uploadResume(filePath);
});

