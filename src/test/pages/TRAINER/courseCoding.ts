// import { Locator, expect } from "playwright/test";
// import { BasePage } from "../BasePage";
// import { logger } from "../../../main/utils/logger";

// export class CodingPage extends BasePage {

//     // Course
//     private readonly courseItems = this.page.locator(
//         "button.wl-sidebar-course-item"
//     );

//     // Coding module
//     private readonly codingModule = this.page.getByRole("tab", {
//         name: "Coding",
//         exact: true
//     });

//     // Assessment
//     private readonly createAssessmentButton = this.page.getByRole(
//         "button",
//         { name: "Create Assessment", exact: true }
//     );

//     private readonly generateWithAIButton = this.page.getByRole(
//         "button",
//         { name: "Generate with AI", exact: true }
//     );

//     private readonly generateAssessmentButton = this.page.getByRole(
//         "button",
//         { name: "Generate Assessment", exact: true }
//     );

//     private readonly assessmentTable = this.page.locator(
//         "table.cct-table"
//     );

//     private readonly assessmentRows = this.page.locator(
//         "table.cct-table tbody tr"
//     );

//     private readonly assessmentRow = (
//         assessmentTitle: string
//     ): Locator =>
//         this.assessmentRows
//             .filter({ hasText: assessmentTitle })
//             .first();

//     // Edit
//     private readonly editDetailsButton = this.page.getByRole(
//         "button",
//         { name: "Edit", exact: true }
//     );

//     private readonly assessmentTitleInput = this.page
//         .locator("label")
//         .filter({ hasText: "Title" })
//         .locator("..")
//         .locator("input");

//     private readonly assessmentDescriptionInput = this.page
//         .locator("label")
//         .filter({ hasText: "Description" })
//         .locator("..")
//         .locator("textarea");

//     private readonly assessmentDurationInput = this.page
//         .locator("label")
//         .filter({ hasText: "Time Limit (minutes)" })
//         .locator("..")
//         .locator("input");

//     private readonly saveButton = this.page.getByRole(
//         "button",
//         { name: "Save Changes", exact: true }
//     );

//     // Delete
//     private readonly confirmDeleteButton = this.page.getByRole(
//         "button",
//         { name: "Delete Permanently", exact: true }
//     );

//     private readonly cancelButton = this.page.getByRole(
//         "button",
//         { name: "Cancel", exact: true }
//     );

//     // ---------------- Course ----------------

//     async selectFirstCourse(): Promise<void> {

//         const firstCourse = this.courseItems.first();

//         await firstCourse.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         await this.click(firstCourse);

//         logger.info("First course selected");
//     }

//     // ---------------- Coding Module ----------------

//     async navigateToCodingModule(): Promise<void> {

//         await this.codingModule.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         await this.click(this.codingModule);

//         logger.info("Navigated to Coding module");
//     }

//     // ---------------- Assessment List ----------------

//     async waitForAssessmentList(): Promise<void> {

//         await this.assessmentTable.waitFor({
//             state: "visible",
//             timeout: 10000
//         });
//     }

//     async getAssessmentCount(): Promise<number> {

//         await this.waitForAssessmentList();

//         return await this.assessmentRows.count();
//     }

//     async verifyAssessmentCount(
//         expectedCount: number
//     ): Promise<void> {

//         await expect
//             .poll(
//                 async () => await this.getAssessmentCount(),
//                 {
//                     timeout: 10000,
//                     message: "Assessment count did not update"
//                 }
//             )
//             .toBe(expectedCount);

//         logger.info(
//             `Assessment count verified: ${expectedCount}`
//         );
//     }

//     // ---------------- Create Assessment ----------------

//     async clickCreateAssessment(): Promise<void> {

//         await this.click(this.createAssessmentButton);

//         logger.info("Clicked Create Assessment");
//     }

//     // ---------------- Generate With AI ----------------

//     async clickGenerateWithAI(): Promise<void> {

//         await this.click(this.generateWithAIButton);

