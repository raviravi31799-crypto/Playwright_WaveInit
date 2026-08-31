
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../utils/logger";

export class ParticipantPage extends BasePage {

    readonly participantsMenu: Locator;
    readonly addParticipantBtn: Locator;

    // Add New Participant modal
    readonly modal: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly accountStatusSelect: Locator;
    readonly passwordInput: Locator;
    readonly cancelBtn: Locator;
    readonly submitBtn: Locator;

    readonly searchInput: Locator;

    // Delete confirmation modal
    readonly deleteConfirmModal: Locator;
    readonly confirmDeleteBtn: Locator;

    // Status filter buttons
    readonly approvedFilterBtn: Locator;
    readonly pendingFilterBtn: Locator;
    readonly rejectedFilterBtn: Locator;

    // Participant table rows
    readonly tableRows: Locator;

    // Empty state message
    readonly noResultsMessage: Locator;

    constructor(page: Page) {
        super(page);

        // Sidebar navigation
        this.participantsMenu = page.getByRole(
            "button",
            { name: "Participants", exact: true }
        );

        // Add Participant button
        this.addParticipantBtn = page.getByRole(
            "button",
            { name: "Add Participant" }
        );

        // Add New Participant modal
        this.modal = page.locator("div.reg-modal");

        this.fullNameInput = this.modal.getByPlaceholder(
            "e.g. Rahul Sharma"
        );

        this.emailInput = this.modal.getByPlaceholder(
            "e.g. rahul@example.com"
        );

        this.phoneInput = this.modal.getByPlaceholder(
            "e.g. 9876543210"
        );

        this.accountStatusSelect = this.modal.locator(
            "select.reg-select"
        );

        this.passwordInput = this.modal.getByPlaceholder(
            "Enter password (min 8 chars, mixed case, symbol)"
        );

        this.cancelBtn = this.modal.getByRole(
            "button",
            { name: "Cancel", exact: true }
        );

        this.submitBtn = this.modal.getByRole(
            "button",
            { name: "Add Participant" }
        );

        // Search
        this.searchInput = page.getByPlaceholder(
            "Search participants..."
        );

        // Delete confirmation modal
        this.deleteConfirmModal = page.locator(
            "div.reg-modal.reg-modal--small"
        );

        this.confirmDeleteBtn = this.deleteConfirmModal.getByRole(
            "button",
            { name: "Confirm", exact: true }
        );

        // Status filter buttons
        this.approvedFilterBtn = page.getByRole(
            "button",
            { name: "Approved", exact: true }
        );

        this.pendingFilterBtn = page.getByRole(
            "button",
            { name: "Pending", exact: true }
        );

        this.rejectedFilterBtn = page.getByRole(
            "button",
            { name: "Rejected", exact: true }
        );

        // Participant table rows
        this.tableRows = page.locator(
            "table tbody tr"
        );

        // Empty state message
        this.noResultsMessage = page.getByText(
            /no participants found|no results found|no matching participants/i
        );
    }

    /**
     * Click Participants from sidebar
     */
    async clickParticipantsMenu(): Promise<void> {
        await this.click(
            this.participantsMenu,
            "Participants Sidebar Link"
        );

        logger.info("Participants menu clicked");
    }

    /**
     * Click Add Participant button
     */
    async clickAddParticipant(): Promise<void> {
        await this.click(
            this.addParticipantBtn,
            "Add Participant Button"
        );

        logger.info("Add Participant button clicked");
    }

    /**
     * Enter participant full name
     */
    async enterFullName(fullName: string): Promise<void> {
        await this.sendKeys(
            this.fullNameInput,
            fullName,
            "Full Name"
        );
    }

    /**
     * Enter participant email
     */
    async enterEmail(email: string): Promise<void> {
        await this.sendKeys(
            this.emailInput,
            email,
            "Email Address"
        );
    }

    /**
     * Enter participant phone
     */
    async enterPhone(phone: string): Promise<void> {
        await this.sendKeys(
            this.phoneInput,
            phone,
            "Phone Number"
        );
    }

