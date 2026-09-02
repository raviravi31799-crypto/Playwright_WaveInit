import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../utils/logger";

export class TrainerProfilePage extends BasePage {

    // ==================================================
    // PROFILE MENU
    // ==================================================

    readonly profileLogo: Locator;
    readonly myProfile: Locator;


    // ==================================================
    // SKILLS SECTION
    // ==================================================

    readonly skillsHeading: Locator;
    readonly addSkillButton: Locator;

    // Add Skill Form
    readonly skillInput: Locator;
    readonly addSkillSubmitButton: Locator;

    // Skill displayed in profile
    readonly skillList: Locator;


    // ==================================================
    // EXPERIENCE SECTION
    // ==================================================

    readonly addExperienceButton: Locator;

    // Add Experience Form
    readonly companyNameInput: Locator;
    readonly roleInput: Locator;
    readonly startDateInput: Locator;
    readonly addExperienceSubmitButton: Locator;

    // Required validation messages
    readonly companyNameRequiredMessage: Locator;
    readonly roleRequiredMessage: Locator;
    readonly startDateRequiredMessage: Locator;


    constructor(page: Page) {

        super(page);


        // ==================================================
        // PROFILE MENU
        // ==================================================

        this.profileLogo = page.locator(
            "//*[@id='root']/div[1]/aside/div[2]/div/button/div[2]/div[1]"
        );

        this.myProfile = page.locator(
            "//*[@id='root']/div[1]/aside/div[2]/div/div[2]/button[1]"
        );


        // ==================================================
        // SKILLS SECTION
        // ==================================================

        this.skillsHeading = page.locator(
            "//*[@id='main-content']/div/div/div[4]/div[2]/div[1]"
        );

        this.addSkillButton = page.locator(
            "//*[@id='main-content']/div/div/div[4]/div[2]/div[1]/div[1]/button"
        );

        this.skillInput = page.locator(
            "//*[@id='main-content']/div/div/div[5]/div/div[2]/form/input"
        );

        this.addSkillSubmitButton = page.locator(
            "//*[@id='main-content']/div/div/div[5]/div/div[3]/button[2]"
        );

        this.skillList = page.locator(
            "//*[@id='main-content']/div/div/div[4]/div[2]/div[1]/div[2]/div/span"
        );


        // ==================================================
        // EXPERIENCE
        // ==================================================

        this.addExperienceButton = page.locator(
            "//*[@id='main-content']/div/div/div[4]/div[2]/div[2]/div[1]/div[2]/button[1]"
        );


        // ==================================================
        // COMPANY NAME
        // ==================================================

        this.companyNameInput = page.locator(
            'input[placeholder="e.g. Wave Init Solutions"]'
        );

        this.companyNameRequiredMessage =
            this.companyNameInput.locator(
                "xpath=following-sibling::div[contains(@class,'pfd-error-msg')]"
            );


        // ==================================================
        // ROLE
        // ==================================================

        this.roleInput = page.locator(
            'input[placeholder="e.g. Trainee Software Engineer"]'
        );

        this.roleRequiredMessage =
            this.roleInput.locator(
                "xpath=following-sibling::div[contains(@class,'pfd-error-msg')]"
            );


        // ==================================================
        // START DATE
        // ==================================================

        this.startDateInput = page.locator(
            'input[type="date"]'
        ).first();

        this.startDateRequiredMessage =
            this.startDateInput.locator(
                "xpath=following-sibling::div[contains(@class,'pfd-error-msg')]"
            );


        // ==================================================
        // ADD EXPERIENCE SUBMIT BUTTON
        // ==================================================

        this.addExperienceSubmitButton = page.locator(
            "//*[@id='main-content']/div/div/div[5]/div/div[3]/button[2]"
        );
    }


    // ==================================================
    // PROFILE METHODS
    // ==================================================

    /**
     * Click Trainer profile logo
     */
    async openProfileMenu(): Promise<void> {

        logger.info(
            "Clicking Trainer profile logo"
        );

        await this.profileLogo.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.profileLogo.click();

        logger.info(
            "Trainer profile menu opened"
        );
    }