//         logger.info("Clicked Generate with AI");
//     }

//     async enterAIAssessmentDetails(): Promise<void> {

//         const topicOrPrompt = this.page.getByPlaceholder(
//             "e.g. JavaScript array methods, Python data structures, etc."
//         );

//         await topicOrPrompt.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         await this.fill(
//             topicOrPrompt,
//             "JavaScript arrays and objects"
//         );

//         logger.info("AI assessment information entered");
//     }

//     async clickGenerateAssessment(): Promise<void> {

//         await this.click(this.generateAssessmentButton);

//         logger.info("Clicked Generate Assessment");
//     }

//     // ---------------- Edit ----------------

//     async clickEdit(
//         assessmentTitle: string
//     ): Promise<void> {

//         const row = this.assessmentRow(assessmentTitle);

//         await row.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         const editButton = row.locator(
//             'button[title="Edit Assessment"]'
//         );

//         await editButton.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         await this.click(editButton);

//         logger.info(
//             `Clicked Edit for ${assessmentTitle}`
//         );
//     }

//     async clickEditInDetails(): Promise<void> {

//         await this.click(this.editDetailsButton);

//         logger.info(
//             "Clicked Edit in assessment details"
//         );
//     }

//     async updateAssessmentDetails(
//         title: string,
//         description: string,
//         duration: string
//     ): Promise<void> {

//         await this.fill(
//             this.assessmentTitleInput,
//             title
//         );

//         await this.fill(
//             this.assessmentDescriptionInput,
//             description
//         );

//         await this.fill(
//             this.assessmentDurationInput,
//             duration
//         );

//         logger.info(
//             "Assessment details updated"
//         );
//     }

//     async clickSave(): Promise<void> {

//         await this.click(this.saveButton);

//         logger.info("Clicked Save Changes");
//     }

//     async verifyUpdatedAssessment(
//         updatedTitle: string
//     ): Promise<void> {

//         const updatedAssessment =
//             this.page.getByText(
//                 updatedTitle,
//                 { exact: true }
//             );

//         await expect(
//             updatedAssessment
//         ).toBeVisible();

//         logger.info(
//             `Updated assessment verified: ${updatedTitle}`
//         );
//     }

//     // ---------------- View ----------------

//     async clickView(
//         assessmentTitle: string
//     ): Promise<void> {

//         const row = this.assessmentRow(assessmentTitle);

//         await row.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         const viewButton = row.locator(
//             'button[title="View Assessment"]'
//         );

//         await viewButton.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         await this.click(viewButton);

//         logger.info(
//             `Clicked View for ${assessmentTitle}`
//         );
//     }

//     async verifyAssessmentDetailsDisplayed(): Promise<void> {

//         await expect(
//             this.page.getByRole("heading").first()
//         ).toBeVisible();

//         logger.info(
//             "Assessment details displayed successfully"
//         );
//     }

//     // ---------------- Delete ----------------

//     async clickDelete(
//         assessmentTitle: string
//     ): Promise<void> {

//         const row = this.assessmentRow(assessmentTitle);

//         await row.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         const deleteButton = row.locator(
//             'button[title="Delete"]'
//         );

//         await deleteButton.waitFor({
//             state: "visible",
//             timeout: 10000
//         });

//         await this.click(deleteButton);

//         logger.info(
//             `Clicked Delete for ${assessmentTitle}`
//         );
//     }

//     async confirmDelete(): Promise<void> {

//         await this.click(this.confirmDeleteButton);

//         logger.info("Confirmed delete action");
//     }

//     async cancelDelete(): Promise<void> {

//         await this.click(this.cancelButton);

//         logger.info("Cancelled delete action");
//     }
// }
// async validTrainerLogin(): Promise<void> {
//     const email = "trainer@gmail.com";
//     const password = "Trainer123";

//     await this.page.locator("#login-email").fill(email);
//     await this.page.locator("#login-password").fill(password);
//     await this.page.locator("button.auth-submit-btn").click();

//     await this.verifyTrainerLoginSuccess();
// }