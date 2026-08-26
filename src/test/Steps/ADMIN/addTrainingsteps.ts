import { CustomWorld } from "../../world/world";
import { Given, Then, When } from "@cucumber/cucumber";

import { AddTrainingPage } from "../../pages/ADMIN/addTrainingPage";

import createTrainingData from "../../../../testdata/trainingData.json";
import editTrainingData from "../../../../testdata/editTrainingData.json";
import searchTrainingData from "../../../../testdata/searchTrainingData.json";
import { logger } from "../../utils/logger";

let trainingTitle: string;
let currentSearchValue: string;


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

        // Edit Training Title
        logger.info(
            "1. Editing title"
        );

        await this.addTrainingPage
            .editTrainingTitle(
                editTrainingData.trainingTitle
            );

        logger.info(
            "2. Title edited"
        );


        // Edit Description
        await this.addTrainingPage
            .editDescription(
                editTrainingData.description
            );

        logger.info(
            "3. Description edited"
        );


        /*
         * Trainer is intentionally NOT changed.
         */
        logger.info(
            "4. Trainer unchanged"
        );


        // Edit Start Date
        await this.addTrainingPage
            .editStartDate(
                editTrainingData.startDate
            );

        logger.info(
            "5. Start date edited"
        );


        // Edit End Date
        await this.addTrainingPage
            .editEndDate(
                editTrainingData.endDate
            );

        logger.info(
            "6. End date edited"
        );


        // Edit Capacity
        await this.addTrainingPage
            .editCapacity(
                editTrainingData.capacity
            );

        logger.info(
            "7. Capacity edited"
        );


        logger.info(
            "All editable training details edited successfully"
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


// =====================================
// DELETE TRAINING
// =====================================

let deletedTrainingTitle: string;

When(
    "the admin clicks the Delete Training button",
    async function (this: CustomWorld) {

        deletedTrainingTitle =
            await this.addTrainingPage.getFirstTrainingTitle();

        await this.addTrainingPage.clickDeleteTraining();

        logger.info(
            `Delete Training button clicked for "${deletedTrainingTitle}"`
        );
    }
);


Then(
    "the delete confirmation should be displayed",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .verifyDeleteConfirmation();

        logger.info(
            "Delete confirmation displayed"
        );
    }
);


When(
    "the admin confirms the training deletion",
    async function (this: CustomWorld) {

        await this.addTrainingPage.confirmDeleteTraining();

        logger.info(
            "Training deletion confirmed"
        );
    }
);

Then(
    "the training should be deleted successfully",
    async function (this: CustomWorld) {

        await this.addTrainingPage.verifyTrainingDeleted(
            deletedTrainingTitle
        );

        logger.info(
            `Training "${deletedTrainingTitle}" deleted successfully`
        );
    }
);
    // =====================================
// SEARCH TRAINING
// =====================================
When(
    "the admin enters a training title in the search field",
    async function (this: CustomWorld) {

        currentSearchValue =
            searchTrainingData.title;

        await this.addTrainingPage
            .enterSearchValue(
                currentSearchValue
            );

        logger.info(
            `Training title entered in search: ${currentSearchValue}`
        );
    }
);


When(
    "the admin enters a trainer name in the search field",
    async function (this: CustomWorld) {

        currentSearchValue =
            searchTrainingData.trainer;

        await this.addTrainingPage
            .enterSearchValue(
                currentSearchValue
            );

        logger.info(
            `Trainer name entered in search: ${currentSearchValue}`
        );
    }
);


Then(
    "the matching training should be displayed",
    async function (this: CustomWorld) {

        await this.addTrainingPage
            .verifySearchResult(
                currentSearchValue
            );

        logger.info(
            `Matching training displayed: ${currentSearchValue}`
        );
    }
);