import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basepage";

export class AddTrainingPage extends BasePage {

    readonly trainingPrograms: Locator;
    readonly addTrainingBtn: Locator;
    readonly trainingTitle: Locator;
    readonly description: Locator;
    readonly trainerInput: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly capacity: Locator;
    readonly createTrainingBtn: Locator;
    readonly backToTrainingsBtn: Locator;

    constructor(page: Page) {
        super(page);

        // Training Programs
        this.trainingPrograms = page.getByText(
            "Training Programs",
            { exact: true }
        );

        // Add Training
        this.addTrainingBtn = page.getByRole(
            "button",
            { name: "Add Training" }
        );

        // Training Title
        this.trainingTitle = page.getByPlaceholder(
            "e.g. React Fundamentals"
        );

        // Description
        this.description = page.getByPlaceholder(
            "Training objectives and content overview..."
        );

        // Trainer
        this.trainerInput = page.getByPlaceholder(
            "Search trainers by name or email..."
        );

        // Start Date
        this.startDate = page.locator(
            "input[type='datetime-local']"
        ).nth(0);

        // End Date
        this.endDate = page.locator(
            "input[type='datetime-local']"
        ).nth(1);

        // Capacity
        this.capacity = page.locator(
            "input[type='number'][placeholder='e.g. 30']"
        );

        // Create Training
        this.createTrainingBtn = page.getByRole(
            "button",
            { name: "Create Training Session" }
        );
        this.backToTrainingsBtn = page.getByRole(
    "button",
    { name: "Back to Trainings" }
);
    }

    async clickTrainingPrograms(): Promise<void> {
        await this.trainingPrograms.click();
    }

    async clickAddTraining(): Promise<void> {
        await this.addTrainingBtn.click();
    }

    async enterTrainingTitle(title: string): Promise<void> {
        await this.trainingTitle.fill(title);
    }

    async enterDescription(description: string): Promise<void> {
        await this.description.fill(description);
    }

    async selectTrainer(trainer: string): Promise<void> {
        await this.trainerInput.fill(trainer);
        await this.page.getByText(trainer, { exact: true }).click();
    }

    async enterStartDate(dateTime: string): Promise<void> {
        await this.startDate.fill(dateTime);
    }

    async enterEndDate(dateTime: string): Promise<void> {
        await this.endDate.fill(dateTime);
    }

    async enterCapacity(capacity: string): Promise<void> {
        await this.capacity.fill(capacity);
    }

    async clickCreateTraining(): Promise<void> {
        await this.createTrainingBtn.click();
    }
    async clickBackToTrainings(): Promise<void> {
    await this.backToTrainingsBtn.click();
}
}

export default AddTrainingPage;