import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../utils/logger";

export class QuizPage extends BasePage {

    // ==========================================
    // Navigation Locators
    // ==========================================

    private myTrainingsMenu: Locator;

    private firstCourse: Locator;

    private aiQuizTab: Locator;


    // ==========================================
    // Quiz Creation Locators
    // ==========================================

    private createManuallyButton: Locator;

    private quizTitleInput: Locator;

    private addQuestionButton: Locator;

    private saveAsDraftButton: Locator;


    // ==========================================
    // Quiz List Locators
    // ==========================================

    private quizTable: Locator;


    // ==========================================
    // Edit Quiz Locators
    // ==========================================

    private editQuizModalTitle: Locator;

    private saveChangesButton: Locator;

    private closeEditModalButton: Locator;


    // ==========================================
    // Publish Quiz Locators
    // ==========================================

    private confirmPublishButton: Locator;


    // ==========================================
    // Preview Quiz Locators
    // ==========================================

    private previewModalHeading: Locator;

    private closePreviewModalButton: Locator;


    // ==========================================
    // Constructor
    // ==========================================
 

    constructor(page: Page) {

        super(page);

        this.myTrainingsMenu = page.locator(
            ".wl-sidebar-item",
            {
                hasText: "My Trainings"
            }
        );

        this.firstCourse = page
            .locator(".wl-sidebar-course-item")
            .first();

        this.aiQuizTab = page.getByRole(
            "tab",
            {
                name: "AI Quiz"
            }
        );

        this.createManuallyButton = page.getByRole(
            "button",
            {
                name: "Create Manually",
                exact: true
            }
        );

        this.quizTitleInput = page.getByPlaceholder(
            "e.g. Module 2 Knowledge Check"
        );

        this.addQuestionButton = page.getByRole(
            "button",
            {
                name: "Add question"
            }
        );

        this.saveAsDraftButton = page.getByRole(
            "button",
            {
                name: "Save as Draft"
            }
        );

        this.quizTable = page.locator(
            "table.cqt-table"
        );

        this.editQuizModalTitle = page.getByRole(
            "heading",
            {
                name: "Edit quiz"
            }
        );

        this.saveChangesButton = page.getByRole(
            "button",
            {
                name: "Save Changes"
            }
        );

        this.closeEditModalButton = page.locator(
            ".cqt-modal-close, button:has(svg.lucide-x)"
        ).first();

        this.confirmPublishButton = page.getByRole(
            "button",
            {
                name: "Publish"
            }
        );

        this.previewModalHeading = page.getByRole(
            "heading",
            {
                name: "Quiz Preview"
            }
        );

        this.closePreviewModalButton = page.locator(
            ".cqt-modal-close, button:has(svg.lucide-x)"
        ).first();
    }


    // ==========================================
    // Navigation Methods
    // ==========================================

    async openMyTrainings(): Promise<void> {

        logger.info(
            "Opening My Trainings menu"
        );

        await this.click(
            this.myTrainingsMenu,
            "My Trainings"
        );
    }


    async selectFirstCourse(): Promise<void> {

        logger.info(
            "Selecting first course"
        );

        await this.click(
            this.firstCourse,
            "First Course"
        );
    }


    async openAIQuizTab(): Promise<void> {

        logger.info(
            "Opening AI Quiz tab"
        );

        // Keep the original working behaviour:
        // just click the AI Quiz tab. The application itself
        // loads the quiz content asynchronously.
        await this.click(
            this.aiQuizTab,
            "AI Quiz"
        );
    }


    // ==========================================
    // Quiz Creation Methods
    // ==========================================

    async clickCreateManually(): Promise<void> {

        logger.info(
            "Waiting for Create Manually button"
        );

        await this.createManuallyButton.waitFor({
            state: "visible",
            timeout: 30000
        });

        await expect(
            this.createManuallyButton
        ).toBeEnabled({
            timeout: 10000
        });

        await this.createManuallyButton.scrollIntoViewIfNeeded();

        logger.info(
            "Create Manually button is visible and enabled"
        );

        await this.createManuallyButton.click();

        logger.info(
            "Create Manually clicked successfully"
        );

        // Confirm that the Create Manually form opened.
        await this.quizTitleInput.waitFor({
            state: "visible",
            timeout: 15000
        });
    }


