import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../utils/logger";

export class TrainerProfilePage extends BasePage {

    // Profile Menu
    readonly profileLogo: Locator;
    readonly myProfile: Locator;

    // Skills Section
    readonly skillsHeading: Locator;
    readonly addSkillButton: Locator;

    // Add Skill Form
    readonly skillInput: Locator;
    readonly addSkillSubmitButton: Locator;

    // Skill displayed in profile
    readonly skillList: Locator;

    constructor(page: Page) {
        super(page);

        // Profile Logo
        this.profileLogo = page.locator(
            "//*[@id='root']/div[1]/aside/div[2]/div/button/div[2]/div[1]"
        );

        // My Profile menu option
        this.myProfile = page.locator("//*[@id='root']/div[1]/aside/div[2]/div/div[2]/button[1]");

        // Skills heading
        this.skillsHeading = page.locator("//*[@id='main-content']/div/div/div[4]/div[2]/div[1]");

        // Add button beside Skills
        this.addSkillButton = page.locator("//*[@id='main-content']/div/div/div[4]/div[2]/div[1]/div[1]/button");

        // Skill input field
        this.skillInput = page.locator(
            "//*[@id='main-content']/div/div/div[5]/div/div[2]/form/input"
        );

        // Add button inside Add Skill form
        this.addSkillSubmitButton = page.locator(
            "//*[@id='main-content']/div/div/div[5]/div/div[3]/button[2]"
        );

        // Skill displayed in profile
        this.skillList = page.locator(
            "//*[@id='main-content']/div/div/div[4]/div[2]/div[1]/div[2]/div/span"
        );
    }


    /**
     * Click Trainer profile logo
     */
    async openProfileMenu(): Promise<void> {

        logger.info("Clicking Trainer profile logo");

        await this.profileLogo.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.profileLogo.click();

        logger.info("Trainer profile menu opened");
    }


    /**
     * Click My Profile
     */
    async clickMyProfile(): Promise<void> {

        logger.info("Clicking My Profile");

        await this.myProfile.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.myProfile.click();

        await this.page.waitForLoadState(
            "domcontentloaded"
        );

        logger.info(
            "My Profile clicked successfully"
        );
    }


    /**
     * Verify Trainer Profile page
     */
    async verifyProfilePage(): Promise<void> {

        logger.info(
            "Verifying Trainer Profile page"
        );

        await this.skillsHeading.waitFor({
            state: "visible",
            timeout: 15000
        });

        await expect(
            this.skillsHeading,
            "Skills heading is not displayed on Trainer Profile page"
        ).toBeVisible();

        logger.info(
            "Trainer Profile page loaded successfully"
        );
    }


    /**
     * Click Add button beside Skills
     */
    async clickAddSkill(): Promise<void> {

        logger.info(
            "Clicking Add Skill button"
        );

        await this.addSkillButton.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.addSkillButton.click();

        logger.info(
            "Add Skill form opened"
        );
    }


    /**
     * Enter Skill
     */
    async enterSkill(
        skill: string
    ): Promise<void> {

        logger.info(
            `Entering skill: ${skill}`
        );

        await this.skillInput.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.skillInput.fill(
            skill
        );

        logger.info(
            `Skill entered successfully: ${skill}`
        );
    }


    /**
     * Click Add button inside Add Skill form
     */
    async clickAddSkillSubmit(): Promise<void> {

        logger.info(
            "Clicking Add button to save skill"
        );

        await this.addSkillSubmitButton.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.addSkillSubmitButton.click();

        logger.info(
            "Add Skill submit button clicked"
        );
    }


    /**
     * Verify Skill is displayed
     */
    async verifySkillAdded(
        skill: string
    ): Promise<void> {

        logger.info(
            `Verifying skill "${skill}" is displayed`
        );

        await this.skillList.waitFor({
            state: "visible",
            timeout: 10000
        });

        const skillElement =
            this.skillList.filter({
                hasText: skill
            }).first();

        await expect(
            skillElement,
            `Skill "${skill}" was not displayed in Trainer Profile`
        ).toBeVisible({
            timeout: 10000
        });

        logger.info(
            `Skill "${skill}" successfully displayed in Trainer Profile`
        );
    }
}

export default TrainerProfilePage;