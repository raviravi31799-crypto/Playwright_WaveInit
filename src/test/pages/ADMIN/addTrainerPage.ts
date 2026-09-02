import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../utils/logger";

export class AddTrainerPage extends BasePage {

    readonly trainersMenu: Locator;
    readonly addTrainerBtn: Locator;

    // Create Trainer form fields
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly mobileInput: Locator;
    readonly departmentSelect: Locator;
    readonly designationSelect: Locator;
    readonly experienceSelect: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly resetBtn: Locator;
    readonly createTrainerBtn: Locator;
    readonly backToTrainersBtn: Locator;
    readonly searchTrainersInput: Locator;

    // Trainer list / row-level actions
    readonly selectAllCheckbox: Locator;

    // Delete confirmation dialog
    readonly confirmDeleteBtn: Locator;
    readonly cancelDeleteBtn: Locator;

    // Trainer details view
    readonly trainerDetailsPanel: Locator;

    // Stores the last message displayed by the application
    private lastAlertMessage: string | null = null;

    constructor(page: Page) {
        super(page);

        // Sidebar navigation
        this.trainersMenu = page.getByRole(
            "button",
            { name: "Trainers", exact: true }
        );

        // Add Trainer button on Trainers page
        this.addTrainerBtn = page.getByRole(
            "button",
            { name: "Add Trainer", exact: true }
        );

        // Create Trainer form
        this.fullNameInput = page.getByPlaceholder(
            "e.g. Sarah Johnson"
        );

        this.emailInput = page.getByPlaceholder(
            "trainer@company.com"
        );

        this.mobileInput = page.getByPlaceholder(
            /e\.g\.\s*\+91\s*98765\s*4321\s*0/i
        );

        this.departmentSelect = page
            .locator("select.reg-select")
            .nth(0);

        this.designationSelect = page
            .locator("select.reg-select")
            .nth(1);

        this.experienceSelect = page
            .locator("select.reg-select")
            .nth(2);

        this.passwordInput = page.getByPlaceholder(
            "Min. 8 characters"
        );

        this.confirmPasswordInput = page.getByPlaceholder(
            "Re-enter password"
        );

        this.resetBtn = page.getByRole(
            "button",
            { name: "Reset", exact: true }
        );

        this.createTrainerBtn = page.getByRole(
            "button",
            { name: "Create Trainer", exact: true }
        );

        // Shown on the Create Trainer form after submission
        this.backToTrainersBtn = page.getByRole(
            "button",
            { name: /back to trainers/i }
        );

        // Search box on the Trainers list page
        this.searchTrainersInput = page.getByPlaceholder(
            "Search trainers..."
        );

        // "Select All" checkbox lives in the table header (no visible label)
        this.selectAllCheckbox = page.locator(
            "table.reg-admin-table thead input[type='checkbox']"
        );

        // Delete confirmation dialog buttons
        this.confirmDeleteBtn = page.getByRole(
            "button",
            { name: /^(confirm|delete|yes)$/i }
        );

        this.cancelDeleteBtn = page.getByRole(
            "button",
            { name: /^(cancel|no)$/i }
        );

        // Trainer details panel/modal shown by the View action
        // (a plain div with no role="dialog" attribute)
        this.trainerDetailsPanel = page.locator(
            "div.tpm-modal"
        );
    }

    /**
     * Click "Back to Trainers" (shown on the Create Trainer form
     * after a trainer is successfully created)
     */
    async clickBackToTrainers(): Promise<void> {

        await this.click(
            this.backToTrainersBtn,
            "Back to Trainers Button"
        );
    }

    /**
     * Search the trainer list so a freshly created trainer
     * is visible/scoped before acting on its row
     */
    async searchTrainer(query: string): Promise<void> {

        await this.sendKeys(
            this.searchTrainersInput,
            query,
            "Search Trainers"
        );
    }

    /**
     * Locate the trainer row by the email that identifies it.
     * Uses a text filter (not getByRole) because a <tr> does not
     * get an accessible name from its content, so role-based
     * name matching on rows never resolves.
     */
    getTrainerRow(email: string): Locator {

        return this.page
            .locator("table.reg-admin-table tbody tr")
            .filter({ hasText: email });
    }

    /**
     * Click on "Trainers" in the sidebar navigation
     */
    async clickTrainersMenu(): Promise<void> {
        await this.click(
            this.trainersMenu,
            "Trainers Sidebar Link"
        );
    }

    /**
     * Click on "Add Trainer" button
     */
    async clickAddTrainer(): Promise<void> {
        await this.click(
            this.addTrainerBtn,
            "Add Trainer Button"
        );
    }