    async enterQuizTitle(
        title: string
    ): Promise<void> {

        logger.info(
            `Entering quiz title: ${title}`
        );

        await this.sendKeys(
            this.quizTitleInput,
            title,
            "Quiz Title"
        );
    }


    async addQuestion(): Promise<void> {

        logger.info(
            "Adding question"
        );

        const questionCountBefore =
            await this.getQuestionCount();

        await this.click(
            this.addQuestionButton,
            "Add Question"
        );

        await this.page.waitForFunction(
            (expectedCount) => {

                return document.querySelectorAll(
                    'textarea[placeholder*="question" i]'
                ).length >= expectedCount;

            },
            questionCountBefore + 1
        );
    }


    private async getQuestionCount(): Promise<number> {

        return await this.page
            .locator(
                'textarea[placeholder*="question" i]'
            )
            .count();
    }


    // ==========================================
    // Question Locators
    // ==========================================

    private questionField(
        index: number
    ): Locator {

        return this.page
            .locator(
                'textarea[placeholder*="question" i]'
            )
            .nth(index);
    }


    private optionField(
        questionIndex: number,
        optionIndex: number
    ): Locator {

        return this.page
            .locator(
                `input[name="q_${questionIndex}_opt"]`
            )
            .nth(optionIndex)
            .locator(
                "xpath=following-sibling::input"
            );
    }


    private optionRadio(
        questionIndex: number,
        optionIndex: number
    ): Locator {

        return this.page
            .locator(
                `input[name="q_${questionIndex}_opt"]`
            )
            .nth(optionIndex);
    }


    // ==========================================
    // Fill Question
    // ==========================================

    async fillQuestion(
        index: number,
        questionText: string,
        options: string[],
        correctAnswer: string
    ): Promise<void> {

        logger.info(
            `Filling question ${index + 1}`
        );

        const question =
            this.questionField(index);

        await question.waitFor({
            state: "visible"
        });

        await this.sendKeys(
            question,
            questionText,
            `Question ${index + 1}`
        );


        for (
            let optionIndex = 0;
            optionIndex < options.length;
            optionIndex++
        ) {

            await this.sendKeys(
                this.optionField(
                    index,
                    optionIndex
                ),
                options[optionIndex],
                `Question ${index + 1} Option ${optionIndex + 1}`
            );


            if (
                options[optionIndex] === correctAnswer
            ) {

                await this.check(
                    this.optionRadio(
                        index,
                        optionIndex
                    ),
                    `Correct answer for Question ${index + 1}`
                );
            }
        }
    }


    // ==========================================
    // Save Quiz
    // ==========================================

    async saveQuizAsDraft(): Promise<void> {

        logger.info(
            "Saving quiz as draft"
        );

        await this.click(
            this.saveAsDraftButton,
            "Save as Draft"
        );

        await this.quizTable.waitFor({
            state: "visible"
        });
    }


    // ==========================================
    // Quiz Row
    // ==========================================

    private quizRows(
        quizTitle: string
    ): Locator {

        return this.page
            .locator("tr")
            .filter({
                has: this.page.getByText(
                    quizTitle,
                    {
                        exact: true
                    }
                )
            });
    }


    private quizRow(
        quizTitle: string
    ): Locator {

        return this.quizRows(
            quizTitle
        ).last();
    }


    // ==========================================
    // Get Quiz Details
    // ==========================================

    async getQuizDetails(
        quizTitle: string
    ): Promise<{
        questionCount: number;
        status: string;
    }> {

        logger.info(
            `Getting quiz details: ${quizTitle}`
        );

        const row =
            this.quizRow(quizTitle);

        await row.waitFor({
            state: "visible"
        });


        const cells = row.locator("td");

        const questionCountText =
            await cells.nth(3).textContent();

        const statusText =
            await cells.nth(4).textContent();


        return {

            questionCount: Number(
                questionCountText?.trim()
            ),

            status:
                statusText?.trim() || ""
        };
    }