    /**
     * Click My Profile
     */
    async clickMyProfile(): Promise<void> {

        logger.info(
            "Clicking My Profile"
        );

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


    // ==================================================
    // ADD SKILL
    // ==================================================

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


    // ==================================================
    // ADD EXPERIENCE
    // ==================================================

    /**
     * Click Add Experience
     */
    async clickAddExperience(): Promise<void> {

        logger.info(
            "Clicking Add Experience button"
        );

        await this.addExperienceButton.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.addExperienceButton.click();

        logger.info(
            "Add Experience form opened"
        );
    }


    /**
     * Enter Company Name
     *
     * Empty value is intentionally ignored
     * for invalid test cases.
     */
    async enterCompanyName(
        companyName: string
    ): Promise<void> {

        logger.info(
            `Entering company name: "${companyName}"`
        );

        await this.companyNameInput.waitFor({
            state: "visible",
            timeout: 10000
        });

        if (companyName.trim() === "") {

            logger.info(
                "Company Name intentionally left empty"
            );

            return;
        }

        await this.companyNameInput.fill(
            companyName
        );

        logger.info(
            `Company Name entered successfully: "${companyName}"`
        );
    }


    /**
     * Enter Role
     *
     * Empty value is intentionally ignored
     * for invalid test cases.
     */
    async enterRole(
        role: string
    ): Promise<void> {

        logger.info(
            `Entering role: "${role}"`
        );

        await this.roleInput.waitFor({
            state: "visible",
            timeout: 10000
        });

        if (role.trim() === "") {

            logger.info(
                "Role intentionally left empty"
            );

            return;
        }

        await this.roleInput.fill(role);

        logger.info(
            `Role entered successfully: "${role}"`
        );
    }


    /**
     * Enter Start Date
     *
     * Empty value is intentionally ignored
     * for invalid test cases.
     */
    async enterStartDate(
        startDate: string
    ): Promise<void> {

        logger.info(
            `Entering start date: "${startDate}"`
        );

        await this.startDateInput.waitFor({
            state: "visible",
            timeout: 10000
        });

        if (startDate.trim() === "") {

            logger.info(
                "Start Date intentionally left empty"
            );

            return;
        }

        await this.startDateInput.fill(
            startDate
        );

        logger.info(
            `Start Date entered successfully: "${startDate}"`
        );
    }


    /**
     * Click Add Experience button inside form
     */
    async clickAddExperienceSubmit(): Promise<void> {

        logger.info(
            "Clicking Add Experience submit button"
        );

        await this.addExperienceSubmitButton.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.addExperienceSubmitButton.click();

        logger.info(
            "Add Experience submit button clicked"
        );
    }


    // ==================================================
    // VERIFY EXPERIENCE VALIDATION
    // ==================================================

    /**
     * Verify required validation message
     * for missing mandatory fields.
     */
    async verifyExperienceValidation(
        missingField: string
    ): Promise<void> {

        logger.info(
            `Verifying required validation message for "${missingField}"`
        );


        // ==========================================
        // COMPANY NAME
        // ==========================================

        if (missingField === "Company Name") {

            await expect(
                this.companyNameRequiredMessage,
                "Company Name required validation message is not displayed"
            ).toBeVisible({
                timeout: 10000
            });

            await expect(
                this.companyNameRequiredMessage
            ).toHaveText(
                "Company name is required."
            );

            logger.info(
                "Company Name required validation verified successfully"
            );

            return;
        }


        // ==========================================
        // ROLE
        // ==========================================

        if (missingField === "Role") {

            await expect(
                this.roleRequiredMessage,
                "Role required validation message is not displayed"
            ).toBeVisible({
                timeout: 10000
            });

            await expect(
                this.roleRequiredMessage
            ).toHaveText(
                "Role / Title is required."
            );

            logger.info(
                "Role required validation verified successfully"
            );

            return;
        }


        // ==========================================
        // START DATE
        // ==========================================

        if (missingField === "Start Date") {

            await expect(
                this.startDateRequiredMessage,
                "Start Date required validation message is not displayed"
            ).toBeVisible({
                timeout: 10000
            });

            await expect(
                this.startDateRequiredMessage
            ).toHaveText(
                "Start date is required."
            );

            logger.info(
                "Start Date required validation verified successfully"
            );

            return;
        }


        // ==========================================
        // UNKNOWN FIELD
        // ==========================================

        throw new Error(
            `Unknown validation field: ${missingField}`
        );
    }
}


export default TrainerProfilePage;