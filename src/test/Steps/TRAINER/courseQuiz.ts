import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../world/world";
import quizData from "../../../../testdata/quizDataset.json";


// =====================================================
// Navigation
// =====================================================

When(
    'The trainer opens the {string} menu',
    async function (
        this: CustomWorld,
        menuName: string
    ) {

        if (menuName !== "My Trainings") {
            throw new Error(
                `Unsupported menu: ${menuName}`
            );
        }

        await this.quizPage.openMyTrainings();
    }
);


When(
    "The trainer selects the first course",
    async function (this: CustomWorld) {

        await this.quizPage.selectFirstCourse();
    }
);


When(
    'The trainer opens the {string} tab',
    async function (
        this: CustomWorld,
        tabName: string
    ) {

        if (tabName !== "AI Quiz") {
            throw new Error(
                `Unsupported tab: ${tabName}`
            );
        }

        await this.quizPage.openAIQuizTab();
    }
);


// =====================================================
// Quiz Creation
// =====================================================

When(
    'The trainer clicks the {string} button',
    async function (
        this: CustomWorld,
        buttonName: string
    ) {

        if (buttonName === "Create Manually") {

            await this.quizPage.clickCreateManually();

        } else {

            throw new Error(
                `Unsupported button: ${buttonName}`
            );
        }
    }
);


// =====================================================
// Create Quiz From Dataset
// =====================================================

When(
    'The trainer creates a quiz using the {string} dataset',
    async function (
        this: CustomWorld,
        datasetName: string
    ) {

        const data =
            quizData[
                datasetName as keyof typeof quizData
            ];

        if (!data) {
            throw new Error(
                `Dataset "${datasetName}" was not found in quizDataset.json`
            );
        }


        // Enter quiz title
        await this.quizPage.enterQuizTitle(
            data.quizTitle
        );


        // Create questions
        for (
            let index = 0;
            index < data.questions.length;
            index++
        ) {

            const question =
                data.questions[index];


            // First question already exists
            if (index > 0) {
                await this.quizPage.addQuestion();
            }


            await this.quizPage.fillQuestion(
                index,
                question.questionText,
                question.options,
                question.correctAnswer
            );
        }
    }
);


// =====================================================
// Save Quiz
// =====================================================

When(
    "The trainer saves the quiz as a draft",
    async function (this: CustomWorld) {

        await this.quizPage.saveQuizAsDraft();
    }
);


// =====================================================
// Verify Quiz Created
// =====================================================

Then(
    'The quiz should appear in the list with the expected question count and status {string} for the {string} dataset',
    async function (
        this: CustomWorld,
        expectedStatus: string,
        datasetName: string
    ) {

        const data =
            quizData[
                datasetName as keyof typeof quizData
            ];

        if (!data) {
            throw new Error(
                `Dataset "${datasetName}" was not found in quizDataset.json`
            );
        }


        const quiz =
            await this.quizPage.getQuizDetails(
                data.quizTitle
            );


        expect(
            quiz.questionCount
        ).toBe(
            data.questions.length
        );


        expect(
            quiz.status
        ).toBe(
            expectedStatus
        );
    }
);


// =====================================================
// Delete Quiz
// =====================================================

When(
    'The trainer deletes the quiz created from the {string} dataset',
    async function (
        this: CustomWorld,
        datasetName: string
    ) {

        const data =
            quizData[
                datasetName as keyof typeof quizData
            ];

        if (!data) {
            throw new Error(
                `Dataset "${datasetName}" was not found in quizDataset.json`
            );
        }


        await this.quizPage.deleteQuiz(
            data.quizTitle
        );
    }
);


// =====================================================
// Verify Quiz Deleted
// =====================================================

Then(
    'The quiz should no longer be available in the list for the {string} dataset',
    async function (
        this: CustomWorld,
        datasetName: string
    ) {

        const data =
            quizData[
                datasetName as keyof typeof quizData
            ];

        if (!data) {
            throw new Error(
                `Dataset "${datasetName}" was not found in quizDataset.json`
            );
        }


        await this.quizPage.verifyQuizNotPresent(
            data.quizTitle
        );
    }
);