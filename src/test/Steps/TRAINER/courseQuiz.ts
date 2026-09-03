import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../world/world";
import quizData from "../../../../testdata/quizDataset.json";


// =====================================================
// QUIZ NAVIGATION
// =====================================================

When(
    'The trainer opens the {string} menu',
    async function (
        this: CustomWorld,
        menuName: string
    ) {
        if (menuName !== "My Trainings") {
            throw new Error(
                `Unsupported menu: "${menuName}"`
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
                `Unsupported tab: "${tabName}"`
            );
        }

        await this.quizPage.openAIQuizTab();
    }
);


// =====================================================
// CREATE QUIZ
// =====================================================

When(
    'The trainer clicks the "Create Manually" button',
    async function (this: CustomWorld) {
        await this.quizPage.clickCreateManually();
    }
);


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

        await this.quizPage.enterQuizTitle(
            data.quizTitle
        );

        for (
            let i = 0;
            i < data.questions.length;
            i++
        ) {
            if (i > 0) {
                await this.quizPage.addQuestion();
            }

            const question = data.questions[i];

            await this.quizPage.fillQuestion(
                i,
                question.questionText,
                question.options,
                question.correctAnswer
            );
        }
    }
);


When(
    "The trainer saves the quiz as a draft",
    async function (this: CustomWorld) {
        await this.quizPage.saveQuizAsDraft();
    }
);


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

        const quizDetails =
            await this.quizPage.getQuizDetails(
                data.quizTitle
            );

        if (
            quizDetails.questionCount !==
            data.questions.length
        ) {
            throw new Error(
                `Expected ${data.questions.length} questions for ` +
                `"${data.quizTitle}", but found ` +
                `${quizDetails.questionCount}.`
            );
        }

        if (
            quizDetails.status.trim().toUpperCase() !==
            expectedStatus.trim().toUpperCase()
        ) {
            throw new Error(
                `Expected status "${expectedStatus}" for ` +
                `"${data.quizTitle}", but found ` +
                `"${quizDetails.status}".`
            );
        }
    }
);


// =====================================================
// DELETE QUIZ
// =====================================================

When(
    'The trainer deletes the quiz created from the {string} dataset',
    { timeout: 65000 },
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

        // Delete only the existing quiz.
        // This step does NOT create a quiz.
        await this.quizPage.deleteQuiz(
            data.quizTitle
        );
    }
);


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