    /**
     * Enter Full Name
     */
    async enterFullName(fullName: string): Promise<void> {
        await this.sendKeys(
            this.fullNameInput,
            fullName,
            "Full Name"
        );
    }

    /**
     * Enter Email
     */
    async enterEmail(email: string): Promise<void> {
        await this.sendKeys(
            this.emailInput,
            email,
            "Email Address"
        );
    }

    /**
     * Enter Mobile Number
     */
    async enterMobile(mobile: string): Promise<void> {
        await this.sendKeys(
            this.mobileInput,
            mobile,
            "Mobile Number"
        );
    }

    /**
     * Select dropdown option
     */
    async selectDropdownOption(
        locator: Locator,
        label?: string,
        elementName = "Dropdown"
    ): Promise<void> {

        await locator.waitFor({
            state: "visible"
        });

        if (label) {

            logger.info(
                `Selecting "${label}" from: ${elementName}`
            );

            try {

                await locator.selectOption({
                    label
                });

                return;

            } catch {

                logger.info(
                    `Label "${label}" not found in ${elementName}. ` +
                    `Falling back to first available option.`
                );
            }
        }

        await locator.selectOption({
            index: 1
        });
    }

    /**
     * Select Department
     */
    async selectDepartment(
        department?: string
    ): Promise<void> {

        await this.selectDropdownOption(
            this.departmentSelect,
            department,
            "Department"
        );
    }

    /**
     * Select Designation
     */
    async selectDesignation(
        designation?: string
    ): Promise<void> {

        await this.selectDropdownOption(
            this.designationSelect,
            designation,
            "Designation"
        );
    }

    /**
     * Select Experience
     */
    async selectExperience(
        experience?: string
    ): Promise<void> {

        await this.selectDropdownOption(
            this.experienceSelect,
            experience,
            "Experience"
        );
    }

    /**
     * Enter Password
     */
    async enterPassword(
        password: string
    ): Promise<void> {

        await this.sendKeys(
            this.passwordInput,
            password,
            "Password"
        );
    }

    /**
     * Enter Confirm Password
     */
    async enterConfirmPassword(
        confirmPassword: string
    ): Promise<void> {

        await this.sendKeys(
            this.confirmPasswordInput,
            confirmPassword,
            "Confirm Password"
        );
    }

    /**
     * Fill all trainer details
     */
    async fillAllTrainerDetails(data: {
        fullName: string;
        email: string;
        mobile?: string;
        department?: string;
        designation?: string;
        experience?: string;
        password: string;
        confirmPassword: string;
    }): Promise<void> {

        await this.enterFullName(
            data.fullName
        );

        await this.enterEmail(
            data.email
        );

        if (data.mobile) {

            await this.enterMobile(
                data.mobile
            );
        }

        if (data.department) {

            await this.selectDepartment(
                data.department
            );
        }

        if (data.designation) {

            await this.selectDesignation(
                data.designation
            );
        }

        if (data.experience) {

            await this.selectExperience(
                data.experience
            );
        }

        await this.enterPassword(
            data.password
        );

        await this.enterConfirmPassword(
            data.confirmPassword
        );
    }

