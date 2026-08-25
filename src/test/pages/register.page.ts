import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { ENV } from "../utils/envReader";
import { logger } from "../utils/logger";

export class RegisterPage extends BasePage {
    // Registration Form Inputs
    readonly fullNameInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;

    // Terms and Conditions & Submit Button
    readonly termsCheckbox: Locator;
    readonly submitBtn: Locator;

    // Success & Error Locators
    readonly successBanner: Locator;
    readonly errorMessage: Locator;
    readonly passwordMismatchError: Locator;
    readonly termsError: Locator;
    readonly redirectingMessage: Locator;
    readonly signInLink: Locator;

    constructor(page: Page) {
        super(page);

        // Locators matching the WaveInit registration page UI
        this.fullNameInput = page.locator("input[placeholder*='John Doe' i], input[placeholder*='name' i], #name, #fullName, input[name='name'], input[name='fullName']");
        this.firstNameInput = page.locator("input[placeholder*='first' i], #first-name, #firstName, input[name='firstName'], input[name='first_name']");
        this.lastNameInput = page.locator("input[placeholder*='last' i], #last-name, #lastName, input[name='lastName'], input[name='last_name']");
        this.emailInput = page.locator("input[placeholder*='example.com' i], input[placeholder*='email' i], input[type='email'], #email, input[name='email']");
        this.phoneNumberInput = page.locator("input[placeholder*='9876543210' i], input[placeholder*='phone' i], input[placeholder*='mobile' i], input[type='tel'], #phone, #number, input[name='phone'], input[name='number']");
        this.passwordInput = page.locator("input[placeholder*='Minimum 6' i], input[placeholder*='password' i], #password").first();
        this.confirmPasswordInput = page.locator("input[placeholder*='Re-enter' i], input[placeholder*='confirm' i], #confirmPassword, #confirm-password").or(page.locator("input[type='password']").nth(1));

        // Terms & Action Buttons
        this.termsCheckbox = page.locator("input[type='checkbox'], input.auth-checkbox, #terms");
        this.submitBtn = page.locator("button:has-text('Create Account'), button.auth-submit-btn, button[type='submit']");

        // Success & Error Banners
        this.successBanner = page.locator("text=/Registration submitted successfully/i");
        this.errorMessage = page.locator("text=/An account with this email/i").or(page.locator("div:has-text('already exists'), div:has-text('already registered')")).first();
        this.passwordMismatchError = page.locator("text=/Passwords do not match/i").first();
        this.termsError = page.locator("text=/You must agree to the terms/i").first();
        this.redirectingMessage = page.locator("text=/Redirecting to login/i");
        this.signInLink = page.locator("a[href='/login'], a:has-text('Sign in' i)");
    }

    /**
     * Navigate directly to Registration Page
     */
    async navigate(): Promise<void> {
        const registerUrl = `${ENV.BASE_URL.replace(/\/$/, "")}/register`;
        await this.navigateTo(registerUrl);
    }

    /**
     * Enter Full Name
     */
    async enterFullName(fullName: string): Promise<void> {
        await this.sendKeys(this.fullNameInput, fullName, "Full Name");
    }

    /**
     * Enter First Name (or Full Name if single field)
     */
    async enterFirstName(firstName: string): Promise<void> {
        await this.sendKeys(this.fullNameInput.or(this.firstNameInput), firstName, "First Name");
    }

    /**
     * Enter Last Name
     */
    async enterLastName(lastName: string): Promise<void> {
        if (await this.lastNameInput.isVisible()) {
            await this.sendKeys(this.lastNameInput, lastName, "Last Name");
        }
    }

    /**
     * Enter Email Address
     */
    async enterEmail(email: string): Promise<void> {
        await this.sendKeys(this.emailInput, email, "Email Address");
    }

    /**
     * Enter Phone / Mobile Number
     */
    async enterPhoneNumber(number: string): Promise<void> {
        await this.sendKeys(this.phoneNumberInput, number, "Phone Number");
    }

    /**
     * Enter Password
     */
    async enterPassword(password: string): Promise<void> {
        await this.sendKeys(this.passwordInput, password, "Password");
    }

    /**
     * Enter Confirm Password
     */
    async enterConfirmPassword(confirmPassword: string): Promise<void> {
        await this.sendKeys(this.confirmPasswordInput, confirmPassword, "Confirm Password");
    }

