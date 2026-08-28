import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../utils/logger";
import { ParticipantLoginCsvData } from "../utils/csvReader";

export class ParticipantPage extends BasePage {
    readonly welcomeTitle: Locator;
    readonly dashboardPage: Locator;
    readonly errorMessage: Locator;
    readonly forgotPasswordLink: Locator;
    readonly forgotPasswordHeader: Locator;
    readonly forgotPasswordSubtitle: Locator;
    readonly forgotEmailInput: Locator;
    readonly sendVerificationCodeBtn: Locator;
    readonly backToLoginBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.welcomeTitle = page.locator("h1.tdb-header-title");
        this.dashboardPage = page.locator(".tdb-dashboard-page");
        this.errorMessage = page.locator("//div[contains(text(),'Invalid email or password')]");
        this.forgotPasswordLink = page.locator("button.auth-forgot-link, a.auth-forgot-link, button:has-text('Forgot password?')");
        this.forgotPasswordHeader = page.locator(".auth-card-header h2.auth-card-title, h2:has-text('Forgot Password?')");
        this.forgotPasswordSubtitle = page.locator(".auth-card-header p.auth-card-subtitle");
        this.forgotEmailInput = page.locator("#forgot-email");
        this.sendVerificationCodeBtn = page.locator("button.auth-submit-btn:has-text('Send Verification Code')");
        this.backToLoginBtn = page.locator("button:has-text('Back to Login')");
    }

    /**
     * Enter participant email and password
     */
    async enterParticipantCredentials(email: string, password: string): Promise<void> {
        logger.info(`Entering participant credentials - Email: ${email}`);
        const emailInput = this.page.locator("#login-email");
        const passwordInput = this.page.locator("#login-password");

        await emailInput.clear();
        await passwordInput.clear();

        if (email) {
            await this.sendKeys(emailInput, email, "Participant Email");
        }
        if (password) {
            await this.sendKeys(passwordInput, password, "Participant Password");
        }
    }

    /**
     * Click sign in button
     */
     async clickSignIn(): Promise<void> {
         logger.info("Clicking sign in as learner button");
         const signInBtn = this.page.locator("button.auth-submit-btn");
         await this.click(signInBtn, "Sign In Button");
     }

    /**
     * Click Forgot Password link
     */
    async clickForgotPassword(): Promise<void> {
        logger.info("Clicking Forgot password? link");
        await this.click(this.forgotPasswordLink, "Forgot Password Link");
    }

    /**
     * Verify forgot password header title
     */
    async verifyForgotPasswordHeader(expectedTitle: string): Promise<void> {
        logger.info(`Verifying forgot password header contains: "${expectedTitle}"`);
        await this.forgotPasswordHeader.waitFor({
            state: "visible",
            timeout: 10000
        });
        const actualText = await this.forgotPasswordHeader.textContent();
        logger.info(`Actual forgot password header: "${actualText?.trim()}"`);
        expect(actualText?.trim()).toContain(expectedTitle);
    }

    /**
     * Verify welcome message in participant dashboard
     */
    async verifyWelcomeMessage(expectedMessage: string): Promise<void> {
        logger.info(`Verifying welcome message in dashboard contains: "${expectedMessage}"`);
        await this.welcomeTitle.waitFor({
            state: "visible",
            timeout: 15000
        });
        const actualText = await this.welcomeTitle.textContent();
        logger.info(`Actual welcome message displayed: "${actualText?.trim()}"`);
        expect(actualText?.trim()).toContain(expectedMessage);
    }

    /**
     * Verify login error message (e.g. Invalid email or password toast)
     */
    async verifyErrorMessage(expectedError: string): Promise<void> {
        logger.info(`Verifying login error message contains: "${expectedError}"`);
        await this.errorMessage.waitFor({
            state: "visible",
            timeout: 10000
        });
        const message = await this.errorMessage.textContent();
        logger.info(`Actual login error message: "${message?.trim()}"`);
        expect(message?.trim()).toContain(expectedError);
    }

    /**
     * Assert browser HTML5 required field validation tooltip
     */
    async assertRequiredFieldValidation(expectedMessageSnippet: string = "fill"): Promise<string> {
        logger.info(`Asserting required field validation message containing: "${expectedMessageSnippet}"`);
        const emailInput = this.page.locator("#login-email");
        const passwordInput = this.page.locator("#login-password");

        const fields = [
            { name: "Email / Username", locator: emailInput },
            { name: "Password", locator: passwordInput }
        ];

        let invalidFieldName = "";
        let actualValidationMsg = "";

        for (const field of fields) {
            const isValid = await field.locator.evaluate((el: HTMLInputElement) => el.checkValidity()).catch(() => true);
            if (!isValid) {
                invalidFieldName = field.name;
                actualValidationMsg = await field.locator.evaluate((el: HTMLInputElement) => el.validationMessage).catch(() => "");
                break;
            }
        }

        logger.info(`Detected invalid field: "${invalidFieldName}" with message: "${actualValidationMsg}"`);
        expect(invalidFieldName, "Expected at least one field to fail HTML5 validation").not.toBe("");

        const actualLower = actualValidationMsg.toLowerCase();
        const expectedLower = expectedMessageSnippet.toLowerCase();

        // Normalize "fill in" / "fill out" across browser locales
        const isFillMatched = expectedLower.includes("fill") && actualLower.includes("fill");
        const matchesDirectly = actualLower.includes(expectedLower);

        expect(isFillMatched || matchesDirectly, `Validation message mismatch. Expected: "${expectedMessageSnippet}", Actual: "${actualValidationMsg}"`).toBe(true);

        return actualValidationMsg;
    }

    /**
     * Validate all participant login combinations from CSV
     */
    async validateAllLoginCombinationsFromCsv(records: ParticipantLoginCsvData[]): Promise<void> {
        logger.info(`Starting validation of ${records.length} CSV test records for Participant Login`);

        for (const record of records) {
            logger.info(`--- Executing CSV Record: [${record.testCaseId}] ${record.description} ---`);

            await this.enterParticipantCredentials(record.email || "", record.password || "");
            await this.clickSignIn();

            const expected = record.expectedValidation || "fill";
            await this.assertRequiredFieldValidation(expected);
            logger.info(`✓ Record [${record.testCaseId}] passed validation check!`);
        }
        logger.info(`All ${records.length} CSV records processed successfully!`);
    }
}

export default ParticipantPage;
