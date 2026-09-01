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

        // Kept short intentionally: downstream verifications now either
        // auto-retry (toBeVisible) or poll over several seconds
        // (pollTableSnapshots), so we don't need to wait long here. A long
        // fixed wait here was actually working against us - it gave a
        // suspected periodic auto-refresh on this page time to re-fetch the
        // unfiltered list and overwrite the search result before we ever
        // looked at the table.
        await this.page.waitForTimeout(500);
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

        // Wait for the page's own initial (unfiltered) participant list to
        // finish loading before touching the filter tab.
        await this.tableRows.first().waitFor({ state: "visible", timeout: 15000 }).catch(() => {});

        // Diagnostic: log exactly which DOM element this locator resolved
        // to, for visibility in CI logs.
        const elementInfo = await filterBtn.evaluate((el) => {
            const e = el as HTMLElement;
            return `<${e.tagName.toLowerCase()} class="${e.className}" role="${e.getAttribute("role") ?? ""}" data-testid="${e.getAttribute("data-testid") ?? ""}">${(e.textContent ?? "").trim().slice(0, 60)}</${e.tagName.toLowerCase()}>`;
        }).catch(() => "could not resolve element info");

        logger.info(`${status} filter locator resolved to: ${elementInfo}`);

        const rowsBefore = await this.tableRows.allTextContents();
        const urlBefore = this.page.url();

        const classBefore = await filterBtn.evaluate((el) => (el as HTMLElement).className).catch(() => "");
        const ariaSelectedBefore = await filterBtn.getAttribute("aria-selected").catch(() => null);

        // Capture any network requests fired in the few seconds after the
        // click, to see whether the app even attempts to fetch filtered
        // data, or whether the click only changes the tab's own visual
        // state with no corresponding request.
        const requestsSeen: string[] = [];
        const onRequest = (req: import("@playwright/test").Request) => {
            requestsSeen.push(`${req.method()} ${req.url()}`);
        };
        this.page.on("request", onRequest);

        await filterBtn.click();

        logger.info(
            `${status} filter clicked`
        );

        await this.page.waitForTimeout(800);

        this.page.off("request", onRequest);

        const rowsAfter = await this.tableRows.allTextContents();
        const urlAfter = this.page.url();

        const classAfter = await filterBtn.evaluate((el) => (el as HTMLElement).className).catch(() => "");
        const ariaSelectedAfter = await filterBtn.getAttribute("aria-selected").catch(() => null);

        if (urlBefore !== urlAfter) {
            logger.info(`URL changed after ${status} filter click: ${urlBefore} -> ${urlAfter}`);
        }

        if (classBefore !== classAfter || ariaSelectedBefore !== ariaSelectedAfter) {
            logger.info(
                `${status} tab's own state DID change on click - class: "${classBefore}" -> "${classAfter}", ` +
                `aria-selected: "${ariaSelectedBefore}" -> "${ariaSelectedAfter}". ` +
                `This means the click registered with the app (e.g. tab shows as active), ` +
                `but if the table still doesn't reflect the filter, the data-fetch/filter ` +
                `logic tied to that state change is what isn't working.`
            );
        } else {
            logger.error(
                `${status} tab's class/aria-selected did NOT change after click ` +
                `(class stayed "${classBefore}", aria-selected stayed "${ariaSelectedBefore}"). ` +
                `This suggests the click may not be registering as a real tab-selection at ` +
                `all from the app's perspective.`
            );
        }

        const filterLikeRequests = requestsSeen.filter(r =>
            /status|filter|approved|pending|rejected|participant/i.test(r)
        );

        logger.info(
            `Network requests fired within ~1.5s of the ${status} filter click ` +
            `(${requestsSeen.length} total, ${filterLikeRequests.length} filter-related): ` +
            `${JSON.stringify(filterLikeRequests.length > 0 ? filterLikeRequests : requestsSeen.slice(0, 10))}`
        );

        if (requestsSeen.length === 0) {
            logger.error(
                `No network requests were fired at all after clicking the ${status} filter. ` +
                `If this app fetches participant data from an API, this strongly suggests the ` +
                `filter click isn't triggering any data reload - a likely app-side defect rather ` +
                `than a test locator issue.`
            );
        }

        if (
            rowsBefore.length > 0 &&
            JSON.stringify(rowsBefore) === JSON.stringify(rowsAfter)
        ) {
            logger.error(
                `${status} filter click produced no visible change in the table within ~0.8s. ` +
                `The locator is confirmed to be the real filter tab (${elementInfo}). Not retrying ` +
                `the click here (a second click could re-toggle the tab off) - ` +
                `verifyAllRowsHaveStatus will poll for up to 8s afterward to check whether the ` +
                `filtered result appears with a short delay.`
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
     * Take repeated snapshots of the participant table over a time window
     * instead of a single sleep-then-check. This directly tests for a
     * suspected periodic auto-refresh on this page (the live "0% 0%"
     * progress column suggests polling) that may re-fetch the unfiltered
     * list and overwrite search/filter results shortly after they appear.
     * A single delayed check can't distinguish "filtering never worked"
     * from "it worked, then got clobbered a few seconds later" - this can.
     */
    private async pollTableSnapshots(
        label: string,
        durationMs = 8000,
        intervalMs = 1500
    ): Promise<{ atMs: number; rowCount: number; firstRowText: string }[]> {

        const snapshots: { atMs: number; rowCount: number; firstRowText: string }[] = [];
        const start = Date.now();

        while (Date.now() - start < durationMs) {
            const rowCount = await this.tableRows.count().catch(() => -1);
            const firstRowText = rowCount > 0
                ? (await this.tableRows.first().innerText().catch(() => "")).replace(/\s+/g, " ").trim()
                : "";

            snapshots.push({ atMs: Date.now() - start, rowCount, firstRowText });

            await this.page.waitForTimeout(intervalMs);
        }

        logger.info(
            `${label} snapshots over ${durationMs}ms: ` +
            JSON.stringify(snapshots.map(s => `${s.atMs}ms: ${s.rowCount} row(s)${s.firstRowText ? `, row1="${s.firstRowText}"` : ""}`))
        );

        return snapshots;
    }

    /**
     * Verify no matching participant
     */
    async verifyNoMatchingParticipant(): Promise<void> {

        logger.info(
            "Verifying no matching participant is displayed"
        );

        // Widened to cover more likely empty-state phrasings
        const noResultsMessage = this.page.getByText(
            /no participants found|no results found|no matching participants|no data|no records|nothing found|no participants to display|no participants match/i
        );

        const snapshots = await this.pollTableSnapshots("Invalid-search", 8000, 1500);

        const emptySnapshot = snapshots.find(s => s.rowCount === 0);

        if (emptySnapshot) {
            logger.info(
                `Table showed 0 rows at ${emptySnapshot.atMs}ms after searching - ` +
                `confirmed no matching participant (at least momentarily)`
            );

            // Check whether it STAYED empty or reverted - if it reverted,
            // that's evidence of the suspected periodic refresh clobbering
            // filtered state, which is worth flagging even though the
            // scenario's core assertion (no matches were ever shown) holds.
            const laterNonEmpty = snapshots.find(s => s.atMs > emptySnapshot.atMs && s.rowCount > 0);
            if (laterNonEmpty) {
                logger.error(
                    `The empty result REVERTED back to ${laterNonEmpty.rowCount} row(s) at ` +
                    `${laterNonEmpty.atMs}ms (row1="${laterNonEmpty.firstRowText}"). This strongly ` +
                    `suggests a periodic auto-refresh on this page re-fetches the unfiltered ` +
                    `participant list and overwrites active search state - likely an app-side ` +
                    `defect independent of whether this specific assertion passes.`
                );
            }

            return;
        }

        const isMessageVisible = await noResultsMessage.isVisible().catch(() => false);

        if (isMessageVisible) {
            logger.info(
                "Empty-state message confirmed"
            );
            return;
        }

        // Never empty and no recognized empty-state message at any snapshot
        logger.error(
            `Expected no matching participants for this search, but the table never showed ` +
            `0 rows or an empty-state message across ${snapshots.length} snapshots over 8s. ` +
            `This suggests the search input isn't actually filtering the list at all (not just ` +
            `a timing issue), or the app's empty-state message text doesn't match the expected ` +
            `phrasing.`
        );

        const lastRowTexts = (await this.tableRows.allTextContents())
            .map(t => t.replace(/\s+/g, " ").trim());

        await expect(
            noResultsMessage,
            `Search returned rows in every snapshot instead of an empty state. Last seen: ${JSON.stringify(lastRowTexts)}`
        ).toBeVisible({ timeout: 3000 });
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

        await this.tableRows.first().waitFor({
            state: "visible",
            timeout: 15000
        }).catch(() => {});

        // Instead of a single delayed check, poll several times over 8s and
        // record, at each point in time, whether every visible row matched
        // the expected status. This directly tests whether filtering ever
        // takes effect (even briefly) versus never working at all, and
        // whether a correct result reverts afterward (periodic refresh
        // clobbering the filter).
        const durationMs = 8000;
        const intervalMs = 1500;
        const start = Date.now();
        const timeline: { atMs: number; count: number; mismatchCount: number; sample: string }[] = [];
        let matchedAtMs: number | null = null;
        let revertedAfterMatch = false;

        while (Date.now() - start < durationMs) {
            const count = await this.tableRows.count();
            const rowTexts: string[] = [];

            for (let i = 0; i < count; i++) {
                const text = (await this.tableRows.nth(i).innerText().catch(() => "")).replace(/\s+/g, " ").trim();
                rowTexts.push(text);
            }

            const mismatches = rowTexts.filter(t => !new RegExp(status, "i").test(t));
            const atMs = Date.now() - start;

            timeline.push({
                atMs,
                count,
                mismatchCount: mismatches.length,
                sample: rowTexts[0] ?? ""
            });

            if (mismatches.length === 0 && count > 0 && matchedAtMs === null) {
                matchedAtMs = atMs;
            } else if (matchedAtMs !== null && mismatches.length > 0) {
                revertedAfterMatch = true;
            }

            await this.page.waitForTimeout(intervalMs);
        }

        logger.info(
            `${status} filter timeline over ${durationMs}ms: ` +
            JSON.stringify(timeline.map(t => `${t.atMs}ms: ${t.count} row(s), ${t.mismatchCount} mismatched, row1="${t.sample}"`))
        );

        if (matchedAtMs !== null) {
            logger.info(
                `All visible rows matched status "${status}" at ${matchedAtMs}ms after the filter click.`
            );

            if (revertedAfterMatch) {
                logger.error(
                    `The correctly-filtered result REVERTED to include mismatched rows later in ` +
                    `the same window. This strongly suggests a periodic auto-refresh re-fetches ` +
                    `the unfiltered participant list and overwrites the applied filter - likely ` +
                    `an app-side defect independent of whether this assertion passes.`
                );
            }

            return;
        }

        logger.error(
            `No snapshot in an 8s window showed all rows matching status "${status}" after ` +
            `clicking the ${status} filter. The filter locator is confirmed correct ` +
            `(a real "reg-admin-filter-tab" button), so this suggests the filter click never ` +
            `triggers any actual re-filtering of the data - a likely app-side defect rather ` +
            `than a test timing or locator issue.`
        );

        expect(
            timeline.some(t => t.mismatchCount === 0 && t.count > 0),
            `No point in an 8s window showed all rows matching "${status}". Timeline: ` +
            JSON.stringify(timeline)
        ).toBe(true);
    }
}

export default ParticipantPage;