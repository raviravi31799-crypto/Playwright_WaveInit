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

    // Search
    readonly searchInput: Locator;

    // Delete confirmation modal
    readonly deleteConfirmModal: Locator;
    readonly confirmDeleteBtn: Locator;

    // Status filter buttons
    readonly approvedFilterBtn: Locator;
    readonly pendingFilterBtn: Locator;
    readonly rejectedFilterBtn: Locator;

    // Participants table rows
    readonly tableRows: Locator;

    // Empty-state message
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

        // Participants list page
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

        // Participants table rows
        this.tableRows = page.locator(
            "table tbody tr"
        );

        // Empty-state message
        this.noResultsMessage = page.getByText(
            /no participants found|no results found|no matching participants/i
        );
    }

    /**
     * Click on "Participants" in the sidebar navigation
     */
    async clickParticipantsMenu(): Promise<void> {
        await this.click(
            this.participantsMenu,
            "Participants Sidebar Link"
        );
    }

    /**
     * Click on "Add Participant" button
     */
    async clickAddParticipant(): Promise<void> {
        await this.click(
            this.addParticipantBtn,
            "Add Participant Button"
        );
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
     * Enter participant phone number
     */
    async enterPhone(phone: string): Promise<void> {
        await this.sendKeys(
            this.phoneInput,
            phone,
            "Phone Number"
        );
    }

    /**
     * Select account status
     */
    async selectAccountStatus(status: string): Promise<void> {
        logger.info(`Selecting "${status}" from Account Status`);

        await this.accountStatusSelect.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.accountStatusSelect.selectOption({
            label: status
        });
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
    }

    /**
     * Submit Add Participant form
     */
    async clickSubmit(): Promise<void> {
        await this.click(
            this.submitBtn,
            "Add Participant (submit) Button"
        );
    }

    /**
     * Click Cancel on Add Participant form
     */
    async clickCancel(): Promise<void> {
        await this.click(
            this.cancelBtn,
            "Cancel Button"
        );
    }

    /**
     * Verify Add Participant form is closed
     */
    async verifyFormClosed(): Promise<void> {

        logger.info(
            "Verifying Add New Participant form is closed"
        );

        await expect(this.modal).toBeHidden({
            timeout: 10000
        });

        await expect(this.addParticipantBtn).toBeVisible({
            timeout: 10000
        });

        logger.info(
            "Add New Participant form closed successfully"
        );
    }

    /**
     * Search for a participant by name/email
     */
    async searchParticipant(searchText: string): Promise<void> {

        logger.info(
            `Searching participant using: "${searchText}"`
        );

        await this.searchInput.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.searchInput.fill(searchText);

        // Wait until the search result updates.
        // This does not use a fixed timeout.
        await this.page.waitForLoadState("networkidle").catch(() => {
            // Ignore if network remains active because of polling/background requests
        });

        logger.info(
            `Search completed for: "${searchText}"`
        );
    }

    /**
     * Locate participant row by exact name
     */
    getParticipantRow(name: string): Locator {
        return this.page
            .locator("table tbody tr")
            .filter({
                has: this.page.getByText(name, {
                    exact: true
                })
            })
            .first();
    }

    /**
     * Locate participant row containing text
     */
    getParticipantRowContains(text: string): Locator {
        return this.page
            .locator("table tbody tr")
            .filter({
                hasText: text
            });
    }

    /**
     * Approve participant
     */
    async clickApprove(name: string): Promise<void> {

        const row = this.getParticipantRow(name);

        await expect(row).toBeVisible({
            timeout: 10000
        });

        await this.click(
            row.getByRole(
                "button",
                { name: "Approve participant" }
            ),
            `Approve Participant (${name})`
        );
    }

    /**
     * Reject participant
     */
    async clickReject(name: string): Promise<void> {

        const row = this.getParticipantRow(name);

        await expect(row).toBeVisible({
            timeout: 10000
        });

        await this.click(
            row.getByRole(
                "button",
                { name: "Reject participant" }
            ),
            `Reject Participant (${name})`
        );
    }

    /**
     * Delete participant
     */
    async clickDelete(name: string): Promise<void> {

        const row = this.getParticipantRow(name);

        await expect(row).toBeVisible({
            timeout: 10000
        });

        await this.click(
            row.getByRole(
                "button",
                { name: "Delete participant" }
            ),
            `Delete Participant (${name})`
        );
    }

    /**
     * Confirm participant deletion
     */
    async confirmDelete(): Promise<void> {

        await this.deleteConfirmModal.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.click(
            this.confirmDeleteBtn,
            "Confirm Delete Button"
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
            .getByText(new RegExp(escaped, "i"))
            .last();

        await toastLocator.waitFor({
            state: "visible",
            timeout: 10000
        });

        await expect(toastLocator).toBeVisible();

        logger.info(
            "Toast message verified successfully"
        );
    }

    /**
     * Verify participant is removed
     */
    async verifyParticipantRemoved(
        name: string
    ): Promise<void> {

        logger.info(
            `Verifying participant "${name}" is removed from the list`
        );

        await expect(
            this.getParticipantRow(name)
        ).toHaveCount(0, {
            timeout: 10000
        });

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
            `Clicking "${status}" status filter`
        );

        await filterBtn.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.click(
            filterBtn,
            `${status} Filter`
        );

        /*
         * Important:
         * Do not use waitForTimeout(500).
         *
         * Wait until the table actually contains the
         * expected status. This prevents Jenkins timing
         * issues where the old table data is still visible.
         */
        await expect
            .poll(
                async () => {
                    const count = await this.tableRows.count();

                    if (count === 0) {
                        return false;
                    }

                    for (let i = 0; i < count; i++) {
                        const text = await this.tableRows
                            .nth(i)
                            .innerText();

                        if (
                            !new RegExp(
                                `\\b${status}\\b`,
                                "i"
                            ).test(text)
                        ) {
                            return false;
                        }
                    }

                    return true;
                },
                {
                    timeout: 10000,
                    message:
                        `Table did not update to "${status}" status`
                }
            )
            .toBe(true);

        logger.info(
            `"${status}" filter applied successfully`
        );
    }

    /**
     * Click Approved filter
     */
    async clickApprovedFilter(): Promise<void> {
        await this.clickStatusFilter("Approved");
    }

    /**
     * Click Pending filter
     */
    async clickPendingFilter(): Promise<void> {
        await this.clickStatusFilter("Pending");
    }

    /**
     * Click Rejected filter
     */
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
            `Verifying participant matching "${name}" is displayed`
        );

        const row =
            this.getParticipantRowContains(name).first();

        await expect(row).toBeVisible({
            timeout: 10000
        });

        logger.info(
            `Participant matching "${name}" is displayed`
        );
    }

    /**
     * Verify searched participant by email
     */
    async verifyParticipantWithEmailDisplayed(
        email: string
    ): Promise<void> {

        logger.info(
            `Verifying participant with email matching "${email}" is displayed`
        );

        const row =
            this.getParticipantRowContains(email).first();

        await expect(row).toBeVisible({
            timeout: 10000
        });

        logger.info(
            `Participant with email "${email}" is displayed`
        );
    }

    /**
     * Verify no matching participant
     */
    async verifyNoMatchingParticipant(): Promise<void> {

        logger.info(
            "Verifying no matching participant is displayed"
        );

        await expect
            .poll(
                async () => {
                    const rowCount =
                        await this.tableRows.count();

                    if (rowCount === 0) {
                        return true;
                    }

                    return await this.noResultsMessage.isVisible();
                },
                {
                    timeout: 10000,
                    message:
                        "Expected no participant rows or an empty-state message"
                }
            )
            .toBe(true);

        logger.info(
            "No matching participant confirmed"
        );
    }

    /**
     * Verify every visible row has the expected status
     */
    async verifyAllRowsHaveStatus(
        status: "Approved" | "Pending" | "Rejected"
    ): Promise<void> {

        logger.info(
            `Verifying all visible rows have status: ${status}`
        );

        /*
         * Wait until the table contains rows and every
         * visible row has the expected status.
         *
         * This replaces:
         *
         * await page.waitForTimeout(500);
         *
         * which was causing the Jenkins failure.
         */
        await expect
            .poll(
                async () => {

                    const count =
                        await this.tableRows.count();

                    if (count === 0) {
                        return false;
                    }

                    for (let i = 0; i < count; i++) {

                        const rowText =
                            await this.tableRows
                                .nth(i)
                                .innerText();

                        const hasExpectedStatus =
                            new RegExp(
                                `\\b${status}\\b`,
                                "i"
                            ).test(rowText);

                        if (!hasExpectedStatus) {
                            return false;
                        }
                    }

                    return true;
                },
                {
                    timeout: 10000,
                    message:
                        `Not all visible participant rows have status "${status}"`
                }
            )
            .toBe(true);

        const count =
            await this.tableRows.count();

        logger.info(
            `All ${count} visible row(s) confirmed as "${status}"`
        );
    }
}

export default ParticipantPage;
