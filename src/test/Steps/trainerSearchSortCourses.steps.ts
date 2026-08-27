import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { logger } from "../utils/logger";

Given("the trainer logs in with valid credentials", async function (this: CustomWorld) {
    logger.info("Logging in as Trainer with valid credentials");
    await this.homePage.enterEmail("wavene20@gmail.com");
    await this.homePage.enterPassword("sriram123@");
    await this.homePage.clickSignIn();
    await this.trainerPage.verifyTrainerLoginSuccess();
    await this.trainerPage.clickMyTrainings();
    logger.info("Trainer login and My Trainings navigation completed successfully");
});

When("the trainer enters course name {string} in the search bar", async function (this: CustomWorld, courseName: string) {
    logger.info(`Trainer searching for course: ${courseName}`);
    await this.trainerPage.searchCourse(courseName);
});

Then("the course search result should contain {string} for {string} search", async function (this: CustomWorld, courseName: string, expectedResult: string) {
    logger.info(`Course: ${courseName}`);
    logger.info(`Expected search result: ${expectedResult}`);
    switch (expectedResult.toLowerCase()) {
        case "valid":
            await this.trainerPage.verifyValidCourseSearch(courseName);
            break;
        case "invalid":
            await this.trainerPage.verifyInvalidCourseSearch(courseName);
            break;
        default:
            throw new Error(`Unknown expected search result: ${expectedResult}`);
    }
});

When("the trainer selects {string} from the sort dropdown", async function (this: CustomWorld, sortOption: string) {
    logger.info(`Trainer selecting sort option: ${sortOption}`);
    await this.trainerPage.selectCourseSort(sortOption);
});

Then("the courses should be displayed from newest to oldest", async function (this: CustomWorld) {
    await this.trainerPage.verifyNewestToOldest();
});

Then("the courses should be displayed from oldest to newest", async function (this: CustomWorld) {
    await this.trainerPage.verifyOldestToNewest();
});