    /**
     * Select participant account status
     */
    async selectAccountStatus(status: string): Promise<void> {

        logger.info(
            `Selecting "${status}" from Account Status`
        );

        await this.accountStatusSelect.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.accountStatusSelect.selectOption({
            label: status
        });

        logger.info(
            `Account status "${status}" selected`
        );
    }

    /**
     * Enter participant password
     */
    async enterPassword(password: string): Promise<void> {
        await this.sendKeys(
            this.passwordInput,
            password,
            "Password"
        );
    }

    /**
     * Fill participant details
     */
    async fillParticipantDetails(data: {
        fullName: string;
        email: string;
        phone: string;
        status: string;
        password: string;
    }): Promise<void> {

        await this.enterFullName(data.fullName);
        await this.enterEmail(data.email);
        await this.enterPhone(data.phone);
        await this.selectAccountStatus(data.status);
        await this.enterPassword(data.password);

        logger.info(
            `Participant details filled for "${data.fullName}"`
        );
    }

    /**
     * Submit participant form
     */
    async clickSubmit(): Promise<void> {
        await this.click(
            this.submitBtn,
            "Add Participant (submit) Button"
        );

        logger.info("Participant form submitted");
    }

    /**
     * Click Cancel
     */
    async clickCancel(): Promise<void> {
        await this.click(
            this.cancelBtn,
            "Cancel Button"
        );

        logger.info("Cancel button clicked");
    }

    /**
     * Verify Add Participant modal is closed
     */
    async verifyFormClosed(): Promise<void> {

        logger.info(
            "Verifying Add Participant form is closed"
        );

        await this.modal.waitFor({
            state: "hidden",
            timeout: 15000
        });

        await expect(
            this.addParticipantBtn
        ).toBeVisible({
            timeout: 15000
        });

        logger.info(
            "Add Participant form closed successfully"
        );
    }

    /**
     * Search participant
     */
    async searchParticipant(name: string): Promise<void> {

        await this.searchInput.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.searchInput.fill("");

        await this.searchInput.fill(name);

        logger.info(
            `Searching participant: "${name}"`
        );

        // Increased wait for Jenkins
        await this.page.waitForTimeout(3000);
    }

    /**
     * Locate participant row by exact name
     */
    getParticipantRow(name: string): Locator {
        return this.page
            .locator("tr")
            .filter({
                has: this.page.getByText(
                    name,
                    { exact: true }
                )
            });
    }

    /**
     * Locate participant row by partial text
     */
    getParticipantRowContains(text: string): Locator {
        return this.page
            .locator("tr")
            .filter({
                hasText: text
            });
    }

    /**
     * Approve participant
     */
    async clickApprove(name: string): Promise<void> {

        const row = this.getParticipantRow(name);

        await row.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            row.getByRole(
                "button",
                { name: "Approve participant" }
            ),
            `Approve Participant (${name})`
        );

