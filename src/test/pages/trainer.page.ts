import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { logger } from "../utils/logger";

export class TrainerPage extends BasePage {

    readonly trainerDashboard: Locator;

    readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.trainerDashboard = page.locator("//*[@id='main-content']/div/div/div[1]/div/div[2]");
        this.loginErrorMessage = page.locator("//div[contains(text(),'Invalid email or password')]");
    }

    
    //Verify successful Trainer login
     
    async verifyTrainerLoginSuccess(): Promise<void> {

        logger.info("Verifying successful Trainer login");

        await this.trainerDashboard.waitFor({
            state: "visible",
            timeout: 15000
        });

        await expect(this.trainerDashboard).toBeVisible();

        logger.info("Trainer login successful");
    }

    //Verify invalid username/password error
    async verifyInvalidCredentials(): Promise<void> {

    logger.info(
        "Verifying invalid email or password message"
    );

    await this.loginErrorMessage.waitFor({
        state: "visible",
        timeout: 10000
    });

    const message = await this.loginErrorMessage.textContent();

    logger.info(
        `Login error message: ${message?.trim()}`
    );

    expect(message?.trim()).toContain("Invalid email or password");

    logger.info("Invalid credentials validation passed");
}


    //Verify required validation for empty username/password
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
}

export default TrainerPage;