    /**
     * Fill all registration details exactly as provided (no transformation)
     */
    async enterExactDetails(
        firstName: string,
        lastName: string,
        email: string,
        number: string,
        password: string,
        confirmPassword: string
    ): Promise<void> {
        logger.info("Waiting for Registration form input fields to become visible...");
        const nameField = this.fullNameInput.or(this.firstNameInput);
        await nameField.waitFor({ state: "visible", timeout: 15000 });

        const isFullName = await this.fullNameInput.isVisible();
        if (isFullName) {
            const fullName = `${firstName} ${lastName}`.trim();
            await this.enterFullName(fullName);
        } else {
            await this.sendKeys(this.firstNameInput, firstName, "First Name");
            await this.sendKeys(this.lastNameInput, lastName, "Last Name");
        }

        await this.enterEmail(email);
        await this.enterPhoneNumber(number);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
    }

    /**
     * Fill all registration details in one call
     */
    async enterValidDetails(
        firstName: string,
        lastName: string,
        email: string,
        number: string,
        password: string,
        confirmPassword: string
    ): Promise<void> {
        await this.enterExactDetails(firstName, lastName, email, number, password, confirmPassword);
    }

    /**
     * Check Terms and Conditions checkbox
     */
    async acceptTerms(): Promise<void> {
        await this.check(this.termsCheckbox, "Terms of Service Checkbox");
    }

    /**
     * Uncheck / do not accept Terms and Conditions checkbox
     */
    async uncheckTerms(): Promise<void> {
        await this.uncheck(this.termsCheckbox, "Terms of Service Checkbox");
    }

    /**
     * Submit Registration Form
     */
    async submitForm(): Promise<void> {
        await this.click(this.submitBtn, "'Create Account' Button");
    }

    /**
     * Get Success Message Text
     */
    async getSuccessMessageText(): Promise<string> {
        await this.successBanner.waitFor({ state: "visible", timeout: 10000 });
        const text = (await this.successBanner.textContent()) || "";
        logger.info(`Success message captured: "${text.trim()}"`);
        return text.trim();
    }

    /**
     * Assert registration success banner is visible and contains expected text
     */
    async assertRegistrationSuccess(expectedPartialText: string = "Registration submitted successfully"): Promise<void> {
        logger.info(`Asserting registration success banner contains: "${expectedPartialText}"`);
        await this.successBanner.waitFor({ state: "visible", timeout: 10000 });
        const actualText = await this.getSuccessMessageText();
        expect(actualText).toContain(expectedPartialText);
        logger.info("Registration success assertion passed!");
    }

    /**
     * Assert error message is displayed when registering with duplicate email
     */
    async assertErrorMessage(expectedMessage: string): Promise<void> {
        logger.info(`Asserting error banner is visible and contains: "${expectedMessage}"`);
        await this.errorMessage.waitFor({ state: "visible", timeout: 10000 });
        const actualText = (await this.errorMessage.textContent()) || "";
        logger.info(`Captured error message text: "${actualText.trim()}"`);
        expect(actualText.toLowerCase()).toContain(expectedMessage.toLowerCase());
        logger.info("Error message assertion passed!");
    }

    /**
     * Assert password mismatch error is displayed
     */
    async assertPasswordMismatchError(expectedMessage: string = "Passwords do not match"): Promise<void> {
        logger.info(`Asserting password mismatch error contains: "${expectedMessage}"`);
        await this.passwordMismatchError.waitFor({ state: "visible", timeout: 10000 });
        const actualText = (await this.passwordMismatchError.textContent()) || "";
        logger.info(`Captured password mismatch text: "${actualText.trim()}"`);
        expect(actualText.toLowerCase()).toContain(expectedMessage.toLowerCase());
        logger.info("Password mismatch assertion passed!");
    }

    /**
     * Assert terms unchecked error is displayed
     */
    async assertTermsError(expectedMessage: string = "You must agree to the terms"): Promise<void> {
        logger.info(`Asserting terms error contains: "${expectedMessage}"`);
        await this.termsError.waitFor({ state: "visible", timeout: 10000 });
        const actualText = (await this.termsError.textContent()) || "";
        logger.info(`Captured terms error text: "${actualText.trim()}"`);
        expect(actualText.toLowerCase()).toContain(expectedMessage.toLowerCase());
        logger.info("Terms error assertion passed!");
    }
}

export default RegisterPage;