        logger.info(
            `Approve clicked for "${name}"`
        );
    }

    /**
     * Reject participant
     */
    async clickReject(name: string): Promise<void> {

        const row = this.getParticipantRow(name);

        await row.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            row.getByRole(
                "button",
                { name: "Reject participant" }
            ),
            `Reject Participant (${name})`
        );

        logger.info(
            `Reject clicked for "${name}"`
        );
    }

    /**
     * Delete participant
     */
    async clickDelete(name: string): Promise<void> {

        const row = this.getParticipantRow(name);

        await row.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            row.getByRole(
                "button",
                { name: "Delete participant" }
            ),
            `Delete Participant (${name})`
        );

        logger.info(
            `Delete clicked for "${name}"`
        );
    }

    /**
     * Confirm participant deletion
     */
    async confirmDelete(): Promise<void> {

        await this.deleteConfirmModal.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            this.confirmDeleteBtn,
            "Confirm Delete Button"
        );

        logger.info(
            "Participant deletion confirmed"
        );
    }

    /**
     * Verify toast message
     */
    async verifyToastContains(
        expectedText: string
    ): Promise<void> {

        logger.info(
            `Verifying toast message contains: "${expectedText}"`
        );

        const escaped = expectedText.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const toastLocator = this.page
            .getByText(
                new RegExp(escaped, "i")
            )
            .last();

        await toastLocator.waitFor({
            state: "visible",
            timeout: 15000
        });

        await expect(
            toastLocator
        ).toBeVisible({
            timeout: 15000
        });

        logger.info(
            "Toast message verified successfully"
        );
    }

    /**
     * Verify participant was removed
     */
    async verifyParticipantRemoved(
        name: string
    ): Promise<void> {

        logger.info(
            `Verifying participant "${name}" is removed`
        );

        await expect(
            this.getParticipantRow(name)
        ).toHaveCount(
            0,
            { timeout: 15000 }
        );

        logger.info(
            `Participant "${name}" confirmed removed`
        );
    }

    /**
     * Click status filter
     */
    async clickStatusFilter(
        status: "Approved" | "Pending" | "Rejected"
    ): Promise<void> {

        const filterBtn =
            status === "Approved"
                ? this.approvedFilterBtn
                : status === "Pending"
                    ? this.pendingFilterBtn
                    : this.rejectedFilterBtn;

        logger.info(
            `Waiting for ${status} filter button`
        );

        await filterBtn.waitFor({
            state: "visible",
            timeout: 15000
        });

        await filterBtn.click();

        logger.info(
            `${status} filter clicked`
        );

        // Increased wait for Jenkins / QA environment
        await this.page.waitForTimeout(3000);

        logger.info(
            `Waiting for ${status} filter results to load`
        );
    }

    async clickApprovedFilter(): Promise<void> {
        await this.clickStatusFilter("Approved");
    }

    async clickPendingFilter(): Promise<void> {
        await this.clickStatusFilter("Pending");
    }

    async clickRejectedFilter(): Promise<void> {
        await this.clickStatusFilter("Rejected");
    }

    /**
     * Verify searched participant by name
     */
    async verifySearchedParticipantDisplayed(
        name: string
    ): Promise<void> {

        logger.info(
            `Verifying participant matching "${name}"`
        );

        await expect(
            this.getParticipantRowContains(name).first()
        ).toBeVisible({
            timeout: 15000
        });

        logger.info(
            `Participant matching "${name}" displayed`
        );
    }

    /**
     * Verify participant by email
     */
    async verifyParticipantWithEmailDisplayed(
        email: string
    ): Promise<void> {

        logger.info(
            `Verifying participant with email "${email}"`
        );

        await expect(
            this.getParticipantRowContains(email).first()
        ).toBeVisible({
            timeout: 15000
        });

        logger.info(
            `Participant with email "${email}" displayed`
        );
    }

    /**
     * Verify no matching participant
     */
    async verifyNoMatchingParticipant(): Promise<void> {

        logger.info(
            "Verifying no matching participant is displayed"
        );

        // Increased wait for Jenkins
        await this.page.waitForTimeout(3000);

        const rowCount = await this.tableRows.count();

        if (rowCount === 0) {

            logger.info(
                "No rows present in table - confirmed no matching participant"
            );

            return;
        }

        await expect(
            this.noResultsMessage
        ).toBeVisible({
            timeout: 15000
        });

        logger.info(
            "Empty-state message confirmed"
        );
    }

    /**
     * Verify all visible rows have expected status
     */
    async verifyAllRowsHaveStatus(
        status: "Approved" | "Pending" | "Rejected"
    ): Promise<void> {

        logger.info(
            `Verifying all visible rows have status: ${status}`
        );

        // Increased wait for Jenkins
        await this.page.waitForTimeout(3000);

        // Wait for the first table row to become visible
        await this.tableRows.first().waitFor({
            state: "visible",
            timeout: 15000
        });

        // Additional wait to allow API/filter response to complete
        await this.page.waitForTimeout(2000);

        const count = await this.tableRows.count();

        logger.info(
            `Found ${count} participant row(s) after ${status} filter`
        );

        expect(
            count,
            `Expected at least one "${status}" participant row`
        ).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {

            const row = this.tableRows.nth(i);

            await row.waitFor({
                state: "visible",
                timeout: 10000
            });

            const rowText = await row.innerText();

            logger.info(
                `Row ${i + 1} text: ${rowText}`
            );

            await expect(row).toContainText(
                new RegExp(status, "i"),
                {
                    timeout: 15000
                }
            );
        }

        logger.info(
            `All ${count} visible row(s) confirmed as "${status}"`
        );
    }
}

export default ParticipantPage;