    // ==========================================
    // Delete Quiz Button Locator — tries several
    // reasonable selectors for the trash icon
    // ==========================================

    private deleteButton(
        quizTitle: string
    ): Locator {

        const row = this.quizRow(quizTitle);

        return row.locator(
            "button[title=\"Delete\"]"
        );
    }


    // ==========================================
    // Delete Quiz
    // ==========================================

    async deleteQuiz(quizTitle: string): Promise<void> {

        logger.info(
            `Deleting existing quiz: ${quizTitle}`
        );

        const rows = this.quizRows(quizTitle);

        // The AI Quiz page loads the rows asynchronously.
        // Wait for the requested quiz to appear instead of
        // checking rows.count() immediately.
        await expect.poll(
            async () => await rows.count(),
            {
                timeout: 30000,
                message:
                    `Quiz "${quizTitle}" did not appear in the list within 30 seconds.`
            }
        ).toBeGreaterThan(0);

        const rowCountBefore =
            await rows.count();

        logger.info(
            `Found ${rowCountBefore} quiz row(s) with title "${quizTitle}".`
        );

        const row = rows.last();

        await row.waitFor({
            state: "visible",
            timeout: 10000
        });

        // This selector is confirmed by the application's HTML.
        const deleteBtn = row.locator(
            'button[title="Delete"]'
        );

        await expect(deleteBtn).toBeVisible({
            timeout: 10000
        });

        await this.click(
            deleteBtn,
            "Delete Quiz"
        );

        const confirmDeleteButton =
            this.page.getByRole(
                "button",
                {
                    name: "Delete Permanently"
                }
            );

        await confirmDeleteButton.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            confirmDeleteButton,
            "Delete Permanently"
        );

        const expectedCount =
            rowCountBefore - 1;

        try {

            await expect.poll(
                async () =>
                    await this.quizRows(
                        quizTitle
                    ).count(),
                {
                    timeout: 15000,
                    message:
                        `Quiz "${quizTitle}" was not removed from the list.`
                }
            ).toBe(expectedCount);

        } catch {

            logger.info(
                "Quiz list did not update immediately. Reloading once."
            );

            await this.reload();

            await expect.poll(
                async () =>
                    await this.quizRows(
                        quizTitle
                    ).count(),
                {
                    timeout: 20000,
                    message:
                        `After reload, quiz "${quizTitle}" was not removed.`
                }
            ).toBe(expectedCount);
        }

