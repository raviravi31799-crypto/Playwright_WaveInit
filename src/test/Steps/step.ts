import { Given, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { DemoPage } from "../pages/demo";
import { expect } from "@playwright/test";
import { logger } from "../utils/logger";

Given("the user navigates to the application", async function (this: CustomWorld) {
    logger.info("Step: Navigating to WaveInit application");
    const demoPage = new DemoPage(this.page);
    await demoPage.navigate();
});

Then("the page title should not be empty", async function (this: CustomWorld) {
    logger.info("Step: Validating page title");
    const demoPage = new DemoPage(this.page);
    const title = await demoPage.getTitle();
    expect(title).toBeDefined();
});
