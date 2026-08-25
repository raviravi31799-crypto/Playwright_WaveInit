import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basepage";

export class AddTrainingPage extends BasePage {

    readonly trainingPrograms: Locator;
    readonly addTrainingBtn: Locator;

    // Create Training
    readonly trainingTitle: Locator;
    readonly description: Locator;
    readonly trainerInput: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly capacity: Locator;
    readonly createTrainingBtn: Locator;
    readonly backToTrainingsBtn: Locator;

    // View Training
    readonly viewTrainingBtn: Locator;
    readonly closeBtn: Locator;

    // Edit Training
    readonly editTrainingBtn: Locator;
    readonly saveChangesBtn: Locator;

    // Edit form locators
    readonly editTitleInput: Locator;
    readonly editDescriptionInput: Locator;
    readonly editTrainerInput: Locator;
    readonly editStartDateInput: Locator;
    readonly editEndDateInput: Locator;
    readonly editCapacityInput: Locator;
    readonly deleteTrainingBtn: Locator;
    readonly confirmDeleteBtn: Locator;

    constructor(page: Page) {

        super(page);

        // =====================================
        // TRAINING PROGRAMS
        // =====================================

        this.trainingPrograms = page.getByText(
            "Training Programs",
            { exact: true }
        );

        // =====================================
        // CREATE TRAINING
        // =====================================

        this.addTrainingBtn = page.getByRole(
            "button",
            { name: "Add Training" }
        );

        this.trainingTitle = page.getByPlaceholder(
            "e.g. React Fundamentals"
        );

        this.description = page.getByPlaceholder(
            "Training objectives and content overview..."
        );

        this.trainerInput = page.getByPlaceholder(
            "Search trainers by name or email..."
        );

        this.startDate = page.locator(
            "input[type='datetime-local']"
        ).nth(0);

        this.endDate = page.locator(
            "input[type='datetime-local']"
        ).nth(1);

        this.capacity = page.locator(
            "input[type='number'][placeholder='e.g. 30']"
        );

        this.createTrainingBtn = page.getByRole(
            "button",
            {
                name: "Create Training Session"
            }
        );

        this.backToTrainingsBtn = page.getByRole(
            "button",
            {
                name: "Back to Trainings"
            }
        );

        // =====================================
        // VIEW TRAINING
        // =====================================

        this.viewTrainingBtn = page.locator(
            "button:has(svg.lucide-eye)"
        ).first();

        this.closeBtn = page.getByRole(
            "button",
            {
                name: "Close",
                exact: true
            }
        );

        // =====================================
        // EDIT TRAINING
        // =====================================

        // First Edit Training button
        this.editTrainingBtn = page
            .getByTitle("Edit Training")
            .first();

        this.saveChangesBtn = page.getByRole(
            "button",
            {
                name: "Save Changes"
            }
        );

        // =====================================
        // EDIT FORM
        // =====================================

        /*
         * Use the same fields only AFTER
         * the Edit form is opened.
         *
         * These are intentionally separate
         * locators from Create Training.
         */

        this.editTitleInput = page.locator(
            "input[type='text']"
        ).first();

        this.editDescriptionInput = page.locator(
            "textarea"
        ).first();

        this.editTrainerInput = page.getByPlaceholder(
            "Search trainers by name or email..."
        );

        this.editStartDateInput = page.locator(
            "input[type='datetime-local']"
        ).nth(0);

        this.editEndDateInput = page.locator(
            "input[type='datetime-local']"
        ).nth(1);

        this.editCapacityInput = page.locator(
            "input[type='number']"
        ).first();
        // Delete Training
this.deleteTrainingBtn = page
    .getByTitle("Delete Training")
    .first();

this.confirmDeleteBtn = page.getByRole(
    "button",
    {
        name: "Confirm",
        exact: true
    }
);
    }


    // =====================================
    // NAVIGATION
    // =====================================

    async clickTrainingPrograms(): Promise<void> {
        await this.trainingPrograms.click();
    }


    // =====================================
    // CREATE TRAINING
    // =====================================

    async clickAddTraining(): Promise<void> {
        await this.addTrainingBtn.click();
    }

    async enterTrainingTitle(
        title: string
    ): Promise<void> {

        await this.trainingTitle.fill(title);
    }

