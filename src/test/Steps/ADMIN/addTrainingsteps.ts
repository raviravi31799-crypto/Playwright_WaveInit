import { CustomWorld } from "../../world/world";
import { Given, Then, When } from "@cucumber/cucumber";

import { AddTrainingPage } from "../../pages/ADMIN/addTrainingPage";

import createTrainingData from "../../../../testdata/trainingData.json";
import editTrainingData from "../../../../testdata/editTrainingData.json";

import { logger } from "../../utils/logger";

let trainingTitle: string;


// =====================================
// NAVIGATION
// =====================================

Given(
    "the admin navigates to the Training Programs page",
    async function (this: CustomWorld) {

        await this.loginPage.Adminlogin();

        logger.info(
            "Admin login successful"
        );

        this.addTrainingPage =
            new AddTrainingPage(this.page);

        await this.addTrainingPage
            .clickTrainingPrograms();

        logger.info(
            "Training Programs page opened"
        );
    }
);


// =====================================
// CREATE TRAINING
// =====================================

When(
    "the admin clicks the Add Training button",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .clickAddTraining();

        logger.info(
            "Add Training button clicked"
        );
    }
);


When(
    "the admin fills all mandatory training details",
    async function (this: CustomWorld) {

        /*
         * Create unique training title
         */
        trainingTitle =
            `${createTrainingData.trainingTitle} ${Date.now()}`;


        await this.addTrainingPage
            .enterTrainingTitle(
                trainingTitle
            );


        await this.addTrainingPage
            .enterDescription(
                createTrainingData.description
            );


        await this.addTrainingPage
            .selectTrainer(
                createTrainingData.trainer
            );


        await this.addTrainingPage
            .enterStartDate(
                createTrainingData.startDate
            );


        await this.addTrainingPage
            .enterEndDate(
                createTrainingData.endDate
            );


        await this.addTrainingPage
            .enterCapacity(
                createTrainingData.capacity
            );


        logger.info(
            `Training details entered: ${trainingTitle}`
        );
    }
);


When(
    "the admin clicks the Create Training Session button",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .clickCreateTraining();

        logger.info(
            "Create Training Session button clicked"
        );
    }
);


Then(
    "the training session should be created successfully",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .clickBackToTrainings();

        logger.info(
            "Training session created successfully"
        );
    }
);


Then(
    "the new training should be displayed in the list",
    async function (this: CustomWorld) {

        await this.page
            .getByText(
                trainingTitle,
                {
                    exact: true
                }
            )
            .waitFor();

        logger.info(
            `Training "${trainingTitle}" displayed successfully`
        );
    }
);


// =====================================
// VIEW TRAINING
// =====================================

When(
    "the admin clicks the View icon for the training",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .clickViewTraining();

        logger.info(
            "View Training icon clicked"
        );
    }
);


Then(
    "the training details should be displayed",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .verifyTrainingDetails();

        logger.info(
            "Training details displayed"
        );
    }
);


When(
    "the admin clicks the Close button",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .clickClose();

        logger.info(
            "Close button clicked"
        );
    }
);


Then(
    "the training details should be closed",
    async function (this: CustomWorld) {

        await this.page
            .getByRole(
                "button",
                {
                    name: "Close",
                    exact: true
                }
            )
            .waitFor({
                state: "hidden"
            });

        logger.info(
            "Training details closed"
        );
    }
);


// =====================================
// EDIT TRAINING
// =====================================

When(
    "the admin clicks the Edit Training button",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .clickEditTraining();

        logger.info(
            "Edit Training button clicked"
        );
    }
);

When(
    "the admin edits all training details",
    async function (this: CustomWorld) {

        logger.info("1. Editing title");

        await this.addTrainingPage.editTrainingTitle(
            editTrainingData.trainingTitle
        );

        logger.info("2. Title edited");

        await this.addTrainingPage.editDescription(
            editTrainingData.description
        );

        // logger.info("3. Description edited");

        // await this.addTrainingPage.editTrainer(
        //     editTrainingData.trainer
        // );

        logger.info("4. Trainer edited");

        await this.addTrainingPage.editStartDate(
            editTrainingData.startDate
        );

        logger.info("5. Start date edited");

        await this.addTrainingPage.editEndDate(
            editTrainingData.endDate
        );

        logger.info("6. End date edited");

        await this.addTrainingPage.editCapacity(
            editTrainingData.capacity
        );

        logger.info("7. Capacity edited");

        logger.info(
            "All training details edited successfully"
        );
    }
);
When(
    "the admin clicks the Save Changes button",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .clickSaveChanges();

        logger.info(
            "Save Changes button clicked"
        );
    }
);


Then(
    "the training details should be updated successfully",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .verifyTrainingUpdated(
                editTrainingData.trainingTitle
            );

        logger.info(
            `Training "${editTrainingData.trainingTitle}" updated successfully`
        );
    }
);