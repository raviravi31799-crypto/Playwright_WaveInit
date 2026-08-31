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

        // -----------------------------
        // Sidebar navigation
        // -----------------------------
        this.participantsMenu = page.getByRole(
            "button",
            { name: "Participants", exact: true }
        );

        // -----------------------------
        // Add Participant button
        // -----------------------------
        this.addParticipantBtn = page.getByRole(
            "button",
            { name: "Add Participant" }
        );

        // -----------------------------
        // Add New Participant modal
        // -----------------------------
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

        // -----------------------------
        // Search
        // -----------------------------
        this.searchInput = page.getByPlaceholder(
            "Search participants..."
        );

        // -----------------------------
        // Delete confirmation modal
        // -----------------------------
        this.deleteConfirmModal = page.locator(
            "div.reg-modal.reg-modal--small"
        );

        this.confirmDeleteBtn =
            this.deleteConfirmModal.getByRole(
                "button",
                { name: "Confirm", exact: true }
            );

        // -----------------------------
        // Status filters
        // -----------------------------
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

        // -----------------------------
        // Participants table
        // -----------------------------
        this.tableRows = page.locator(
            "table tbody tr"
        );

        // -----------------------------
        // Empty state
        // -----------------------------
        this.noResultsMessage = page.getByText(
            /no participants found|no results found|no matching participants/i
        );
    }

    // =========================================================
    // PARTICIPANTS NAVIGATION
    // =========================================================

    async clickParticipantsMenu(): Promise<void> {

        logger.info(
            "Clicking Participants sidebar"
        );

        await this.click(
            this.participantsMenu,
            "Participants Sidebar Link"
        );

        await expect(
            this.addParticipantBtn
        ).toBeVisible({
            timeout: 10000
        });

        logger.info(
            "Participants page opened successfully"
        );
    }

    // =========================================================
    // ADD PARTICIPANT
    // =========================================================

    async clickAddParticipant(): Promise<void> {

        logger.info(
            "Clicking Add Participant button"
        );

        await this.click(
            this.addParticipantBtn,
            "Add Participant Button"
        );

        await expect(
            this.modal
        ).toBeVisible({
            timeout: 10000
        });

        logger.info(
            "Add Participant modal opened"
        );
    }

    async enterFullName(
        fullName: string
    ): Promise<void> {

        await this.sendKeys(
            this.fullNameInput,
            fullName,
            "Full Name"
        );
    }

    async enterEmail(
        email: string
    ): Promise<void> {

        await this.sendKeys(
            this.emailInput,
            email,
            "Email Address"
        );
    }

    async enterPhone(
        phone: string
    ): Promise<void> {

        await this.sendKeys(
            this.phoneInput,
            phone,
            "Phone Number"
        );
    }

    async selectAccountStatus(
        status: string
    ): Promise<void> {

        logger.info(
            `Selecting account status: "${status}"`
        );

        await this.accountStatusSelect.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.accountStatusSelect.selectOption({
            label: status
        });

        logger.info(
            `Account status "${status}" selected`
        );
    }

    async enterPassword(
        password: string
    ): Promise<void> {

        await this.sendKeys(
            this.passwordInput,
            password,
            "Password"
        );
    }

    async fillParticipantDetails(data: {
        fullName: string;
        email: string;
        phone: string;
        status: string;
        password: string;
    }): Promise<void> {

        logger.info(
            `Filling participant details for "${data.fullName}"`
        );

        await this.enterFullName(data.fullName);
        await this.enterEmail(data.email);
        await this.enterPhone(data.phone);
        await this.selectAccountStatus(data.status);
        await this.enterPassword(data.password);

        logger.info(
            "Participant details filled successfully"
        );
    }

    async clickSubmit(): Promise<void> {

        logger.info(
            "Submitting Add Participant form"
        );

        await this.click(
            this.submitBtn,
            "Add Participant (submit) Button"
        );
    }

    // =========================================================
    // CANCEL
    // =========================================================

    async clickCancel(): Promise<void> {

        logger.info(
            "Clicking Cancel button"
        );

        await this.click(
            this.cancelBtn,
            "Cancel Button"
        );
    }

    async verifyFormClosed(): Promise<void> {

        logger.info(
            "Verifying Add Participant form is closed"
        );

        await expect(
            this.modal
        ).toBeHidden({
            timeout: 10000
        });

        await expect(
            this.addParticipantBtn
        ).toBeVisible({
            timeout: 10000
        });

        logger.info(
            "Add Participant form closed successfully"
        );
    }

    // =========================================================
    // SEARCH
    // =========================================================

    async searchParticipant(
        searchText: string
    ): Promise<void> {

        logger.info(
            `Searching participant: "${searchText}"`
        );

        await this.searchInput.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.searchInput.fill(searchText);

        /*
         * Wait until the search result changes.
         * No fixed waitForTimeout is used.
         */
        await this.page.waitForLoadState(
            "networkidle"
        ).catch(() => {
            /*
             * Ignore networkidle timeout because
             * applications may have background requests.
             */
        });

        logger.info(
            `Search completed for: "${searchText}"`
        );
    }

    // =========================================================
    // PARTICIPANT ROW
    // =========================================================

    getParticipantRow(
        name: string
    ): Locator {

        return this.page
            .locator("table tbody tr")
            .filter({
                has: this.page.getByText(
                    name,
                    { exact: true }
                )
            })
            .first();
    }

    getParticipantRowContains(
        text: string
    ): Locator {

        return this.page
            .locator("table tbody tr")
            .filter({
                hasText: text
            });
    }

    // =========================================================
    // APPROVE
    // =========================================================

    async clickApprove(
        name: string
    ): Promise<void> {

        logger.info(
            `Locating participant for approval: "${name}"`
        );

        const row =
            this.getParticipantRow(name);

        await expect(
            row
        ).toBeVisible({
            timeout: 10000
        });

        await this.click(
            row.getByRole(
                "button",
                {
                    name: "Approve participant"
                }
            ),
            `Approve Participant (${name})`
        );

        logger.info(
            `Approve clicked for "${name}"`
        );
    }

    // =========================================================
    // REJECT
    // =========================================================

    async clickReject(
        name: string
    ): Promise<void> {

        logger.info(
            `Locating participant for rejection: "${name}"`
        );

        const row =
            this.getParticipantRow(name);

        await expect(
            row
        ).toBeVisible({
            timeout: 10000
        });

        await this.click(
            row.getByRole(
                "button",
                {
                    name: "Reject participant"
                }
            ),
            `Reject Participant (${name})`
        );

        logger.info(
            `Reject clicked for "${name}"`
        );
    }

    // =========================================================
    // DELETE
    // =========================================================

    async clickDelete(
        name: string
    ): Promise<void> {

        logger.info(
            `Locating participant for deletion: "${name}"`
        );

        const row =
            this.getParticipantRow(name);

        await expect(
            row
        ).toBeVisible({
            timeout: 10000
        });

        await this.click(
            row.getByRole(
                "button",
                {
                    name: "Delete participant"
                }
            ),
            `Delete Participant (${name})`
        );

        logger.info(
            `Delete clicked for "${name}"`
        );
    }

    async confirmDelete(): Promise<void> {

        logger.info(
            "Waiting for delete confirmation modal"
        );

        await expect(
            this.deleteConfirmModal
        ).toBeVisible({
            timeout: 10000
        });

        await this.click(
            this.confirmDeleteBtn,
            "Confirm Delete Button"
        );

        logger.info(
            "Delete confirmed"
        );
    }

    // =========================================================
    // TOAST
    // =========================================================

    async verifyToastContains(
        expectedText: string
    ): Promise<void> {

        logger.info(
            `Verifying toast contains: "${expectedText}"`
        );

        const escaped =
            expectedText.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

        const toastLocator =
            this.page
                .getByText(
                    new RegExp(
                        escaped,
                        "i"
                    )
                )
                .last();

        await toastLocator.waitFor({
            state: "visible",
            timeout: 10000
        });

        await expect(
            toastLocator
        ).toBeVisible();

        logger.info(
            "Toast message verified successfully"
        );
    }

    // =========================================================
    // DELETE VERIFICATION
    // =========================================================

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
            {
                timeout: 10000
            }
        );

        logger.info(
            `Participant "${name}" removed successfully`
        );
    }

    // =========================================================
    // STATUS FILTER
    // =========================================================

    async clickStatusFilter(
        status:
            | "Approved"
            | "Pending"
            | "Rejected"
    ): Promise<void> {

        const filterBtn =
            status === "Approved"
                ? this.approvedFilterBtn
                : status === "Pending"
                    ? this.pendingFilterBtn
                    : this.rejectedFilterBtn;

        logger.info(
            `Clicking "${status}" filter`
        );

        await expect(
            filterBtn
        ).toBeVisible({
            timeout: 10000
        });

        await filterBtn.click();

        logger.info(
            `"${status}" filter clicked`
        );

        /*
         * Do not use:
         *
         * await page.waitForTimeout(500)
         *
         * Instead, wait until the table contains
         * the expected status.
         */
        await expect.poll(
            async () => {

                const count =
                    await this.tableRows.count();

                if (count === 0) {
                    return false;
                }

                for (
                    let i = 0;
                    i < count;
                    i++
                ) {

                    const rowText =
                        await this.tableRows
                            .nth(i)
                            .innerText();

                    const statusFound =
                        new RegExp(
                            `\\b${status}\\b`,
                            "i"
                        ).test(rowText);

                    if (!statusFound) {
                        return false;
                    }
                }

                return true;

            },
            {
                timeout: 10000,

                message:
                    `Table did not update to "${status}" after clicking the filter`
            }
        ).toBe(true);

        logger.info(
            `"${status}" filter applied successfully`
        );
    }

    async clickApprovedFilter(): Promise<void> {

        await this.clickStatusFilter(
            "Approved"
        );
    }

    async clickPendingFilter(): Promise<void> {

        await this.clickStatusFilter(
            "Pending"
        );
    }

    async clickRejectedFilter(): Promise<void> {

        await this.clickStatusFilter(
            "Rejected"
        );
    }

    // =========================================================
    // SEARCH RESULT VERIFICATION
    // =========================================================

    async verifySearchedParticipantDisplayed(
        name: string
    ): Promise<void> {

        logger.info(
            `Verifying searched participant: "${name}"`
        );

        const row =
            this.getParticipantRowContains(name)
                .first();

        await expect(
            row
        ).toBeVisible({
            timeout: 10000
        });

        logger.info(
            `Participant "${name}" displayed successfully`
        );
    }

    async verifyParticipantWithEmailDisplayed(
        email: string
    ): Promise<void> {

        logger.info(
            `Verifying participant with email: "${email}"`
        );

        const row =
            this.getParticipantRowContains(email)
                .first();

        await expect(
            row
        ).toBeVisible({
            timeout: 10000
        });

        logger.info(
            `Participant with email "${email}" displayed successfully`
        );
    }

    // =========================================================
    // INVALID SEARCH
    // =========================================================

    async verifyNoMatchingParticipant(): Promise<void> {

        logger.info(
            "Verifying no matching participant is displayed"
        );

        await expect.poll(
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
        ).toBe(true);

        logger.info(
            "No matching participant confirmed"
        );
    }

    // =========================================================
    // VERIFY STATUS
    // =========================================================

    async verifyAllRowsHaveStatus(
        status:
            | "Approved"
            | "Pending"
            | "Rejected"
    ): Promise<void> {

        logger.info(
            `Verifying all visible rows have status: ${status}`
        );

        /*
         * Poll until the table has at least one row
         * and every visible row contains the expected
         * status.
         */
        await expect.poll(
            async () => {

                const count =
                    await this.tableRows.count();

                if (count === 0) {
                    return false;
                }

                for (
                    let i = 0;
                    i < count;
                    i++
                ) {

                    const rowText =
                        await this.tableRows
                            .nth(i)
                            .innerText();

                    logger.info(
                        `Row ${i + 1}: ${rowText}`
                    );

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
        ).toBe(true);

        const count =
            await this.tableRows.count();

        logger.info(
            `All ${count} visible row(s) confirmed as "${status}"`
        );
    }
}

export default ParticipantPage;
