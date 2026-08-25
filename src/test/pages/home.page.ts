import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { ENV } from "../utils/envReader";

export class HomePage extends BasePage {
    // Header & Hero Elements
    readonly logoBar: Locator;
    readonly logoText: Locator;
    readonly heroTitle: Locator;
    readonly heroSubtitle: Locator;

    // Role Selection Tabs
    readonly adminRoleBtn: Locator;
    readonly trainerRoleBtn: Locator;
    readonly learnerRoleBtn: Locator;

    // Login Form Elements
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly passwordToggleBtn: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly forgotPasswordLink: Locator;
    readonly signInBtn: Locator;

    // Footer & Navigation Links
    readonly signUpParticipantLink: Locator;

    constructor(page: Page) {
        super(page);

        // Header & Hero Locators based on DOM
        this.logoBar = page.locator(".auth-logo-bar");
        this.logoText = page.locator(".auth-logo-text");
        this.heroTitle = page.locator(".auth-hero-title");
        this.heroSubtitle = page.locator(".auth-hero-subtitle");

        // Role Selector Locators
        this.adminRoleBtn = page.locator("button.auth-role-btn:has-text('Admin')");
        this.trainerRoleBtn = page.locator("button.auth-role-btn:has-text('Trainer')");
        this.learnerRoleBtn = page.locator("button.auth-role-btn:has-text('Learner')");

        // Form Field Locators
        this.emailInput = page.locator("#login-email");
        this.passwordInput = page.locator("#login-password");
        this.passwordToggleBtn = page.locator("button.auth-password-toggle");
        this.rememberMeCheckbox = page.locator(".auth-form-options input.auth-checkbox");
        this.forgotPasswordLink = page.locator("button.auth-forgot-link");
        this.signInBtn = page.locator("button.auth-submit-btn");

        // Footer Registration Link
        this.signUpParticipantLink = page.locator("a.auth-footer-link, a[href='/register'], a:has-text('Sign up as Participant')");
    }

    /**
     * Navigate to Application Home / Sign In page
     */
    async navigate(): Promise<void> {
        await this.navigateTo(ENV.BASE_URL);
    }

    /**
     * Click Admin Role Tab
     */
    async clickAdminRole(): Promise<void> {
        await this.click(this.adminRoleBtn, "Admin Role Tab");
    }

    /**
     * Click Trainer Role Tab
     */
    async clickTrainerRole(): Promise<void> {
        await this.click(this.trainerRoleBtn, "Trainer Role Tab");
    }

    /**
     * Click Learner Role Tab
     */
    async clickLearnerRole(): Promise<void> {
        await this.click(this.learnerRoleBtn, "Learner Role Tab");
    }

    /**
     * Enter Email or Username
     */
    async enterEmail(email: string): Promise<void> {
        await this.sendKeys(this.emailInput, email, "Email / Username");
    }

    /**
     * Enter Password
     */
    async enterPassword(password: string): Promise<void> {
        await this.sendKeys(this.passwordInput, password, "Password");
    }

    /**
     * Toggle Remember Me Checkbox
     */
    async toggleRememberMe(check: boolean = true): Promise<void> {
        if (check) {
            await this.check(this.rememberMeCheckbox, "Remember Me Checkbox");
        } else {
            await this.uncheck(this.rememberMeCheckbox, "Remember Me Checkbox");
        }
    }

    /**
     * Click Submit / Sign In Button
     */
    async clickSignIn(): Promise<void> {
        await this.click(this.signInBtn, "Sign In Button");
    }

    /**
     * Click Sign up as Participant Link
     */
    async clickSignUpAsParticipant(): Promise<void> {
        await this.click(this.signUpParticipantLink, "'Sign up as Participant' Link");
        await this.page.waitForLoadState("domcontentloaded");
    }

    /**
     * Check if Learner role is actively selected
     */
    async isLearnerRoleActive(): Promise<boolean> {
        const ariaSelected = await this.learnerRoleBtn.getAttribute("aria-selected");
        return ariaSelected === "true";
    }
}

export default HomePage;
