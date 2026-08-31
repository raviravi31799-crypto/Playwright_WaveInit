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

        await this.searchInput.click();
        await this.searchInput.fill("");

        // Type character-by-character instead of using fill() for the
        // actual search term. Some React/controlled-input search boxes
        // are wired to onKeyUp/onKeyDown (for debounced filtering) rather
        // than relying solely on the "input" event that fill() dispatches.
        // fill() can silently leave the visible value updated without the
        // app's filter logic ever running - pressSequentially reproduces
        // real keystrokes so the app's own debounce/filter handlers fire.
        await this.searchInput.pressSequentially(name, { delay: 50 });

        logger.info(
            `Searching participant: "${name}"`
        );

        // Increased wait for Jenkins
        await this.page.waitForTimeout(3000);

        try {
            await this.page.waitForLoadState("networkidle", { timeout: 8000 });
        } catch {
            // no network activity detected - fine if filtering is client-side only
        }
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

        // Diagnostic: log exactly which DOM element this locator resolved
        // to. If it's not the real filter control (e.g. a status badge or
        // legend item that happens to also have an accessible name of
        // "Approved"/"Pending"/"Rejected"), this will show up clearly in
        // the CI logs and explain why clicking it has no effect.
        const elementInfo = await filterBtn.evaluate((el) => {
            const e = el as HTMLElement;
            return `<${e.tagName.toLowerCase()} class="${e.className}" role="${e.getAttribute("role") ?? ""}" data-testid="${e.getAttribute("data-testid") ?? ""}">${(e.textContent ?? "").trim().slice(0, 60)}</${e.tagName.toLowerCase()}>`;
        }).catch(() => "could not resolve element info");

        logger.info(`${status} filter locator resolved to: ${elementInfo}`);

        const rowsBefore = await this.tableRows.allTextContents();
        const urlBefore = this.page.url();

        await filterBtn.click();

        logger.info(
            `${status} filter clicked`
        );

        // Wait for the list to actually re-render instead of relying only
        // on a fixed sleep
        await this.page.waitForTimeout(1500);

        try {
            await this.page.waitForLoadState("networkidle", { timeout: 8000 });
        } catch {
            // no network activity detected - fine if filtering is client-side only
        }

        // Increased wait for Jenkins / QA environment
        await this.page.waitForTimeout(1500);

        const rowsAfter = await this.tableRows.allTextContents();
        const urlAfter = this.page.url();

        if (urlBefore !== urlAfter) {
            logger.info(`URL changed after ${status} filter click: ${urlBefore} -> ${urlAfter}`);
        }

        if (
            rowsBefore.length > 0 &&
            JSON.stringify(rowsBefore) === JSON.stringify(rowsAfter)
        ) {
            logger.error(
                `${status} filter click produced NO visible change in the table ` +
                `(same ${rowsBefore.length} row(s) before and after). This strongly ` +
                `suggests "${status}FilterBtn" is not the real filter control - it ` +
                `likely matched an unrelated element with the same accessible name ` +
                `(e.g. a status badge/legend). Resolved element was: ${elementInfo}. ` +
                `Inspect the live page (e.g. with "npx playwright codegen <url>" after ` +
                `logging in) to find the correct locator for the actual filter tab/button.`
            );
        }

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
        await this.page.waitForTimeout(1500);

        try {
            await this.page.waitForLoadState("networkidle", { timeout: 8000 });
        } catch {
            // no network activity detected - fine if filtering is client-side only
        }

        await this.page.waitForTimeout(1500);

        const rowCount = await this.tableRows.count();

        if (rowCount === 0) {

            logger.info(
                "No rows present in table - confirmed no matching participant"
            );

            return;
        }

        // Widened to cover more likely empty-state phrasings
        const noResultsMessage = this.page.getByText(
            /no participants found|no results found|no matching participants|no data|no records|nothing found|no participants to display|no participants match/i
        );

        const isMessageVisible = await noResultsMessage.isVisible().catch(() => false);

        if (isMessageVisible) {
            logger.info(
                "Empty-state message confirmed"
            );
            return;
        }

        // Neither zero rows nor a recognized empty-state message - log
        // exactly what IS on screen so the real behaviour/copy can be
        // identified from the next run's logs.
        const rowTexts = (await this.tableRows.allTextContents())
            .map(t => t.replace(/\s+/g, " ").trim());

        logger.error(
            `Expected no matching participants for this search, but found ` +
            `${rowCount} row(s): ${JSON.stringify(rowTexts)}. This suggests either ` +
            `the search input isn't actually filtering the list, or the app's ` +
            `empty-state message text doesn't match the expected phrasing.`
        );

        await expect(
            noResultsMessage,
            `Search returned ${rowCount} unexpected row(s) instead of an empty state: ${JSON.stringify(rowTexts)}`
        ).toBeVisible({ timeout: 5000 });
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

        // Collect ALL mismatches instead of throwing on the first one, so a
        // single failing run gives the full picture rather than stopping
        // after row 1.
        const mismatches: string[] = [];

        for (let i = 0; i < count; i++) {

            const row = this.tableRows.nth(i);

            await row.waitFor({
                state: "visible",
                timeout: 10000
            });

            const rowText = (await row.innerText()).replace(/\s+/g, " ").trim();

            logger.info(
                `Row ${i + 1} text: ${rowText}`
            );

            if (!new RegExp(status, "i").test(rowText)) {
                mismatches.push(`Row ${i + 1}: "${rowText}"`);
            }
        }

        if (mismatches.length > 0) {
            logger.error(
                `${mismatches.length}/${count} row(s) did not have status "${status}" ` +
                `after clicking the ${status} filter. This usually means the filter ` +
                `button locator is not targeting the real filter control (it may be ` +
                `clicking a status badge/legend item instead). Mismatched rows:\n` +
                mismatches.join("\n")
            );
        }

        expect(
            mismatches,
            `${mismatches.length} row(s) do not have status "${status}":\n${mismatches.join("\n")}`
        ).toHaveLength(0);

        logger.info(
            `All ${count} visible row(s) confirmed as "${status}"`
        );
    }
}

export default ParticipantPage;