    /**
     * Fill only mandatory trainer details
     *
     * Mandatory fields:
     * - Full Name
     * - Email
     * - Password
     * - Confirm Password
     */
    async fillMandatoryTrainerDetails(data: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }): Promise<void> {

        await this.enterFullName(
            data.fullName
        );

        await this.enterEmail(
            data.email
        );

        await this.enterPassword(
            data.password
        );

        await this.enterConfirmPassword(
            data.confirmPassword
        );
    }

    /**
     * Click Create Trainer and capture the
     * message displayed by the webpage.
     *
     * This method does NOT wait for a browser dialog.
     */
    async clickCreateTrainerAndCaptureAlert(): Promise<string> {

        logger.info(
            "Clicking Create Trainer Button"
        );

        // Click Create Trainer
        await this.click(
            this.createTrainerBtn,
            "Create Trainer Button"
        );

        /*
         * Give the application a short amount of time
         * to perform validation / display a message.
         */
        await this.page.waitForTimeout(500);

        /*
         * Possible application messages.
         *
         * The locator searches for the messages used
         * in the feature file.
         */
        const messageLocator = this.page.getByText(
            /Trainer created successfully|Please confirm the password|enter a valid email address|Passwords do not match/i
        ).first();

        try {

            await messageLocator.waitFor({
                state: "visible",
                timeout: 5000
            });

            const message = (
                await messageLocator.innerText()
            ).trim();

            this.lastAlertMessage = message;

            logger.info(
                `Message captured: "${message}"`
            );

            return message;

        } catch {

            logger.info(
                "Application message was not found. " +
                "Checking native HTML validation messages."
            );
        }

        /*
         * Check native HTML5 validation messages.
         */
        const validationMessage =
            await this.getValidationMessage();

        if (validationMessage) {

            this.lastAlertMessage =
                validationMessage;

            logger.info(
                `Native validation message captured: "${validationMessage}"`
            );

            return validationMessage;
        }

        /*
         * No message was found.
         */
        throw new Error(
            "No success or validation message appeared " +
            "after clicking Create Trainer."
        );
    }

    /**
     * Check browser's native HTML validation message
     */
    private async getValidationMessage(): Promise<string> {

        const fields: Locator[] = [
            this.emailInput,
            this.confirmPasswordInput,
            this.passwordInput,
            this.fullNameInput
        ];

        for (const field of fields) {

            try {

                const message =
                    await field.evaluate(
                        (element) => {
                            const input =
                                element as HTMLInputElement;

                            return input.validationMessage || "";
                        }
                    );

                if (message) {

                    return message;
                }

            } catch {
                // Continue checking the next field
            }
        }

        return "";
    }

    /**
     * Click the View icon for a specific trainer's row
     */
    async clickViewIcon(email: string): Promise<void> {

        const row = this.getTrainerRow(email);

        const viewIcon = row.locator(
            "button[title='View Details']"
        );

        await this.click(
            viewIcon,
            "View Trainer Icon"
        );
    }

    /**
     * Click the Delete icon for a specific trainer's row
     */
    async clickDeleteIcon(email: string): Promise<void> {

        const row = this.getTrainerRow(email);

        const deleteIcon = row.locator(
            "button[title='Delete Trainer']"
        );

        await this.click(
            deleteIcon,
            "Delete Trainer Icon"
        );
    }

    /**
     * Confirm deletion in the confirmation dialog
     */
    async confirmDeletion(): Promise<void> {

        await this.click(
            this.confirmDeleteBtn,
            "Confirm Deletion Button"
        );
    }

    /**
     * Cancel deletion in the confirmation dialog
     */
    async cancelDeletion(): Promise<void> {

        await this.click(
            this.cancelDeleteBtn,
            "Cancel Deletion Button"
        );
    }

    /**
     * Click the "Select All" checkbox in the trainer list
     */
    async clickSelectAllCheckbox(): Promise<void> {

        await this.click(
            this.selectAllCheckbox,
            "Select All Checkbox"
        );
    }

    /**
     * Verify the trainer details panel/modal is displayed
     */
    async verifyTrainerDetailsDisplayed(): Promise<void> {

        await expect(
            this.trainerDetailsPanel
        ).toBeVisible();

        await expect(
            this.trainerDetailsPanel.locator(".tpm-title")
        ).toHaveText("Trainer Profile");
    }

    /**
     * Verify a trainer row is no longer present in the list
     */
    async verifyTrainerRemoved(email: string): Promise<void> {

        await expect(
            this.getTrainerRow(email)
        ).toHaveCount(0);
    }

    /**
     * Verify a trainer row is still present in the list
     */
    async verifyTrainerPresent(email: string): Promise<void> {

        await expect(
            this.getTrainerRow(email)
        ).toBeVisible();
    }

    /**
     * Verify every row checkbox in the trainer list is checked
     */
    async verifyAllTrainersSelected(): Promise<void> {

        const rowCheckboxes = this.page.locator(
            "table.reg-admin-table tbody input[type='checkbox']"
        );

        const count = await rowCheckboxes.count();

        for (let i = 0; i < count; i++) {

            await expect(
                rowCheckboxes.nth(i)
            ).toBeChecked();
        }
    }

    /**
     * Verify every row checkbox in the trainer list is unchecked
     */
    async verifyAllTrainersUnselected(): Promise<void> {

        const rowCheckboxes = this.page.locator(
            "table.reg-admin-table tbody input[type='checkbox']"
        );

        const count = await rowCheckboxes.count();

        for (let i = 0; i < count; i++) {

            await expect(
                rowCheckboxes.nth(i)
            ).not.toBeChecked();
        }
    }

    /**
     * Verify the captured message
     */
    async verifyAlertMessage(
        expectedMessage: string
    ): Promise<void> {

        const actualMessage =
            this.lastAlertMessage || "";

        logger.info(
            `Verifying message. ` +
            `Expected to contain: "${expectedMessage}", ` +
            `Actual: "${actualMessage}"`
        );

        expect(
            actualMessage.toLowerCase()
        ).toContain(
            expectedMessage.toLowerCase()
        );
    }
}

export default AddTrainerPage;