    async enterDescription(
        description: string
    ): Promise<void> {

        await this.description.fill(description);
    }

    async selectTrainer(
        trainer: string
    ): Promise<void> {

        await this.trainerInput.fill(trainer);

        await this.page
            .getByText(
                trainer,
                { exact: true }
            )
            .click();
    }

    async enterStartDate(
        dateTime: string
    ): Promise<void> {

        await this.startDate.fill(dateTime);
    }

    async enterEndDate(
        dateTime: string
    ): Promise<void> {

        await this.endDate.fill(dateTime);
    }

    async enterCapacity(
        capacity: string
    ): Promise<void> {

        await this.capacity.fill(capacity);
    }

    async clickCreateTraining(): Promise<void> {

        await this.createTrainingBtn.click();
    }

    async clickBackToTrainings(): Promise<void> {

        await this.backToTrainingsBtn.click();
    }


    // =====================================
    // VIEW TRAINING
    // =====================================

    async clickViewTraining(): Promise<void> {

        await this.viewTrainingBtn.click();
    }

    async verifyTrainingDetails(): Promise<void> {

        await this.page
            .getByText(
                "Training Details",
                { exact: true }
            )
            .waitFor({
                state: "visible"
            });
    }

    async clickClose(): Promise<void> {

        await this.closeBtn.click();
    }


    // =====================================
    // EDIT TRAINING
    // =====================================

    async clickEditTraining(): Promise<void> {

        await this.editTrainingBtn.click();

        // Wait until Save Changes appears.
        await this.saveChangesBtn.waitFor({
            state: "visible"
        });
    }


    async editTrainingTitle(
        title: string
    ): Promise<void> {

        await this.editTitleInput.waitFor({
            state: "visible"
        });

        await this.editTitleInput.fill(title);
    }


    async editDescription(
        description: string
    ): Promise<void> {

        await this.editDescriptionInput.waitFor({
            state: "visible"
        });

        await this.editDescriptionInput.fill(
            description
        );
    }


async editTrainer(trainer: string): Promise<void> {

    const trainerRow = this.page
        .locator("label")
        .filter({
            hasText: trainer
        })
        .first();

    const checkbox = trainerRow.locator(
        "input[type='checkbox']"
    );

    await checkbox.waitFor({
        state: "visible",
        timeout: 10000
    });

    if (!(await checkbox.isChecked())) {
        await checkbox.check();
    }
}


    async editStartDate(
        dateTime: string
    ): Promise<void> {

        await this.editStartDateInput.fill(
            dateTime
        );
    }


    async editEndDate(
        dateTime: string
    ): Promise<void> {

        await this.editEndDateInput.fill(
            dateTime
        );
    }


    async editCapacity(
        capacity: string
    ): Promise<void> {

        await this.editCapacityInput.fill(
            capacity
        );
    }


    async clickSaveChanges(): Promise<void> {
    await this.saveChangesBtn.click();

    await this.page
        .getByText("Training Programs", { exact: true })
        .waitFor({
            state: "visible",
            timeout: 10000
        });
}


    async verifyTrainingUpdated(trainingTitle: string): Promise<void> {
    await this.page
        .getByText(trainingTitle, { exact: true })
        .waitFor({
            state: "visible",
            timeout: 10000
        });
}
    // =====================================
// DELETE TRAINING
// =====================================

async clickDeleteTraining(): Promise<void> {
    await this.deleteTrainingBtn.click();
}

async verifyDeleteConfirmation(): Promise<void> {
    await this.confirmDeleteBtn.waitFor({
        state: "visible",
        timeout: 10000
    });
}

async confirmDeleteTraining(): Promise<void> {
    await this.confirmDeleteBtn.click();
}
async getFirstTrainingTitle(): Promise<string> {
    const firstRow = this.page.locator("tbody tr").first();

    return (
        await firstRow
            .locator("td")
            .nth(0)
            .innerText()
    ).trim();
}

async verifyTrainingDeleted(trainingTitle: string): Promise<void> {
    await this.page
        .getByText(trainingTitle, { exact: true })
        .waitFor({
            state: "hidden",
            timeout: 10000
        });
}
}

export default AddTrainingPage;