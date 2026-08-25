import { CustomWorld } from "../../world/world";
import { Given, Then, When } from "@cucumber/cucumber";
import { AddTrainingPage } from "../../pages/ADMIN/addTrainingPage";
import trainingData from "../../../../testdata/trainingData.json";
import { logger } from "../../utils/logger";

let trainingTitle: string;

Given("the admin navigates to the Training Programs page",async function (this: CustomWorld) {
        await this.loginPage.Adminlogin();
        logger.info("Admin login successful");
        this.addTrainingPage = new AddTrainingPage(this.page);
        await this.addTrainingPage.clickTrainingPrograms();
        logger.info("Training Programs page opened");
    }
);

When("the admin clicks the Add Training button",async function (this: CustomWorld) {
        await this.addTrainingPage.clickAddTraining();
        logger.info("Add Training button clicked");
    }
);

When("the admin fills all mandatory training details", async function (this: CustomWorld) {
        trainingTitle = `${trainingData.trainingTitle} ${Date.now()}`;
        await this.addTrainingPage.enterTrainingTitle(trainingTitle);
        await this.addTrainingPage.enterDescription(trainingData.description);
        await this.addTrainingPage.selectTrainer(trainingData.trainer);
        await this.addTrainingPage.enterStartDate(trainingData.startDate);
        await this.addTrainingPage.enterEndDate(trainingData.endDate);
        await this.addTrainingPage.enterCapacity(trainingData.capacity);
        logger.info(`Training details entered: ${trainingTitle}`);
    }
);

When("the admin clicks the Create Training Session button",async function (this: CustomWorld) {
        await this.addTrainingPage.clickCreateTraining();
        logger.info("Create Training Session button clicked");
    }
);

Then("the training session should be created successfully",async function (this: CustomWorld) {
        await this.addTrainingPage.clickBackToTrainings();
        logger.info("Training session created successfully");
    }
);

Then("the new training should be displayed in the list",async function (this: CustomWorld) {
        await this.page .getByText(trainingTitle, { exact: true }).waitFor();
        logger.info(`Training "${trainingTitle}" displayed successfully`);
    }
);