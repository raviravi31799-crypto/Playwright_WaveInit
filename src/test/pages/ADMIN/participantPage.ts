import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../utils/logger";

export class ParticipantPage extends BasePage {

    readonly participantsMenu: Locator;
    readonly addParticipantBtn: Locator;

    // "Add New Participant" modal, scoped so its own "Add Participant"
    // submit button never collides with the header "+ Add Participant" button
    readonly modal: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly accountStatusSelect: Locator;
    readonly passwordInput: Locator;
    readonly cancelBtn: Locator;
    readonly submitBtn: Locator;

    readonly searchInput: Locator;

    // Delete confirmation modal ("Delete participant "X"? ... Cancel / Confirm")
    readonly deleteConfirmModal: Locator;
    readonly confirmDeleteBtn: Locator;

    constructor(page: Page) {
        super(page);

        // Sidebar navigation
        this.participantsMenu = page.getByRole(
            "button",
            { name: "Participants", exact: true }
        );

        // "Add Participant" button on the Participants list page
        this.addParticipantBtn = page.getByRole(
            "button",
            { name: "Add Participant" }
        );

        // Add New Participant modal
        this.modal = page.locator("div.reg-modal");

        this.fullNameInput = this.modal.getByPlaceholder("e.g. Rahul Sharma");

        this.emailInput = this.modal.getByPlaceholder("e.g. rahul@example.com");

        this.phoneInput = this.modal.getByPlaceholder("e.g. 9876543210");

        this.accountStatusSelect = this.modal.locator("select.reg-select");

      this.passwordInput = this.modal.getByPlaceholder("Enter password (min 8 chars, mixed case, symbol)"  );

        this.cancelBtn = this.modal.getByRole(
            "button",
            { name: "Cancel", exact: true }
        );

        this.submitBtn = this.modal.getByRole(
            "button",
            { name: "Add Participant" }
        );

        // Participants list page
        this.searchInput = page.getByPlaceholder("Search participants...");

        // Delete confirmation modal
        this.deleteConfirmModal = page.locator("div.reg-modal.reg-modal--small");

        this.confirmDeleteBtn = this.deleteConfirmModal.getByRole(
            "button",
            { name: "Confirm", exact: true }
        );
    }

    /**
     * Click on "Participants" in the sidebar navigation
     */
    async clickParticipantsMenu(): Promise<void> {
        await this.click(this.participantsMenu, "Participants Sidebar Link");
    }

    /**
     * Click on "Add Participant" button on the Participants list page
     */
    async clickAddParticipant(): Promise<void> {
        await this.click(this.addParticipantBtn, "Add Participant Button");
    }

    async enterFullName(fullName: string): Promise<void> {
        await this.sendKeys(this.fullNameInput, fullName, "Full Name");
    }

    async enterEmail(email: string): Promise<void> {
        await this.sendKeys(this.emailInput, email, "Email Address");
    }

    async enterPhone(phone: string): Promise<void> {
        await this.sendKeys(this.phoneInput, phone, "Phone Number");
    }

    async selectAccountStatus(status: string): Promise<void> {
        logger.info(`Selecting "${status}" from: Account Status`);
        await this.accountStatusSelect.waitFor({ state: "visible" });
        await this.accountStatusSelect.selectOption({ label: status });
    }

    async enterPassword(password: string): Promise<void> {
        await this.sendKeys(this.passwordInput, password, "Password");
    }

    /**
     * Fill in the basic details of the Add New Participant form
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
     * Submit the Add New Participant form
     */
    async clickSubmit(): Promise<void> {
        await this.click(this.submitBtn, "Add Participant (submit) Button");
    }

    /**
     * Click "Cancel" on the Add New Participant form
     */
    async clickCancel(): Promise<void> {
        await this.click(this.cancelBtn, "Cancel Button");
    }

    /**
     * Verify the Add New Participant modal has closed and the
     * participant list page is visible again
     */
    async verifyFormClosed(): Promise<void> {
        logger.info("Verifying Add New Participant form is closed");
        await this.modal.waitFor({ state: "hidden", timeout: 10000 });
        await expect(this.addParticipantBtn).toBeVisible();
        logger.info("Add New Participant form closed successfully");
    }

    /**
     * Search for a participant by name/email using the search box
     */
    async searchParticipant(name: string): Promise<void> {
        await this.sendKeys(this.searchInput, name, "Search Participants");
        // give the list a moment to filter down before locating the row
        await this.page.waitForTimeout(500);
    }

    /**
     * Locate the table row for a given participant by exact name text
     */
    getParticipantRow(name: string): Locator {
        return this.page
            .locator("tr")
            .filter({ has: this.page.getByText(name, { exact: true }) });
    }

    async clickApprove(name: string): Promise<void> {
        const row = this.getParticipantRow(name);
        await this.click(
            row.getByRole("button", { name: "Approve participant" }),
            `Approve Participant (${name})`
        );
    }

    async clickReject(name: string): Promise<void> {
        const row = this.getParticipantRow(name);
        await this.click(
            row.getByRole("button", { name: "Reject participant" }),
            `Reject Participant (${name})`
        );
    }

    // async clickDelete(name: string): Promise<void> {
    //     const row = this.getParticipantRow(name);
    //     await this.click(
    //         row.getByRole("button", { name: "Delete participant" }),
    //         `Delete Participant (${name})`
    //     );
    // }
    async clickDelete(name: string): Promise<void> {
     const row = this.getParticipantRow(name);
     await this.click(
         row.getByRole("button", { name: "Delete participant" }),
         `Delete Participant (${name})`
     );
   }

    /**
     * Confirm the deletion in the "Delete participant "X"?" confirmation
     * modal that appears after clicking the trash icon
     */
    // async confirmDelete(): Promise<void> {
    //     await this.deleteConfirmModal.waitFor({ state: "visible", timeout: 10000 });
    //     await this.click(this.confirmDeleteBtn, "Confirm Delete Button");
    // }
    async confirmDelete(): Promise<void> {
      await this.deleteConfirmModal.waitFor({ state: "visible", timeout: 10000 });
      await this.click(this.confirmDeleteBtn, "Confirm Delete Button");
  }

    /**
     * Verify that a toast notification appears whose text contains the
     * expected text (case-insensitive). This app surfaces success/status
     * messages as an in-page toast (bottom-right), not a native alert.
     */
    async verifyToastContains(expectedText: string): Promise<void> {
        logger.info(`Verifying toast message contains: "${expectedText}"`);

        const escaped = expectedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const toastLocator = this.page
            .getByText(new RegExp(escaped, "i"))
            .last();

        await toastLocator.waitFor({ state: "visible", timeout: 10000 });
        await expect(toastLocator).toBeVisible();

        logger.info("Toast message verified successfully");
    }
    async verifyParticipantRemoved(name: string): Promise<void> {
     logger.info(`Verifying participant "${name}" is removed from the list`);
     await expect(this.getParticipantRow(name)).toHaveCount(0, { timeout: 10000 });
     logger.info(`Participant "${name}" confirmed removed`);
  }
}

export default ParticipantPage;
