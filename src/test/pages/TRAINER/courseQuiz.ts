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

        this.createManuallyButton = page.locator(
            ".cqt-btn-manual"
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
            "Clicking Create Manually"
        );

        await this.click(
            this.createManuallyButton,
            "Create Manually"
        );
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
            .locator(
                "table.cqt-table tbody tr"
            )
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


        const questionCountText =
            await row
                .locator("td.cqt-cell-num")
                .textContent();


        const statusText =
            await row
                .locator(".cqt-badge")
                .first()
                .textContent();


        return {

            questionCount: Number(
                questionCountText?.trim()
            ),

            status:
                statusText?.trim() || ""
        };
    }


    // ==========================================
    // Delete Quiz
    // ==========================================

    async deleteQuiz(
        quizTitle: string
    ): Promise<void> {

        logger.info(
            `Deleting quiz: ${quizTitle}`
        );

        const row =
            this.quizRow(quizTitle);

        await row.waitFor({
            state: "visible"
        });


        const deleteButton =
            row.locator(
                ".cqt-action-btn--delete"
            );


        await this.click(
            deleteButton,
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
            state: "visible"
        });


        await this.click(
            confirmDeleteButton,
            "Delete Permanently"
        );


        await row.waitFor({
            state: "detached"
        });
    }


    // ==========================================
    // Verify Quiz Not Present
    // ==========================================

    async verifyQuizNotPresent(
        quizTitle: string
    ): Promise<void> {

        logger.info(
            `Verifying quiz is removed: ${quizTitle}`
        );

        const rows =
            this.quizRows(quizTitle);

        await expect(
            rows
        ).toHaveCount(0);
    }
}


export default QuizPage;