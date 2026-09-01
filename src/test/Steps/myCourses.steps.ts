import { When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { MyCoursesPage } from "../pages/myCourses.page";
import { logger } from "../utils/logger";
import myCoursesData from "../../../testdata/myCoursesData.json";

When("the user navigates to {string} section and selects {string} course", async function (this: CustomWorld, _section: string, courseName: string) {
    logger.info(`Step: Navigating to section and selecting course "${courseName}"`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.navigateToCourse(courseName);
});

When("the user selects course {string} from the sidebar", async function (this: CustomWorld, courseName: string) {
    logger.info(`Step: Selecting course "${courseName}" from sidebar`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.navigateToCourse(courseName);
});

Then("the user should see the course details page with title {string}", async function (this: CustomWorld, expectedTitle: string) {
    logger.info(`Step: Verifying course details page title: "${expectedTitle}"`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.verifyCourseTitle(expectedTitle);
});

When("the user clicks on {string} menu tab", async function (this: CustomWorld, tabName: string) {
    logger.info(`Step: Clicking on course menu tab "${tabName}"`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.clickMenuTab(tabName);
});

Then("the user should see the {string} tab is active", async function (this: CustomWorld, tabName: string) {
    logger.info(`Step: Verifying that menu tab "${tabName}" is active`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.verifyTabIsActive(tabName);
});

Then("the user should see the course curriculum banner {string}", async function (this: CustomWorld, bannerHeader: string) {
    logger.info(`Step: Verifying curriculum banner: "${bannerHeader}"`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.verifyStructureContent(bannerHeader);
});

Then("the user should see the {string} button", async function (this: CustomWorld, buttonName: string) {
    logger.info(`Step: Verifying button "${buttonName}" is visible`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    if (buttonName.toLowerCase().includes("start learning")) {
        await this.myCoursesPage.verifyStartLearningButton();
    }
});

Then("the user should see the course overview and instructor details {string}", async function (this: CustomWorld, instructorName: string) {
    logger.info(`Step: Verifying course overview and instructor details for "${instructorName}"`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.verifyStructureContent(myCoursesData.structureSection.bannerTitle, instructorName);
});

Then("the user should see the {string} tab content loaded properly", async function (this: CustomWorld, tabName: string) {
    logger.info(`Step: Verifying tab content loaded for "${tabName}"`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.verifyTabContentLoaded(tabName);
});

Then("the user should see all the course menu tabs:", async function (this: CustomWorld, dataTable: DataTable) {
    logger.info("Step: Verifying existence of all course menu tabs from DataTable");
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    const expectedTabs = dataTable.raw().flat();
    await this.myCoursesPage.verifyAllMenuTabsExist(expectedTabs);
});

Then("the user should see course stats with lessons {string}, quizzes {string}, students {string}, and coding {string}", async function (
    this: CustomWorld,
    lessons: string,
    quizzes: string,
    students: string,
    coding: string
) {
    logger.info(`Step: Verifying hero stats - Lessons: ${lessons}, Quizzes: ${quizzes}, Students: ${students}, Coding: ${coding}`);
    this.myCoursesPage = this.myCoursesPage || new MyCoursesPage(this.page);
    await this.myCoursesPage.verifyHeroStats(lessons, quizzes, students, coding);
});
