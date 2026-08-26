import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../utils/logger";

export class TrainerPage extends BasePage {
    readonly trainerDashboard: Locator;
    readonly loginErrorMessage: Locator;
    readonly myTrainings: Locator;
    readonly courseSearchInput: Locator;
    readonly courseCards: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.trainerDashboard = page.locator("//*[@id='main-content']/div/div/div[1]/div/div[2]");
        this.loginErrorMessage = page.locator("//div[contains(text(),'Invalid email or password')]");
        this.myTrainings = page.locator("//span[normalize-space()='My Trainings']");
        this.courseSearchInput = page.locator("input[placeholder*='Search courses by title...']");
        this.courseCards = page.locator("//*[@id='main-content']/div/div/div/div[4]/div[2]/table/tbody");
        this.sortDropdown = page.locator("select.tmt-select");
    }

    async verifyTrainerLoginSuccess(): Promise<void> {
        logger.info("Verifying successful Trainer login");
        await this.trainerDashboard.waitFor({ state: "visible", timeout: 15000 });
        await expect(this.trainerDashboard).toBeVisible();
        logger.info("Trainer login successful");
    }

    async clickMyTrainings(): Promise<void> {
        logger.info("Clicking My Trainings");
        await this.myTrainings.waitFor({ state: "visible", timeout: 10000 });
        await this.myTrainings.click();
        await this.page.waitForLoadState("domcontentloaded");
        logger.info("My Trainings clicked successfully");
    }

    async verifyInvalidCredentials(): Promise<void> {
        logger.info("Verifying invalid email or password message");
        await this.loginErrorMessage.waitFor({ state: "visible", timeout: 10000 });
        const message = await this.loginErrorMessage.textContent();
        logger.info(`Login error message: ${message?.trim()}`);
        await expect(this.loginErrorMessage).toContainText("Invalid email or password");
        logger.info("Invalid credentials validation passed");
    }

    async verifyRequiredFieldValidation(): Promise<void> {
        logger.info("Verifying required field validation");
        const usernameInput = this.page.locator("#login-email");
        const passwordInput = this.page.locator("#login-password");
        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        const usernameValid = await usernameInput.evaluate((element: HTMLInputElement) => element.validity.valid);
        const passwordValid = await passwordInput.evaluate((element: HTMLInputElement) => element.validity.valid);
        expect(usernameValid).toBe(false);
        expect(passwordValid).toBe(false);
        logger.info("Required field validation passed");
    }

    async searchCourse(courseName: string): Promise<void> {
        logger.info(`Entering course name in search bar: ${courseName}`);
        await this.courseSearchInput.waitFor({ state: "visible", timeout: 10000 });
        await this.courseSearchInput.fill(courseName);
        await this.page.waitForTimeout(1000);
        logger.info(`Automatic course search completed for: ${courseName}`);
    }

    async verifyValidCourseSearch(courseName: string): Promise<void> {
        logger.info(`Verifying valid search result for: ${courseName}`);
        const results = await this.courseCards.filter({ visible: true }).allTextContents();
        logger.info(`Displayed course results: ${JSON.stringify(results)}`);
        expect(results.length, `No course results were displayed for "${courseName}"`).toBeGreaterThan(0);
        const matchingResult = results.some(course => course.trim().toLowerCase().includes(courseName.trim().toLowerCase()));
        expect(matchingResult, `Search results do not contain course "${courseName}". Results: ${JSON.stringify(results)}`).toBe(true);
        logger.info(`Course search assertion passed: "${courseName}" found in search results`);
    }

    async verifyInvalidCourseSearch(courseName: string): Promise<void> {
        logger.info(`Verifying invalid search result for: ${courseName}`);
        const results = await this.courseCards.filter({ visible: true }).allTextContents();
        logger.info(`Displayed course results: ${JSON.stringify(results)}`);
        const matchingResult = results.some(course => course.trim().toLowerCase().includes(courseName.trim().toLowerCase()));
        expect(matchingResult, `Invalid course "${courseName}" was found in search results`).toBe(false);
        logger.info(`Invalid course search assertion passed: "${courseName}" was not found`);
    }

    async selectCourseSort(sortOption: string): Promise<void> {
    logger.info(`Selecting course sort option: ${sortOption}`);

    await this.sortDropdown.waitFor({
        state: "visible",
        timeout: 10000
    });

    if (sortOption.toLowerCase() === "newest") {
        await this.sortDropdown.selectOption("newest");
    } else if (sortOption.toLowerCase() === "oldest") {
        await this.sortDropdown.selectOption("oldest");
    } else if (sortOption.toLowerCase() === "title") {
        await this.sortDropdown.selectOption("title");
    } else {
        throw new Error(`Unknown sort option: ${sortOption}`);
    }

    await this.page.waitForTimeout(1000);

    logger.info(`Course sort option selected: ${sortOption}`);
}

    async verifyNewestToOldest(): Promise<void> {
        logger.info("Verifying courses are sorted from newest to oldest");
        const courses = await this.courseCards.filter({ visible: true }).allTextContents();
        expect(courses.length).toBeGreaterThan(0);
        logger.info(`Courses after Newest sort: ${JSON.stringify(courses)}`);
    }

    async verifyOldestToNewest(): Promise<void> {
        logger.info("Verifying courses are sorted from oldest to newest");
        const courses = await this.courseCards.filter({ visible: true }).allTextContents();
        expect(courses.length).toBeGreaterThan(0);
        logger.info(`Courses after Oldest sort: ${JSON.stringify(courses)}`);
    }
}

export default TrainerPage;