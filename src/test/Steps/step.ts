import { Given, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { expect } from "@playwright/test";
import { logger } from "../utils/logger";

Given("the user navigates to the application", async function (this: CustomWorld) {
    logger.info("Step: Navigating to WaveInit application");
    await this.homePage.navigate();
});

Then("the page title should not be empty", async function (this: CustomWorld) {
    logger.info("Step: Validating page title");
    const title = await this.homePage.getTitle();
    expect(title).toBeDefined();
});