        logger.info(
            `Quiz "${quizTitle}" deleted successfully.`
        );
    }

    // ==========================================
    // Verify Quiz Not Present
    // ==========================================

    async verifyQuizNotPresent(
        quizTitle: string
    ): Promise<void> {
        logger.info(
            `Verifying quiz is no longer available: ${quizTitle}`
        );

        await expect(
            this.quizRows(quizTitle)
        ).toHaveCount(0, { timeout: 10000 });

        logger.info(
            `Quiz "${quizTitle}" is no longer available.`
        );
    }


    // ==========================================
    // Edit Quiz Row Locator — tries several
    // reasonable selectors for the pencil icon
    // ==========================================



    // ==========================================
    // Open Edit Quiz Modal — with diagnostics
    // ==========================================

    async openEditQuiz(
        quizTitle: string
    ): Promise<void> {

        logger.info(
            `Opening Edit Quiz modal: ${quizTitle}`
        );

        const row =
            this.quizRow(quizTitle);

        await row.waitFor({
            state: "visible"
        });

        const editBtn = this.editButton(quizTitle);

        const count = await editBtn.count();

        if (count === 0) {

            logger.error(
                `No edit button found in row for "${quizTitle}". ` +
                `Dumping row HTML for debugging.`
            );

            const html = await row.innerHTML();
            logger.error(`Row HTML: ${html}`);

            throw new Error(
                `Edit button not found for quiz "${quizTitle}". ` +
                `See logged row HTML above to fix the selector.`
            );
        }

        await this.click(
            editBtn.first(),
            "Edit Quiz"
        );

        await this.editQuizModalTitle.waitFor({
            state: "visible",
            timeout: 15000
        });
    }


    // ==========================================
    // Edit Question Text (reuses questionField)
    // ==========================================

    async editQuestionText(
        index: number,
        newText: string
    ): Promise<void> {

        logger.info(
            `Editing question ${index + 1} text to: ${newText}`
        );

        const question =
            this.questionField(index);

        await question.waitFor({
            state: "visible"
        });

        await this.clearAndType(
            question,
            newText,
            `Question ${index + 1}`
        );
    }


    // ==========================================
    // Read Question Text From Modal
    // ==========================================

    async getQuestionTextInModal(
        index: number
    ): Promise<string> {

        const question =
            this.questionField(index);

        await question.waitFor({
            state: "visible"
        });

        return await this.getInputValue(
            question,
            `Question ${index + 1}`
        );
    }


    // ==========================================
    // Save Edit Changes
    // ==========================================

    async saveEditChanges(): Promise<void> {

        logger.info(
            "Saving quiz changes"
        );

        await this.click(
            this.saveChangesButton,
            "Save Changes"
        );

        await this.editQuizModalTitle.waitFor({
            state: "hidden"
        });

        await this.quizTable.waitFor({
            state: "visible"
        });
    }


    // ==========================================
    // Close Edit Modal (no save)
    // ==========================================

    async closeEditModal(): Promise<void> {

        logger.info(
            "Closing Edit Quiz modal"
        );

        await this.click(
            this.closeEditModalButton,
            "Close Edit Modal"
        );

        await this.editQuizModalTitle.waitFor({
            state: "hidden"
        });
    }


    // ==========================================
    // Publish Quiz Row Locator — tries several
    // reasonable selectors for the publish icon
    // ==========================================

    private publishButton(
        quizTitle: string
    ): Locator {

        const row = this.quizRow(quizTitle);

        return row
            .locator(".cqt-action-btn--publish")
            .or(row.locator("button[aria-label='Publish' i]"))
            .or(row.locator("button[title='Publish' i]"))
            .or(row.locator("button:has(svg.lucide-send)"))
            .or(row.locator("button:has(svg.lucide-share)"))
            .or(row.locator("[data-testid='publish-quiz']"));
    }


    // ==========================================
    // Publish Quiz — with diagnostics
    // ==========================================

    async publishQuiz(
        quizTitle: string
    ): Promise<void> {

        logger.info(
            `Publishing quiz: ${quizTitle}`
        );

        const row =
            this.quizRow(quizTitle);

        await row.waitFor({
            state: "visible"
        });

        const publishBtn = this.publishButton(quizTitle);

        const count = await publishBtn.count();

        if (count === 0) {

            const html = await row.innerHTML();
            logger.error(`No publish button found. Row HTML: ${html}`);

            throw new Error(
                `Publish button not found for quiz "${quizTitle}". ` +
                `See logged row HTML above to fix the selector.`
            );
        }

        await this.click(
            publishBtn.first(),
            "Publish Quiz"
        );

        await this.confirmPublishButton.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            this.confirmPublishButton,
            "Confirm Publish"
        );

        await this.confirmPublishButton.waitFor({
            state: "hidden",
            timeout: 15000
        });
    }


    // ==========================================
    // Preview Quiz Row Locator — tries several
    // reasonable selectors for the eye icon
    // ==========================================

    private previewButton(
        quizTitle: string
    ): Locator {

        const row = this.quizRow(quizTitle);

        return row
            .locator(".cqt-action-btn--preview")
            .or(row.locator("button[aria-label='Preview' i]"))
            .or(row.locator("button[title='Preview' i]"))
            .or(row.locator("button:has(svg.lucide-eye)"))
            .or(row.locator("[data-testid='preview-quiz']"));
    }


    // ==========================================
    // Open / Close Preview Quiz Modal — with
    // diagnostics on open
    // ==========================================

    async openPreview(
        quizTitle: string
    ): Promise<void> {

        logger.info(
            `Opening Preview Quiz modal: ${quizTitle}`
        );

        const row =
            this.quizRow(quizTitle);

        await row.waitFor({
            state: "visible"
        });

        const previewBtn = this.previewButton(quizTitle);

        const count = await previewBtn.count();

        if (count === 0) {

            const html = await row.innerHTML();
            logger.error(`No preview button found. Row HTML: ${html}`);

            throw new Error(
                `Preview button not found for quiz "${quizTitle}". ` +
                `See logged row HTML above to fix the selector.`
            );
        }

        await this.click(
            previewBtn.first(),
            "Preview Quiz"
        );

        await this.previewModalHeading.waitFor({
            state: "visible",
            timeout: 15000
        });
    }


    async getPreviewQuestionCount(): Promise<number> {

        return await this.page
            .locator(".cqt-preview-question")
            .count();
    }


    async closePreview(): Promise<void> {

        logger.info(
            "Closing Preview Quiz modal"
        );

        await this.click(
            this.closePreviewModalButton,
            "Close Preview Modal"
        );

        await this.previewModalHeading.waitFor({
            state: "hidden"
        });
    }
 private editButton(quizTitle: string): Locator {
    const row = this.quizRow(quizTitle);

    return row.locator('button[title="Edit"]');
}
async clickEditQuiz(quizTitle: string): Promise<void> {

    logger.info(`Editing quiz: ${quizTitle}`);

    const row = this.quizRow(quizTitle);

    await expect.poll(
        async () => {
            return await row.count();
        },
        {
            timeout: 30000,
            message: `Quiz "${quizTitle}" was not found in the quiz list.`
        }
    ).toBeGreaterThan(0);

    logger.info(`Quiz row found: ${quizTitle}`);

    await row.first().scrollIntoViewIfNeeded();

    const editButton = row.locator(
        'button[title="Edit"]'
    );

    await expect.poll(
        async () => {
            return await editButton.count();
        },
        {
            timeout: 10000,
            message: `Edit button was not found for quiz "${quizTitle}".`
        }
    ).toBeGreaterThan(0);

    await editButton.first().waitFor({
        state: "visible",
        timeout: 10000
    });

    logger.info(
        `Clicking Edit button for: ${quizTitle}`
    );

    await editButton.first().click();

    // Do NOT wait for the "Edit quiz" heading.
    // Confirm the modal by waiting for the quiz title input,
    // which is visibly present in the Edit Quiz modal.
    await this.quizTitleInput.waitFor({
        state: "visible",
        timeout: 15000
    });

    logger.info(
        `Edit quiz modal opened for: ${quizTitle}`
    );
}
async updateQuizTitle(title: string): Promise<void> {
    logger.info(`Updating quiz title to: ${title}`);

    await this.quizTitleInput.waitFor({
        state: "visible",
        timeout: 10000
    });

    await this.quizTitleInput.fill(title);
}
async updateQuestion(
    questionText: string
): Promise<void> {
    logger.info(`Updating question to: ${questionText}`);

    const question = this.questionField(0);

    await question.waitFor({
        state: "visible",
        timeout: 10000
    });

    await question.fill(questionText);
}
async updateQuestionOptions(
    options: string[],
    correctAnswer: string
): Promise<void> {

    logger.info("Updating question options");

    for (let i = 0; i < options.length; i++) {

        const option = this.optionField(0, i);

        await option.waitFor({
            state: "visible",
            timeout: 10000
        });

        await option.fill(options[i]);
    }

    const correctIndex = options.indexOf(correctAnswer);

    if (correctIndex === -1) {
        throw new Error(
            `Correct answer "${correctAnswer}" was not found in options.`
        );
    }

    await this.optionRadio(
        0,
        correctIndex
    ).check();
}
async saveEditedQuiz(): Promise<void> {
    logger.info("Saving edited quiz");

    await this.saveChangesButton.waitFor({
        state: "visible",
        timeout: 10000
    });

    await this.saveChangesButton.click();

    await this.editQuizModalTitle.waitFor({
        state: "hidden",
        timeout: 15000
    });

    logger.info("Edited quiz saved successfully");
}
}


export default QuizPage;
